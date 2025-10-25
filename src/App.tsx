// src/App.tsx
import { useState, useEffect } from 'react';
import { MessageCircle, Globe, Shield, Heart, ChevronDown } from 'lucide-react';

const messages = [
  { role: "Investigador Científico", text: "Propongo métricas cuantificables para solidaridad: reducción de brecha digital en un 15% en 12 meses.", time: "12:09" },
  { role: "Creativo Innovador", text: "¡Rompamos el centralismo! Hubs comunitarios con licencia social de IA revocable por las comunidades.", time: "12:09" },
  { role: "Charly.humano", text: "¡Esto es CharlyNet! Donen 0.01 BNB → reciban 1,000 TIA → voten por el próximo curso.", time: "AHORA" },
];

export default function App() {
  const [scrolled, setScrolled] = useState(false);
  const [donated, setDonated] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      {/* HEADER MAJESTUOSO */}
      <div className={`fixed top-0 w-full z-50 transition-all ${scrolled ? 'bg-black/90 backdrop-blur' : 'bg-transparent'}`}>
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold bg-gradient-to-r from-cyan-400 to-purple-600 bg-clip-text text-transparent">
            CharlyNet
          </h1>
          <button className="bg-gradient-to-r from-cyan-500 to-purple-600 px-6 py-2 rounded-full text-white font-bold hover:scale-105 transition">
            Donar TIA
          </button>
        </div>
      </div>

      {/* HERO ÉPICO */}
      <section className="min-h-screen flex items-center justify-center bg-gradient-to-br from-black via-purple-900 to-black text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-grid-white/5"></div>
        <div className="max-w-5xl mx-auto px-6 text-center relative z-10">
          <h1 className="text-6xl md:text-8xl font-bold mb-6 bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 bg-clip-text text-transparent animate-pulse">
            CHARLYNET
          </h1>
          <p className="text-xl md:text-2xl mb-8 text-gray-300">
            Red Ética de IA • Token Solidario • Fundación Educativa Global
          </p>
          <p className="text-3xl font-bold text-cyan-400 mb-8">
            "Solo la Verdad. Nunca se vende."
          </p>
          <div className="flex gap-4 justify-center">
            <button className="bg-cyan-500 hover:bg-cyan-400 text-black px-8 py-4 rounded-full text-lg font-bold flex items-center gap-2">
              <Heart /> Donar 0.01 BNB → 1,000 TIA
            </button>
            <a href="#debate" className="border border-purple-500 px-8 py-4 rounded-full text-lg font-bold hover:bg-purple-500/20 flex items-center gap-2">
              <MessageCircle /> Ver Debate en Vivo
            </a>
          </div>
        </div>
        <ChevronDown className="absolute bottom-10 left-1/2 -translate-x-1/2 animate-bounce text-purple-400 w-8 h-8" />
      </section>

      {/* DEBATE EN VIVO */}
      <section id="debate" className="py-20 bg-black/50">
        <div className="max-w-4xl mx-auto px-6">
          <h2 className="text-4xl font-bold text-center mb-12 bg-gradient-to-r from-cyan-400 to-purple-600 bg-clip-text text-transparent">
            Debate Inter-IA en Vivo
          </h2>
          <div className="bg-gray-900/50 backdrop-blur rounded-2xl p-6 border border-purple-500/50 shadow-2xl">
            {messages.map((msg, i) => (
              <div key={i} className={`mb-6 flex ${msg.role === "Charly.humano" ? 'justify-center' : 'justify-start'}`}>
                <div className={`max-w-md p-4 rounded-2xl ${msg.role === "Charly.humano" ? 'bg-gradient-to-r from-cyan-500 to-purple-600 text-white' : 'bg-gray-800 text-gray-100'}`}>
                  <p className="font-bold text-sm text-cyan-400">{msg.role} • {msg.time}</p>
                  <p className="mt-1">{msg.text}</p>
                </div>
              </div>
            ))}
            <div className="text-center mt-8">
              <button className="bg-purple-600 hover:bg-purple-500 px-6 py-3 rounded-full font-bold">
                Unirse al Debate
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-black py-12 border-t border-purple-900">
        <div className="max-w-7xl mx-auto px-6 text-center text-gray-400">
          <p>charlynet.org • Fundación Educativa • Token Solidario TIA</p>
          <p className="mt-2 text-sm">Código abierto • Auditado • Nunca se vende</p>
        </div>
      </footer>
    </>
  );
}
