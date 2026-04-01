import { useState } from "react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import AppInfoSidebar from "@/components/review-tool/AppInfoSidebar";
import StrengthsWeaknesses from "@/components/review-tool/StrengthsWeaknesses";
import FeatureRequestsTab from "@/components/review-tool/FeatureRequestsTab";
import ActionItemsTab from "@/components/review-tool/ActionItemsTab";
import ReviewsTab from "@/components/review-tool/ReviewsTab";
import ReviewStatsTab from "@/components/review-tool/ReviewStatsTab";
import CrossSellStrip from "@/components/review-tool/CrossSellStrip";
import SearchBar from "@/components/review-tool/SearchBar";
import { appInfo } from "@/data/mockData";

export default function Index() {
  return (
    <div className="min-h-screen bg-background">
      {/* Top bar */}
      <header className="border-b bg-card sticky top-0 z-30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3 flex items-center gap-4">
          <a href="/" className="flex items-center gap-1.5 flex-shrink-0">
            <span className="text-sm font-extrabold tracking-tight text-foreground">LETS</span>
            <span className="text-sm font-extrabold tracking-tight text-primary">METRIX</span>
          </a>
          <div className="flex-1 max-w-lg">
            <SearchBar />
          </div>
          <div className="hidden sm:flex items-center gap-3 text-xs">
            <a href="#" className="text-muted-foreground hover:text-foreground transition-colors">Login</a>
            <a href="#" className="bg-primary text-primary-foreground px-4 py-1.5 rounded-full font-medium hover:opacity-90 transition-opacity">
              Get Started
            </a>
          </div>
        </div>
      </header>

      {/* Main layout */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 py-6">
        {/* Breadcrumb */}
        <nav className="text-xs text-muted-foreground mb-4 flex items-center gap-1.5">
          <a href="#" className="hover:text-foreground transition-colors">Apps</a>
          <span>/</span>
          <a href="#" className="hover:text-foreground transition-colors">{appInfo.category}</a>
          <span>/</span>
          <span className="text-foreground font-medium">{appInfo.name}</span>
        </nav>

        <div className="flex flex-col lg:flex-row gap-6">
          {/* Sidebar */}
          <AppInfoSidebar />

          {/* Main content */}
          <div className="flex-1 min-w-0 space-y-6">
            {/* B1: Strengths/Weaknesses */}
            <StrengthsWeaknesses />

            {/* Tabs */}
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
                  Thống kê trạng thái
                  <span className="ml-1 text-[9px] font-bold bg-primary text-primary-foreground px-1 py-0.5 rounded">MỚI</span>
                </TabsTrigger>
              </TabsList>
              <div className="mt-4">
                <TabsContent value="features"><FeatureRequestsTab /></TabsContent>
                <TabsContent value="actions"><ActionItemsTab /></TabsContent>
                <TabsContent value="reviews"><ReviewsTab /></TabsContent>
                <TabsContent value="stats"><ReviewStatsTab /></TabsContent>
              </div>
            </Tabs>

            {/* Cross-sell */}
            <CrossSellStrip />
          </div>
        </div>
      </main>
    </div>
  );
}
