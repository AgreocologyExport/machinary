import { motion } from "motion/react";
import { Globe, CheckCircle } from "lucide-react";

export function MachineryExports() {
    return (
        <div className="min-h-screen bg-white font-['Helvetica']">
            {/* Hero Section - Compact */}
            <section className="bg-[#043F43] py-28 text-left">
                <div className="max-w-7xl mx-auto px-6">
                    <motion.div
                        initial={{ opacity: 0, y: 15 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                    >
                        <h1 className="text-white text-4xl sm:text-5xl font-semibold mb-3 tracking-tight">
                            Global Machinery Exports
                        </h1>
                        <p className="text-white/80 text-lg sm:text-xl font-light">
                            Delivering quality agricultural and processing machinery worldwide
                        </p>
                    </motion.div>
                </div>
            </section>

            {/* Markets We Serve Section - Extra Compact */}
            <section className="py-20">
                <div className="max-w-7xl mx-auto px-6">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-start">
                        {/* Left Side: Regions */}
                        <div className="space-y-4">
                            <div>
                                <h2 className="text-[#043F43] text-2xl font-bold mb-3 tracking-tight">Markets We Serve</h2>
                                <p className="text-gray-500 text-[13px] leading-relaxed mb-6 font-medium">
                                    Our machinery reaches businesses across developing and developed markets worldwide.
                                </p>
                                <div className="grid grid-cols-2 gap-3">
                                    {[
                                        "Africa",
                                        "Middle East",
                                        "Southeast Asia",
                                        "South America",
                                        "Eastern Europe",
                                        "Central Asia"
                                    ].map((region) => (
                                        <div key={region} className="flex items-center gap-2 text-gray-700">
                                            <CheckCircle className="text-[#00D084] w-4 h-4 flex-shrink-0" />
                                            <span className="text-xs font-bold uppercase tracking-tighter opacity-80">{region}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>

                        {/* Right Side: Statistics Card - Extra Compact */}
                        <div className="bg-[#f8fafc] rounded-2xl p-6 border border-gray-100 shadow-sm relative overflow-hidden">
                            <div className="absolute top-0 right-0 w-20 h-20 bg-[#00D084]/5 rounded-full -mr-10 -mt-10" />

                            <div className="relative z-10">
                                <div className="w-9 h-9 bg-white rounded-lg shadow-sm flex items-center justify-center text-[#00D084] mb-4">
                                    <Globe size={18} />
                                </div>
                                <h3 className="text-[#043F43] text-base font-bold mb-4 tracking-tight">Export Statistics</h3>

                                <div className="grid grid-cols-3 gap-2">
                                    <div className="bg-white p-3 rounded-xl border border-gray-50 text-center">
                                        <div className="text-[#00D084] text-xl font-bold mb-0.5">30+</div>
                                        <div className="text-gray-400 text-[8px] font-bold uppercase tracking-widest leading-none">Countries</div>
                                    </div>
                                    <div className="bg-white p-3 rounded-xl border border-gray-50 text-center">
                                        <div className="text-[#00D084] text-xl font-bold mb-0.5">500+</div>
                                        <div className="text-gray-400 text-[8px] font-bold uppercase tracking-widest leading-none">Units</div>
                                    </div>
                                    <div className="bg-white p-3 rounded-xl border border-gray-50 text-center">
                                        <div className="text-[#00D084] text-xl font-bold mb-0.5">100+</div>
                                        <div className="text-gray-400 text-[8px] font-bold uppercase tracking-widest leading-none">Clients</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Certifications Section - Extra Compact */}
            <section className="py-12 bg-[#f8fafc]">
                <div className="max-w-7xl mx-auto px-6">
                    <div className="text-center mb-10">
                        <h2 className="text-[#043F43] text-2xl font-bold tracking-tight">Certifications & Compliance</h2>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                        {[
                            {
                                title: "CE Marking",
                                detail: "European safety and health requirements"
                            },
                            {
                                title: "ISO 9001",
                                detail: "Quality Management System certification"
                            },
                            {
                                title: "Export License",
                                detail: "Government authorized export documentation"
                            }
                        ].map((cert, idx) => (
                            <motion.div
                                key={idx}
                                whileHover={{ y: -3 }}
                                className="bg-white p-5 rounded-xl shadow-sm border-l-4 border-[#00D084] border-t border-gray-50"
                            >
                                <h3 className="text-[#043F43] text-sm font-bold mb-2">{cert.title}</h3>
                                <p className="text-gray-500 text-[10px] leading-relaxed font-medium">{cert.detail}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Minimal Footer Space */}
            <section className="py-10 bg-white" />
        </div>
    );
}

export default MachineryExports;
