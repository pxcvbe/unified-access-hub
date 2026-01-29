import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { DashboardLayout } from "@/components/DashboardLayout";

// Pages
import Login from "./pages/Login";
import NotFound from "./pages/NotFound";

// Peternak Pages
import PeternakDashboard from "./pages/peternak/Dashboard";
import TernakPage from "./pages/peternak/Ternak";
import ProduksiPage from "./pages/peternak/Produksi";
import PakanPage from "./pages/peternak/Pakan";
import TransaksiPage from "./pages/peternak/Transaksi";

// Agent Pages
import AgentDashboard from "./pages/agent/Dashboard";
import PenjualanPage from "./pages/agent/Penjualan";
import PeternakBinaanPage from "./pages/agent/PeternakBinaan";
import PesananAgentPage from "./pages/agent/Pesanan";
import LaporanAgentPage from "./pages/agent/Laporan";

// Mitra Pages
import MitraDashboard from "./pages/mitra/Dashboard";
import InventoryPage from "./pages/mitra/Inventory";
import PesananMasukPage from "./pages/mitra/PesananMasuk";
import DaftarMitraPage from "./pages/mitra/DaftarMitra";
import LaporanMitraPage from "./pages/mitra/Laporan";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          {/* Redirect root to login */}
          <Route path="/" element={<Navigate to="/login" replace />} />
          <Route path="/login" element={<Login />} />

          {/* Peternak Routes */}
          <Route path="/peternak" element={<DashboardLayout />}>
            <Route index element={<PeternakDashboard />} />
            <Route path="ternak" element={<TernakPage />} />
            <Route path="produksi" element={<ProduksiPage />} />
            <Route path="pakan" element={<PakanPage />} />
            <Route path="transaksi" element={<TransaksiPage />} />
          </Route>

          {/* Agent Routes */}
          <Route path="/agent" element={<DashboardLayout />}>
            <Route index element={<AgentDashboard />} />
            <Route path="penjualan" element={<PenjualanPage />} />
            <Route path="peternak" element={<PeternakBinaanPage />} />
            <Route path="pesanan" element={<PesananAgentPage />} />
            <Route path="laporan" element={<LaporanAgentPage />} />
          </Route>

          {/* Mitra Pakan Routes */}
          <Route path="/mitra" element={<DashboardLayout />}>
            <Route index element={<MitraDashboard />} />
            <Route path="inventory" element={<InventoryPage />} />
            <Route path="pesanan" element={<PesananMasukPage />} />
            <Route path="daftar-mitra" element={<DaftarMitraPage />} />
            <Route path="laporan" element={<LaporanMitraPage />} />
          </Route>

          {/* Catch-all 404 */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
