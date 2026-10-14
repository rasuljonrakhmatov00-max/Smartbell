import React, { useState } from 'react';

export default function QrManagement() {
  const [qrType, setQrType] = useState<'standard' | 'demo'>('standard');
  const [qrList, setQrList] = useState([
    { id: 1, token: "INN-9842-XYZ", type: "standard", status: "activated", login: "school_15", createdAt: "2026-03-01" },
    { id: 2, token: "DEMO-7711-ABC", type: "demo", status: "created", login: "-", createdAt: "2026-10-10" }
  ]);

  const handleCreateQr = () => {
    const newToken = `${qrType === 'demo' ? 'DEMO' : 'INN'}-${Math.floor(1000 + Math.random() * 9000)}-TOKEN`;
    setQrList([...qrList, {
      id: qrList.length + 1,
      token: newToken,
      type: qrType,
      status: "created",
      login: "-",
      createdAt: new Date().toISOString().split('T')[0]
    }]);
    alert(`✅ Yangi ${qrType.toUpperCase()} QR-kod muvaffaqiyatli yaratildi!`);
  };

  return (
    <div style={{ fontFamily: 'sans-serif', maxWidth: '1000px', margin: '0 auto', padding: '20px', background: '#f4f6f8', minHeight: '100vh' }}>
      <div style={{ background: '#fff', padding: '20px', borderRadius: '10px', boxShadow: '0 2px 4px rgba(0,0,0,0.05)', marginBottom: '20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h2 style={{ margin: 0, color: '#0070f3' }}>🖨️ QR Kodlarni Boshqarish</h2>
        <a href="/admin" style={{ padding: '8px 15px', background: '#e2e8f0', color: '#334155', borderRadius: '6px', textDecoration: 'none', fontSize: '14px', fontWeight: 'bold' }}>
          ← Orqaga (Dashboard)
        </a>
      </div>

      {/* Yaratish Paneli */}
      <div style={{ background: '#fff', padding: '20px', borderRadius: '10px', boxShadow: '0 2px 4px rgba(0,0,0,0.05)', marginBottom: '20px' }}>
        <h3>Yangi QR-kod Generatsiya qilish</h3>
        <div style={{ display: 'flex', gap: '15px', alignItems: 'center', marginTop: '10px' }}>
          <select 
            value={qrType} 
            onChange={(e) => setQrType(e.target.value as 'standard' | 'demo')}
            style={{ padding: '10px', borderRadius: '6px', border: '1px solid #ccc', fontSize: '14px' }}>
            <option value="standard">Standard QR-kod</option>
            <option value="demo">Demo QR-kod (To'lovsiz sinov uchun)</option>
          </select>

          <button 
            onClick={handleCreateQr}
            style={{ padding: '10px 20px', background: '#0070f3', color: '#fff', border: 'none', borderRadius: '6px', fontWeight: 'bold', cursor: 'pointer' }}>
            + QR-kod Yaratish
          </button>
        </div>
      </div>

      {/* QR Kodlar Ro'yxati */}
      <div style={{ background: '#fff', padding: '20px', borderRadius: '10px', boxShadow: '0 2px 4px rgba(0,0,0,0.05)' }}>
        <h3>Faol va Yaratilgan QR Kodlar</h3>
        <table style={{ width: '100%', borderCollapse: 'collapse', marginTop: '15px', textAlign: 'left' }}>
          <thead>
            <tr style={{ borderBottom: '2px solid #eee', color: '#666', fontSize: '14px' }}>
              <th style={{ padding: '10px' }}>Token / Kod</th>
              <th style={{ padding: '10px' }}>Turi</th>
              <th style={{ padding: '10px' }}>Holati</th>
              <th style={{ padding: '10px' }}>Bog'langan Login</th>
              <th style={{ padding: '10px' }}>Yaratilgan sana</th>
              <th style={{ padding: '10px' }}>Amallar</th>
            </tr>
          </thead>
          <tbody>
            {qrList.map((qr) => (
              <tr key={qr.id} style={{ borderBottom: '1px solid #eee', fontSize: '14px' }}>
                <td style={{ padding: '10px', fontFamily: 'monospace', fontWeight: 'bold' }}>{qr.token}</td>
                <td style={{ padding: '10px' }}>
                  <span style={{ padding: '4px 8px', borderRadius: '4px', fontSize: '12px', background: qr.type === 'demo' ? '#fef3c7' : '#e0f2fe', color: qr.type === 'demo' ? '#92400e' : '#0369a1' }}>
                    {qr.type.toUpperCase()}
                  </span>
                </td>
                <td style={{ padding: '10px' }}>
                  <span style={{ color: qr.status === 'activated' ? '#10b981' : '#f59e0b', fontWeight: 'bold' }}>
                    {qr.status === 'activated' ? 'Faollashgan' : 'Yaratilgan'}
                  </span>
                </td>
                <td style={{ padding: '10px' }}>{qr.login}</td>
                <td style={{ padding: '10px', color: '#666' }}>{qr.createdAt}</td>
                <td style={{ padding: '10px' }}>
                  <button onClick={() => alert(`🖨️ ${qr.token} chop etishga tayyorlanmoqda...`)} style={{ padding: '5px 10px', background: '#334155', color: '#fff', border: 'none', borderRadius: '4px', cursor: 'pointer', fontSize: '12px' }}>
                    Chop etish / Yuklab olish
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
