import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";

const publicMenuItems = [
  {
    id: 1,
    name: "Hambúrguer Especial",
    category: "Lanches",
    price: 25.90,
    description: "Hambúrguer artesanal com queijo, bacon e molho especial da casa",
    image: "🍔",
    available: true,
  },
  {
    id: 2,
    name: "Pizza Margherita",
    category: "Pizzas", 
    price: 42.50,
    description: "Molho de tomate artesanal, mozzarella de búfala e manjericão fresco",
    image: "🍕",
    available: true,
  },
  {
    id: 4,
    name: "Batata Frita Especial",
    category: "Acompanhamentos",
    price: 12.50,
    description: "Batatas crocantes com tempero especial da casa e maionese artesanal",
    image: "🍟",
    available: true,
  },
  {
    id: 5,
    name: "Refrigerante Lata",
    category: "Bebidas",
    price: 6.50,
    description: "Coca-Cola, Pepsi, Guaraná ou Fanta - 350ml",
    image: "🥤",
    available: true,
  },
  {
    id: 6,
    name: "Suco Natural",
    category: "Bebidas",
    price: 8.90,
    description: "Laranja, acerola, maracujá ou abacaxi - 400ml",
    image: "🧃",
    available: true,
  },
];

const categories = ["Lanches", "Pizzas", "Acompanhamentos", "Bebidas"];

export default function PublicMenu() {
  const groupedItems = categories.reduce((acc, category) => {
    acc[category] = publicMenuItems.filter(item => item.category === category);
    return acc;
  }, {} as Record<string, typeof publicMenuItems>);

  return (
    <div className="min-h-screen bg-gradient-card">
      {/* Header */}
      <div className="bg-gradient-hero text-white sticky top-0 z-50 shadow-lg">
        <div className="max-w-4xl mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-white/20 rounded-lg flex items-center justify-center">
                <span className="text-2xl">🍽️</span>
              </div>
              <div>
                <h1 className="text-2xl font-bold">Restaurante Demo</h1>
                <p className="text-white/80 text-sm">Cardápio Digital</p>
              </div>
            </div>
            <Link to="/menu">
              <Button variant="outline" size="sm" className="text-white border-white/30 hover:bg-white/10">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Admin
              </Button>
            </Link>
          </div>
        </div>
      </div>

      {/* Menu Content */}
      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-foreground mb-2">Nosso Cardápio</h2>
          <p className="text-muted-foreground">
            Pratos frescos preparados com ingredientes selecionados
          </p>
        </div>

        {/* Categories */}
        <div className="space-y-8">
          {categories.map((category) => {
            const items = groupedItems[category];
            if (!items || items.length === 0) return null;

            return (
              <div key={category} className="space-y-4">
                <div className="flex items-center space-x-3">
                  <div className="h-px bg-gradient-hero flex-1"></div>
                  <h3 className="text-2xl font-bold text-foreground px-4">
                    {category}
                  </h3>
                  <div className="h-px bg-gradient-hero flex-1"></div>
                </div>

                <div className="grid gap-4 md:grid-cols-2">
                  {items.map((item) => (
                    <Card
                      key={item.id}
                      className="shadow-card hover:shadow-primary transition-all duration-300 overflow-hidden"
                    >
                      <CardContent className="p-6">
                        <div className="flex items-start justify-between mb-3">
                          <div className="flex items-center space-x-3">
                            <div className="text-3xl">{item.image}</div>
                            <div className="flex-1">
                              <h4 className="font-bold text-lg text-foreground">
                                {item.name}
                              </h4>
                              {!item.available && (
                                <Badge variant="outline" className="mt-1">
                                  Indisponível
                                </Badge>
                              )}
                            </div>
                          </div>
                          <div className="text-right">
                            <div className="text-2xl font-bold text-primary">
                              R$ {item.price.toFixed(2)}
                            </div>
                          </div>
                        </div>
                        <p className="text-muted-foreground text-sm leading-relaxed">
                          {item.description}
                        </p>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            );
          })}
        </div>

        {/* Footer */}
        <div className="mt-12 text-center py-8 border-t border-border">
          <div className="space-y-2">
            <h4 className="font-semibold text-foreground">Entre em contato</h4>
            <p className="text-muted-foreground text-sm">
              📞 (11) 9999-9999 | 📍 Rua das Delícias, 123 - São Paulo
            </p>
            <p className="text-muted-foreground text-sm">
              🕒 Funcionamento: Seg-Dom 11h às 23h
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}