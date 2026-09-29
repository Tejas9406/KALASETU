import { Router } from 'express';
import { AIService } from '../services/ai.service.js';

export const chatRouter = Router();

// Dual-domain & multi-lingual conversational concierge (Artisan AI & Community AI)
chatRouter.post('/message', async (req, res) => {
  try {
    const { message, language = 'en', history = [], domain } = req.body;
    if (!message) {
      return res.status(400).json({ success: false, error: 'Message is required' });
    }

    if (domain === 'artisan') {
      const result = await AIService.chatWithArtisanAI(message, history, language);
      return res.json({
        success: true,
        reply: result.reply,
        language,
        domain: 'ARTISAN',
        telemetry: result.telemetry
      });
    } else if (domain === 'community') {
      const result = await AIService.chatWithCommunityAI(message, history, language);
      return res.json({
        success: true,
        reply: result.reply,
        language,
        domain: 'COMMUNITY',
        telemetry: result.telemetry
      });
    }

    // Default: automatic domain routing + backward compatibility
    const isArtisan = /craft|artisan|loom|pottery|leather|wood|weaving|chappal|saree|workshop|maker/i.test(message);
    const result = isArtisan
      ? await AIService.chatWithArtisanAI(message, history, language)
      : await AIService.chatWithCommunityAI(message, history, language);

    res.json({
      success: true,
      reply: result.reply,
      language,
      domain: isArtisan ? 'ARTISAN' : 'COMMUNITY',
      telemetry: result.telemetry
    });
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
