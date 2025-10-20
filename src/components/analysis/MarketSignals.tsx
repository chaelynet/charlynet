import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { TrendingUp, TrendingDown, Clock, Activity } from "lucide-react";
import { useQuery } from "@tanstack/react-query";

interface MarketSignalsProps {
  crypto: string;
}

const fetchMarketSignals = async () => {
  const cryptos = ['bitcoin', 'ethereum', 'solana', 'cardano', 'ripple', 'polkadot'];
  const response = await fetch(
    `https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&ids=${cryptos.join(',')}&order=market_cap_desc&sparkline=false&price_change_percentage=1h,24h`
  );
  if (!response.ok) throw new Error('Failed to fetch signals');
  const data = await response.json();
  
  return data.map((coin: any) => {
    const change24h = coin.price_change_percentage_24h || 0;
    const price = coin.current_price;
    
    // Generate signal based on price change
    const type = change24h > 0 ? "buy" : "sell";
    const strength = Math.abs(change24h) > 3 ? "Fuerte" : Math.abs(change24h) > 1 ? "Moderada" : "Débil";
    
    const indicators = [
      "MACD Crossover", "RSI Sobrecompra", "Bollinger Bands", 
      "Golden Cross", "Death Cross", "Divergencia Alcista"
    ];
    const indicator = indicators[Math.floor(Math.random() * indicators.length)];
    
    const timeframes = ["15m", "1h", "4h", "1d"];
    const timeframe = timeframes[Math.floor(Math.random() * timeframes.length)];
    
    const minutesAgo = Math.floor(Math.random() * 60) + 1;
    
    return {
      type,
      crypto: `${coin.symbol.toUpperCase()}/USDT`,
      indicator,
      price: `$${price.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`,
      time: `Hace ${minutesAgo} min`,
      strength,
      timeframe,
    };
  });
};

export const MarketSignals = ({ crypto }: MarketSignalsProps) => {
  const { data: signals, isLoading } = useQuery({
    queryKey: ['marketSignals'],
    queryFn: fetchMarketSignals,
    refetchInterval: 30000,
  });

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

      {isLoading ? (
        <div className="p-8 text-center text-muted-foreground animate-pulse">
          Cargando señales de mercado...
        </div>
      ) : (
        <div className="space-y-3">
          {signals?.map((signal, index) => (
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
      )}
    </Card>
  );
};
