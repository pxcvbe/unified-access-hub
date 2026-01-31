import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Calendar, Users, AlertTriangle, Activity } from "lucide-react";
import { cn } from "@/lib/utils";

interface KandangCardProps {
  id: string;
  nama: string;
  jenis: string;
  umur: string;
  populasi: number;
  kapasitas: number;
  status: "Sehat" | "Sakit" | "Periksa";
  onLaporMati?: () => void;
  onUbahStatus?: () => void;
}

export function KandangCard({
  id,
  nama,
  jenis,
  umur,
  populasi,
  kapasitas,
  status,
  onLaporMati,
  onUbahStatus,
}: KandangCardProps) {
  const populasiPercentage = (populasi / kapasitas) * 100;
  
  const statusVariant = {
    Sehat: "bg-peternak/10 text-peternak border-peternak/20",
    Sakit: "bg-destructive/10 text-destructive border-destructive/20",
    Periksa: "bg-amber-100 text-amber-700 border-amber-200",
  };

  const progressColor = {
    Sehat: "bg-peternak",
    Sakit: "bg-destructive",
    Periksa: "bg-amber-500",
  };

  return (
    <Card className="overflow-hidden">
      <CardContent className="p-5">
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-muted font-bold text-foreground">
              {id}
            </div>
            <div>
              <h3 className="font-semibold text-foreground">{nama}</h3>
              <p className="text-sm text-muted-foreground">{jenis}</p>
            </div>
          </div>
          <Badge 
            variant="outline" 
            className={cn("font-medium", statusVariant[status])}
          >
            {status}
          </Badge>
        </div>

        <div className="space-y-3 mb-4">
          <div className="flex items-center justify-between text-sm">
            <span className="flex items-center gap-2 text-muted-foreground">
              <Calendar className="h-4 w-4" />
              Umur
            </span>
            <span className="font-medium">{umur}</span>
          </div>
          <div className="flex items-center justify-between text-sm">
            <span className="flex items-center gap-2 text-muted-foreground">
              <Users className="h-4 w-4" />
              Populasi
            </span>
            <span className="font-medium">
              {populasi.toLocaleString("id-ID")} / {kapasitas.toLocaleString("id-ID")}
            </span>
          </div>
          <div className="w-full">
            <div className="h-2 w-full rounded-full bg-muted overflow-hidden">
              <div 
                className={cn("h-full rounded-full transition-all", progressColor[status])}
                style={{ width: `${Math.min(populasiPercentage, 100)}%` }}
              />
            </div>
          </div>
        </div>

        <div className="flex gap-2">
          <Button 
            variant="outline" 
            size="sm" 
            className="flex-1 text-destructive border-destructive/30 hover:bg-destructive/10 hover:text-destructive"
            onClick={onLaporMati}
          >
            <AlertTriangle className="h-4 w-4 mr-1" />
            Lapor Mati
          </Button>
          <Button 
            variant="outline" 
            size="sm" 
            className="flex-1"
            onClick={onUbahStatus}
          >
            <Activity className="h-4 w-4 mr-1" />
            Status
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
