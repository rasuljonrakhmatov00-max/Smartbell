import React, { useState } from 'react';

export default function Home() {
  const [form, setForm] = useState({ fullName: '', phone: '', telegramId: '', address: '' });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const res = await fetch('/api/order', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form)
    });
    if (res.ok) setSubmitted(true);
  };

  return (
    <div style={{ fontFamily: 'sans-serif', maxWidth: '800px', margin: '0 auto', padding: '40px 20px' }}>
      <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '40px' }}>
        <h1 style={{ color: '#0070f3', margin: 0 }}>🔔 SmartBell</h1>
        <a href="/admin" style={{ padding: '10px 18px', backgroundColor: '#333', color: '#fff', borderRadius: '6px', textDecoration: 'none', fontWeight: 'bold' }}>
          Maktab Kabineti
        </a>
      </header>

      <main style={{ background: '#f9f9f9', padding: '30px', borderRadius: '12px', border: '1px solid #eaeaea' }}>
        <h2>SmartBell Qurilmasiga Buyurtma Berish</h2>
        <p>Maktab va muassasalar uchun avtomatlashtirilgan aqlli qo'ng'iroq tizimi.</p>

        {submitted ? (
          <div style={{ color: 'green', fontWeight: 'bold', padding: '20px 0' }}>
            ✅ Buyurtmangiz qabul qilindi! Tez orada siz bilan bog'lanamiz.
          </div>
        ) : (
          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '15px', marginTop: '20px' }}>
            <input 
              type="text" placeholder="F.I.Sh" required 
              value={form.fullName} onChange={e => setForm({...form, fullName: e.target.value})}
              style={{ padding: '12px', borderRadius: '6px', border: '1px solid #ccc' }}
            />
            <input 
              type="text" placeholder="Telefon raqam" required 
              value={form.phone} onChange={e => setForm({...form, phone: e.target.value})}
              style={{ padding: '12px', borderRadius: '6px', border: '1px solid #ccc' }}
            />
            <input 
              type="text" placeholder="Telegram Username / ID" 
              value={form.telegramId} onChange={e => setForm({...form, telegramId: e.target.value})}
              style={{ padding: '12px', borderRadius: '6px', border: '1px solid #ccc' }}
            />
            <textarea 
              placeholder="Yetkazib berish manzili" 
              value={form.address} onChange={e => setForm({...form, address: e.target.value})}
              style={{ padding: '12px', borderRadius: '6px', border: '1px solid #ccc', height: '80px' }}
            />
            <button type="submit" style={{ padding: '14px', backgroundColor: '#0070f3', color: '#fff', border: 'none', borderRadius: '6px', fontSize: '1rem', cursor: 'pointer', fontWeight: 'bold' }}>
              Buyurtma yuborish
            </button>
          </form>
        )}
      </main>
    </div>
  );
}
