import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Bell, Plus, Trash2 } from "lucide-react";
import { useState } from "react";

export const PriceAlerts = () => {
  const [alerts, setAlerts] = useState([
    { id: 1, crypto: "BTC", price: 45000, condition: "above", active: true },
    { id: 2, crypto: "ETH", price: 3000, condition: "below", active: true },
    { id: 3, crypto: "SOL", price: 100, condition: "above", active: false },
  ]);

  return (
    <Card className="glass-effect p-6 border-border">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className="h-10 w-10 rounded-lg bg-accent/20 flex items-center justify-center">
            <Bell className="h-6 w-6 text-accent" />
          </div>
          <div>
            <h3 className="text-xl font-bold text-foreground">Alertas de Precio</h3>
            <p className="text-sm text-muted-foreground">Configura alertas personalizadas</p>
          </div>
        </div>
        <Button size="sm" className="bg-primary hover:bg-primary/90">
          <Plus className="mr-2 h-4 w-4" />
          Nueva Alerta
        </Button>
      </div>

      <div className="space-y-3">
        {alerts.map((alert) => (
          <div 
            key={alert.id}
            className="flex items-center justify-between p-4 rounded-lg bg-background/50 border border-border hover:border-primary/50 transition-all"
          >
            <div className="flex items-center gap-4 flex-1">
              <div className={`h-3 w-3 rounded-full ${alert.active ? 'bg-success animate-pulse' : 'bg-muted-foreground'}`} />
              <div>
                <p className="font-semibold text-foreground">
                  {alert.crypto} {alert.condition === "above" ? ">" : "<"} ${alert.price.toLocaleString()}
                </p>
                <p className="text-sm text-muted-foreground">
                  Notificar cuando el precio esté {alert.condition === "above" ? "por encima" : "por debajo"}
                </p>
              </div>
            </div>
            <Button variant="ghost" size="sm" className="text-destructive hover:text-destructive">
              <Trash2 className="h-4 w-4" />
            </Button>
          </div>
        ))}
      </div>
    </Card>
  );
};
