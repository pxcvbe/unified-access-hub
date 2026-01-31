import { Card, CardContent } from "@/components/ui/card";
import { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

interface StatCardLargeProps {
  label: string;
  value: string | number;
  unit?: string;
  icon: LucideIcon;
  iconColor?: string;
  iconBgColor?: string;
  description?: string;
  descriptionColor?: "default" | "success" | "warning" | "danger";
}

export function StatCardLarge({
  label,
  value,
  unit,
  icon: Icon,
  iconColor = "text-peternak",
  iconBgColor = "bg-peternak/10",
  description,
  descriptionColor = "default",
}: StatCardLargeProps) {
  const descColors = {
    default: "text-muted-foreground",
    success: "text-peternak",
    warning: "text-amber-600",
    danger: "text-destructive",
  };

  return (
    <Card>
      <CardContent className="p-6">
        <div className="flex items-start justify-between">
          <div className="space-y-1">
            <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
              {label}
            </p>
            <div className="flex items-baseline gap-1">
              <span className="text-3xl font-bold tracking-tight text-foreground">
                {typeof value === "number" ? value.toLocaleString("id-ID") : value}
              </span>
              {unit && (
                <span className="text-lg text-muted-foreground">{unit}</span>
              )}
            </div>
            {description && (
              <p className={cn("text-sm", descColors[descriptionColor])}>
                {description}
              </p>
            )}
          </div>
          <div className={cn("rounded-xl p-3", iconBgColor)}>
            <Icon className={cn("h-6 w-6", iconColor)} />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
