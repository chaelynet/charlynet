import { Card } from "@/components/ui/card";
import { Activity, DollarSign, TrendingUp, Users } from "lucide-react";

const stats = [
  {
    title: "Volumen 24h",
    value: "$2.4B",
    change: "+12.5%",
    icon: DollarSign,
    color: "text-primary"
  },
  {
    title: "Traders Activos",
    value: "45,678",
    change: "+8.3%",
    icon: Users,
    color: "text-accent"
  },
  {
    title: "Transacciones/min",
    value: "1,234",
    change: "+15.2%",
    icon: Activity,
    color: "text-success"
  },
  {
    title: "Profit Promedio",
    value: "+18.7%",
    change: "+3.1%",
    icon: TrendingUp,
    color: "text-primary"
  },
];

export const TradingStats = () => {
  return (
    <section className="border-b border-border py-12">
      <div className="container mx-auto px-4">
        <h2 className="mb-8 text-3xl font-bold text-foreground">
          Estadísticas <span className="text-primary">Globales</span>
        </h2>
        
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
          {stats.map((stat) => (
            <Card 
              key={stat.title} 
              className="glass-effect group border-border p-6 transition-all hover:border-primary/50 hover:shadow-lg hover:shadow-primary/20"
            >
              <div className="mb-4 flex items-center justify-between">
                <stat.icon className={`h-8 w-8 ${stat.color}`} />
                <span className="text-sm font-medium text-success">{stat.change}</span>
              </div>
              <div className="mb-2 text-3xl font-bold text-foreground group-hover:text-primary transition-colors">
                {stat.value}
              </div>
              <div className="text-sm text-muted-foreground">{stat.title}</div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};
