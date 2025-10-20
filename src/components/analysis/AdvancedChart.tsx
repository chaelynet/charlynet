import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { LineChart, Line, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from "recharts";
import { useState, useEffect } from "react";
import { TrendingUp, TrendingDown } from "lucide-react";

interface AdvancedChartProps {
  crypto: string;
}

export const AdvancedChart = ({ crypto }: AdvancedChartProps) => {
  const [timeframe, setTimeframe] = useState("24h");
  const [chartData, setChartData] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulated data - In production, fetch from CoinGecko or similar API
    const generateData = () => {
      const data = [];
      const basePrice = 40000;
      for (let i = 0; i < 24; i++) {
        data.push({
          time: `${i}:00`,
          price: basePrice + Math.random() * 2000 - 1000,
          volume: Math.random() * 1000000000,
          ma7: basePrice + Math.random() * 1500 - 750,
          ma25: basePrice + Math.random() * 1000 - 500,
        });
      }
      return data;
    };

    setLoading(true);
    setTimeout(() => {
      setChartData(generateData());
      setLoading(false);
    }, 500);
  }, [crypto, timeframe]);

  const currentPrice = chartData.length > 0 ? chartData[chartData.length - 1].price : 0;
  const previousPrice = chartData.length > 1 ? chartData[0].price : 0;
  const priceChange = currentPrice - previousPrice;
  const priceChangePercent = ((priceChange / previousPrice) * 100).toFixed(2);

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

      {loading ? (
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
            <Line 
              type="monotone" 
              dataKey="ma7" 
              stroke="hsl(var(--accent))" 
              strokeWidth={1.5}
              dot={false}
              name="MA 7"
            />
            <Line 
              type="monotone" 
              dataKey="ma25" 
              stroke="hsl(var(--success))" 
              strokeWidth={1.5}
              dot={false}
              name="MA 25"
            />
          </AreaChart>
        </ResponsiveContainer>
      )}
    </Card>
  );
};
