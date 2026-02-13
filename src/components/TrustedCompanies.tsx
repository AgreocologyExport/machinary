import { motion } from "motion/react";

export function TrustedCompanies() {
    const row1 = [
        "Syngenta AgriTech",
        "Bayer CropScience",
        "Corteva Agriscience",
        "BASF Agricultural Solutions",
        "FMC Corporation",
        "UPL Limited",
        "Nuziveedu Seeds",
        "Advanta Seeds",
    ];

    const row2 = [
        "Corteva Agriscience",
        "BASF Agricultural Solutions",
        "FMC Corporation",
        "UPL Limited",
        "Nuziveedu Seeds",
        "Advanta Seeds",
        "Syngenta AgriTech",
        "Bayer CropScience",
    ];

    const stats = [
        { value: "500+", label: "Partner Companies" },
        { value: "50+", label: "Countries Served" },
        { value: "98%", label: "Client Satisfaction" },
        { value: "15+", label: "Years Experience" },
    ];

    const marqueeVariants = {
        animate1: {
            x: [0, -1000],
            transition: {
                x: {
                    repeat: Infinity,
                    repeatType: "loop",
                    duration: 30,
                    ease: "linear",
                },
            },
        },
        animate2: {
            x: [-1000, 0],
            transition: {
                x: {
                    repeat: Infinity,
                    repeatType: "loop",
                    duration: 30,
                    ease: "linear",
                },
            },
        },
    };

    return (
        <section className="py-24 bg-white overflow-hidden">
            <div className="max-w-7xl mx-auto px-6 mb-16 text-center">
                <motion.h2
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-[#043F43] text-4xl sm:text-5xl font-normal tracking-tight mb-6"
                >
                    Trusted by Leading Agricultural Companies
                </motion.h2>
                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.1 }}
                    className="text-[#517a79] text-lg max-w-3xl mx-auto"
                >
                    Partnering with global seed companies and agricultural enterprises to deliver quality products worldwide
                </motion.p>
            </div>

            {/* Scrolling Logos Row 1 */}
            <div className="flex mb-8">
                <motion.div
                    className="flex gap-6 whitespace-nowrap"
                    variants={marqueeVariants}
                    animate="animate1"
                >
                    {[...row1, ...row1].map((company, index) => (
                        <div
                            key={index}
                            className="bg-white border border-[#e9f7f4] px-10 py-5 rounded-2xl shadow-sm hover:shadow-md transition-shadow"
                        >
                            <span className="text-[#043F43] font-medium text-lg">{company}</span>
                        </div>
                    ))}
                </motion.div>
            </div>

            {/* Scrolling Logos Row 2 */}
            <div className="flex mb-20">
                <motion.div
                    className="flex gap-6 whitespace-nowrap"
                    variants={marqueeVariants}
                    animate="animate2"
                >
                    {[...row2, ...row2].map((company, index) => (
                        <div
                            key={index}
                            className="bg-white border border-[#e9f7f4] px-10 py-5 rounded-2xl shadow-sm hover:shadow-md transition-shadow"
                        >
                            <span className="text-[#043F43] font-medium text-lg">{company}</span>
                        </div>
                    ))}
                </motion.div>
            </div>

            {/* Stats Section */}
            <div className="max-w-7xl mx-auto px-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                    {stats.map((stat, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, scale: 0.9 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1 }}
                            className="bg-[#f2faf9] border border-[#d1f5ea] rounded-[32px] p-8 text-center"
                        >
                            <div className="text-[#00D084] text-4xl sm:text-5xl font-normal mb-2">
                                {stat.value}
                            </div>
                            <div className="text-[#517a79] text-lg font-normal">
                                {stat.label}
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
