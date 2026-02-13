import { motion } from "motion/react";
import { createElement } from "react";
import { Globe2, ShieldCheck, Truck, Leaf, TrendingUp } from "lucide-react";

interface WhyChooseUsProps {
  title?: string;
  description?: string;
  features?: {
    title: string;
    description: string;
  }[];
  stats?: any;
}

export function WhyChooseUs({
  title = "Why Choose Agreocology",
  description = "Trusted by partners worldwide for our commitment to excellence, reliability, and sustainable practices.",
  features = [
    {
      title: "Global Reach",
      description: "Established export networks spanning across 40+ countries on 5 continents."
    },
    {
      title: "Quality Control",
      description: "Rigorous testing and certification ensuring products meet international standards."
    },
    {
      title: "Fast Logistics",
      description: "Efficient supply chain management with temperature-controlled shipping solutions."
    },
    {
      title: "Ethical Sourcing",
      description: "Direct partnerships with farmers ensuring fair practices and sustainability."
    },
    {
      title: "Consistent Supply",
      description: "Reliable year-round availability through strategic sourcing and storage."
    }
  ],
  stats = []
}: WhyChooseUsProps) {
  const icons = [Globe2, ShieldCheck, Truck, Leaf, TrendingUp];

  const displayStats = [
    { value: "40+", label: "Countries" },
    { value: "500+", label: "Partners" },
    { value: "50K+", label: "Tons Exported" },
    { value: "15+", label: "Years Experience" }
  ];

  return (
    <section className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-[#043F43] mb-6 text-4xl font-normal tracking-tight">{title}</h2>
          <div className="w-12 h-1 bg-[#00D084] mx-auto mb-8 rounded-full" />
          <p className="text-[#517a79] text-lg max-w-2xl mx-auto">
            {description}
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="relative group"
            >
              <div className="h-full p-6 rounded-2xl bg-[#f2faf9] border border-[#d1f5ea] hover:shadow-md transition-all duration-300">
                <div className="mb-4">
                  <div className="w-12 h-12 rounded-xl bg-[#d1f5ea] flex items-center justify-center group-hover:scale-105 transition-transform duration-300">
                    {createElement(icons[index % icons.length], { className: "w-6 h-6 text-[#00D084]" })}
                  </div>
                </div>

                <h4 className="text-[#043F43] mb-2 text-lg font-medium">{feature.title}</h4>
                <p className="text-[#517a79] text-sm leading-relaxed">
                  {feature.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Stats Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="mt-24 grid grid-cols-2 lg:grid-cols-4 gap-8"
        >
          {displayStats.map((stat, index) => (
            <div key={stat.label} className="text-center">
              <div className="text-4xl text-[#00D084] font-normal mb-2 tracking-tight">{stat.value}</div>
              <div className="text-[#517a79] text-sm font-normal">{stat.label}</div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
