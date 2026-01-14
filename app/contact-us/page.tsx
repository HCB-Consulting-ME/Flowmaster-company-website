"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Send, MapPin } from "lucide-react";
import { motion } from "framer-motion";
import { useState } from "react";
import { toast } from 'react-hot-toast';

export default function ContactUsPage() {
    const [loading, setLoading] = useState(false)
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        company: "",
        message: "",
    });

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            setLoading(true)
            const response = await fetch('/api/contact', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    name: formData.name,
                    email: formData.email,
                    message: formData.message
                }),
            });

            const data = await response.json();
            toast.success(data.message);
            console.log('Form Submmited successfully');
            setFormData({
                name: "",
                email: "",
                company: "",
                message: "",
            });
        } catch (error) {
            console.log(error)
        } finally {
            setLoading(false)
        }
    }
    return (
        <div className="flex flex-col min-h-screen">
            <header className="bg-navy-900 text-white pt-20 pb-32 px-8 text-center border-b border-white/5 relative overflow-hidden">
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

            <main className="max-w-7xl mx-auto px-8 -mt-16 mb-24 grid md:grid-cols-2 gap-8 w-full z-10 relative">
                {/* Form */}
                <motion.section
                    className="bg-card text-card-foreground p-8 md:p-12 rounded-xl shadow-xl border border-border"
                    initial={{ opacity: 0, x: -50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                >
                    <h2 className="text-2xl font-bold mb-8">Send us a Message</h2>
                    <form className="space-y-6" onSubmit={handleSubmit}>
                        <div className="grid md:grid-cols-1 gap-6">
                            <div className="space-y-2">
                                <label className="text-sm font-semibold">Name <span className="text-red-500">*</span></label>
                                <Input
                                    placeholder="Jane"
                                    value={formData.name}
                                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                    required
                                    className="focus-visible:ring-navy-900"
                                />
                            </div>
                        </div>
                        <div className="space-y-2">
                            <label className="text-sm font-semibold">Email <span className="text-red-500">*</span></label>
                            <Input
                                type="email"
                                placeholder="jane@company.com"
                                value={formData.email}
                                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                required
                                className="focus-visible:ring-navy-900"
                            />
                        </div>
                        <div className="space-y-2">
                            <label className="text-sm font-semibold">Company</label>
                            <Input
                                placeholder="Enterprise AI Corp"
                                value={formData.company}
                                onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                                className="focus-visible:ring-navy-900"
                            />
                        </div>
                        <div className="space-y-2">
                            <label className="text-sm font-semibold">Message <span className="text-red-500">*</span></label>
                            <Textarea
                                rows={4}
                                placeholder="How can we help you?"
                                className="resize-none focus-visible:ring-navy-900"
                                value={formData.message}
                                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                                required
                            />
                        </div>
                        <Button type="submit" disabled={loading} className="w-full bg-navy-900 text-white font-semibold h-12 hover:bg-navy-800 rounded-xl">
                            {loading ? "Sending..." : "Submit Message"} <Send className="ml-2 w-4 h-4" />
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
                                { title: "Middle East HQ", loc: "Ajman, United Arab Emirates" },
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
                        {/* Full Map Background */}
                        <div
                            className="absolute inset-0 opacity-60"
                            style={{
                                backgroundImage:
                                    "url('https://upload.wikimedia.org/wikipedia/commons/8/80/World_map_-_low_resolution.svg')",
                                backgroundSize: "cover",
                                backgroundPosition: "center",
                                filter: "grayscale(100%)",
                            }}
                        />

                        {/* Dark Overlay */}
                        <div className="absolute inset-0 bg-navy-900/50 backdrop-blur-[1px]" />

                        {/* Locations */}
                        {[
                            {
                                city: "Karachi",
                                top: "38%",
                                left: "68%",
                            },
                            {
                                city: "Ajman",
                                top: "50%",
                                left: "54%",
                            },
                            {
                                city: "Frankfurt",
                                top: "28%", // Central Europe
                                left: "48%",
                            },
                        ].map((loc, i) => (
                            <motion.div
                                key={loc.city}
                                className="absolute flex flex-col items-center"
                                style={{ top: loc.top, left: loc.left }}
                                initial={{ scale: 0, opacity: 0 }}
                                animate={{ scale: 1, opacity: 1 }}
                                transition={{ delay: 0.7 + i * 0.2 }}
                            >
                                {/* Pulse Ring */}
                                <span className="absolute inline-flex h-6 w-6 rounded-full bg-blue-500/30 animate-ping" />

                                {/* Dot */}
                                <span className="relative inline-flex h-3 w-3 rounded-full bg-blue-500 shadow-[0_0_12px_rgba(59,130,246,0.9)]" />

                                {/* Label */}
                                <span className="mt-2 text-xs text-white bg-black/60 px-2 py-1 rounded-full backdrop-blur-md">
                                    {loc.city}
                                </span>
                            </motion.div>
                        ))}


                    </motion.div>

                </section>
            </main>
        </div>
    );
}
