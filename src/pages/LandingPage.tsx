import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Search, ArrowRight, Brain, BarChart3, MessageSquare, TrendingUp, Clock, Target, Users, Zap, ChevronRight, Star } from "lucide-react";

const SAMPLE_APPS = [
  { name: "JETVEO", icon: "https://cdn.shopify.com/app-store/listing_images/5e3a36fc1c2c9d4a18ff7c5b1d5c7e2a/icon/CL-KxZHEroMDEAE=.png", rating: 4.9, reviews: 2257 },
  { name: "Oberlo", icon: "https://cdn.shopify.com/app-store/listing_images/default-app-icon.png", rating: 4.7, reviews: 1830 },
  { name: "PageFly", icon: "https://cdn.shopify.com/app-store/listing_images/default-app-icon.png", rating: 4.8, reviews: 3102 },
];

export default function LandingPage() {
  const navigate = useNavigate();
  const [query, setQuery] = useState("");
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [notFoundMode, setNotFoundMode] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const filtered = query.length >= 2
    ? SAMPLE_APPS.filter(a => a.name.toLowerCase().includes(query.toLowerCase()))
    : [];

  const handleSelectApp = (appName: string) => {
    setShowSuggestions(false);
    navigate(`/result?app=${encodeURIComponent(appName)}`);
  };

  const handleSearch = () => {
    if (query.trim().length < 2) return;
    if (filtered.length > 0) {
      handleSelectApp(filtered[0].name);
    } else {
      setNotFoundMode(true);
    }
  };

  useEffect(() => {
    if (query.length >= 2 && filtered.length > 0) {
      setShowSuggestions(true);
      setNotFoundMode(false);
    } else if (query.length >= 2 && filtered.length === 0) {
      setShowSuggestions(false);
    } else {
      setShowSuggestions(false);
      setNotFoundMode(false);
    }
  }, [query, filtered.length]);

  return (
    <div className="min-h-screen bg-background">
      {/* Header — matching letsmetrix.com */}
      <header className="border-b bg-card sticky top-0 z-30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3 flex items-center justify-between">
          <a href="/" className="flex items-center gap-1">
            <span className="text-sm font-extrabold tracking-tight text-foreground">LETS</span>
            <span className="text-sm font-extrabold tracking-tight text-primary">METRIX</span>
          </a>
          <nav className="hidden md:flex items-center gap-6 text-sm text-muted-foreground">
            <a href="#" className="hover:text-foreground transition-colors">For Merchants</a>
            <a href="#" className="hover:text-foreground transition-colors">For Developers</a>
            <a href="#" className="hover:text-foreground transition-colors">Compare</a>
            <a href="#" className="hover:text-foreground transition-colors">App Insights</a>
          </nav>
          <div className="flex items-center gap-3 text-sm">
            <a href="#" className="hidden sm:inline text-muted-foreground hover:text-foreground transition-colors">Login</a>
            <a href="#" className="bg-primary text-primary-foreground px-4 py-1.5 rounded-full font-medium hover:opacity-90 transition-opacity text-sm">
              Get Started
            </a>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-primary/5" />
        <div className="max-w-4xl mx-auto px-4 sm:px-6 pt-16 pb-12 text-center relative z-10">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-medium mb-6">
            <Brain className="w-3.5 h-3.5" />
            AI-Powered Review Analysis
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-foreground leading-tight mb-4">
            AI Review Insights
            <br />
            <span className="text-primary">for Shopify Apps</span>
          </h1>
          <p className="text-muted-foreground text-base sm:text-lg max-w-2xl mx-auto mb-10">
            Analyze all reviews with AI. Understand strengths, weaknesses, feature requests and sentiment trends — without reading every single review.
          </p>

          {/* Search Bar */}
          <div className="max-w-xl mx-auto relative">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
              <input
                ref={inputRef}
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleSearch()}
                placeholder="Enter a Shopify App name..."
                className="w-full pl-12 pr-36 py-4 text-base bg-card rounded-xl border-2 border-border outline-none focus:border-primary/50 focus:ring-4 focus:ring-primary/10 text-foreground placeholder:text-muted-foreground shadow-lg transition-all"
              />
              <button
                onClick={handleSearch}
                className="absolute right-2 top-1/2 -translate-y-1/2 bg-primary text-primary-foreground px-5 py-2.5 rounded-lg font-medium text-sm hover:opacity-90 transition-opacity flex items-center gap-1.5"
              >
                Analyze Reviews
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>

            {/* Autocomplete dropdown */}
            {showSuggestions && (
              <div className="absolute top-full left-0 right-0 mt-2 bg-card border rounded-xl shadow-xl z-20 overflow-hidden animate-fade-in-up">
                {filtered.map((app) => (
                  <button
                    key={app.name}
                    onClick={() => handleSelectApp(app.name)}
                    className="w-full flex items-center gap-3 px-4 py-3 hover:bg-secondary transition-colors text-left"
                  >
                    <img src={app.icon} alt={app.name} className="w-8 h-8 rounded-lg border" />
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-foreground">{app.name}</p>
                      <div className="flex items-center gap-2 text-xs text-muted-foreground">
                        <Star className="w-3 h-3 fill-lmx-orange text-lmx-orange" />
                        <span>{app.rating}</span>
                        <span>·</span>
                        <span>{app.reviews.toLocaleString()} reviews</span>
                      </div>
                    </div>
                    <ChevronRight className="w-4 h-4 text-muted-foreground" />
                  </button>
                ))}
              </div>
            )}

            {/* Not found state */}
            {notFoundMode && (
              <div className="absolute top-full left-0 right-0 mt-2 bg-card border border-lmx-warning/30 rounded-xl shadow-xl z-20 p-5 animate-fade-in-up">
                <div className="text-center space-y-3">
                  <p className="text-sm font-medium text-foreground">❌ App not found</p>
                  <p className="text-xs text-muted-foreground">We don't have data for this app yet. You can:</p>
                  <div className="flex flex-col sm:flex-row gap-2 justify-center">
                    <a href={`https://apps.shopify.com/search?q=${encodeURIComponent(query)}`} target="_blank" rel="noopener noreferrer"
                      className="text-xs font-medium text-primary bg-primary/10 px-4 py-2 rounded-lg hover:bg-primary/20 transition-colors">
                      🔍 Search on Shopify
                    </a>
                    <button
                      onClick={() => setNotFoundMode(false)}
                      className="text-xs font-medium text-lmx-success bg-lmx-success/10 px-4 py-2 rounded-lg hover:bg-lmx-success/20 transition-colors"
                    >
                      📩 Suggest this app
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Core Features */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 py-16">
        <h2 className="text-xl sm:text-2xl font-bold text-foreground text-center mb-2">Core Features</h2>
        <p className="text-sm text-muted-foreground text-center mb-10">All the insights you need, powered by AI</p>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {[
            { icon: Brain, title: "AI Summary", desc: "Get a 3-5 sentence overview of all reviews — quickly grasp the big picture" },
            { icon: BarChart3, title: "Strengths & Weaknesses", desc: "Top strengths and weaknesses with mention counts, sample quotes and trends" },
            { icon: MessageSquare, title: "Feature Requests", desc: "User-requested features ranked by frequency and signal strength" },
            { icon: TrendingUp, title: "Sentiment Trend", desc: "Track Positive/Neutral/Negative sentiment trends over time" },
          ].map((f, i) => (
            <div key={i} className="bg-card rounded-xl border p-6 hover:shadow-md hover:border-primary/20 transition-all group">
              <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
                <f.icon className="w-5 h-5 text-primary" />
              </div>
              <h3 className="font-semibold text-sm text-foreground mb-1.5">{f.title}</h3>
              <p className="text-xs text-muted-foreground leading-relaxed">{f.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Why Use It */}
      <section className="bg-secondary/50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-16">
          <h2 className="text-xl sm:text-2xl font-bold text-foreground text-center mb-2">Why Use It</h2>
          <p className="text-sm text-muted-foreground text-center mb-10">Save time and make data-driven decisions</p>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {[
              { icon: Clock, title: "Save time reading reviews", desc: "AI reads thousands of reviews in seconds — you just read the summary" },
              { icon: Target, title: "Know what to build next", desc: "Feature requests ranked by frequency help you prioritize your roadmap" },
              { icon: Users, title: "Benchmark competitors", desc: "Analyze competitor app reviews to find weaknesses and opportunities" },
            ].map((f, i) => (
              <div key={i} className="flex items-start gap-4 bg-card rounded-xl border p-5">
                <div className="w-10 h-10 rounded-full bg-lmx-success/10 flex items-center justify-center flex-shrink-0">
                  <f.icon className="w-5 h-5 text-lmx-success" />
                </div>
                <div>
                  <h3 className="font-semibold text-sm text-foreground mb-1">{f.title}</h3>
                  <p className="text-xs text-muted-foreground leading-relaxed">{f.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How to Use */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 py-16">
        <h2 className="text-xl sm:text-2xl font-bold text-foreground text-center mb-2">How to Use</h2>
        <p className="text-sm text-muted-foreground text-center mb-10">Just 3 simple steps</p>
        <div className="flex flex-col sm:flex-row items-center gap-4 sm:gap-8 justify-center">
          {[
            { step: "1", title: "Search app name", desc: "Enter the Shopify app you want to analyze" },
            { step: "2", title: "AI analyzes reviews", desc: "AI processes all reviews in seconds" },
            { step: "3", title: "Get insights & act", desc: "View the report and make data-driven decisions" },
          ].map((s, i) => (
            <div key={i} className="flex items-center gap-4 sm:flex-col sm:text-center">
              <div className="w-12 h-12 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-lg font-bold flex-shrink-0">
                {s.step}
              </div>
              <div>
                <h3 className="font-semibold text-sm text-foreground">{s.title}</h3>
                <p className="text-xs text-muted-foreground mt-0.5">{s.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Cross-sell Letsmetrix */}
      <section className="bg-foreground">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-12">
          <div className="text-center mb-8">
            <h2 className="text-xl sm:text-2xl font-bold text-background mb-2">Want more insights?</h2>
            <p className="text-sm text-background/60">Explore the full Letsmetrix platform</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {[
              { icon: Search, title: "Keyword Tracking", desc: "Track your app ranking on the Shopify App Store" },
              { icon: BarChart3, title: "GA4 Integration", desc: "Connect Google Analytics for comprehensive tracking" },
              { icon: Zap, title: "Competitor Analysis", desc: "Compare app performance against competitors" },
            ].map((f, i) => (
              <div key={i} className="bg-background/5 border border-background/10 rounded-xl p-5 hover:bg-background/10 transition-colors">
                <f.icon className="w-5 h-5 text-primary mb-3" />
                <h3 className="font-semibold text-sm text-background mb-1">{f.title}</h3>
                <p className="text-xs text-background/50">{f.desc}</p>
              </div>
            ))}
          </div>
          <div className="text-center mt-8">
            <a href="https://letsmetrix.com" target="_blank" rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-6 py-2.5 rounded-full font-medium text-sm hover:opacity-90 transition-opacity">
              Explore Letsmetrix <ArrowRight className="w-4 h-4" />
            </a>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t bg-card py-6">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 text-center text-xs text-muted-foreground">
          © 2026 Letsmetrix. AI Review Insights is a free tool by Letsmetrix.com
        </div>
      </footer>
    </div>
  );
}
