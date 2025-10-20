import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ExternalLink } from "lucide-react";

const newsItems = [
  {
    title: "Bitcoin alcanza nuevo máximo histórico tras aprobación de ETF",
    category: "Bitcoin",
    time: "Hace 2 horas",
    impact: "high"
  },
  {
    title: "Ethereum 2.0: Actualización exitosa mejora eficiencia energética",
    category: "Ethereum",
    time: "Hace 5 horas",
    impact: "medium"
  },
  {
    title: "Regulación crypto: Nuevas normativas en Europa",
    category: "Regulación",
    time: "Hace 8 horas",
    impact: "high"
  },
  {
    title: "DeFi: El volumen de trading supera los $100B mensuales",
    category: "DeFi",
    time: "Hace 12 horas",
    impact: "medium"
  },
  {
    title: "Adopción institucional: Grandes bancos integran crypto",
    category: "Institucional",
    time: "Hace 1 día",
    impact: "high"
  },
  {
    title: "Análisis técnico: Tendencias alcistas en altcoins principales",
    category: "Análisis",
    time: "Hace 1 día",
    impact: "low"
  },
];

export const NewsSection = () => {
  return (
    <section className="py-12">
      <div className="container mx-auto px-4">
        <div className="mb-8 flex items-center justify-between">
          <h2 className="text-3xl font-bold text-foreground">
            Noticias del <span className="text-primary">Mercado</span>
          </h2>
          <Button variant="outline" className="border-primary/50 text-primary hover:bg-primary/10">
            Ver todas
            <ExternalLink className="ml-2 h-4 w-4" />
          </Button>
        </div>
        
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
          {newsItems.map((news, index) => (
            <Card 
              key={index}
              className="glass-effect group cursor-pointer border-border p-6 transition-all hover:border-primary/50 hover:shadow-lg hover:shadow-primary/20"
            >
              <div className="mb-3 flex items-center justify-between">
                <Badge 
                  variant="outline" 
                  className={`
                    ${news.impact === 'high' ? 'border-destructive/50 text-destructive' : ''}
                    ${news.impact === 'medium' ? 'border-primary/50 text-primary' : ''}
                    ${news.impact === 'low' ? 'border-muted text-muted-foreground' : ''}
                  `}
                >
                  {news.category}
                </Badge>
                <span className="text-xs text-muted-foreground">{news.time}</span>
              </div>
              <h3 className="text-lg font-semibold text-foreground group-hover:text-primary transition-colors">
                {news.title}
              </h3>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};
