import { NextApiRequest, NextApiResponse } from 'next';
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { token, cv, sv } = req.query;

  if (!token) return res.status(400).json({ error: 'Token majburiy' });

  const { data: device, error } = await supabase
    .from('devices')
    .select('*')
    .eq('token', token)
    .single();

  if (error || !device) return res.status(404).json({ error: 'Qurilma topilmadi' });

  await supabase.from('devices').update({ last_sync: new Date() }).eq('token', token);

  const clientSV = parseInt(sv as string) || 0;
  const response: any = { status: 'ok' };

  if (device.schedule_version > clientSV && device.user_id) {
    const { data: schedule } = await supabase
      .from('schedules')
      .select('*')
      .eq('user_id', device.user_id)
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
