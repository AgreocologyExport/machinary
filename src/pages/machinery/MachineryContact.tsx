import { useState } from "react";
import { Mail, Phone, MapPin, Send, MessageSquare, Loader2 } from "lucide-react";
import { ref, push, set, serverTimestamp } from "firebase/database";
import { database } from "../../firebase/config";
import { toast } from "sonner@2.0.3";

import { motion } from "motion/react";

export function MachineryContact() {
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        phone: "",
        country: "",
        machineryType: "",
        message: ""
    });

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);

        try {
            const inquiriesRef = ref(database, 'machinery_inquiries');
            const newInquiryRef = push(inquiriesRef);
            await set(newInquiryRef, {
                ...formData,
                createdAt: serverTimestamp(),
                status: 'new'
            });

            toast.success("Quote request sent successfully!", {
                description: "Our technical team will contact you shortly.",
                style: {
                    background: '#07D185',
                    color: '#fff',
                    border: 'none'
                },
                className: "bg-[#07D185] text-white border-none"
            });

            setFormData({
                name: "",
                email: "",
                phone: "",
                country: "",
                machineryType: "",
                message: ""
            });
        } catch (error) {
            console.error('Error submitting machinery inquiry:', error);
            toast.error("Failed to send request. Please try again.");
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        setFormData(prev => ({
            ...prev,
            [e.target.name === "machinery-type" ? "machineryType" : e.target.name]: e.target.value
        }));
    };
    return (
        <div className="min-h-screen bg-white font-['Helvetica']">
            {/* Hero Header - Dark Teal from Image 1 */}
            <section className="bg-[#043F43] py-28 text-left">
                <div className="max-w-7xl mx-auto px-6">
                    <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                    >
                        <h1 className="text-white text-4xl sm:text-5xl font-semibold mb-3 tracking-tight">
                            Contact Us
                        </h1>
                        <p className="text-white/80 text-lg sm:text-xl font-light max-w-2xl leading-relaxed">
                            Get in touch with our technical team for machinery quotes and specifications
                        </p>
                    </motion.div>
                </div>
            </section>

            {/* Main Content Area */}
            <section className="py-20 bg-[#F8FAFB]">
                <div className="max-w-7xl mx-auto px-6">
                    <div className="grid lg:grid-cols-3 gap-8">

                        {/* Request a Quote Form - White Card from Image 1 */}
                        <motion.div
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            className="lg:col-span-2 bg-white rounded-2xl p-8 shadow-sm border border-gray-100"
                        >
                            <h2 className="text-[#043F43] text-2xl font-bold mb-8">Request a Quote</h2>

                            <form onSubmit={handleSubmit} className="space-y-6">
                                <div className="grid md:grid-cols-2 gap-6">
                                    <div className="space-y-2">
                                        <label className="text-[13px] font-semibold text-[#043F43]">Your Name *</label>
                                        <input
                                            name="name"
                                            value={formData.name}
                                            onChange={handleChange}
                                            type="text"
                                            className="w-full px-4 py-3 bg-white border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-1 focus:ring-[#00D084] transition-all"
                                            placeholder="John Doe"
                                            required
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-[13px] font-semibold text-[#043F43]">Email Address *</label>
                                        <input
                                            name="email"
                                            value={formData.email}
                                            onChange={handleChange}
                                            type="email"
                                            className="w-full px-4 py-3 bg-white border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-1 focus:ring-[#00D084] transition-all"
                                            placeholder="john@example.com"
                                            required
                                        />
                                    </div>
                                </div>

                                <div className="grid md:grid-cols-2 gap-6">
                                    <div className="space-y-2">
                                        <label className="text-[13px] font-semibold text-[#043F43]">Phone Number</label>
                                        <input
                                            name="phone"
                                            value={formData.phone}
                                            onChange={handleChange}
                                            type="tel"
                                            className="w-full px-4 py-3 bg-white border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-1 focus:ring-[#00D084] transition-all"
                                            placeholder="+1 234 567 8900"
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-[13px] font-semibold text-[#043F43]">Country *</label>
                                        <input
                                            name="country"
                                            value={formData.country}
                                            onChange={handleChange}
                                            type="text"
                                            className="w-full px-4 py-3 bg-white border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-1 focus:ring-[#00D084] transition-all"
                                            placeholder="United States"
                                            required
                                        />
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <label className="text-[13px] font-semibold text-[#043F43]">Machinery Type</label>
                                    <select
                                        name="machinery-type"
                                        value={formData.machineryType}
                                        onChange={handleChange}
                                        className="w-full px-4 py-3 bg-white border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-1 focus:ring-[#00D084] transition-all appearance-none cursor-pointer"
                                    >
                                        <option value="">Select machinery type</option>
                                        <option>Grain Processing</option>
                                        <option>Sorting Machines</option>
                                        <option>Packaging Systems</option>
                                        <option>Drying Equipment</option>
                                    </select>
                                </div>

                                <div className="space-y-2">
                                    <label className="text-[13px] font-semibold text-[#043F43]">Your Message *</label>
                                    <textarea
                                        name="message"
                                        value={formData.message}
                                        onChange={handleChange}
                                        className="w-full px-4 py-3 bg-white border border-gray-200 rounded-lg text-sm h-32 focus:outline-none focus:ring-1 focus:ring-[#00D084] transition-all resize-none"
                                        placeholder="Please provide details about your requirements, quantity, technical specifications, etc."
                                        required
                                    ></textarea>
                                </div>

                                <button
                                    type="submit"
                                    disabled={isSubmitting}
                                    className="bg-[#00D084] text-white px-8 py-3 rounded-lg font-bold text-sm hover:bg-[#00b975] transition-all flex items-center gap-2 shadow-sm disabled:opacity-70 disabled:cursor-not-allowed"
                                >
                                    {isSubmitting ? (
                                        <>
                                            <Loader2 size={16} className="animate-spin" /> Sending...
                                        </>
                                    ) : (
                                        <>
                                            <Send size={16} /> Send Message
                                        </>
                                    )}
                                </button>
                            </form>
                        </motion.div>

                        {/* Sidebar */}
                        <div className="space-y-6">

                            {/* Contact Info Box - Dark Teal from Image 1 */}
                            <motion.div
                                initial={{ opacity: 0, x: 20 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true }}
                                className="bg-[#043F43] rounded-2xl p-8 text-white"
                            >
                                <h3 className="text-lg font-bold mb-6">Contact Information</h3>
                                <div className="space-y-6">
                                    <div className="flex gap-4">
                                        <MapPin size={20} className="text-[#00D084] shrink-0" />
                                        <div>
                                            <p className="text-[13px] font-bold mb-1">Head Office</p>
                                            <p className="text-white/70 text-[12px] leading-relaxed">
                                                Viands Impex Pvt. Ltd.<br />
                                                Machinery Division<br />
                                                India
                                            </p>
                                        </div>
                                    </div>

                                    <div className="flex gap-4 border-t border-white/10 pt-6">
                                        <Phone size={20} className="text-[#00D084] shrink-0" />
                                        <div>
                                            <p className="text-[13px] font-bold mb-1">Phone</p>
                                            <p className="text-white/70 text-[12px]">+91 98765 43210</p>
                                        </div>
                                    </div>

                                    <div className="flex gap-4 border-t border-white/10 pt-6">
                                        <Mail size={20} className="text-[#00D084] shrink-0" />
                                        <div>
                                            <p className="text-[13px] font-bold mb-1">Email</p>
                                            <p className="text-white/70 text-[12px]">machinery@agreocology.com</p>
                                        </div>
                                    </div>

                                    <div className="flex gap-4 border-t border-white/10 pt-6">
                                        <MessageSquare size={20} className="text-[#00D084] shrink-0" />
                                        <div>
                                            <p className="text-[13px] font-bold mb-1">WhatsApp</p>
                                            <p className="text-white/70 text-[12px]">Chat with us</p>
                                        </div>
                                    </div>
                                </div>
                            </motion.div>

                            {/* FAQ Box from Image 1 */}
                            <motion.div
                                initial={{ opacity: 0, x: 20 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true }}
                                className="bg-white rounded-2xl p-8 border border-gray-100 shadow-sm"
                            >
                                <h3 className="text-[#043F43] text-lg font-bold mb-6">Quick FAQ</h3>
                                <div className="space-y-5">
                                    <div>
                                        <p className="text-[#043F43] text-[13px] font-bold mb-1">Do you provide installation?</p>
                                        <p className="text-gray-500 text-[12px]">Yes, installation and commissioning support available.</p>
                                    </div>
                                    <div>
                                        <p className="text-[#043F43] text-[13px] font-bold mb-1">What about warranty?</p>
                                        <p className="text-gray-500 text-[12px]">1-2 years warranty depending on machinery type.</p>
                                    </div>
                                    <div>
                                        <p className="text-[#043F43] text-[13px] font-bold mb-1">Do you ship globally?</p>
                                        <p className="text-gray-500 text-[12px]">Yes, we export to over 30 countries worldwide.</p>
                                    </div>
                                </div>
                            </motion.div>

                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}

export default MachineryContact;
