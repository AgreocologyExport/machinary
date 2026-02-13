import { motion } from "motion/react";
import { ArrowRight } from "lucide-react";
import { Button } from "./ui/button";

interface HeroProps {
  onNavigate: (page: string, id?: any) => void;
  title?: string;
  subtitle?: string;
  backgroundImage?: string;
}

export function Hero({
  onNavigate,
  title = "Agreocology",
  subtitle = "Beyond Agriculture. Beyond Boundaries.",
  backgroundImage = "https://plus.unsplash.com/premium_photo-1661881416333-f75746261454"
}: HeroProps) {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-white via-gray-50 to-white">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 z-0">
        <div
          className="absolute inset-0 bg-cover bg-center opacity-[0.35]"
          style={{
            backgroundImage: `url('${backgroundImage}')`
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-white/65 via-white/25 to-white/65" />
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 py-20 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          {/* Main Title */}
          <h1 className="text-[#043F43] mb-6 text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-normal tracking-tight">
            {title}
          </h1>

          {/* Subtitle */}
          <motion.p
            className="text-[#043F43] text-lg sm:text-xl md:text-2xl mb-12 font-light tracking-tight"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.8 }}
          >
            {subtitle}
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            className="flex flex-col sm:flex-row gap-4 justify-center items-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.8 }}
          >
            <Button
              className="bg-[#07D185] hover:bg-[#06B872] text-white px-8 py-5 text-base rounded-full shadow-lg hover:shadow-xl transition-all duration-300 font-medium group"
              onClick={() => onNavigate("machinery-products")}
            >
              Explore Products
              <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Button>
            <Button
              variant="outline"
              className="border-2 border-[#043F43] text-[#043F43] hover:bg-[#043F43] hover:text-white px-8 py-5 text-base rounded-full transition-all duration-300 font-medium bg-white/10"
              onClick={() => onNavigate("contact")}
            >
              Contact Export Team
            </Button>
          </motion.div>
        </motion.div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        className="absolute bottom-6 left-1/2 transform -translate-x-1/2"
        animate={{ y: [0, 8, 0] }}
        transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
      >
        <div className="w-5 h-9 border-2 border-[#043F43] rounded-full flex items-start justify-center p-1.5">
          <motion.div
            className="w-1.5 h-1.5 bg-[#07D185] rounded-full"
            animate={{ y: [0, 10, 0] }}
            transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
          />
        </div>
      </motion.div>
    </section>
  );
}