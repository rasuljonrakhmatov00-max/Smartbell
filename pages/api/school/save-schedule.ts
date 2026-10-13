import { NextApiRequest, NextApiResponse } from 'next';
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

  const { schoolId, shifts, holidays } = req.body;

  if (!schoolId) return res.status(400).json({ error: 'schoolId yetishmayapti' });

  // 1. Jadvallarni saqlash / yangilash
  const { error } = await supabase
    .from('schedules')
    .upsert({ school_id: schoolId, shifts, holidays, updated_at: new Date() }, { onConflict: 'school_id' });

  if (error) return res.status(500).json({ error: error.message });

  // 2. Tegishli qurilmaning schedule_version'ini +1 qilish
  const { data: device } = await supabase.from('devices').select('schedule_version').eq('school_id', schoolId).single();
  
  if (device) {
    await supabase
      .from('devices')
      .update({ schedule_version: device.schedule_version + 1 })
      .eq('school_id', schoolId);
  }

  return res.status(200).json({ success: true });
}
