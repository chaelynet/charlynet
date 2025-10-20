import { useState } from "react";
import { Header } from "@/components/Header";
import { Hero } from "@/components/Hero";
import { MarketOverview } from "@/components/MarketOverview";
import { TradingFeatures } from "@/components/TradingFeatures";
import { LiveChart } from "@/components/LiveChart";
import { TradingStats } from "@/components/TradingStats";
import { NewsSection } from "@/components/NewsSection";
import { AnalisisTab } from "@/components/tabs/AnalisisTab";
import { TokenTIATab } from "@/components/tabs/TokenTIATab";

export type TabType = "inicio" | "analisis" | "portfolio" | "autobot" | "educacion" | "tokentia" | "fundacion";

const Index = () => {
  const [activeTab, setActiveTab] = useState<TabType>("inicio");

  const renderTabContent = () => {
    switch (activeTab) {
      case "inicio":
        return (
          <>
            <Hero />
            <MarketOverview />
            <LiveChart />
            <TradingStats />
            <TradingFeatures />
            <NewsSection />
          </>
        );
      case "analisis":
        return <AnalisisTab />;
      case "tokentia":
        return <TokenTIATab />;
      default:
        return (
          <div className="container mx-auto px-4 py-20 text-center">
            <h2 className="text-3xl font-bold mb-4">Próximamente</h2>
            <p className="text-muted-foreground">Esta sección estará disponible pronto.</p>
          </div>
        );
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Header activeTab={activeTab} onTabChange={setActiveTab} />
      {renderTabContent()}
    </div>
  );
};

export default Index;
