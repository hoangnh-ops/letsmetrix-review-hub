import { Lock } from "lucide-react";
import { featureRequests } from "@/data/mockData";

const SignalBadge = ({ level }: { level: "HIGH" | "MED" | "LOW" }) => {
  const colors = {
    HIGH: "bg-lmx-danger-bg text-lmx-danger",
    MED: "bg-lmx-warning-bg text-lmx-warning",
    LOW: "bg-secondary text-muted-foreground",
  };
  return <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded ${colors[level]}`}>{level}</span>;
};

export default function FeatureRequestsTab() {
  const visible = featureRequests.slice(0, 2);
  const hiddenCount = featureRequests.length - 2;

  return (
    <div className="space-y-3">
      {visible.map((fr, i) => (
        <div key={i} className="bg-card rounded-lg border p-4 space-y-2">
          <div className="flex items-start justify-between">
            <div className="flex items-center gap-2">
              <h4 className="text-sm font-semibold text-foreground">{fr.title}</h4>
              <SignalBadge level={fr.signal} />
            </div>
            <span className="text-xs font-medium text-primary whitespace-nowrap">{fr.count} requests</span>
          </div>
          <p className="text-xs text-muted-foreground">{fr.description}</p>
          <p className="text-xs text-muted-foreground italic border-l-2 border-primary/30 pl-2">{fr.quote}</p>
        </div>
      ))}
      {/* Locked card */}
      <div className="bg-secondary/50 rounded-lg border border-dashed border-primary/30 p-6 flex flex-col items-center justify-center gap-2">
        <Lock className="w-5 h-5 text-primary" />
        <p className="text-sm font-medium text-foreground">{hiddenCount} more requests</p>
        <button className="text-xs font-medium text-primary-foreground bg-primary px-4 py-1.5 rounded-full hover:opacity-90 transition-opacity">
          Sign up to view all →
        </button>
      </div>
    </div>
  );
}
