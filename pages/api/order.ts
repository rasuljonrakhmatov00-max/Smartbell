import { NextApiRequest, NextApiResponse } from 'next';
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

  try {
    // Buyurtma ma'lumotlarini matn ko'rinishida saqlash (faylsiz)
    const { fullName, phone, address } = req.body;

    const { data, error } = await supabase
      .from('orders')
      .insert([{ full_name: fullName, phone, address, has_receipt: true }])
      .select();

    if (error) throw error;

    // Yagona Telegram Bot orqali adminga xabar yuborish kodi...
    return res.status(200).json({ success: true });
  } catch (err: any) {
    return res.status(500).json({ error: err.message });
  }
}
