import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import {
  CheckCircle,
  AlertCircle,
  Settings,
  RotateCcw,
  TrendingUp,
  Clock,
  DollarSign,
  Truck,
} from "lucide-react";

export default function IFood() {
  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Integração iFood</h1>
          <p className="text-muted-foreground">
            Configure e monitore sua integração com o iFood
          </p>
        </div>
        <Badge variant="secondary" className="text-sm px-3 py-1">
          <CheckCircle className="w-4 h-4 mr-2" />
          Conectado
        </Badge>
      </div>

      <Tabs defaultValue="overview" className="space-y-6">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="overview">Visão Geral</TabsTrigger>
          <TabsTrigger value="settings">Configurações</TabsTrigger>
          <TabsTrigger value="menu">Cardápio</TabsTrigger>
          <TabsTrigger value="orders">Pedidos</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          {/* Stats */}
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <Card className="shadow-card">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Receita iFood</CardTitle>
                <DollarSign className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">R$ 1.240,50</div>
                <p className="text-xs text-muted-foreground">
                  <span className="text-success font-medium">+18.2%</span> desde ontem
                </p>
              </CardContent>
            </Card>

            <Card className="shadow-card">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Pedidos</CardTitle>
                <Truck className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">23</div>
                <p className="text-xs text-muted-foreground">
                  <span className="text-success font-medium">+12.5%</span> desde ontem
                </p>
              </CardContent>
            </Card>

            <Card className="shadow-card">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Taxa de Aceite</CardTitle>
                <CheckCircle className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">96%</div>
                <p className="text-xs text-muted-foreground">
                  <span className="text-success font-medium">+2.1%</span> desde ontem
                </p>
              </CardContent>
            </Card>

            <Card className="shadow-card">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Tempo Médio</CardTitle>
                <Clock className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">28 min</div>
                <p className="text-xs text-muted-foreground">
                  <span className="text-destructive font-medium">+3 min</span> desde ontem
                </p>
              </CardContent>
            </Card>
          </div>

          {/* Recent Activity */}
          <Card className="shadow-card">
            <CardHeader>
              <CardTitle>Atividade Recente</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[
                  {
                    action: "Novo pedido recebido",
                    details: "Pedido #IF12345 - R$ 45,90",
                    time: "há 2 min",
                    status: "success",
                  },
                  {
                    action: "Cardápio sincronizado",
                    details: "23 itens atualizados com sucesso",
                    time: "há 15 min",
                    status: "info",
                  },
                  {
                    action: "Pedido cancelado",
                    details: "Pedido #IF12344 cancelado pelo cliente",
                    time: "há 1h",
                    status: "warning",
                  },
                ].map((activity, index) => (
                  <div key={index} className="flex items-start space-x-3 p-3 rounded-lg border border-border">
                    <div className={`w-2 h-2 rounded-full mt-2 ${
                      activity.status === "success" ? "bg-success" :
                      activity.status === "warning" ? "bg-warning" : "bg-primary"
                    }`} />
                    <div className="flex-1">
                      <p className="font-medium">{activity.action}</p>
                      <p className="text-sm text-muted-foreground">{activity.details}</p>
                    </div>
                    <span className="text-xs text-muted-foreground">{activity.time}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="settings" className="space-y-6">
          <div className="grid gap-6 md:grid-cols-2">
            {/* Connection Settings */}
            <Card className="shadow-card">
              <CardHeader>
                <CardTitle>Configurações de Conexão</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="client-id">Client ID</Label>
                  <Input id="client-id" placeholder="Seu Client ID do iFood" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="client-secret">Client Secret</Label>
                  <Input id="client-secret" type="password" placeholder="Seu Client Secret" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="merchant-id">Merchant ID</Label>
                  <Input id="merchant-id" placeholder="ID do seu restaurante" />
                </div>
                <Button variant="hero" className="w-full">
                  <RotateCcw className="w-4 h-4 mr-2" />
                  Reconectar
                </Button>
              </CardContent>
            </Card>

            {/* Sync Settings */}
            <Card className="shadow-card">
              <CardHeader>
                <CardTitle>Configurações de Sincronização</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Sincronização Automática</Label>
                    <p className="text-sm text-muted-foreground">
                      Sincroniza cardápio automaticamente
                    </p>
                  </div>
                  <Switch defaultChecked />
                </div>
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Aceitar Pedidos</Label>
                    <p className="text-sm text-muted-foreground">
                      Aceita pedidos automaticamente
                    </p>
                  </div>
                  <Switch defaultChecked />
                </div>
                <div className="space-y-2">
                  <Label>Tempo de Preparo Padrão</Label>
                  <Select defaultValue="30">
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="15">15 minutos</SelectItem>
                      <SelectItem value="20">20 minutos</SelectItem>
                      <SelectItem value="25">25 minutos</SelectItem>
                      <SelectItem value="30">30 minutos</SelectItem>
                      <SelectItem value="35">35 minutos</SelectItem>
                      <SelectItem value="40">40 minutos</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="menu" className="space-y-6">
          <Card className="shadow-card">
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle>Sincronização do Cardápio</CardTitle>
              <Button variant="outline">
                <RotateCcw className="w-4 h-4 mr-2" />
                Sincronizar Agora
              </Button>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[
                  { name: "Hambúrguer Especial", synced: true, price: "R$ 25,90" },
                  { name: "Pizza Margherita", synced: true, price: "R$ 42,50" },
                  { name: "Salada Caesar", synced: false, price: "R$ 18,90" },
                  { name: "Batata Frita Especial", synced: true, price: "R$ 12,50" },
                ].map((item, index) => (
                  <div key={index} className="flex items-center justify-between p-3 border border-border rounded-lg">
                    <div className="flex items-center space-x-3">
                      <div className={`w-3 h-3 rounded-full ${
                        item.synced ? "bg-success" : "bg-muted-foreground"
                      }`} />
                      <div>
                        <p className="font-medium">{item.name}</p>
                        <p className="text-sm text-muted-foreground">{item.price}</p>
                      </div>
                    </div>
                    <Badge variant={item.synced ? "secondary" : "outline"}>
                      {item.synced ? "Sincronizado" : "Não sincronizado"}
                    </Badge>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="orders" className="space-y-6">
          <Card className="shadow-card">
            <CardHeader>
              <CardTitle>Pedidos iFood Recentes</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[
                  {
                    id: "#IF12345",
                    customer: "Cliente iFood",
                    items: "2x Hambúrguer Especial",
                    value: "R$ 51,80",
                    status: "preparing",
                    time: "há 5 min",
                  },
                  {
                    id: "#IF12346",
                    customer: "Cliente iFood",
                    items: "1x Pizza Margherita",
                    value: "R$ 42,50",
                    status: "ready",
                    time: "há 12 min",
                  },
                  {
                    id: "#IF12347",
                    customer: "Cliente iFood",
                    items: "1x Salada Caesar, 1x Batata",
                    value: "R$ 31,40",
                    status: "delivered",
                    time: "há 25 min",
                  },
                ].map((order) => (
                  <div
                    key={order.id}
                    className="flex items-center justify-between p-4 border border-border rounded-lg hover:bg-muted/50 transition-colors"
                  >
                    <div className="flex items-center space-x-4">
                      <div className="flex items-center justify-center w-10 h-10 rounded-full bg-gradient-secondary">
                        <span className="text-white font-semibold text-sm">iF</span>
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
        </TabsContent>
      </Tabs>
    </div>
  );
}