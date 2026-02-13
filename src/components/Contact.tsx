import { motion } from "motion/react";
import { useInView } from "motion/react";
import { useRef, useState, useEffect } from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { Mail, Phone, MapPin, Send, MessageCircle } from "lucide-react";
import { toast } from "sonner@2.0.3";
import { getContactData, type ContactData } from "../data/contactData";

export function Contact() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [contactData, setContactData] = useState<ContactData | null>(null);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    country: "",
    product: "",
    message: ""
  });

  // Load contact data on component mount
  useEffect(() => {
    const loadContactData = async () => {
      try {
        const data = await getContactData();
        setContactData(data);
      } catch (error) {
        console.error('Failed to load contact data:', error);
        toast.error('Failed to load contact information');
      }
    };
    
    loadContactData();
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Mock form submission
    toast.success("Thank you for your inquiry! We'll get back to you shortly.");
    setFormData({ name: "", email: "", phone: "", country: "", product: "", message: "" });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  // Helper function to get icon component
  const getIconComponent = (iconName: string) => {
    const icons: Record<string, typeof Mail> = {
      Mail,
      Phone,
      MapPin,
      MessageCircle
    };
    return icons[iconName] || Mail;
  };

  // Show loading state while data is being loaded
  if (!contactData) {
    return (
      <section id="contact" className="py-24 bg-gradient-to-b from-white to-[#07D185]/5">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <p className="text-[#043F43]">Loading...</p>
        </div>
      </section>
    );
  }

  return (
    <section id="contact" ref={ref} className="py-24 bg-gradient-to-b from-white to-[#07D185]/5">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-[#043F43] mb-6">{contactData.title}</h2>
          <div className="w-16 h-1 bg-[#07D185] mx-auto mb-8 rounded-full" />
          <p className="text-[#043F43] opacity-80 max-w-2xl mx-auto">
            {contactData.description}
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-16">
          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <div className="space-y-8 mb-12">
              {contactData.contactInfo.map((info, index) => {
                const IconComponent = getIconComponent(info.icon);
                return (
                  <motion.div
                    key={info.title}
                    initial={{ opacity: 0, y: 20 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.6, delay: 0.4 + index * 0.1 }}
                    className="flex items-start gap-4"
                  >
                    <div className="w-12 h-12 rounded-full bg-[#07D185]/10 flex items-center justify-center flex-shrink-0">
                      <IconComponent className="w-6 h-6 text-[#07D185]" />
                    </div>
                    <div>
                      <h4 className="text-[#043F43] mb-1">{info.title}</h4>
                      {info.link ? (
                        <a href={info.link} className="text-[#043F43] opacity-70 hover:text-[#07D185] transition-colors">
                          {info.value}
                        </a>
                      ) : (
                        <p className="text-[#043F43] opacity-70">{info.value}</p>
                      )}
                    </div>
                  </motion.div>
                );
              })}
            </div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.7 }}
              className="bg-gradient-to-br from-[#043F43] to-[#043F43]/90 rounded-3xl p-8 text-white"
            >
              <h3 className="text-white mb-4">Business Hours</h3>
              <div className="space-y-3">
                {contactData.businessHours.map((hours, index) => (
                  <div key={index} className="flex justify-between">
                    <span className="text-white/80">{hours.day}</span>
                    <span className="text-white">{hours.hours}</span>
                  </div>
                ))}
              </div>
            </motion.div>
          </motion.div>

          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <form onSubmit={handleSubmit} className="bg-white rounded-3xl p-8 shadow-sm space-y-6">
              <div>
                <label htmlFor="name" className="block text-[#043F43] mb-2">
                  Full Name
                </label>
                <Input
                  id="name"
                  name="name"
                  type="text"
                  required
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full border-[#07D185]/20 focus:border-[#07D185] focus:ring-[#07D185]"
                  placeholder="John Doe"
                />
              </div>

              <div>
                <label htmlFor="email" className="block text-[#043F43] mb-2">
                  Email Address
                </label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  required
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full border-[#07D185]/20 focus:border-[#07D185] focus:ring-[#07D185]"
                  placeholder="john@company.com"
                />
              </div>

              <div>
                <label htmlFor="phone" className="block text-[#043F43] mb-2">
                  Phone Number
                </label>
                <Input
                  id="phone"
                  name="phone"
                  type="tel"
                  value={formData.phone}
                  onChange={handleChange}
                  className="w-full border-[#07D185]/20 focus:border-[#07D185] focus:ring-[#07D185]"
                  placeholder="+1 (555) 123-4567"
                />
              </div>

              <div>
                <label htmlFor="country" className="block text-[#043F43] mb-2">
                  Country
                </label>
                <Select
                  id="country"
                  name="country"
                  value={formData.country}
                  onChange={handleChange}
                  className="w-full border-[#07D185]/20 focus:border-[#07D185] focus:ring-[#07D185]"
                >
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select your country" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="usa">United States</SelectItem>
                    <SelectItem value="canada">Canada</SelectItem>
                    <SelectItem value="uk">United Kingdom</SelectItem>
                    <SelectItem value="australia">Australia</SelectItem>
                    <SelectItem value="germany">Germany</SelectItem>
                    <SelectItem value="france">France</SelectItem>
                    <SelectItem value="japan">Japan</SelectItem>
                    <SelectItem value="china">China</SelectItem>
                    <SelectItem value="india">India</SelectItem>
                    <SelectItem value="brazil">Brazil</SelectItem>
                    <SelectItem value="mexico">Mexico</SelectItem>
                    <SelectItem value="southafrica">South Africa</SelectItem>
                    <SelectItem value="russia">Russia</SelectItem>
                    <SelectItem value="italy">Italy</SelectItem>
                    <SelectItem value="spain">Spain</SelectItem>
                    <SelectItem value="netherlands">Netherlands</SelectItem>
                    <SelectItem value="switzerland">Switzerland</SelectItem>
                    <SelectItem value="sweden">Sweden</SelectItem>
                    <SelectItem value="norway">Norway</SelectItem>
                    <SelectItem value="denmark">Denmark</SelectItem>
                    <SelectItem value="finland">Finland</SelectItem>
                    <SelectItem value="iceland">Iceland</SelectItem>
                    <SelectItem value="ireland">Ireland</SelectItem>
                    <SelectItem value="poland">Poland</SelectItem>
                    <SelectItem value="hungary">Hungary</SelectItem>
                    <SelectItem value="czechrepublic">Czech Republic</SelectItem>
                    <SelectItem value="slovakia">Slovakia</SelectItem>
                    <SelectItem value="bulgaria">Bulgaria</SelectItem>
                    <SelectItem value="romania">Romania</SelectItem>
                    <SelectItem value="greece">Greece</SelectItem>
                    <SelectItem value="turkey">Turkey</SelectItem>
                    <SelectItem value="egypt">Egypt</SelectItem>
                    <SelectItem value="southkorea">South Korea</SelectItem>
                    <SelectItem value="singapore">Singapore</SelectItem>
                    <SelectItem value="malaysia">Malaysia</SelectItem>
                    <SelectItem value="thailand">Thailand</SelectItem>
                    <SelectItem value="vietnam">Vietnam</SelectItem>
                    <SelectItem value="indonesia">Indonesia</SelectItem>
                    <SelectItem value="philippines">Philippines</SelectItem>
                    <SelectItem value="newzealand">New Zealand</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <label htmlFor="product" className="block text-[#043F43] mb-2">
                  Product of Interest
                </label>
                <Select
                  id="product"
                  name="product"
                  value={formData.product}
                  onChange={handleChange}
                  className="w-full border-[#07D185]/20 focus:border-[#07D185] focus:ring-[#07D185]"
                >
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select a product" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="product1">Product 1</SelectItem>
                    <SelectItem value="product2">Product 2</SelectItem>
                    <SelectItem value="product3">Product 3</SelectItem>
                    <SelectItem value="product4">Product 4</SelectItem>
                    <SelectItem value="product5">Product 5</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <label htmlFor="message" className="block text-[#043F43] mb-2">
                  Message
                </label>
                <Textarea
                  id="message"
                  name="message"
                  required
                  value={formData.message}
                  onChange={handleChange}
                  rows={5}
                  className="w-full border-[#07D185]/20 focus:border-[#07D185] focus:ring-[#07D185] resize-none"
                  placeholder="Tell us about your requirements..."
                />
              </div>

              <Button
                type="submit"
                className="w-full bg-[#07D185] hover:bg-[#06b872] text-white py-6 rounded-full shadow-lg hover:shadow-xl transition-all duration-300"
              >
                Send Message
                <Send className="ml-2 h-5 w-5" />
              </Button>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
}