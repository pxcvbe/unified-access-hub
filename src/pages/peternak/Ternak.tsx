import { Plus, Search } from "lucide-react";
import { PageHeader } from "@/components/PageHeader";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { ternakData } from "@/data/mockData";

export default function TernakPage() {
  return (
    <div className="space-y-6">
      <PageHeader
        title="Ternak Saya"
        description="Kelola data ternak Anda"
        breadcrumbs={[
          { label: "Dashboard", href: "/peternak" },
          { label: "Ternak Saya" },
        ]}
        actions={
          <Button className="gradient-peternak text-white">
            <Plus className="h-4 w-4 mr-2" />
            Tambah Ternak
          </Button>
        }
      />

      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>Daftar Ternak</CardTitle>
            <div className="relative w-64">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input placeholder="Cari ternak..." className="pl-9" />
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>ID</TableHead>
                <TableHead>Nama</TableHead>
                <TableHead>Jenis</TableHead>
                <TableHead>Umur</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Produksi Harian</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {ternakData.map((ternak) => (
                <TableRow key={ternak.id}>
                  <TableCell className="text-muted-foreground">#{ternak.id}</TableCell>
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
