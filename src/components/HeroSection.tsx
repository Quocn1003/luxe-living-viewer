import { useState, useEffect, useCallback } from "react";
import { motion } from "framer-motion";
import ProjectScene from "./ProjectScene";
import ProjectInfoCard from "./ProjectInfoCard";
import NavigationIndicator from "./NavigationIndicator";
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
      className="relative min-h-screen bg-background overflow-hidden pt-24"
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-cream via-background to-secondary opacity-50" />

      <div className="relative z-10 container mx-auto px-6 h-[calc(100vh-6rem)] flex flex-col">
        {/* Top tagline */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-center mb-4"
        >
          <span className="text-sm tracking-[0.3em] uppercase text-muted-foreground">
            Exclusive Properties
          </span>
        </motion.div>

        {/* Main content */}
        <div className="flex-1 grid lg:grid-cols-2 gap-8 items-center">
          {/* Left: Project Info */}
          <div className="order-2 lg:order-1 flex flex-col justify-center">
            <ProjectInfoCard project={currentProject} />
          </div>

          {/* Right: 3D Scene */}
          <div className="order-1 lg:order-2 h-[300px] md:h-[400px] lg:h-[500px]">
            <ProjectScene project={currentProject} direction={direction} />
          </div>
        </div>

        {/* Bottom navigation */}
        <div className="py-8 flex justify-center">
          <NavigationIndicator
            currentIndex={currentIndex}
            totalCount={projects.length}
            onPrev={goToPrev}
            onNext={goToNext}
          />
        </div>
      </div>

      {/* Decorative elements */}
      <div className="absolute bottom-0 left-0 w-64 h-64 bg-gold/5 rounded-full blur-3xl" />
      <div className="absolute top-1/4 right-0 w-96 h-96 bg-gold/5 rounded-full blur-3xl" />
    </section>
  );
};

export default HeroSection;
