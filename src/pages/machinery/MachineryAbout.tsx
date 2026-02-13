import { motion } from "motion/react";

export function MachineryAbout() {
    return (
        <div className="min-h-screen bg-white font-['Helvetica'] pb-20">
            {/* Hero Header */}
            <section className="relative py-28 bg-[#043F43] text-left overflow-hidden">
                <div className="max-w-7xl mx-auto px-10 relative z-10">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                    >
                        <h1 className="text-white text-4xl sm:text-5xl font-semibold mb-3 tracking-tight">
                            About Our Machinery Division
                        </h1>
                        <p className="text-white/80 text-lg sm:text-xl font-light">
                            Providing advanced agricultural and food processing machinery since 2009
                        </p>
                    </motion.div>
                </div>
            </section>

            {/* Description Text */}
            <section className="py-20">
                <div className="max-w-4xl mx-auto px-6 text-center space-y-8">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        className="space-y-6 text-gray-600 leading-relaxed text-base sm:text-lg font-light"
                    >
                        <p>
                            Our machinery division specializes in exporting high-quality agricultural machinery, food processing equipment, and packaging machines to businesses worldwide.
                        </p>
                        <p>
                            We partner with leading manufacturers to provide reliable, efficient, and cost-effective machinery solutions that help our clients improve productivity and reduce operational costs.
                        </p>
                        <p>
                            Every machine is thoroughly inspected and tested before export, ensuring it meets international quality standards and performs reliably in diverse operational environments.
                        </p>
                    </motion.div>
                </div>
            </section>

            {/* Mission, Vision, Values Grid */}
            <section className="pb-24 pt-10">
                <div className="max-w-7xl mx-auto px-6">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {/* Our Mission */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            className="bg-white p-10 rounded-2xl border border-gray-100 shadow-sm transition-all hover:shadow-md h-full flex flex-col"
                        >
                            <div className="w-12 h-12 bg-[#00D084] rounded-full mb-8" />
                            <h3 className="text-[#043F43] text-2xl font-semibold mb-6">Our Mission</h3>
                            <p className="text-gray-500 text-sm leading-relaxed font-light">
                                To provide businesses with reliable, high-performance machinery that enhances productivity and contributes to sustainable agricultural and industrial growth.
                            </p>
                        </motion.div>

                        {/* Our Vision */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.1 }}
                            className="bg-white p-10 rounded-2xl border border-gray-100 shadow-sm transition-all hover:shadow-md h-full flex flex-col"
                        >
                            <div className="w-12 h-12 bg-[#00D084] rounded-full mb-8" />
                            <h3 className="text-[#043F43] text-2xl font-semibold mb-6">Our Vision</h3>
                            <p className="text-gray-500 text-sm leading-relaxed font-light">
                                To be the preferred partner for machinery exports, recognized for quality products, technical excellence, and outstanding customer support.
                            </p>
                        </motion.div>

                        {/* Our Values */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.2 }}
                            className="bg-white p-10 rounded-2xl border border-gray-100 shadow-sm transition-all hover:shadow-md h-full flex flex-col"
                        >
                            <div className="w-12 h-12 bg-[#00D084] rounded-full mb-8" />
                            <h3 className="text-[#043F43] text-2xl font-semibold mb-6">Our Values</h3>
                            <ul className="text-gray-500 text-sm space-y-3 font-light">
                                <li className="flex items-center gap-2">• Quality Excellence</li>
                                <li className="flex items-center gap-2">• Technical Support</li>
                                <li className="flex items-center gap-2">• Customer Satisfaction</li>
                                <li className="flex items-center gap-2">• Innovation</li>
                            </ul>
                        </motion.div>
                    </div>
                </div>
            </section>
        </div>
    );
}

export default MachineryAbout;
