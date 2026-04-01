import { Star, TrendingUp, TrendingDown, Minus, Lock, Bell, ExternalLink, AlertTriangle } from "lucide-react";
import { appInfo, sentimentScores, spikeAlerts } from "@/data/mockData";

const ScoreColor = (score: number) => {
  if (score >= 7.0) return "bg-lmx-success";
  if (score >= 5.0) return "bg-lmx-warning";
  return "bg-lmx-danger";
};

const TrendIcon = ({ trend }: { trend: "up" | "down" | "flat" }) => {
  if (trend === "up") return <TrendingUp className="w-3 h-3 text-lmx-success" />;
  if (trend === "down") return <TrendingDown className="w-3 h-3 text-lmx-danger" />;
  return <Minus className="w-3 h-3 text-muted-foreground" />;
};

export default function AppInfoSidebar() {
  return (
    <aside className="w-full lg:w-80 flex-shrink-0 space-y-5">
      {/* A1: App Info */}
      <div className="bg-card rounded-lg border p-5 space-y-4 animate-fade-in-up">
        <div className="flex items-start gap-3">
          <img src={appInfo.icon} alt={appInfo.name} className="w-14 h-14 rounded-xl border" />
          <div className="min-w-0">
            <h2 className="font-bold text-lg leading-tight text-foreground">{appInfo.name}</h2>
            <p className="text-xs text-muted-foreground">{appInfo.developer}</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1">
            <Star className="w-4 h-4 fill-lmx-orange text-lmx-orange" />
            <span className="font-semibold text-sm">{appInfo.rating}</span>
          </div>
          <span className="text-xs text-muted-foreground">({appInfo.totalReviews.toLocaleString()} reviews)</span>
        </div>
        <div className="space-y-1.5 text-xs text-muted-foreground">
          <p>📦 {appInfo.installs} installs</p>
          <p>💰 {appInfo.pricingPlan}</p>
          <p>📅 Updated: {appInfo.lastUpdated}</p>
          <p>🏷️ {appInfo.category}</p>
        </div>
      </div>

      {/* A2: Sentiment Scores */}
      <div className="bg-card rounded-lg border p-5 space-y-3 animate-fade-in-up" style={{ animationDelay: "0.1s" }}>
        <h3 className="font-semibold text-sm text-foreground">Điểm cảm xúc</h3>
        <div className="space-y-3">
          {sentimentScores.map((s, i) => {
            const isGated = i >= 3;
            return (
              <div key={s.label} className={`relative ${isGated ? "" : ""}`}>
                <div className={isGated ? "gated-blur" : ""}>
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-xs text-muted-foreground">{s.label}</span>
                    <div className="flex items-center gap-1.5">
                      <span className={`text-sm font-bold ${s.score >= 7 ? "text-lmx-success" : s.score >= 5 ? "text-lmx-warning" : "text-lmx-danger"}`}>
                        {s.score.toFixed(1)}
                      </span>
                      {!isGated && <TrendIcon trend={s.trend} />}
                      {!isGated && <span className="text-[10px] text-muted-foreground">{s.delta}</span>}
                    </div>
                  </div>
                  <div className="h-2 bg-secondary rounded-full overflow-hidden">
                    <div className={`h-full rounded-full transition-all ${ScoreColor(s.score)}`} style={{ width: `${s.score * 10}%` }} />
                  </div>
                </div>
                {isGated && i === 3 && (
                  <div className="absolute inset-0 flex items-center justify-center z-10">
                    <button className="flex items-center gap-1.5 text-xs font-medium text-primary bg-primary/10 px-3 py-1.5 rounded-full hover:bg-primary/20 transition-colors">
                      <Lock className="w-3 h-3" /> Mở khóa tất cả điểm →
                    </button>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* A3: Spike Alert */}
      {spikeAlerts.length > 0 && (
        <div className="bg-card rounded-lg border border-lmx-danger/30 p-5 space-y-3 animate-fade-in-up" style={{ animationDelay: "0.2s" }}>
          <div className="flex items-center gap-2">
            <AlertTriangle className="w-4 h-4 text-lmx-danger" />
            <h3 className="font-semibold text-sm text-foreground">Spike Alert</h3>
          </div>
          {spikeAlerts.map((spike, i) => (
            <div key={i} className="bg-lmx-danger-bg rounded-md p-3 space-y-1">
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-lmx-danger text-primary-foreground uppercase">
                  {spike.severity}
                </span>
                <span className="text-xs font-medium text-foreground">{spike.cluster}</span>
              </div>
              <p className="text-xs text-muted-foreground">
                +{spike.pctIncrease}% · {spike.current} vs {spike.baseline} baseline
              </p>
            </div>
          ))}
          <button className="w-full flex items-center justify-center gap-1.5 text-xs font-medium bg-lmx-danger text-primary-foreground py-2 rounded-md hover:opacity-90 transition-opacity">
            <Bell className="w-3 h-3" /> Get notified
          </button>
          <a href="#" className="flex items-center justify-center gap-1 text-xs text-primary hover:underline">
            Track on letsmetrix <ExternalLink className="w-3 h-3" />
          </a>
        </div>
      )}
    </aside>
  );
}
