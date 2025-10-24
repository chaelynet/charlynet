import { useState } from "react";
import { Header } from "@/components/Header";
import { TokenTIATab } from "@/components/tabs/TokenTIATab";
import { EducacionTab } from "@/components/tabs/EducacionTab";
import { FundacionTab } from "@/components/tabs/FundacionTab";

export type TabType = "fundacion" | "tokentia" | "educacion";

const Index = () => {
  const [activeTab, setActiveTab] = useState<TabType>("fundacion");

  const renderTabContent = () => {
    switch (activeTab) {
      case "fundacion":
        return <FundacionTab />;
      case "tokentia":
        return <TokenTIATab />;
      case "educacion":
        return <EducacionTab />;
      default:
        return <FundacionTab />;
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
