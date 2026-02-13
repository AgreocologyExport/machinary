import { useState, useEffect } from "react";
import { motion } from "motion/react";
import { ArrowRight, Settings, CheckCircle, Shield, Cog, Cpu } from "lucide-react";
import { useNavigate } from "react-router-dom";
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

export function MachineryHome() {
    const navigate = useNavigate();
    const [featuredMachines, setFeaturedMachines] = useState<MachineProduct[]>([]);
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
                    // Show latest 3 machines
                    setFeaturedMachines(transformed.reverse().slice(0, 3));
                }
            } catch (error) {
                console.error("Error fetching machinery for home:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchMachines();
    }, []);

    return (
        <div className="min-h-screen bg-white font-['Helvetica']">
            {/* Hero Section - MATCH IMAGE */}
            <section className="relative h-[85vh] min-h-[600px] w-full flex items-center overflow-hidden">
                {/* Background Image with Overlay */}
                <div className="absolute inset-0">
                    <img
                        src="https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&q=80"
                        className="w-full h-full object-cover"
                        alt="Agricultural Machinery Technical Background"
                    />
                    <div className="absolute inset-0 bg-[#043F43]/70 backdrop-blur-[2px]" />
                    {/* Subtle overlay gradient */}
                    <div className="absolute inset-0 bg-gradient-to-r from-[#043F43] via-transparent to-transparent" />
                </div>

                <div className="max-w-7xl mx-auto px-6 relative z-10 w-full">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                        className="max-w-4xl"
                    >
                        <h1 className="text-white text-4xl sm:text-5xl lg:text-[70px] font-semibold leading-[1.1] mb-8 tracking-tight lg:whitespace-nowrap">
                            Agricultural Machinery <br />
                            For Global Markets
                        </h1>
                        <p className="text-white/90 text-lg sm:text-xl mb-12 font-normal max-w-2xl leading-relaxed tracking-wide">
                            Premium agricultural and food processing machinery exported worldwide
                        </p>

                        <div className="flex flex-wrap gap-6">
                            <motion.button
                                onClick={() => navigate('/Agreocology/products')}
                                whileHover={{ scale: 1.05, backgroundColor: "#05b36d" }}
                                whileTap={{ scale: 0.95 }}
                                className="px-12 py-5 bg-[#00D084] text-white rounded-xl font-bold flex items-center gap-3 shadow-2xl shadow-[#00D084]/40"
                            >
                                Explore Products <ArrowRight size={22} />
                            </motion.button>

                            <motion.button
                                onClick={() => navigate('/Agreocology/contact')}
                                whileHover={{ scale: 1.05, backgroundColor: "rgba(255,255,255,0.1)" }}
                                whileTap={{ scale: 0.95 }}
                                className="px-12 py-5 bg-transparent border-2 border-white text-white rounded-xl font-bold flex items-center gap-3 transition-all"
                            >
                                Request Quote
                            </motion.button>
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* Advanced Machinery Solutions Section - COMPACT */}
            <section className="py-16 bg-white">
                <div className="max-w-7xl mx-auto px-6 text-center">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="mb-12"
                    >
                        <h2 className="text-[#043F43] text-3xl sm:text-4xl font-semibold mb-4">
                            Advanced Machinery Solutions for Modern Agriculture
                        </h2>
                        <p className="text-gray-500 text-base max-w-3xl mx-auto leading-relaxed">
                            We export high-quality agricultural machinery, food processing equipment, and packaging machines to help businesses worldwide improve efficiency and productivity.
                        </p>
                    </motion.div>

                    <div className="grid md:grid-cols-3 gap-10">
                        {[
                            {
                                title: "Quality Equipment",
                                desc: "Manufactured using advanced technology and quality materials"
                            },
                            {
                                title: "Certified Standards",
                                desc: "CE, ISO certified equipment meeting international standards"
                            },
                            {
                                title: "After-Sales Support",
                                desc: "Comprehensive warranty and technical support services"
                            },
                        ].map((feature, idx) => (
                            <motion.div
                                key={idx}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: idx * 0.1 }}
                                className="flex flex-col items-center group"
                            >
                                <div className="w-14 h-14 bg-[#00D084] rounded-full mb-6 flex items-center justify-center shadow-lg shadow-[#00D084]/20 transition-transform group-hover:scale-110 duration-300" />
                                <h3 className="text-[#043F43] text-xl font-semibold mb-3">{feature.title}</h3>
                                <p className="text-gray-500 text-sm leading-relaxed max-w-xs">{feature.desc}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Featured Machinery Section - COMPACT */}
            <section className="py-16 bg-[#f8fafc]">
                <div className="max-w-7xl mx-auto px-6">
                    <div className="text-center mb-12">
                        <h2 className="text-[#043F43] text-3xl sm:text-4xl font-semibold mb-4">Featured Machinery</h2>
                        <p className="text-gray-500 text-base">Explore our range of agricultural and processing equipment</p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
                        {loading ? (
                            Array(3).fill(0).map((_, i) => (
                                <div key={i} className="bg-gray-100 animate-pulse rounded-xl h-[400px]" />
                            ))
                        ) : featuredMachines.length > 0 ? (
                            featuredMachines.map((product, idx) => (
                                <motion.div
                                    key={product.id}
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: idx * 0.1 }}
                                    className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-500 border border-gray-100 group"
                                >
                                    <div className="relative h-52 overflow-hidden bg-gray-50 flex items-center justify-center p-4">
                                        <img
                                            src={product.image}
                                            alt={product.title}
                                            className="max-h-full w-auto object-contain group-hover:scale-105 transition-transform duration-700"
                                        />
                                        <div className="absolute top-3 left-3">
                                            <span className="px-3 py-1 bg-[#00D084] text-white text-[10px] font-bold rounded-md uppercase tracking-wider">{product.category}</span>
                                        </div>
                                    </div>
                                    <div className="p-6">
                                        <h3 className="text-[#043F43] text-lg font-bold mb-2 line-clamp-1">{product.title}</h3>
                                        <p className="text-gray-500 text-[13px] leading-relaxed mb-4 line-clamp-2 font-light">{product.description}</p>

                                        <div className="grid grid-cols-2 gap-3 pt-4 border-t border-gray-100 mb-4">
                                            <div>
                                                <span className="block text-[10px] text-gray-400 uppercase font-bold tracking-wider mb-0.5">Capacity</span>
                                                <span className="text-[#043F43] text-[13px] font-semibold">{product.capacity}</span>
                                            </div>
                                            <div>
                                                <span className="block text-[10px] text-gray-400 uppercase font-bold tracking-wider mb-0.5">Power</span>
                                                <span className="text-[#043F43] text-[13px] font-semibold">{product.power}</span>
                                            </div>
                                        </div>

                                        <button
                                            onClick={() => navigate(`/Agreocology/products`)}
                                            className="text-[#00D084] font-bold text-[13px] flex items-center gap-1.5 hover:gap-2 transition-all p-0"
                                        >
                                            View Full Specifications <ArrowRight size={14} />
                                        </button>
                                    </div>
                                </motion.div>
                            ))
                        ) : (
                            <div className="col-span-3 py-10 text-gray-400">No products available at the moment.</div>
                        )}
                    </div>

                    <div className="flex justify-center">
                        <motion.button
                            onClick={() => navigate('/Agreocology/products')}
                            whileHover={{ scale: 1.05, backgroundColor: "#05b36d" }}
                            whileTap={{ scale: 0.95 }}
                            className="px-8 py-3 bg-[#00D084] text-white rounded-lg font-bold flex items-center gap-3 shadow-lg shadow-[#00D084]/20 text-sm"
                        >
                            View All Machinery <ArrowRight size={18} />
                        </motion.button>
                    </div>
                </div>
            </section>

            {/* Global Export Network Section - COMPACT */}
            <section className="py-16 bg-[#043F43]">
                <div className="max-w-7xl mx-auto px-6 text-center">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="mb-12"
                    >
                        <h2 className="text-white text-3xl sm:text-4xl font-semibold mb-4">Global Export Network</h2>
                        <p className="text-gray-300 text-base sm:text-lg">Delivering quality machinery to businesses worldwide</p>
                    </motion.div>

                    <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-12">
                        {[
                            { number: "30+", label: "Countries" },
                            { number: "500+", label: "Units Exported" },
                            { number: "100+", label: "Happy Clients" },
                            { number: "15+", label: "Years" },
                        ].map((stat, idx) => (
                            <motion.div
                                key={idx}
                                initial={{ opacity: 0, scale: 0.9 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                viewport={{ once: true }}
                                transition={{ delay: idx * 0.1 }}
                                className="flex flex-col items-center"
                            >
                                <span className="text-[#00D084] text-4xl sm:text-5xl font-medium mb-2">{stat.number}</span>
                                <span className="text-white text-base sm:text-lg font-light">{stat.label}</span>
                            </motion.div>
                        ))}
                    </div>

                    <div className="flex justify-center">
                        <motion.button
                            onClick={() => navigate('/Agreocology/exports')}
                            whileHover={{ scale: 1.05, filter: "brightness(1.1)" }}
                            whileTap={{ scale: 0.95 }}
                            className="px-8 py-4 bg-[#00D084] text-white rounded-xl font-bold flex items-center gap-3 shadow-xl shadow-[#00D084]/20 text-base"
                        >
                            Explore Our Global Network <ArrowRight size={20} />
                        </motion.button>
                    </div>
                </div>
            </section>

            {/* Custom Solutions CTA Section - MATCH IMAGE */}
            <section className="py-20 bg-white">
                <div className="max-w-7xl mx-auto px-6">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="bg-[#043F43] rounded-[32px] p-12 sm:p-16 text-center relative overflow-hidden"
                    >
                        {/* Subtle background pattern */}
                        <div className="absolute inset-0 opacity-10 pointer-events-none">
                            <div className="absolute top-[-10%] right-[-10%] w-[40%] h-[100%] bg-white/20 blur-[100px] rounded-full" />
                            <div className="absolute bottom-[-10%] left-[-10%] w-[40%] h-[100%] bg-white/20 blur-[100px] rounded-full" />
                        </div>

                        <div className="relative z-10 max-w-3xl mx-auto">
                            <h2 className="text-white text-3xl sm:text-4xl font-semibold mb-6">Need Custom Machinery Solutions?</h2>
                            <p className="text-white/80 text-lg mb-10 leading-relaxed font-light">
                                Contact our technical team to discuss your requirements and get expert recommendations.
                            </p>
                            <motion.button
                                onClick={() => navigate('/Agreocology/contact')}
                                whileHover={{ scale: 1.05, backgroundColor: "#05b36d" }}
                                whileTap={{ scale: 0.95 }}
                                className="px-10 py-4 bg-[#00D084] text-white rounded-xl font-bold flex items-center gap-3 mx-auto shadow-2xl shadow-[#00D084]/30"
                            >
                                Contact Us Now <ArrowRight size={20} />
                            </motion.button>
                        </div>
                    </motion.div>
                </div>
            </section>
        </div>
    );
}

export default MachineryHome;
