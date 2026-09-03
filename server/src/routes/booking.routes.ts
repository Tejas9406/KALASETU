import { Router } from 'express';
import { PaymentService } from '../services/payment.service.js';
import { pool } from '../config/db.js';

export const bookingRouter = Router();

// Create booking order
bookingRouter.post('/create-order', async (req, res) => {
  try {
    const { experienceId, participants = 1, touristId = 'usr_demo_tourist' } = req.body;
    if (!experienceId) {
      return res.status(400).json({ success: false, error: 'experienceId is required' });
    }

    const order = await PaymentService.createOrder(experienceId, Number(participants), touristId);
    res.json({ success: true, order });
  } catch (err: any) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// Confirm and record booking
bookingRouter.post('/confirm', async (req, res) => {
  try {
    const {
      experienceId,
      touristId,
      touristName,
      touristPhone,
      bookingDate,
      timeSlot,
      participants,
      totalPrice,
      razorpayPaymentId,
      razorpayOrderId
    } = req.body;

    const booking = await PaymentService.confirmBooking({
      experienceId,
      touristId,
      touristName,
      touristPhone,
      bookingDate,
      timeSlot,
      participants: Number(participants) || 1,
      totalPrice: Number(totalPrice),
      razorpayPaymentId,
      razorpayOrderId
    });

    res.json({ success: true, booking });
  } catch (err: any) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// Get user bookings
bookingRouter.get('/user/:userId', async (req, res) => {
  try {
    const { userId } = req.params;
    const query = `
      SELECT 
        b.*,
        e.title as experience_title,
        e.cover_image,
        e.location_name,
        e.district,
        e.state,
        u.name as artisan_name
      FROM bookings b
      JOIN experiences e ON b.experience_id = e.id
      LEFT JOIN artisan_profiles ap ON (e.artisan_id = ap.id OR e.artisan_id = ap.user_id)
      LEFT JOIN users u ON ap.user_id = u.id
      WHERE b.tourist_id = $1 OR b.tourist_phone = $1
      ORDER BY b.created_at DESC;
    `;
    const result = await pool.query(query, [userId]);
    res.json({ success: true, bookings: result.rows });
  } catch (err: any) {
    res.status(500).json({ success: false, error: err.message });
  }
});
