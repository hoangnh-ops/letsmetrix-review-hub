import { useState, useRef, useEffect } from "react";
import dashboardPreview from "@/assets/dashboard-preview.png";

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

const WHY_CHOOSE = [
  { icon: Clock, title: "Save Time", desc: "AI reads and categorizes thousands of reviews in seconds. No more manual spreadsheet work or endless scrolling.", color: "text-primary", bg: "bg-primary/10" },
  { icon: Target, title: "Build Roadmap", desc: "Feature requests ranked by frequency help you prioritize what to build next. Make product decisions based on real user demand.", color: "text-lmx-success", bg: "bg-lmx-success/10" },
  { icon: Users, title: "Track Competitors", desc: "Analyze competitor app reviews to discover their weaknesses. Find market gaps and opportunities before anyone else.", color: "text-lmx-info", bg: "bg-lmx-info/10" },
  { icon: Lightbulb, title: "Improve UX", desc: "Identify recurring pain points and fix them proactively. Prevent negative reviews before they impact your rating.", color: "text-lmx-warning", bg: "bg-lmx-warning/10" },
  { icon: TrendingUp, title: "Detect Trends", desc: "Monitor how user sentiment shifts over weeks and months. Spot emerging issues or improvements early with trend analysis.", color: "text-lmx-danger", bg: "bg-lmx-danger/10" },
  { icon: Brain, title: "AI Summary", desc: "Get a concise overview of all reviews without reading each one. Understand the big picture in seconds with AI-generated insights.", color: "text-lmx-purple", bg: "bg-lmx-purple/10" },
];

