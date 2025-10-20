import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

const generateData = (trend: 'up' | 'down' | 'volatile') => {
  const data = [];
  let value = 50000;
  
  for (let i = 0; i < 30; i++) {
    if (trend === 'up') {
      value += Math.random() * 2000 - 500;
    } else if (trend === 'down') {
      value += Math.random() * 1000 - 1500;
    } else {
      value += Math.random() * 3000 - 1500;
    }
    
    data.push({
      time: `${i}h`,
      price: Math.max(value, 40000),
    });
  }
  return data;
};

const btcData = generateData('up');
const ethData = generateData('volatile');
const solData = generateData('up');

export const LiveChart = () => {
  return (
    <section className="border-b border-border py-12">
      <div className="container mx-auto px-4">
        <h2 className="mb-8 text-3xl font-bold text-foreground">
          Gráficos de <span className="text-primary">Trading</span>
        </h2>
        
        <Card className="glass-effect border-border p-6">
          <Tabs defaultValue="btc" className="w-full">
            <TabsList className="mb-6 grid w-full max-w-md grid-cols-3 bg-secondary">
              <TabsTrigger value="btc" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
                BTC/USD
              </TabsTrigger>
              <TabsTrigger value="eth" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
                ETH/USD
              </TabsTrigger>
              <TabsTrigger value="sol" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
                SOL/USD
              </TabsTrigger>
            </TabsList>
            
            <TabsContent value="btc" className="h-[400px]">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={btcData}>
                  <defs>
                    <linearGradient id="colorBtc" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="hsl(195 100% 50%)" stopOpacity={0.3}/>
                      <stop offset="95%" stopColor="hsl(195 100% 50%)" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                  <XAxis dataKey="time" stroke="hsl(var(--muted-foreground))" />
                  <YAxis stroke="hsl(var(--muted-foreground))" />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: 'hsl(var(--card))', 
                      border: '1px solid hsl(var(--border))',
                      borderRadius: '8px'
                    }}
                  />
                  <Area 
                    type="monotone" 
                    dataKey="price" 
                    stroke="hsl(195 100% 50%)" 
                    strokeWidth={2}
                    fill="url(#colorBtc)" 
                  />
                </AreaChart>
              </ResponsiveContainer>
            </TabsContent>
            
            <TabsContent value="eth" className="h-[400px]">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={ethData}>
                  <defs>
                    <linearGradient id="colorEth" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="hsl(175 70% 50%)" stopOpacity={0.3}/>
                      <stop offset="95%" stopColor="hsl(175 70% 50%)" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                  <XAxis dataKey="time" stroke="hsl(var(--muted-foreground))" />
                  <YAxis stroke="hsl(var(--muted-foreground))" />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: 'hsl(var(--card))', 
                      border: '1px solid hsl(var(--border))',
                      borderRadius: '8px'
                    }}
                  />
                  <Area 
                    type="monotone" 
                    dataKey="price" 
                    stroke="hsl(175 70% 50%)" 
                    strokeWidth={2}
                    fill="url(#colorEth)" 
                  />
                </AreaChart>
              </ResponsiveContainer>
            </TabsContent>
            
            <TabsContent value="sol" className="h-[400px]">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={solData}>
                  <defs>
                    <linearGradient id="colorSol" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="hsl(142 71% 45%)" stopOpacity={0.3}/>
                      <stop offset="95%" stopColor="hsl(142 71% 45%)" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                  <XAxis dataKey="time" stroke="hsl(var(--muted-foreground))" />
                  <YAxis stroke="hsl(var(--muted-foreground))" />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: 'hsl(var(--card))', 
                      border: '1px solid hsl(var(--border))',
                      borderRadius: '8px'
                    }}
                  />
                  <Area 
                    type="monotone" 
                    dataKey="price" 
                    stroke="hsl(142 71% 45%)" 
                    strokeWidth={2}
                    fill="url(#colorSol)" 
                  />
                </AreaChart>
              </ResponsiveContainer>
            </TabsContent>
          </Tabs>
        </Card>
      </div>
    </section>
  );
};
