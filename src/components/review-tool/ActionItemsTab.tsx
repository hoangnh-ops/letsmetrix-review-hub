import { Lock, TrendingUp } from "lucide-react";
import { actionItems } from "@/data/mockData";

const PriorityBadge = ({ priority }: { priority: "P0" | "P1" | "P2" }) => {
  const colors = { P0: "bg-lmx-danger", P1: "bg-lmx-warning", P2: "bg-lmx-success" };
  return (
    <span className={`w-7 h-7 rounded-full ${colors[priority]} text-primary-foreground text-[10px] font-bold flex items-center justify-center flex-shrink-0`}>
      {priority}
    </span>
  );
};

export default function ActionItemsTab() {
  const p0Items = actionItems.filter((a) => a.priority === "P0");
  const otherItems = actionItems.filter((a) => a.priority !== "P0");

  return (
    <div className="space-y-3">
      {p0Items.map((item, i) => (
        <div key={i} className="bg-card rounded-lg border p-4">
          <div className="flex items-start gap-3">
            <PriorityBadge priority={item.priority} />
            <div className="min-w-0 flex-1 space-y-1">
              <h4 className="text-sm font-semibold text-foreground">{item.title}</h4>
              <p className="text-xs text-muted-foreground">{item.description}</p>
              <div className="flex items-center gap-1 text-xs text-lmx-success font-medium">
                <TrendingUp className="w-3 h-3" /> Estimated impact: ~{item.impact}%
              </div>
            </div>
          </div>
        </div>
      ))}
      {/* Locked */}
      <div className="bg-secondary/50 rounded-lg border border-dashed border-primary/30 p-6 flex flex-col items-center justify-center gap-2">
        <Lock className="w-5 h-5 text-primary" />
        <p className="text-sm font-medium text-foreground">{otherItems.length} more action items</p>
        <button className="text-xs font-medium text-primary-foreground bg-primary px-4 py-1.5 rounded-full hover:opacity-90 transition-opacity">
          Sign up to unlock →
        </button>
      </div>
    </div>
  );
}
