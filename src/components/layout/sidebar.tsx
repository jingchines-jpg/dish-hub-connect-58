import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  LayoutDashboard,
  UtensilsCrossed,
  ShoppingCart,
  Settings,
  TrendingUp,
  Users,
  Bell,
  Menu,
  X,
  Truck
} from "lucide-react";

const sidebarItems = [
  {
    title: "Dashboard",
    href: "/",
    icon: LayoutDashboard,
  },
  {
    title: "Cardápio",
    href: "/menu",
    icon: UtensilsCrossed,
  },
  {
    title: "Pedidos",
    href: "/orders",
    icon: ShoppingCart,
  },
  {
    title: "Entregas",
    href: "/deliveries",
    icon: Truck,
  },
  {
    title: "Funcionários",
    href: "/staff",
    icon: Users,
  },
  {
    title: "Relatórios",
    href: "/reports",
    icon: TrendingUp,
  },
  {
    title: "iFood",
    href: "/ifood",
    icon: Bell,
  },
  {
    title: "Configurações",
    href: "/settings",
    icon: Settings,
  },
];

export function Sidebar() {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const location = useLocation();

  return (
    <div
      className={cn(
        "flex flex-col h-screen bg-card border-r border-border transition-all duration-300",
        isCollapsed ? "w-16" : "w-64"
      )}
    >
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-border">
        {!isCollapsed && (
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gradient-hero rounded-lg flex items-center justify-center">
              <UtensilsCrossed className="w-5 h-5 text-white" />
            </div>
            <h1 className="font-bold text-lg bg-gradient-hero bg-clip-text text-transparent">
              RestaurantePro
            </h1>
          </div>
        )}
        <Button
          variant="ghost"
          size="icon"
          onClick={() => setIsCollapsed(!isCollapsed)}
          className="ml-auto"
        >
          {isCollapsed ? <Menu className="w-4 h-4" /> : <X className="w-4 h-4" />}
        </Button>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4 space-y-2">
        {sidebarItems.map((item) => {
          const Icon = item.icon;
          const isActive = location.pathname === item.href;

          return (
            <Link key={item.href} to={item.href}>
              <Button
                variant={isActive ? "default" : "ghost"}
                className={cn(
                  "w-full justify-start transition-all duration-200",
                  isCollapsed ? "px-2" : "px-3",
                  isActive && "shadow-primary"
                )}
              >
                <Icon className="w-4 h-4" />
                {!isCollapsed && <span className="ml-2">{item.title}</span>}
              </Button>
            </Link>
          );
        })}
      </nav>

      {/* Footer */}
      <div className="p-4 border-t border-border">
        <div className={cn(
          "bg-gradient-card rounded-lg p-3 border border-border/50",
          isCollapsed && "hidden"
        )}>
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-hero rounded-full flex items-center justify-center">
              <span className="text-white font-semibold">R</span>
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-foreground truncate">
                Restaurante Demo
              </p>
              <p className="text-xs text-muted-foreground truncate">
                admin@restaurante.com
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}