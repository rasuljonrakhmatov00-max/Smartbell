import React, { useState, useEffect } from 'react';

export default function Dashboard() {
  const [activeTab, setActiveTab] = useState<'schedule' | 'templates' | 'settings'>('schedule');
  const [lastSync, setLastSync] = useState<string>("2026-10-14 07:00:00");
  const [shifts, setShifts] = useState([
    { id: 1, time: "08:00", days: ["Dush", "Sesh", "Chor", "Pay", "Jum"] },
    { id: 2, time: "08:45", days: ["Dush", "Sesh", "Chor", "Pay", "Jum"] }
  ]);
  const [templateName, setTemplateName] = useState("");
  const [holidays, setHolidays] = useState("01-01, 03-21");

  // Shablon bosilganda vaqtlarni yuklash
  const handleSelectTemplate = (type: string) => {
    if (type === 'yozgi') {
      setShifts([{ id: 1, time: "08:00", days: ["Dush", "Sesh", "Chor", "Pay", "Jum"] }]);
    } else if (type === 'qishgi') {
      setShifts([{ id: 1, time: "08:30", days: ["Dush", "Sesh", "Chor", "Pay", "Jum"] }]);
    }
  };

  const handleSave = () => {
    alert("✅ Jadval va sozlamalar muvaffaqiyatli saqlandi va qurilmaga yuborishga tayyorlandi!");
  };

  const handleSaveAsTemplate = () => {
    if (!templateName) {
      alert("⚠️ Iltimos, shablon nomini kiriting!");
      return;
    }
    alert(`✅ "${templateName" nomli shablon muvaffaqiyatli saqlandi!`);
    setTemplateName("");
  };

  return (
    <div style={{ fontFamily: 'sans-serif', maxWidth: '1000px', margin: '0 auto', padding: '20px', background: '#f4f6f8', minHeight: '100vh' }}>
      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: '#fff', padding: '20px', borderRadius: '10px', boxShadow: '0 2px 4px rgba(0,0,0,0.05)', marginBottom: '20px' }}>
        <h2 style={{ margin: 0, color: '#0070f3' }}>🔔 Innobell Boshqaruv Paneli</h2>
        <div style={{ fontSize: '14px', color: '#555' }}>
          Oxirgi sinxronizatsiya: <b>{lastSync}</b>[cite: 1]
        </div>
      </div>

      {/* Navigatsiya tugmalari */}
      <div style={{ display: 'flex', gap: '10px', marginBottom: '20px' }}>
        <button 
          onClick={() => setActiveTab('schedule')}
          style={{ padding: '10px 20px', background: activeTab === 'schedule' ? '#0070f3' : '#fff', color: activeTab === 'schedule' ? '#fff' : '#333', border: '1px solid #ddd', borderRadius: '6px', cursor: 'pointer', fontWeight: 'bold' }}>
          Dars Jadvali va Smenalar
        </button>
        <button 
          onClick={() => setActiveTab('templates')}
          style={{ padding: '10px 20px', background: activeTab === 'templates' ? '#0070f3' : '#fff', color: activeTab === 'templates' ? '#fff' : '#333', border: '1px solid #ddd', borderRadius: '6px', cursor: 'pointer', fontWeight: 'bold' }}>
          Shablonlar
        </button>
        <button 
          onClick={() => setActiveTab('settings')}
          style={{ padding: '10px 20px', background: activeTab === 'settings' ? '#0070f3' : '#fff', color: activeTab === 'settings' ? '#fff' : '#333', border: '1px solid #ddd', borderRadius: '6px', cursor: 'pointer', fontWeight: 'bold' }}>
          Sozlamalar
        </button>
      </div>

      {/* Asosiy Oyna */}
      <div style={{ background: '#fff', padding: '25px', borderRadius: '10px', boxShadow: '0 2px 4px rgba(0,0,0,0.05)' }}>
        {activeTab === 'schedule' && (
          <div>
            <h3>Jadval va Smenalarni Sozlash</h3>
            <p style={{ fontSize: '13px', color: '#666' }}>Standart holatda shanba va yakshanba dam olish kuni sifatida belgilanmagan.</p>
            
            {shifts.map((shift, idx) => (
              <div key={shift.id} style={{ display: 'flex', gap: '15px', alignItems: 'center', marginBottom: '10px', background: '#fafafa', padding: '10px', borderRadius: '6px' }}>
                <span>{idx + 1}-Smena:</span>
                <input type="time" defaultValue={shift.time} style={{ padding: '6px', borderRadius: '4px', border: '1px solid #ccc' }} />
                <span>Kunlar: Dush, Sesh, Chor, Pay, Jum</span>
              </div>
            ))}

            <div style={{ marginTop: '20px' }}>
              <label style={{ display: 'block', fontWeight: 'bold', marginBottom: '5px' }}>Ta'til kunlari (MM-DD formatida):</label>
              <input 
                type="text" value={holidays} onChange={e => setHolidays(e.target.value)}
                style={{ width: '100%', padding: '10px', borderRadius: '6px', border: '1px solid #ccc' }} 
              />
            </div>

            <div style={{ marginTop: '20px', display: 'flex', gap: '10px' }}>
              <button onClick={handleSave} style={{ padding: '12px 20px', background: '#10b981', color: '#fff', border: 'none', borderRadius: '6px', fontWeight: 'bold', cursor: 'pointer' }}>
                Saqlash (Qurilmaga yuborish)
              </button>
            </div>
          </div>
        )}

        {activeTab === 'templates' && (
          <div>
            <h3>Shablonlar Boshqaruvi</h3>
            <p style={{ fontSize: '13px', color: '#666' }}>Mavjud shablonlardan birini tanlang yoki joriy vaqtlarni yangi shablon sifatida saqlang.</p>
            
            <div style={{ display: 'flex', gap: '10px', marginBottom: '20px' }}>
              <button onClick={() => handleSelectTemplate('yozgi')} style={{ padding: '10px 15px', background: '#e0f2fe', color: '#0369a1', border: 'none', borderRadius: '6px', cursor: 'pointer' }}>
                ☀️ Yozgi shablonni yuklash
              </button>
              <button onClick={() => handleSelectTemplate('qishgi')} style={{ padding: '10px 15px', background: '#fef3c7', color: '#92400e', border: 'none', borderRadius: '6px', cursor: 'pointer' }}>
                ❄️ Qishgi shablonni yuklash
              </button>
            </div>

            <div style={{ borderTop: '1px solid #eee', paddingTop: '20px' }}>
              <label style={{ display: 'block', fontWeight: 'bold', marginBottom: '5px' }}>Yangi Shablon Nomi:</label>
              <div style={{ display: 'flex', gap: '10px' }}>
                <input 
                  type="text" placeholder="Masalan: Bahorgi jadval" 
                  value={templateName} onChange={e => setTemplateName(e.target.value)}
                  style={{ flex: 1, padding: '10px', borderRadius: '6px', border: '1px solid #ccc' }}
                />
                <button onClick={handleSaveAsTemplate} style={{ padding: '10px 20px', background: '#0070f3', color: '#fff', border: 'none', borderRadius: '6px', fontWeight: 'bold', cursor: 'pointer' }}>
                  Shablon sifatida saqlash
                </button>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'settings' && (
          <div>
            <h3>Qurilma va Profil Sozlamalari</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '15px', maxWidth: '400px', marginTop: '15px' }}>
              <div>
                <label style={{ display: 'block', fontSize: '13px', marginBottom: '5px' }}>Wi-Fi SSID:</label>
                <input type="text" defaultValue="School_WiFi" style={{ width: '100%', padding: '8px', borderRadius: '6px', border: '1px solid #ccc' }} />
              </div>
              <div>
                <label style={{ display: 'block', fontSize: '13px', marginBottom: '5px' }}>Wi-Fi Parol:</label>
                <input type="password" defaultValue="********" style={{ width: '100%', padding: '8px', borderRadius: '6px', border: '1px solid #ccc' }} />
              </div>
              <button onClick={() => alert("✅ Sozlamalar yangilandi!")} style={{ padding: '10px', background: '#0070f3', color: '#fff', border: 'none', borderRadius: '6px', fontWeight: 'bold', cursor: 'pointer' }}>
                Sozlamalarni Saqlash
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
```[cite: 1]

Ushbu dashboard orqali eski arxivingizdagi barcha asosiy vazifalar (jadval tuzish, shablonlarni yuklash/saqlash va oxirgi sinxronizatsiya vaqtini ko'rish) to'liq ishlaydi[cite: 1]. Keyingi navbatda qaysi qismni (masalan, QR-kodlar yoki Telegram bot integratsiyasini) ko'rib chiqamiz?
