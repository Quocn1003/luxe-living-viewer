import { motion, AnimatePresence } from "framer-motion";
import { MapPin, Bed, Bath, Maximize } from "lucide-react";
import type { Project } from "@/data/projects";

interface ProjectInfoCardProps {
  project: Project;
}

const ProjectInfoCard = ({ project }: ProjectInfoCardProps) => {
  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={project.id}
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -30 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="glass-card rounded-sm p-4 sm:p-6 md:p-8 w-full max-w-xs sm:max-w-sm md:max-w-md"
      >
        <div className="space-y-4">
          {/* Location Tag */}
          <div className="flex items-center gap-2 text-muted-foreground">
            <MapPin size={14} className="text-gold" />
            <span className="text-sm tracking-wide">{project.location}</span>
          </div>
          
          {/* Project Name */}
          <h2 className="font-serif text-xl sm:text-2xl md:text-3xl lg:text-4xl text-foreground leading-tight">
            {project.name}
          </h2>
          
          {/* Price */}
          <p className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-serif text-gold font-medium">
            {project.price}
          </p>
          
          {/* Stats */}
          <div className="flex flex-wrap gap-3 sm:gap-4 md:gap-6 pt-2">
            <div className="flex items-center gap-1.5 sm:gap-2 text-muted-foreground">
              <Bed size={16} className="sm:w-[18px] sm:h-[18px]" />
              <span className="text-xs sm:text-sm">{project.bedrooms} Beds</span>
            </div>
            <div className="flex items-center gap-1.5 sm:gap-2 text-muted-foreground">
              <Bath size={16} className="sm:w-[18px] sm:h-[18px]" />
              <span className="text-xs sm:text-sm">{project.bathrooms} Baths</span>
            </div>
            <div className="flex items-center gap-1.5 sm:gap-2 text-muted-foreground">
              <Maximize size={16} className="sm:w-[18px] sm:h-[18px]" />
              <span className="text-xs sm:text-sm">{project.sqft.toLocaleString()} sqft</span>
            </div>
          </div>
          
          {/* Description - hidden on very small screens */}
          <p className="hidden sm:block text-muted-foreground text-xs sm:text-sm leading-relaxed pt-2">
            {project.description}
          </p>
          
          {/* CTA */}
          <div className="flex gap-2 sm:gap-3 pt-3 sm:pt-4">
            <button className="btn-gold text-xs sm:text-sm flex-1 py-2 sm:py-2.5">
              View Details
            </button>
            <button className="btn-outline-gold text-xs sm:text-sm py-2 sm:py-2.5 px-3 sm:px-4">
              Virtual Tour
            </button>
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
};

export default ProjectInfoCard;
