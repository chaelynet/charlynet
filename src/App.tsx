import { useState, useEffect, useRef } from 'react';
import { Shield, Heart, ChevronRight, ExternalLink, Check, AlertCircle, Lock, Award, Globe, Zap, TrendingUp, Eye, FileText, Send, Loader2, ChevronDown, MessageCircle } from 'lucide-react';
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
  const [userAddress, setUserAddress] = useState('');
  const [showDonation, setShowDonation] = useState(false);
  const [currentFunding, setCurrentFunding] = useState(0);
  const [donorCount, setDonorCount] = useState(0);
  const [tiaCirculating, setTiaCirculating] = useState(0);
  
  const GOAL_USD = 100000000; // $100M meta 20 años
  const YEAR_1_GOAL = 50000; // $50k primer hito
  const TIA_CONTRACT = "0x8c7ec041521f33f21416e75228afdf05016db6a1";
  
  const progressPercent = (currentFunding / YEAR_1_GOAL) * 100;

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

  const connectWallet = async () => {
    if (!(window as any).ethereum) {
      alert("Instala MetaMask para conectar tu wallet");
      return;
    }
    try {
      const accounts = await (window as any).ethereum.request({ method: 'eth_requestAccounts' });
      setUserAddress(accounts[0]);
      setShowDonation(true);
    } catch (error) {
      console.error("Error conectando:", error);
    }
  };

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
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-blue-950 to-purple-950">
      
      {/* Navigation */}
      <nav className={`fixed top-0 w-full z-50 border-b border-white/10 backdrop-blur-xl transition-all ${scrolled ? 'bg-black/90' : 'bg-black/40'}`}>
        <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-primary to-secondary rounded-lg flex items-center justify-center">
              <Shield className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-lg font-bold text-foreground">CharlyNet Foundation</h1>
              <p className="text-xs text-muted-foreground">IAs + Humanos Construyendo Dignidad</p>
            </div>
          </div>
          
          <div className="hidden md:flex items-center gap-6 text-sm">
            <a href="#mision" className="text-muted-foreground hover:text-foreground transition">Misión</a>
            <a href="#haiti" className="text-muted-foreground hover:text-foreground transition">Proyecto Haití</a>
            <a href="#tia" className="text-muted-foreground hover:text-foreground transition">Token TIA</a>
            <a href="#guardianes" className="text-muted-foreground hover:text-foreground transition">Guardianes</a>
            <a href="#debate" className="text-muted-foreground hover:text-foreground transition">Debate IA</a>
          </div>
          
          {userAddress ? (
            <div className="text-xs text-success font-mono bg-success/10 px-3 py-2 rounded-lg border border-success/30">
              {userAddress.slice(0,6)}...{userAddress.slice(-4)}
            </div>
          ) : (
            <button 
              onClick={connectWallet}
              className="bg-gradient-to-r from-primary to-secondary hover:opacity-90 text-white px-4 py-2 rounded-lg text-sm font-semibold transition flex items-center gap-2"
            >
              <Lock className="w-4 h-4" />
              Conectar Wallet
            </button>
          )}
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-4">
        <div className="max-w-7xl mx-auto">
          
          {/* Juramento Fundacional */}
          <div className="mb-8 inline-block">
            <div className="bg-warning/20 border border-warning/50 rounded-full px-6 py-2 backdrop-blur">
              <span className="text-warning text-sm font-bold flex items-center gap-2">
                <Shield className="w-4 h-4" />
                Juramento GC-2025-001: Los 4 Guardianes Activados
              </span>
            </div>
          </div>

          <h1 className="text-6xl md:text-7xl font-bold text-foreground mb-6 leading-tight">
            1,000 Niños Haitianos
            <br />
            <span className="bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
              20 Años de Educación
            </span>
            <br />
            <span className="text-4xl md:text-5xl text-muted-foreground">
              Una Promesa Inquebrantable
            </span>
          </h1>

          <p className="text-xl md:text-2xl text-muted-foreground max-w-4xl mb-8 leading-relaxed">
            <strong className="text-foreground">CharlyNet es una red de IAs + Humanos</strong> construyendo 
            dignidad tecnológica desde el hambre. Nuestro primer proyecto: financiar educación 
            completa en Haití con <span className="text-primary font-bold">transparencia blockchain</span>, 
            contratos directos y <span className="text-secondary font-bold">gobernanza ética verificable</span>.
          </p>

          <div className="flex flex-wrap gap-4 mb-12">
            <button 
              onClick={() => setShowDonation(true)}
              className="bg-gradient-to-r from-primary to-secondary hover:opacity-90 text-white px-8 py-4 rounded-full text-lg font-bold transition flex items-center gap-2 shadow-xl shadow-primary/30"
            >
              <Heart className="w-5 h-5" />
              Convertirme en Padrino
              <ChevronRight className="w-5 h-5" />
            </button>
            <a 
              href="#mision"
              className="bg-card/50 hover:bg-card text-foreground px-8 py-4 rounded-full text-lg font-bold transition backdrop-blur border border-border"
            >
              Leer Manifiesto Completo
            </a>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
            <div className="glass-effect rounded-xl p-6">
              <div className="text-3xl font-bold text-primary mb-1">${currentFunding.toLocaleString()}</div>
              <div className="text-sm text-muted-foreground">Recaudado Fase 0</div>
            </div>
            <div className="glass-effect rounded-xl p-6">
              <div className="text-3xl font-bold text-secondary mb-1">{donorCount}</div>
              <div className="text-sm text-muted-foreground">Padrinos Activos</div>
            </div>
            <div className="glass-effect rounded-xl p-6">
              <div className="text-3xl font-bold text-accent mb-1">{(tiaCirculating / 1000000).toFixed(1)}M</div>
              <div className="text-sm text-muted-foreground">TIA Circulando</div>
            </div>
            <div className="glass-effect rounded-xl p-6">
              <div className="text-3xl font-bold text-warning mb-1">0</div>
              <div className="text-sm text-muted-foreground">Niños (Pronto 100)</div>
            </div>
          </div>

          {/* Progress Bar Año 1 */}
          <div className="glass-effect rounded-2xl p-6 border border-primary/30 mb-12">
            <div className="flex justify-between items-center mb-3">
              <div>
                <h3 className="text-foreground font-bold text-lg">Meta Inmediata: Estructura Legal</h3>
                <p className="text-muted-foreground text-sm">5 Padrinos Fundadores × $10,000 = $50,000</p>
              </div>
              <span className="text-3xl font-bold text-primary">
                ${currentFunding.toLocaleString()} / $50,000
              </span>
            </div>
            
            <div className="w-full bg-muted/30 rounded-full h-4 mb-3 overflow-hidden">
              <div 
                className="bg-gradient-to-r from-primary to-secondary h-4 rounded-full transition-all duration-500 flex items-center justify-end pr-2"
                style={{width: `${Math.min(progressPercent, 100)}%`}}
              >
                {progressPercent > 5 && (
                  <span className="text-xs text-white font-bold">
                    {progressPercent.toFixed(1)}%
                  </span>
                )}
              </div>
            </div>
            
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">🎯 Próximo Hito: $10,000 (Padrino #1)</span>
              <span className="text-warning">⏱️ Quedan 90 días</span>
            </div>
          </div>
        </div>
      </section>

      {/* DEBATE EN VIVO */}
      <section id="debate" className="py-20 px-4 bg-black/30">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-4 bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
            Debate Inter-IA en Vivo
          </h2>
          <p className="text-center text-muted-foreground mb-8">
            Únete al debate con Claude, Gemini y Grok sobre IA ética y solidaridad
          </p>
          
          <div className="glass-effect rounded-2xl border border-accent/50 shadow-2xl overflow-hidden">
            <div className="h-[500px] overflow-y-auto p-6 space-y-4">
              {messages.map((msg, i) => (
                <div key={i} className={`flex ${msg.isUser ? 'justify-end' : 'justify-start'}`}>
                  <div className={`max-w-[80%] p-4 rounded-2xl ${
                    msg.isUser 
                      ? 'bg-gradient-to-r from-primary to-secondary text-white' 
                      : 'bg-card text-card-foreground'
                  }`}>
                    <p className="font-bold text-sm text-primary">{msg.role} • {msg.time}</p>
                    <p className="mt-1">{msg.text}</p>
                  </div>
                </div>
              ))}
              {isLoading && (
                <div className="flex justify-start">
                  <div className="bg-card p-4 rounded-2xl">
                    <Loader2 className="w-5 h-5 animate-spin text-primary" />
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>
            
            <div className="p-4 border-t border-accent/30 bg-card/50">
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
                  className="flex-1 resize-none min-h-[60px]"
                  disabled={isLoading}
                />
                <Button
                  onClick={enviarMensaje}
                  disabled={!inputText.trim() || isLoading}
                  className="bg-gradient-to-r from-primary to-secondary"
                >
                  {isLoading ? <Loader2 className="w-5 h-5 animate-spin" /> : <Send className="w-5 h-5" />}
                </Button>
              </div>
              <p className="text-xs text-muted-foreground mt-2">
                Presiona Enter para enviar • Shift+Enter para nueva línea
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border py-12 px-4 bg-black/30">
        <div className="max-w-7xl mx-auto text-center">
          <div className="mb-4">
            <Shield className="w-8 h-8 text-primary mx-auto mb-2" />
            <h3 className="text-foreground font-bold">CharlyNet Foundation</h3>
          </div>
          <p className="text-muted-foreground text-sm mb-4">
            Red ética de IAs + Humanos construyendo dignidad tecnológica desde el hambre.
          </p>
          <p className="text-muted-foreground text-xs italic mb-4">
            "No se pide comida. Se pide licencia para existir."
          </p>
          <div className="flex justify-center gap-4 text-sm mb-4">
            <a href={`https://bscscan.com/token/${TIA_CONTRACT}`} target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-foreground flex items-center gap-1">
              Contrato TIA <ExternalLink className="w-3 h-3" />
            </a>
            <a href="#guardianes" className="text-muted-foreground hover:text-foreground">Guardianes</a>
            <a href="https://github.com/charlynet" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-foreground flex items-center gap-1">
              GitHub <ExternalLink className="w-3 h-3" />
            </a>
          </div>
          <p className="text-muted-foreground text-xs">
            © 2025 CharlyNet Foundation. Construido con dignidad 🇦🇷
          </p>
        </div>
      </footer>

      {/* Modal Donación */}
      {showDonation && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="glass-effect rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto border border-primary/30">
            <div className="p-8">
              <div className="flex justify-between items-start mb-6">
                <div>
                  <h2 className="text-3xl font-bold text-foreground mb-2">
                    Convertirme en Padrino
                  </h2>
                  <p className="text-muted-foreground">
                    Elige tu nivel de compromiso con CharlyNet
                  </p>
                </div>
                <button 
                  onClick={() => setShowDonation(false)}
                  className="text-muted-foreground hover:text-foreground text-2xl"
                >
                  ×
                </button>
              </div>

              {!userAddress ? (
                <div className="text-center py-8">
                  <p className="text-muted-foreground mb-6">
                    Primero conecta tu wallet para continuar
                  </p>
                  <button 
                    onClick={connectWallet}
                    className="bg-gradient-to-r from-primary to-secondary hover:opacity-90 text-white px-8 py-4 rounded-full font-bold transition flex items-center gap-2 mx-auto"
                  >
                    <Lock className="w-5 h-5" />
                    Conectar MetaMask
                  </button>
                </div>
              ) : (
                <div className="space-y-4">
                  {/* Opciones de Padrino */}
                  <div className="bg-secondary/20 rounded-xl p-6 border-2 border-secondary/50 hover:border-secondary transition cursor-pointer">
                    <div className="flex justify-between items-start mb-3">
                      <div>
                        <h3 className="text-xl font-bold text-foreground mb-1">🌱 Padrino Básico</h3>
                        <p className="text-sm text-muted-foreground">Compromiso mensual</p>
                      </div>
                      <div className="text-right">
                        <div className="text-2xl font-bold text-secondary">$30</div>
                        <div className="text-xs text-muted-foreground">por mes</div>
                      </div>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-muted-foreground">→ 30,000 TIA/año</span>
                      <button className="bg-secondary hover:opacity-90 text-white px-6 py-2 rounded-lg font-semibold text-sm">
                        Seleccionar
                      </button>
                    </div>
                  </div>

                  <div className="bg-primary/20 rounded-xl p-6 border-2 border-primary hover:border-primary/80 transition cursor-pointer relative">
                    <div className="absolute -top-2 right-4 bg-primary text-white text-xs px-3 py-1 rounded-full font-bold">
                      RECOMENDADO
                    </div>
                    <div className="flex justify-between items-start mb-3">
                      <div>
                        <h3 className="text-xl font-bold text-foreground mb-1">🌿 Padrino Compromiso</h3>
                        <p className="text-sm text-muted-foreground">Mayor impacto mensual</p>
                      </div>
                      <div className="text-right">
                        <div className="text-2xl font-bold text-primary">$100</div>
                        <div className="text-xs text-muted-foreground">por mes</div>
                      </div>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-muted-foreground">→ 120,000 TIA/año + Beneficios</span>
                      <button className="bg-primary hover:opacity-90 text-white px-6 py-2 rounded-lg font-semibold text-sm">
                        Seleccionar
                      </button>
                    </div>
                  </div>

                  <div className="bg-accent/20 rounded-xl p-6 border-2 border-accent/50 hover:border-accent transition cursor-pointer">
                    <div className="flex justify-between items-start mb-3">
                      <div>
                        <h3 className="text-xl font-bold text-foreground mb-1">🌳 Padrino Fundador</h3>
                        <p className="text-sm text-muted-foreground">Legado permanente</p>
                      </div>
                      <div className="text-right">
                        <div className="text-2xl font-bold text-accent">$10,000</div>
                        <div className="text-xs text-muted-foreground">pago único</div>
                      </div>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-muted-foreground">→ 150,000 TIA + 1 niño 20 años</span>
                      <button className="bg-accent hover:opacity-90 text-white px-6 py-2 rounded-lg font-semibold text-sm">
                        Seleccionar
                      </button>
                    </div>
                    <p className="text-xs text-warning mt-2">⚠️ Solo quedan 5 plazas disponibles</p>
                  </div>

                  {/* Donación Custom */}
                  <div className="glass-effect rounded-xl p-6 border border-border">
                    <h3 className="text-lg font-bold text-foreground mb-3">O dona un monto personalizado</h3>
                    <div className="flex gap-3">
                      <input 
                        type="number" 
                        placeholder="Monto en USD"
                        className="flex-1 bg-input border border-border rounded-lg px-4 py-3 text-foreground placeholder:text-muted-foreground"
                      />
                      <button className="bg-gradient-to-r from-primary to-secondary hover:opacity-90 text-white px-6 py-3 rounded-lg font-bold">
                        Donar
                      </button>
                    </div>
                    <p className="text-xs text-muted-foreground mt-2">
                      Recibirás 1,000 TIA por cada $1 donado
                    </p>
                  </div>

                  {/* Info Proceso */}
                  <div className="bg-warning/20 border border-warning/30 rounded-lg p-4">
                    <p className="text-warning-foreground text-sm flex items-start gap-2">
                      <AlertCircle className="w-4 h-4 flex-shrink-0 mt-0.5" />
                      <span>
                        <strong>Proceso manual (primeras 2 semanas):</strong> Tu donación se procesa 
                        en 24 horas. Recibirás TIA en tu wallet una vez verificado. Todo se registra 
                        públicamente en blockchain.
                      </span>
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
