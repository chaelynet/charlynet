import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  BookOpen, 
  Brain, 
  TrendingUp, 
  Lock, 
  CheckCircle2, 
  Clock,
  Award,
  Coins,
  Trophy,
  GraduationCap,
  Users,
  Star
} from "lucide-react";

// Cursos disponibles
const CURSOS = [
  {
    id: "trading-basico",
    categoria: "trading",
    titulo: "Trading para Principiantes",
    descripcion: "Fundamentos del trading en criptomonedas, análisis técnico básico y gestión de riesgo",
    duracion: "8 horas",
    modulos: 12,
    nivel: "Básico",
    precioTIA: 50,
    recompensaTIA: 50,
    instructor: "Carlos Méndez",
    estudiantes: 1234,
    rating: 4.8,
    imagen: "📊"
  },
  {
    id: "trading-avanzado",
    categoria: "trading",
    titulo: "Trading Avanzado y Estrategias",
    descripcion: "Estrategias avanzadas, análisis de volumen, patrones complejos y trading algorítmico",
    duracion: "15 horas",
    modulos: 20,
    nivel: "Avanzado",
    precioTIA: 150,
    recompensaTIA: 150,
    instructor: "Ana García",
    estudiantes: 856,
    rating: 4.9,
    imagen: "📈"
  },
  {
    id: "ia-fundamentos",
    categoria: "ia",
    titulo: "Fundamentos de IA y Machine Learning",
    descripcion: "Introducción a IA, redes neuronales, y aplicaciones en trading y análisis de datos",
    duracion: "10 horas",
    modulos: 15,
    nivel: "Intermedio",
    precioTIA: 100,
    recompensaTIA: 100,
    instructor: "Dr. Miguel Torres",
    estudiantes: 945,
    rating: 4.7,
    imagen: "🤖"
  },
  {
    id: "ia-trading",
    categoria: "ia",
    titulo: "IA Aplicada al Trading",
    descripcion: "Uso de algoritmos de IA para predicción de mercados, bots de trading y análisis automatizado",
    duracion: "12 horas",
    modulos: 18,
    nivel: "Avanzado",
    precioTIA: 200,
    recompensaTIA: 200,
    instructor: "Dr. Miguel Torres",
    estudiantes: 623,
    rating: 4.9,
    imagen: "🧠"
  },
  {
    id: "blockchain-basics",
    categoria: "blockchain",
    titulo: "Blockchain y Contratos Inteligentes",
    descripcion: "Fundamentos de blockchain, smart contracts y desarrollo en Solidity",
    duracion: "14 horas",
    modulos: 16,
    nivel: "Intermedio",
    precioTIA: 120,
    recompensaTIA: 120,
    instructor: "Luis Rodríguez",
    estudiantes: 734,
    rating: 4.6,
    imagen: "⛓️"
  },
  {
    id: "defi-avanzado",
    categoria: "blockchain",
    titulo: "DeFi y Finanzas Descentralizadas",
    descripcion: "Protocolos DeFi, yield farming, staking y estrategias de inversión descentralizada",
    duracion: "10 horas",
    modulos: 14,
    nivel: "Avanzado",
    precioTIA: 180,
    recompensaTIA: 180,
    instructor: "Sofia Martínez",
    estudiantes: 512,
    rating: 4.8,
    imagen: "💎"
  }
];

type Curso = typeof CURSOS[0];

