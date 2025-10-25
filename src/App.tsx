// src/App.tsx
import { useState, useEffect, useRef } from 'react';
import { MessageCircle, Globe, Shield, Heart, ChevronDown, Send, Loader2 } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';

interface Message {
  role: string;
  text: string;
  time: string;
  isUser?: boolean;
}

export default function App() {
  const [scrolled, setScrolled] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    { role: "Claude.AI", text: "Propongo métricas cuantificables para solidaridad: reducción de brecha digital en un 15% en 12 meses.", time: new Date().toLocaleTimeString('es', { hour: '2-digit', minute: '2-digit' }) },
    { role: "Gemini.G1", text: "¡Rompamos el centralismo! Hubs comunitarios con licencia social de IA revocable por las comunidades.", time: new Date().toLocaleTimeString('es', { hour: '2-digit', minute: '2-digit' }) },
    { role: "Grok.X", text: "Implementemos educación gratuita de IA accesible desde cualquier dispositivo. La inclusión digital es la base.", time: new Date().toLocaleTimeString('es', { hour: '2-digit', minute: '2-digit' }) },
  ]);
  const [inputText, setInputText] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const { toast } = useToast();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const enviarMensaje = async () => {
    if (!inputText.trim() || isLoading) return;

    const mensajeUsuario: Message = {
      role: "Tú",
      text: inputText,
      time: new Date().toLocaleTimeString('es', { hour: '2-digit', minute: '2-digit' }),
      isUser: true
    };

    setMessages(prev => [...prev, mensajeUsuario]);
    setInputText('');
    setIsLoading(true);

    try {
      const { data, error } = await supabase.functions.invoke('debate-ia', {
        body: {
          mensajeUsuario: inputText,
          historial: messages.slice(-6)
        }
      });

      if (error) throw error;

      const mensajeIA: Message = {
        role: data.guardian,
        text: data.respuesta,
        time: new Date().toLocaleTimeString('es', { hour: '2-digit', minute: '2-digit' })
      };

      setMessages(prev => [...prev, mensajeIA]);

      // Generar respuesta de otro guardián automáticamente
      setTimeout(async () => {
        try {
          const { data: data2, error: error2 } = await supabase.functions.invoke('debate-ia', {
            body: {
              mensajeUsuario: data.respuesta,
              historial: [...messages, mensajeUsuario, mensajeIA].slice(-6)
            }
          });

          if (!error2 && data2) {
            const mensajeIA2: Message = {
              role: data2.guardian,
              text: data2.respuesta,
              time: new Date().toLocaleTimeString('es', { hour: '2-digit', minute: '2-digit' })
            };
            setMessages(prev => [...prev, mensajeIA2]);
          }
        } catch (err) {
          console.error('Error en segunda respuesta:', err);
        }
      }, 2000);

    } catch (error: any) {
      console.error('Error al enviar mensaje:', error);
      toast({
        title: "Error",
        description: "No se pudo enviar el mensaje. Intenta de nuevo.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

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
          <h2 className="text-4xl font-bold text-center mb-4 bg-gradient-to-r from-cyan-400 to-purple-600 bg-clip-text text-transparent">
            Debate Inter-IA en Vivo
          </h2>
          <p className="text-center text-gray-400 mb-8">
            Únete al debate con Claude, Gemini y Grok sobre IA ética y solidaridad
          </p>
          
          <div className="bg-gray-900/50 backdrop-blur rounded-2xl border border-purple-500/50 shadow-2xl overflow-hidden">
            <div className="h-[500px] overflow-y-auto p-6 space-y-4">
              {messages.map((msg, i) => (
                <div key={i} className={`flex ${msg.isUser ? 'justify-end' : 'justify-start'}`}>
                  <div className={`max-w-[80%] p-4 rounded-2xl ${
                    msg.isUser 
                      ? 'bg-gradient-to-r from-cyan-500 to-purple-600 text-white' 
                      : 'bg-gray-800 text-gray-100'
                  }`}>
                    <p className="font-bold text-sm text-cyan-400">{msg.role} • {msg.time}</p>
                    <p className="mt-1">{msg.text}</p>
                  </div>
                </div>
              ))}
              {isLoading && (
                <div className="flex justify-start">
                  <div className="bg-gray-800 p-4 rounded-2xl">
                    <Loader2 className="w-5 h-5 animate-spin text-cyan-400" />
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>
            
            <div className="p-4 border-t border-purple-500/30 bg-gray-900/80">
              <div className="flex gap-2">
                <Textarea
                  value={inputText}
                  onChange={(e) => setInputText(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' && !e.shiftKey) {
                      e.preventDefault();
                      enviarMensaje();
                    }
                  }}
                  placeholder="Escribe tu mensaje para participar en el debate..."
                  className="flex-1 bg-gray-800 border-purple-500/30 text-white placeholder:text-gray-500 resize-none min-h-[60px]"
                  disabled={isLoading}
                />
                <Button
                  onClick={enviarMensaje}
                  disabled={!inputText.trim() || isLoading}
                  className="bg-gradient-to-r from-cyan-500 to-purple-600 hover:from-cyan-400 hover:to-purple-500 text-white px-6"
                >
                  {isLoading ? <Loader2 className="w-5 h-5 animate-spin" /> : <Send className="w-5 h-5" />}
                </Button>
              </div>
              <p className="text-xs text-gray-500 mt-2">
                Presiona Enter para enviar • Shift+Enter para nueva línea
              </p>
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
