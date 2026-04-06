import { Bell } from "lucide-react";

export default function GetNotifiedSection() {
  return (
    <div className="bg-card rounded-lg border p-6 animate-fade-in-up">
      <div className="flex flex-col sm:flex-row items-center gap-4 max-w-lg mx-auto text-center sm:text-left">
        <div className="w-12 h-12 rounded-full bg-lmx-danger/10 flex items-center justify-center flex-shrink-0">
          <Bell className="w-6 h-6 text-lmx-danger" />
        </div>
        <div className="flex-1">
          <h3 className="text-sm font-semibold text-foreground">
            Get Notified When Negative Reviews Spike
          </h3>
          <p className="text-xs text-muted-foreground mt-0.5">
            Free — takes 10 seconds to set up
          </p>
        </div>
        <button className="flex items-center gap-1.5 bg-primary text-primary-foreground text-sm font-medium px-5 py-2.5 rounded-full hover:opacity-90 transition-opacity whitespace-nowrap flex-shrink-0">
          Get Notified →
        </button>
      </div>
    </div>
  );
}
