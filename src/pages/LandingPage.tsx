import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  Search, ArrowRight, Brain, BarChart3, MessageSquare, TrendingUp,
  Clock, Target, Users, Zap, ChevronRight, Star, ChevronDown,
  AlertCircle, Info, CheckCircle2, Lightbulb, Shield, LineChart
} from "lucide-react";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";

const SAMPLE_APPS = [
  { name: "JETVEO", icon: "https://cdn.shopify.com/app-store/listing_images/5e3a36fc1c2c9d4a18ff7c5b1d5c7e2a/icon/CL-KxZHEroMDEAE=.png", rating: 4.9, reviews: 2257 },
  { name: "Oberlo", icon: "https://cdn.shopify.com/app-store/listing_images/default-app-icon.png", rating: 4.7, reviews: 1830 },
  { name: "PageFly", icon: "https://cdn.shopify.com/app-store/listing_images/default-app-icon.png", rating: 4.8, reviews: 3102 },
];

const FEATURES = [
  { icon: Brain, title: "AI-Powered Summary", desc: "Get a concise 3–5 sentence overview of all reviews. Understand the big picture without reading thousands of reviews manually.", color: "text-primary", bg: "bg-primary/10" },
  { icon: BarChart3, title: "Strengths & Weaknesses", desc: "Top strengths and weaknesses clustered by theme, with mention counts, sample quotes and trend direction indicators.", color: "text-lmx-success", bg: "bg-lmx-success/10" },
  { icon: MessageSquare, title: "Feature Requests", desc: "User-requested features ranked by frequency and signal strength. Know what your users want most.", color: "text-lmx-info", bg: "bg-lmx-info/10" },
  { icon: TrendingUp, title: "Sentiment Trend", desc: "Track Positive / Neutral / Negative sentiment trends over time with interactive charts.", color: "text-lmx-warning", bg: "bg-lmx-warning/10" },
  { icon: Shield, title: "Action Items", desc: "AI-generated prioritized action items based on review analysis — so you know exactly what to fix first.", color: "text-lmx-danger", bg: "bg-lmx-danger/10" },
  { icon: LineChart, title: "Review Statistics", desc: "Detailed review stats including rating distribution, review velocity, and response rate metrics.", color: "text-lmx-purple", bg: "bg-lmx-purple/10" },
];

const STEPS = [
  { step: "1", title: "Search for an app", desc: "Enter a Shopify app name in the search bar above. Our database covers thousands of apps." },
  { step: "2", title: "AI analyzes all reviews", desc: "Our AI engine processes every review — sentiment, topics, feature requests — in seconds." },
  { step: "3", title: "Get actionable insights", desc: "View the full report: strengths, weaknesses, feature requests, trends, and prioritized action items." },
];

const BENEFITS = [
  { icon: Clock, title: "Save Hours of Manual Work", desc: "AI reads and categorizes thousands of reviews in seconds — no more manual spreadsheet work." },
  { icon: Target, title: "Data-Driven Roadmap", desc: "Feature requests ranked by frequency help you prioritize what to build next based on real user demand." },
  { icon: Users, title: "Competitive Intelligence", desc: "Analyze competitor app reviews to discover their weaknesses and find market opportunities." },
  { icon: Lightbulb, title: "Improve User Satisfaction", desc: "Identify recurring pain points and fix them before they turn into negative reviews." },
];

const METRICS_EXPLAINED = [
  { title: "Sentiment Score", desc: "A percentage score (0–100%) representing the overall sentiment of all reviews. Calculated by classifying each review as Positive, Neutral, or Negative using NLP.", icon: TrendingUp },
  { title: "Mention Count", desc: "The number of times a specific topic, feature, or issue is mentioned across all reviews. Higher counts indicate stronger signals.", icon: MessageSquare },
  { title: "Signal Strength", desc: "A composite metric combining mention frequency, recency, and sentiment weight. Helps prioritize which issues matter most.", icon: BarChart3 },
  { title: "Review Velocity", desc: "The rate at which new reviews are being posted over time. A spike may indicate a recent update, bug, or marketing campaign.", icon: LineChart },
];

