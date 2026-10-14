import { NextApiRequest, NextApiResponse } from 'next';
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

const TELEGRAM_BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN;

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

  const { message } = req.body;
  if (!message || !message.text) return res.status(200).json({ ok: true });

  const chatId = message.chat.id;
  const text = message.text;

  // 1. /start buyrug'i va Telegram ID ni profildagi token orqali bog'lash
  if (text.startsWith('/start')) {
    const args = text.split(' ')[1]; // Masalan: /start bind_TOKEN
    
    if (args && args.startsWith('bind')) {
      // Telegram ID ni bazadagi userga yozish
      await supabase
        .from('users')
        .update({ telegram_id: chatId })
        .eq('temp_bind_token', args);

      await sendTelegramMessage(chatId, "✅ Telegram profilingiz Innobell tizimiga muvaffaqiyatli bog'landi!");
    } else {
      await sendTelegramMessage(chatId, "👋 Assalomu alaykum! Innobell rasmiy botiga xush kelibsiz. Parolni tiklash va xabarnomalar shu bot орқали amalga oshiriladi.");
    }
  }

  return res.status(200).json({ success: true });
}

// Telegram'ga habar yuborish yordamchi funksiyasi
async function sendTelegramMessage(chatId: number, text: string) {
  const url = `https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`;
  await fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ chat_id: chatId, text })
  });
}
