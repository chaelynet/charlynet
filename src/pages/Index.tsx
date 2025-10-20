import { Hero } from "@/components/Hero";
import { MarketOverview } from "@/components/MarketOverview";
import { TradingFeatures } from "@/components/TradingFeatures";
import { LiveChart } from "@/components/LiveChart";
import { TradingStats } from "@/components/TradingStats";
import { NewsSection } from "@/components/NewsSection";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Hero />
      <MarketOverview />
      <LiveChart />
      <TradingStats />
      <TradingFeatures />
      <NewsSection />
    </div>
  );
};

export default Index;
