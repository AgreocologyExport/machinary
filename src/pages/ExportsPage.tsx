import { motion } from "motion/react";
import { useInView } from "motion/react";
import { useRef, useState, useEffect } from "react";
import { Ship, Plane, Package, FileText, ShieldCheck, CheckCircle2, Globe2, Anchor } from "lucide-react";

export function ExportsPage() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const shippingMethods = [
    {
      icon: Ship,
      title: "Sea Freight",
      description: "Cost-effective containerized shipping for bulk orders",
      features: ["20' & 40' containers", "FCL & LCL options", "Temperature controlled", "Transit: 15-45 days"]
    },
    {
      icon: Plane,
      title: "Air Freight",
      description: "Fast delivery for perishable and urgent shipments",
      features: ["Express delivery", "Fresh produce priority", "Cold chain logistics", "Transit: 2-7 days"]
    },
    {
      icon: Package,
      title: "Consolidated Cargo",
      description: "Flexible shipping for mixed or smaller quantities",
      features: ["Mixed containers", "Shared logistics", "Cost optimization", "Custom solutions"]
    }
  ];

  const logistics = [
    {
      name: "Maersk Line",
      type: "Sea Freight Partner",
      coverage: "Global"
    },
    {
      name: "MSC (Mediterranean Shipping)",
      type: "Sea Freight Partner",
      coverage: "Worldwide"
    },
    {
      name: "DHL Express",
      type: "Air Freight Partner",
      coverage: "220+ Countries"
    },
    {
      name: "FedEx International",
      type: "Air Freight Partner",
      coverage: "Global"
    }
  ];

  const documentation = [
    {
      icon: FileText,
      title: "Commercial Invoice",
      description: "Detailed product and pricing information"
    },
    {
      icon: FileText,
      title: "Packing List",
      description: "Complete shipment contents documentation"
    },
    {
      icon: ShieldCheck,
      title: "Phytosanitary Certificate",
      description: "Plant health certification for agricultural products"
    },
    {
      icon: FileText,
      title: "Certificate of Origin",
      description: "Product origin verification"
    },
    {
      icon: ShieldCheck,
      title: "FSSAI License",
      description: "Food safety compliance certification"
    },
    {
      icon: FileText,
      title: "Bill of Lading",
      description: "Shipping and cargo ownership document"
    },
    {
      icon: ShieldCheck,
      title: "SGS Inspection Report",
      description: "Third-party quality verification"
    },
    {
      icon: FileText,
      title: "APEDA Certification",
      description: "Agricultural export approval"
    }
  ];

  const regions = [
    { region: "North America", countries: 8, volume: "15%" },
    { region: "Europe", countries: 15, volume: "25%" },
    { region: "Middle East", countries: 12, volume: "30%" },
    { region: "Asia Pacific", countries: 10, volume: "20%" },
    { region: "Africa", countries: 8, volume: "10%" }
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
            <h1 className="text-white mb-6">Global Export Operations</h1>
            <p className="text-white/80 text-xl max-w-3xl mx-auto">
              Connecting farms to global markets through reliable logistics, comprehensive documentation, and world-class export services.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Global Reach Map */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-[#043F43] mb-6">Our Global Footprint</h2>
            <div className="w-16 h-1 bg-[#07D185] mx-auto mb-8 rounded-full" />
          </motion.div>

          {/* Map Visualization */}
          <div className="mb-16 bg-gradient-to-br from-[#07D185]/5 to-[#043F43]/5 rounded-3xl p-12">
            <div className="relative h-96 flex items-center justify-center">
              <motion.div
                initial={{ scale: 0 }}
                animate={isInView ? { scale: 1 } : {}}
                transition={{ duration: 0.8 }}
                className="relative"
              >
                <div className="w-24 h-24 rounded-full bg-[#07D185] flex items-center justify-center shadow-2xl">
                  <Globe2 className="w-12 h-12 text-white" />
                </div>
                <div className="absolute inset-0 rounded-full bg-[#07D185] animate-ping opacity-20" />
              </motion.div>

              {/* Connection Lines */}
              {[0, 45, 90, 135, 180, 225, 270, 315].map((angle, i) => (
                <motion.div
                  key={angle}
                  initial={{ scale: 0 }}
                  animate={isInView ? { scale: 1 } : {}}
                  transition={{ duration: 0.6, delay: 0.3 + i * 0.05 }}
                  className="absolute"
                  style={{
                    width: '180px',
                    height: '2px',
                    background: 'linear-gradient(90deg, #07D185 0%, transparent 100%)',
                    transformOrigin: 'left center',
                    transform: `rotate(${angle}deg)`,
                    left: '50%',
                    top: '50%'
                  }}
                />
              ))}
            </div>
          </div>

          {/* Regional Stats */}
          <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-6">
            {regions.map((region, index) => (
              <motion.div
                key={region.region}
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="bg-white border border-[#07D185]/10 rounded-2xl p-6 text-center hover:shadow-lg transition-shadow"
              >
                <div className="text-3xl text-[#07D185] mb-2">{region.countries}+</div>
                <div className="text-[#043F43] mb-2">{region.region}</div>
                <div className="text-[#043F43] opacity-60 text-sm">{region.volume} of exports</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Shipping Methods */}
      <section className="py-24 bg-gradient-to-b from-white to-[#07D185]/5">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-[#043F43] mb-6">Shipping Methods</h2>
            <div className="w-16 h-1 bg-[#07D185] mx-auto mb-8 rounded-full" />
            <p className="text-[#043F43] opacity-80 max-w-2xl mx-auto">
              Flexible shipping solutions tailored to your product requirements and delivery timelines.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {shippingMethods.map((method, index) => (
              <motion.div
                key={method.title}
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                className="bg-white rounded-3xl p-8 shadow-sm hover:shadow-xl transition-all duration-500"
              >
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-[#07D185] to-[#07D185]/80 flex items-center justify-center mb-6 shadow-lg">
                  <method.icon className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-[#043F43] mb-3">{method.title}</h3>
                <p className="text-[#043F43] opacity-70 mb-6">{method.description}</p>
                <ul className="space-y-2">
                  {method.features.map((feature, idx) => (
                    <li key={idx} className="flex items-center gap-2 text-[#043F43] opacity-80 text-sm">
                      <CheckCircle2 className="w-4 h-4 text-[#07D185] flex-shrink-0" />
                      {feature}
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Logistics Partners */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-[#043F43] mb-6">Logistics Partners</h2>
            <div className="w-16 h-1 bg-[#07D185] mx-auto mb-8 rounded-full" />
            <p className="text-[#043F43] opacity-80 max-w-2xl mx-auto">
              Partnering with world-leading logistics providers for reliable global delivery.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {logistics.map((partner, index) => (
              <motion.div
                key={partner.name}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={isInView ? { opacity: 1, scale: 1 } : {}}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-gradient-to-br from-white to-[#07D185]/5 border border-[#07D185]/10 rounded-2xl p-6 text-center"
              >
                <Anchor className="w-12 h-12 text-[#07D185] mx-auto mb-4" />
                <h4 className="text-[#043F43] mb-2">{partner.name}</h4>
                <p className="text-[#043F43] opacity-60 text-sm mb-1">{partner.type}</p>
                <p className="text-[#07D185] text-sm">{partner.coverage}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Documentation */}
      <section className="py-24 bg-gradient-to-b from-[#07D185]/5 to-white">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-[#043F43] mb-6">Export Documentation & Compliance</h2>
            <div className="w-16 h-1 bg-[#07D185] mx-auto mb-8 rounded-full" />
            <p className="text-[#043F43] opacity-80 max-w-2xl mx-auto">
              Complete documentation support ensuring smooth customs clearance and regulatory compliance.
            </p>
          </motion.div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {documentation.map((doc, index) => (
              <motion.div
                key={doc.title}
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: index * 0.05 }}
                className="bg-white rounded-2xl p-6 border border-[#07D185]/10 hover:shadow-lg transition-shadow"
              >
                <doc.icon className="w-10 h-10 text-[#07D185] mb-4" />
                <h4 className="text-[#043F43] mb-2">{doc.title}</h4>
                <p className="text-[#043F43] opacity-70 text-sm">{doc.description}</p>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="mt-16 bg-[#043F43] rounded-3xl p-12 text-center text-white"
          >
            <h3 className="text-white mb-4">Need Export Documentation Support?</h3>
            <p className="text-white/80 mb-6 max-w-2xl mx-auto">
              Our experienced team handles all export documentation, ensuring compliance with international regulations and smooth customs clearance.
            </p>
            <div className="flex flex-wrap justify-center gap-4 text-sm">
              <span className="px-4 py-2 bg-white/10 rounded-full">FSSAI Certified</span>
              <span className="px-4 py-2 bg-white/10 rounded-full">APEDA Registered</span>
              <span className="px-4 py-2 bg-white/10 rounded-full">SGS Verified</span>
              <span className="px-4 py-2 bg-white/10 rounded-full">ISO Compliant</span>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
