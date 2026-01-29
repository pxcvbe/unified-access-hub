import { Plus, Search } from "lucide-react";
import { PageHeader } from "@/components/PageHeader";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { pesananAgent, formatRupiah } from "@/data/mockData";

export default function PesananPage() {
  return (
    <div className="space-y-6">
      <PageHeader
        title="Manajemen Pesanan"
        description="Kelola pesanan dari peternak binaan"
        breadcrumbs={[
          { label: "Dashboard", href: "/agent" },
          { label: "Pesanan" },
        ]}
        actions={
          <Button className="gradient-agent text-white">
            <Plus className="h-4 w-4 mr-2" />
            Buat Pesanan
          </Button>
        }
      />

      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>Daftar Pesanan</CardTitle>
            <div className="relative w-64">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input placeholder="Cari pesanan..." className="pl-9" />
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>ID Pesanan</TableHead>
                <TableHead>Tanggal</TableHead>
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
                  <TableCell>{pesanan.tanggal}</TableCell>
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
