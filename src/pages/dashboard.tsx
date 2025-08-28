import { StatsCard } from "@/components/dashboard/stats-card";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  DollarSign,
  ShoppingCart,
  Users,
  TrendingUp,
  Clock,
  CheckCircle,
  AlertCircle,
  Truck,
} from "lucide-react";

export default function Dashboard() {
  return (
    <div className="p-6 space-y-6">
      {/* Welcome Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
          <p className="text-muted-foreground">
            Bem-vindo de volta! Aqui está o resumo do seu restaurante hoje.
          </p>
        </div>
        <Button variant="hero" size="lg">
          Novo Pedido
        </Button>
      </div>

      {/* Stats Grid */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <StatsCard
          title="Receita Hoje"
          value="R$ 2.847,90"
          description="desde ontem"
          icon={DollarSign}
          trend={{ value: "12.5%", isPositive: true }}
        />
        <StatsCard
          title="Pedidos Hoje"
          value="47"
          description="desde ontem"
          icon={ShoppingCart}
          trend={{ value: "8.2%", isPositive: true }}
        />
        <StatsCard
          title="Clientes Ativos"
          value="134"
          description="este mês"
          icon={Users}
          trend={{ value: "2.1%", isPositive: false }}
        />
        <StatsCard
          title="Ticket Médio"
          value="R$ 60,59"
          description="hoje"
          icon={TrendingUp}
          trend={{ value: "5.3%", isPositive: true }}
        />
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {/* Recent Orders */}
        <Card className="lg:col-span-2 shadow-card">
          <CardHeader>
            <CardTitle>Pedidos Recentes</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                {
                  id: "#12345",
                  customer: "João Silva",
                  items: "2x Hambúrguer Especial, 1x Batata Frita",
                  value: "R$ 45,90",
                  status: "preparing",
                  time: "há 5 min",
                },
                {
                  id: "#12346",
                  customer: "Maria Santos",
                  items: "1x Pizza Margherita, 1x Refrigerante",
                  value: "R$ 38,50",
                  status: "ready",
                  time: "há 12 min",
                },
                {
                  id: "#12347",
                  customer: "Pedro Costa",
                  items: "1x Salada Caesar, 1x Suco Natural",
                  value: "R$ 28,90",
                  status: "delivered",
                  time: "há 25 min",
                },
              ].map((order) => (
                <div
                  key={order.id}
                  className="flex items-center justify-between p-4 border border-border rounded-lg hover:bg-muted/50 transition-colors"
                >
                  <div className="flex items-center space-x-4">
                    <div className="flex items-center justify-center w-10 h-10 rounded-full bg-gradient-hero">
                      {order.status === "preparing" && (
                        <Clock className="w-5 h-5 text-white" />
                      )}
                      {order.status === "ready" && (
                        <CheckCircle className="w-5 h-5 text-white" />
                      )}
                      {order.status === "delivered" && (
                        <Truck className="w-5 h-5 text-white" />
                      )}
                    </div>
                    <div>
                      <div className="flex items-center space-x-2">
                        <span className="font-medium">{order.id}</span>
                        <Badge
                          variant={
                            order.status === "preparing"
                              ? "default"
                              : order.status === "ready"
                              ? "secondary"
                              : "outline"
                          }
                        >
                          {order.status === "preparing" && "Preparando"}
                          {order.status === "ready" && "Pronto"}
                          {order.status === "delivered" && "Entregue"}
                        </Badge>
                      </div>
                      <p className="text-sm text-muted-foreground">
                        {order.customer}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        {order.items}
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-medium">{order.value}</p>
                    <p className="text-xs text-muted-foreground">{order.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* iFood Integration Status */}
        <Card className="shadow-card">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <span>Status iFood</span>
              <Badge variant="secondary">Conectado</Badge>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-sm">Pedidos Hoje</span>
              <span className="font-medium">23</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm">Receita iFood</span>
              <span className="font-medium">R$ 1.240,50</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm">Taxa de Aceite</span>
              <span className="font-medium text-success">96%</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm">Tempo Médio</span>
              <span className="font-medium">28 min</span>
            </div>
            <Button variant="outline" className="w-full">
              Configurar iFood
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions */}
      <Card className="shadow-card">
        <CardHeader>
          <CardTitle>Ações Rápidas</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <Button variant="outline" className="h-16">
              <div className="text-center">
                <ShoppingCart className="w-5 h-5 mx-auto mb-1" />
                <span className="text-xs">Novo Pedido</span>
              </div>
            </Button>
            <Button variant="outline" className="h-16">
              <div className="text-center">
                <Users className="w-5 h-5 mx-auto mb-1" />
                <span className="text-xs">Cadastrar Cliente</span>
              </div>
            </Button>
            <Button variant="outline" className="h-16">
              <div className="text-center">
                <AlertCircle className="w-5 h-5 mx-auto mb-1" />
                <span className="text-xs">Estoque Baixo</span>
              </div>
            </Button>
            <Button variant="outline" className="h-16">
              <div className="text-center">
                <TrendingUp className="w-5 h-5 mx-auto mb-1" />
                <span className="text-xs">Relatórios</span>
              </div>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}