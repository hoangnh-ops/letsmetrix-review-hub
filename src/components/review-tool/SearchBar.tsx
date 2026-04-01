import { Search, ArrowRight } from "lucide-react";

export default function SearchBar() {
  return (
    <div className="relative">
      <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
      <input
        type="text"
        placeholder="Search for another app..."
        className="w-full pl-10 pr-10 py-2.5 text-sm bg-secondary rounded-lg border-0 outline-none focus:ring-2 focus:ring-primary/30 text-foreground placeholder:text-muted-foreground"
      />
      <button className="absolute right-2 top-1/2 -translate-y-1/2 w-7 h-7 rounded-full bg-primary flex items-center justify-center hover:opacity-90 transition-opacity">
        <ArrowRight className="w-3.5 h-3.5 text-primary-foreground" />
      </button>
    </div>
  );
}
