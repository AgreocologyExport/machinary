import { motion, AnimatePresence } from "motion/react";
import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Menu, X, Home, Info, Package, Globe, Award, BookOpen, Mail, ChevronRight, Settings, LayoutGrid } from "lucide-react";
import logoIcon from "../assets/favicon.ico";

interface NavigationProps {
  currentPage: string;
  onNavigate: (page: string, id?: any) => void;
}

export function Navigation({ currentPage, onNavigate }: NavigationProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const isMachinerySide = location.pathname.startsWith('/Agreocology');

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close mobile menu on resize to desktop
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) {
        setIsMobileMenuOpen(false);
      }
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Prevent body scroll when mobile menu is open
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
    { name: "Home", path: "machinery-home", icon: Home },
    { name: "About", path: "machinery-about", icon: Info },
    { name: "Products", path: "machinery-products", icon: Package },
    { name: "Global Exports", path: "machinery-exports", icon: Globe },
    { name: "Certifications", path: "machinery-certifications", icon: Award },
    { name: "Blog", path: "machinery-blogs", icon: BookOpen },
    { name: "Contact", path: "machinery-contact", icon: Mail },
  ];

  const handleNavClick = (path: string) => {
    onNavigate(path);
    setIsMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const toggleSide = () => {
    navigate('/home');
    setIsMobileMenuOpen(false);
  };

  return (
    <>
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 bg-white border-b border-gray-100 ${!isMachinerySide && isScrolled ? "shadow-md" : ""
          }`}
      >
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex items-center justify-between h-14 sm:h-16">
            {/* Logo */}
            <motion.div
              onClick={() => handleNavClick("machinery-home")}
              className="flex items-center gap-2 cursor-pointer shrink-0"
              whileTap={{ scale: 0.98 }}
            >
              <img src={logoIcon} alt="Agreocology" className="h-7 w-auto object-contain" />
              <div className="hidden sm:flex flex-col">
                <h3 className={`text-lg font-medium leading-none tracking-tight transition-colors duration-300 ${isMachinerySide || isScrolled ? "text-[#043F43]" : "text-white"
                  }`}>Agreocology</h3>
                <span className="text-[#07D185] text-[10px] font-normal tracking-wide">Viands Impex Pvt. Ltd.</span>
              </div>
            </motion.div>

            {/* Desktop Navigation - Centered */}
            <div className="hidden lg:flex items-center absolute left-1/2 -translate-x-1/2 gap-0">
              {navItems.map((item) => {
                const activePaths: Record<string, string[]> = {
                  "machinery-home": ["/Agreocology", "/Agreocology/"],
                  "home": ["/agro-products", "/agro-products/", "/home"]
                };

                let isActive = false;
                if (item.path === "machinery-home" || item.path === "home") {
                  isActive = activePaths[item.path]?.includes(location.pathname) || false;
                } else {
                  const pathSegment = item.path.split('-').pop() || item.path;
                  // Ensure we match the right side (agro vs machinery)
                  const matchesSegment = location.pathname.includes(pathSegment);
                  const matchesSide = isMachinerySide === item.path.startsWith('machinery');
                  isActive = matchesSegment && matchesSide && location.pathname !== '/';
                }

                return (
                  <motion.button
                    key={item.path}
                    onClick={() => handleNavClick(item.path)}
                    whileTap={{ scale: 0.98 }}
                    className={`px-[3px] py-1.5 text-[13px] font-medium transition-all duration-300 relative group whitespace-nowrap ${isActive
                      ? "text-[#00D084]"
                      : isMachinerySide
                        ? "text-[#1e293b] hover:text-[#00D084]"
                        : isScrolled
                          ? "text-[#1e293b] hover:text-[#00D084]"
                          : "text-white/90 hover:text-white"
                      }`}
                  >
                    <span>{item.name}</span>
                    {isActive && (
                      <motion.div
                        layoutId="underline"
                        className="absolute -bottom-1 left-1 right-1 h-0.5 bg-[#00D084]"
                        initial={false}
                      />
                    )}
                    {/* Hover Underline effect */}
                    {!isActive && (
                      <div className="absolute -bottom-1 left-1 right-1 h-0.5 bg-[#00D084] scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-center" />
                    )}
                  </motion.button>
                );
              })}
            </div>

            {/* Desktop Action Button - Right */}
            <div className="hidden lg:block shrink-0">
              <motion.button
                onClick={toggleSide}
                whileHover={{ scale: 1.02, backgroundColor: "#05b36d" }}
                whileTap={{ scale: 0.98 }}
                className="px-5 py-2 bg-[#00D084] text-white rounded-lg text-[12px] font-bold shadow-lg shadow-[#00D084]/20 transition-all font-['Helvetica']"
              >
                {isMachinerySide ? "View Agro Products" : "View Machinery"}
              </motion.button>
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
              {/* Full Screen Backdrop */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="fixed inset-0 bg-black/40 backdrop-blur-sm lg:hidden z-[55]"
                onClick={() => setIsMobileMenuOpen(false)}
              />

              {/* Side Drawer - Slides from Right */}
              <motion.div
                initial={{ x: "100%" }}
                animate={{ x: 0 }}
                exit={{ x: "100%" }}
                transition={{ type: "spring", damping: 30, stiffness: 300 }}
                className="fixed top-0 right-0 h-full w-[85%] max-w-sm bg-white shadow-2xl lg:hidden z-[60] flex flex-col"
              >
                {/* Drawer Header */}
                <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100 bg-white">
                  <div
                    className="flex items-center gap-2 cursor-pointer"
                    onClick={() => handleNavClick(isMachinerySide ? "machinery-home" : "home")}
                  >
                    <img
                      src={logoIcon}
                      alt="Agreocology"
                      className="h-7 w-auto object-contain"
                    />
                    <div className="flex flex-col">
                      <h3 className="text-lg font-medium leading-none text-[#043F43] tracking-tight">Agreocology</h3>
                      <span className="text-[#07D185] text-[10px] font-normal tracking-wide">Viands Impex Pvt. Ltd.</span>
                    </div>
                  </div>
                  <motion.button
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="p-2 rounded-lg hover:bg-gray-100 active:bg-gray-200 transition-colors"
                    whileTap={{ scale: 0.9 }}
                  >
                    <X className="w-5 h-5 text-[#043F43]" />
                  </motion.button>
                </div>

                {/* Drawer Content */}
                <div className="flex-1 overflow-y-auto px-4 py-6">
                  <nav className="space-y-2">
                    {navItems.map((item, index) => {
                      const Icon = item.icon;
                      const isActive = location.pathname.includes(item.path.split('-').pop() || '');

                      return (
                        <motion.button
                          key={item.path}
                          initial={{ opacity: 0, x: 50 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: index * 0.05, duration: 0.3 }}
                          onClick={() => handleNavClick(item.path)}
                          className={`group relative w-full flex items-center justify-between px-4 py-4 rounded-xl text-left transition-all duration-300 ${isActive
                            ? "bg-gradient-to-r from-[#07D185] to-[#05b36d] text-white shadow-lg shadow-[#07D185]/30"
                            : "text-[#043F43] hover:bg-gradient-to-r hover:from-[#07D185]/10 hover:to-[#07D185]/5 active:scale-[0.98]"
                            }`}
                        >
                          <div className="flex items-center gap-4">
                            <div className={`p-2.5 rounded-xl transition-all ${isActive
                              ? "bg-white/20"
                              : "bg-[#043F43]/5 group-hover:bg-[#07D185]/20"
                              }`}>
                              <Icon className={`w-5 h-5 ${isActive ? "text-white" : "text-[#043F43] group-hover:text-[#07D185]"
                                }`} />
                            </div>
                            <span className="font-medium text-base">{item.name}</span>
                          </div>
                          <ChevronRight className={`w-5 h-5 transition-all ${isActive
                            ? "text-white/80 translate-x-0.5"
                            : "text-[#043F43]/30 group-hover:text-[#07D185] group-hover:translate-x-1"
                            }`} />
                        </motion.button>
                      );
                    })}

                    {/* Mobile Switch Button */}
                    <motion.button
                      onClick={toggleSide}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.5 }}
                      className="w-full mt-6 px-4 py-4 bg-[#f2faf9] text-[#043F43] rounded-xl font-semibold flex items-center justify-center gap-2 border border-[#00D084]/20"
                    >
                      {isMachinerySide ? "View Agro Products" : "View Machinery"}
                      {isMachinerySide ? <LayoutGrid size={18} className="text-[#00D084]" /> : <Settings size={18} className="text-[#00D084]" />}
                    </motion.button>
                  </nav>
                </div>

                {/* Drawer Footer */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                  className="px-6 py-4 border-t border-gray-100 bg-gray-50/50"
                >
                  <p className="text-center text-xs text-gray-500 font-medium">
                    Premium {isMachinerySide ? "Industrial" : "Agricultural"} Solutions
                  </p>
                  <p className="text-center text-[10px] text-gray-400 mt-1">
                    Agreocology Viands Impex Pvt. Ltd.
                  </p>
                </motion.div>
              </motion.div>
            </>
          )}
        </AnimatePresence>
      </motion.nav>

      {/* Spacer to prevent content from going under fixed nav */}
      <div className="h-14 sm:h-16" />
    </>
  );
}

export default Navigation;
