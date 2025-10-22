import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { AlertTriangle, Plus, TrendingUp, TrendingDown, PieChart, BarChart3, Trash2 } from "lucide-react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart as RePieChart, Pie, Cell } from "recharts";

interface PortfolioAsset {
  id: string;
  symbol: string;
  name: string;
  amount: number;
  buyPrice: number;
  currentPrice: number;
}

const CHART_COLORS = ['hsl(var(--primary))', 'hsl(var(--accent))', 'hsl(var(--success))', 'hsl(var(--destructive))', 'hsl(var(--muted))'];

export const PortfolioTab = () => {
  const [assets, setAssets] = useState<PortfolioAsset[]>([
    { id: '1', symbol: 'BTC', name: 'Bitcoin', amount: 0.5, buyPrice: 45000, currentPrice: 108000 },
    { id: '2', symbol: 'ETH', name: 'Ethereum', amount: 5, buyPrice: 2800, currentPrice: 3500 },
    { id: '3', symbol: 'TIA', name: 'Celestia', amount: 1000, buyPrice: 8, currentPrice: 12 },
  ]);

  const [newAsset, setNewAsset] = useState({
    symbol: '',
    name: '',
    amount: '',
    buyPrice: '',
    currentPrice: '',
  });

  const addAsset = () => {
    if (newAsset.symbol && newAsset.amount && newAsset.buyPrice && newAsset.currentPrice) {
      const asset: PortfolioAsset = {
        id: Date.now().toString(),
        symbol: newAsset.symbol.toUpperCase(),
        name: newAsset.name || newAsset.symbol,
        amount: parseFloat(newAsset.amount),
        buyPrice: parseFloat(newAsset.buyPrice),
        currentPrice: parseFloat(newAsset.currentPrice),
      };
      setAssets([...assets, asset]);
      setNewAsset({ symbol: '', name: '', amount: '', buyPrice: '', currentPrice: '' });
    }
  };

  const removeAsset = (id: string) => {
    setAssets(assets.filter(a => a.id !== id));
  };

  const calculateMetrics = () => {
    let totalInvested = 0;
    let totalCurrent = 0;

    assets.forEach(asset => {
      totalInvested += asset.amount * asset.buyPrice;
      totalCurrent += asset.amount * asset.currentPrice;
    });

    const profit = totalCurrent - totalInvested;
    const profitPercentage = totalInvested > 0 ? (profit / totalInvested) * 100 : 0;

    return { totalInvested, totalCurrent, profit, profitPercentage };
  };

  const metrics = calculateMetrics();

  const portfolioDistribution = assets.map((asset, index) => ({
    name: asset.symbol,
    value: asset.amount * asset.currentPrice,
    color: CHART_COLORS[index % CHART_COLORS.length],
  }));

  const performanceData = [
    { month: 'Ene', value: metrics.totalInvested * 0.9 },
    { month: 'Feb', value: metrics.totalInvested * 0.95 },
    { month: 'Mar', value: metrics.totalInvested * 1.1 },
    { month: 'Abr', value: metrics.totalInvested * 1.15 },
    { month: 'May', value: metrics.totalInvested * 1.05 },
    { month: 'Jun', value: metrics.totalCurrent },
  ];

  return (
    <div className="min-h-screen bg-background py-12">
      <div className="container mx-auto px-4 max-w-7xl">
        <div className="mb-8 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 glow-text">Portfolio de Inversiones</h1>
          <p className="text-muted-foreground text-lg">Gestiona y monitorea tus inversiones en criptomonedas</p>
        </div>

        {/* Disclaimer */}
        <Alert variant="destructive" className="mb-8 border-destructive/50">
          <AlertTriangle className="h-5 w-5" />
          <AlertTitle className="text-lg font-bold">Descargo de Responsabilidad</AlertTitle>
          <AlertDescription className="text-base mt-2">
            <strong>NO RECOMENDAMOS INVERSIONES.</strong> La información proporcionada en esta plataforma es únicamente con fines educativos e informativos. 
            Cada usuario actúa bajo su propia responsabilidad. Las inversiones en criptomonedas conllevan riesgos significativos y pueden resultar en pérdidas totales. 
            Siempre realice su propia investigación (DYOR) y consulte con asesores financieros profesionales antes de tomar decisiones de inversión.
          </AlertDescription>
        </Alert>

        {/* Resumen del Portfolio */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card className="glass-effect">
            <CardHeader>
              <CardTitle className="text-sm text-muted-foreground">Total Invertido</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold">${metrics.totalInvested.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</p>
            </CardContent>
          </Card>

          <Card className="glass-effect">
            <CardHeader>
              <CardTitle className="text-sm text-muted-foreground">Valor Actual</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold text-primary">${metrics.totalCurrent.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</p>
            </CardContent>
          </Card>

          <Card className="glass-effect">
            <CardHeader>
              <CardTitle className="text-sm text-muted-foreground">Ganancia/Pérdida</CardTitle>
            </CardHeader>
            <CardContent>
              <p className={`text-3xl font-bold ${metrics.profit >= 0 ? 'text-success' : 'text-destructive'}`}>
                ${metrics.profit.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
              </p>
            </CardContent>
          </Card>

          <Card className="glass-effect">
            <CardHeader>
              <CardTitle className="text-sm text-muted-foreground">ROI</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-2">
                {metrics.profitPercentage >= 0 ? (
                  <TrendingUp className="h-6 w-6 text-success" />
                ) : (
                  <TrendingDown className="h-6 w-6 text-destructive" />
                )}
                <p className={`text-3xl font-bold ${metrics.profitPercentage >= 0 ? 'text-success' : 'text-destructive'}`}>
                  {metrics.profitPercentage.toFixed(2)}%
                </p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Gráficos */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          <Card className="glass-effect">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BarChart3 className="h-5 w-5 text-primary" />
                Rendimiento del Portfolio
              </CardTitle>
              <CardDescription>Evolución del valor total en los últimos 6 meses</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={performanceData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                  <XAxis dataKey="month" stroke="hsl(var(--muted-foreground))" />
                  <YAxis stroke="hsl(var(--muted-foreground))" />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: 'hsl(var(--card))', 
                      border: '1px solid hsl(var(--border))',
                      borderRadius: '8px'
                    }} 
                  />
                  <Line type="monotone" dataKey="value" stroke="hsl(var(--primary))" strokeWidth={3} />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          <Card className="glass-effect">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <PieChart className="h-5 w-5 text-primary" />
                Distribución del Portfolio
              </CardTitle>
              <CardDescription>Porcentaje de valor por activo</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <RePieChart>
                  <Pie
                    data={portfolioDistribution}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                    outerRadius={100}
                    fill="hsl(var(--primary))"
                    dataKey="value"
                  >
                    {portfolioDistribution.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: 'hsl(var(--card))', 
                      border: '1px solid hsl(var(--border))',
                      borderRadius: '8px'
                    }}
                  />
                </RePieChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </div>

        {/* Tabla de Activos */}
        <Card className="glass-effect mb-8">
          <CardHeader>
            <CardTitle>Mis Activos</CardTitle>
            <CardDescription>Detalle de todas tus inversiones</CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Activo</TableHead>
                  <TableHead className="text-right">Cantidad</TableHead>
                  <TableHead className="text-right">Precio Compra</TableHead>
                  <TableHead className="text-right">Precio Actual</TableHead>
                  <TableHead className="text-right">Valor Total</TableHead>
                  <TableHead className="text-right">Ganancia/Pérdida</TableHead>
                  <TableHead className="text-right">%</TableHead>
                  <TableHead></TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {assets.map((asset) => {
                  const totalValue = asset.amount * asset.currentPrice;
                  const invested = asset.amount * asset.buyPrice;
                  const profit = totalValue - invested;
                  const profitPercent = (profit / invested) * 100;

                  return (
                    <TableRow key={asset.id}>
                      <TableCell className="font-medium">
                        <div>
                          <div className="font-bold">{asset.symbol}</div>
                          <div className="text-xs text-muted-foreground">{asset.name}</div>
                        </div>
                      </TableCell>
                      <TableCell className="text-right">{asset.amount}</TableCell>
                      <TableCell className="text-right">${asset.buyPrice.toLocaleString()}</TableCell>
                      <TableCell className="text-right">${asset.currentPrice.toLocaleString()}</TableCell>
                      <TableCell className="text-right font-bold">${totalValue.toLocaleString('en-US', { minimumFractionDigits: 2 })}</TableCell>
                      <TableCell className={`text-right font-bold ${profit >= 0 ? 'text-success' : 'text-destructive'}`}>
                        ${profit.toLocaleString('en-US', { minimumFractionDigits: 2 })}
                      </TableCell>
                      <TableCell className="text-right">
                        <Badge variant={profit >= 0 ? "default" : "destructive"}>
                          {profit >= 0 ? '+' : ''}{profitPercent.toFixed(2)}%
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => removeAsset(asset.id)}
                          className="hover:bg-destructive/10"
                        >
                          <Trash2 className="h-4 w-4 text-destructive" />
                        </Button>
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        {/* Agregar Nuevo Activo */}
        <Card className="glass-effect">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Plus className="h-5 w-5 text-primary" />
              Agregar Activo al Portfolio
            </CardTitle>
            <CardDescription>Registra una nueva inversión para su seguimiento</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
              <Input
                placeholder="Símbolo (ej: BTC)"
                value={newAsset.symbol}
                onChange={(e) => setNewAsset({ ...newAsset, symbol: e.target.value })}
              />
              <Input
                placeholder="Nombre (opcional)"
                value={newAsset.name}
                onChange={(e) => setNewAsset({ ...newAsset, name: e.target.value })}
              />
              <Input
                type="number"
                placeholder="Cantidad"
                value={newAsset.amount}
                onChange={(e) => setNewAsset({ ...newAsset, amount: e.target.value })}
              />
              <Input
                type="number"
                placeholder="Precio de Compra"
                value={newAsset.buyPrice}
                onChange={(e) => setNewAsset({ ...newAsset, buyPrice: e.target.value })}
              />
              <Input
                type="number"
                placeholder="Precio Actual"
                value={newAsset.currentPrice}
                onChange={(e) => setNewAsset({ ...newAsset, currentPrice: e.target.value })}
              />
            </div>
            <Button onClick={addAsset} className="mt-4 w-full md:w-auto">
              <Plus className="h-4 w-4 mr-2" />
              Agregar al Portfolio
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
