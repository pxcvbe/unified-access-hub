import { Card, CardContent } from "@/components/ui/card";
import { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

interface StatCardProps {
  title: string;
  value: string | number;
  icon: LucideIcon;
  description?: string;
  trend?: {
    value: number;
    isPositive: boolean;
  };
  variant?: "default" | "peternak" | "agent" | "mitra";
}

export function StatCard({
  title,
  value,
  icon: Icon,
  description,
  trend,
  variant = "default",
}: StatCardProps) {
  const variantStyles = {
    default: "bg-primary/10 text-primary",
    peternak: "bg-peternak/10 text-peternak",
    agent: "bg-agent/10 text-agent",
    mitra: "bg-mitra/10 text-mitra",
  };

  return (
    <Card className="overflow-hidden">
      <CardContent className="p-6">
        <div className="flex items-start justify-between">
          <div className="space-y-2">
            <p className="text-sm font-medium text-muted-foreground">{title}</p>
            <p className="text-2xl font-bold tracking-tight">{value}</p>
            {description && (
              <p className="text-xs text-muted-foreground">{description}</p>
            )}
            {trend && (
              <p
                className={cn(
                  "text-xs font-medium",
                  trend.isPositive ? "text-green-600" : "text-red-600"
                )}
              >
                {trend.isPositive ? "↑" : "↓"} {Math.abs(trend.value)}% dari bulan lalu
              </p>
            )}
          </div>
          <div
            className={cn(
              "rounded-xl p-3",
              variantStyles[variant]
            )}
          >
            <Icon className="h-6 w-6" />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
