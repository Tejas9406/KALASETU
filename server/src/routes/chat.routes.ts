import { Router } from 'express';
import { AIService } from '../services/ai.service.js';

export const chatRouter = Router();

// Multi-lingual conversational concierge
chatRouter.post('/message', async (req, res) => {
  try {
    const { message, language = 'en', history = [] } = req.body;
    if (!message) {
      return res.status(400).json({ success: false, error: 'Message is required' });
    }

    const reply = await AIService.chatWithGuide(message, history, language);
    res.json({ success: true, reply, language });
  } catch (err: any) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// Voice-first artisan listing assistant
chatRouter.post('/voice-to-listing', async (req, res) => {
  try {
    const { spokenText } = req.body;
    if (!spokenText) {
      return res.status(400).json({ success: false, error: 'Spoken text transcription is required' });
    }

    const listing = await AIService.generateListingFromVoice(spokenText);
    res.json({ success: true, listing });
  } catch (err: any) {
    res.status(500).json({ success: false, error: err.message });
  }
});
