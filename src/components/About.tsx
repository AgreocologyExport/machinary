import { motion } from "motion/react";
import { createElement } from "react";
import { Globe2, Target, Heart } from "lucide-react";

interface AboutProps {
  title?: string;
  description1?: string;
  description2?: string;
  values?: {
    title: string;
    description: string;
  }[];
}

export function About({
  title = "About Agreocology",
  description1 = "Agreocology stands at the forefront of global agricultural exports, bridging farmers and markets across continents. We are committed to delivering excellence in every shipment, ensuring that quality agricultural products reach their destinations with integrity and care.",
  description2 = "With deep roots in agricultural communities and a global network spanning multiple continents, we understand both the land and the logistics. Our expertise encompasses the entire export value chain—from sourcing and quality control to documentation and timely delivery.",
  values = [
    {
      title: "Global Vision",
      description: "Connecting continents through sustainable agriculture and reliable export networks."
    },
    {
      title: "Quality Mission",
      description: "Delivering premium agricultural products that meet international standards."
    },
    {
      title: "Ethical Values",
      description: "Building partnerships based on trust, transparency, and shared growth."
    }
  ]
}: AboutProps) {
  const icons = [Globe2, Target, Heart];

  return (
    <section className="py-24 bg-white font-sans">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-[#043F43] mb-6 text-4xl sm:text-5xl font-normal tracking-tight">{title}</h2>
          <div className="w-12 h-1 bg-[#00D084] mx-auto mb-8 rounded-full" />
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <p className="text-[#64748b] mb-8 text-lg leading-relaxed font-normal">
              {description1}
            </p>
            <p className="text-[#64748b] text-lg leading-relaxed font-normal">
              {description2}
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="bg-[#f2faf9] rounded-[48px] p-10 lg:p-14 h-full"
          >
            <div className="space-y-10">
              {values.map((value, index) => (
                <motion.div
                  key={value.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 0.6 + index * 0.1 }}
                  className="flex items-start gap-5"
                >
                  <div className="flex-shrink-0">
                    <div className="w-12 h-12 rounded-full bg-[#d1f5ea] flex items-center justify-center">
                      {createElement(icons[index % icons.length], { className: "w-6 h-6 text-[#00D084]" })}
                    </div>
                  </div>
                  <div className="pt-1">
                    <h4 className="text-[#043F43] mb-2 text-xl font-medium tracking-tight">{value.title}</h4>
                    <p className="text-[#64748b] text-lg leading-relaxed font-normal">{value.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
