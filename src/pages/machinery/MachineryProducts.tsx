import { motion } from "motion/react";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowRight, Settings } from "lucide-react";
import { ref, get } from "firebase/database";
import { database } from "../../firebase/config";

interface MachineProduct {
    id: string;
    title: string;
    description: string;
    category: string;
    image: string;
    capacity: string;
    power: string;
}

export function MachineryProducts() {
    const [machines, setMachines] = useState<MachineProduct[]>([]);
    const [filteredMachines, setFilteredMachines] = useState<MachineProduct[]>([]);
    const [loading, setLoading] = useState(true);
    const [activeCategory, setActiveCategory] = useState("All");
    const navigate = useNavigate();

    const categories = ["All", "Agricultural Machinery", "Food Processing Machines", "Packaging Machines"];

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
                    setMachines(transformed);
                    setFilteredMachines(transformed);
                }
            } catch (error) {
                console.error("Error fetching machinery:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchMachines();
    }, []);

    useEffect(() => {
        if (activeCategory === "All") {
            setFilteredMachines(machines);
        } else {
            setFilteredMachines(machines.filter((m: MachineProduct) => m.category === activeCategory));
        }
    }, [activeCategory, machines]);

    return (
        <div className="min-h-screen bg-white font-['Poppins']">
            {/* Hero Section */}
            <section className="relative py-28 bg-[#043F43] text-center overflow-hidden">
                <div className="max-w-7xl mx-auto px-6 relative z-10">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                    >
                        <h1 className="text-white text-4xl sm:text-5xl md:text-6xl font-bold mb-6 tracking-tight">
                            Our Machinery Range
                        </h1>
                        <p className="text-white/80 text-lg sm:text-xl max-w-2xl mx-auto font-light">
                            High-quality agricultural and food processing machinery for export
                        </p>
                    </motion.div>
                </div>
            </section>

            {/* Filter Section */}
            <section className="py-20 bg-gray-50/50">
                <div className="max-w-7xl mx-auto px-6">
                    <div className="flex flex-col gap-6 items-center">
                        <div className="flex items-center gap-2 text-gray-500 font-medium text-sm">
                            <span className="flex items-center gap-2"><Settings size={18} /> Filter by Category</span>
                        </div>
                        <div className="flex flex-wrap gap-3 justify-center">
                            {categories.map((cat) => (
                                <button
                                    key={cat}
                                    onClick={() => setActiveCategory(cat)}
                                    className={`px-6 py-2 rounded-full text-sm font-medium transition-all duration-300 ${activeCategory === cat
                                        ? "bg-[#00D084] text-white shadow-md shadow-[#00D084]/20"
                                        : "bg-white text-gray-600 border border-gray-200 hover:border-[#00D084]/50 hover:bg-[#00D084]/5"
                                        }`}
                                >
                                    {cat}
                                </button>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* Products Grid */}
            <section className="py-16 pb-32">
                <div className="max-w-7xl mx-auto px-6">
                    {loading ? (
                        <div className="flex justify-center items-center h-64">
                            <div className="w-10 h-10 border-2 border-[#00D084]/20 border-t-[#00D084] rounded-full animate-spin"></div>
                        </div>
                    ) : filteredMachines.length === 0 ? (
                        <div className="text-center py-20 text-gray-500">
                            No products found in this category.
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {filteredMachines.map((machine, idx) => (
                                <motion.div
                                    key={machine.id}
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: idx * 0.05 }}
                                    onClick={() => navigate(`/Agreocology/products/${machine.id}`)}
                                    className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-500 border border-gray-100 group text-left cursor-pointer"
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

                                        <button
                                            className="text-[#00D084] font-bold text-[13px] flex items-center gap-1.5 hover:gap-2 transition-all p-0"
                                        >
                                            View Full Specifications <ArrowRight size={14} />
                                        </button>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    )}
                </div>
            </section>
        </div>
    );
}

export default MachineryProducts;
