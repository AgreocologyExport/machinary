import { motion } from "motion/react";
import { useInView } from "motion/react";
import { useRef } from "react";
import { Award, ShieldCheck, Leaf, FileCheck, CheckCircle2 } from "lucide-react";

export function CertificationsPage() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const certifications = [
    {
      icon: Award,
      name: "ISO 9001:2015",
      category: "Quality Management",
      description: "International standard for quality management systems ensuring consistent quality in products and services.",
      validUntil: "Dec 2026",
      issuedBy: "International Organization for Standardization",
      benefits: [
        "Systematic quality control processes",
        "Continuous improvement framework",
        "Customer satisfaction focus",
        "Process optimization"
      ]
    },
    {
      icon: FileCheck,
      name: "HACCP",
      category: "Food Safety",
      description: "Hazard Analysis and Critical Control Points certification ensuring food safety throughout the supply chain.",
      validUntil: "Jun 2026",
      issuedBy: "Food Safety Authority",
      benefits: [
        "Hazard prevention system",
        "Critical control point monitoring",
        "Food safety assurance",
        "International recognition"
      ]
    },
    {
      icon: Leaf,
      name: "USDA Organic",
      category: "Organic Certification",
      description: "United States Department of Agriculture organic certification for products grown without synthetic pesticides.",
      validUntil: "Mar 2027",
      issuedBy: "USDA National Organic Program",
      benefits: [
        "Organic farming practices",
        "No synthetic chemicals",
        "Premium market access",
        "Environmental sustainability"
      ]
    },
    {
      icon: Leaf,
      name: "EU Organic",
      category: "Organic Certification",
      description: "European Union organic certification meeting strict organic farming and processing standards.",
      validUntil: "Mar 2027",
      issuedBy: "EU Organic Certification Body",
      benefits: [
        "EU market compliance",
        "Sustainable agriculture",
        "Premium product positioning",
        "Consumer trust"
      ]
    },
    {
      icon: ShieldCheck,
      name: "FSSAI",
      category: "Food Safety & Standards",
      description: "Food Safety and Standards Authority of India license ensuring compliance with national food safety regulations.",
      validUntil: "Ongoing",
      issuedBy: "FSSAI India",
      benefits: [
        "Legal compliance in India",
        "Food safety standards",
        "Manufacturing hygiene",
        "Consumer protection"
      ]
    },
    {
      icon: Award,
      name: "APEDA",
      category: "Agricultural Export",
      description: "Agricultural and Processed Food Products Export Development Authority registration for export promotion.",
      validUntil: "Ongoing",
      issuedBy: "APEDA India",
      benefits: [
        "Export authorization",
        "Quality standards compliance",
        "Government recognition",
        "Market development support"
      ]
    },
    {
      icon: ShieldCheck,
      name: "SGS Inspection",
      category: "Quality Verification",
      description: "SGS third-party inspection and quality verification for international shipments.",
      validUntil: "Per Shipment",
      issuedBy: "SGS Group",
      benefits: [
        "Independent quality verification",
        "Buyer confidence",
        "Dispute prevention",
        "Global acceptance"
      ]
    },
    {
      icon: FileCheck,
      name: "GMP Certified",
      category: "Good Manufacturing",
      description: "Good Manufacturing Practices certification ensuring quality production processes and facility standards.",
      validUntil: "Sep 2026",
      issuedBy: "GMP Certification Body",
      benefits: [
        "Quality production systems",
        "Facility hygiene standards",
        "Process documentation",
        "Product consistency"
      ]
    }
  ];

  const complianceStandards = [
    "International Food Safety Standards",
    "Codex Alimentarius Guidelines",
    "FDA Import Regulations (USA)",
    "EFSA Standards (Europe)",
    "Halal Certification (Available)",
    "Kosher Certification (Available)"
  ];



  return (
    <div ref={ref} className="min-h-screen">
      {/* Hero Section */}
      <section className="relative py-24 bg-gradient-to-br from-[#043F43] to-[#043F43]/90 text-white overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0" style={{
            backgroundImage: `radial-gradient(circle at 2px 2px, white 1px, transparent 0)`,
            backgroundSize: '40px 40px'
          }} />
        </div>

        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            <h1 className="text-white mb-6">Certifications & Compliance</h1>
            <p className="text-white/80 text-xl max-w-3xl mx-auto">
              Our commitment to quality and safety is validated by leading international certifications and strict adherence to global standards.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Certifications Grid */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-8">
            {certifications.map((cert, index) => (
              <motion.div
                key={cert.name}
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="bg-white rounded-3xl p-8 border border-[#07D185]/10 hover:shadow-xl transition-all duration-500"
              >
                <div className="flex items-start gap-6">
                  <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-[#07D185] to-[#07D185]/80 flex items-center justify-center flex-shrink-0 shadow-lg">
                    <cert.icon className="w-8 h-8 text-white" />
                  </div>

                  <div className="flex-1">
                    <div className="flex items-start justify-between mb-2">
                      <div>
                        <h3 className="text-[#043F43] mb-1">{cert.name}</h3>
                        <div className="text-[#07D185] text-sm">{cert.category}</div>
                      </div>
                      <div className="text-right">
                        <div className="text-xs text-[#043F43] opacity-60">Valid Until</div>
                        <div className="text-sm text-[#043F43]">{cert.validUntil}</div>
                      </div>
                    </div>

                    <p className="text-[#043F43] opacity-70 mb-4 text-sm">
                      {cert.description}
                    </p>

                    <div className="mb-4 pb-4 border-b border-[#07D185]/10">
                      <div className="text-xs text-[#043F43] opacity-60 mb-1">Issued By</div>
                      <div className="text-sm text-[#043F43]">{cert.issuedBy}</div>
                    </div>

                    <div>
                      <div className="text-sm text-[#043F43] mb-3">Key Benefits:</div>
                      <ul className="space-y-2">
                        {cert.benefits.map((benefit, idx) => (
                          <li key={idx} className="flex items-start gap-2">
                            <CheckCircle2 className="w-4 h-4 text-[#07D185] flex-shrink-0 mt-0.5" />
                            <span className="text-sm text-[#043F43] opacity-70">{benefit}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Compliance Standards */}
      <section className="py-24 bg-gradient-to-b from-[#07D185]/5 to-white">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-[#043F43] mb-6">Additional Compliance Standards</h2>
            <div className="w-16 h-1 bg-[#07D185] mx-auto mb-8 rounded-full" />
          </motion.div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
            {complianceStandards.map((standard, index) => (
              <motion.div
                key={standard}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={isInView ? { opacity: 1, scale: 1 } : {}}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-white rounded-2xl p-6 border border-[#07D185]/10 flex items-center gap-4 hover:shadow-lg transition-shadow"
              >
                <CheckCircle2 className="w-6 h-6 text-[#07D185] flex-shrink-0" />
                <span className="text-[#043F43]">{standard}</span>
              </motion.div>
            ))}
          </div>

          {/* Quality Assurance Process */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="bg-[#043F43] rounded-3xl p-12 text-white"
          >
            <div className="text-center mb-12">
              <h2 className="text-white mb-6">Our Quality Assurance Process</h2>
              <div className="w-16 h-1 bg-[#07D185] mx-auto rounded-full" />
            </div>

            <div className="grid md:grid-cols-4 gap-8">
              {[
                { step: "1", title: "Farm Inspection", desc: "On-site verification of farming practices" },
                { step: "2", title: "Lab Testing", desc: "Chemical and microbiological analysis" },
                { step: "3", title: "Processing Audit", desc: "Quality checks during processing" },
                { step: "4", title: "Pre-shipment Inspection", desc: "Final verification before export" }
              ].map((item, index) => (
                <div key={item.step} className="text-center">
                  <div className="w-16 h-16 rounded-full bg-[#07D185] text-white flex items-center justify-center text-xl mx-auto mb-4">
                    {item.step}
                  </div>
                  <h4 className="text-white mb-2">{item.title}</h4>
                  <p className="text-white/70 text-sm">{item.desc}</p>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid md:grid-cols-4 gap-8 text-center">
            {[
              { value: "100%", label: "Certified Products" },
              { value: "15+", label: "Active Certifications" },
              { value: "0", label: "Compliance Violations" },
              { value: "Annual", label: "Audit Frequency" }
            ].map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={isInView ? { opacity: 1, scale: 1 } : {}}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <div className="text-5xl text-[#07D185] mb-2">{stat.value}</div>
                <div className="text-[#043F43] opacity-70">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
