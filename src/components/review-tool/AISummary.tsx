import { Brain } from "lucide-react";

export default function AISummary() {
  return (
    <div className="bg-card rounded-lg border border-l-4 border-l-primary p-5 space-y-3 animate-fade-in-up" style={{ animationDelay: "0.05s" }}>
      <div className="flex items-center gap-2">
        <Brain className="w-4 h-4 text-primary" />
        <h3 className="text-sm font-semibold text-foreground">AI Summary</h3>
        <span className="text-[10px] font-bold bg-primary/10 text-primary px-2 py-0.5 rounded-full">
          Based on {(2257).toLocaleString()} reviews
        </span>
      </div>
      <div className="text-sm text-foreground leading-relaxed space-y-2">
        <p>
          Overall, users have a highly positive perception of JETVEO, praising its responsive customer support and intuitive interface.
        </p>
        <p>
          The app's seamless Shopify integration and competitive pricing are frequently highlighted as key strengths, with many users noting the fast setup process.
        </p>
        <p>
          However, a significant portion of recent reviews mention difficulties with the initial setup wizard, and some users report slow page loading speeds that impact their workflow.
        </p>
        <p>
          There is a notable spike in complaints about setup complexity over the past 30 days, which warrants immediate attention.
        </p>
      </div>
    </div>
  );
}
