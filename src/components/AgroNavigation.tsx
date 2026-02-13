import { motion, AnimatePresence } from "motion/react";
import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Menu, X, Home, Info, Package, Globe, Award, BookOpen, Mail, ChevronRight, ChevronDown } from "lucide-react";
import logo from "../assets/logo-png.png";

interface AgroNavigationProps {
    onNavigate: (page: string, id?: any) => void;
}

export function AgroNavigation({ onNavigate }: AgroNavigationProps) {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [isProductDropdownOpen, setIsProductDropdownOpen] = useState(false);
    const [isMobileProductOpen, setIsMobileProductOpen] = useState(false);
    const location = useLocation();
    const navigate = useNavigate();

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 20);
        };
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth >= 1024) {
                setIsMobileMenuOpen(false);
            }
        };
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    useEffect(() => {
        if (isMobileMenuOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }
        return () => {
            document.body.style.overflow = 'unset';
        };
    }, [isMobileMenuOpen]);

    const navItems = [
        { name: "Home", path: "home", icon: Home },
        { name: "About", path: "about", icon: Info },
        {
            name: "Products",
            path: "products",
            icon: Package,
            subItems: [
                { name: "Agro Products", path: "products" },
                { name: "Machinary Products", path: "machinery-products" }
            ]
        },
        { name: "Global Exports", path: "exports", icon: Globe },
        { name: "Certifications", path: "certifications", icon: Award },
        { name: "Blog", path: "blogs", icon: BookOpen },
        { name: "Contact", path: "contact", icon: Mail },
    ];

    const handleNavClick = (path: string) => {
        onNavigate(path);
        setIsMobileMenuOpen(false);
        window.scrollTo({ top: 0, behavior: "smooth" });
    };

    return (
        <>
            <motion.nav
                initial={{ y: -100 }}
                animate={{ y: 0 }}
                className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 bg-white border-b border-gray-100 ${isScrolled ? "shadow-md" : ""}`}
            >
                <div className="max-w-7xl mx-auto">
                    <div className="flex items-center justify-between h-14 sm:h-16">
                        {/* Logo */}
                        <motion.div
                            onClick={() => handleNavClick("home")}
                            className="flex items-center cursor-pointer shrink-0"
                            whileTap={{ scale: 0.98 }}
                        >
                            <img src={logo} alt="Agreocology" className="h-11 w-auto object-contain" />
                        </motion.div>

                        {/* Desktop Navigation - Right Aligned */}
                        <div className="hidden lg:flex items-center gap-5">
                            {navItems.map((item) => {
                                const activePaths: string[] = [
                                    `/agro-products/${item.path}`,
                                    `/agro-products/${item.path}/`,
                                ];

                                if (item.path === "home") {
                                    activePaths.push("/agro-products", "/agro-products/", "/home");
                                }

                                const isActive = activePaths.some(p => location.pathname === p) ||
                                    (item.path !== "home" && location.pathname.endsWith(`/${item.path}`));

                                if (item.subItems) {
                                    return (
                                        <div
                                            key={item.path}
                                            className="relative group"
                                            onMouseEnter={() => setIsProductDropdownOpen(true)}
                                            onMouseLeave={() => setIsProductDropdownOpen(false)}
                                        >
                                            <motion.button
                                                whileTap={{ scale: 0.98 }}
                                                className={`px-3 py-1.5 text-[13px] font-medium transition-all duration-300 relative group flex items-center gap-1.5 whitespace-nowrap ${isActive ? "text-[#00D084]" : "text-[#1e293b] hover:text-[#00D084]"}`}
                                            >
                                                <span>{item.name}</span>
                                                <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-300 ${isProductDropdownOpen ? "rotate-180" : ""}`} />
                                                {isActive && (
                                                    <motion.div
                                                        layoutId="agro-underline"
                                                        className="absolute -bottom-1 left-3 right-3 h-0.5 bg-[#00D084]"
                                                        initial={false}
                                                    />
                                                )}
                                            </motion.button>

                                            <AnimatePresence>
                                                {isProductDropdownOpen && (
                                                    <motion.div
                                                        initial={{ opacity: 0, y: 10 }}
                                                        animate={{ opacity: 1, y: 0 }}
                                                        exit={{ opacity: 0, y: 10 }}
                                                        className="absolute top-full left-0 mt-1 w-48 bg-white border border-gray-100 rounded-xl shadow-xl py-2 z-50 overflow-hidden"
                                                    >
                                                        {item.subItems.map((subItem) => (
                                                            <button
                                                                key={subItem.path}
                                                                onClick={() => handleNavClick(subItem.path)}
                                                                className="w-full text-left px-4 py-2.5 text-[13px] font-medium text-[#1e293b] hover:bg-[#00D084]/5 hover:text-[#00D084] transition-colors"
                                                            >
                                                                {subItem.name}
                                                            </button>
                                                        ))}
                                                    </motion.div>
                                                )}
                                            </AnimatePresence>
                                        </div>
                                    );
                                }

                                return (
                                    <motion.button
                                        key={item.path}
                                        onClick={() => handleNavClick(item.path)}
                                        whileTap={{ scale: 0.98 }}
                                        className={`px-3 py-1.5 text-[13px] font-medium transition-all duration-300 relative group whitespace-nowrap ${isActive ? "text-[#00D084]" : "text-[#1e293b] hover:text-[#00D084]"}`}
                                    >
                                        <span>{item.name}</span>
                                        {isActive && (
                                            <motion.div
                                                layoutId="agro-underline"
                                                className="absolute -bottom-1 left-3 right-3 h-0.5 bg-[#00D084]"
                                                initial={false}
                                            />
                                        )}
                                        {!isActive && (
                                            <div className="absolute -bottom-1 left-3 right-3 h-0.5 bg-[#00D084] scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-center" />
                                        )}
                                    </motion.button>
                                );
                            })}
                        </div>

                        {/* Mobile Menu Button */}
                        <motion.button
                            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                            className="lg:hidden p-2.5 rounded-xl hover:bg-gray-100 active:bg-gray-200 transition-colors relative"
                            aria-label="Toggle menu"
                            whileTap={{ scale: 0.95 }}
                        >
                            <AnimatePresence mode="wait">
                                {isMobileMenuOpen ? (
                                    <motion.div
                                        key="close"
                                        initial={{ rotate: -90, opacity: 0 }}
                                        animate={{ rotate: 0, opacity: 1 }}
                                        exit={{ rotate: 90, opacity: 0 }}
                                        transition={{ duration: 0.2 }}
                                    >
                                        <X className="w-6 h-6 text-[#043F43]" />
                                    </motion.div>
                                ) : (
                                    <motion.div
                                        key="menu"
                                        initial={{ rotate: 90, opacity: 0 }}
                                        animate={{ rotate: 0, opacity: 1 }}
                                        exit={{ rotate: -90, opacity: 0 }}
                                        transition={{ duration: 0.2 }}
                                    >
                                        <Menu className="w-6 h-6 text-[#043F43]" />
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </motion.button>
                    </div>
                </div>

                {/* Side Drawer Mobile Menu */}
                <AnimatePresence>
                    {isMobileMenuOpen && (
                        <>
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                className="fixed inset-0 bg-black/40 backdrop-blur-sm lg:hidden z-[55]"
                                onClick={() => setIsMobileMenuOpen(false)}
                            />

                            <motion.div
                                initial={{ x: "100%" }}
                                animate={{ x: 0 }}
                                exit={{ x: "100%" }}
                                transition={{ type: "spring", damping: 30, stiffness: 300 }}
                                className="fixed top-0 right-0 h-full w-[85%] max-w-sm bg-white shadow-2xl lg:hidden z-[60] flex flex-col"
                            >
                                <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100 bg-white">
                                    <div className="flex items-center cursor-pointer" onClick={() => handleNavClick("home")}>
                                        <img src={logo} alt="Agreocology" className="h-14 w-auto object-contain" />
                                    </div>
                                    <motion.button
                                        onClick={() => setIsMobileMenuOpen(false)}
                                        className="p-2 rounded-lg hover:bg-gray-100 active:bg-gray-200 transition-colors"
                                    >
                                        <X className="w-5 h-5 text-[#043F43]" />
                                    </motion.button>
                                </div>

                                <div className="flex-1 overflow-y-auto px-4 py-6">
                                    <nav className="space-y-2">
                                        {navItems.map((item, index) => {
                                            const Icon = item.icon;

                                            const activePaths = [`/agro-products/${item.path}`, `/agro-products/${item.path}/`];
                                            if (item.path === "home") activePaths.push("/agro-products", "/agro-products/", "/home");

                                            const isActive = activePaths.some(p => location.pathname === p) ||
                                                (item.path !== "home" && location.pathname.endsWith(`/${item.path}`));

                                            if (item.subItems) {
                                                return (
                                                    <div key={item.path} className="space-y-1">
                                                        <motion.button
                                                            initial={{ opacity: 0, x: 50 }}
                                                            animate={{ opacity: 1, x: 0 }}
                                                            transition={{ delay: index * 0.05, duration: 0.3 }}
                                                            onClick={() => setIsMobileProductOpen(!isMobileProductOpen)}
                                                            className={`group relative w-full flex items-center justify-between px-4 py-4 rounded-xl text-left transition-all duration-300 ${isActive
                                                                ? "bg-gradient-to-r from-[#07D185] to-[#05b36d] text-white shadow-lg shadow-[#07D185]/30"
                                                                : "text-[#043F43] hover:bg-gradient-to-r hover:from-[#07D185]/10 hover:to-[#07D185]/5 active:scale-[0.98]"}`}
                                                        >
                                                            <div className="flex items-center gap-4">
                                                                <div className={`p-2.5 rounded-xl transition-all ${isActive ? "bg-white/20" : "bg-[#043F43]/5 group-hover:bg-[#07D185]/20"}`}>
                                                                    <Icon className={`w-5 h-5 ${isActive ? "text-white" : "text-[#043F43] group-hover:text-[#07D185]"}`} />
                                                                </div>
                                                                <span className="font-medium text-base">{item.name}</span>
                                                            </div>
                                                            <ChevronDown className={`w-5 h-5 transition-transform duration-300 ${isMobileProductOpen ? "rotate-180" : ""}`} />
                                                        </motion.button>

                                                        <AnimatePresence>
                                                            {isMobileProductOpen && (
                                                                <motion.div
                                                                    initial={{ height: 0, opacity: 0 }}
                                                                    animate={{ height: "auto", opacity: 1 }}
                                                                    exit={{ height: 0, opacity: 0 }}
                                                                    className="overflow-hidden pl-14 pr-4 py-1"
                                                                >
                                                                    {item.subItems.map((subItem) => (
                                                                        <button
                                                                            key={subItem.path}
                                                                            onClick={() => handleNavClick(subItem.path)}
                                                                            className="w-full text-left py-3 text-sm font-medium text-[#043F43]/70 hover:text-[#07D185] transition-colors"
                                                                        >
                                                                            {subItem.name}
                                                                        </button>
                                                                    ))}
                                                                </motion.div>
                                                            )}
                                                        </AnimatePresence>
                                                    </div>
                                                );
                                            }

                                            return (
                                                <motion.button
                                                    key={item.path}
                                                    initial={{ opacity: 0, x: 50 }}
                                                    animate={{ opacity: 1, x: 0 }}
                                                    transition={{ delay: index * 0.05, duration: 0.3 }}
                                                    onClick={() => handleNavClick(item.path)}
                                                    className={`group relative w-full flex items-center justify-between px-4 py-4 rounded-xl text-left transition-all duration-300 ${isActive
                                                        ? "bg-gradient-to-r from-[#07D185] to-[#05b36d] text-white shadow-lg shadow-[#07D185]/30"
                                                        : "text-[#043F43] hover:bg-gradient-to-r hover:from-[#07D185]/10 hover:to-[#07D185]/5 active:scale-[0.98]"}`}
                                                >
                                                    <div className="flex items-center gap-4">
                                                        <div className={`p-2.5 rounded-xl transition-all ${isActive ? "bg-white/20" : "bg-[#043F43]/5 group-hover:bg-[#07D185]/20"}`}>
                                                            <Icon className={`w-5 h-5 ${isActive ? "text-white" : "text-[#043F43] group-hover:text-[#07D185]"}`} />
                                                        </div>
                                                        <span className="font-medium text-base">{item.name}</span>
                                                    </div>
                                                    <ChevronRight className={`w-5 h-5 transition-all ${isActive ? "text-white/80 translate-x-0.5" : "text-[#043F43]/30 group-hover:text-[#07D185] group-hover:translate-x-1"}`} />
                                                </motion.button>
                                            );
                                        })}
                                    </nav>
                                </div>
                            </motion.div>
                        </>
                    )}
                </AnimatePresence>
            </motion.nav>
            <div className="h-14 sm:h-16" />
        </>
    );
}
