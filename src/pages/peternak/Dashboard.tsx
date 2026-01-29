import { Beef, BarChart3, Wallet, Package, AlertTriangle, Calendar } from "lucide-react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { PageHeader } from "@/components/PageHeader";
import { StatCard } from "@/components/StatCard";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import {
  statsPeternak,
  produksiMingguan,
  ternakData,
  notifikasiPeternak,
} from "@/data/mockData";

export default function PeternakDashboard() {
  return (
    <div className="space-y-6">
      <PageHeader
        title="Dashboard Peternak"
        description="Selamat datang kembali! Berikut ringkasan peternakan Anda."
      />

      {/* Stats Grid */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <StatCard
          title="Total Ternak"
          value={statsPeternak.totalTernak}
          icon={Beef}
          description="7 sapi, 2 kambing"
          variant="peternak"
        />
        <StatCard
          title="Produksi Hari Ini"
          value={statsPeternak.produksiHariIni}
          icon={BarChart3}
          trend={{ value: 5.2, isPositive: true }}
          variant="peternak"
        />
        <StatCard
          title="Pendapatan Bulan Ini"
          value={statsPeternak.pendapatanBulan}
          icon={Wallet}
          trend={{ value: 12, isPositive: true }}
          variant="peternak"
        />
        <StatCard
          title="Stok Pakan"
          value={statsPeternak.stokPakan}
          icon={Package}
          description="4 jenis pakan tersedia"
          variant="peternak"
        />
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Production Chart */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Grafik Produksi Mingguan</CardTitle>
            <CardDescription>Produksi susu dalam liter per hari</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={produksiMingguan}>
                  <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                  <XAxis dataKey="hari" className="text-xs" />
                  <YAxis className="text-xs" />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "hsl(var(--card))",
                      border: "1px solid hsl(var(--border))",
                      borderRadius: "8px",
                    }}
                  />
                  <Line
                    type="monotone"
                    dataKey="susu"
                    stroke="hsl(var(--peternak))"
                    strokeWidth={2}
                    dot={{ fill: "hsl(var(--peternak))" }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* Notifications */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <AlertTriangle className="h-5 w-5 text-amber-500" />
              Notifikasi
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {notifikasiPeternak.map((notif) => (
              <div
                key={notif.id}
                className="flex items-start gap-3 p-3 rounded-lg bg-muted/50"
              >
                <div className="h-2 w-2 mt-2 rounded-full bg-primary shrink-0" />
                <div className="flex-1 min-w-0">
                  <p className="font-medium text-sm">{notif.judul}</p>
                  <p className="text-xs text-muted-foreground line-clamp-2">
                    {notif.pesan}
                  </p>
                  <p className="text-xs text-muted-foreground mt-1">
                    {notif.waktu}
                  </p>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>

      {/* Livestock Table */}
      <Card>
        <CardHeader>
          <CardTitle>Daftar Ternak</CardTitle>
          <CardDescription>Status kesehatan dan produksi ternak Anda</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Nama</TableHead>
                <TableHead>Jenis</TableHead>
                <TableHead>Umur</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Produksi Harian</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {ternakData.slice(0, 5).map((ternak) => (
                <TableRow key={ternak.id}>
                  <TableCell className="font-medium">{ternak.nama}</TableCell>
                  <TableCell>{ternak.jenis}</TableCell>
                  <TableCell>{ternak.umur}</TableCell>
                  <TableCell>
                    <Badge
                      variant={ternak.status === "Sehat" ? "default" : "destructive"}
                      className={
                        ternak.status === "Sehat"
                          ? "bg-green-100 text-green-700 hover:bg-green-100"
                          : ""
                      }
                    >
                      {ternak.status}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right">{ternak.produksiHarian}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
