"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Send, MapPin } from "lucide-react";
import { motion } from "framer-motion";

export default function ContactUsPage() {
    return (
        <div className="flex flex-col min-h-screen">
            <header className="bg-navy-900 text-white pt-20 pb-24 px-8 text-center border-b border-white/5 relative overflow-hidden">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,#1e293b_0%,#020617_100%)]"></div>
                <div className="relative z-10">
                    <motion.h1
                        className="text-5xl font-bold mb-6 tracking-tight my-10"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                    >
                        Get in Touch
                    </motion.h1>
                    <motion.p
                        className="text-xl text-white/70 max-w-2xl mx-auto leading-relaxed"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.1 }}
                    >
                        Have questions about how FlowMaster can transform your enterprise? Our team of AI experts is here to help
                        you navigate your journey.
                    </motion.p>
                </div>
            </header>

            <main className="max-w-7xl mx-auto px-8 -mt-12 mb-24 grid md:grid-cols-2 gap-8 w-full z-10 relative">
                {/* Form */}
                <motion.section
                    className="bg-card text-card-foreground p-8 md:p-12 rounded-xl shadow-xl border border-border"
                    initial={{ opacity: 0, x: -50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                >
                    <h2 className="text-2xl font-bold mb-8">Send us a Message</h2>
                    <form className="space-y-6">
                        <div className="grid md:grid-cols-2 gap-6">
                            <div className="space-y-2">
                                <label className="text-sm font-semibold">First Name</label>
                                <Input placeholder="Jane" />
                            </div>
                            <div className="space-y-2">
                                <label className="text-sm font-semibold">Last Name</label>
                                <Input placeholder="Doe" />
                            </div>
                        </div>
                        <div className="space-y-2">
                            <label className="text-sm font-semibold">Work Email</label>
                            <Input type="email" placeholder="jane@company.com" />
                        </div>
                        <div className="space-y-2">
                            <label className="text-sm font-semibold">Company</label>
                            <Input placeholder="Enterprise AI Corp" />
                        </div>
                        <div className="space-y-2">
                            <label className="text-sm font-semibold">Message</label>
                            <Textarea rows={4} placeholder="How can we help you?" className="resize-none" />
                        </div>
                        <Button className="w-full bg-navy-900 text-white font-bold h-12 hover:bg-navy-800">
                            Submit Inquiry <Send className="ml-2 w-4 h-4" />
                        </Button>
                    </form>
                </motion.section>

                {/* Info */}
                <section className="space-y-8">
                    <motion.div
                        className="bg-card text-card-foreground p-8 rounded-xl shadow-xl border border-border"
                        initial={{ opacity: 0, x: 50 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.6, delay: 0.3 }}
                    >
                        <h2 className="text-2xl font-bold mb-6">Global Presence</h2>
                        <div className="space-y-6">
                            {[
                                { title: "Middle East HQ", loc: "Dubai, United Arab Emirates" },
                                { title: "European Innovation Center", loc: "Frankfurt, Germany" },
                                { title: "Asia-Pacific Regional Office", loc: "Karachi, Pakistan" },
                            ].map((office, i) => (
                                <motion.div
                                    key={office.title}
                                    className="flex items-start space-x-4"
                                    initial={{ opacity: 0, x: 20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: 0.4 + (i * 0.1) }}
                                >
                                    <div className="bg-blue-500/10 p-3 rounded-full text-blue-500">
                                        <MapPin className="w-5 h-5" />
                                    </div>
                                    <div>
                                        <h3 className="font-bold">{office.title}</h3>
                                        <p className="text-slate-500 text-sm">{office.loc}</p>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </motion.div>

                    <motion.div
                        className="relative h-[300px] rounded-xl overflow-hidden shadow-xl border border-border bg-navy-900"
                        initial={{ opacity: 0, y: 50 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.5 }}
                    >
                        <img
                            alt="World Map Illustration"
                            className="w-full h-full object-cover opacity-50 grayscale"
                            src="https://lh3.googleusercontent.com/aida-public/AB6AXuCYqU3c2jCdZsVKgq0gOUl5823j-2YsyBYsZGqOfADvQeXWhh5iJXWrJLD_5oeKIFzbbA0RY7S8t7SFu5F9rH3-IaauXY9WByeD8mzgBo4Aq8VPgW342rnAfBVB8SiqMIth-8KHFhyz-amlmml0I097ruTvEyKOXMWbuLhNhkG_a6ep0AnnRxfeRTvhCFSeNZf6aA226g-y_MLI4Rtpz3IPbYMC_D2tCFbu9TKdAA64Bdy0b6Aul59dlkL4oA94YqEC0YO0luP-kwQF"
                        />
                        <div className="absolute inset-0 bg-navy-900/40 flex items-center justify-center">
                            <p className="text-white font-medium border border-white/20 px-4 py-2 rounded-full backdrop-blur-md">
                                Interactive Map Loading...
                            </p>
                        </div>
                        {[
                            { top: "30%", left: "60%" },
                            { top: "45%", left: "45%" },
                            { top: "55%", left: "70%" },
                        ].map((dot, i) => (
                            <motion.div
                                key={i}
                                className="absolute w-3 h-3 bg-blue-500 rounded-full animate-pulse shadow-[0_0_10px_rgba(59,130,246,0.8)]"
                                style={{ top: dot.top, left: dot.left }}
                                initial={{ scale: 0 }}
                                animate={{ scale: 1 }}
                                transition={{ delay: 0.8 + (i * 0.2) }}
                            ></motion.div>
                        ))}
                    </motion.div>
                </section>
            </main>
        </div>
    );
}
