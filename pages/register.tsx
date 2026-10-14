import React, { useState } from 'react';

export default function Register() {
  const [login, setLogin] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [telegramBound, setTelegramBound] = useState(false);

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      alert("⚠️ Parollar bir-biriga mos kelmadi!");
      return;
    }

    if (!telegramBound) {
      alert("⚠️ Iltimos, avval Telegramni bog'lang!");
      return;
    }

    // Serverga ro'yxatdan o'tish so'rovini yuborish
    alert("✅ Muvaffaqiyatli ro'yxatdan o'tdingiz!");
  };

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4">
      <div className="bg-white max-w-md w-full p-8 rounded-2xl shadow-xl border border-slate-100">
        <h2 className="text-2xl font-bold mb-2 text-center text-blue-600">Innobell Registratsiya</h2>
        <p className="text-xs text-slate-500 text-center mb-6">Qurilmangizni hisobga biriktirish va sozlash</p>

        <form onSubmit={handleRegister} className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">Login *</label>
            <input 
              type="text" required 
              className="w-full p-3 border border-slate-300 rounded-lg outline-none focus:ring-2 focus:ring-blue-500"
              value={login} onChange={e => setLogin(e.target.value)}
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Parol *</label>
            <input 
              type="password" required 
              className="w-full p-3 border border-slate-300 rounded-lg outline-none focus:ring-2 focus:ring-blue-500"
              value={password} onChange={e => setPassword(e.target.value)}
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Parolni Tasdiqlang *</label>
            <input 
              type="password" required 
              className="w-full p-3 border border-slate-300 rounded-lg outline-none focus:ring-2 focus:ring-blue-500"
              value={confirmPassword} onChange={e => setConfirmPassword(e.target.value)}
            />
          </div>

          <div className="py-2">
            <button 
              type="button"
              onClick={() => {
                window.open('https://t.me/innobell_bot?start=bind', '_blank');
                setTelegramBound(true);
              }}
              className="w-full py-2 px-4 bg-emerald-50 text-emerald-700 border border-emerald-200 rounded-lg font-medium hover:bg-emerald-100 transition flex items-center justify-center gap-2">
              ✈️ {telegramBound ? "Telegram Bog'landi ✅" : "Telegramni Bog'lash (Bot orqali)"}
            </button>
          </div>

          <button 
            type="submit" 
            className="w-full py-3 bg-blue-600 text-white font-bold rounded-lg hover:bg-blue-700 transition">
            Ro'yxatdan O'tish
          </button>
        </form>
      </div>
    </div>
  );
}
