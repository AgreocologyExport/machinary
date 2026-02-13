// src/pages/MachinePage.tsx
import { motion } from "motion/react";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Calendar, User, ArrowRight, Clock, Settings } from "lucide-react";
import { ref, get } from "firebase/database";
import { database } from "../firebase/config";

interface MachinePost {
    id: string;
    title: string;
    excerpt: string;
    author: string;
    date: string;
    readTime: string;
    category: string;
    image: string;
    fullContent?: string;
}

interface MachineData {
    title?: string;
    description?: string;
    authorEmail?: string;
    createdAt?: string;
    createdAtReadable?: string;
    imageUrl?: string;
    content?: string;
    category?: string;
}

export function MachinePage() {
    const [machines, setMachines] = useState<MachinePost[]>([]);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchMachines = async () => {
            try {
                const machinesRef = ref(database, "machines");
                const snapshot = await get(machinesRef);

                if (snapshot.exists()) {
                    const machinesObj = snapshot.val() as Record<string, MachineData>;
                    const machinesArray = Object.entries(machinesObj).map(([key, value]) => ({
                        key,
                        ...(value || {}),
                    }));

                    const sortedMachines = machinesArray.sort(
                        (a, b) =>
                            new Date(b.createdAt || "").getTime() -
                            new Date(a.createdAt || "").getTime()
                    );

                    const truncateText = (text: string, maxLength: number = 150): string => {
                        if (!text || text.length <= maxLength) return text;
                        return text.substring(0, maxLength).trim() + '...';
                    };

                    const transformedMachines: MachinePost[] = sortedMachines.map((machine) => ({
                        id: machine.key,
                        title: machine.title || "Untitled Machine",
                        excerpt: truncateText(machine.description || "No description available", 150),
                        author: machine.authorEmail?.split("@")[0] || "Admin",
                        date:
                            machine.createdAtReadable ||
                            new Date(machine.createdAt || "").toLocaleDateString("en-US", {
                                year: "numeric",
                                month: "long",
                                day: "numeric",
                            }),
                        readTime: `${Math.max(3, Math.floor((machine.content?.length || 0) / 1000))} min read`,
                        category: machine.category || "Industrial Equipment",
                        image:
                            machine.imageUrl ||
                            "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
                        fullContent: machine.content,
                    }));

                    setMachines(transformedMachines);
                } else {
                    setMachines(fallbackMachines);
                }
            } catch (error) {
                console.error("Error fetching machines:", error);
                setMachines(fallbackMachines);
            } finally {
                setLoading(false);
            }
        };

        fetchMachines();
    }, []);

    const handleMachineClick = (id: string) => {
        navigate(`/machines/${id}`);
    };

    const fallbackMachines: MachinePost[] = [
        {
            id: "fallback-m1",
            title: "Advanced Sorting Systems for Grain Processing",
            excerpt: "Discover the latest innovations in grain sorting technology that ensure maximum purity and efficiency in your processing line.",
            author: "Agreocology Tech",
            date: "January 15, 2026",
            readTime: "10 min read",
            category: "Processing",
            image: "https://images.unsplash.com/photo-1581092160562-40aa08e78837?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
        },
        {
            id: "fallback-m2",
            title: "Sustainable Packaging Solutions for Fresh Exports",
            excerpt: "Automate your packaging process with machines designed to reduce waste and maintain product freshness during long-haul transport.",
            author: "Engineering Team",
            date: "January 10, 2026",
            readTime: "7 min read",
            category: "Packaging",
            image: "https://images.unsplash.com/photo-1565106430482-8f6e74349ca1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
        }
    ];

    return (
        <div className="min-h-screen bg-white font-['Poppins']">
            {/* Top Section / Hero */}
            <section className="relative py-32 bg-[#043F43] text-center overflow-hidden">
                {/* Subtle dot pattern grid */}
                <div className="absolute inset-0 opacity-[0.05]">
                    <div
                        className="absolute inset-0"
                        style={{
                            backgroundImage: "radial-gradient(circle at 1.5px 1.5px, #ffffff 1.5px, transparent 0)",
                            backgroundSize: "28px 28px",
                        }}
                    />
                </div>

                <div className="max-w-7xl mx-auto px-6 relative z-10 text-center">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                    >
                        <h1 className="text-white text-4xl sm:text-5xl lg:text-7xl font-normal mb-8 tracking-tight text-center font-['Poppins']">
                            Machinery & Equipment
                        </h1>
                        <p className="text-white/80 text-lg sm:text-xl max-w-2xl mx-auto leading-relaxed font-light text-center font-['Poppins']">
                            Explore our range of high-performance agricultural processing and packaging machinery.
                        </p>
                    </motion.div>
                </div>
            </section>

            {/* Machines Grid */}
            <section className="py-24">
                <div className="max-w-7xl mx-auto px-6 font-['Poppins']">
                    {loading ? (
                        <div className="flex flex-col items-center justify-center py-24">
                            <div className="w-12 h-12 border-4 border-[#00D084]/20 border-t-[#00D084] rounded-full animate-spin mb-4"></div>
                            <p className="text-[#517a79] font-medium">Loading Machinery...</p>
                        </div>
                    ) : (
                        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 sm:gap-12">
                            {machines.map((machine, index) => (
                                <motion.article
                                    key={machine.id}
                                    initial={{ opacity: 0, y: 30 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ duration: 0.6, delay: index * 0.1 }}
                                    onClick={() => handleMachineClick(machine.id)}
                                    className="bg-white rounded-[24px] overflow-hidden shadow-[0_4px_24px_rgba(0,0,0,0.04)] hover:shadow-[0_12px_48px_rgba(0,0,0,0.08)] transition-all duration-500 flex flex-col h-full border border-gray-100 group cursor-pointer"
                                >
                                    {/* Image Container */}
                                    <div className="relative h-60 overflow-hidden">
                                        <img
                                            src={machine.image}
                                            alt={machine.title}
                                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                                        />
                                        {/* Category Badge */}
                                        <div className="absolute top-4 left-4">
                                            <span className="px-5 py-1.5 bg-[#00D084] text-white text-[11px] font-bold rounded-full uppercase tracking-widest">
                                                {machine.category}
                                            </span>
                                        </div>
                                    </div>

                                    {/* Content */}
                                    <div className="p-8 flex flex-col flex-1">
                                        <h2
                                            onClick={() => handleMachineClick(machine.id)}
                                            className="text-[#00D084] group-hover:text-[#043F43] text-2xl font-normal mb-5 line-clamp-2 leading-tight transition-colors duration-300 cursor-pointer"
                                        >
                                            {machine.title}
                                        </h2>

                                        <p className="text-[#517a79] text-[15px] leading-relaxed mb-10 line-clamp-3 font-light">
                                            {machine.excerpt}
                                        </p>

                                        <div className="mt-auto">
                                            <div className="flex items-center gap-6 text-[#517a79] text-[13px] font-medium mb-6">
                                                <div className="flex items-center gap-2">
                                                    <Settings className="w-4 h-4 text-[#00D084]" />
                                                    <span>Technical Spec</span>
                                                </div>
                                                <div className="flex items-center gap-2">
                                                    <Clock className="w-4 h-4 text-[#00D084]" />
                                                    <span>{machine.readTime}</span>
                                                </div>
                                            </div>

                                            <div className="flex items-center justify-between pt-6 border-t border-gray-50">
                                                <div className="flex items-center gap-2 text-[#517a79] text-[13px]">
                                                    <Calendar className="w-4 h-4 text-[#00D084]" />
                                                    <span>{machine.date}</span>
                                                </div>

                                                <button
                                                    onClick={() => handleMachineClick(machine.id)}
                                                    className="flex items-center gap-2 text-[#00D084] font-semibold text-[13px] hover:translate-x-1 transition-all duration-300"
                                                >
                                                    View Details
                                                    <ArrowRight className="w-4 h-4" />
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </motion.article>
                            ))}
                        </div>
                    )}
                </div>
            </section>

            {/* Inquiry Section */}
            <section className="py-24 bg-[#f2faf9]">
                <div className="max-w-4xl mx-auto px-6 text-center">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                    >
                        <h2 className="text-[#043F43] text-3xl font-medium mb-6">Need Custom Machinery?</h2>
                        <p className="text-[#517a79] mb-10 text-[17px] font-light">
                            Contact our engineering team for bespoke processing and packaging solutions.
                        </p>
                        <form className="flex flex-col sm:flex-row gap-4 max-w-xl mx-auto">
                            <input
                                type="email"
                                placeholder="Enter your email address"
                                className="flex-1 px-8 py-4 rounded-full bg-white border border-gray-100 text-[#043F43] focus:outline-none focus:ring-2 focus:ring-[#00D084] transition-all font-['Helvetica']"
                                required
                            />
                            <button
                                type="submit"
                                className="px-10 py-4 bg-[#00D084] hover:bg-[#043F43] text-white font-semibold rounded-full transition-all duration-300 shadow-lg shadow-[#00D084]/20"
                            >
                                Inquire Now
                            </button>
                        </form>
                    </motion.div>
                </div>
            </section>
        </div>
    );
}

export default MachinePage;
