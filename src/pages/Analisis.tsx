import { useState } from "react";
import { Header } from "@/components/Header";
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { 
  TrendingUp, 
  TrendingDown, 
  Activity, 
  Brain, 
  BarChart3, 
  LineChart,
  Sparkles,
  AlertTriangle,
  Target,
  Zap
} from "lucide-react";
import { AdvancedChart } from "@/components/analysis/AdvancedChart";
import { TechnicalIndicators } from "@/components/analysis/TechnicalIndicators";
import { AIAnalysis } from "@/components/analysis/AIAnalysis";
import { MarketSignals } from "@/components/analysis/MarketSignals";
import { PriceAlerts } from "@/components/analysis/PriceAlerts";
import { TradingVolume } from "@/components/analysis/TradingVolume";

export default function Analisis() {
  const [selectedCrypto, setSelectedCrypto] = useState("bitcoin");

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="container mx-auto px-4 py-8">
        {/* Header Section */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-foreground mb-2">
            Centro de <span className="text-primary glow-text">Análisis</span>
          </h1>
          <p className="text-muted-foreground">
            Herramientas profesionales para análisis técnico y fundamental
          </p>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <Card className="glass-effect p-4 border-border hover:border-primary/50 transition-all">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Señales Activas</p>
                <p className="text-2xl font-bold text-foreground">24</p>
              </div>
              <Target className="h-8 w-8 text-primary" />
            </div>
          </Card>
          
          <Card className="glass-effect p-4 border-border hover:border-primary/50 transition-all">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Alertas</p>
                <p className="text-2xl font-bold text-foreground">8</p>
              </div>
              <AlertTriangle className="h-8 w-8 text-accent" />
            </div>
          </Card>
          
          <Card className="glass-effect p-4 border-border hover:border-primary/50 transition-all">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Precisión IA</p>
                <p className="text-2xl font-bold text-foreground">87%</p>
              </div>
              <Brain className="h-8 w-8 text-success" />
            </div>
          </Card>
          
          <Card className="glass-effect p-4 border-border hover:border-primary/50 transition-all">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Oportunidades</p>
                <p className="text-2xl font-bold text-foreground">12</p>
              </div>
              <Zap className="h-8 w-8 text-primary" />
            </div>
          </Card>
        </div>

        {/* Main Analysis Tabs */}
        <Tabs defaultValue="charts" className="space-y-6">
          <TabsList className="bg-muted p-1">
            <TabsTrigger value="charts">
              <LineChart className="mr-2 h-4 w-4" />
              Gráficos Avanzados
            </TabsTrigger>
            <TabsTrigger value="technical">
              <BarChart3 className="mr-2 h-4 w-4" />
              Indicadores Técnicos
            </TabsTrigger>
            <TabsTrigger value="ai">
              <Brain className="mr-2 h-4 w-4" />
              Análisis IA
            </TabsTrigger>
            <TabsTrigger value="signals">
              <Activity className="mr-2 h-4 w-4" />
              Señales de Mercado
            </TabsTrigger>
          </TabsList>

          <TabsContent value="charts" className="space-y-6">
            <AdvancedChart crypto={selectedCrypto} />
            <TradingVolume crypto={selectedCrypto} />
          </TabsContent>

          <TabsContent value="technical" className="space-y-6">
            <TechnicalIndicators crypto={selectedCrypto} />
          </TabsContent>

          <TabsContent value="ai" className="space-y-6">
            <AIAnalysis crypto={selectedCrypto} />
          </TabsContent>

          <TabsContent value="signals" className="space-y-6">
            <MarketSignals crypto={selectedCrypto} />
            <PriceAlerts />
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
}
