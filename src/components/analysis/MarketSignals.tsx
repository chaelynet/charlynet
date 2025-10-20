import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { TrendingUp, TrendingDown, Clock, Activity } from "lucide-react";

interface MarketSignalsProps {
  crypto: string;
}

export const MarketSignals = ({ crypto }: MarketSignalsProps) => {
  const signals = [
    {
      type: "buy",
      crypto: "BTC/USDT",
      indicator: "MACD Crossover",
      price: "$40,250",
      time: "Hace 5 min",
      strength: "Fuerte",
      timeframe: "4h"
    },
    {
      type: "sell",
      crypto: "ETH/USDT",
      indicator: "RSI Sobrecompra",
      price: "$2,850",
      time: "Hace 12 min",
      strength: "Moderada",
      timeframe: "1h"
    },
    {
      type: "buy",
      crypto: "SOL/USDT",
      indicator: "Bollinger Bands",
      price: "$98.50",
      time: "Hace 18 min",
      strength: "Débil",
      timeframe: "15m"
    },
    {
      type: "buy",
      crypto: "ADA/USDT",
      indicator: "Golden Cross",
      price: "$0.45",
      time: "Hace 25 min",
      strength: "Fuerte",
      timeframe: "1d"
    },
    {
      type: "sell",
      crypto: "XRP/USDT",
      indicator: "Death Cross",
      price: "$0.52",
      time: "Hace 32 min",
      strength: "Moderada",
      timeframe: "4h"
    },
    {
      type: "buy",
      crypto: "DOT/USDT",
      indicator: "Divergencia Alcista",
      price: "$6.75",
      time: "Hace 45 min",
      strength: "Fuerte",
      timeframe: "1h"
    }
  ];

  return (
    <Card className="glass-effect p-6 border-border">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-xl font-bold text-foreground mb-1">
            Señales de Trading en Vivo
          </h3>
          <p className="text-sm text-muted-foreground">
            Señales generadas automáticamente por nuestro sistema
          </p>
        </div>
        <Activity className="h-8 w-8 text-primary animate-pulse" />
      </div>

      <div className="space-y-3">
        {signals.map((signal, index) => (
          <div 
            key={index}
            className={`p-4 rounded-lg border transition-all hover:shadow-lg ${
              signal.type === "buy" 
                ? "bg-success/5 border-success/30 hover:border-success/50" 
                : "bg-destructive/5 border-destructive/30 hover:border-destructive/50"
            }`}
          >
            <div className="flex items-start justify-between">
              <div className="flex items-start gap-3 flex-1">
                <div className={`h-10 w-10 rounded-lg flex items-center justify-center flex-shrink-0 ${
                  signal.type === "buy" ? "bg-success/20" : "bg-destructive/20"
                }`}>
                  {signal.type === "buy" ? (
                    <TrendingUp className="h-5 w-5 text-success" />
                  ) : (
                    <TrendingDown className="h-5 w-5 text-destructive" />
                  )}
                </div>
                
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <h4 className="font-bold text-foreground">{signal.crypto}</h4>
                    <Badge 
                      variant={signal.type === "buy" ? "default" : "destructive"}
                      className="text-xs"
                    >
                      {signal.type === "buy" ? "COMPRA" : "VENTA"}
                    </Badge>
                    <Badge variant="outline" className="text-xs">
                      {signal.timeframe}
                    </Badge>
                  </div>
                  
                  <p className="text-sm text-muted-foreground mb-2">
                    {signal.indicator}
                  </p>
                  
                  <div className="flex items-center gap-4 text-xs">
                    <span className="text-foreground font-semibold">
                      Precio: {signal.price}
                    </span>
                    <span className="flex items-center gap-1 text-muted-foreground">
                      <Clock className="h-3 w-3" />
                      {signal.time}
                    </span>
                  </div>
                </div>
              </div>

              <Badge 
                variant="outline" 
                className={`${
                  signal.strength === "Fuerte" 
                    ? "border-primary text-primary" 
                    : signal.strength === "Moderada"
                    ? "border-accent text-accent"
                    : "border-muted-foreground text-muted-foreground"
                }`}
              >
                {signal.strength}
              </Badge>
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
};
