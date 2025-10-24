import { Button } from "@/components/ui/button";
import { GraduationCap, Coins, Heart } from "lucide-react";
import { TabType } from "@/pages/Index";

interface HeaderProps {
  activeTab: TabType;
  onTabChange: (tab: TabType) => void;
}

export const Header = ({ activeTab, onTabChange }: HeaderProps) => {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <nav className="container mx-auto flex h-16 items-center justify-between px-4">
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-2">
            <div className="h-8 w-8 rounded-lg bg-gradient-to-br from-primary to-accent flex items-center justify-center glow-border">
              <span className="text-lg font-bold text-primary-foreground">C</span>
            </div>
            <span className="text-xl font-bold text-foreground">CharlyNet</span>
          </div>
        </div>

        <div className="hidden md:flex items-center gap-1">
          <Button 
            variant="ghost" 
            size="sm"
            onClick={() => onTabChange("fundacion")}
            className={activeTab === "fundacion" ? "text-primary" : "text-muted-foreground hover:text-foreground"}
          >
            <Heart className="mr-2 h-4 w-4" />
            Fundación
          </Button>
          <Button 
            variant="ghost" 
            size="sm"
            onClick={() => onTabChange("tokentia")}
            className={activeTab === "tokentia" ? "text-primary glow-text" : "text-primary hover:text-primary/80"}
          >
            <Coins className="mr-2 h-4 w-4" />
            Token TIA
          </Button>
          <Button 
            variant="ghost" 
            size="sm"
            onClick={() => onTabChange("educacion")}
            className={activeTab === "educacion" ? "text-primary" : "text-muted-foreground hover:text-foreground"}
          >
            <GraduationCap className="mr-2 h-4 w-4" />
            Educación
          </Button>
        </div>

        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" className="hidden sm:flex border-border hover:bg-accent">
            Iniciar Sesión
          </Button>
          <Button size="sm" className="bg-primary text-primary-foreground hover:bg-primary/90 glow-border">
            Registrarse
          </Button>
        </div>
      </nav>
    </header>
  );
};
