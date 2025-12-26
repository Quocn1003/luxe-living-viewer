import { useState, useEffect, useCallback } from "react";
import { motion } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import ProjectScene from "./ProjectScene";
import ProjectInfoCard from "./ProjectInfoCard";
import { projects } from "@/data/projects";

const HeroSection = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0);
  const [touchStart, setTouchStart] = useState<number | null>(null);

  const currentProject = projects[currentIndex];

  const goToNext = useCallback(() => {
    setDirection(1);
    setCurrentIndex((prev) => (prev + 1) % projects.length);
  }, []);

  const goToPrev = useCallback(() => {
    setDirection(-1);
    setCurrentIndex((prev) => (prev - 1 + projects.length) % projects.length);
  }, []);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") {
        goToNext();
      } else if (e.key === "ArrowLeft") {
        goToPrev();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [goToNext, goToPrev]);

  // Touch/swipe handlers
  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStart(e.touches[0].clientX);
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStart === null) return;

    const touchEnd = e.changedTouches[0].clientX;
    const diff = touchStart - touchEnd;

    if (Math.abs(diff) > 50) {
      if (diff > 0) {
        goToNext();
      } else {
        goToPrev();
      }
    }

    setTouchStart(null);
  };

  return (
    <section
      className="relative min-h-screen bg-background overflow-hidden pt-20 md:pt-24"
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-cream via-background to-secondary opacity-50" />

      <div className="relative z-10 container mx-auto px-4 md:px-6 min-h-[calc(100vh-5rem)] md:min-h-[calc(100vh-6rem)] flex flex-col">
        {/* Top tagline */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-center mb-4 md:mb-6"
        >
          <span className="text-xs md:text-sm tracking-[0.2em] md:tracking-[0.3em] uppercase text-muted-foreground">
            Exclusive Properties
          </span>
        </motion.div>

        {/* Main content */}
        <div className="flex-1 grid lg:grid-cols-2 gap-4 md:gap-8 items-center">
          {/* Left: Project Info with Navigation Arrows */}
          <div className="order-2 lg:order-1 flex items-center justify-center gap-3 md:gap-6">
            {/* Left Arrow */}
            <motion.button
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              onClick={goToPrev}
              className="w-12 h-12 md:w-16 md:h-16 rounded-full bg-gold/90 hover:bg-gold flex items-center justify-center text-background shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 flex-shrink-0"
              aria-label="Previous project"
            >
              <ChevronLeft className="w-6 h-6 md:w-8 md:h-8" />
            </motion.button>

            {/* Project Card */}
            <ProjectInfoCard project={currentProject} />

            {/* Right Arrow */}
            <motion.button
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              onClick={goToNext}
              className="w-12 h-12 md:w-16 md:h-16 rounded-full bg-gold/90 hover:bg-gold flex items-center justify-center text-background shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 flex-shrink-0"
              aria-label="Next project"
            >
              <ChevronRight className="w-6 h-6 md:w-8 md:h-8" />
            </motion.button>
          </div>

          {/* Right: 3D Scene */}
          <div className="order-1 lg:order-2 h-[250px] sm:h-[300px] md:h-[400px] lg:h-[500px]">
            <ProjectScene project={currentProject} direction={direction} />
          </div>
        </div>

        {/* Bottom: Dot indicators only */}
        <div className="py-4 md:py-6 flex justify-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="flex items-center gap-4"
          >
            {/* Dots */}
            <div className="flex gap-2 md:gap-3">
              {projects.map((_, index) => (
                <button
                  key={index}
                  onClick={() => {
                    setDirection(index > currentIndex ? 1 : -1);
                    setCurrentIndex(index);
                  }}
                  className={`h-2 rounded-full transition-all duration-300 ${
                    index === currentIndex
                      ? "w-6 md:w-8 bg-gold"
                      : "w-2 bg-border hover:bg-muted-foreground"
                  }`}
                  aria-label={`Go to project ${index + 1}`}
                />
              ))}
            </div>

            {/* Keyboard hint - desktop only */}
            <div className="hidden lg:flex items-center gap-2 ml-4 text-muted-foreground text-xs">
              <kbd className="px-2 py-1 rounded bg-muted border border-border">←</kbd>
              <kbd className="px-2 py-1 rounded bg-muted border border-border">→</kbd>
              <span className="ml-1">to navigate</span>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Decorative elements */}
      <div className="absolute bottom-0 left-0 w-32 md:w-64 h-32 md:h-64 bg-gold/5 rounded-full blur-3xl" />
      <div className="absolute top-1/4 right-0 w-48 md:w-96 h-48 md:h-96 bg-gold/5 rounded-full blur-3xl" />
    </section>
  );
};

export default HeroSection;
