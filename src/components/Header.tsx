import { Button } from "@/components/ui/button";
import { ChartBar, Wallet, Bot, GraduationCap, Coins, Heart } from "lucide-react";

export const Header = () => {
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
          <Button variant="ghost" size="sm" className="text-muted-foreground hover:text-foreground">
            <ChartBar className="mr-2 h-4 w-4" />
            Análisis
          </Button>
          <Button variant="ghost" size="sm" className="text-muted-foreground hover:text-foreground">
            <Wallet className="mr-2 h-4 w-4" />
            Portfolio
          </Button>
          <Button variant="ghost" size="sm" className="text-muted-foreground hover:text-foreground">
            <Bot className="mr-2 h-4 w-4" />
            Auto/Bot
          </Button>
          <Button variant="ghost" size="sm" className="text-muted-foreground hover:text-foreground">
            <GraduationCap className="mr-2 h-4 w-4" />
            Educación
          </Button>
          <Button variant="ghost" size="sm" className="text-primary hover:text-primary/80 glow-text">
            <Coins className="mr-2 h-4 w-4" />
            Token TIA
          </Button>
          <Button variant="ghost" size="sm" className="text-muted-foreground hover:text-foreground">
            <Heart className="mr-2 h-4 w-4" />
            Fundación
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
