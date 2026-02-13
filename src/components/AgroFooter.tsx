import { motion } from "motion/react";
import { Facebook, Twitter, Linkedin, Instagram, MapPin, Phone, Mail } from "lucide-react";
import favicon from "../assets/favicon.ico";

interface AgroFooterProps {
    onNavigate: (page: string, id?: any) => void;
}

export function AgroFooter({ onNavigate }: AgroFooterProps) {
    const currentYear = new Date().getFullYear();

    const handleNavClick = (page: string) => {
        onNavigate(page);
        window.scrollTo({ top: 0, behavior: "smooth" });
    };

    const socialLinks = [
        { icon: Facebook, href: "#", label: "Facebook" },
        { icon: Twitter, href: "#", label: "Twitter" },
        { icon: Instagram, href: "#", label: "Instagram" },
        { icon: Linkedin, href: "#", label: "LinkedIn" }
    ];

    const quickLinks = [
        { name: "Home", id: "home" },
        { name: "About Us", id: "about" },
        { name: "Products", id: "products" },
        { name: "Global Exports", id: "exports" },
        { name: "Certifications", id: "certifications" },
        { name: "Blog", id: "blogs" },
        { name: "Contact", id: "contact" }
    ];

    return (
        <footer className="bg-[#032D30] text-white py-20 font-['Helvetica']">
            <div className="max-w-7xl mx-auto px-6">
                <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-12 mb-16">

                    {/* Branding & Description */}
                    <div className="space-y-6 lg:col-span-1">
                        <div className="flex items-center gap-2">
                            <div className="w-4 h-4 bg-[#07D185] rounded-sm flex items-center justify-center">
                                <div className="w-1.5 h-1.5 border-t border-r border-[#032D30]"></div>
                            </div>
                        </div>
                        <p className="text-white/70 text-sm leading-relaxed max-w-[200px]">
                            Connecting global markets with premium agricultural products through sustainable and ethical practices.
                        </p>
                        <div className="flex gap-3">
                            {socialLinks.map((social) => (
                                <motion.a
                                    key={social.label}
                                    href={social.href}
                                    whileHover={{ scale: 1.1, backgroundColor: "#07D185" }}
                                    className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-white transition-all duration-300 border border-white/10"
                                >
                                    <social.icon size={18} />
                                </motion.a>
                            ))}
                        </div>
                    </div>

                    {/* Company */}
                    <div>
                        <h4 className="text-white font-semibold text-lg mb-6">Company</h4>
                        <ul className="space-y-3">
                            {[{ name: "About Us", id: "about" }, { name: "Our Team", id: "team" }, { name: "Careers", id: "careers" }, { name: "News", id: "news" }].map((link) => (
                                <li key={link.name}>
                                    <button
                                        onClick={() => link.id && handleNavClick(link.id)}
                                        className="text-white/60 hover:text-[#07D185] transition-colors duration-300 text-sm font-light"
                                    >
                                        {link.name}
                                    </button>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Products */}
                    <div>
                        <h4 className="text-white font-semibold text-lg mb-6">Products</h4>
                        <ul className="space-y-3">
                            {["Pulses", "Grains", "Spices", "Oil Seeds"].map((item) => (
                                <li key={item}>
                                    <button
                                        onClick={() => handleNavClick("products")}
                                        className="text-white/60 hover:text-[#07D185] transition-colors duration-300 text-sm font-light"
                                    >
                                        {item}
                                    </button>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Resources */}
                    <div>
                        <h4 className="text-white font-semibold text-lg mb-6">Resources</h4>
                        <ul className="space-y-3">
                            {[{ name: "Export Guide", id: "exports" }, { name: "Certifications", id: "certifications" }, { name: "Blog", id: "blogs" }, { name: "FAQ", id: "faq" }].map((link) => (
                                <li key={link.name}>
                                    <button
                                        onClick={() => link.id && handleNavClick(link.id)}
                                        className="text-white/60 hover:text-[#07D185] transition-colors duration-300 text-sm font-light"
                                    >
                                        {link.name}
                                    </button>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Support */}
                    <div>
                        <h4 className="text-white font-semibold text-lg mb-6">Support</h4>
                        <ul className="space-y-3">
                            {[{ name: "Contact Us", id: "contact" }, { name: "Business Inquiry", id: "contact" }, { name: "Global Exports", id: "exports" }, { name: "Privacy Policy", id: "privacy" }].map((link) => (
                                <li key={link.name}>
                                    <button
                                        onClick={() => link.id && handleNavClick(link.id)}
                                        className="text-white/60 hover:text-[#07D185] transition-colors duration-300 text-sm font-light"
                                    >
                                        {link.name}
                                    </button>
                                </li>
                            ))}
                        </ul>
                    </div>

                </div>

                <div className="border-t border-white/10 pt-8 mt-12">
                    <div className="max-w-4xl">
                        <p className="text-white/40 text-xs leading-relaxed">
                            <span className="font-semibold text-white/60">Export Disclaimer:</span> All products are subject to availability and minimum order quantities. Export regulations and documentation requirements vary by destination country. Prices and terms are subject to change. Please contact our export team for current quotations and detailed information.
                        </p>
                    </div>
                </div>
            </div>
        </footer>
    );
}
