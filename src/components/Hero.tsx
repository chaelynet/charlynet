import { Button } from "@/components/ui/button";
import { TrendingUp, Shield, Zap } from "lucide-react";

export const Hero = () => {
  return (
    <section className="relative overflow-hidden border-b border-border">
      <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-background to-accent/10" />
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxwYXRoIGQ9Ik0zNiAxOGMzLjMxNCAwIDYgMi42ODYgNiA2cy0yLjY4NiA2LTYgNi02LTIuNjg2LTYtNiAyLjY4Ni02IDYtNnoiIHN0cm9rZT0iIzAwYmNkNCIgc3Ryb2tlLW9wYWNpdHk9Ii4wNSIvPjwvZz48L3N2Zz4=')] opacity-20" />
      
      <div className="container relative mx-auto px-4 py-20 md:py-32">
        <div className="mx-auto max-w-4xl text-center">
          <div className="mb-6 inline-flex items-center gap-2 rounded-full bg-primary/10 px-4 py-2 text-sm font-medium text-primary glow-border animate-in fade-in slide-in-from-bottom-4 duration-700">
            <Zap className="h-4 w-4" />
            Plataforma Profesional de Trading Crypto
          </div>
          
          <h1 className="mb-6 text-5xl font-bold tracking-tight text-foreground md:text-7xl glow-text animate-in fade-in slide-in-from-bottom-6 duration-700 delay-100">
            Bienvenido a{" "}
            <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              CharlyNet
            </span>
          </h1>
          
          <p className="mb-10 text-lg text-muted-foreground md:text-xl animate-in fade-in slide-in-from-bottom-8 duration-700 delay-200">
            Análisis avanzado, estadísticas en tiempo real y herramientas profesionales
            para dominar el mercado de criptomonedas
          </p>
          
          <div className="flex flex-col gap-4 sm:flex-row sm:justify-center animate-in fade-in slide-in-from-bottom-10 duration-700 delay-300">
            <Button 
              size="lg" 
              className="bg-primary text-primary-foreground hover:bg-primary/90 glow-border"
            >
              <TrendingUp className="mr-2 h-5 w-5" />
              Comenzar a Operar
            </Button>
            <Button 
              size="lg" 
              variant="outline"
              className="border-primary/50 text-primary hover:bg-primary/10"
            >
              <Shield className="mr-2 h-5 w-5" />
              Explorar Mercados
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};
