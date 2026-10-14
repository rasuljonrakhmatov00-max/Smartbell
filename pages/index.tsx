import React, { useState } from 'react';

export default function Home() {
  const [form, setForm] = useState({ fullName: '', phone: '', address: '' });
  const [file, setFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData();
    formData.append('fullName', form.fullName);
    formData.append('phone', form.phone);
    formData.append('address', form.address);
    if (file) formData.append('receipt', file);

    const res = await fetch('/api/order', {
      method: 'POST',
      body: formData,
    });

    setLoading(false);
    if (res.ok) setSubmitted(true);
    else alert("Xatolik yuz berdi, qayta urinib ko'ring.");
  };

  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-900">
      <header className="max-w-6xl mx-auto px-6 py-6 flex justify-between items-center border-b border-slate-200">
        <h1 className="text-2xl font-bold text-blue-600 flex items-center gap-2">🔔 Innobell</h1>
        <a href="/admin" className="px-5 py-2 bg-slate-800 text-white text-sm font-semibold rounded-lg hover:bg-slate-700 transition">
          Shaxsiy Kabinet
        </a>
      </header>

      <main className="max-w-4xl mx-auto px-6 py-12">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-extrabold mb-4">Ta'lim Muassasalari Uchun Aqlli Qo'ng'iroq Tizimi</h2>
          <p className="text-slate-600 text-lg">Internet orqali avtomatik vaqt sinxronizatsiyasi, moslashuvchan dars jadvallari va avtonom ish rejimi.</p>
        </div>

        {/* Xarid Paneli */}
        <div className="bg-white p-8 rounded-2xl shadow-xl border border-slate-100">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-2xl font-bold">Xarid Qilish</h3>
            <div className="text-right">
              <span className="text-slate-400 line-through text-sm mr-2">799 000 so'm</span>
              <span className="text-2xl font-extrabold text-emerald-600">599 000 so'm</span>
            </div>
          </div>

          {submitted ? (
            <div className="bg-emerald-50 border border-emerald-200 text-emerald-700 p-6 rounded-xl text-center font-semibold">
              ✅ Buyurtmangiz qabul qilindi! Adminlar chekni tekshirib, siz bilan tez orada bog'lanishadi.
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1">Ism va Familiya *</label>
                <input 
                  type="text" required 
                  className="w-full p-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                  value={form.fullName} onChange={e => setForm({...form, fullName: e.target.value})}
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">Telefon Raqam *</label>
                <input 
                  type="text" required 
                  className="w-full p-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                  value={form.phone} onChange={e => setForm({...form, phone: e.target.value})}
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">Yetkazib Berish Manzili</label>
                <textarea 
                  className="w-full p-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                  value={form.address} onChange={e => setForm({...form, address: e.target.value})}
                />
              </div>

              <div className="bg-slate-50 p-4 rounded-xl border border-slate-200">
                <p className="text-sm font-semibold mb-1">To'lov Uchun Karta Raqami:</p>
                <p className="text-lg font-mono text-blue-600 font-bold mb-2">9860 1606 2661 3287 (Raxmatov Rasuljon)</p>
                <label className="block text-sm font-medium mb-1">To'lov Chekini Yuklash (Fayl adminga yuboriladi):</label>
                <input 
                  type="file" accept="image/*,.pdf"
                  onChange={e => setFile(e.target.files ? e.target.files[0] : null)}
                  className="w-full text-sm text-slate-500 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
                />
              </div>

              <button 
                type="submit" disabled={loading}
                className="w-full py-4 bg-blue-600 text-white font-bold rounded-xl hover:bg-blue-700 transition disabled:opacity-50">
                {loading ? 'Yuborilmoqda...' : 'Buyurtma Berish'}
              </button>
            </form>
          )}
        </div>
      </main>
    </div>
  );
}