const FAQS = [
  { q: "What is AI Review Insights and how does it work?", a: "AI Review Insights is a free tool by Letsmetrix that uses artificial intelligence to analyze all reviews of any Shopify app. It automatically extracts strengths, weaknesses, feature requests, and sentiment trends — giving you a complete picture without reading every review." },
  { q: "Which Shopify apps can I analyze with Review Insights?", a: "You can analyze any app listed on the Shopify App Store. Our database is regularly updated and covers thousands of apps. If an app isn't found, you can suggest it and we'll add it to our index." },
  { q: "Is the AI Review Insights tool free to use?", a: "Yes! The basic analysis is completely free. You can search any app and get AI-generated summaries, strengths & weaknesses, and sentiment trends. Some advanced features may require a free Letsmetrix account." },
  { q: "How accurate are the Review Insights results?", a: "Our AI model has been trained specifically on Shopify app reviews and achieves high accuracy in sentiment classification and topic extraction. Results are based on all available reviews, ensuring comprehensive and reliable insights." },
];

export default function LandingPage() {
  const navigate = useNavigate();
  const [query, setQuery] = useState("");
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [notFoundMode, setNotFoundMode] = useState(false);
  const [validationError, setValidationError] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  const filtered = query.length >= 2
    ? SAMPLE_APPS.filter(a => a.name.toLowerCase().includes(query.toLowerCase()))
    : [];

  const handleSelectApp = (appName: string) => {
    setShowSuggestions(false);
    setValidationError("");
    navigate(`/result?app=${encodeURIComponent(appName)}`);
  };

  const handleSearch = () => {
    if (query.trim().length === 0) {
      setValidationError("Please enter an app name to analyze.");
      return;
    }
    if (query.trim().length < 2) {
      setValidationError("Please enter at least 2 characters.");
      return;
    }
    setValidationError("");
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
      setValidationError("");
    } else if (query.length >= 2 && filtered.length === 0) {
      setShowSuggestions(false);
    } else {
      setShowSuggestions(false);
      setNotFoundMode(false);
    }
  }, [query, filtered.length]);

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b bg-card sticky top-0 z-30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3 flex items-center justify-between">
          <a href="https://letsmetrix.com" className="flex items-center gap-1">
            <span className="text-sm font-extrabold tracking-tight text-foreground">LETS</span>
            <span className="text-sm font-extrabold tracking-tight text-primary">METRIX</span>
          </a>
          <nav className="hidden md:flex items-center gap-6 text-sm text-muted-foreground">
            <a href="https://letsmetrix.com" className="hover:text-foreground transition-colors">For Merchants</a>
            <a href="https://letsmetrix.com" className="hover:text-foreground transition-colors">For Developers</a>
            <a href="https://letsmetrix.com" className="hover:text-foreground transition-colors">Compare</a>
            <a href="https://letsmetrix.com" className="hover:text-foreground transition-colors">App Insights</a>
          </nav>
          <div className="flex items-center gap-3 text-sm">
            <a href="#" className="hidden sm:inline text-muted-foreground hover:text-foreground transition-colors">Login</a>
            <a href="#" className="bg-primary text-primary-foreground px-4 py-1.5 rounded-full font-medium hover:opacity-90 transition-opacity text-sm">
              Get Started
            </a>
          </div>
        </div>
      </header>

      {/* ===== HERO SECTION ===== */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-primary/5" />
        <div className="max-w-4xl mx-auto px-4 sm:px-6 pt-16 sm:pt-20 pb-14 text-center relative z-10">
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

          {/* Search Bar with Validation */}
          <div className="max-w-xl mx-auto relative">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
              <input
                ref={inputRef}
                type="text"
                value={query}
                onChange={(e) => { setQuery(e.target.value); setValidationError(""); }}
                onKeyDown={(e) => e.key === "Enter" && handleSearch()}
                placeholder="Enter a Shopify App name..."
                aria-label="Search for a Shopify app"
                className={`w-full pl-12 pr-36 py-4 text-base bg-card rounded-xl border-2 outline-none text-foreground placeholder:text-muted-foreground shadow-lg transition-all ${
                  validationError
                    ? "border-destructive focus:border-destructive focus:ring-4 focus:ring-destructive/10"
                    : "border-border focus:border-primary/50 focus:ring-4 focus:ring-primary/10"
                }`}
              />
              <button
                onClick={handleSearch}
                className="absolute right-2 top-1/2 -translate-y-1/2 bg-primary text-primary-foreground px-5 py-2.5 rounded-lg font-medium text-sm hover:opacity-90 transition-opacity flex items-center gap-1.5"
              >
                Analyze Reviews
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>

            {/* Validation Error */}
            {validationError && (
              <div className="flex items-center gap-1.5 mt-2 text-destructive text-xs font-medium animate-fade-in-up">
                <AlertCircle className="w-3.5 h-3.5" />
                {validationError}
              </div>
            )}

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
                        <Star className="w-3 h-3 fill-primary text-primary" />
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
                  <p className="text-sm font-medium text-foreground">App not found</p>
                  <p className="text-xs text-muted-foreground">We don't have data for this app yet. You can:</p>
                  <div className="flex flex-col sm:flex-row gap-2 justify-center">
                    <a href={`https://apps.shopify.com/search?q=${encodeURIComponent(query)}`} target="_blank" rel="noopener noreferrer"
                      className="text-xs font-medium text-primary bg-primary/10 px-4 py-2 rounded-lg hover:bg-primary/20 transition-colors inline-flex items-center gap-1.5 justify-center">
                      <Search className="w-3 h-3" /> Search on Shopify
                    </a>
                    <button
                      onClick={() => setNotFoundMode(false)}
                      className="text-xs font-medium text-lmx-success bg-lmx-success/10 px-4 py-2 rounded-lg hover:bg-lmx-success/20 transition-colors"
                    >
                      Suggest this app
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>

          <p className="text-xs text-muted-foreground mt-4">
            Try: <button onClick={() => setQuery("JETVEO")} className="text-primary hover:underline font-medium">JETVEO</button>,{" "}
            <button onClick={() => setQuery("PageFly")} className="text-primary hover:underline font-medium">PageFly</button>,{" "}
            <button onClick={() => setQuery("Oberlo")} className="text-primary hover:underline font-medium">Oberlo</button>
          </p>

        </div>
      </section>

      {/* ===== HOW TO USE ===== */}
      <section className="bg-secondary/50" id="how-to-use">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 py-16 sm:py-20">
          <h2 className="text-xl sm:text-2xl font-bold text-foreground text-center mb-2">How to Use AI Review Insights Tool</h2>
          <p className="text-sm text-muted-foreground text-center mb-12 max-w-lg mx-auto">
            Get comprehensive review analysis in just 3 simple steps
          </p>

          <div className="relative">
            {/* Connecting line */}
            <div className="hidden sm:block absolute top-8 left-[calc(16.67%+24px)] right-[calc(16.67%+24px)] h-0.5 bg-border" />

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 relative z-10">
              {STEPS.map((s, i) => (
                <div key={i} className="text-center">
                  <div className="w-14 h-14 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-xl font-bold mx-auto mb-4 shadow-md">
                    {s.step}
                  </div>
                  <h3 className="font-semibold text-foreground mb-2">{s.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{s.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ===== MAIN FEATURES ===== */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 py-16 sm:py-20" id="features">
        <h2 className="text-xl sm:text-2xl font-bold text-foreground text-center mb-2">Why Use AI Review Insights Tool</h2>
        <p className="text-sm text-muted-foreground text-center mb-12 max-w-lg mx-auto">
          All the insights you need from Shopify app reviews, powered by AI
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {FEATURES.map((f, i) => (
            <div key={i} className="bg-card rounded-xl border p-6 hover:shadow-md hover:border-primary/20 transition-all group">
              <div className={`w-11 h-11 rounded-lg ${f.bg} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                <f.icon className={`w-5 h-5 ${f.color}`} />
              </div>
              <h3 className="font-semibold text-foreground mb-2">{f.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{f.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ===== BENEFITS ===== */}
      <section className="bg-secondary/50">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 py-16 sm:py-20">
          <h2 className="text-xl sm:text-2xl font-bold text-foreground text-center mb-2">Benefits for App Developers & Merchants</h2>
          <p className="text-sm text-muted-foreground text-center mb-14 max-w-lg mx-auto">
            Save time and make data-driven decisions with AI-powered review analysis
          </p>
          <div className="space-y-10">
            {BENEFITS.map((b, i) => (
              <div key={i} className={`flex flex-col sm:flex-row items-center gap-6 ${i % 2 !== 0 ? 'sm:flex-row-reverse' : ''}`}>
                <div className="w-20 h-20 rounded-2xl bg-primary/10 flex items-center justify-center flex-shrink-0 relative">
                  <b.icon className="w-9 h-9 text-primary" />
                  <span className="absolute -top-2 -right-2 w-7 h-7 rounded-full bg-primary text-primary-foreground text-xs font-bold flex items-center justify-center shadow-md">
                    {i + 1}
                  </span>
                </div>
                <div className={`flex-1 ${i % 2 !== 0 ? 'sm:text-right' : ''}`}>
                  <h3 className="font-semibold text-foreground text-lg mb-1">{b.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed max-w-md">{b.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== METRICS EXPLAINED ===== */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 py-16 sm:py-20" id="metrics">
        <h2 className="text-xl sm:text-2xl font-bold text-foreground text-center mb-2">Understanding the Metrics</h2>
        <p className="text-sm text-muted-foreground text-center mb-12 max-w-lg mx-auto">
          Learn what each metric means and how it's calculated
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          {METRICS_EXPLAINED.map((m, i) => {
            const colors = [
              { border: "border-l-primary", bg: "bg-primary/10", text: "text-primary" },
              { border: "border-l-lmx-info", bg: "bg-lmx-info/10", text: "text-lmx-info" },
              { border: "border-l-lmx-success", bg: "bg-lmx-success/10", text: "text-lmx-success" },
              { border: "border-l-lmx-purple", bg: "bg-lmx-purple/10", text: "text-lmx-purple" },
            ];
            const c = colors[i % colors.length];
            return (
              <div key={i} className={`bg-card rounded-xl border border-l-4 ${c.border} p-5 hover:shadow-md transition-shadow`}>
                <div className="flex items-start gap-4">
                  <div className={`w-10 h-10 rounded-lg ${c.bg} flex items-center justify-center flex-shrink-0`}>
                    <m.icon className={`w-5 h-5 ${c.text}`} />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <h3 className="font-semibold text-foreground">{m.title}</h3>
                      <Tooltip>
                        <TooltipTrigger>
                          <Info className="w-3.5 h-3.5 text-muted-foreground hover:text-foreground transition-colors" />
                        </TooltipTrigger>
                        <TooltipContent className="max-w-xs text-xs">
                          {m.desc}
                        </TooltipContent>
                      </Tooltip>
                    </div>
                    <p className="text-sm text-muted-foreground leading-relaxed">{m.desc}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>



      {/* ===== FAQ ===== */}
      <section className="bg-secondary/50" id="faq">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 py-16 sm:py-20">
          <h2 className="text-xl sm:text-2xl font-bold text-foreground text-center mb-2">Frequently Asked Questions</h2>
          <p className="text-sm text-muted-foreground text-center mb-10">
            Common questions about AI Review Insights for Shopify Apps
          </p>
          <Accordion type="single" collapsible className="space-y-3">
            {FAQS.map((faq, i) => (
              <AccordionItem key={i} value={`faq-${i}`} className="bg-card border rounded-xl px-6 overflow-hidden">
                <AccordionTrigger className="text-sm font-medium text-foreground hover:no-underline py-4">
                  {faq.q}
                </AccordionTrigger>
                <AccordionContent className="text-sm text-muted-foreground leading-relaxed">
                  {faq.a}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </section>

      {/* ===== CROSS-SELL ===== */}
      <section className="bg-foreground">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-14">
          <div className="text-center mb-8">
            <h2 className="text-xl sm:text-2xl font-bold text-background mb-2">Explore More Letsmetrix Tools</h2>
            <p className="text-sm text-background/60">Grow your Shopify app with data-driven insights</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {[
              { icon: Search, title: "Keyword Tracking", desc: "Track your app ranking for specific keywords on the Shopify App Store", href: "https://letsmetrix.com" },
              { icon: BarChart3, title: "GA4 Integration", desc: "Connect Google Analytics for comprehensive app listing traffic analysis", href: "https://letsmetrix.com" },
              { icon: Zap, title: "Competitor Analysis", desc: "Compare app performance, rankings, and reviews against competitors", href: "https://letsmetrix.com" },
            ].map((f, i) => (
              <a key={i} href={f.href} target="_blank" rel="noopener noreferrer"
                className="bg-background/5 border border-background/10 rounded-xl p-6 hover:bg-background/10 transition-colors block group">
                <f.icon className="w-5 h-5 text-primary mb-3" />
                <h3 className="font-semibold text-sm text-background mb-1 group-hover:text-primary transition-colors">{f.title}</h3>
                <p className="text-xs text-background/50 leading-relaxed">{f.desc}</p>
              </a>
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
          © 2026 <a href="https://letsmetrix.com" className="hover:text-foreground transition-colors">Letsmetrix</a>. AI Review Insights is a free tool by Letsmetrix.com — The #1 Shopify App Store Analytics Platform.
        </div>
      </footer>
    </div>
  );
}
