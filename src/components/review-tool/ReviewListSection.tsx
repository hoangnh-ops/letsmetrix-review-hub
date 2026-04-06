import { useState } from "react";
import { Star, Filter, ChevronLeft, ChevronRight } from "lucide-react";
import { reviews } from "@/data/mockData";

const tagConfig: Record<string, { label: string; class: string }> = {
  support_praise: { label: "Support", class: "tag-support" },
  bug_report: { label: "Bug", class: "tag-bug" },
  ux_issue: { label: "UX", class: "tag-ux" },
  feature_request: { label: "Feature", class: "tag-feature" },
  pricing_concern: { label: "Pricing", class: "tag-pricing" },
};

const Stars = ({ rating }: { rating: number }) => (
  <div className="flex gap-0.5">
    {[1, 2, 3, 4, 5].map((s) => (
      <Star key={s} className={`w-3 h-3 ${s <= rating ? "fill-lmx-orange text-lmx-orange" : "text-border"}`} />
    ))}
  </div>
);

const REVIEWS_PER_PAGE = 10;

// Expand mock data to have more reviews for pagination demo
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
    <div className="space-y-4 animate-fade-in-up">
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-semibold text-foreground">
          Reviews ({allReviews.length})
        </h3>
        <div className="flex items-center gap-2">
          <Filter className="w-4 h-4 text-muted-foreground" />
          {["Rating", "Tag", "Sort"].map((f) => (
            <div key={f} className="bg-secondary rounded-md px-3 py-1.5 text-xs text-muted-foreground cursor-pointer hover:text-foreground transition-colors">
              {f}
            </div>
          ))}
        </div>
      </div>

      <div className="space-y-3">
        {visible.map((review) => (
          <div key={review.id} className="bg-card rounded-lg border p-4 space-y-2">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Stars rating={review.rating} />
                <span className="text-xs text-muted-foreground">{review.date}</span>
              </div>
              <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                <span>{review.country}</span>
                <span>·</span>
                <span>{review.author}</span>
              </div>
            </div>
            <p className="text-sm text-foreground leading-relaxed">{review.content}</p>
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
