import { motion } from "motion/react";
import { Award, ShieldCheck, CheckCircle2, Check } from "lucide-react";

export function MachineryCertifications() {
    const certs = [
        {
            title: "CE Marking",
            icon: Award,
            desc: "European Conformity certification ensuring machinery meets EU safety, health, and environmental protection standards.",
            features: ["Safety compliance", "Technical documentation", "Quality assurance"]
        },
        {
            title: "ISO 9001:2015",
            icon: ShieldCheck,
            desc: "International standard for Quality Management System, ensuring consistent quality in manufacturing and service.",
            features: ["Quality management", "Process control", "Customer satisfaction"]
        },
        {
            title: "Export License",
            icon: CheckCircle2,
            desc: "Government authorized export documentation ensuring compliance with international trade regulations.",
            features: ["Legal compliance", "Trade authorization", "Documentation support"]
        }
    ];

    return (
        <div className="min-h-screen bg-white font-['Helvetica'] text-[#043F43]">
            {/* Hero Section - Compact */}
            <section className="bg-[#043F43] py-28 text-left">
                <div className="max-w-7xl mx-auto px-6">
                    <motion.div
                        initial={{ opacity: 0, y: 15 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                    >
                        <h1 className="text-white text-4xl sm:text-5xl font-semibold mb-3 tracking-tight">
                            Certifications & Quality Standards
                        </h1>
                        <p className="text-white/80 text-lg sm:text-xl font-light max-w-2xl">
                            Our commitment to quality backed by international certifications
                        </p>
                    </motion.div>
                </div>
            </section>

            {/* Content Section */}
            <section className="py-20">
                <div className="max-w-7xl mx-auto px-6">
                    {/* Header */}
                    <div className="text-center mb-16 space-y-4">
                        <h2 className="text-[#043F43] text-2xl font-bold">Quality is Our Foundation</h2>
                        <p className="text-gray-500 text-sm max-w-3xl mx-auto leading-relaxed">
                            Every machine we export meets international standards and is backed by comprehensive certifications and quality assurance protocols.
                        </p>
                    </div>

                    {/* Cards Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {certs.map((cert, idx) => (
                            <motion.div
                                key={idx}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.5, delay: idx * 0.1 }}
                                className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100 hover:shadow-md transition-all flex flex-col h-full"
                            >
                                <div className="text-[#00D084] mb-6">
                                    <cert.icon size={32} />
                                </div>

                                <h3 className="text-lg font-bold mb-4">{cert.title}</h3>
                                <p className="text-gray-500 text-xs leading-relaxed mb-8 flex-grow">
                                    {cert.desc}
                                </p>

                                <div className="space-y-3 pt-6 border-t border-gray-50">
                                    <p className="text-[#043F43] text-[10px] font-bold uppercase tracking-wider">Key Features:</p>
                                    <div className="space-y-2">
                                        {cert.features.map((feature, fIdx) => (
                                            <div key={fIdx} className="flex items-center gap-2 text-[11px] text-gray-600 font-medium">
                                                <div className="w-4 h-4 rounded-full bg-[#00D084]/10 flex items-center justify-center">
                                                    <Check size={10} className="text-[#00D084] stroke-[3]" />
                                                </div>
                                                {feature}
                                            </div>
                                        ))}
                                    </div>
                                </div>
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

export default MachineryCertifications;
