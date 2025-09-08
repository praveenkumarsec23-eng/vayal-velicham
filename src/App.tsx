import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { LanguageProvider } from "@/contexts/LanguageContext";
import { Layout } from "@/components/Layout";
import Dashboard from "./pages/Dashboard";
import Query from "./pages/Query";
import Knowledge from "./pages/Knowledge";
import Escalation from "./pages/Escalation";
import Analytics from "./pages/Analytics";
import Profile from "./pages/Profile";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <LanguageProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Layout />}>
              <Route index element={<Dashboard />} />
              <Route path="query" element={<Query />} />
              <Route path="knowledge" element={<Knowledge />} />
              <Route path="escalation" element={<Escalation />} />
              <Route path="analytics" element={<Analytics />} />
              <Route path="profile" element={<Profile />} />
            </Route>
            {/* 404 route outside layout */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </LanguageProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
