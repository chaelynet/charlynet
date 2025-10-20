import { Card } from "@/components/ui/card";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from "recharts";

interface TradingVolumeProps {
  crypto: string;
}

export const TradingVolume = ({ crypto }: TradingVolumeProps) => {
  const volumeData = [
    { time: "00:00", buyVolume: 450000000, sellVolume: 420000000 },
    { time: "04:00", buyVolume: 380000000, sellVolume: 350000000 },
    { time: "08:00", buyVolume: 520000000, sellVolume: 480000000 },
    { time: "12:00", buyVolume: 680000000, sellVolume: 650000000 },
    { time: "16:00", buyVolume: 590000000, sellVolume: 610000000 },
    { time: "20:00", buyVolume: 470000000, sellVolume: 440000000 },
  ];

  const totalBuyVolume = volumeData.reduce((sum, d) => sum + d.buyVolume, 0);
  const totalSellVolume = volumeData.reduce((sum, d) => sum + d.sellVolume, 0);
  const buyPressure = ((totalBuyVolume / (totalBuyVolume + totalSellVolume)) * 100).toFixed(1);

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
    </Card>
  );
};
