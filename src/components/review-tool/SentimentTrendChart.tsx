import { useState } from "react";
import { Lock } from "lucide-react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

const sentimentData = [
  { month: "Oct", positive: 145, neutral: 32, negative: 18 },
  { month: "Nov", positive: 158, neutral: 28, negative: 22 },
  { month: "Dec", positive: 132, neutral: 35, negative: 28 },
  { month: "Jan", positive: 167, neutral: 30, negative: 15 },
  { month: "Feb", positive: 172, neutral: 25, negative: 20 },
  { month: "Mar", positive: 155, neutral: 38, negative: 35 },
];

const periods = [
  { key: "30d", label: "30d", locked: false },
  { key: "90d", label: "90d", locked: false },
  { key: "6m", label: "6m", locked: true },
  { key: "1y", label: "1y", locked: true },
  { key: "all", label: "All", locked: true },
];

export default function SentimentTrendChart() {
  const [activePeriod, setActivePeriod] = useState("90d");

  return (
    <div className="bg-card rounded-lg border p-5 space-y-4 animate-fade-in-up">
      <div className="flex items-center justify-between flex-wrap gap-2">
        <h3 className="text-sm font-semibold text-foreground">Sentiment Trend</h3>
        <div className="flex items-center gap-1">
          {periods.map((p) => (
            <button
              key={p.key}
              onClick={() => !p.locked && setActivePeriod(p.key)}
              disabled={p.locked}
              className={`text-xs px-3 py-1 rounded-md transition-colors flex items-center gap-1 ${
                activePeriod === p.key
                  ? "bg-primary text-primary-foreground"
                  : p.locked
                  ? "bg-secondary text-muted-foreground/50 cursor-not-allowed"
                  : "bg-secondary text-muted-foreground hover:text-foreground"
              }`}
              title={p.locked ? "Sign up to unlock" : ""}
            >
              {p.label}
              {p.locked && <Lock className="w-2.5 h-2.5" />}
            </button>
          ))}
        </div>
      </div>

      <div className="h-64">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={sentimentData} margin={{ top: 5, right: 10, left: -10, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
            <XAxis dataKey="month" tick={{ fontSize: 11 }} stroke="hsl(var(--muted-foreground))" />
            <YAxis tick={{ fontSize: 11 }} stroke="hsl(var(--muted-foreground))" />
            <Tooltip
              contentStyle={{
                backgroundColor: "hsl(var(--card))",
                border: "1px solid hsl(var(--border))",
                borderRadius: "8px",
                fontSize: "12px",
              }}
            />
            <Legend
              iconType="circle"
              iconSize={8}
              wrapperStyle={{ fontSize: "11px" }}
            />
            <Line
              type="monotone"
              dataKey="positive"
              stroke="#22c55e"
              strokeWidth={2}
              dot={{ r: 3 }}
              activeDot={{ r: 5 }}
              name="Positive"
            />
            <Line
              type="monotone"
              dataKey="neutral"
              stroke="#f59e0b"
              strokeWidth={2}
              dot={{ r: 3 }}
              activeDot={{ r: 5 }}
              name="Neutral"
            />
            <Line
              type="monotone"
              dataKey="negative"
              stroke="#ef4444"
              strokeWidth={2}
              dot={{ r: 3 }}
              activeDot={{ r: 5 }}
              name="Negative"
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
