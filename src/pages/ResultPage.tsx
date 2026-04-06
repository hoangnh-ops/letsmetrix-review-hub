import { useState, useEffect } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import AppHeader from "@/components/review-tool/AppHeader";
import AISummary from "@/components/review-tool/AISummary";
import StrengthsWeaknesses from "@/components/review-tool/StrengthsWeaknesses";
import FeatureRequestsTab from "@/components/review-tool/FeatureRequestsTab";
import ActionItemsTab from "@/components/review-tool/ActionItemsTab";
import ReviewsTab from "@/components/review-tool/ReviewsTab";
import ReviewStatsTab from "@/components/review-tool/ReviewStatsTab";
import SentimentTrendChart from "@/components/review-tool/SentimentTrendChart";
import GetNotifiedSection from "@/components/review-tool/GetNotifiedSection";
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
  const navigate = useNavigate();
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

      <main className="max-w-5xl mx-auto px-4 sm:px-6 py-6">
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
          <div className="space-y-6">
            {/* App Header - horizontal */}
            <AppHeader />

            {/* AI Summary */}
            <AISummary />

            {/* Strengths & Weaknesses */}
            <StrengthsWeaknesses />

            {/* Sentiment Trend Chart */}
            <SentimentTrendChart />

            {/* Tabs: Feature Requests, Action Items, Reviews, Review Stats */}
            <Tabs defaultValue="features" className="animate-fade-in-up" style={{ animationDelay: "0.15s" }}>
              <TabsList className="bg-secondary w-full justify-start rounded-lg p-1 h-auto flex-wrap">
                <TabsTrigger value="features" className="text-xs data-[state=active]:bg-card data-[state=active]:shadow-sm rounded-md px-3 py-1.5">
                  Feature Requests
                </TabsTrigger>
                <TabsTrigger value="actions" className="text-xs data-[state=active]:bg-card data-[state=active]:shadow-sm rounded-md px-3 py-1.5">
                  Action Items
                </TabsTrigger>
                <TabsTrigger value="reviews" className="text-xs data-[state=active]:bg-card data-[state=active]:shadow-sm rounded-md px-3 py-1.5">
                  Reviews
                </TabsTrigger>
                <TabsTrigger value="stats" className="text-xs data-[state=active]:bg-card data-[state=active]:shadow-sm rounded-md px-3 py-1.5">
                  Review Stats
                  <span className="ml-1 text-[9px] font-bold bg-primary text-primary-foreground px-1 py-0.5 rounded">NEW</span>
                </TabsTrigger>
              </TabsList>
              <div className="mt-4">
                <TabsContent value="features"><FeatureRequestsTab /></TabsContent>
                <TabsContent value="actions"><ActionItemsTab /></TabsContent>
                <TabsContent value="reviews"><ReviewsTab /></TabsContent>
                <TabsContent value="stats"><ReviewStatsTab /></TabsContent>
              </div>
            </Tabs>

            {/* Get Notified */}
            <GetNotifiedSection />

            {/* Cross-sell */}
            <CrossSellStrip />
          </div>
        )}
      </main>
    </div>
  );
}
