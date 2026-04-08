import { Star, TrendingUp, TrendingDown, Minus, Bell, ExternalLink, AlertTriangle } from "lucide-react";
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
    <aside className="w-full lg:w-72 flex-shrink-0">
      <div className="lg:sticky lg:top-20 space-y-4">
        {/* A1: App Info */}
        <div className="bg-card rounded-lg border p-4 space-y-3 animate-fade-in-up">
          <div className="flex items-start gap-3">
            <img src={appInfo.icon} alt={appInfo.name} className="w-12 h-12 rounded-xl border" />
            <div className="min-w-0">
              <h2 className="font-bold text-base leading-tight text-foreground">{appInfo.name}</h2>
              <p className="text-xs text-muted-foreground">by {appInfo.developer}</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-1">
              <Star className="w-4 h-4 fill-lmx-orange text-lmx-orange" />
              <span className="font-semibold text-sm">{appInfo.rating}</span>
            </div>
            <span className="text-xs text-muted-foreground">({appInfo.totalReviews.toLocaleString()} reviews)</span>
          </div>
          <a href="#" className="flex items-center gap-1 text-xs text-primary hover:underline">
            View on Shopify <ExternalLink className="w-3 h-3" />
          </a>
        </div>

        {/* A2: Sentiment Scores */}
        <div className="bg-card rounded-lg border p-4 space-y-3 animate-fade-in-up" style={{ animationDelay: "0.1s" }}>
          <h3 className="font-semibold text-sm text-foreground">Sentiment Scores</h3>
          <div className="space-y-2.5">
            {sentimentScores.map((s) => (
              <div key={s.label}>
                <div className="flex items-center justify-between mb-1">
                  <span className="text-xs text-muted-foreground">{s.label}</span>
                  <div className="flex items-center gap-1.5">
                    <span className={`text-sm font-bold ${s.score >= 7 ? "text-lmx-success" : s.score >= 5 ? "text-lmx-warning" : "text-lmx-danger"}`}>
                      {s.score.toFixed(1)}
                    </span>
                    <TrendIcon trend={s.trend} />
                  </div>
                </div>
                <div className="h-2 bg-secondary rounded-full overflow-hidden">
                  <div className={`h-full rounded-full transition-all ${ScoreColor(s.score)}`} style={{ width: `${s.score * 10}%` }} />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* A3: Alert Banner (Guest) */}
        <div className="bg-card rounded-lg border p-4 space-y-3 animate-fade-in-up" style={{ animationDelay: "0.2s" }}>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <AlertTriangle className="w-4 h-4 text-lmx-danger" />
              <h3 className="font-semibold text-xs text-foreground">Alert monitoring</h3>
            </div>
            <button className="text-[10px] text-primary hover:underline font-medium">Sign up to enable</button>
          </div>

          {/* Spike strip */}
          {spikeAlerts.length > 0 && spikeAlerts.map((spike, i) => (
            <div key={i} className="bg-lmx-danger-bg rounded-md p-2.5 space-y-0.5">
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-lmx-danger text-primary-foreground uppercase">SPIKE</span>
                <span className="text-xs font-medium text-foreground">{spike.cluster} +{spike.pctIncrease}%</span>
              </div>
              <p className="text-[10px] text-muted-foreground">
                {spike.current} vs {spike.baseline} baseline this week
              </p>
            </div>
          ))}

          {/* Alert toggles (dimmed for guest) */}
          <div className="space-y-2 opacity-50 pointer-events-none">
            {[
              { label: "Negative review spike", desc: "Cluster grows > 200% / 7 days", on: true },
              { label: "Sudden rating drop", desc: "Weekly avg drops > 0.5 stars", on: true },
              { label: "1-star burst", desc: "> 10 reviews in 48h", on: false },
            ].map((toggle) => (
              <div key={toggle.label} className="flex items-center justify-between">
                <div>
                  <p className="text-xs font-medium text-foreground">{toggle.label}</p>
                  <p className="text-[10px] text-muted-foreground">{toggle.desc}</p>
                </div>
                <div className={`w-8 h-4 rounded-full ${toggle.on ? "bg-primary" : "bg-secondary"} relative`}>
                  <div className={`w-3 h-3 rounded-full bg-card absolute top-0.5 ${toggle.on ? "right-0.5" : "left-0.5"}`} />
                </div>
              </div>
            ))}
          </div>

          <button className="w-full flex items-center justify-center gap-1.5 text-xs font-medium border border-dashed border-muted-foreground/30 text-muted-foreground py-2 rounded-md hover:border-primary hover:text-primary transition-colors">
            <Bell className="w-3 h-3" /> Sign up to enable alerts
          </button>
        </div>

        {/* Track link */}
        <a href="#" className="flex items-center justify-center gap-1 text-xs text-primary hover:underline py-2">
          Track this app on letsmetrix →
        </a>
      </div>
    </aside>
  );
}
