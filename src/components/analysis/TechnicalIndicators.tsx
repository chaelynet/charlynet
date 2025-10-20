import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { TrendingUp, TrendingDown, Minus } from "lucide-react";

interface TechnicalIndicatorsProps {
  crypto: string;
}

export const TechnicalIndicators = ({ crypto }: TechnicalIndicatorsProps) => {
  const indicators = [
    { name: "RSI (14)", value: 58, signal: "neutral", description: "Índice de Fuerza Relativa" },
    { name: "MACD", value: 72, signal: "buy", description: "Convergencia/Divergencia de Medias Móviles" },
    { name: "Estocástico", value: 45, signal: "neutral", description: "Oscilador Estocástico" },
    { name: "Bollinger Bands", value: 65, signal: "buy", description: "Bandas de Bollinger" },
    { name: "ATR", value: 38, signal: "sell", description: "Average True Range" },
    { name: "ADX", value: 55, signal: "neutral", description: "Average Directional Index" },
  ];

  const getSignalIcon = (signal: string) => {
    if (signal === "buy") return <TrendingUp className="h-5 w-5 text-success" />;
    if (signal === "sell") return <TrendingDown className="h-5 w-5 text-destructive" />;
    return <Minus className="h-5 w-5 text-muted-foreground" />;
  };

  const getSignalColor = (signal: string) => {
    if (signal === "buy") return "text-success";
    if (signal === "sell") return "text-destructive";
    return "text-muted-foreground";
  };

  const buySignals = indicators.filter(i => i.signal === "buy").length;
  const sellSignals = indicators.filter(i => i.signal === "sell").length;
  const neutralSignals = indicators.filter(i => i.signal === "neutral").length;

  return (
    <div className="space-y-6">
      {/* Summary Card */}
      <Card className="glass-effect p-6 border-border">
        <h3 className="text-xl font-bold text-foreground mb-4">
          Resumen de Indicadores - {crypto.toUpperCase()}
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="p-4 rounded-lg bg-success/10 border border-success/20">
            <p className="text-sm text-muted-foreground mb-1">Señales de Compra</p>
            <p className="text-3xl font-bold text-success">{buySignals}</p>
          </div>
          <div className="p-4 rounded-lg bg-muted/50 border border-border">
            <p className="text-sm text-muted-foreground mb-1">Señales Neutrales</p>
            <p className="text-3xl font-bold text-foreground">{neutralSignals}</p>
          </div>
          <div className="p-4 rounded-lg bg-destructive/10 border border-destructive/20">
            <p className="text-sm text-muted-foreground mb-1">Señales de Venta</p>
            <p className="text-3xl font-bold text-destructive">{sellSignals}</p>
          </div>
        </div>
      </Card>

      {/* Indicators Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {indicators.map((indicator) => (
          <Card key={indicator.name} className="glass-effect p-6 border-border hover:border-primary/50 transition-all">
            <div className="flex items-start justify-between mb-4">
              <div>
                <h4 className="text-lg font-bold text-foreground">{indicator.name}</h4>
                <p className="text-sm text-muted-foreground">{indicator.description}</p>
              </div>
              {getSignalIcon(indicator.signal)}
            </div>
            
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <span className="text-2xl font-bold text-foreground">{indicator.value}</span>
                <span className={`text-sm font-semibold uppercase ${getSignalColor(indicator.signal)}`}>
                  {indicator.signal === "buy" ? "Compra" : indicator.signal === "sell" ? "Venta" : "Neutral"}
                </span>
              </div>
              <Progress 
                value={indicator.value} 
                className="h-2"
              />
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};
