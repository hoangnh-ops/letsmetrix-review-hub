import { TrendingUp } from "lucide-react";
import { strengths, weaknesses } from "@/data/mockData";

export default function StrengthsWeaknesses() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 animate-fade-in-up">
      {/* Strengths */}
      <div className="bg-card rounded-lg border overflow-hidden">
        <div className="bg-lmx-success/10 border-b border-lmx-success/20 px-4 py-2.5 flex items-center gap-2">
          <span className="text-sm font-bold text-lmx-success">Strengths</span>
          <span className="text-[10px] font-medium text-muted-foreground bg-secondary px-2 py-0.5 rounded-full">{strengths.length} clusters</span>
        </div>
        <div className="divide-y">
          {strengths.map((item, i) => (
            <div key={i} className="px-4 py-3">
              <div className="flex items-start justify-between gap-2">
                <div className="min-w-0 flex-1">
                  <p className="text-sm font-semibold text-foreground">{item.title}</p>
                  <p className="text-xs text-muted-foreground mt-1 leading-relaxed">{item.quote}</p>
                </div>
                <span className="text-sm font-bold text-lmx-success flex-shrink-0">{item.count}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Weaknesses */}
      <div className="bg-card rounded-lg border overflow-hidden">
        <div className="bg-lmx-danger/10 border-b border-lmx-danger/20 px-4 py-2.5 flex items-center gap-2">
          <span className="text-sm font-bold text-lmx-danger">Weaknesses</span>
          <span className="text-[10px] font-medium text-muted-foreground bg-secondary px-2 py-0.5 rounded-full">{weaknesses.length} clusters</span>
        </div>
        <div className="divide-y">
          {weaknesses.map((item, i) => (
            <div key={i} className="px-4 py-3">
              <div className="flex items-start justify-between gap-2">
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-2 flex-wrap">
                    <p className="text-sm font-semibold text-foreground">{item.title}</p>
                    {item.isSpike && (
                      <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-lmx-warning text-primary-foreground flex items-center gap-0.5 whitespace-nowrap">
                        <TrendingUp className="w-2.5 h-2.5" /> SPIKE +{item.spikePct}%
                      </span>
                    )}
                  </div>
                </div>
                <span className="text-sm font-bold text-lmx-danger flex-shrink-0">{item.count}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
