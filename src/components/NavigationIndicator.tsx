import { motion } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface NavigationIndicatorProps {
  currentIndex: number;
  totalCount: number;
  onPrev: () => void;
  onNext: () => void;
}

const NavigationIndicator = ({
  currentIndex,
  totalCount,
  onPrev,
  onNext,
}: NavigationIndicatorProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.4 }}
      className="flex items-center gap-6"
    >
      {/* Prev Button */}
      <button
        onClick={onPrev}
        className="w-12 h-12 rounded-full border border-border flex items-center justify-center text-muted-foreground hover:text-gold hover:border-gold transition-colors duration-300"
        aria-label="Previous project"
      >
        <ChevronLeft size={20} />
      </button>

      {/* Dots */}
      <div className="flex gap-3">
        {Array.from({ length: totalCount }).map((_, index) => (
          <div
            key={index}
            className={`h-2 rounded-full transition-all duration-300 ${
              index === currentIndex
                ? "w-8 bg-gold"
                : "w-2 bg-border hover:bg-muted-foreground"
            }`}
          />
        ))}
      </div>

      {/* Next Button */}
      <button
        onClick={onNext}
        className="w-12 h-12 rounded-full border border-border flex items-center justify-center text-muted-foreground hover:text-gold hover:border-gold transition-colors duration-300"
        aria-label="Next project"
      >
        <ChevronRight size={20} />
      </button>

      {/* Keyboard hint */}
      <div className="hidden md:flex items-center gap-2 ml-4 text-muted-foreground text-xs">
        <kbd className="px-2 py-1 rounded bg-muted border border-border">←</kbd>
        <kbd className="px-2 py-1 rounded bg-muted border border-border">→</kbd>
        <span className="ml-1">to navigate</span>
      </div>
    </motion.div>
  );
};

export default NavigationIndicator;
