// KPICard.tsx
"use client";
import { Card, CardContent } from "@/components/ui/card";

export default function KPICard({ label, value, icon, bg, sub }: any) {
  return (
    <Card className="overflow-hidden p-0">
      <CardContent className="p-0">
        <div className={`${bg} flex items-center gap-4 p-5`}>
          <div className="p-3 rounded-xl bg-white/20">{icon}</div>
          <div className="flex-1">
            <p className="text-white/80 text-sm">{label}</p>
            <p className="text-2xl font-semibold text-white">{value}</p>
            <p className="text-white/80 text-xs mt-1">{sub}</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
