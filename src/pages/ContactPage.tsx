import { motion } from "motion/react";
import { useInView } from "motion/react";
import { useRef, useState, useEffect } from "react";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Textarea } from "../components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../components/ui/select";
import { Mail, Phone, MapPin, Send, MessageCircle, Clock, HelpCircle, Loader2 } from "lucide-react";
import { toast } from "sonner@2.0.3";
import { getContactData, defaultContactData, type ContactInfo, type BusinessHours } from "../data/contactData";
import { ref as dbRef, push, set, serverTimestamp as rtdbTimestamp } from "firebase/database";
import { database } from "../firebase/config";

export function ContactPage() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    country: "",
    product: "",
    message: ""
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [contactInfo, setContactInfo] = useState<ContactInfo[]>(defaultContactData.contactInfo);
  const [businessHours, setBusinessHours] = useState<BusinessHours[]>(defaultContactData.businessHours);

  useEffect(() => {
    const loadContactData = async () => {
      try {
        const data = await getContactData();
        if (data) {
          setContactInfo(data.contactInfo);
          setBusinessHours(data.businessHours);
        }
      } catch (error) {
        console.error('Error loading contact data:', error);
      }
    };
    loadContactData();
  }, []);

  const getIconComponent = (iconName: string) => {
    switch (iconName.toLowerCase()) {
      case 'mail':
        return <Mail className="w-7 h-7 text-white" />;
      case 'phone':
        return <Phone className="w-7 h-7 text-white" />;
      case 'map':
      case 'mappin':
        return <MapPin className="w-7 h-7 text-white" />;
      case 'clock':
        return <Clock className="w-7 h-7 text-white" />;
      case 'message':
        return <MessageCircle className="w-7 h-7 text-white" />;
      default:
        return <HelpCircle className="w-7 h-7 text-white" />;
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Save to Firebase Realtime Database under 'inquiries' path
      const inquiriesRef = dbRef(database, 'inquiries');
      const newInquiryRef = push(inquiriesRef);
      await set(newInquiryRef, {
        ...formData,
        createdAt: rtdbTimestamp(),
        status: 'new'
      });

      toast.success("Thank you for your inquiry!", {
        description: "We'll get back to you within 24 hours.",
        style: {
          background: '#07D185',
          color: '#fff',
          border: 'none'
        },
        className: "bg-[#07D185] text-white border-none"
      });
      setFormData({ name: "", email: "", phone: "", country: "", product: "", message: "" });
    } catch (error) {
      console.error('Error submitting form:', error);
      toast.error('Failed to send message. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleSelectChange = (name: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const faqs = [
    {
      question: "What is the minimum order quantity?",
      answer: "MOQ varies by product. Typically 1 container (20-40 MT) for bulk commodities, and 500kg-1 ton for spices and specialty products."
    },
    {
      question: "How long does shipping take?",
      answer: "Sea freight: 15-45 days depending on destination. Air freight: 2-7 days for urgent shipments."
    },
    {
      question: "What certifications do you provide?",
      answer: "We provide ISO, HACCP, FSSAI, phytosanitary certificates, SGS inspection reports, and organic certifications as required."
    },
    {
      question: "Can you provide custom packaging?",
      answer: "Yes, we offer custom packaging solutions including private labeling and branded packaging for our clients."
    }
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
            <h1 className="text-white mb-6">Contact Us</h1>
            <p className="text-white/80 text-xl max-w-3xl mx-auto">
              Ready to start your export journey? Get in touch with our team for quotes, inquiries, or partnership opportunities.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Main Contact Section */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-16">
            {/* Contact Info */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.8 }}
            >
              <h2 className="text-[#043F43] mb-8">Get in Touch</h2>

              <div className="space-y-6 mb-12">
                {contactInfo.map((info, index) => (
                  <div key={index} className="flex items-start gap-4">
                    <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-[#07D185] to-[#07D185]/80 flex items-center justify-center flex-shrink-0">
                      {getIconComponent(info.icon)}
                    </div>
                    <div>
                      <h4 className="text-[#043F43] mb-2">{info.title}</h4>
                      {info.link ? (
                        <a
                          href={info.link}
                          className="text-[#043F43] opacity-70 hover:text-[#07D185] transition-colors break-all"
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          {info.value}
                        </a>
                      ) : (
                        <p className="text-[#043F43] opacity-70 whitespace-pre-line">
                          {info.value}
                        </p>
                      )}
                    </div>
                  </div>
                ))}
              </div>

              <div className="bg-gradient-to-br from-[#043F43] to-[#043F43]/90 rounded-3xl p-8 text-white">
                <div className="flex items-start gap-4 mb-6">
                  <Clock className="w-6 h-6 text-[#07D185] flex-shrink-0 mt-1" />
                  <div className="w-full">
                    <h3 className="text-white mb-4">Business Hours</h3>
                    <div className="space-y-3">
                      {businessHours.map((hours, index) => (
                        <div key={index} className="flex justify-between">
                          <span className="text-white/80">{hours.day}</span>
                          <span className="text-white">{hours.hours}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
                <p className="text-white/70 text-sm">
                  All times are in GMT. We respond to inquiries within 24 hours on business days.
                </p>
              </div>
            </motion.div>

            {/* Contact Form */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.8 }}
            >
              <form onSubmit={handleSubmit} className="bg-gradient-to-br from-white to-[#07D185]/5 rounded-3xl p-8 border border-[#07D185]/10 space-y-6">
                <h3 className="text-[#043F43] mb-6">Send us a Message</h3>

                <div>
                  <label htmlFor="name" className="block text-[#043F43] mb-2">
                    Full Name *
                  </label>
                  <Input
                    id="name"
                    name="name"
                    type="text"
                    required
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full"
                    placeholder="John Doe"
                  />
                </div>

                <div>
                  <label htmlFor="email" className="block text-[#043F43] mb-2">
                    Email Address *
                  </label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    required
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full"
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
                    className="w-full"
                    placeholder="+1 (555) 123-4567"
                  />
                </div>

                <div>
                  <label htmlFor="country" className="block text-[#043F43] mb-2">
                    Country
                  </label>
                  <Select value={formData.country} onValueChange={(value: string) => handleSelectChange("country", value)}>
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Select your country" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="usa">United States</SelectItem>
                      <SelectItem value="uk">United Kingdom</SelectItem>
                      <SelectItem value="canada">Canada</SelectItem>
                      <SelectItem value="australia">Australia</SelectItem>
                      <SelectItem value="uae">UAE</SelectItem>
                      <SelectItem value="germany">Germany</SelectItem>
                      <SelectItem value="france">France</SelectItem>
                      <SelectItem value="singapore">Singapore</SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <label htmlFor="product" className="block text-[#043F43] mb-2">
                    Product Required
                  </label>
                  <Select value={formData.product} onValueChange={(value: string) => handleSelectChange("product", value)}>
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Select a product category" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="pulses">Pulses</SelectItem>
                      <SelectItem value="grains">Grains</SelectItem>
                      <SelectItem value="spices">Spices</SelectItem>
                      <SelectItem value="oil-seeds">Oil Seeds</SelectItem>
                      <SelectItem value="fresh-produce">Fresh Produce</SelectItem>
                      <SelectItem value="agro-commodities">Agro Commodities</SelectItem>
                      <SelectItem value="other">Other / Mixed</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <label htmlFor="message" className="block text-[#043F43] mb-2">
                    Message *
                  </label>
                  <Textarea
                    id="message"
                    name="message"
                    required
                    value={formData.message}
                    onChange={handleChange}
                    rows={5}
                    className="w-full resize-none"
                    placeholder="Tell us about your requirements, quantity needed, delivery location, etc."
                  />
                </div>

                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-[#07D185] hover:bg-[#06b872] text-white py-6 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 disabled:opacity-70 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? (
                    <>
                      Sending...
                      <Loader2 className="ml-2 h-5 w-5 animate-spin" />
                    </>
                  ) : (
                    <>
                      Send Message
                      <Send className="ml-2 h-5 w-5" />
                    </>
                  )}
                </Button>
              </form>
            </motion.div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-24 bg-gradient-to-b from-[#07D185]/5 to-white">
        <div className="max-w-4xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-[#043F43] mb-6">Frequently Asked Questions</h2>
            <div className="w-16 h-1 bg-[#07D185] mx-auto rounded-full" />
          </motion.div>

          <div className="space-y-6">
            {faqs.map((faq, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="bg-white rounded-2xl p-8 border border-[#07D185]/10"
              >
                <div className="flex items-start gap-4">
                  <HelpCircle className="w-6 h-6 text-[#07D185] flex-shrink-0 mt-1" />
                  <div>
                    <h4 className="text-[#043F43] mb-3">{faq.question}</h4>
                    <p className="text-[#043F43] opacity-70">{faq.answer}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
