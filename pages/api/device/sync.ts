import { NextApiRequest, NextApiResponse } from 'next';
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { token, cv, sv } = req.query;

  if (!token) return res.status(400).json({ error: 'Token majburiy' });

  // 1. Qurilmani izlash
  const { data: device, error } = await supabase
    .from('devices')
    .select('*')
    .eq('token', token)
    .single();

  if (error || !device) return res.status(404).json({ error: 'Qurilma topilmadi' });

  // 2. Oxirgi ko'ringan vaqtini yangilash
  await supabase.from('devices').update({ last_sync: new Date() }).eq('token', token);

  const clientCV = parseInt(cv as string) || 0;
  const clientSV = parseInt(sv as string) || 0;
  const response: any = { status: 'ok' };

  // 3. Konfiguratsiya o'zgargan bo'lsa
  if (device.config_version > clientCV) {
    response.config = {
      t: device.token,
      ssid: device.wifi_ssid || '',
      pass: device.wifi_pass || '',
      demo: device.is_demo ? 1 : 0,
      DaysLeft: device.demo_days_left,
      v: device.config_version
    };
  }

  // 4. Jadval o'zgargan bo'lsa
  if (device.schedule_version > clientSV && device.school_id) {
    const { data: schedule } = await supabase
      .from('schedules')
      .select('*')
      .eq('school_id', device.school_id)
      .single();

    if (schedule) {
      response.schedule = {
        v: device.schedule_version,
        shifts: schedule.shifts,
        holidays: schedule.holidays
      };
    }
  }

  return res.status(200).json(response);
}