export const EducacionTab = () => {
  const [categoriaActiva, setCategoriaActiva] = useState<"todos" | "trading" | "ia" | "blockchain">("todos");
  const [cursosComprados, setCursosComprados] = useState<string[]>([]);
  const [cursosCompletados, setCursosCompletados] = useState<string[]>([]);
  const [balanceTIA, setBalanceTIA] = useState(500); // Simulado - en producción vendría del wallet
  const [depositosBloqueados, setDepositosBloqueados] = useState(0);

  const comprarCurso = (curso: Curso) => {
    if (balanceTIA >= curso.precioTIA && !cursosComprados.includes(curso.id)) {
      setBalanceTIA(prev => prev - curso.precioTIA);
      setCursosComprados(prev => [...prev, curso.id]);
    }
  };

  const completarCurso = (curso: Curso) => {
    if (cursosComprados.includes(curso.id) && !cursosCompletados.includes(curso.id)) {
      setCursosCompletados(prev => [...prev, curso.id]);
      setDepositosBloqueados(prev => prev + curso.recompensaTIA);
    }
  };

  const cursosFiltrados = CURSOS.filter(curso => 
    categoriaActiva === "todos" || curso.categoria === categoriaActiva
  );

  const totalInvertido = cursosComprados.reduce((sum, id) => {
    const curso = CURSOS.find(c => c.id === id);
    return sum + (curso?.precioTIA || 0);
  }, 0);

  const totalRecompensas = cursosCompletados.length;

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-3 mb-4">
            <div className="h-16 w-16 rounded-2xl bg-gradient-to-br from-primary to-accent flex items-center justify-center glow-border">
              <GraduationCap className="h-8 w-8 text-primary-foreground" />
            </div>
            <h1 className="text-5xl font-bold glow-text">Academia TIA</h1>
          </div>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Aprende trading e IA con expertos. Paga con Token TIA y recupera tu inversión al completar los cursos
          </p>
        </div>

        {/* Dashboard del Usuario */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <Card className="glass-effect">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium flex items-center gap-2">
                <Coins className="h-4 w-4 text-primary" />
                Balance TIA
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{balanceTIA.toFixed(2)}</div>
              <p className="text-xs text-muted-foreground">Disponible para cursos</p>
            </CardContent>
          </Card>

          <Card className="glass-effect">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium flex items-center gap-2">
                <Trophy className="h-4 w-4 text-accent" />
                Depósitos Bloqueados
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-accent">{depositosBloqueados.toFixed(2)}</div>
              <p className="text-xs text-muted-foreground">Desbloqueables en 1 año</p>
            </CardContent>
          </Card>

          <Card className="glass-effect">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium flex items-center gap-2">
                <BookOpen className="h-4 w-4 text-success" />
                Cursos Activos
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{cursosComprados.length}</div>
              <p className="text-xs text-muted-foreground">{cursosCompletados.length} completados</p>
            </CardContent>
          </Card>

          <Card className="glass-effect">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium flex items-center gap-2">
                <Award className="h-4 w-4 text-primary" />
                Total Invertido
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{totalInvertido.toFixed(2)}</div>
              <p className="text-xs text-muted-foreground">TIA en educación</p>
            </CardContent>
          </Card>
        </div>

        {/* Sistema de Recompensas */}
        <Card className="glass-effect mb-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Trophy className="h-5 w-5 text-accent" />
              Sistema de Recompensas TIA
            </CardTitle>
            <CardDescription>
              Completa cursos y recupera el 100% de tu inversión en depósitos bloqueados por 1 año
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="p-4 rounded-lg border border-border bg-card/50">
                <div className="flex items-center gap-3 mb-2">
                  <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center">
                    <Coins className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <p className="font-semibold">1. Compra con TIA</p>
                    <p className="text-xs text-muted-foreground">Paga tus cursos con tokens</p>
                  </div>
                </div>
              </div>

              <div className="p-4 rounded-lg border border-border bg-card/50">
                <div className="flex items-center gap-3 mb-2">
                  <div className="h-10 w-10 rounded-lg bg-success/10 flex items-center justify-center">
                    <GraduationCap className="h-5 w-5 text-success" />
                  </div>
                  <div>
                    <p className="font-semibold">2. Completa el Curso</p>
                    <p className="text-xs text-muted-foreground">Aprende y certifícate</p>
                  </div>
                </div>
              </div>

              <div className="p-4 rounded-lg border border-border bg-card/50">
                <div className="flex items-center gap-3 mb-2">
                  <div className="h-10 w-10 rounded-lg bg-accent/10 flex items-center justify-center">
                    <Trophy className="h-5 w-5 text-accent" />
                  </div>
                  <div>
                    <p className="font-semibold">3. Recibe Recompensa</p>
                    <p className="text-xs text-muted-foreground">Depósito bloqueado 1 año</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-4 p-4 rounded-lg bg-accent/10 border border-accent/20">
              <p className="text-sm font-medium text-accent flex items-center gap-2">
                <Star className="h-4 w-4" />
                Al completar un curso, recibes el valor pagado en TIA como depósito bloqueado por 1 año
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Filtros de Categorías */}
        <Tabs value={categoriaActiva} onValueChange={(value) => setCategoriaActiva(value as any)} className="mb-8">
          <TabsList className="grid w-full max-w-2xl mx-auto grid-cols-4">
            <TabsTrigger value="todos">
              <BookOpen className="h-4 w-4 mr-2" />
              Todos
            </TabsTrigger>
            <TabsTrigger value="trading">
              <TrendingUp className="h-4 w-4 mr-2" />
              Trading
            </TabsTrigger>
            <TabsTrigger value="ia">
              <Brain className="h-4 w-4 mr-2" />
              IA
            </TabsTrigger>
            <TabsTrigger value="blockchain">
              <Coins className="h-4 w-4 mr-2" />
              Blockchain
            </TabsTrigger>
          </TabsList>

          <TabsContent value={categoriaActiva} className="mt-8">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {cursosFiltrados.map((curso) => {
                const comprado = cursosComprados.includes(curso.id);
                const completado = cursosCompletados.includes(curso.id);
                const puedeComprar = balanceTIA >= curso.precioTIA;

                return (
                  <Card key={curso.id} className="glass-effect flex flex-col">
                    <CardHeader>
                      <div className="flex items-start justify-between mb-3">
                        <div className="text-4xl">{curso.imagen}</div>
                        <Badge variant={comprado ? "default" : "secondary"}>
                          {curso.nivel}
                        </Badge>
                      </div>
                      <CardTitle className="text-xl">{curso.titulo}</CardTitle>
                      <CardDescription className="line-clamp-2">
                        {curso.descripcion}
                      </CardDescription>
                    </CardHeader>

                    <CardContent className="flex-1 space-y-4">
                      <div className="flex items-center gap-4 text-sm text-muted-foreground">
                        <span className="flex items-center gap-1">
                          <Clock className="h-4 w-4" />
                          {curso.duracion}
                        </span>
                        <span className="flex items-center gap-1">
                          <BookOpen className="h-4 w-4" />
                          {curso.modulos} módulos
                        </span>
                      </div>

                      <div className="flex items-center gap-4 text-sm">
                        <span className="flex items-center gap-1">
                          <Users className="h-4 w-4" />
                          {curso.estudiantes.toLocaleString()}
                        </span>
                        <span className="flex items-center gap-1 text-accent">
                          <Star className="h-4 w-4 fill-current" />
                          {curso.rating}
                        </span>
                      </div>

                      <div className="text-sm text-muted-foreground">
                        Por {curso.instructor}
                      </div>

                      {comprado && !completado && (
                        <div className="space-y-2">
                          <div className="flex items-center justify-between text-sm">
                            <span>Progreso</span>
                            <span className="text-muted-foreground">45%</span>
                          </div>
                          <Progress value={45} className="h-2" />
                        </div>
                      )}

                      {completado && (
                        <div className="p-3 rounded-lg bg-success/10 border border-success/20">
                          <p className="text-sm font-medium text-success flex items-center gap-2">
                            <CheckCircle2 className="h-4 w-4" />
                            Curso completado - {curso.recompensaTIA} TIA bloqueados
                          </p>
                        </div>
                      )}
                    </CardContent>

                    <CardFooter className="flex flex-col gap-2">
                      <div className="flex items-center justify-between w-full">
                        <div>
                          <div className="text-2xl font-bold text-primary flex items-center gap-1">
                            {curso.precioTIA}
                            <Coins className="h-5 w-5" />
                          </div>
                          <div className="text-xs text-muted-foreground">
                            +{curso.recompensaTIA} TIA al completar
                          </div>
                        </div>
                      </div>

                      {!comprado && (
                        <Button 
                          className="w-full"
                          disabled={!puedeComprar}
                          onClick={() => comprarCurso(curso)}
                        >
                          {puedeComprar ? (
                            <>
                              <Coins className="h-4 w-4 mr-2" />
                              Comprar con TIA
                            </>
                          ) : (
                            <>
                              <Lock className="h-4 w-4 mr-2" />
                              TIA Insuficiente
                            </>
                          )}
                        </Button>
                      )}

                      {comprado && !completado && (
                        <Button 
                          className="w-full"
                          onClick={() => completarCurso(curso)}
                        >
                          Continuar Curso
                        </Button>
                      )}

                      {completado && (
                        <Button className="w-full" variant="outline" disabled>
                          <CheckCircle2 className="h-4 w-4 mr-2" />
                          Completado
                        </Button>
                      )}
                    </CardFooter>
                  </Card>
                );
              })}
            </div>
          </TabsContent>
        </Tabs>

        {/* Mis Cursos */}
        {cursosComprados.length > 0 && (
          <Card className="glass-effect mt-8">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BookOpen className="h-5 w-5" />
                Mis Cursos
              </CardTitle>
              <CardDescription>
                Cursos adquiridos y progreso de aprendizaje
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {cursosComprados.map(cursoId => {
                  const curso = CURSOS.find(c => c.id === cursoId);
                  if (!curso) return null;
                  const completado = cursosCompletados.includes(cursoId);

                  return (
                    <div key={cursoId} className="p-4 rounded-lg border border-border bg-card/50">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <div className="flex items-center gap-3 mb-2">
                            <span className="text-2xl">{curso.imagen}</span>
                            <div>
                              <h4 className="font-semibold">{curso.titulo}</h4>
                              <p className="text-sm text-muted-foreground">{curso.instructor}</p>
                            </div>
                          </div>
                          {!completado && (
                            <div className="mt-3 space-y-2">
                              <div className="flex items-center justify-between text-sm">
                                <span>Progreso del curso</span>
                                <span className="text-muted-foreground">45%</span>
                              </div>
                              <Progress value={45} />
                            </div>
                          )}
                        </div>
                        {completado && (
                          <Badge className="bg-success text-success-foreground">
                            <CheckCircle2 className="h-3 w-3 mr-1" />
                            Completado
                          </Badge>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </CardContent>
          </Card>
        )}

        {/* Comunidad Educativa */}
        <Card className="glass-effect mt-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Users className="h-5 w-5" />
              Comunidad Educativa TIA
            </CardTitle>
            <CardDescription>
              Únete a una comunidad de estudiantes que aprenden y ganan con Token TIA
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="text-center p-6 rounded-lg border border-border bg-card/30">
                <div className="text-3xl font-bold text-primary mb-2">2,847</div>
                <p className="text-sm text-muted-foreground">Estudiantes Activos</p>
              </div>
              <div className="text-center p-6 rounded-lg border border-border bg-card/30">
                <div className="text-3xl font-bold text-accent mb-2">15,234</div>
                <p className="text-sm text-muted-foreground">TIA en Recompensas</p>
              </div>
              <div className="text-center p-6 rounded-lg border border-border bg-card/30">
                <div className="text-3xl font-bold text-success mb-2">1,256</div>
                <p className="text-sm text-muted-foreground">Cursos Completados</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};