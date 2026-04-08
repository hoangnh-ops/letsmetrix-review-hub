import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import AppInfoSidebar from "@/components/review-tool/AppInfoSidebar";
import AISummary from "@/components/review-tool/AISummary";
import StrengthsWeaknesses from "@/components/review-tool/StrengthsWeaknesses";
import FeatureRequestsTab from "@/components/review-tool/FeatureRequestsTab";
import ActionItemsTab from "@/components/review-tool/ActionItemsTab";
import ReviewListSection from "@/components/review-tool/ReviewListSection";
import ReviewStatsTab from "@/components/review-tool/ReviewStatsTab";
import CrossSellStrip from "@/components/review-tool/CrossSellStrip";
import SearchBar from "@/components/review-tool/SearchBar";
import { appInfo } from "@/data/mockData";
import { Brain } from "lucide-react";

function AnalyzingOverlay({ reviewCount }: { reviewCount: number }) {
  const [progress, setProgress] = useState(0);
  
  useEffect(() => {
    const interval = setInterval(() => {
      setProgress(p => {
        if (p >= 100) return 100;
        return p + Math.random() * 15 + 5;
      });
    }, 300);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-[60vh] flex items-center justify-center">
      <div className="text-center space-y-6 animate-fade-in-up">
        <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto">
          <Brain className="w-8 h-8 text-primary animate-pulse" />
        </div>
        <div>
          <h2 className="text-lg font-bold text-foreground mb-1">AI is analyzing</h2>
          <p className="text-sm text-muted-foreground">{reviewCount.toLocaleString()} reviews...</p>
        </div>
        <div className="w-64 mx-auto">
          <div className="h-2 bg-secondary rounded-full overflow-hidden">
            <div
              className="h-full bg-primary rounded-full transition-all duration-300"
              style={{ width: `${Math.min(progress, 100)}%` }}
            />
          </div>
          <p className="text-xs text-muted-foreground mt-2">
            {progress < 30 ? "Fetching reviews..." : progress < 60 ? "Analyzing sentiment..." : progress < 90 ? "Generating insights..." : "Almost done..."}
          </p>
        </div>
      </div>
    </div>
  );
}

export default function ResultPage() {
  const [searchParams] = useSearchParams();
  const appName = searchParams.get("app") || "JETVEO";
  const [isAnalyzing, setIsAnalyzing] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setIsAnalyzing(false), 2500);
    return () => clearTimeout(timer);
  }, [appName]);

  return (
    <div className="min-h-screen bg-background">
      {/* Top bar */}
      <header className="border-b bg-card sticky top-0 z-30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3 flex items-center gap-4">
          <a href="/" className="flex items-center gap-1 flex-shrink-0">
            <span className="text-sm font-extrabold tracking-tight text-foreground">LETS</span>
            <span className="text-sm font-extrabold tracking-tight text-primary">METRIX</span>
          </a>
          <div className="flex-1 max-w-lg">
            <SearchBar />
          </div>
          <div className="hidden md:flex items-center gap-6 text-sm text-muted-foreground">
            <a href="#" className="hover:text-foreground transition-colors">For Merchants</a>
            <a href="#" className="hover:text-foreground transition-colors">For Developers</a>
          </div>
          <div className="hidden sm:flex items-center gap-3 text-sm">
            <a href="#" className="text-muted-foreground hover:text-foreground transition-colors">Login</a>
            <a href="#" className="bg-primary text-primary-foreground px-4 py-1.5 rounded-full font-medium hover:opacity-90 transition-opacity">
              Get Started
            </a>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 py-6">
        {/* Breadcrumb */}
        <nav className="text-xs text-muted-foreground mb-4 flex items-center gap-1.5">
          <a href="/" className="hover:text-foreground transition-colors">Home</a>
          <span>/</span>
          <a href="/" className="hover:text-foreground transition-colors">AI Review Insights</a>
          <span>/</span>
          <span className="text-foreground font-medium">{appName}</span>
        </nav>

        {isAnalyzing ? (
          <AnalyzingOverlay reviewCount={appInfo.totalReviews} />
        ) : (
          <div className="flex flex-col lg:flex-row gap-6">
            {/* Sidebar */}
            <AppInfoSidebar />

            {/* Main Content */}
            <div className="flex-1 min-w-0 space-y-6">
              {/* AI Summary */}
              <AISummary />

              {/* Strengths & Weaknesses - 2 column */}
              <StrengthsWeaknesses />

              {/* Feature Requests & Action Items - 2 column */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 animate-fade-in-up">
                <div>
                  <div className="flex items-center gap-2 mb-3">
                    <h3 className="text-sm font-semibold text-foreground">Feature Requests</h3>
                    <span className="text-[10px] font-bold bg-primary text-primary-foreground px-2 py-0.5 rounded-full">High</span>
                  </div>
                  <FeatureRequestsTab />
                </div>
                <div>
                  <div className="flex items-center gap-2 mb-3">
                    <h3 className="text-sm font-semibold text-foreground">Action Items</h3>
                    <span className="text-[10px] font-bold bg-purple-600 text-primary-foreground px-2 py-0.5 rounded-full">Urgent</span>
                  </div>
                  <ActionItemsTab />
                </div>
              </div>

              {/* Review Status Tracking */}
              <div className="animate-fade-in-up">
                <h3 className="text-sm font-semibold text-foreground mb-3">Review Status Tracking</h3>
                <ReviewStatsTab />
              </div>

              {/* Review List */}
              <ReviewListSection />

              {/* Cross-sell */}
              <CrossSellStrip />
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
