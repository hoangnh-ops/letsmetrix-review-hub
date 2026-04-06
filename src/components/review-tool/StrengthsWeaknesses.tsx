import { TrendingUp } from "lucide-react";
import { strengths, weaknesses } from "@/data/mockData";

export default function StrengthsWeaknesses() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 animate-fade-in-up">
      {/* Strengths */}
      <div className="bg-card rounded-lg border overflow-hidden">
        <div className="bg-lmx-success/10 border-b border-lmx-success/20 px-4 py-2.5 flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-lmx-success" />
          <span className="text-sm font-semibold text-foreground">Strengths</span>
          <span className="text-xs text-muted-foreground ml-auto">{strengths.length} clusters</span>
        </div>
        <div className="p-4 space-y-3">
          {strengths.map((item, i) => (
            <div key={i}>
              <div className="flex items-start justify-between">
                <div className="min-w-0 flex-1">
                  <p className="text-sm font-medium text-foreground">{item.title}</p>
                  <p className="text-xs text-muted-foreground italic mt-0.5">"{item.quote}"</p>
                </div>
                <span className="text-xs font-semibold text-lmx-success ml-2 whitespace-nowrap">{item.count} mentions</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Weaknesses */}
      <div className="bg-card rounded-lg border overflow-hidden">
        <div className="bg-lmx-danger/10 border-b border-lmx-danger/20 px-4 py-2.5 flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-lmx-danger" />
          <span className="text-sm font-semibold text-foreground">Weaknesses</span>
          <span className="text-xs text-muted-foreground ml-auto">{weaknesses.length} clusters</span>
        </div>
        <div className="p-4 space-y-3">
          {weaknesses.map((item, i) => (
            <div key={i}>
              <div className="flex items-start justify-between">
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-2">
                    <p className="text-sm font-medium text-foreground">{item.title}</p>
                    {item.isSpike && (
                      <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-lmx-warning text-primary-foreground flex items-center gap-0.5">
                        <TrendingUp className="w-2.5 h-2.5" /> SPIKE ↑{item.spikePct}%
                      </span>
                    )}
                  </div>
                </div>
                <span className="text-xs font-semibold text-lmx-danger ml-2 whitespace-nowrap">{item.count} mentions</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
