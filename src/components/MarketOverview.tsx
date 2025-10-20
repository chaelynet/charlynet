import { TrendingUp, TrendingDown } from "lucide-react";
import { Card } from "@/components/ui/card";

const cryptoData = [
  { name: "Bitcoin", symbol: "BTC", price: "$67,234.50", change: "+2.34%", isPositive: true },
  { name: "Ethereum", symbol: "ETH", price: "$3,456.78", change: "+1.89%", isPositive: true },
  { name: "Cardano", symbol: "ADA", price: "$0.5623", change: "-0.45%", isPositive: false },
  { name: "Solana", symbol: "SOL", price: "$145.67", change: "+5.12%", isPositive: true },
  { name: "Polkadot", symbol: "DOT", price: "$7.89", change: "+3.21%", isPositive: true },
  { name: "Ripple", symbol: "XRP", price: "$0.6234", change: "-1.23%", isPositive: false },
];

export const MarketOverview = () => {
  return (
    <section className="border-b border-border py-12">
      <div className="container mx-auto px-4">
        <h2 className="mb-8 text-3xl font-bold text-foreground">
          Mercado en <span className="text-primary">Vivo</span>
        </h2>
        
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6">
          {cryptoData.map((crypto) => (
            <Card 
              key={crypto.symbol} 
              className="glass-effect group cursor-pointer border-border p-4 transition-all hover:border-primary/50 hover:shadow-lg hover:shadow-primary/20"
            >
              <div className="mb-2 flex items-center justify-between">
                <span className="text-sm font-medium text-muted-foreground">{crypto.symbol}</span>
                {crypto.isPositive ? (
                  <TrendingUp className="h-4 w-4 text-success" />
                ) : (
                  <TrendingDown className="h-4 w-4 text-destructive" />
                )}
              </div>
              <div className="mb-1 text-xl font-bold text-foreground group-hover:text-primary transition-colors">
                {crypto.price}
              </div>
              <div className={`text-sm font-medium ${crypto.isPositive ? 'text-success' : 'text-destructive'}`}>
                {crypto.change}
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};
