import { motion } from "motion/react";
import { createElement } from "react";
import { Award, FileCheck, Leaf, Shield } from "lucide-react";

interface CertificationsProps {
  title?: string;
  description?: string;
  list?: any;
}

export function Certifications({
  title = "Certifications & Compliance",
  description = "Our commitment to quality and safety is validated by leading international certifications and compliance standards.",
}: CertificationsProps) {
  const icons = [Award, FileCheck, Leaf, Shield];

  // Updated to match the specific data requested in your latest image
  const certificationList = [
    {
      name: "ISO 9001:2015",
      description: "Quality Management System"
    },
    {
      name: "HACCP",
      description: "Food Safety Standards"
    },
    {
      name: "Organic Certified",
      description: "USDA & EU Organic"
    },
    {
      name: "FSSAI",
      description: "Food Safety Compliance"
    }
  ];

  return (
    <section className="py-24 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-[#043F43] text-4xl sm:text-5xl font-normal tracking-tight mb-6">{title}</h2>
          <div className="w-12 h-1 bg-[#00D084] mx-auto mb-8 rounded-full" />
          <p className="text-[#517a79] text-lg max-w-3xl mx-auto">
            {description}
          </p>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {certificationList.map((cert, index) => (
            <motion.div
              key={cert.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="bg-white rounded-3xl p-10 border border-[#f0f9f6] shadow-sm hover:shadow-md transition-all duration-300 text-center group"
            >
              <div className="w-20 h-20 mx-auto mb-8 rounded-full bg-[#f2faf9] flex items-center justify-center group-hover:scale-110 transition-transform duration-500">
                {createElement(icons[index % icons.length], { className: "w-10 h-10 text-[#00D084]" })}
              </div>
              <h4 className="text-[#043F43] mb-3 text-xl font-medium">{cert.name}</h4>
              <p className="text-[#517a79] text-base">{cert.description}</p>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="mt-20 text-center"
        >
          <p className="text-[#517a79] text-base font-medium opacity-80">
            All products are tested and certified to meet international quality and safety standards
          </p>
        </motion.div>
      </div>
    </section>
  );
}
