import { Star, Lock, Filter } from "lucide-react";
import { reviews } from "@/data/mockData";

const tagConfig: Record<string, { label: string; class: string }> = {
  support_praise: { label: "Hỗ trợ", class: "tag-support" },
  bug_report: { label: "Bug", class: "tag-bug" },
  ux_issue: { label: "UX", class: "tag-ux" },
  feature_request: { label: "Tính năng", class: "tag-feature" },
  pricing_concern: { label: "Giá", class: "tag-pricing" },
};

const Stars = ({ rating }: { rating: number }) => (
  <div className="flex gap-0.5">
    {[1, 2, 3, 4, 5].map((s) => (
      <Star key={s} className={`w-3 h-3 ${s <= rating ? "fill-lmx-orange text-lmx-orange" : "text-border"}`} />
    ))}
  </div>
);

export default function ReviewsTab() {
  const visible = reviews.slice(0, 3);
  const remaining = reviews.length - 3;

  return (
    <div className="space-y-3">
      {/* Filter bar (locked) */}
      <div className="flex items-center gap-2 opacity-50 pointer-events-none">
        <Filter className="w-4 h-4 text-muted-foreground" />
        {["Rating", "Tag", "Sort"].map((f) => (
          <div key={f} className="bg-secondary rounded-md px-3 py-1.5 text-xs text-muted-foreground flex items-center gap-1">
            {f} <Lock className="w-2.5 h-2.5" />
          </div>
        ))}
      </div>

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

      {/* Locked remaining */}
      <div className="bg-secondary/50 rounded-lg border border-dashed border-primary/30 p-6 flex flex-col items-center justify-center gap-2">
        <Lock className="w-5 h-5 text-primary" />
        <p className="text-sm font-medium text-foreground">{remaining} review nữa</p>
        <button className="text-xs font-medium text-primary-foreground bg-primary px-4 py-1.5 rounded-full hover:opacity-90 transition-opacity">
          Đăng ký để xem tất cả →
        </button>
      </div>
    </div>
  );
}
