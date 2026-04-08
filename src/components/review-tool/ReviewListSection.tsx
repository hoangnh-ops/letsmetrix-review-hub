import { useState } from "react";
import { Star, ChevronLeft, ChevronRight, Download } from "lucide-react";
import { reviews } from "@/data/mockData";

const tagConfig: Record<string, { label: string; class: string }> = {
  support_praise: { label: "Great Support", class: "tag-support" },
  bug_report: { label: "Pixel Not Firing", class: "tag-bug" },
  ux_issue: { label: "Easy Setup", class: "tag-ux" },
  feature_request: { label: "Feature", class: "tag-feature" },
  pricing_concern: { label: "Good Feed Quality", class: "tag-pricing" },
};

const Stars = ({ rating }: { rating: number }) => (
  <div className="flex gap-0.5">
    {[1, 2, 3, 4, 5].map((s) => (
      <Star key={s} className={`w-3.5 h-3.5 ${s <= rating ? "fill-lmx-orange text-lmx-orange" : "text-border"}`} />
    ))}
  </div>
);

const REVIEWS_PER_PAGE = 10;

// Expand mock data
const allReviews = [
  ...reviews,
  ...reviews.map((r, i) => ({ ...r, id: r.id + 100 + i, date: "Mar 10, 2026" })),
];

export default function ReviewListSection() {
  const [page, setPage] = useState(1);
  const totalPages = Math.ceil(allReviews.length / REVIEWS_PER_PAGE);
  const startIdx = (page - 1) * REVIEWS_PER_PAGE;
  const visible = allReviews.slice(startIdx, startIdx + REVIEWS_PER_PAGE);

  return (
    <div className="bg-card rounded-lg border p-5 space-y-4 animate-fade-in-up">
      <div>
        <h3 className="text-base font-bold text-foreground">Review list</h3>
        <p className="text-xs text-muted-foreground mt-0.5">{allReviews.length} Reviews</p>
      </div>

      {/* Filter bar */}
      <div className="flex items-center gap-2 flex-wrap">
        <select className="text-xs border rounded-md px-2.5 py-1.5 bg-card text-foreground">
          <option>Sort: Most recent</option>
          <option>Sort: Highest rated</option>
          <option>Sort: Lowest rated</option>
        </select>
        <select className="text-xs border rounded-md px-2.5 py-1.5 bg-card text-foreground">
          <option>Status: All</option>
          <option>Active</option>
          <option>Archived</option>
          <option>Deleted</option>
        </select>
        <select className="text-xs border rounded-md px-2.5 py-1.5 bg-card text-foreground">
          <option>Rating: All</option>
          <option>5 stars</option>
          <option>4 stars</option>
          <option>3 stars</option>
          <option>2 stars</option>
          <option>1 star</option>
        </select>
        <input type="date" className="text-xs border rounded-md px-2.5 py-1.5 bg-card text-muted-foreground" />
        <input type="date" className="text-xs border rounded-md px-2.5 py-1.5 bg-card text-muted-foreground" />
        <button className="ml-auto flex items-center gap-1.5 text-xs font-medium border rounded-md px-3 py-1.5 hover:bg-secondary transition-colors text-foreground">
          <Download className="w-3.5 h-3.5" /> Export Reviews
        </button>
      </div>

      {/* Review cards */}
      <div className="divide-y">
        {visible.map((review) => (
          <div key={review.id} className="py-4 first:pt-0 last:pb-0 space-y-2">
            <div className="flex items-center justify-between">
              <Stars rating={review.rating} />
              <div className="flex items-center gap-2 text-xs text-muted-foreground">
                <span className="text-lmx-success font-medium">Active</span>
                <span>{review.date}</span>
              </div>
            </div>
            <p className="text-sm text-foreground leading-relaxed">{review.content}</p>
            <div className="flex items-center justify-between">
              <span className="text-xs text-muted-foreground">
                {review.author} · {review.country}
              </span>
              <div className="flex gap-1.5 flex-wrap">
                {review.tags.map((tag) => {
                  const cfg = tagConfig[tag];
                  return cfg ? (
                    <span key={tag} className={`text-[10px] font-medium px-2 py-0.5 rounded-full ${cfg.class}`}>
                      {cfg.label}
                    </span>
                  ) : null;
                })}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex items-center justify-center gap-2 pt-2">
          <button
            onClick={() => setPage(p => Math.max(1, p - 1))}
            disabled={page === 1}
            className="w-8 h-8 rounded-md border flex items-center justify-center text-muted-foreground hover:text-foreground disabled:opacity-30 transition-colors"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>
          {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
            <button
              key={p}
              onClick={() => setPage(p)}
              className={`w-8 h-8 rounded-md text-xs font-medium transition-colors ${
                p === page
                  ? "bg-primary text-primary-foreground"
                  : "border text-muted-foreground hover:text-foreground"
              }`}
            >
              {p}
            </button>
          ))}
          <button
            onClick={() => setPage(p => Math.min(totalPages, p + 1))}
            disabled={page === totalPages}
            className="w-8 h-8 rounded-md border flex items-center justify-center text-muted-foreground hover:text-foreground disabled:opacity-30 transition-colors"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      )}
    </div>
  );
}
