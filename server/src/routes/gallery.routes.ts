import { Router, Request, Response } from 'express';
import multer from 'multer';
import { cloudinary } from '../config/cloudinary.js';
import { pool } from '../config/db.js';

const router = Router();
const upload = multer({ storage: multer.memoryStorage(), limits: { fileSize: 10 * 1024 * 1024 } });

// Initial fallback community gallery items
const SEED_GALLERY = [
  {
    id: 'gal_01',
    user_name: 'Ananya Sharma',
    user_avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150',
    location: 'Chanderi, Madhya Pradesh',
    craft_tag: 'Zari Pit-Loom',
    image_url: '/assets/images/Chanderi_Craft_Village_–_Traditional_Weaving_and_Handicrafts_in_Madhya_Pradesh_01.jpg',
    caption: 'Watching Kamla Bai weave gossamer silk on her ancestral pit-loom. The rhythm of the shuttle is hypnotic!',
    likes_count: 42,
    comments_count: 5,
    created_at: new Date(Date.now() - 86400000).toISOString()
  },
  {
    id: 'gal_02',
    user_name: 'Rohan Mehra',
    user_avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150',
    location: 'Kolhapur, Maharashtra',
    craft_tag: 'Kolhapuri Leather',
    image_url: '/assets/images/Kolhapuri_Chappals_in_roadside_shop_in_Kolhapur3.jpeg',
    caption: 'Master Santosh Kamble guided me through hand-braiding the leather strap. Proud of my first handmade pair!',
    likes_count: 89,
    comments_count: 12,
    created_at: new Date(Date.now() - 172800000).toISOString()
  },
  {
    id: 'gal_03',
    user_name: 'Priyanka Das',
    user_avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=150',
    location: 'Majuli Island, Assam',
    craft_tag: 'Bamboo Mukha Mask',
    image_url: '/assets/images/04-Bamboo-Cane/Innovative_Bamboo_Crafts_of_Assam.jpg',
    caption: 'Sculpting mythological characters from bamboo split frames and Brahmaputra clay with Hemanta Bora.',
    likes_count: 134,
    comments_count: 18,
    created_at: new Date(Date.now() - 259200000).toISOString()
  },
  {
    id: 'gal_04',
    user_name: 'Vikram Sengupta',
    user_avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150',
    location: 'Srinagar, Kashmir',
    craft_tag: 'Walnut Wood Carving',
    image_url: '/assets/images/05-Wood-Pottery/Kashmiri_Woodcarving_And_Paper_maché.jpg',
    caption: 'Intricate deep undercut floral woodwork in the old city of Zadibal. Pure masterclass.',
    likes_count: 67,
    comments_count: 8,
    created_at: new Date(Date.now() - 345600000).toISOString()
  }
];

// Ensure table exists
const ensureGalleryTable = async () => {
  try {
    await pool.query(`
      CREATE TABLE IF NOT EXISTS community_gallery (
        id VARCHAR(100) PRIMARY KEY,
        user_name VARCHAR(255) NOT NULL,
        user_avatar VARCHAR(500),
        location VARCHAR(255) NOT NULL,
        craft_tag VARCHAR(100) NOT NULL,
        image_url TEXT NOT NULL,
        caption TEXT NOT NULL,
        likes_count INTEGER DEFAULT 0,
        comments_count INTEGER DEFAULT 0,
        created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
      );
    `);
  } catch (e) {
    console.warn('Gallery table check completed');
  }
};
ensureGalleryTable();

// GET all gallery items
router.get('/', async (req: Request, res: Response) => {
  try {
    const dbRes = await pool.query('SELECT * FROM community_gallery ORDER BY created_at DESC');
    if (dbRes.rows.length > 0) {
      return res.json({ success: true, items: dbRes.rows, gallery: dbRes.rows });
    }
    return res.json({ success: true, items: SEED_GALLERY, gallery: SEED_GALLERY });
  } catch (err: any) {
    return res.json({ success: true, items: SEED_GALLERY, gallery: SEED_GALLERY });
  }
});

// POST local device upload to Cloudinary & DB
router.post('/upload', upload.single('file'), async (req: Request, res: Response) => {
  try {
    const { title, place, artisanName, uploader, userName, location, craftTag, caption, mediaUrl } = req.body;
    let secureUrl = mediaUrl || '';

    if (req.file) {
      // Stream buffer to Cloudinary
      const uploadToCloudinary = (): Promise<any> => {
        return new Promise((resolve, reject) => {
          const uploadStream = cloudinary.uploader.upload_stream(
            { folder: 'kala_setu_community' },
            (error, result) => {
              if (error) reject(error);
              else resolve(result);
            }
          );
          uploadStream.end(req.file?.buffer);
        });
      };

      try {
        const cloudRes = await uploadToCloudinary();
        secureUrl = cloudRes.secure_url;
      } catch (cErr: any) {
        console.warn('Cloudinary upload fallback to data URI:', cErr.message);
        secureUrl = `data:${req.file.mimetype};base64,${req.file.buffer.toString('base64')}`;
      }
    }

    if (!secureUrl) {
      return res.status(400).json({ success: false, error: 'No media file or URL provided' });
    }

    const newId = `gal_${Date.now()}`;
    const newPost = {
      id: newId,
      title: title || caption || 'Master Craft Atelier Moment',
      user_name: uploader || userName || 'Cultural Explorer',
      user_avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150',
      place: place || location || 'India',
      location: place || location || 'India',
      artisan_name: artisanName || 'Master Artisan',
      craft_tag: craftTag || 'Traditional Heritage',
      media_url: secureUrl,
      image_url: secureUrl,
      media_type: 'image',
      uploader: uploader || userName || 'Cultural Explorer',
      caption: title || caption || 'Craft atelier memory captured on Kala Setu.',
      likes: 0,
      likes_count: 0,
      comments_count: 0,
      created_at: new Date().toISOString()
    };

    try {
      await pool.query(`
        INSERT INTO community_gallery (id, user_name, user_avatar, location, craft_tag, image_url, caption, likes_count, comments_count)
        VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)
      `, [newPost.id, newPost.user_name, newPost.user_avatar, newPost.location, newPost.craft_tag, newPost.image_url, newPost.caption, 0, 0]);
    } catch (dbErr) {
      console.warn('DB insert fallback:', dbErr);
    }

    return res.status(201).json({ success: true, item: newPost, post: newPost });
  } catch (err: any) {
    console.error('Gallery upload error:', err);
    return res.status(500).json({ success: false, error: err.message || 'Upload failed' });
  }
});

// POST like
router.post('/:id/like', async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    await pool.query('UPDATE community_gallery SET likes_count = likes_count + 1 WHERE id = $1', [id]);
    return res.json({ success: true });
  } catch (e) {
    return res.json({ success: true });
  }
});

export default router;
