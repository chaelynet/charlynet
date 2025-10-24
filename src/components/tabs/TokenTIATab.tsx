import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Coins, Wallet, Lock, Unlock, TrendingUp, Users, Award, Shield } from "lucide-react";

const NIVELES = [
  { amount: 500, label: "Core Colab", color: "bg-gradient-to-r from-purple-500 to-pink-500", icon: Award },
  { amount: 250, label: "Premium", color: "bg-gradient-to-r from-yellow-500 to-orange-500", icon: Shield },
  { amount: 100, label: "IA Plus", color: "bg-gradient-to-r from-blue-500 to-cyan-500", icon: TrendingUp },
  { amount: 50, label: "Voz", color: "bg-gradient-to-r from-green-500 to-emerald-500", icon: Users },
  { amount: 10, label: "Básico", color: "bg-gradient-to-r from-gray-500 to-slate-500", icon: Coins },
  { amount: 0, label: "Visitante", color: "bg-muted", icon: Wallet },
];

const CARACTERISTICAS = [
  { feature: "voz", name: "Comando de Voz", requiredTokens: 50, description: "Control por voz de la plataforma" },
  { feature: "ia_plus", name: "IA Plus", requiredTokens: 100, description: "Análisis avanzado con IA" },
  { feature: "premium", name: "Premium", requiredTokens: 250, description: "Acceso a todas las características premium" },
  { feature: "core_colab", name: "Core Colab", requiredTokens: 500, description: "Colaboración directa con el equipo" },
];

export const TokenTIATab = () => {
  const [wallet, setWallet] = useState("");
  const [balance, setBalance] = useState<number | null>(null);
  const [nivel, setNivel] = useState<string | null>(null);
  const [isChecking, setIsChecking] = useState(false);

  const handleCheckWallet = async () => {
    if (!wallet) return;
    
    setIsChecking(true);
    // Simulación de verificación - en producción esto llamaría al edge function
    setTimeout(() => {
      const mockBalance = Math.random() * 600;
      setBalance(mockBalance);
      
      const userNivel = NIVELES.find(n => mockBalance >= n.amount);
      setNivel(userNivel?.label || "Visitante");
      setIsChecking(false);
    }, 1500);
  };

  const getCurrentNivel = () => {
    if (!balance) return NIVELES[NIVELES.length - 1];
    return NIVELES.find(n => balance >= n.amount) || NIVELES[NIVELES.length - 1];
  };

  const isFeatureUnlocked = (requiredTokens: number) => {
    return balance !== null && balance >= requiredTokens;
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-3 mb-4">
            <div className="h-16 w-16 rounded-2xl bg-gradient-to-br from-primary to-accent flex items-center justify-center glow-border">
              <Coins className="h-8 w-8 text-primary-foreground" />
            </div>
            <h1 className="text-5xl font-bold glow-text">Token TIA</h1>
          </div>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-6">
            Desbloquea características premium y recompensas exclusivas según tu holding de tokens TIA en BSC
          </p>
          <div className="inline-block px-8 py-4 rounded-xl bg-gradient-to-r from-primary/20 to-accent/20 border border-primary/30">
            <h2 className="text-2xl font-bold text-primary mb-1">Proyectos, Certificaciones</h2>
            <p className="text-lg font-semibold text-foreground">Holder Solidarios</p>
          </div>
        </div>

        {/* Wallet Checker */}
        <Card className="glass-effect mb-8 max-w-2xl mx-auto">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Wallet className="h-5 w-5" />
              Verificar Balance de Wallet
            </CardTitle>
            <CardDescription>
              Ingresa tu dirección de wallet BSC para verificar tu nivel y características desbloqueadas
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex gap-2">
              <Input
                placeholder="0x..."
                value={wallet}
                onChange={(e) => setWallet(e.target.value)}
                className="font-mono"
              />
              <Button 
                onClick={handleCheckWallet} 
                disabled={!wallet || isChecking}
                className="bg-primary hover:bg-primary/90"
              >
                {isChecking ? "Verificando..." : "Verificar"}
              </Button>
            </div>

            {balance !== null && nivel && (
              <div className="mt-6 p-4 rounded-lg bg-card/50 border border-border">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <p className="text-sm text-muted-foreground">Balance TIA</p>
                    <p className="text-2xl font-bold">{balance.toFixed(2)} TIA</p>
                  </div>
                  <Badge className={`${getCurrentNivel().color} text-white px-4 py-2`}>
                    {nivel}
                  </Badge>
                </div>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Niveles de Holders */}
        <div className="mb-12">
          <h2 className="text-3xl font-bold mb-6 text-center">Niveles de Holders</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {NIVELES.map((nivel) => {
              const Icon = nivel.icon;
              const isCurrentLevel = balance !== null && balance >= nivel.amount && 
                (NIVELES[NIVELES.indexOf(nivel) - 1]?.amount === undefined || balance < NIVELES[NIVELES.indexOf(nivel) - 1].amount);
              
              return (
                <Card 
                  key={nivel.label} 
                  className={`glass-effect transition-all ${isCurrentLevel ? 'ring-2 ring-primary glow-border' : ''}`}
                >
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <div className={`h-12 w-12 rounded-lg ${nivel.color} flex items-center justify-center`}>
                        <Icon className="h-6 w-6 text-white" />
                      </div>
                      {isCurrentLevel && (
                        <Badge variant="outline" className="border-primary text-primary">
                          Tu Nivel
                        </Badge>
                      )}
                    </div>
                    <CardTitle className="mt-4">{nivel.label}</CardTitle>
                    <CardDescription>
                      Requiere {nivel.amount} TIA
                    </CardDescription>
                  </CardHeader>
                </Card>
              );
            })}
          </div>
        </div>

        {/* Características Desbloqueables */}
        <div>
          <h2 className="text-3xl font-bold mb-6 text-center">Características Premium</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-4xl mx-auto">
            {CARACTERISTICAS.map((feature) => {
              const unlocked = isFeatureUnlocked(feature.requiredTokens);
              
              return (
                <Card key={feature.feature} className="glass-effect">
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <CardTitle className="flex items-center gap-2">
                        {unlocked ? (
                          <Unlock className="h-5 w-5 text-success" />
                        ) : (
                          <Lock className="h-5 w-5 text-muted-foreground" />
                        )}
                        {feature.name}
                      </CardTitle>
                      <Badge variant={unlocked ? "default" : "secondary"}>
                        {feature.requiredTokens} TIA
                      </Badge>
                    </div>
                    <CardDescription>{feature.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    {balance !== null && !unlocked && (
                      <p className="text-sm text-muted-foreground">
                        Necesitas {(feature.requiredTokens - balance).toFixed(2)} TIA más para desbloquear
                      </p>
                    )}
                    {unlocked && (
                      <p className="text-sm text-success font-medium">✓ Característica Desbloqueada</p>
                    )}
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>

        {/* Token Info */}
        <Card className="glass-effect mt-12 max-w-4xl mx-auto">
          <CardHeader>
            <CardTitle>Información del Token TIA</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-muted-foreground">Contrato BSC</p>
                <p className="font-mono text-xs break-all">0x8c7ec041521f33f21416e75228afdf05016db6a1</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Red</p>
                <p className="font-medium">Binance Smart Chain (BSC)</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
