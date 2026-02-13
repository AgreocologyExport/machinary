import { motion } from "motion/react";
import { useInView } from "motion/react";
import { useRef } from "react";
import { MapPin } from "lucide-react";

export function ExportMap() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const regions = [
    { name: "North America", countries: "USA, Canada, Mexico" },
    { name: "Europe", countries: "UK, Germany, France, Netherlands" },
    { name: "Middle East", countries: "UAE, Saudi Arabia, Qatar" },
    { name: "Asia Pacific", countries: "Singapore, Malaysia, Australia" },
    { name: "Africa", countries: "South Africa, Kenya, Nigeria" }
  ];

  return (
    <section ref={ref} className="py-24 bg-[#043F43] text-white relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: `radial-gradient(circle at 2px 2px, white 1px, transparent 0)`,
          backgroundSize: '40px 40px'
        }} />
      </div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-white mb-6">Global Export Network</h2>
          <div className="w-16 h-1 bg-[#07D185] mx-auto mb-8 rounded-full" />
          <p className="text-white/80 max-w-2xl mx-auto">
            Delivering excellence across continents with a robust network spanning major markets worldwide.
          </p>
        </motion.div>

        {/* Simplified Map Visualization */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={isInView ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 1, delay: 0.3 }}
          className="relative mb-16"
        >
          <div className="bg-gradient-to-br from-[#07D185]/10 to-transparent rounded-3xl p-12 border border-[#07D185]/20">
            <div className="relative h-96 flex items-center justify-center">
              {/* Center Point */}
              <motion.div
                initial={{ scale: 0 }}
                animate={isInView ? { scale: 1 } : {}}
                transition={{ duration: 0.6, delay: 0.5 }}
                className="relative z-10"
              >
                <div className="w-16 h-16 rounded-full bg-[#07D185] flex items-center justify-center shadow-2xl">
                  <MapPin className="w-8 h-8 text-white" />
                </div>
                <div className="absolute inset-0 rounded-full bg-[#07D185] animate-ping opacity-20" />
              </motion.div>

              {/* Connection Lines */}
              {[0, 1, 2, 3, 4, 5, 6, 7].map((i) => (
                <motion.div
                  key={i}
                  initial={{ scale: 0 }}
                  animate={isInView ? { scale: 1 } : {}}
                  transition={{ duration: 0.8, delay: 0.7 + i * 0.1 }}
                  className="absolute"
                  style={{
                    width: '200px',
                    height: '2px',
                    background: 'linear-gradient(90deg, #07D185 0%, transparent 100%)',
                    transformOrigin: 'left center',
                    transform: `rotate(${i * 45}deg)`,
                    left: '50%',
                    top: '50%'
                  }}
                />
              ))}

              {/* Destination Points */}
              {[0, 72, 144, 216, 288].map((angle, i) => {
                const rad = (angle * Math.PI) / 180;
                const x = Math.cos(rad) * 180;
                const y = Math.sin(rad) * 180;
                
                return (
                  <motion.div
                    key={angle}
                    initial={{ scale: 0, opacity: 0 }}
                    animate={isInView ? { scale: 1, opacity: 1 } : {}}
                    transition={{ duration: 0.5, delay: 1 + i * 0.1 }}
                    className="absolute w-3 h-3 rounded-full bg-white"
                    style={{
                      left: `calc(50% + ${x}px)`,
                      top: `calc(50% + ${y}px)`,
                      transform: 'translate(-50%, -50%)'
                    }}
                  />
                );
              })}
            </div>
          </div>
        </motion.div>

        {/* Regions List */}
        <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-6">
          {regions.map((region, index) => (
            <motion.div
              key={region.name}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.8 + index * 0.1 }}
              className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10 hover:border-[#07D185]/50 transition-colors duration-300"
            >
              <div className="w-10 h-10 rounded-full bg-[#07D185]/20 flex items-center justify-center mb-4">
                <MapPin className="w-5 h-5 text-[#07D185]" />
              </div>
              <h4 className="text-white mb-2">{region.name}</h4>
              <p className="text-white/60 text-sm">{region.countries}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
