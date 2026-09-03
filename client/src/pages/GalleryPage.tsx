import React, { useState, useEffect } from 'react';
import { 
  Image as ImageIcon, Upload, Heart, MapPin, 
  UserCheck, X, Plus, Sparkles, Filter, Eye, CheckCircle2 
} from 'lucide-react';
import { SupportedLanguage, translations } from '../utils/translations';

interface GalleryItem {
  id: string;
  title: string;
  media_url: string;
  media_type: 'image' | 'video';
  place: string;
  artisan_name: string;
  uploader: string;
  likes: number;
  created_at: string;
}

interface GalleryPageProps {
  language: SupportedLanguage;
}

export const GalleryPage: React.FC<GalleryPageProps> = ({ language }) => {
  const [items, setItems] = useState<GalleryItem[]>([]);
  const [selectedPlace, setSelectedPlace] = useState('All');
  const [loading, setLoading] = useState(true);
  const [activeLightbox, setActiveLightbox] = useState<GalleryItem | null>(null);
  const [isUploadModalOpen, setIsUploadModalOpen] = useState(false);
  const [uploadTitle, setUploadTitle] = useState('');
  const [uploadPlace, setUploadPlace] = useState('Kolhapur, Maharashtra');
  const [uploadArtisan, setUploadArtisan] = useState('Santosh Kamble');
  const [uploadMediaUrl, setUploadMediaUrl] = useState('');
  const [uploaderName, setUploaderName] = useState('Aarav Sharma (Tourist)');

  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [filePreview, setFilePreview] = useState<string>('');
  const [isUploading, setIsUploading] = useState(false);

  const t = translations[language];

  const places = ['All', 'Kolhapur', 'Chanderi', 'Majuli', 'Srinagar', 'Bishnupur'];

  const sampleStock = [
    '/assets/images/01-Hero/Kolhapuri_Chappals_in_roadside_shop_in_Kolhapur3.jpeg',
    '/assets/images/01-Hero/Chanderi_Craft_Village_–_Traditional_Weaving_and_Handicrafts_in_Madhya_Pradesh_01.jpg',
    '/assets/images/04-Bamboo-Cane/Innovative_Bamboo_Crafts_of_Assam.jpg',
    '/assets/images/05-Wood-Pottery/Kashmiri_Woodcarving_And_Paper_maché.jpg',
    '/assets/images/05-Wood-Pottery/Artisan_decorating_ceramic_plate.jpg',
    '/assets/images/02-Handloom/Weaver_making_saree_Bishnupur.jpg'
  ];

  const fetchGallery = async () => {
    setLoading(true);
    try {
      const res = await fetch(`/api/gallery?place=${selectedPlace}`);
      const data = await res.json();
      if (data.success && data.items) {
        setItems(data.items);
      } else {
        // Fallback endpoint check
        const fallbackRes = await fetch(`/api/experiences/gallery/all?place=${selectedPlace}`);
        const fallbackData = await fallbackRes.json();
        if (fallbackData.success) setItems(fallbackData.items);
      }
    } catch (e) {
      console.warn('Gallery fetch:', e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchGallery();
  }, [selectedPlace]);

  const handleLike = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setItems(items.map(item => item.id === id ? { ...item, likes: item.likes + 1 } : item));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setSelectedFile(file);
      setFilePreview(URL.createObjectURL(file));
      setUploadMediaUrl('');
    }
  };

  const handleUploadSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!uploadTitle.trim()) return;
    if (!selectedFile && !uploadMediaUrl.trim()) return;

    setIsUploading(true);
    try {
      if (selectedFile) {
        const formData = new FormData();
        formData.append('file', selectedFile);
        formData.append('title', uploadTitle);
        formData.append('place', uploadPlace);
        formData.append('artisanName', uploadArtisan);
        formData.append('uploader', uploaderName);

        const res = await fetch('/api/gallery/upload', {
          method: 'POST',
          body: formData
        });
        const data = await res.json();
        if (data.success && data.item) {
          setItems([data.item, ...items]);
          setIsUploadModalOpen(false);
          setUploadTitle('');
          setSelectedFile(null);
          setFilePreview('');
        }
      } else {
        const res = await fetch('/api/gallery/upload', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            title: uploadTitle,
            mediaUrl: uploadMediaUrl,
            place: uploadPlace,
            artisanName: uploadArtisan,
            uploader: uploaderName
          })
        });
        const data = await res.json();
        if (data.success && data.item) {
          setItems([data.item, ...items]);
          setIsUploadModalOpen(false);
          setUploadTitle('');
          setUploadMediaUrl('');
        }
      }
    } catch (err) {
      console.warn('Upload error:', err);
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#FDFBF7] pt-24 pb-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
        <div>
          <span className="text-xs uppercase tracking-widest font-bold text-[#D84315] block mb-1">
            Visual Craft Heritage
          </span>
          <h1 className="text-3xl sm:text-5xl font-serif font-bold text-[#2D4A3E]">
            {t.gallery}
          </h1>
          <p className="text-stone-600 text-sm mt-2 max-w-xl">
            High-resolution visual archives submitted by verified travelers and master artisans across India.
          </p>
        </div>

        <button
          onClick={() => setIsUploadModalOpen(true)}
          className="flex items-center gap-2 bg-[#D84315] hover:bg-[#BF360C] text-white font-bold text-xs px-6 py-3 rounded-full shadow-md transition-transform hover:scale-105 self-start md:self-auto"
        >
          <Upload className="w-4 h-4" />
          <span>Upload Craft Photo / Video</span>
        </button>
      </div>

      {/* Place Filter Ribbon */}
      <div className="flex gap-2 overflow-x-auto pb-4 mb-6 no-scrollbar">
        {places.map((place) => (
          <button
            key={place}
            onClick={() => setSelectedPlace(place)}
            className={`px-5 py-2.5 rounded-full text-xs font-semibold shrink-0 transition-all ${
              selectedPlace === place
                ? 'bg-[#2D4A3E] text-white shadow-md'
                : 'bg-white text-stone-700 border border-stone-200 hover:bg-stone-50'
            }`}
          >
            {place === 'All' ? 'All Craft Hubs' : place}
          </button>
        ))}
      </div>

      {/* Masonry / Lazy Loaded Responsive Grid */}
      {loading ? (
        <div className="py-20 text-center text-xs text-stone-500">
          Loading living craft archives...
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {items.map((item) => (
            <div
              key={item.id}
              onClick={() => setActiveLightbox(item)}
              className="group bg-white rounded-3xl overflow-hidden border border-stone-200/90 shadow-sm hover:shadow-xl transition-all cursor-pointer flex flex-col justify-between"
            >
              <div className="relative h-64 overflow-hidden bg-stone-100">
                <img
                  src={item.media_url}
                  alt={item.title}
                  loading="lazy"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  onError={(e: any) => {
                    e.target.src = '/assets/images/01-Hero/Kolhapuri_Chappals_in_roadside_shop_in_Kolhapur3.jpeg';
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />

                {/* Floating Place Badge */}
                <div className="absolute top-3 left-3 bg-[#2D4A3E]/90 text-white text-[10px] font-bold px-2.5 py-1 rounded-full backdrop-blur-md">
                  {item.place}
                </div>

                {/* Like Button */}
                <button
                  onClick={(e) => handleLike(item.id, e)}
                  className="absolute top-3 right-3 p-2 rounded-full bg-black/40 hover:bg-black/60 text-white backdrop-blur-md transition-colors flex items-center gap-1 text-xs"
                >
                  <Heart className="w-3.5 h-3.5 fill-rose-500 text-rose-500" />
                  <span className="font-mono text-[10px]">{item.likes}</span>
                </button>
              </div>

              <div className="p-5">
                <h3 className="font-serif font-bold text-base text-[#2D4A3E] group-hover:text-[#D84315] transition-colors line-clamp-1">
                  {item.title}
                </h3>
                <div className="flex items-center justify-between text-xs text-stone-500 mt-2">
                  <span className="font-medium text-stone-700">Artisan: {item.artisan_name}</span>
                  <span className="text-[10px] text-stone-400">By {item.uploader.split(' ')[0]}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Lightbox Modal */}
      {activeLightbox && (
        <div className="fixed inset-0 z-[120] bg-black/85 backdrop-blur-md flex items-center justify-center p-4">
          <div className="max-w-3xl w-full bg-[#1A332A] rounded-3xl overflow-hidden text-white shadow-2xl border border-stone-700 animate-in zoom-in-95">
            <div className="relative max-h-[60vh] bg-black flex items-center justify-center">
              <img
                src={activeLightbox.media_url}
                alt={activeLightbox.title}
                className="max-h-[60vh] w-auto object-contain"
              />
              <button
                onClick={() => setActiveLightbox(null)}
                className="absolute top-4 right-4 p-2 bg-black/60 hover:bg-black/80 rounded-full text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <span className="text-xs uppercase font-bold text-amber-300">
                  {activeLightbox.place}
                </span>
                <h3 className="text-xl font-serif font-bold text-white mt-0.5">
                  {activeLightbox.title}
                </h3>
                <p className="text-xs text-emerald-200 mt-1">
                  Master Custodian: {activeLightbox.artisan_name} • Uploaded by {activeLightbox.uploader}
                </p>
              </div>

              <button
                onClick={(e) => handleLike(activeLightbox.id, e)}
                className="flex items-center gap-2 bg-[#D84315] hover:bg-[#BF360C] text-white px-5 py-2.5 rounded-full text-xs font-bold shadow-md self-start sm:self-auto"
              >
                <Heart className="w-4 h-4 fill-white" />
                <span>Like ({activeLightbox.likes})</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* User Upload Modal */}
      {isUploadModalOpen && (
        <div className="fixed inset-0 z-[110] bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 shadow-2xl border border-stone-200 space-y-4 animate-in zoom-in-95">
            <div className="flex items-center justify-between border-b border-stone-100 pb-3">
              <h3 className="font-serif font-bold text-lg text-[#2D4A3E]">
                Add Photo / Video to Community Gallery
              </h3>
              <button
                onClick={() => setIsUploadModalOpen(false)}
                className="p-1 hover:bg-stone-100 rounded-full text-stone-500"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleUploadSubmit} className="space-y-3">
              <div>
                <label className="block text-xs font-bold text-stone-700 mb-1">Title of Craft Piece</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Master weaver interlacing zari threads"
                  value={uploadTitle}
                  onChange={(e) => setUploadTitle(e.target.value)}
                  className="w-full bg-stone-50 border border-stone-200 rounded-xl px-3 py-2 text-xs"
                />
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block text-xs font-bold text-stone-700 mb-1">Region / Place</label>
                  <select
                    value={uploadPlace}
                    onChange={(e) => setUploadPlace(e.target.value)}
                    className="w-full bg-stone-50 border border-stone-200 rounded-xl px-2 py-2 text-xs"
                  >
                    <option value="Kolhapur, Maharashtra">Kolhapur, Maharashtra</option>
                    <option value="Chanderi, Madhya Pradesh">Chanderi, MP</option>
                    <option value="Majuli Island, Assam">Majuli Island, Assam</option>
                    <option value="Old Srinagar, J&K">Old Srinagar, J&K</option>
                    <option value="Bishnupur, West Bengal">Bishnupur, West Bengal</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-bold text-stone-700 mb-1">Artisan Name</label>
                  <input
                    type="text"
                    required
                    value={uploadArtisan}
                    onChange={(e) => setUploadArtisan(e.target.value)}
                    className="w-full bg-stone-50 border border-stone-200 rounded-xl px-3 py-2 text-xs"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-stone-700 mb-1">
                  Upload Photo from Local Device (Cloudinary Sync)
                </label>
                
                {/* Local File Picker */}
                <div className="border-2 border-dashed border-stone-300 hover:border-[#D84315] rounded-2xl p-4 text-center cursor-pointer transition-colors bg-stone-50 mb-3">
                  <input
                    type="file"
                    id="local-gallery-upload-input"
                    accept="image/*,video/*"
                    onChange={handleFileChange}
                    className="hidden"
                  />
                  <label htmlFor="local-gallery-upload-input" className="cursor-pointer block">
                    {filePreview ? (
                      <div className="relative w-full h-32 rounded-xl overflow-hidden mb-2">
                        <img src={filePreview} alt="Preview" className="w-full h-full object-cover" />
                        <span className="absolute bottom-2 right-2 bg-black/70 text-white text-[10px] px-2 py-0.5 rounded-md font-bold">
                          ✓ Ready to Cloudinary
                        </span>
                      </div>
                    ) : (
                      <div className="py-2">
                        <Upload className="w-6 h-6 text-[#D84315] mx-auto mb-1" />
                        <span className="text-xs font-bold text-stone-700 block">Choose image from your computer</span>
                        <span className="text-[10px] text-stone-400">PNG, JPG, MP4 up to 10MB</span>
                      </div>
                    )}
                  </label>
                </div>

                <div className="flex items-center gap-2 mb-2">
                  <div className="flex-1 h-px bg-stone-200" />
                  <span className="text-[10px] uppercase font-bold text-stone-400">OR SELECT PRESET</span>
                  <div className="flex-1 h-px bg-stone-200" />
                </div>

                <div className="flex gap-2 overflow-x-auto pb-1 no-scrollbar">
                  {sampleStock.map((url, i) => (
                    <img
                      key={i}
                      src={url}
                      alt="preset"
                      onClick={() => {
                        setUploadMediaUrl(url);
                        setSelectedFile(null);
                        setFilePreview('');
                      }}
                      className={`w-12 h-12 rounded-xl object-cover cursor-pointer border-2 transition-transform hover:scale-105 shrink-0 ${
                        uploadMediaUrl === url ? 'border-[#D84315]' : 'border-transparent opacity-60'
                      }`}
                    />
                  ))}
                </div>
              </div>

              <div className="flex gap-2 pt-3 border-t border-stone-100">
                <button
                  type="button"
                  onClick={() => setIsUploadModalOpen(false)}
                  className="flex-1 bg-stone-100 text-stone-700 py-2.5 rounded-full text-xs font-bold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isUploading}
                  className="flex-1 bg-[#D84315] hover:bg-[#BF360C] disabled:bg-stone-300 text-white py-2.5 rounded-full text-xs font-bold shadow-md flex items-center justify-center gap-1.5"
                >
                  {isUploading ? (
                    <>
                      <span className="w-3.5 h-3.5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      <span>Uploading to Cloudinary...</span>
                    </>
                  ) : (
                    <span>Upload to Gallery</span>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
