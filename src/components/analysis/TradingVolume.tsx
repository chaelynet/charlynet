import { Card } from "@/components/ui/card";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from "recharts";
import { useQuery } from "@tanstack/react-query";

interface TradingVolumeProps {
  crypto: string;
}

const fetchVolumeData = async (cryptoId: string) => {
  const response = await fetch(
    `https://api.coingecko.com/api/v3/coins/${cryptoId}/market_chart?vs_currency=usd&days=1`
  );
  if (!response.ok) throw new Error('Failed to fetch volume data');
  const data = await response.json();
  
  const volumes = data.total_volumes;
  const prices = data.prices;
  
  // Group by 4-hour intervals
  const interval = Math.floor(volumes.length / 6);
  
  return Array.from({ length: 6 }, (_, i) => {
    const startIdx = i * interval;
    const endIdx = Math.min((i + 1) * interval, volumes.length);
    const volumeSlice = volumes.slice(startIdx, endIdx);
    const priceSlice = prices.slice(startIdx, endIdx);
    
    const avgVolume = volumeSlice.reduce((sum: number, [, vol]: [number, number]) => sum + vol, 0) / volumeSlice.length;
    
    // Estimate buy/sell volume based on price movement
    const priceStart = priceSlice[0]?.[1] || 0;
    const priceEnd = priceSlice[priceSlice.length - 1]?.[1] || 0;
    const buyRatio = priceEnd > priceStart ? 0.55 : 0.45;
    
    const date = new Date(volumes[startIdx][0]);
    const timeStr = date.toLocaleTimeString('es-ES', { hour: '2-digit', minute: '2-digit' });
    
    return {
      time: timeStr,
      buyVolume: avgVolume * buyRatio,
      sellVolume: avgVolume * (1 - buyRatio),
    };
  });
};

export const TradingVolume = ({ crypto }: TradingVolumeProps) => {
  const { data: volumeData, isLoading } = useQuery({
    queryKey: ['volumeData', crypto],
    queryFn: () => fetchVolumeData(crypto),
    refetchInterval: 60000,
  });

  const totalBuyVolume = volumeData?.reduce((sum, d) => sum + d.buyVolume, 0) || 0;
  const totalSellVolume = volumeData?.reduce((sum, d) => sum + d.sellVolume, 0) || 0;
  const buyPressure = totalBuyVolume + totalSellVolume > 0 
    ? ((totalBuyVolume / (totalBuyVolume + totalSellVolume)) * 100).toFixed(1)
    : '50.0';

  return (
    <Card className="glass-effect p-6 border-border">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
        <div>
          <h3 className="text-xl font-bold text-foreground mb-2">
            Volumen de Trading - {crypto.toUpperCase()}
          </h3>
          <div className="flex items-center gap-6">
            <div>
              <p className="text-sm text-muted-foreground">Volumen Total Compra</p>
              <p className="text-lg font-bold text-success">
                ${(totalBuyVolume / 1000000000).toFixed(2)}B
              </p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Volumen Total Venta</p>
              <p className="text-lg font-bold text-destructive">
                ${(totalSellVolume / 1000000000).toFixed(2)}B
              </p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Presión Compradora</p>
              <p className="text-lg font-bold text-primary">{buyPressure}%</p>
            </div>
          </div>
        </div>
      </div>

      {isLoading ? (
        <div className="h-[300px] flex items-center justify-center">
          <div className="animate-pulse text-muted-foreground">Cargando volumen...</div>
        </div>
      ) : (
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={volumeData}>
          <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" opacity={0.3} />
          <XAxis 
            dataKey="time" 
            stroke="hsl(var(--muted-foreground))"
            style={{ fontSize: '12px' }}
          />
          <YAxis 
            stroke="hsl(var(--muted-foreground))"
            style={{ fontSize: '12px' }}
            tickFormatter={(value) => `$${(value / 1000000).toFixed(0)}M`}
          />
          <Tooltip 
            contentStyle={{
              backgroundColor: 'hsl(var(--card))',
              border: '1px solid hsl(var(--border))',
              borderRadius: '8px',
            }}
            labelStyle={{ color: 'hsl(var(--foreground))' }}
            formatter={(value: any) => `$${(value / 1000000).toFixed(2)}M`}
          />
          <Legend />
          <Bar 
            dataKey="buyVolume" 
            fill="hsl(var(--success))" 
            name="Volumen Compra"
            radius={[4, 4, 0, 0]}
          />
          <Bar 
            dataKey="sellVolume" 
            fill="hsl(var(--destructive))" 
            name="Volumen Venta"
            radius={[4, 4, 0, 0]}
          />
          </BarChart>
        </ResponsiveContainer>
      )}
    </Card>
  );
};
