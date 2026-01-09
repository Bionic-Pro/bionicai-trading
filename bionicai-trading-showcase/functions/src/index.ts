import { onRequest } from 'firebase-functions/v2/https';
import { logger } from 'firebase-functions/v2';
import * as crypto from 'crypto';

// Type definitions for Firebase Functions v2
interface Request {
  body?: any;
  ip?: string;
  headers?: Record<string, string>;
}

interface Response {
  status(code: number): Response;
  json(data: any): void;
  send(data: any): void;
}

const BLOFIN_BASE_URL = 'https://openapi.blofin.com';

// Generate HMAC-SHA256 signature for Blofin API
function generateSignature(timestamp: string, method: string, path: string, body: string = ''): string {
  const secret = process.env.BLOFIN_API_SECRET;
  if (!secret) {
    throw new Error('BLOFIN_API_SECRET not configured');
  }
  
  const message = timestamp + method + path + body;
  return crypto.createHmac('sha256', secret).update(message).digest('base64');
}

// Rate limiting store
const rateLimitStore = new Map<string, number[]>();

function rateLimit(key: string, limit: number, windowMs: number): boolean {
  const now = Date.now();
  const windowStart = now - windowMs;
  
  if (!rateLimitStore.has(key)) {
    rateLimitStore.set(key, []);
  }
  
  const requests = rateLimitStore.get(key)!.filter(time => time > windowStart);
  
  if (requests.length >= limit) {
    return false;
  }
  
  requests.push(now);
  rateLimitStore.set(key, requests);
  return true;
}

// Main proxy function for Blofin API
export const blofinProxy = onRequest({
  cors: true,
  secrets: ['BLOFIN_API_KEY', 'BLOFIN_API_SECRET', 'BLOFIN_API_PASSPHRASE'],
}, async (req: Request, res: Response) => {
  // Rate limiting
  const clientIP = req.ip || 'unknown';
  if (!rateLimit(`blofin_api_${clientIP}`, 30, 60000)) {
    res.status(429).json({ error: 'Rate limit exceeded' });
    return;
  }

  try {
    const { endpoint, method = 'GET', body = '' } = req.body;
    
    if (!endpoint) {
      res.status(400).json({ error: 'Endpoint is required' });
      return;
    }

    const timestamp = Date.now().toString();
    const signature = generateSignature(timestamp, method, endpoint, body);
    
    const headers: Record<string, string> = {
      'BF-ACCESS-KEY': process.env.BLOFIN_API_KEY!,
      'BF-ACCESS-SIGN': signature,
      'BF-ACCESS-TIMESTAMP': timestamp,
      'BF-ACCESS-PASSPHRASE': process.env.BLOFIN_API_PASSPHRASE!,
      'Content-Type': 'application/json',
    };

    const url = `${BLOFIN_BASE_URL}${endpoint}`;
    
    logger.info(`Making Blofin API call: ${method} ${url}`);

    const response = await fetch(url, {
      method,
      headers,
      body: method !== 'GET' ? body : undefined,
    });

    if (!response.ok) {
      const errorText = await response.text();
      logger.error(`Blofin API error: ${response.status} - ${errorText}`);
      res.status(response.status).json({ 
        error: `Blofin API error: ${response.status}`,
        details: errorText 
      });
      return;
    }

    const data = await response.json();
    logger.info(`Blofin API success: ${endpoint}`);
    
    res.json(data);
    
  } catch (error) {
    logger.error('Blofin proxy error:', error);
    res.status(500).json({ 
      error: 'Internal server error',
      message: error instanceof Error ? error.message : 'Unknown error'
    });
  }
});

// WebSocket connection handler for real-time data
export const blofinWebSocket = onRequest({
  cors: true,
}, async (req: Request, res: Response) => {
  // This would handle WebSocket connections for real-time data
  // For now, return a simple status
  res.json({ 
    status: 'WebSocket handler ready',
    message: 'Real-time data streaming available'
  });
});

// Webhook handler for Telegram/Discord notifications
export const sendNotification = onRequest({
  cors: true,
  secrets: ['TELEGRAM_BOT_TOKEN', 'DISCORD_WEBHOOK_URL'],
}, async (req: Request, res: Response) => {
  try {
    const { type, message, chatId } = req.body;
    
    if (type === 'telegram' && process.env.TELEGRAM_BOT_TOKEN) {
      // Send to Telegram
      const telegramUrl = `https://api.telegram.org/bot${process.env.TELEGRAM_BOT_TOKEN}/sendMessage`;
      
      const response = await fetch(telegramUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          chat_id: chatId || process.env.TELEGRAM_CHAT_ID,
          text: message,
          parse_mode: 'HTML'
        })
      });

      if (response.ok) {
        res.json({ success: true, platform: 'telegram' });
      } else {
        res.status(400).json({ error: 'Failed to send Telegram message' });
      }
    } else if (type === 'discord' && process.env.DISCORD_WEBHOOK_URL) {
      // Send to Discord
      const response = await fetch(process.env.DISCORD_WEBHOOK_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          content: message,
          username: 'BionicAI Trading Bot'
        })
      });

      if (response.ok) {
        res.json({ success: true, platform: 'discord' });
      } else {
        res.status(400).json({ error: 'Failed to send Discord message' });
      }
    } else {
      res.status(400).json({ error: 'Invalid notification type or missing configuration' });
    }
  } catch (error) {
    logger.error('Notification error:', error);
    res.status(500).json({ error: 'Failed to send notification' });
  }
});
