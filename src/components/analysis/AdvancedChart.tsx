import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { LineChart, Line, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from "recharts";
import { useState, useEffect } from "react";
import { TrendingUp, TrendingDown } from "lucide-react";
import { useQuery } from "@tanstack/react-query";

interface AdvancedChartProps {
  crypto: string;
}

interface ChartDataPoint {
  time: string;
  price: number;
  volume: number;
  ma7?: number;
  ma25?: number;
}

const fetchCryptoChart = async (cryptoId: string, days: string): Promise<ChartDataPoint[]> => {
  const response = await fetch(
    `https://api.coingecko.com/api/v3/coins/${cryptoId}/market_chart?vs_currency=usd&days=${days}`
  );
  if (!response.ok) throw new Error('Failed to fetch chart data');
  const data = await response.json();
  
  // Transform data into chart format
  const prices = data.prices;
  const volumes = data.total_volumes;
  
  // Calculate time intervals based on days
  const interval = days === '1' ? 1 : days === '7' ? 6 : days === '30' ? 24 : 365;
  
  return prices.map((price: [number, number], index: number) => {
    const date = new Date(price[0]);
    const timeStr = days === '1' 
      ? date.toLocaleTimeString('es-ES', { hour: '2-digit', minute: '2-digit' })
      : days === '7'
      ? date.toLocaleDateString('es-ES', { month: 'short', day: 'numeric' })
      : date.toLocaleDateString('es-ES', { month: 'short', day: 'numeric' });
    
    return {
      time: timeStr,
      price: price[1],
      volume: volumes[index] ? volumes[index][1] : 0,
    };
  }).filter((_, index) => index % interval === 0);
};

const getDaysFromTimeframe = (tf: string): string => {
  switch(tf) {
    case '1h': return '1';
    case '24h': return '1';
    case '7d': return '7';
    case '30d': return '30';
    case '1y': return '365';
    default: return '1';
  }
};

export const AdvancedChart = ({ crypto }: AdvancedChartProps) => {
  const [timeframe, setTimeframe] = useState("24h");
  
  const { data: chartData, isLoading } = useQuery({
    queryKey: ['cryptoChart', crypto, timeframe],
    queryFn: () => fetchCryptoChart(crypto, getDaysFromTimeframe(timeframe)),
    refetchInterval: 60000, // Refetch every minute
  });

  const currentPrice = chartData && chartData.length > 0 ? chartData[chartData.length - 1].price : 0;
  const previousPrice = chartData && chartData.length > 1 ? chartData[0].price : 0;
  const priceChange = currentPrice - previousPrice;
  const priceChangePercent = previousPrice > 0 ? ((priceChange / previousPrice) * 100).toFixed(2) : '0.00';

  return (
    <Card className="glass-effect p-6 border-border">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
        <div>
          <h3 className="text-2xl font-bold text-foreground mb-2">
            Gráfico Avanzado - {crypto.toUpperCase()}
          </h3>
          <div className="flex items-center gap-4">
            <span className="text-3xl font-bold text-foreground">
              ${currentPrice.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
            </span>
            <span className={`flex items-center gap-1 text-lg font-semibold ${priceChange >= 0 ? 'text-success' : 'text-destructive'}`}>
              {priceChange >= 0 ? <TrendingUp className="h-5 w-5" /> : <TrendingDown className="h-5 w-5" />}
              {priceChangePercent}%
            </span>
          </div>
        </div>
        
        <div className="flex gap-2 mt-4 md:mt-0">
          {['1h', '24h', '7d', '30d', '1y'].map((tf) => (
            <Button
              key={tf}
              variant={timeframe === tf ? "default" : "outline"}
              size="sm"
              onClick={() => setTimeframe(tf)}
              className="text-xs"
            >
              {tf}
            </Button>
          ))}
        </div>
      </div>

      {isLoading ? (
        <div className="h-[400px] flex items-center justify-center">
          <div className="animate-pulse text-muted-foreground">Cargando datos...</div>
        </div>
      ) : (
        <ResponsiveContainer width="100%" height={400}>
          <AreaChart data={chartData}>
            <defs>
              <linearGradient id="colorPrice" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="hsl(var(--primary))" stopOpacity={0.3}/>
                <stop offset="95%" stopColor="hsl(var(--primary))" stopOpacity={0}/>
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" opacity={0.3} />
            <XAxis 
              dataKey="time" 
              stroke="hsl(var(--muted-foreground))"
              style={{ fontSize: '12px' }}
            />
            <YAxis 
              stroke="hsl(var(--muted-foreground))"
              style={{ fontSize: '12px' }}
              tickFormatter={(value) => `$${(value / 1000).toFixed(0)}k`}
            />
            <Tooltip 
              contentStyle={{
                backgroundColor: 'hsl(var(--card))',
                border: '1px solid hsl(var(--border))',
                borderRadius: '8px',
              }}
              labelStyle={{ color: 'hsl(var(--foreground))' }}
            />
            <Legend />
            <Area 
              type="monotone" 
              dataKey="price" 
              stroke="hsl(var(--primary))" 
              strokeWidth={2}
              fill="url(#colorPrice)" 
              name="Precio"
            />
          </AreaChart>
        </ResponsiveContainer>
      )}
    </Card>
  );
};
