import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { TrendingUp, Target, Brain, Zap } from "lucide-react";
import { AdvancedChart } from "@/components/analysis/AdvancedChart";
import { TradingVolume } from "@/components/analysis/TradingVolume";
import { TechnicalIndicators } from "@/components/analysis/TechnicalIndicators";
import { AIAnalysis } from "@/components/analysis/AIAnalysis";
import { MarketSignals } from "@/components/analysis/MarketSignals";
import { PriceAlerts } from "@/components/analysis/PriceAlerts";

export const AnalisisTab = () => {
  const [selectedCrypto] = useState("bitcoin");

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-2 glow-text">Análisis Técnico Avanzado</h1>
          <p className="text-muted-foreground">
            Herramientas profesionales para análisis técnico y fundamental
          </p>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <Card className="glass-effect">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium flex items-center gap-2">
                <TrendingUp className="h-4 w-4 text-success" />
                Señales Activas
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">12</div>
              <p className="text-xs text-muted-foreground">8 compra, 4 venta</p>
            </CardContent>
          </Card>

          <Card className="glass-effect">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium flex items-center gap-2">
                <Target className="h-4 w-4 text-primary" />
                Alertas Configuradas
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">5</div>
              <p className="text-xs text-muted-foreground">3 activas</p>
            </CardContent>
          </Card>

          <Card className="glass-effect">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium flex items-center gap-2">
                <Brain className="h-4 w-4 text-accent" />
                Precisión IA
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">87%</div>
              <p className="text-xs text-muted-foreground">Últimos 30 días</p>
            </CardContent>
          </Card>

          <Card className="glass-effect">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium flex items-center gap-2">
                <Zap className="h-4 w-4 text-yellow-500" />
                Oportunidades
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">3</div>
              <p className="text-xs text-muted-foreground">Alta probabilidad</p>
            </CardContent>
          </Card>
        </div>

        {/* Main Analysis Tabs */}
        <Tabs defaultValue="charts" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="charts">Gráficos Avanzados</TabsTrigger>
            <TabsTrigger value="technical">Indicadores Técnicos</TabsTrigger>
            <TabsTrigger value="ai">Análisis IA</TabsTrigger>
            <TabsTrigger value="signals">Señales de Mercado</TabsTrigger>
          </TabsList>

          <TabsContent value="charts" className="space-y-6">
            <AdvancedChart crypto={selectedCrypto} />
            <TradingVolume crypto={selectedCrypto} />
          </TabsContent>

          <TabsContent value="technical">
            <TechnicalIndicators crypto={selectedCrypto} />
          </TabsContent>

          <TabsContent value="ai">
            <AIAnalysis crypto={selectedCrypto} />
          </TabsContent>

          <TabsContent value="signals" className="space-y-6">
            <MarketSignals crypto={selectedCrypto} />
            <PriceAlerts />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};
