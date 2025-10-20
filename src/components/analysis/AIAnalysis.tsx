import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Brain, Sparkles, TrendingUp, AlertCircle, Target } from "lucide-react";
import { useState } from "react";

interface AIAnalysisProps {
  crypto: string;
}

export const AIAnalysis = ({ crypto }: AIAnalysisProps) => {
  const [prompt, setPrompt] = useState("");
  const [analysis, setAnalysis] = useState("");
  const [loading, setLoading] = useState(false);

  const handleAnalyze = () => {
    setLoading(true);
    // Simulate AI analysis
    setTimeout(() => {
      setAnalysis(`Análisis IA para ${crypto.toUpperCase()}:\n\nBasado en los patrones actuales del mercado, se observa una tendencia alcista moderada. Los indicadores técnicos sugieren un momento favorable para entrada, con RSI en zona neutral y MACD mostrando divergencia positiva.\n\nRecomendación: COMPRA con objetivo a corto plazo.\nNivel de confianza: 78%\nStop Loss sugerido: -5%\nTake Profit sugerido: +12%`);
      setLoading(false);
    }, 1500);
  };

  const aiInsights = [
    {
      icon: Brain,
      title: "Predicción de Precio",
      description: "El modelo AI predice un movimiento alcista del 8-12% en las próximas 48 horas",
      confidence: 82,
      color: "text-success"
    },
    {
      icon: TrendingUp,
      title: "Tendencia Detectada",
      description: "Patrón de reversión alcista identificado en timeframe de 4h",
      confidence: 75,
      color: "text-primary"
    },
    {
      icon: AlertCircle,
      title: "Nivel de Riesgo",
      description: "Volatilidad moderada. Se recomienda gestión de riesgo activa",
      confidence: 68,
      color: "text-accent"
    },
    {
      icon: Target,
      title: "Objetivo Óptimo",
      description: "Zona de resistencia en $42,500 - Nivel de toma de ganancias sugerido",
      confidence: 71,
      color: "text-primary"
    }
  ];

  return (
    <div className="space-y-6">
      {/* AI Chat Interface */}
      <Card className="glass-effect p-6 border-border">
        <div className="flex items-center gap-3 mb-4">
          <div className="h-10 w-10 rounded-lg bg-primary/20 flex items-center justify-center">
            <Sparkles className="h-6 w-6 text-primary" />
          </div>
          <div>
            <h3 className="text-xl font-bold text-foreground">Asistente IA de Trading</h3>
            <p className="text-sm text-muted-foreground">Pregunta sobre cualquier aspecto del mercado</p>
          </div>
        </div>

        <div className="space-y-4">
          <Textarea
            placeholder="Ej: ¿Cuál es el mejor momento para comprar BTC? ¿Qué indica el análisis técnico?"
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            className="min-h-[100px] bg-background/50 border-border"
          />
          
          <Button 
            onClick={handleAnalyze}
            disabled={loading || !prompt}
            className="w-full bg-primary hover:bg-primary/90"
          >
            {loading ? (
              <>
                <Brain className="mr-2 h-4 w-4 animate-pulse" />
                Analizando con IA...
              </>
            ) : (
              <>
                <Sparkles className="mr-2 h-4 w-4" />
                Generar Análisis IA
              </>
            )}
          </Button>

          {analysis && (
            <div className="p-4 rounded-lg bg-muted/50 border border-border">
              <pre className="text-sm text-foreground whitespace-pre-wrap font-sans">
                {analysis}
              </pre>
            </div>
          )}
        </div>
      </Card>

      {/* AI Insights */}
      <Card className="glass-effect p-6 border-border">
        <h3 className="text-xl font-bold text-foreground mb-6">
          Insights IA en Tiempo Real
        </h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {aiInsights.map((insight, index) => (
            <div 
              key={index}
              className="p-4 rounded-lg bg-background/50 border border-border hover:border-primary/50 transition-all"
            >
              <div className="flex items-start gap-3 mb-3">
                <div className={`h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0`}>
                  <insight.icon className={`h-5 w-5 ${insight.color}`} />
                </div>
                <div className="flex-1">
                  <h4 className="font-semibold text-foreground mb-1">{insight.title}</h4>
                  <p className="text-sm text-muted-foreground">{insight.description}</p>
                </div>
              </div>
              
              <div className="flex items-center gap-2">
                <div className="flex-1 h-2 bg-muted rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-primary rounded-full transition-all"
                    style={{ width: `${insight.confidence}%` }}
                  />
                </div>
                <span className="text-xs font-semibold text-muted-foreground">
                  {insight.confidence}%
                </span>
              </div>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
};
