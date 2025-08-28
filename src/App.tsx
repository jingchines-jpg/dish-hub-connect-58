import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Layout } from "./components/layout/layout";
import Dashboard from "./pages/dashboard";
import Menu from "./pages/menu";
import IFood from "./pages/ifood";
import PublicMenu from "./pages/public-menu";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout><Dashboard /></Layout>} />
          <Route path="/menu" element={<Layout><Menu /></Layout>} />
          <Route path="/ifood" element={<Layout><IFood /></Layout>} />
          <Route path="/cardapio" element={<PublicMenu />} />
          <Route path="/orders" element={<Layout><div className="p-6"><h1 className="text-3xl font-bold">Pedidos</h1><p className="text-muted-foreground">Em desenvolvimento...</p></div></Layout>} />
          <Route path="/deliveries" element={<Layout><div className="p-6"><h1 className="text-3xl font-bold">Entregas</h1><p className="text-muted-foreground">Em desenvolvimento...</p></div></Layout>} />
          <Route path="/staff" element={<Layout><div className="p-6"><h1 className="text-3xl font-bold">Funcionários</h1><p className="text-muted-foreground">Em desenvolvimento...</p></div></Layout>} />
          <Route path="/reports" element={<Layout><div className="p-6"><h1 className="text-3xl font-bold">Relatórios</h1><p className="text-muted-foreground">Em desenvolvimento...</p></div></Layout>} />
          <Route path="/settings" element={<Layout><div className="p-6"><h1 className="text-3xl font-bold">Configurações</h1><p className="text-muted-foreground">Em desenvolvimento...</p></div></Layout>} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
