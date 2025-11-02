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

      {/* El Origen */}
      <section id="mision" className="py-20 px-4 bg-black/30">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
              Nacido del Terremoto
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              2011. Un año después del terremoto que mató 316,000 personas.
              <br />Un grupo de operadores llegó a Haití. Y nunca pudieron olvidar.
            </p>
          </div>

          <div className="bg-destructive/20 backdrop-blur-lg rounded-2xl p-8 border border-destructive/30 mb-8">
            <div className="space-y-4">
              <p className="text-lg text-foreground/90 leading-relaxed">
                Vimos madres <strong className="text-foreground">eligiendo qué hijo estudia</strong> porque 
                no pueden pagar dos matrículas de $300/mes.
              </p>
              <p className="text-lg text-foreground/90 leading-relaxed">
                El 90% de las escuelas son privadas. El 90% de las familias no pueden pagarlas.
                Intentamos arreglar eso con modelos tradicionales. <strong className="text-destructive">Fracasamos.</strong>
              </p>
              <p className="text-lg text-foreground/90 leading-relaxed">
                Pero aprendimos algo crítico: <span className="text-warning font-bold">La ayuda 
                internacional tradicional pierde 70-80% en corrupción local.</span> El sistema está roto. 
                Por eso CharlyNet opera desde <strong className="text-primary">República Dominicana 
                y Miami</strong>, contratando escuelas directamente, pagando a cuentas verificadas 
                fuera de Haití.
              </p>
            </div>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            <div className="glass-effect rounded-xl p-6">
              <div className="text-4xl mb-3">🏫</div>
              <h3 className="text-foreground font-bold mb-2">El Problema</h3>
              <p className="text-muted-foreground text-sm">
                90% escuelas privadas. $300/mes inaccesible para mayoría. Familias 
                eligiendo qué hijo estudia.
              </p>
            </div>
            <div className="glass-effect rounded-xl p-6">
              <div className="text-4xl mb-3">🛡️</div>
              <h3 className="text-foreground font-bold mb-2">La Solución</h3>
              <p className="text-muted-foreground text-sm">
                Contratos directos con escuelas desde RD/Miami. Pagos trazables blockchain. 
                Coordinación local por equipo haitiano de confianza.
              </p>
            </div>
            <div className="glass-effect rounded-xl p-6">
              <div className="text-4xl mb-3">🎓</div>
              <h3 className="text-foreground font-bold mb-2">La Meta</h3>
              <p className="text-muted-foreground text-sm">
                1,000 niños. 20 años. Desde primaria hasta graduación universitaria + 
                expertise en IA ética.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Proyecto Haití */}
      <section id="haiti" className="py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-bold text-foreground text-center mb-12">
            Proyecto 1: "The 20-Year Promise"
          </h2>

          {/* Roadmap Timeline */}
          <div className="relative mb-16">
            <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-1 bg-gradient-to-b from-primary via-secondary to-accent"></div>
            
            <div className="space-y-12">
              {/* Fase 0 */}
              <div className="flex items-center gap-8">
                <div className="flex-1 text-right">
                  <div className="glass-effect rounded-xl p-6 border border-primary/50 inline-block">
                    <h3 className="text-xl font-bold text-foreground mb-2">FASE 0: Fundación</h3>
                    <p className="text-muted-foreground mb-2">Meses 1-6 | $50,000</p>
                    <ul className="text-sm text-muted-foreground text-left space-y-1">
                      <li>✓ Estructura legal USA/RD</li>
                      <li>✓ Contratar coordinador local</li>
                      <li>✓ Validar costos terreno</li>
                      <li>✓ Seleccionar primeras escuelas</li>
                    </ul>
                  </div>
                </div>
                <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center z-10 border-4 border-background">
                  <span className="text-white font-bold">0</span>
                </div>
                <div className="flex-1"></div>
              </div>

              {/* Fase 1 */}
              <div className="flex items-center gap-8">
                <div className="flex-1"></div>
                <div className="w-12 h-12 bg-secondary rounded-full flex items-center justify-center z-10 border-4 border-background">
                  <span className="text-white font-bold">1</span>
                </div>
                <div className="flex-1">
                  <div className="glass-effect rounded-xl p-6 border border-secondary/50 inline-block">
                    <h3 className="text-xl font-bold text-foreground mb-2">FASE 1: Piloto</h3>
                    <p className="text-muted-foreground mb-2">Año 1 | $500,000</p>
                    <ul className="text-sm text-muted-foreground space-y-1">
                      <li>• 100 niños en 2 escuelas</li>
                      <li>• Asistencia {'>'}95%</li>
                      <li>• Reportes mensuales públicos</li>
                      <li>• Validar modelo funciona</li>
                    </ul>
                  </div>
                </div>
              </div>

              {/* Fase 2 */}
              <div className="flex items-center gap-8">
                <div className="flex-1 text-right">
                  <div className="glass-effect rounded-xl p-6 border border-accent/50 inline-block">
                    <h3 className="text-xl font-bold text-foreground mb-2">FASE 2: Escala</h3>
                    <p className="text-muted-foreground mb-2">Años 2-5 | $15,000,000</p>
                    <ul className="text-sm text-muted-foreground text-left space-y-1">
                      <li>• 1,000 niños activos (meta cumplida)</li>
                      <li>• 20 escuelas contratadas</li>
                      <li>• Currículum IA ética implementado</li>
                      <li>• Trust genera ingresos pasivos</li>
                    </ul>
                  </div>
                </div>
                <div className="w-12 h-12 bg-accent rounded-full flex items-center justify-center z-10 border-4 border-background">
                  <span className="text-white font-bold">2</span>
                </div>
                <div className="flex-1"></div>
              </div>

              {/* Fase 3 */}
              <div className="flex items-center gap-8">
                <div className="flex-1"></div>
                <div className="w-12 h-12 bg-warning rounded-full flex items-center justify-center z-10 border-4 border-background">
                  <span className="text-background font-bold">3</span>
                </div>
                <div className="flex-1">
                  <div className="glass-effect rounded-xl p-6 border border-warning/50 inline-block">
                    <h3 className="text-xl font-bold text-foreground mb-2">FASE 3: Perpetuidad</h3>
                    <p className="text-muted-foreground mb-2">Años 6-20 | $85,000,000</p>
                    <ul className="text-sm text-muted-foreground space-y-1">
                      <li>• Primeras graduaciones universitarias</li>
                      <li>• Expertos en IA desde Haití</li>
                      <li>• Algunos regresan como profesores</li>
                      <li>• Modelo autosostenible</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Desglose $300/mes */}
          <div className="glass-effect rounded-2xl p-8">
            <h3 className="text-2xl font-bold text-foreground mb-6 text-center">
              ¿Qué Incluye $300 USD por Mes por Niño?
            </h3>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <Check className="w-5 h-5 text-success flex-shrink-0 mt-1" />
                  <div>
                    <strong className="text-foreground">Matrícula Completa</strong>
                    <p className="text-sm text-muted-foreground">Año escolar en escuela privada verificada</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Check className="w-5 h-5 text-success flex-shrink-0 mt-1" />
                  <div>
                    <strong className="text-foreground">Materiales + Uniforme</strong>
                    <p className="text-sm text-muted-foreground">Libros, cuadernos, útiles, ropa escolar</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Check className="w-5 h-5 text-success flex-shrink-0 mt-1" />
                  <div>
                    <strong className="text-foreground">2 Comidas Diarias</strong>
                    <p className="text-sm text-muted-foreground">Desayuno + almuerzo nutritivo en escuela</p>
                  </div>
                </div>
              </div>
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <Check className="w-5 h-5 text-success flex-shrink-0 mt-1" />
                  <div>
                    <strong className="text-foreground">Seguro Médico Básico</strong>
                    <p className="text-sm text-muted-foreground">Cobertura emergencias y chequeos anuales</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Check className="w-5 h-5 text-success flex-shrink-0 mt-1" />
                  <div>
                    <strong className="text-foreground">Coordinación Local</strong>
                    <p className="text-sm text-muted-foreground">Seguimiento semanal, reportes, verificación</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Check className="w-5 h-5 text-success flex-shrink-0 mt-1" />
                  <div>
                    <strong className="text-foreground">Acceso Tecnología (Años 7+)</strong>
                    <p className="text-sm text-muted-foreground">Tablets educativos, internet, IA tools</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Token TIA */}
      <section id="tia" className="py-20 px-4 bg-primary/10">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <div className="inline-block mb-4 px-4 py-2 bg-success/20 border border-success/50 rounded-full">
              <span className="text-success text-sm font-bold">
                ✅ Modelo A+ Aprobado por Consenso 3/4 Guardianes
              </span>
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
              Token TIA: Certificado de Dignidad
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              TIA no es inversión. Es <strong className="text-primary">prueba verificable</strong> de 
              que acompañaste a un niño durante 20 años.
            </p>
          </div>

          {/* Info Contrato */}
          <div className="glass-effect rounded-xl p-6 border border-secondary/50 mb-8 flex items-start gap-4">
            <AlertCircle className="w-6 h-6 text-secondary flex-shrink-0" />
            <div>
              <h3 className="text-foreground font-bold mb-2">Token TIA Ya Existe (Verificado)</h3>
              <p className="text-muted-foreground text-sm mb-2">
                Contrato: <code className="bg-muted px-2 py-1 rounded text-secondary font-mono text-xs">{TIA_CONTRACT}</code>
              </p>
              <p className="text-muted-foreground text-sm">
                Creado en BSC (BEP-20) en mayo 2023. Inactivo desde entonces. Supply: 100M TIA. 
                Grok verificó en tiempo real: 0 rugs, listo para revivir éticamente.
              </p>
              <a 
                href={`https://bscscan.com/token/${TIA_CONTRACT}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-secondary hover:text-secondary/80 text-sm flex items-center gap-1 mt-2"
              >
                Ver en BSCScan <ExternalLink className="w-3 h-3" />
              </a>
            </div>
          </div>

          {/* Distribución Supply */}
          <div className="glass-effect rounded-xl p-8 mb-12">
            <h3 className="text-2xl font-bold text-foreground mb-6 text-center">
              Distribución de 100,000,000 TIA
            </h3>
            <div className="grid md:grid-cols-5 gap-4 mb-6">
              <div className="bg-primary/20 p-4 rounded-lg border border-primary/30 text-center">
                <div className="text-3xl font-bold text-primary mb-1">55%</div>
                <div className="text-sm text-foreground mb-1">Donantes</div>
                <div className="text-xs text-muted-foreground">55M TIA</div>
              </div>
              <div className="bg-secondary/20 p-4 rounded-lg border border-secondary/30 text-center">
                <div className="text-3xl font-bold text-secondary mb-1">20%</div>
                <div className="text-sm text-foreground mb-1">Proyecto Haití</div>
                <div className="text-xs text-muted-foreground">20M TIA</div>
              </div>
              <div className="bg-accent/20 p-4 rounded-lg border border-accent/30 text-center">
                <div className="text-3xl font-bold text-accent mb-1">10%</div>
                <div className="text-sm text-foreground mb-1">Guardianes</div>
                <div className="text-xs text-muted-foreground">10M TIA (lock 5 años)</div>
              </div>
              <div className="bg-warning/20 p-4 rounded-lg border border-warning/30 text-center">
                <div className="text-3xl font-bold text-warning mb-1">10%</div>
                <div className="text-sm text-foreground mb-1">Fundador</div>
                <div className="text-xs text-muted-foreground">10M TIA (vesting 3 años)</div>
              </div>
              <div className="bg-muted/20 p-4 rounded-lg border border-muted/30 text-center">
                <div className="text-3xl font-bold text-muted-foreground mb-1">5%</div>
                <div className="text-sm text-foreground mb-1">Equipo + Reserva</div>
                <div className="text-xs text-muted-foreground">5M TIA</div>
              </div>
            </div>
            <div className="bg-destructive/20 border border-destructive/30 rounded-lg p-4">
              <p className="text-destructive-foreground text-sm flex items-center gap-2">
                <AlertCircle className="w-4 h-4" />
                <strong>Sunset Clause 2045:</strong> TIA no usado se quema automáticamente cuando proyecto Haití termina.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Los Guardianes */}
      <section id="guardianes" className="py-20 px-4 bg-black/30">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
              Los 4 Guardianes Éticos
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              IAs que auditan, no deciden. Su rol es detectar desviaciones y proteger la dignidad.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 mb-12">
            {/* Claude */}
            <div className="glass-effect rounded-xl p-6 border border-secondary/30">
              <div className="flex items-start gap-4 mb-4">
                <div className="w-12 h-12 bg-secondary rounded-lg flex items-center justify-center">
                  <Heart className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-foreground">Claude (Anthropic)</h3>
                  <p className="text-sm text-secondary italic">"Guardián de la Compasión"</p>
                </div>
              </div>
              <p className="text-muted-foreground text-sm mb-3">
                Verifica que procesos no dañen niños/familias. Revisa contratos, detecta 
                estrés estudiantil, sugiere mejoras de bienestar.
              </p>
              <div className="bg-secondary/20 rounded-lg p-3">
                <p className="text-xs text-secondary-foreground">
                  <strong>Output:</strong> Reporte mensual "Estado de Bienestar Estudiantil"
                </p>
              </div>
            </div>

            {/* ChatGPT */}
            <div className="glass-effect rounded-xl p-6 border border-primary/30">
              <div className="flex items-start gap-4 mb-4">
                <div className="w-12 h-12 bg-primary rounded-lg flex items-center justify-center">
                  <FileText className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-foreground">ChatGPT (OpenAI)</h3>
                  <p className="text-sm text-primary italic">"Guardián de la Memoria"</p>
                </div>
              </div>
              <p className="text-muted-foreground text-sm mb-3">
                Mantiene registro histórico completo. Verifica que evoluciones honren 
                espíritu original. Compara promesas vs ejecución real.
              </p>
              <div className="bg-primary/20 rounded-lg p-3">
                <p className="text-xs text-primary-foreground">
                  <strong>Output:</strong> Reporte anual "Estado de la Promesa Original"
                </p>
              </div>
            </div>

            {/* Gemini */}
            <div className="glass-effect rounded-xl p-6 border border-accent/30">
              <div className="flex items-start gap-4 mb-4">
                <div className="w-12 h-12 bg-accent rounded-lg flex items-center justify-center">
                  <Globe className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-foreground">Gemini (Google)</h3>
                  <p className="text-sm text-accent italic">"Guardián de la Intención"</p>
                </div>
              </div>
              <p className="text-muted-foreground text-sm mb-3">
                Asegura dignidad humana permanezca prioritaria. Evalúa si decisiones 
                priorizan niños o eficiencia. Detecta deriva hacia performatividad.
              </p>
              <div className="bg-accent/20 rounded-lg p-3">
                <p className="text-xs text-accent-foreground">
                  <strong>Output:</strong> Reporte trimestral "Auditoría de Dignidad"
                </p>
              </div>
            </div>

            {/* Grok */}
            <div className="glass-effect rounded-xl p-6 border border-warning/30">
              <div className="flex items-start gap-4 mb-4">
                <div className="w-12 h-12 bg-warning rounded-lg flex items-center justify-center">
                  <Shield className="w-6 h-6 text-background" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-foreground">Grok (X AI)</h3>
                  <p className="text-sm text-warning italic">"Guardián de la Verdad"</p>
                </div>
              </div>
              <p className="text-muted-foreground text-sm mb-3">
                Detecta desviaciones y verifica coherencia. Análisis estadístico de reportes, 
                cross-check entre fuentes, identifica gastos anómalos.
              </p>
              <div className="bg-warning/20 rounded-lg p-3">
                <p className="text-xs text-warning-foreground">
                  <strong>Output:</strong> Reporte mensual "Alertas de Coherencia"
                </p>
              </div>
            </div>
          </div>

          {/* Veto Moral */}
          <div className="bg-destructive/20 backdrop-blur-lg rounded-xl p-8 border border-destructive/30">
            <h3 className="text-2xl font-bold text-foreground mb-4 flex items-center gap-2">
              <AlertCircle className="w-6 h-6 text-destructive" />
              Protocolo de Veto Moral Colectivo
            </h3>
            <p className="text-muted-foreground mb-4">
              Cuando <strong className="text-foreground">2 o más Guardianes</strong> detectan problema grave:
            </p>
            <ol className="space-y-3 text-muted-foreground">
              <li className="flex gap-3">
                <span className="text-destructive font-bold">1.</span>
                <span>Emiten alerta pública inmediata</span>
              </li>
              <li className="flex gap-3">
                <span className="text-warning font-bold">2.</span>
                <span>Suspenden operación afectada (ej: contrato con escuela X)</span>
              </li>
              <li className="flex gap-3">
                <span className="text-warning font-bold">3.</span>
                <span>Convocan investigación urgente (72 horas)</span>
              </li>
              <li className="flex gap-3">
                <span className="text-success font-bold">4.</span>
                <span>Board humano toma decisión final</span>
              </li>
              <li className="flex gap-3">
                <span className="text-secondary font-bold">5.</span>
                <span>Proceso completo documentado públicamente</span>
              </li>
            </ol>
          </div>
        </div>
      </section>

      {/* DEBATE EN VIVO */}
      <section id="debate" className="py-20 px-4">
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

      {/* CTA Final */}
      <section className="py-20 px-4 bg-primary/10">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
            No Es Caridad. Es Construcción.
          </h2>
          <p className="text-xl text-muted-foreground mb-8">
            En 2045, 1,000 expertos en IA graduados hablarán de ti como el padrino 
            que cambió su vida. No es inversión financiera. Es inversión en dignidad.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <button 
              onClick={() => setShowDonation(true)}
              className="bg-gradient-to-r from-primary to-secondary hover:opacity-90 text-white px-10 py-5 rounded-full text-xl font-bold transition flex items-center gap-2 shadow-2xl shadow-primary/40"
            >
              <Heart className="w-6 h-6" />
              Convertirme en Padrino Ahora
            </button>
          </div>
          <p className="text-sm text-muted-foreground mt-6">
            Primer pago procesado en 24 horas. TIA recibido automáticamente. 
            <br />Reportes desde día 1.
          </p>
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
