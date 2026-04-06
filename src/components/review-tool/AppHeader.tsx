import { Star, RefreshCw, ExternalLink, Clock } from "lucide-react";
import { appInfo } from "@/data/mockData";

export default function AppHeader() {
  return (
    <div className="bg-card rounded-lg border p-5 animate-fade-in-up">
      <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
        {/* Left: Icon + Info */}
        <div className="flex items-center gap-3 flex-1 min-w-0">
          <img
            src={appInfo.icon}
            alt={appInfo.name}
            className="w-12 h-12 rounded-xl border flex-shrink-0"
          />
          <div className="min-w-0">
            <div className="flex items-center gap-2 flex-wrap">
              <h2 className="text-lg font-bold text-foreground">{appInfo.name}</h2>
              <div className="flex items-center gap-1">
                <Star className="w-4 h-4 fill-lmx-orange text-lmx-orange" />
                <span className="text-sm font-semibold text-foreground">{appInfo.rating}</span>
              </div>
              <span className="text-xs text-muted-foreground">
                ({appInfo.totalReviews.toLocaleString()} reviews)
              </span>
            </div>
            <div className="flex items-center gap-3 text-xs text-muted-foreground mt-0.5">
              <span>{appInfo.developer}</span>
              <span>·</span>
              <span>{appInfo.category}</span>
              <a
                href="#"
                className="flex items-center gap-1 text-primary hover:underline"
              >
                View on Shopify <ExternalLink className="w-3 h-3" />
              </a>
            </div>
          </div>
        </div>

        {/* Right: Sync + Last analyzed */}
        <div className="flex items-center gap-3 flex-shrink-0">
          <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
            <Clock className="w-3.5 h-3.5" />
            <span>Last analyzed: 2h ago</span>
          </div>
          <button className="flex items-center gap-1.5 text-xs font-medium border rounded-md px-3 py-1.5 hover:bg-secondary transition-colors text-foreground">
            <RefreshCw className="w-3.5 h-3.5" />
            Sync Data
          </button>
        </div>
      </div>
    </div>
  );
}
