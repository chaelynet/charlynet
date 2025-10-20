import { TrendingUp, TrendingDown } from "lucide-react";
import { Card } from "@/components/ui/card";
import { useQuery } from "@tanstack/react-query";

interface CoinData {
  id: string;
  symbol: string;
  name: string;
  current_price: number;
  price_change_percentage_24h: number;
}

const fetchCryptoData = async (): Promise<CoinData[]> => {
  const response = await fetch(
    'https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&ids=bitcoin,ethereum,cardano,solana,polkadot,ripple&order=market_cap_desc&sparkline=false'
  );
  if (!response.ok) throw new Error('Failed to fetch crypto data');
  return response.json();
};

export const MarketOverview = () => {
  const { data: cryptoData, isLoading } = useQuery({
    queryKey: ['cryptoMarket'],
    queryFn: fetchCryptoData,
    refetchInterval: 30000, // Refetch every 30 seconds
  });
  return (
    <section className="border-b border-border py-12">
      <div className="container mx-auto px-4">
        <h2 className="mb-8 text-3xl font-bold text-foreground">
          Mercado en <span className="text-primary">Vivo</span>
        </h2>
        
        {isLoading ? (
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6">
            {[...Array(6)].map((_, i) => (
              <Card key={i} className="glass-effect border-border p-4 animate-pulse">
                <div className="h-4 bg-muted rounded mb-2" />
                <div className="h-6 bg-muted rounded mb-1" />
                <div className="h-4 bg-muted rounded w-16" />
              </Card>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6">
            {cryptoData?.map((crypto) => {
              const isPositive = crypto.price_change_percentage_24h > 0;
              return (
                <Card 
                  key={crypto.id} 
                  className="glass-effect group cursor-pointer border-border p-4 transition-all hover:border-primary/50 hover:shadow-lg hover:shadow-primary/20"
                >
                  <div className="mb-2 flex items-center justify-between">
                    <span className="text-sm font-medium text-muted-foreground uppercase">{crypto.symbol}</span>
                    {isPositive ? (
                      <TrendingUp className="h-4 w-4 text-success" />
                    ) : (
                      <TrendingDown className="h-4 w-4 text-destructive" />
                    )}
                  </div>
                  <div className="mb-1 text-xl font-bold text-foreground group-hover:text-primary transition-colors">
                    ${crypto.current_price.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                  </div>
                  <div className={`text-sm font-medium ${isPositive ? 'text-success' : 'text-destructive'}`}>
                    {isPositive ? '+' : ''}{crypto.price_change_percentage_24h.toFixed(2)}%
                  </div>
                </Card>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
};
