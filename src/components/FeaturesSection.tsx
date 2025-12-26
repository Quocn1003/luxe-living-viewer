import { motion } from "framer-motion";
import {
  Shield,
  Wifi,
  Car,
  Wind,
  Droplets,
  Sun,
  Lock,
  Sparkles,
} from "lucide-react";

const features = [
  {
    icon: Shield,
    title: "24/7 Security",
    description: "State-of-the-art surveillance and dedicated security personnel.",
  },
  {
    icon: Wifi,
    title: "Smart Home",
    description: "Fully integrated automation for lighting, climate, and entertainment.",
  },
  {
    icon: Car,
    title: "Private Parking",
    description: "Secure underground parking with EV charging stations.",
  },
  {
    icon: Wind,
    title: "Climate Control",
    description: "Individual zone HVAC systems with air purification.",
  },
  {
    icon: Droplets,
    title: "Spa & Wellness",
    description: "Heated pools, saunas, and private wellness facilities.",
  },
  {
    icon: Sun,
    title: "Natural Light",
    description: "Floor-to-ceiling windows maximizing natural illumination.",
  },
  {
    icon: Lock,
    title: "Privacy",
    description: "Exclusive access and soundproofed residences.",
  },
  {
    icon: Sparkles,
    title: "Concierge",
    description: "White-glove service available around the clock.",
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: "easeOut" as const,
    },
  },
};

const FeaturesSection = () => {
  return (
    <section className="py-24 bg-secondary/30">
      <div className="container mx-auto px-6">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="text-sm tracking-[0.3em] uppercase text-gold mb-4 block">
            Premium Amenities
          </span>
          <h2 className="font-serif text-4xl md:text-5xl text-foreground mb-4">
            Apartment Features
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Every detail has been thoughtfully curated to provide an unparalleled
            living experience.
          </p>
        </motion.div>

        {/* Features Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {features.map((feature) => (
            <motion.div
              key={feature.title}
              variants={itemVariants}
              className="group p-6 bg-background rounded-sm border border-border hover:border-gold/30 transition-all duration-300 hover:shadow-lg"
            >
              <div className="w-12 h-12 rounded-sm bg-gold/10 flex items-center justify-center mb-4 group-hover:bg-gold/20 transition-colors duration-300">
                <feature.icon className="text-gold" size={24} />
              </div>
              <h3 className="font-serif text-xl text-foreground mb-2">
                {feature.title}
              </h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default FeaturesSection;
