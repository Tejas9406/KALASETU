import { pool } from '../config/db.js';
import crypto from 'crypto';

export class PaymentService {
  /**
   * Create Razorpay Order or dummy bypass order for testing
   */
  static async createOrder(experienceId: string, participants: number, touristId: string) {
    // 1. Fetch experience pricing
    const expRes = await pool.query('SELECT id, title, price_inr FROM experiences WHERE id = $1', [experienceId]);
    if (expRes.rows.length === 0) {
      throw new Error('Experience not found');
    }
    const exp = expRes.rows[0];
    const totalAmount = exp.price_inr * participants;
    const orderId = `order_${Date.now()}_${crypto.randomBytes(4).toString('hex')}`;

    return {
      orderId,
      amount: totalAmount * 100, // amount in paise
      amountInr: totalAmount,
      currency: 'INR',
      experienceTitle: exp.title,
      participants
    };
  }

  /**
   * Complete booking & verify payment
   */
  static async confirmBooking(params: {
    experienceId: string;
    touristId: string;
    touristName: string;
    touristPhone: string;
    bookingDate: string;
    timeSlot: string;
    participants: number;
    totalPrice: number;
    razorpayPaymentId?: string;
    razorpayOrderId?: string;
  }) {
    const bookingId = `BK-${new Date().getFullYear()}-${Date.now().toString().slice(-6)}`;
    const qrCodeData = `KALASETU:${bookingId}:${params.experienceId}:${params.bookingDate}:${params.timeSlot}`;

    const query = `
      INSERT INTO bookings (
        id, experience_id, tourist_id, tourist_name, tourist_phone,
        booking_date, time_slot, participants, total_price,
        status, razorpay_order_id, razorpay_payment_id, qr_code_data, created_at
      ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, NOW())
      RETURNING *;
    `;

    const values = [
      bookingId,
      params.experienceId,
      params.touristId || 'usr_demo_tourist',
      params.touristName || 'Aarav Sharma',
      params.touristPhone || '+91 98765 43210',
      params.bookingDate,
      params.timeSlot,
      params.participants,
      params.totalPrice,
      'confirmed',
      params.razorpayOrderId || `ord_${Date.now()}`,
      params.razorpayPaymentId || `pay_${Date.now()}`,
      qrCodeData
    ];

    const result = await pool.query(query, values);
    return result.rows[0];
  }
}
