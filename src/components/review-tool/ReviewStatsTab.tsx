import { AlertTriangle } from "lucide-react";
import { reviewStatusStats } from "@/data/mockData";

const StatCard = ({ label, value, delta, color }: { label: string; value: number; delta?: number; color: string }) => (
  <div className="bg-card rounded-lg border p-4 space-y-1">
    <p className="text-xs text-muted-foreground">{label}</p>
    <p className="text-xl font-bold text-foreground">{value.toLocaleString()}</p>
    {delta !== undefined && (
      <p className={`text-xs font-medium ${color}`}>
        {delta > 0 ? "+" : ""}{delta} this week
      </p>
    )}
  </div>
);

export default function ReviewStatsTab() {
  const d = reviewStatusStats;
  const total = d.active + d.archived + d.deleted;
  const activePct = ((d.active / total) * 100).toFixed(1);
  const archivedPct = ((d.archived / total) * 100).toFixed(1);
  const deletedPct = ((d.deleted / total) * 100).toFixed(1);
  const archivedHigh = d.archived / total > 0.25;

  const maxWeek = Math.max(...d.weeklyTrend.flatMap((w) => [w.active, w.archived, w.deleted]));
  const avgDeleted = d.weeklyTrend.reduce((s, w) => s + w.deleted, 0) / d.weeklyTrend.length;

  return (
    <div className="space-y-5">
      {/* Stat cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        <StatCard label="Total Reviews" value={d.total} color="" />
        <StatCard label="Active" value={d.active} delta={d.activeDelta} color="text-lmx-success" />
        <StatCard label="Archived" value={d.archived} delta={d.archivedDelta} color="text-lmx-warning" />
        <StatCard label="Deleted" value={d.deleted} delta={d.deletedDelta} color="text-lmx-danger" />
      </div>

      {/* Distribution bars */}
      <div className="bg-card rounded-lg border p-4 space-y-3">
        <h4 className="text-sm font-semibold text-foreground">Status Distribution</h4>
        {[
          { label: "Active", value: d.active, pct: activePct, cls: "bg-lmx-success" },
          { label: "Archived", value: d.archived, pct: archivedPct, cls: "bg-lmx-warning" },
          { label: "Deleted", value: d.deleted, pct: deletedPct, cls: "bg-lmx-danger" },
        ].map((bar) => (
          <div key={bar.label} className="space-y-1">
            <div className="flex items-center justify-between text-xs">
              <span className="text-muted-foreground">{bar.label}</span>
              <span className="font-medium text-foreground">{bar.value.toLocaleString()} — {bar.pct}%</span>
            </div>
            <div className="h-3 bg-secondary rounded-full overflow-hidden">
              <div className={`h-full rounded-full ${bar.cls}`} style={{ width: `${bar.pct}%` }} />
            </div>
          </div>
        ))}
        {archivedHigh && (
          <div className="flex items-center gap-2 bg-lmx-warning-bg rounded-md p-2 text-xs text-lmx-warning">
            <AlertTriangle className="w-3.5 h-3.5 flex-shrink-0" />
            High archive rate — analysis data may be skewed
          </div>
        )}
      </div>

      {/* 8-week trend chart */}
      <div className="bg-card rounded-lg border p-4 space-y-3">
        <h4 className="text-sm font-semibold text-foreground">8-Week Trend</h4>
        <div className="flex items-end gap-2 h-32">
          {d.weeklyTrend.map((w) => {
            const isDeletedSpike = w.deleted > avgDeleted * 2;
            return (
              <div key={w.week} className="flex-1 flex flex-col items-center gap-1">
                <div className="flex items-end gap-0.5 h-24 w-full">
                  <div className="flex-1 bg-lmx-success rounded-t" style={{ height: `${(w.active / maxWeek) * 100}%` }} title={`Active: ${w.active}`} />
                  <div className="flex-1 bg-lmx-warning rounded-t" style={{ height: `${(w.archived / maxWeek) * 100}%` }} title={`Archived: ${w.archived}`} />
                  <div className="flex-1 bg-lmx-danger rounded-t" style={{ height: `${(w.deleted / maxWeek) * 100}%` }} title={`Deleted: ${w.deleted}`} />
                </div>
                <div className="flex items-center gap-0.5">
                  <span className="text-[10px] text-muted-foreground">{w.week}</span>
                  {isDeletedSpike && <div className="w-1.5 h-1.5 rounded-full bg-lmx-danger" />}
                </div>
              </div>
            );
          })}
        </div>
        <div className="flex items-center gap-4 text-[10px] text-muted-foreground">
          <span className="flex items-center gap-1"><div className="w-2 h-2 rounded-sm bg-lmx-success" /> Active</span>
          <span className="flex items-center gap-1"><div className="w-2 h-2 rounded-sm bg-lmx-warning" /> Archived</span>
          <span className="flex items-center gap-1"><div className="w-2 h-2 rounded-sm bg-lmx-danger" /> Deleted</span>
        </div>
      </div>

      {/* Transition table */}
      <div className="bg-card rounded-lg border p-4 space-y-3">
        <h4 className="text-sm font-semibold text-foreground">Status Transitions</h4>
        <div className="space-y-2">
          {d.transitions.map((t, i) => (
            <div key={i} className="flex items-center justify-between text-xs py-1.5 border-b last:border-0">
              <span className="text-muted-foreground">{t.from} {t.arrow} {t.to}</span>
              <span className="font-semibold text-foreground">{t.count}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Rating x Status matrix */}
      <div className="bg-card rounded-lg border p-4 space-y-3">
        <h4 className="text-sm font-semibold text-foreground">Rating × Status</h4>
        <div className="overflow-x-auto">
          <table className="w-full text-xs">
            <thead>
              <tr className="border-b">
                <th className="text-left py-2 text-muted-foreground font-medium">Status</th>
                {[1, 2, 3, 4, 5].map((s) => (
                  <th key={s} className="text-right py-2 text-muted-foreground font-medium">{s}★</th>
                ))}
                <th className="text-right py-2 text-muted-foreground font-medium">Total</th>
              </tr>
            </thead>
            <tbody>
              {(["active", "archived", "deleted"] as const).map((status) => {
                const row = d.ratingByStatus[status];
                const rowTotal = row.reduce((s, v) => s + v, 0);
                const activeRate1Star = d.ratingByStatus.active[0] / d.ratingByStatus.active.reduce((s, v) => s + v, 0);
                const statusRate1Star = row[0] / rowTotal;
                const highlight1Star = status === "deleted" && statusRate1Star > activeRate1Star * 3;
                return (
                  <tr key={status} className="border-b last:border-0">
                    <td className="py-2 font-medium text-foreground capitalize">{status}</td>
                    {row.map((v, ci) => (
                      <td key={ci} className={`text-right py-2 ${ci === 0 && highlight1Star ? "bg-lmx-danger-bg text-lmx-danger font-bold" : "text-foreground"}`}>
                        {v}
                      </td>
                    ))}
                    <td className="text-right py-2 font-semibold text-foreground">{rowTotal}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
        {/* Insight */}
        <div className="flex items-start gap-2 bg-lmx-danger-bg rounded-md p-3 text-xs text-lmx-danger">
          <AlertTriangle className="w-3.5 h-3.5 flex-shrink-0 mt-0.5" />
          <p>Notable: the deleted 1-star rate (12.3%) is significantly higher than the active 1-star rate (1.0%). This may indicate a pattern of removing negative reviews.</p>
        </div>
      </div>
    </div>
  );
}
