import { Router } from 'express';
import { SOSService } from '../services/sos.service.js';

export const emergencyRouter = Router();

// Trigger SOS
emergencyRouter.post('/sos', async (req, res) => {
  try {
    const {
      userId,
      userName,
      userPhone,
      lat,
      lng,
      addressApprox,
      emergencyContacts
    } = req.body;

    if (!lat || !lng) {
      return res.status(400).json({ success: false, error: 'Latitude and Longitude are mandatory for SOS location dispatch' });
    }

    const sosResponse = await SOSService.triggerSOS({
      userId,
      userName: userName || 'Distressed Traveler',
      userPhone: userPhone || '+91 98765 43210',
      lat: Number(lat),
      lng: Number(lng),
      addressApprox,
      emergencyContacts
    });

    res.json(sosResponse);
  } catch (err: any) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// Resolve SOS
emergencyRouter.post('/resolve', async (req, res) => {
  try {
    const { alertId } = req.body;
    if (!alertId) {
      return res.status(400).json({ success: false, error: 'alertId is required' });
    }
    const resolved = await SOSService.resolveSOS(alertId);
    res.json({ success: true, message: 'Emergency marked safe and resolved', alert: resolved });
  } catch (err: any) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// Get alert status
emergencyRouter.get('/status', async (req, res) => {
  try {
    const { alertId } = req.query;
    const alert = await SOSService.getLatestAlert(alertId as string);
    res.json({ success: true, alert });
  } catch (err: any) {
    res.status(500).json({ success: false, error: err.message });
  }
});
