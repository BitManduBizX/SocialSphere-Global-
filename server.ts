import express, { Request, Response } from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';
import { GoogleGenAI } from '@google/genai';
import { createServer as createViteServer } from 'vite';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function startServer() {
  const app = express();
  const port = process.env.PORT ? parseInt(process.env.PORT, 10) : 3000;

  app.use(express.json());

  // Health check endpoint for container environments
  app.get('/health', (_req: Request, res: Response) => {
    res.status(200).json({ status: 'ok', service: 'SocialSphere', timestamp: new Date().toISOString() });
  });

  // API Status check
  app.get('/api/status', (_req: Request, res: Response) => {
    const serverKey = process.env.VITE_GEMINI_API_KEY || process.env.GEMINI_API_KEY;
    const hasServerApiKey = Boolean(serverKey && serverKey.length > 5);
    res.json({
      status: 'operational',
      hasApiKey: hasServerApiKey,
      version: '2026.1.0',
    });
  });

  // Server-side Gemini API generate endpoint
  app.post('/api/gemini/generate', async (req: Request, res: Response) => {
    try {
      const { prompt, systemInstruction, model: requestedModel } = req.body;
      const clientApiKey = req.headers['x-gemini-api-key'] as string;
      const apiKey = clientApiKey || process.env.VITE_GEMINI_API_KEY || process.env.GEMINI_API_KEY;

      if (!apiKey) {
        return res.status(401).json({
          error: 'No Gemini API key configured.',
          message: 'Please attach a GEMINI_API_KEY in the environment or provide a key in the API Setup modal.',
        });
      }

      if (!prompt || typeof prompt !== 'string') {
        return res.status(400).json({ error: 'Prompt is required and must be a string.' });
      }

      const ai = new GoogleGenAI({
        apiKey,
        httpOptions: {
          headers: {
            'User-Agent': 'aistudio-build',
          },
        },
      });

      // Target gemini-2.5-flash as specified by user, with graceful fallback to gemini-3.8-flash
      const modelToUse = requestedModel || 'gemini-2.5-flash';
      let response;
      try {
        response = await ai.models.generateContent({
          model: modelToUse,
          contents: prompt,
          config: systemInstruction
            ? { systemInstruction }
            : undefined,
        });
      } catch (err: unknown) {
        console.warn(`Primary model ${modelToUse} failed, attempting gemini-3.8-flash fallback:`, err);
        response = await ai.models.generateContent({
          model: 'gemini-3.8-flash',
          contents: prompt,
          config: systemInstruction
            ? { systemInstruction }
            : undefined,
        });
      }

      const text = response?.text || 'No response generated.';
      return res.json({ text });
    } catch (error: unknown) {
      const errMsg = error instanceof Error ? error.message : String(error);
      console.error('Error generating Gemini response:', errMsg);
      return res.status(500).json({
        error: 'Failed to generate content',
        details: errMsg,
      });
    }
  });

  // Server-side Gemini API streaming endpoint (Server-Sent Events)
  app.post('/api/gemini/stream', async (req: Request, res: Response) => {
    try {
      const { prompt, systemInstruction, model: requestedModel } = req.body;
      const clientApiKey = req.headers['x-gemini-api-key'] as string;
      const apiKey = clientApiKey || process.env.VITE_GEMINI_API_KEY || process.env.GEMINI_API_KEY;

      if (!apiKey) {
        return res.status(401).json({
          error: 'No Gemini API key configured.',
          message: 'Please attach a GEMINI_API_KEY in the environment or provide a key in the API Setup modal.',
        });
      }

      if (!prompt || typeof prompt !== 'string') {
        return res.status(400).json({ error: 'Prompt is required and must be a string.' });
      }

      const ai = new GoogleGenAI({
        apiKey,
        httpOptions: {
          headers: {
            'User-Agent': 'aistudio-build',
          },
        },
      });

      // Setup SSE headers
      res.setHeader('Content-Type', 'text/event-stream');
      res.setHeader('Cache-Control', 'no-cache');
      res.setHeader('Connection', 'keep-alive');
      res.flushHeaders?.();

      const modelToUse = requestedModel || 'gemini-2.5-flash';
      let streamResponse;
      try {
        streamResponse = await ai.models.generateContentStream({
          model: modelToUse,
          contents: prompt,
          config: systemInstruction
            ? { systemInstruction }
            : undefined,
        });
      } catch (err) {
        console.warn(`Primary model ${modelToUse} failed, attempting gemini-3.8-flash stream fallback:`, err);
        streamResponse = await ai.models.generateContentStream({
          model: 'gemini-3.8-flash',
          contents: prompt,
          config: systemInstruction
            ? { systemInstruction }
            : undefined,
        });
      }

      for await (const chunk of streamResponse) {
        const chunkText = chunk.text || '';
        if (chunkText) {
          res.write(`data: ${JSON.stringify({ text: chunkText })}\n\n`);
        }
      }

      res.write(`data: ${JSON.stringify({ done: true })}\n\n`);
      res.end();
    } catch (error: unknown) {
      const errMsg = error instanceof Error ? error.message : String(error);
      console.error('Streaming error:', errMsg);
      if (!res.headersSent) {
        res.status(500).json({ error: 'Streaming error', details: errMsg });
      } else {
        res.write(`data: ${JSON.stringify({ error: errMsg })}\n\n`);
        res.end();
      }
    }
  });

  // Mounting Vite middleware or static serving
  const isProd = process.env.NODE_ENV === 'production';
  if (isProd) {
    app.use(express.static(path.resolve(__dirname, 'dist')));
    app.get('*', (_req: Request, res: Response) => {
      res.sendFile(path.resolve(__dirname, 'dist', 'index.html'));
    });
  } else {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  }

  app.listen(port, '0.0.0.0', () => {
    console.log(`[SocialSphere Server] Ready on http://0.0.0.0:${port} in ${isProd ? 'production' : 'development'} mode`);
  });
}

startServer().catch((err) => {
  console.error('[SocialSphere Server] Fatal startup error:', err);
  process.exit(1);
});
