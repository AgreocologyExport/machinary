import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { ref, get } from "firebase/database";
import { database } from "../firebase/config";
import { ArrowLeft, Globe, ShieldCheck, FileText } from "lucide-react";
import { motion } from "motion/react";

interface MachineData {
    id?: string;
    title?: string;
    description?: string;
    imageUrl?: string;
    content?: string;
    category?: string;
    capacity?: string;
    power?: string;
    moq?: string;
    hsCode?: string;
    warranty?: string;
    exportDestinations?: string;
}

export function MachineDetailPage() {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();

    const [machine, setMachine] = useState<MachineData | null>(null);
    const [relatedMachines, setRelatedMachines] = useState<MachineData[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchMachine = async () => {
            try {
                if (!id) {
                    setError("No machine ID provided");
                    setLoading(false);
                    return;
                }

                const machineRef = ref(database, `machines/${id}`);
                const snapshot = await get(machineRef);

                if (snapshot.exists()) {
                    const currentData = snapshot.val();
                    setMachine(currentData);

                    // Fetch Related Machinery
                    const machinesRef = ref(database, "machines");
                    const machinesSnapshot = await get(machinesRef);
                    if (machinesSnapshot.exists()) {
                        const allData = machinesSnapshot.val();
                        const list = Object.entries(allData)
                            .map(([key, value]: [string, any]) => ({ id: key, ...value }))
                            .filter((m: any) => m.id !== id)
                            .slice(0, 4);
                        setRelatedMachines(list);
                    }
                } else {
                    setError("Machine information not found");
                }
            } catch (err) {
                console.error("Error fetching machine:", err);
                setError("Failed to load machine data");
            } finally {
                setLoading(false);
            }
        };

        fetchMachine();
    }, [id]);

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-white">
                <div className="w-10 h-10 border-4 border-[#00D084]/20 border-t-[#00D084] rounded-full animate-spin"></div>
            </div>
        );
    }

    if (error || !machine) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-50 font-['Poppins']">
                <div className="text-center">
                    <h2 className="text-lg font-medium text-[#043F43] mb-4">{error || "Product not found"}</h2>
                    <button onClick={() => navigate("/Agreocology/products")} className="text-[#00D084] font-semibold flex items-center gap-2 mx-auto">
                        <ArrowLeft size={18} /> Back to Products
                    </button>
                </div>
            </div>
        );
    }

    const destinations = machine.exportDestinations ? machine.exportDestinations.split(',').map(d => d.trim()) : [];

    return (
        <div className="min-h-screen bg-white font-['Poppins'] text-[#043F43]">
            {/* Top Navigation */}
            <div className="max-w-7xl mx-auto px-6 py-4">
                <button
                    onClick={() => navigate("/Agreocology/products")}
                    className="flex items-center gap-2 text-[#00D084] text-xs font-semibold hover:opacity-80 transition-all"
                >
                    <ArrowLeft size={14} /> Back to Products
                </button>
            </div>

            <main className="max-w-7xl mx-auto px-6 pb-12">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-start">

                    {/* Left Column: Image Card */}
                    <div className="space-y-4">
                        <div className="bg-white rounded-[32px] shadow-sm ring-1 ring-gray-100 overflow-hidden">
                            <img
                                src={machine.imageUrl || "https://images.unsplash.com/photo-1592982537447-7440770cbfc9?auto=format&fit=crop&q=80"}
                                alt={machine.title}
                                className="w-full aspect-[1.3] object-cover rounded-[32px]"
                            />
                        </div>
                    </div>

                    {/* Right Column: Content */}
                    <div className="space-y-6">
                        <div className="space-y-3">
                            <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-[#043F43]">
                                {machine.title}
                            </h1>
                            <p className="text-gray-500 text-lg leading-relaxed max-w-xl">
                                {machine.description}
                            </p>
                        </div>

                        <div className="bg-[#f8fafc] rounded-2xl p-6 border border-gray-100">
                            <h2 className="text-2xl font-semibold mb-6 text-[#043F43]">Technical Specifications</h2>

                            <div className="grid grid-cols-2 gap-y-6 gap-x-12">
                                <div>
                                    <div className="text-gray-400 text-xs font-semibold uppercase tracking-widest mb-1">Capacity</div>
                                    <div className="text-sm text-gray-700">{machine.capacity || "N/A"}</div>
                                </div>
                                <div>
                                    <div className="text-gray-400 text-xs font-semibold uppercase tracking-widest mb-1">Power Rating</div>
                                    <div className="text-sm text-gray-700">{machine.power || "N/A"}</div>
                                </div>
                                <div>
                                    <div className="text-gray-400 text-xs font-semibold uppercase tracking-widest mb-1">Min Order Quantity</div>
                                    <div className="text-sm text-gray-700">{machine.moq || "1 Unit"}</div>
                                </div>
                                <div>
                                    <div className="text-gray-400 text-xs font-semibold uppercase tracking-widest mb-1">HS Code</div>
                                    <div className="text-sm text-gray-700">{machine.hsCode || "N/A"}</div>
                                </div>
                                <div className="col-span-2">
                                    <div className="text-gray-400 text-xs font-semibold uppercase tracking-widest mb-1">Warranty</div>
                                    <div className="text-sm text-gray-700">{machine.warranty || "N/A"}</div>
                                </div>
                            </div>

                            {destinations.length > 0 && (
                                <div className="mt-8 pt-6 border-t border-gray-200/50">
                                    <h3 className="flex items-center gap-2 text-[#043F43] font-semibold text-sm mb-4">
                                        <Globe size={18} className="text-[#00D084]" /> Export Destinations
                                    </h3>
                                    <div className="flex flex-wrap gap-2">
                                        {destinations.map(dest => (
                                            <div key={dest} className="bg-white border border-gray-100 px-4 py-2 rounded-lg text-xs text-gray-600 shadow-sm">
                                                {dest}
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </div>

                        <div className="grid grid-cols-2 gap-4 pt-2">
                            <div className="flex items-start gap-2">
                                <div className="mt-0.5">
                                    <ShieldCheck className="text-[#00D084] w-5 h-5" />
                                </div>
                                <div>
                                    <div className="text-sm font-semibold">Quality Assured</div>
                                    <div className="text-gray-400 text-xs mt-0.5 leading-tight">Manufactured with intl. standards</div>
                                </div>
                            </div>
                            <div className="flex items-start gap-2">
                                <div className="mt-0.5">
                                    <FileText className="text-[#00D084] w-5 h-5" />
                                </div>
                                <div>
                                    <div className="text-sm font-semibold">Compl. Documentation</div>
                                    <div className="text-gray-400 text-xs mt-0.5 leading-tight">Certifications included</div>
                                </div>
                            </div>
                        </div>

                        <div className="bg-[#043F43] rounded-2xl p-6 text-white flex flex-col sm:flex-row items-center justify-between gap-4 shadow-lg shadow-[#043F43]/10">
                            <div className="space-y-1 text-center sm:text-left">
                                <h2 className="text-lg font-semibold tracking-tight">Interested in this machinery?</h2>
                                <p className="text-white/70 text-sm leading-relaxed max-w-md">
                                    Contact our team for pricing and installation support.
                                </p>
                            </div>
                            <button
                                onClick={() => navigate("/agro-products/contact")}
                                className="bg-[#00D084] hover:bg-[#05b36d] text-white px-6 py-2.5 rounded-xl font-semibold text-sm transition-all shadow-lg shadow-[#00D084]/20 whitespace-nowrap"
                            >
                                Request a Quote
                            </button>
                        </div>
                    </div>
                </div>

                {/* Optional Long Content - BELOW Main but ABOVE Related */}
                {machine.content && (
                    <div className="mt-12 pt-10 border-t border-gray-100 opacity-80">
                        <h2 className="text-2xl font-semibold mb-4">Detailed Description</h2>
                        <div className="prose prose-sm max-w-none prose-headings:text-[#043F43] prose-p:text-gray-500" dangerouslySetInnerHTML={{ __html: machine.content }} />
                    </div>
                )}

                {/* Related Machinery Section - NOW AT THE VERY BOTTOM */}
                <div className="mt-16 pt-10 border-t border-gray-100">
                    <div className="flex items-center justify-between mb-8">
                        <h2 className="text-[#043F43] text-2xl font-semibold">Related Machinery</h2>
                        <button
                            onClick={() => navigate("/Agreocology/products")}
                            className="text-[#00D084] text-sm font-semibold hover:underline"
                        >
                            View All Products
                        </button>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                        {relatedMachines.map((m) => (
                            <motion.div
                                key={m.id}
                                whileHover={{ y: -5 }}
                                onClick={() => {
                                    navigate(`/Agreocology/products/${m.id}`);
                                    window.scrollTo(0, 0);
                                }}
                                className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all cursor-pointer border border-gray-100 group"
                            >
                                <div className="aspect-[3/2] overflow-hidden">
                                    <img
                                        src={m.imageUrl || "https://images.unsplash.com/photo-1592982537447-7440770cbfc9?auto=format&fit=crop&q=80"}
                                        alt={m.title}
                                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                                    />
                                </div>
                                <div className="p-4">
                                    <h3 className="text-[#043F43] font-semibold text-sm mb-1 group-hover:text-[#00D084] transition-colors line-clamp-1">
                                        {m.title}
                                    </h3>
                                    <p className="text-gray-400 text-xs leading-relaxed line-clamp-2">
                                        {m.description}
                                    </p>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </main>
        </div>
    );
}

export default MachineDetailPage;
