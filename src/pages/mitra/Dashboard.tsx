import { Package, ClipboardList, Wallet, Users } from "lucide-react";
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from "recharts";
import { PageHeader } from "@/components/PageHeader";
import { StatCard } from "@/components/StatCard";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import {
  statsMitra,
  topProducts,
  inventoryPakan,
  pesananMitra,
  formatRupiah,
} from "@/data/mockData";

const COLORS = ["hsl(38, 90%, 50%)", "hsl(38, 80%, 55%)", "hsl(38, 70%, 60%)", "hsl(38, 60%, 65%)", "hsl(38, 50%, 70%)"];

export default function MitraDashboard() {
  return (
    <div className="space-y-6">
      <PageHeader
        title="Dashboard Mitra Pakan"
        description="Kelola inventory dan pesanan pakan ternak."
      />

      {/* Stats Grid */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <StatCard
          title="Total Produk"
          value={statsMitra.totalProduk}
          icon={Package}
          description="6 kategori tersedia"
          variant="mitra"
        />
        <StatCard
          title="Pesanan Pending"
          value={statsMitra.pesananPending}
          icon={ClipboardList}
          description="Perlu ditindaklanjuti"
          variant="mitra"
        />
        <StatCard
          title="Revenue Bulan Ini"
          value={statsMitra.revenueBulan}
          icon={Wallet}
          trend={{ value: 15, isPositive: true }}
          variant="mitra"
        />
        <StatCard
          title="Mitra Aktif"
          value={statsMitra.mitraAktif}
          icon={Users}
          description="2 agent, 1 peternak, 1 koperasi"
          variant="mitra"
        />
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Top Products Chart */}
        <Card>
          <CardHeader>
            <CardTitle>Produk Terlaris</CardTitle>
            <CardDescription>Distribusi penjualan per produk</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[280px]">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={topProducts}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={90}
                    paddingAngle={2}
                    dataKey="value"
                  >
                    {topProducts.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* Inventory Summary */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Ringkasan Inventory</CardTitle>
            <CardDescription>Stok produk dengan status</CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Produk</TableHead>
                  <TableHead>Kategori</TableHead>
                  <TableHead>Stok</TableHead>
                  <TableHead>Harga</TableHead>
                  <TableHead>Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {inventoryPakan.slice(0, 4).map((item) => {
                  const isLow = item.stok < item.minStok * 1.5;
                  return (
                    <TableRow key={item.id}>
                      <TableCell className="font-medium">{item.nama}</TableCell>
                      <TableCell>{item.kategori}</TableCell>
                      <TableCell>
                        {item.stok} {item.satuan}
                      </TableCell>
                      <TableCell>{formatRupiah(item.harga)}/{item.satuan}</TableCell>
                      <TableCell>
                        <Badge
                          variant={isLow ? "destructive" : "default"}
                          className={!isLow ? "bg-green-100 text-green-700 hover:bg-green-100" : ""}
                        >
                          {isLow ? "Stok Rendah" : "Tersedia"}
                        </Badge>
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>

      {/* Recent Orders */}
      <Card>
        <CardHeader>
          <CardTitle>Pesanan Terbaru</CardTitle>
          <CardDescription>Pesanan masuk dari agent dan peternak</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>ID Pesanan</TableHead>
                <TableHead>Agent</TableHead>
                <TableHead>Peternak</TableHead>
                <TableHead>Produk</TableHead>
                <TableHead>Qty</TableHead>
                <TableHead>Total</TableHead>
                <TableHead>Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {pesananMitra.slice(0, 5).map((pesanan) => (
                <TableRow key={pesanan.id}>
                  <TableCell className="font-medium">{pesanan.id}</TableCell>
                  <TableCell>{pesanan.agent}</TableCell>
                  <TableCell>{pesanan.peternak}</TableCell>
                  <TableCell>{pesanan.produk}</TableCell>
                  <TableCell>{pesanan.qty}</TableCell>
                  <TableCell>{formatRupiah(pesanan.total)}</TableCell>
                  <TableCell>
                    <Badge
                      variant={
                        pesanan.status === "Selesai"
                          ? "default"
                          : pesanan.status === "Dikirim"
                          ? "secondary"
                          : pesanan.status === "Diproses"
                          ? "outline"
                          : "outline"
                      }
                      className={
                        pesanan.status === "Selesai"
                          ? "bg-green-100 text-green-700 hover:bg-green-100"
                          : pesanan.status === "Dikirim"
                          ? "bg-blue-100 text-blue-700 hover:bg-blue-100"
                          : pesanan.status === "Diproses"
                          ? "bg-purple-100 text-purple-700 hover:bg-purple-100"
                          : "bg-amber-100 text-amber-700 hover:bg-amber-100"
                      }
                    >
                      {pesanan.status}
                    </Badge>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
