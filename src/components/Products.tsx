import { motion } from "motion/react";
import { useInView } from "motion/react";
import { useRef, useState, useEffect } from "react";
import { ArrowRight } from "lucide-react";
import { ref, get } from "firebase/database";
import { database } from "../firebase/config";

interface MachineProduct {
  id: string;
  title: string;
  description: string;
  category: string;
  image: string;
  capacity: string;
  power: string;
}

interface ProductsProps {
  onNavigate?: (page: string, productId?: string) => void;
}

export function Products({ onNavigate }: ProductsProps) {
  const ref_view = useRef(null);
  const isInView = useInView(ref_view, { once: true, margin: "-100px" });
  const [machines, setMachines] = useState<MachineProduct[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMachines = async () => {
      try {
        const machinesRef = ref(database, "machines");
        const snapshot = await get(machinesRef);

        if (snapshot.exists()) {
          const machinesObj = snapshot.val();
          const transformed = Object.entries(machinesObj).map(([key, value]: [string, any]) => ({
            id: key,
            title: value.title || "Untitled Machine",
            description: value.description || "",
            category: value.category || "Agricultural Machinery",
            image: value.imageUrl || "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&q=80",
            capacity: value.capacity || "N/A",
            power: value.power || "N/A",
          }));
          // Only show top 6 machines on home page
          setMachines(transformed.slice(0, 6));
        }
      } catch (error) {
        console.error("Error fetching machinery:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchMachines();
  }, []);

  return (
    <section id="products" ref={ref_view} className="py-24 bg-gradient-to-b from-white to-[#07D185]/5">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-[#043F43] mb-6 tracking-tight font-semibold">Our Machinery Range</h2>
          <div className="w-16 h-1 bg-[#07D185] mx-auto mb-8 rounded-full" />
          <p className="text-[#043F43] opacity-80 max-w-2xl mx-auto text-lg font-light">
            High-quality agricultural and food processing machinery for export.
          </p>
        </motion.div>

        {loading ? (
          <div className="flex justify-center items-center py-20">
            <div className="w-10 h-10 border-2 border-[#07D185]/20 border-t-[#07D185] rounded-full animate-spin"></div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {machines.map((machine, index) => (
              <motion.div
                key={machine.id}
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-500 border border-gray-100 group cursor-pointer"
                onClick={() => onNavigate?.("machinery-product-detail", machine.id)}
              >
                <div className="relative h-52 overflow-hidden bg-gray-50 flex items-center justify-center p-4">
                  <img
                    src={machine.image}
                    className="max-h-full w-auto object-contain group-hover:scale-105 transition-transform duration-700"
                    alt={machine.title}
                  />
                  <div className="absolute top-3 left-3">
                    <span className="px-3 py-1 bg-[#00D084] text-white text-[9px] font-bold rounded-md uppercase tracking-wider">{machine.category}</span>
                  </div>
                </div>
                <div className="p-5">
                  <h3 className="text-[#043F43] text-lg font-bold mb-2 line-clamp-1">{machine.title}</h3>
                  <p className="text-gray-500 text-[13px] leading-relaxed mb-4 line-clamp-2 font-light">{machine.description}</p>

                  <div className="grid grid-cols-2 gap-3 pt-4 border-t border-gray-100 mb-4">
                    <div>
                      <span className="block text-[9px] text-gray-400 uppercase font-bold tracking-wider mb-0.5">Capacity</span>
                      <span className="text-[#043F43] text-[13px] font-semibold">{machine.capacity}</span>
                    </div>
                    <div>
                      <span className="block text-[9px] text-gray-400 uppercase font-bold tracking-wider mb-0.5">Power</span>
                      <span className="text-[#043F43] text-[13px] font-semibold">{machine.power}</span>
                    </div>
                  </div>

                  <div className="text-[#00D084] font-bold text-[13px] flex items-center gap-1.5 group-hover:gap-2 transition-all">
                    View Full Specifications <ArrowRight size={14} />
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}

        <div className="mt-16 text-center">
          <button
            onClick={() => onNavigate?.("machinery-products")}
            className="inline-flex items-center gap-2 px-8 py-3 bg-[#043F43] text-white rounded-full hover:bg-[#043F43]/90 transition-all font-medium"
          >
            View All Machinery <ArrowRight size={18} />
          </button>
        </div>
      </div>
    </section>
  );
}
