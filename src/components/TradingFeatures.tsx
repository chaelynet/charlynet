import { Card } from "@/components/ui/card";
import { BarChart3, Brain, Lock, Zap, LineChart, Bell } from "lucide-react";

const features = [
  {
    title: "Análisis Técnico Avanzado",
    description: "Indicadores profesionales, patrones de velas y herramientas de análisis en tiempo real",
    icon: BarChart3,
  },
  {
    title: "IA Trading Assistant",
    description: "Algoritmos de machine learning para predicciones y señales de trading automatizadas",
    icon: Brain,
  },
  {
    title: "Seguridad Máxima",
    description: "Autenticación 2FA, cold storage y encriptación de nivel bancario",
    icon: Lock,
  },
  {
    title: "Ejecución Ultra-Rápida",
    description: "Latencia mínima para aprovechar cada oportunidad del mercado",
    icon: Zap,
  },
  {
    title: "Portfolio Tracker",
    description: "Monitoreo completo de tu portafolio con métricas avanzadas de rendimiento",
    icon: LineChart,
  },
  {
    title: "Alertas Personalizadas",
    description: "Notificaciones instantáneas de movimientos de precio y señales importantes",
    icon: Bell,
  },
];

export const TradingFeatures = () => {
  return (
    <section className="border-b border-border py-12">
      <div className="container mx-auto px-4">
        <div className="mb-12 text-center">
          <h2 className="mb-4 text-3xl font-bold text-foreground">
            Herramientas <span className="text-primary">Profesionales</span>
          </h2>
          <p className="mx-auto max-w-2xl text-muted-foreground">
            Todo lo que necesitas para tomar decisiones informadas y maximizar tus ganancias
          </p>
        </div>
        
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {features.map((feature, index) => (
            <Card 
              key={index}
              className="glass-effect group border-border p-6 transition-all hover:border-primary/50 hover:shadow-lg hover:shadow-primary/20"
            >
              <feature.icon className="mb-4 h-12 w-12 text-primary group-hover:scale-110 transition-transform" />
              <h3 className="mb-2 text-xl font-semibold text-foreground group-hover:text-primary transition-colors">
                {feature.title}
              </h3>
              <p className="text-muted-foreground">
                {feature.description}
              </p>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};
