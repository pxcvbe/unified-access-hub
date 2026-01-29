import { ArrowUpRight, ArrowDownRight } from "lucide-react";
import { PageHeader } from "@/components/PageHeader";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { transaksiPeternak, formatRupiah } from "@/data/mockData";

export default function TransaksiPage() {
  const totalPemasukan = transaksiPeternak
    .filter((t) => t.total > 0)
    .reduce((acc, t) => acc + t.total, 0);

  const totalPengeluaran = transaksiPeternak
    .filter((t) => t.total < 0)
    .reduce((acc, t) => acc + Math.abs(t.total), 0);

  return (
    <div className="space-y-6">
      <PageHeader
        title="Riwayat Transaksi"
        description="Pantau pemasukan dan pengeluaran"
        breadcrumbs={[
          { label: "Dashboard", href: "/peternak" },
          { label: "Transaksi" },
        ]}
      />

      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Total Pemasukan
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-2">
              <ArrowUpRight className="h-5 w-5 text-green-600" />
              <span className="text-2xl font-bold text-green-600">
                {formatRupiah(totalPemasukan)}
              </span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Total Pengeluaran
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-2">
              <ArrowDownRight className="h-5 w-5 text-red-600" />
              <span className="text-2xl font-bold text-red-600">
                {formatRupiah(totalPengeluaran)}
              </span>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Daftar Transaksi</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Tanggal</TableHead>
                <TableHead>Jenis</TableHead>
                <TableHead>Item</TableHead>
                <TableHead>Jumlah</TableHead>
                <TableHead className="text-right">Total</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {transaksiPeternak.map((transaksi) => (
                <TableRow key={transaksi.id}>
                  <TableCell>{transaksi.tanggal}</TableCell>
                  <TableCell>
                    <Badge
                      variant={transaksi.jenis === "Penjualan" ? "default" : "secondary"}
                      className={
                        transaksi.jenis === "Penjualan"
                          ? "bg-green-100 text-green-700 hover:bg-green-100"
                          : "bg-red-100 text-red-700 hover:bg-red-100"
                      }
                    >
                      {transaksi.jenis}
                    </Badge>
                  </TableCell>
                  <TableCell className="font-medium">{transaksi.item}</TableCell>
                  <TableCell>
                    {transaksi.jumlah} {transaksi.satuan}
                  </TableCell>
                  <TableCell
                    className={`text-right font-medium ${
                      transaksi.total > 0 ? "text-green-600" : "text-red-600"
                    }`}
                  >
                    {transaksi.total > 0 ? "+" : ""}
                    {formatRupiah(transaksi.total)}
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
