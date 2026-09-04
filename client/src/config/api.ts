// Centralized API configuration for Kala Setu
// In production, VITE_API_URL points to the Render backend: https://kalasetu-8dws.onrender.com
// In local development, it falls back to http://localhost:5000 or empty string if proxy is used

const rawApiUrl = (import.meta.env.VITE_API_URL as string | undefined) || '';

// Clean trailing slash if present
export const API_BASE_URL = rawApiUrl.replace(/\/+$/, '');

/**
 * Returns full API endpoint URL
 * @param path - e.g. '/api/gallery' or 'api/gallery'
 */
export const getApiUrl = (path: string): string => {
  const cleanPath = path.startsWith('/') ? path : `/${path}`;
  if (!API_BASE_URL) {
    // If no base URL is defined, fall back to relative path (handled by Vite dev proxy) or localhost:5000
    return cleanPath;
  }
  return `${API_BASE_URL}${cleanPath}`;
};
