import { motion } from "motion/react";
import { Facebook, Twitter, Linkedin, Instagram } from "lucide-react";
import logoIcon from "../assets/favicon.ico";

interface FooterProps {
  onNavigate: (page: string) => void;
}

export function Footer({ onNavigate }: FooterProps) {
  const currentYear = new Date().getFullYear();

  const socialLinks = [
    { icon: Facebook, href: "https://facebook.com/agreocology", label: "Facebook" },
    { icon: Twitter, href: "https://twitter.com/agreocology", label: "Twitter" },
    { icon: Linkedin, href: "https://linkedin.com/company/agreocology", label: "LinkedIn" },
    { icon: Instagram, href: "https://instagram.com/agreocology", label: "Instagram" }
  ];

  const footerLinks = {
    Company: [
      { name: "About Us", page: "about" },
      { name: "Our Team", page: "about" },
      { name: "Careers", page: "about" },
      { name: "News", page: "blogs" }
    ],
    Products: [
      { name: "Pulses", page: "products" },
      { name: "Grains", page: "products" },
      { name: "Spices", page: "products" },
      { name: "Oil Seeds", page: "products" }
    ],
    Resources: [
      { name: "Export Guide", page: "exports" },
      { name: "Certifications", page: "certifications" },
      { name: "Blog", page: "blogs" },
      { name: "FAQ", page: "contact" }
    ],
    Support: [
      { name: "Contact Us", page: "contact" },
      { name: "Business Inquiry", page: "contact" },
      { name: "Global Exports", page: "exports" },
      { name: "Privacy Policy", page: "about" }
    ]
  };

  const handleNavClick = (page: string) => {
    onNavigate(page);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="bg-[#043F43] text-white">
      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="grid md:grid-cols-2 lg:grid-cols-6 gap-8 mb-12">
          {/* Brand Section */}
          <div className="lg:col-span-2">
            <div className="flex items-center gap-2 mb-4 cursor-pointer" onClick={() => handleNavClick("home")}>
              <img src={logoIcon} alt="Agreocology" className="h-[26px] w-auto object-contain" />
              <div className="flex flex-col">
                <h3 className="text-[17px] font-medium leading-none text-white tracking-tight">Agreocology</h3>
                <span className="text-[#07D185] text-[9.5px] font-normal tracking-wide">Viands Impex Pvt. Ltd.</span>
              </div>
            </div>
            <p className="text-white/70 text-xs leading-relaxed mb-6 max-w-xs transition-colors">
              Connecting global markets with premium agricultural products through sustainable and ethical practices.
            </p>
            <div className="flex gap-4">
              {socialLinks.map((social) => (
                <motion.a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.label}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  className="w-8 h-8 rounded-full bg-white/10 hover:bg-[#07D185] flex items-center justify-center transition-colors duration-300"
                >
                  <social.icon className="w-4 h-4" />
                </motion.a>
              ))}
            </div>
          </div>

          {/* Links Sections */}
          {Object.entries(footerLinks).map(([category, links]) => (
            <div key={category}>
              <h4 className="text-white font-medium mb-4 text-sm">{category}</h4>
              <ul className="space-y-2">
                {links.map((link) => (
                  <li key={link.name}>
                    <button
                      onClick={() => handleNavClick(link.page)}
                      className="text-white/60 hover:text-[#07D185] transition-colors duration-300 text-xs text-left"
                    >
                      {link.name}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Export Disclaimer */}
        <div className="mb-8 pb-8 border-b border-white/10">
          <p className="text-white/50 text-[10px] leading-relaxed">
            <strong className="text-white/70">Export Disclaimer:</strong> All products are subject to availability and minimum order quantities. Export regulations and documentation requirements vary by destination country. Prices and terms are subject to change. Please contact our export team for current quotations and detailed information.
          </p>
        </div>

        {/* Bottom Bar */}
        <div className="pt-2">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-white/50 text-[10px]">
              © {currentYear} Agreocology. All rights reserved.
            </p>
            <div className="flex gap-6">
              <button onClick={() => handleNavClick("about")} className="text-white/50 hover:text-white transition-colors text-[10px]">
                Privacy Policy
              </button>
              <button onClick={() => handleNavClick("about")} className="text-white/50 hover:text-white transition-colors text-[10px]">
                Terms of Service
              </button>
              <button onClick={() => handleNavClick("about")} className="text-white/50 hover:text-white transition-colors text-[10px]">
                Cookie Policy
              </button>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}