const STEPS = [
  { step: "1", title: "Search for an app", desc: "Enter a Shopify app name in the search bar above. Our database covers thousands of apps." },
  { step: "2", title: "AI analyzes all reviews", desc: "Our AI engine processes every review — sentiment, topics, feature requests — in seconds." },
  { step: "3", title: "Get actionable insights", desc: "View the full report: strengths, weaknesses, feature requests, trends, and prioritized action items." },
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
      <section className="relative overflow-hidden bg-gradient-to-b from-[hsl(30,100%,98%)] to-background">
        {/* Minimal decorative accents */}
        <div className="absolute -top-32 -right-32 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
        <div className="absolute -bottom-20 -left-20 w-72 h-72 bg-primary/4 rounded-full blur-3xl" />
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/20 to-transparent" />

        <div className="max-w-4xl mx-auto px-4 sm:px-6 pt-14 sm:pt-20 pb-16 text-center relative z-10">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-medium mb-5 border border-primary/20">
            <Brain className="w-3.5 h-3.5" />
            AI-Powered Review Analysis
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-foreground leading-tight mb-3">
            AI Review Insights
            <br />
            <span className="text-primary">for Shopify Apps</span>
          </h1>
          <p className="text-muted-foreground text-base sm:text-lg max-w-2xl mx-auto mb-10">
            Analyze all reviews with AI. Understand strengths, weaknesses, feature requests and sentiment trends — without reading every single review.
          </p>

          {/* ── Highlighted Search Container ── */}
          <div className="max-w-2xl mx-auto relative">
            <div className="bg-card rounded-2xl border border-border shadow-xl p-6 sm:p-8">
              {/* Search input — dominant */}
              <div className="relative">
                <Search className="absolute left-5 top-1/2 -translate-y-1/2 w-6 h-6 text-muted-foreground" />
                <input
                  ref={inputRef}
                  type="text"
                  value={query}
                  onChange={(e) => { setQuery(e.target.value); setValidationError(""); }}
                  onKeyDown={(e) => e.key === "Enter" && handleSearch()}
                  placeholder="Enter a Shopify App name..."
                  aria-label="Search for a Shopify app"
                  className={`w-full pl-14 pr-4 py-5 text-lg bg-secondary/50 rounded-xl border-2 outline-none text-foreground placeholder:text-muted-foreground transition-all ${
                    validationError
                      ? "border-destructive focus:border-destructive focus:ring-4 focus:ring-destructive/10"
                      : "border-border focus:border-primary/50 focus:ring-4 focus:ring-primary/10"
                  }`}
                />
              </div>

              {/* CTA Button — full width below input */}
              <button
                onClick={handleSearch}
                className="w-full mt-4 bg-primary text-primary-foreground py-4 rounded-xl font-semibold text-base hover:opacity-90 transition-opacity flex items-center justify-center gap-2 shadow-md"
              >
                <Search className="w-5 h-5" />
                Analyze Reviews
                <ArrowRight className="w-5 h-5" />
              </button>

              {validationError && (
                <div className="flex items-center gap-1.5 mt-3 text-destructive text-xs font-medium animate-fade-in-up">
                  <AlertCircle className="w-3.5 h-3.5" />
                  {validationError}
                </div>
              )}

              {/* Usage hint chips */}
              <div className="flex flex-wrap items-center justify-center gap-2 mt-5">
                <span className="text-xs text-muted-foreground">Try:</span>
                {SAMPLE_APPS.map((app) => (
                  <button
                    key={app.name}
                    onClick={() => setQuery(app.name)}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-secondary text-xs font-medium text-foreground hover:bg-primary/10 hover:text-primary border border-border transition-colors"
                  >
                    <img src={app.icon} alt={app.name} className="w-4 h-4 rounded" />
                    {app.name}
                  </button>
                ))}
              </div>

              {/* Inline stats hint */}
              <div className="flex items-center justify-center gap-4 mt-4 text-xs text-muted-foreground">
                <span className="flex items-center gap-1"><CheckCircle2 className="w-3.5 h-3.5 text-lmx-success" /> Free to use</span>
                <span className="flex items-center gap-1"><Zap className="w-3.5 h-3.5 text-primary" /> Instant results</span>
                <span className="flex items-center gap-1"><BarChart3 className="w-3.5 h-3.5 text-lmx-info" /> 10k+ apps</span>
              </div>
            </div>

            {/* Suggestions dropdown */}
            {showSuggestions && (
              <div className="absolute top-full left-0 right-0 mt-2 bg-card border rounded-xl shadow-xl z-20 overflow-hidden animate-fade-in-up mx-6 sm:mx-8">
                <div className="px-4 py-2 border-b bg-secondary/30">
                  <p className="text-[11px] font-medium text-muted-foreground uppercase tracking-wide">Matching Apps</p>
                </div>
                {filtered.map((app) => (
                  <button
                    key={app.name}
                    onClick={() => handleSelectApp(app.name)}
                    className="w-full flex items-center gap-3 px-4 py-3 hover:bg-secondary transition-colors text-left"
                  >
                    <img src={app.icon} alt={app.name} className="w-9 h-9 rounded-lg border" />
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-semibold text-foreground">{app.name}</p>
                      <div className="flex items-center gap-2 text-xs text-muted-foreground">
                        <Star className="w-3 h-3 fill-primary text-primary" />
                        <span>{app.rating}</span>
                        <span>·</span>
                        <span>{app.reviews.toLocaleString()} reviews</span>
                      </div>
                    </div>
                    <span className="text-[11px] text-primary font-medium bg-primary/10 px-2.5 py-1 rounded-full">Analyze</span>
                  </button>
                ))}
              </div>
            )}

            {/* Not found dropdown */}
            {notFoundMode && (
              <div className="absolute top-full left-0 right-0 mt-2 bg-card border border-lmx-warning/30 rounded-xl shadow-xl z-20 p-5 animate-fade-in-up mx-6 sm:mx-8">
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
        </div>
      </section>

      {/* ===== HOW TO USE ===== */}
      <section className="bg-background" id="how-to-use">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 py-16 sm:py-20">
          <div className="flex justify-center mb-4">
            <span className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-primary/10 text-primary text-xs font-semibold border border-primary/20">
              <Zap className="w-3.5 h-3.5" /> How It Works
            </span>
          </div>
          <h2 className="text-xl sm:text-2xl font-bold text-foreground text-center mb-2">How to Use AI Review Insights Tool</h2>
          <p className="text-sm text-muted-foreground text-center mb-12 max-w-lg mx-auto">
            Get comprehensive review analysis in just 3 simple steps
          </p>

          <div className="relative">
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

      {/* ===== WHY CHOOSE ===== */}
      <section className="bg-secondary/50" id="features">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 py-16 sm:py-20">
          <div className="flex justify-center mb-4">
            <span className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-primary/10 text-primary text-xs font-semibold border border-primary/20">
              <Star className="w-3.5 h-3.5" /> Why Choose Us
            </span>
          </div>
          <h2 className="text-xl sm:text-2xl font-bold text-foreground text-center mb-10">Why Choose LetsMetrix</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
            {WHY_CHOOSE.map((item, i) => (
              <div key={i} className="bg-card rounded-xl border p-5 hover:shadow-md hover:border-primary/20 transition-all group">
                <div className="flex items-center gap-3 mb-2">
                  <div className={`w-10 h-10 rounded-lg ${item.bg} flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform`}>
                    <item.icon className={`w-5 h-5 ${item.color}`} />
                  </div>
                  <span className="font-semibold text-sm text-foreground">{item.title}</span>
                </div>
                <p className="text-xs text-muted-foreground leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== DASHBOARD PREVIEW ===== */}
      <section className="bg-background">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 py-16 sm:py-20 text-center">
          <div className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-primary/10 text-primary text-xs font-semibold border border-primary/20 mb-4">
            <BarChart3 className="w-3.5 h-3.5" /> Live Dashboard
          </div>
          <h2 className="text-xl sm:text-2xl font-bold text-foreground mb-2">See Insights in Seconds</h2>
          <p className="text-sm text-muted-foreground mb-4 max-w-lg mx-auto">
            AI breaks down reviews into actionable data
          </p>
          <button
            onClick={() => { inputRef.current?.focus(); window.scrollTo({ top: 0, behavior: "smooth" }); }}
            className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-6 py-2.5 rounded-full font-medium text-sm hover:opacity-90 transition-opacity mb-10"
          >
            Try it now <ArrowRight className="w-4 h-4" />
          </button>
          <div className="rounded-xl border border-border shadow-lg overflow-hidden">
            <img
              src={dashboardPreview}
              alt="AI Review Insights dashboard showing review tracking, sentiment scores, and rating distribution"
              className="w-full"
              loading="lazy"
            />
          </div>
        </div>

      {/* ===== FAQ ===== */}
      <section className="bg-secondary/50" id="faq">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 py-16 sm:py-20">
          <div className="flex justify-center mb-4">
            <span className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-primary/10 text-primary text-xs font-semibold border border-primary/20">
              <MessageSquare className="w-3.5 h-3.5" /> FAQ
            </span>
          </div>
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
