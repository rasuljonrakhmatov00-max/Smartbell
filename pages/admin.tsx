import React, { useState } from 'react';

export default function AdminDashboard() {
  const [schoolId, setSchoolId] = useState('');
  const [timesText, setTimesText] = useState('08:00, 08:45, 09:00, 09:45');
  const [holidaysText, setHolidaysText] = useState('03-21, 09-01, 12-31');
  const [loading, setLoading] = useState(false);

  const handleSave = async () => {
    if (!schoolId) {
      alert("Iltimos, School ID ni kiriting!");
      return;
    }
    setLoading(true);

    const shifts = [
      { id: 1, days: [1, 2, 3, 4, 5], times: timesText.split(',').map(s => s.trim()) }
    ];
    const holidays = holidaysText.split(',').map(s => s.trim());

    const res = await fetch('/api/school/save-schedule', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ schoolId, shifts, holidays })
    });

    setLoading(false);
    if (res.ok) alert("✅ Jadval saqlandi! ESP-01 keyingi sinxronizatsiyada buni yuklab oladi.");
    else alert("❌ Xatolik yuz berdi.");
  };

  return (
    <div style={{ padding: '30px', maxWidth: '800px', margin: '0 auto', fontFamily: 'sans-serif' }}>
      <h1>🏫 Maktab Boshqaruv Paneli</h1>
      <hr style={{ margin: '20px 0' }} />

      <div style={{ marginBottom: '20px' }}>
        <label style={{ display: 'block', fontWeight: 'bold', marginBottom: '5px' }}>Maktab (School) ID (UUID):</label>
        <input 
          type="text" 
          placeholder="masalan: 123e4567-e89b-12d3-a456-426614174000" 
          value={schoolId} 
          onChange={e => setSchoolId(e.target.value)}
          style={{ width: '100%', padding: '10px', borderRadius: '6px', border: '1px solid #ccc' }}
        />
      </div>

      <div style={{ marginBottom: '20px' }}>
        <label style={{ display: 'block', fontWeight: 'bold', marginBottom: '5px' }}>Dars vaqtlari (Vergul bilan ajrating):</label>
        <input 
          type="text" 
          value={timesText} 
          onChange={e => setTimesText(e.target.value)}
          style={{ width: '100%', padding: '10px', borderRadius: '6px', border: '1px solid #ccc' }}
        />
      </div>

      <div style={{ marginBottom: '20px' }}>
        <label style={{ display: 'block', fontWeight: 'bold', marginBottom: '5px' }}>Ta'til kunlari (MM-DD formatida, vergul bilan):</label>
        <input 
          type="text" 
          value={holidaysText} 
          onChange={e => setHolidaysText(e.target.value)}
          style={{ width: '100%', padding: '10px', borderRadius: '6px', border: '1px solid #ccc' }}
        />
      </div>

      <button 
        onClick={handleSave} 
        disabled={loading}
        style={{ padding: '12px 24px', backgroundColor: '#28a745', color: '#fff', border: 'none', borderRadius: '6px', fontSize: '1rem', cursor: 'pointer', fontWeight: 'bold' }}>
        {loading ? 'Saqlanmoqda...' : '💾 Saqlash va Versiyani Oshirish'}
      </button>
    </div>
  );
}
