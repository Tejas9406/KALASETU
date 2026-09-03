import React, { useEffect, useRef } from 'react';
import * as maplibregl from 'maplibre-gl';
import { Experience, CulturalExperience } from '../../types';

interface MapLibreViewProps {
  experiences: Experience[];
  culturalExperiences?: CulturalExperience[];
  onSelectExperience?: (exp: Experience) => void;
  onSelectCulturalExperience?: (cult: CulturalExperience) => void;
  selectedExperienceId?: string;
  height?: string;
}

export const MapLibreView: React.FC<MapLibreViewProps> = ({
  experiences,
  culturalExperiences = [],
  onSelectExperience,
  onSelectCulturalExperience,
  selectedExperienceId,
  height = '500px'
}) => {
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<maplibregl.Map | null>(null);
  const markersRef = useRef<{ [key: string]: maplibregl.Marker }>({});

  useEffect(() => {
    if (!mapContainer.current) return;

    // Initialize MapLibre GL with clean OSM style
    map.current = new maplibregl.Map({
      container: mapContainer.current,
      style: {
        version: 8,
        sources: {
          osm: {
            type: 'raster',
            tiles: ['https://tile.openstreetmap.org/{z}/{x}/{y}.png'],
            tileSize: 256,
            attribution: '&copy; OpenStreetMap contributors | Boundary: Survey of India'
          }
        },
        layers: [
          {
            id: 'osm-tiles',
            type: 'raster',
            source: 'osm',
            minzoom: 0,
            maxzoom: 19
          }
        ]
      },
      center: [78.9629, 21.5937], // India Center
      zoom: 4.3
    });

    map.current.addControl(new maplibregl.NavigationControl(), 'top-right');

    // Dynamic layer inspection and Authoritative Survey of India Boundary Overlay
    map.current.on('load', () => {
      if (!map.current) return;

      // 1. Inspect actual loaded MapLibre style layers dynamically
      const style = map.current.getStyle();
      if (style && style.layers) {
        style.layers.forEach((layer) => {
          const id = (layer.id || '').toLowerCase();
          const sourceLayer = ((layer as any)['source-layer'] || '').toLowerCase();
          const isDisputedOrAdmin = 
            id.includes('disputed') || 
            id.includes('admin-0-boundary') || 
            id.includes('admin_country') ||
            id.includes('border_dispute') ||
            sourceLayer.includes('admin') ||
            sourceLayer.includes('boundary');

          if (isDisputedOrAdmin && layer.type === 'line') {
            try {
              map.current?.setLayoutProperty(layer.id, 'visibility', 'none');
            } catch (e) {}
          }
        });
      }

      // 2. Add Authoritative Survey of India GeoJSON source
      if (!map.current.getSource('soi-india-boundary')) {
        map.current.addSource('soi-india-boundary', {
          type: 'geojson',
          data: '/assets/maps/india_soi_boundary.geojson'
        });

        // Landmass Territory Fill Accent
        map.current.addLayer({
          id: 'soi-boundary-fill',
          type: 'fill',
          source: 'soi-india-boundary',
          paint: {
            'fill-color': '#2D4A3E',
            'fill-opacity': 0.05
          }
        });

        // Outer Glow / Accent using theme palette (#2D4A3E deep forest)
        map.current.addLayer({
          id: 'soi-boundary-glow',
          type: 'line',
          source: 'soi-india-boundary',
          paint: {
            'line-color': '#2D4A3E',
            'line-width': 4,
            'line-opacity': 0.35,
            'line-blur': 2
          }
        });

        // Authoritative Political Perimeter Stroke (#2D4A3E deep green)
        map.current.addLayer({
          id: 'soi-boundary-stroke',
          type: 'line',
          source: 'soi-india-boundary',
          paint: {
            'line-color': '#2D4A3E',
            'line-width': 2.2,
            'line-opacity': 0.9
          }
        });

        // State & UT Boundaries Internal Stroke
        map.current.addLayer({
          id: 'soi-state-borders',
          type: 'line',
          source: 'soi-india-boundary',
          paint: {
            'line-color': '#8D6E63',
            'line-width': 1.0,
            'line-opacity': 0.5,
            'line-dasharray': [2, 2]
          }
        });
      }
    });

    return () => {
      map.current?.remove();
    };
  }, []);

  // Update markers when experiences array changes
  useEffect(() => {
    if (!map.current) return;

    // Clear old markers
    Object.values(markersRef.current).forEach(marker => marker.remove());
    markersRef.current = {};

    const bounds = new maplibregl.LngLatBounds();
    let hasCoords = false;

    // Craft Icon Mapping
    const getCraftIcon = (cat: string) => {
      const c = cat.toLowerCase();
      if (c.includes('leather')) return '👞';
      if (c.includes('handloom') || c.includes('silk') || c.includes('weav')) return '🧵';
      if (c.includes('bamboo') || c.includes('cane')) return '🎋';
      if (c.includes('wood')) return '🪵';
      if (c.includes('pottery') || c.includes('clay') || c.includes('terracotta')) return '🏺';
      if (c.includes('metal')) return '⚒️';
      return '🎨';
    };

    // Helper to get compact art name
    const getArtName = (exp: Experience) => {
      const cat = exp.category.toLowerCase();
      if (cat.includes('leather')) return 'Kolhapuri Leather';
      if (cat.includes('handloom') || cat.includes('silk')) return 'Chanderi Silk';
      if (cat.includes('bamboo')) return 'Mukha Mask';
      if (cat.includes('wood')) return 'Walnut Woodwork';
      if (cat.includes('pottery') || cat.includes('terracotta')) return 'Terracotta Clay';
      return exp.category;
    };

    // 1. Render Artisan Experience Markers (Green Boxes)
    experiences.forEach((exp) => {
      if (!exp.lat || !exp.lng) return;

      hasCoords = true;
      bounds.extend([exp.lng, exp.lat]);

      const el = document.createElement('div');
      el.className = 'custom-craft-pin-container cursor-pointer';
      el.style.pointerEvents = 'auto';
      el.style.zIndex = selectedExperienceId === exp.id ? '30' : '10';

      const icon = getCraftIcon(exp.category);
      const isSelected = selectedExperienceId === exp.id;
      const artName = getArtName(exp);

      el.innerHTML = `
        <div style="
          display: flex;
          align-items: center;
          gap: 6px;
          background: #2D4A3E;
          color: white;
          padding: 6px 12px;
          border-radius: 9999px;
          font-family: system-ui, -apple-system, sans-serif;
          font-weight: 700;
          font-size: 11px;
          box-shadow: 0 4px 15px rgba(0,0,0,0.35);
          border: 2px solid white;
          transform: ${isSelected ? 'scale(1.15)' : 'scale(1)'};
          transition: transform 0.2s ease;
        ">
          <span style="font-size: 14px;">${icon}</span>
          <span style="white-space: nowrap;">${artName}</span>
        </div>
      `;

      const popupContent = `
        <div style="font-family: system-ui, -apple-system, sans-serif; padding: 12px; max-width: 240px; color: #2C2420;">
          <div style="display: flex; align-items: center; gap: 8px; margin-bottom: 8px;">
            <div style="
              width: 36px;
              height: 36px;
              border-radius: 9999px;
              background: #2D4A3E;
              color: white;
              display: flex;
              align-items: center;
              justify-content: center;
              font-weight: bold;
              font-size: 14px;
              overflow: hidden;
              flex-shrink: 0;
            ">
              ${exp.artisan_avatar ? `<img src="${exp.artisan_avatar}" style="width:100%;height:100%;object-fit:cover;" />` : (exp.artisan_name || 'A').charAt(0)}
            </div>
            <div>
              <div style="font-weight: 700; font-size: 13px; color: #2D4A3E; line-height: 1.2;">
                ${exp.artisan_name || 'Master Artisan'}
              </div>
              <div style="font-size: 10px; color: #6D4C41; font-weight: 600;">
                ${icon} ${exp.category} • ${exp.district}
              </div>
            </div>
          </div>

          <div style="margin-bottom: 8px;">
            <div style="font-weight: 600; font-size: 11px; color: #333; line-height: 1.3; margin-bottom: 4px;">
              ${exp.title}
            </div>
            <div style="display: flex; justify-content: space-between; align-items: center; font-size: 11px;">
              <span style="color: #059669; font-weight: 700; font-size: 10px; background: #ecfdf5; padding: 2px 6px; border-radius: 9999px;">
                ★ Trust ${exp.trust_score || 96}%
              </span>
              <span style="font-weight: 800; color: #D84315; font-size: 13px;">
                ₹${exp.price_inr}
              </span>
            </div>
          </div>

          <button
            id="map-popup-btn-${exp.id}"
            style="
              width: 100%;
              background: #2D4A3E;
              color: white;
              border: none;
              padding: 6px 12px;
              border-radius: 9999px;
              font-size: 11px;
              font-weight: 700;
              cursor: pointer;
            "
          >
            View Atelier & Book →
          </button>
        </div>
      `;

      const popup = new maplibregl.Popup({ 
        offset: 25, 
        closeButton: true,
        closeOnClick: false 
      }).setHTML(popupContent);

      el.addEventListener('click', (e) => {
        e.stopPropagation();
        if (onSelectExperience) onSelectExperience(exp);
      });

      popup.on('open', () => {
        const btn = document.getElementById(`map-popup-btn-${exp.id}`);
        if (btn) {
          btn.addEventListener('click', () => {
            if (onSelectExperience) onSelectExperience(exp);
          });
        }
      });

      const marker = new maplibregl.Marker({ 
        element: el,
        anchor: 'bottom'
      })
        .setLngLat([exp.lng, exp.lat])
        .setPopup(popup)
        .addTo(map.current!);

      markersRef.current[exp.id] = marker;
    });

    // 2. Render Cultural/Community Activities Markers (Orange Boxes)
    culturalExperiences.forEach((cult) => {
      if (!cult.lat || !cult.lng) return;

      hasCoords = true;
      bounds.extend([cult.lng, cult.lat]);

      const el = document.createElement('div');
      el.className = 'custom-culture-pin-container cursor-pointer';
      el.style.pointerEvents = 'auto';
      el.style.zIndex = '15';

      el.innerHTML = `
        <div style="
          display: flex;
          align-items: center;
          gap: 6px;
          background: #D84315;
          color: white;
          padding: 6px 12px;
          border-radius: 9999px;
          font-family: system-ui, -apple-system, sans-serif;
          font-weight: 700;
          font-size: 11px;
          box-shadow: 0 4px 15px rgba(216,67,21,0.4);
          border: 2px solid white;
        ">
          <span style="font-size: 14px;">🪔</span>
          <span style="white-space: nowrap;">${cult.tradition_name.split(' ')[0]} ${cult.tradition_name.split(' ')[1] || ''}</span>
        </div>
      `;

      const popupContent = `
        <div style="font-family: system-ui, -apple-system, sans-serif; padding: 12px; max-width: 240px; color: #2C2420;">
          <div style="font-weight: 700; font-size: 13px; color: #D84315; line-height: 1.2; margin-bottom: 4px;">
            🪔 ${cult.title}
          </div>
          <div style="font-size: 10px; color: #6D4C41; font-weight: 600; margin-bottom: 6px;">
            ${cult.category} • ${cult.district}, ${cult.state}
          </div>
          <div style="font-size: 11px; color: #555; line-height: 1.3; margin-bottom: 8px;">
            ${cult.description.substring(0, 95)}...
          </div>
          <div style="font-size: 10px; color: #D84315; font-weight: bold;">
            Custodians: ${cult.community_custodians || 'Local Guild'}
          </div>
        </div>
      `;

      const popup = new maplibregl.Popup({ 
        offset: 25, 
        closeButton: true,
        closeOnClick: false 
      }).setHTML(popupContent);

      el.addEventListener('click', (e) => {
        e.stopPropagation();
        if (onSelectCulturalExperience) onSelectCulturalExperience(cult);
      });

      const marker = new maplibregl.Marker({ 
        element: el,
        anchor: 'bottom'
      })
        .setLngLat([cult.lng, cult.lat])
        .setPopup(popup)
        .addTo(map.current!);

      markersRef.current[cult.id] = marker;
    });

    if (hasCoords && experiences.length > 0) {
      map.current.fitBounds(bounds, { padding: 70, maxZoom: 8 });
    }
  }, [experiences, culturalExperiences, selectedExperienceId]);

  return (
    <div className="relative w-full rounded-3xl overflow-hidden shadow-lg border border-stone-200" style={{ height }}>
      <div ref={mapContainer} className="w-full h-full" />
      {/* Overlay legend tag */}
      <div className="absolute top-4 left-4 z-10 bg-white/95 backdrop-blur-md px-3.5 py-2.5 rounded-2xl shadow-md border border-stone-200 text-xs space-y-1">
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1.5 font-bold text-[#2D4A3E]">
            <span className="w-2.5 h-2.5 rounded-full bg-[#2D4A3E]"></span>
            <span>Artisan Ateliers (Green)</span>
          </div>
          <div className="flex items-center gap-1.5 font-bold text-[#D84315]">
            <span className="w-2.5 h-2.5 rounded-full bg-[#D84315]"></span>
            <span>Cultural Experiences (Orange)</span>
          </div>
        </div>
        <div className="text-[10px] text-stone-500">Click any marker to inspect heritage masterclass & tradition</div>
        <div className="text-[9px] text-[#D84315] font-semibold pt-1 border-t border-stone-200">
          🇮🇳 Official Survey of India Political Territorial Extent
        </div>
      </div>
    </div>
  );
};
