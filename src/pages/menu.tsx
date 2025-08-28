import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Plus, Search, Edit, Trash2, Eye, EyeOff, QrCode } from "lucide-react";
import { QRCodeGenerator } from "@/components/qr-code-generator";

const menuItems = [
  {
    id: 1,
    name: "Hambúrguer Especial",
    category: "Lanches",
    price: 25.90,
    description: "Hambúrguer artesanal com queijo, bacon e molho especial",
    status: "active",
    ifoodSync: true,
    image: "🍔",
  },
  {
    id: 2,
    name: "Pizza Margherita",
    category: "Pizzas",
    price: 42.50,
    description: "Molho de tomate, mozzarella e manjericão fresco",
    status: "active",
    ifoodSync: true,
    image: "🍕",
  },
  {
    id: 3,
    name: "Salada Caesar",
    category: "Saladas",
    price: 18.90,
    description: "Alface romana, croutons, parmesão e molho caesar",
    status: "inactive",
    ifoodSync: false,
    image: "🥗",
  },
  {
    id: 4,
    name: "Batata Frita Especial",
    category: "Acompanhamentos",
    price: 12.50,
    description: "Batatas crocantes com tempero especial da casa",
    status: "active",
    ifoodSync: true,
    image: "🍟",
  },
];

export default function Menu() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [showQRGenerator, setShowQRGenerator] = useState(false);

  const categories = ["all", "Lanches", "Pizzas", "Saladas", "Acompanhamentos"];

  const filteredItems = menuItems.filter((item) => {
    const matchesSearch = item.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === "all" || item.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Cardápio</h1>
          <p className="text-muted-foreground">
            Gerencie os pratos do seu restaurante
          </p>
        </div>
        <div className="flex items-center space-x-3">
          <Button variant="outline" onClick={() => setShowQRGenerator(true)}>
            <QrCode className="w-4 h-4 mr-2" />
            QR Code do Cardápio
          </Button>
          <Button variant="hero" size="lg">
            <Plus className="w-4 h-4 mr-2" />
            Novo Prato
          </Button>
        </div>
      </div>

      {/* Filters */}
      <div className="flex items-center space-x-4">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input
            placeholder="Buscar pratos..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
        <Select value={selectedCategory} onValueChange={setSelectedCategory}>
          <SelectTrigger className="w-48">
            <SelectValue placeholder="Categoria" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Todas as categorias</SelectItem>
            {categories.slice(1).map((category) => (
              <SelectItem key={category} value={category}>
                {category}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Menu Grid */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {filteredItems.map((item) => (
          <Card
            key={item.id}
            className="shadow-card hover:shadow-primary transition-all duration-300"
          >
            <CardHeader className="pb-3">
              <div className="flex items-start justify-between">
                <div className="flex items-center space-x-3">
                  <div className="text-3xl">{item.image}</div>
                  <div>
                    <CardTitle className="text-lg leading-tight">
                      {item.name}
                    </CardTitle>
                    <Badge variant="outline" className="text-xs mt-1">
                      {item.category}
                    </Badge>
                  </div>
                </div>
                <div className="flex items-center space-x-1">
                  {item.status === "active" ? (
                    <Eye className="w-4 h-4 text-success" />
                  ) : (
                    <EyeOff className="w-4 h-4 text-muted-foreground" />
                  )}
                  {item.ifoodSync && (
                    <Badge variant="secondary" className="text-xs">
                      iFood
                    </Badge>
                  )}
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-sm text-muted-foreground line-clamp-2">
                {item.description}
              </p>
              <div className="flex items-center justify-between">
                <span className="text-2xl font-bold text-primary">
                  R$ {item.price.toFixed(2)}
                </span>
                <div className="flex items-center space-x-2">
                  <Button variant="ghost" size="icon">
                    <Edit className="w-4 h-4" />
                  </Button>
                  <Button variant="ghost" size="icon">
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Empty State */}
      {filteredItems.length === 0 && (
        <div className="text-center py-12">
          <div className="text-6xl mb-4">🍽️</div>
          <h3 className="text-lg font-semibold mb-2">Nenhum prato encontrado</h3>
          <p className="text-muted-foreground mb-4">
            Tente ajustar os filtros ou adicione novos pratos ao cardápio
          </p>
          <Button variant="hero">
            <Plus className="w-4 h-4 mr-2" />
            Adicionar Primeiro Prato
          </Button>
        </div>
      )}

      {/* QR Code Generator Modal */}
      <QRCodeGenerator 
        open={showQRGenerator} 
        onOpenChange={setShowQRGenerator} 
      />
    </div>
  );
}