import { ShoppingCart, Wallet, Target, Users } from "lucide-react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from "recharts";
import { PageHeader } from "@/components/PageHeader";
import { StatCard } from "@/components/StatCard";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import {
  statsAgent,
  penjualanBulanan,
  pesananAgent,
  peternakBinaan,
  formatRupiah,
} from "@/data/mockData";

export default function AgentDashboard() {
  return (
    <div className="space-y-6">
      <PageHeader
        title="Dashboard Agent"
        description="Pantau kinerja penjualan dan peternak binaan Anda."
      />

      {/* Stats Grid */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <StatCard
          title="Total Penjualan"
          value={statsAgent.totalPenjualan}
          icon={ShoppingCart}
          trend={{ value: 8, isPositive: false }}
          variant="agent"
        />
        <StatCard
          title="Komisi Bulan Ini"
          value={statsAgent.komisiBulan}
          icon={Wallet}
          description="5% dari total penjualan"
          variant="agent"
        />
        <StatCard
          title="Target Tercapai"
          value={statsAgent.targetBulan}
          icon={Target}
          description="Target: Rp 60.000.000"
          variant="agent"
        />
        <StatCard
          title="Peternak Binaan"
          value={statsAgent.jumlahPeternak}
          icon={Users}
          description="4 aktif, 1 tidak aktif"
          variant="agent"
        />
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Sales Chart */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Grafik Penjualan Bulanan</CardTitle>
            <CardDescription>Perbandingan penjualan vs target</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={penjualanBulanan}>
                  <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                  <XAxis dataKey="bulan" className="text-xs" />
                  <YAxis className="text-xs" tickFormatter={(value) => `${value / 1000000}jt`} />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "hsl(var(--card))",
                      border: "1px solid hsl(var(--border))",
                      borderRadius: "8px",
                    }}
                    formatter={(value: number) => formatRupiah(value)}
                  />
                  <Legend />
                  <Bar dataKey="penjualan" name="Penjualan" fill="hsl(var(--agent))" radius={[4, 4, 0, 0]} />
                  <Bar dataKey="target" name="Target" fill="hsl(var(--muted))" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* Top Farmers */}
        <Card>
          <CardHeader>
            <CardTitle>Peternak Aktif</CardTitle>
            <CardDescription>5 peternak dengan aktivitas terbaru</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {peternakBinaan.slice(0, 5).map((peternak) => (
              <div
                key={peternak.id}
                className="flex items-center justify-between p-3 rounded-lg bg-muted/50"
              >
                <div>
                  <p className="font-medium text-sm">{peternak.nama}</p>
                  <p className="text-xs text-muted-foreground">{peternak.lokasi}</p>
                </div>
                <Badge
                  variant={peternak.status === "Aktif" ? "default" : "secondary"}
                  className={
                    peternak.status === "Aktif"
                      ? "bg-green-100 text-green-700 hover:bg-green-100"
                      : ""
                  }
                >
                  {peternak.status}
                </Badge>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>

      {/* Recent Orders */}
      <Card>
        <CardHeader>
          <CardTitle>Pesanan Terbaru</CardTitle>
          <CardDescription>Daftar pesanan yang perlu ditindaklanjuti</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>ID Pesanan</TableHead>
                <TableHead>Peternak</TableHead>
                <TableHead>Produk</TableHead>
                <TableHead>Qty</TableHead>
                <TableHead>Total</TableHead>
                <TableHead>Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {pesananAgent.map((pesanan) => (
                <TableRow key={pesanan.id}>
                  <TableCell className="font-medium">{pesanan.id}</TableCell>
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
                          : "outline"
                      }
                      className={
                        pesanan.status === "Selesai"
                          ? "bg-green-100 text-green-700 hover:bg-green-100"
                          : pesanan.status === "Dikirim"
                          ? "bg-blue-100 text-blue-700 hover:bg-blue-100"
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
