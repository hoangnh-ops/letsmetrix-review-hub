import { ExternalLink } from "lucide-react";

export default function CrossSellStrip() {
  return (
    <div className="bg-foreground rounded-lg p-6 flex flex-col sm:flex-row items-center justify-between gap-4 animate-fade-in-up">
      <div className="text-center sm:text-left">
        <p className="text-sm font-semibold text-primary-foreground">Track app này + 12,400 app khác trên letsmetrix</p>
        <p className="text-xs text-primary-foreground/60 mt-1">Nhận thông báo khi có thay đổi review, rating spike, và nhiều hơn nữa.</p>
      </div>
      <button className="flex items-center gap-1.5 bg-primary text-primary-foreground text-sm font-medium px-5 py-2.5 rounded-full hover:opacity-90 transition-opacity whitespace-nowrap">
        Đăng ký miễn phí <ExternalLink className="w-3.5 h-3.5" />
      </button>
    </div>
  );
}
