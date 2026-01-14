"use client";

import { Button } from "@/components/ui/button";
import { Lightbulb, ShieldCheck, Network } from "lucide-react";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";

export default function CompanyPage() {
    const router = useRouter()
    return (
        <div className="flex flex-col min-h-screen">
            {/* Hero Section */}
            <section className="bg-navy-900 pt-32 pb-40 text-center relative overflow-hidden">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,#1e293b_0%,#020617_100%)]"></div>
                <div className="max-w-4xl mx-auto px-4 relative z-10">
                    <motion.h1
                        className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                    >
                        Our Mission: <span className="text-blue-400">To Empower Every Enterprise</span> with Intelligent Automation.
                    </motion.h1>
                    <motion.p
                        className="text-xl text-slate-400 max-w-2xl mx-auto"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.1 }}
                    >
                        Learn about the people, values, and vision behind FLOWMASTER.
                    </motion.p>
                </div>
                {/* <div className="max-w-6xl mx-auto px-4 mt-16 -mb-64 relative z-20">
                    <motion.div
                        className="relative rounded-2xl overflow-hidden shadow-2xl border border-slate-700/50 glow-effect"
                        initial={{ opacity: 0, y: 40 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.7, delay: 0.2 }}
                    >
                        <img
                            alt="Diverse professional team"
                            className="w-full h-[500px] object-contain"
                            src="https://lh3.googleusercontent.com/aida-public/AB6AXuCk1fA_m_2Ks6MPAaFhbdYpmmj1luC08n9pJ07dOTwHd40fUndcSCBqdbl6VgtSaDChYitGXvDEitYRS5nlhGNBonIQSIqtooFPE55c-DFC-TQmzyXLPBrYn3IbUZlfAWkrx13bix8D60aYPXdR9T6qG5gqWQP06gCoXQITr_dG-t_jqYz_wT0O9bfNsw_rpq6sakYkiHQ5TOnE7wUOu2dezt3xcn24HqdH3Mfs_A_rwuPoh41dnpx0xfWFpHQPWucsupjCjGxNcIIZ"
                        />
                        <div className="absolute inset-0 bg-navy-900/20 flex items-center justify-center">
                            <motion.div
                                className="p-8 rounded-full border-2 border-blue-500/30 bg-blue-500/5 backdrop-blur-sm"
                                whileHover={{ scale: 1.1 }}
                            >
                                <div className="p-6 rounded-full border-4 border-blue-500/50 animate-pulse">
                                    <span className="text-white font-bold text-4xl tracking-widest">AI</span>
                                </div>
                            </motion.div>
                        </div>
                    </motion.div>
                </div> */}
            </section>

            <div className="pt-20 pb-20 bg-background transition-colors duration-300">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid lg:grid-cols-12 gap-16">
                        {/* Leadership Team */}
                        <motion.div
                            className="lg:col-span-4"
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5 }}
                        >
                            <h2 className="text-2xl font-bold mb-8 flex items-center gap-2 text-foreground">
                                Leadership Team
                            </h2>
                            <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-1 gap-6">
                                {[
                                    { name: "Benjamin Hippler", role: "CEO & Founder", img: '/Company/ben.png' },
                                    { name: "Muhammad Irtiza", role: "Co-Founder", img: '/Company/irtiza.png' },

                                ].map((leader, i) => (
                                    <motion.div
                                        key={leader.name}
                                        className="flex items-center lg:items-start gap-4 p-4 rounded-xl border border-border bg-slate-50 dark:bg-slate-800/50 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                                        initial={{ opacity: 0, y: 10 }}
                                        whileInView={{ opacity: 1, y: 0 }}
                                        viewport={{ once: true }}
                                        transition={{ delay: i * 0.1 }}
                                    >
                                        <img alt={leader.name} className="w-16 h-16 rounded-lg object-cover grayscale hover:grayscale-0 transition-all" src={leader.img} />
                                        <div>
                                            <h3 className="font-bold text-foreground">{leader.name}</h3>
                                            <p className="text-sm text-slate-500 font-medium">{leader.role}</p>
                                        </div>
                                    </motion.div>
                                ))}
                            </div>
                        </motion.div>

                        {/* Timeline */}
                        <motion.div
                            className="lg:col-span-5"
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: 0.2 }}
                        >
                            <h2 className="text-2xl font-bold mb-8 text-foreground">Our Story & Milestones</h2>
                            <div className="space-y-8 relative">
                                {/* <div className="flex justify-between items-center mb-10 relative">
                                    <div className="absolute top-1/2 left-0 w-full h-0.5 bg-slate-200 dark:bg-slate-700 -translate-y-1/2 -z-10"></div>
                                    {[BarChart, Briefcase, Users, Flag].map((Icon, idx) => (
                                        <motion.div
                                            key={idx}
                                            className={`p-2 rounded-full border-2 bg-background border-slate-200 dark:border-slate-700 text-slate-400`}
                                            whileHover={{ scale: 1.2, borderColor: "#3b82f6", color: "#3b82f6" }}
                                        >
                                            <Icon className="w-5 h-5" />
                                        </motion.div>
                                    ))}
                                </div> */}
                                <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
                                    Our FlowMaster AI journey began with a vision to redefine enterprise efficiency. From our
                                    humble beginnings in research labs to becoming a global leader in AI orchestration, we&apos;ve
                                    remained focused on delivering measurable impact through innovative, scalable technology.
                                </p>
                                <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
                                    Today, FlowMaster empowers thousands of organizations to automate complex workflows with
                                    security and precision at the core of every agent.
                                </p>
                            </div>
                        </motion.div>

                        {/* Values & Join Us */}
                        <motion.div
                            className="lg:col-span-3"
                            initial={{ opacity: 0, x: 20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: 0.4 }}
                        >
                            <h2 className="text-2xl font-bold mb-8 text-foreground">Values & Culture</h2>
                            <div className="grid grid-cols-3 gap-4 mb-12">
                                {[
                                    { label: "Innovation", icon: Lightbulb },
                                    { label: "Integrity", icon: ShieldCheck },
                                    { label: "Collaboration", icon: Network },
                                ].map((val) => (
                                    <motion.div
                                        key={val.label}
                                        className="text-center"
                                        whileHover={{ y: -5 }}
                                    >
                                        <div className="w-12 h-12 bg-blue-500/10 text-blue-500 rounded-lg flex items-center justify-center mx-auto mb-2">
                                            <val.icon className="w-6 h-6" />
                                        </div>
                                        <span className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">{val.label}</span>
                                    </motion.div>
                                ))}
                            </div>
                            <div className="p-6 rounded-2xl bg-navy-900 dark:bg-blue-600 text-white shadow-xl">
                                <h3 className="text-xl font-bold mb-2">Join Us</h3>
                                <p className="text-slate-300 text-sm mb-4">Join us for our next chapter of growth and innovation.</p>
                                <Button className="w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-3" onClick={() => router.push("/careers")}>
                                    View Careers
                                </Button>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </div>
        </div>
    );
}
