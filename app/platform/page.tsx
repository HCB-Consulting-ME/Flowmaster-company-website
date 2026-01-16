"use client";

import { CheckCircle2, Lock, FileKey, TrendingUp, MessageSquare } from "lucide-react";
import { SecurityIllustration, OptimizationIllustration, GovernanceGraphic } from "@/components/platform/PlatformGraphics";
import { motion } from "framer-motion";
import FlowMasterTimeline from "@/components/platform/Timeline";

export default function PlatformPage() {
    return (
        <div className="flex flex-col min-h-screen">
            {/* Hero */}
            <section className="bg-navy-900 pt-20 pb-24 text-white overflow-hidden relative">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,#1e293b_0%,#020617_100%)]"></div>
                <div className="relative max-w-7xl mx-auto px-6 text-center mb-16">
                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        className="text-4xl md:text-5xl font-bold mb-6 tracking-tight mt-20"
                    >
                        The Flowmaster AI Agent Platform
                    </motion.h1>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                        className="text-xl text-slate-400 max-w-3xl mx-auto"
                    >
                        Explore the powerful architecture and features of our enterprise-grade AI system.
                    </motion.p>
                </div>
                <div className="relative max-w-6xl mx-auto px-4">
                    {/* <ManagerAppIllustration /> */}
                    <FlowMasterTimeline />
                </div>
            </section>

            {/* Orchestration */}
            <section className="relative bg-background py-16 overflow-hidden">
                <div className="absolute inset-0 bg-[radial-gradient(circle,rgba(59,130,246,0.05)_1px,transparent_1px)] [background-size:40px_40px]"></div>
                <div className="hidden lg:block absolute left-1/2 top-0 bottom-0 w-px bg-slate-200 dark:bg-slate-800 -translate-x-1/2"></div>
                <div className="max-w-7xl mx-auto px-6 relative">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center mb-16">
                        <motion.div
                            initial={{ opacity: 0, x: -50 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.8 }}
                            viewport={{ once: true }}
                            className="order-2 lg:order-1"
                        >
                            <div className="inline-flex items-center px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-500 text-xs font-bold mb-6 tracking-wider uppercase">
                                Process Foundation
                            </div>
                            <h2 className="text-3xl md:text-4xl font-bold mb-6 tracking-tight text-foreground">Enterprise-Grade Governance</h2>
                            <p className="text-lg text-slate-600 dark:text-slate-400 mb-8 leading-relaxed">
                                Build on a solid foundation of control. Upload your existing Processes, SOPs, and RACIs directly into the platform, and manage them with full auditability.
                            </p>
                            <ul className="space-y-4">
                                <li className="flex items-start gap-3">
                                    <CheckCircle2 className="text-blue-500 w-5 h-5 mt-1" />
                                    <span className="text-slate-700 dark:text-slate-300"><strong>Governance & Control:</strong> Enterprise-grade auditability and compliance at every step.</span>
                                </li>
                                <li className="flex items-start gap-3">
                                    <CheckCircle2 className="text-blue-500 w-5 h-5 mt-1" />
                                    <span className="text-slate-700 dark:text-slate-300"><strong>Rapid Configuration:</strong> No-Code Process and App Editors for instant agility.</span>
                                </li>
                                <li className="flex items-start gap-3">
                                    <CheckCircle2 className="text-blue-500 w-5 h-5 mt-1" />
                                    <span className="text-slate-700 dark:text-slate-300"><strong>Legacy Import:</strong> Seamless upload of existing SOPs and RACI matrices.</span>
                                </li>
                            </ul>
                        </motion.div>
                        <div className="order-1 lg:order-2">
                            {/* <FeatureIllustration /> */}
                            <GovernanceGraphic />
                        </div>
                    </div>
                </div>
            </section>

            {/* Security */}
            <section className="relative py-16 bg-background border-t border-border overflow-hidden">
                <div className="hidden lg:block absolute left-1/2 top-0 bottom-0 w-px bg-slate-200 dark:bg-slate-800 -translate-x-1/2"></div>
                <div className="max-w-7xl mx-auto px-6">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center mb-16">
                        <div>
                            <SecurityIllustration />
                        </div>
                        <motion.div
                            initial={{ opacity: 0, x: 50 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.8 }}
                            viewport={{ once: true }}
                        >
                            <div className="inline-flex items-center px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-500 text-xs font-bold mb-6 tracking-wider uppercase">
                                Data & Security
                            </div>
                            <h2 className="text-3xl md:text-4xl font-bold mb-6 tracking-tight text-foreground">Secure Data Fabric</h2>
                            <p className="text-lg text-slate-600 dark:text-slate-400 mb-8 leading-relaxed">
                                Unify your enterprise knowledge safely. Our FlowMaster SDX Technology discovers, links, and annotates data across your enterprise for safe AI consumption.
                            </p>
                            <div className="grid grid-cols-1 gap-4">
                                <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-900 border border-border">
                                    <Lock className="text-blue-500 mb-2 w-6 h-6" />
                                    <div className="text-sm font-bold text-foreground mb-1">Secure Private Infrastructure</div>
                                    <div className="text-xs text-slate-500">Full source code availability, self-hosted AI models, and zero-trust architecture.</div>
                                </div>
                                <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-900 border border-border">
                                    <FileKey className="text-blue-500 mb-2 w-6 h-6" />
                                    <div className="text-sm font-bold text-foreground mb-1">Agentic Discovery (SDX)</div>
                                    <div className="text-xs text-slate-500">Automated data linking and annotation for context-aware agents.</div>
                                </div>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* Optimization */}
            <section className="relative py-16 bg-slate-50 dark:bg-slate-900/30 border-t border-border overflow-hidden">
                <div className="hidden lg:block absolute left-1/2 top-0 bottom-0 w-px bg-slate-200 dark:bg-slate-800 -translate-x-1/2"></div>
                <div className="max-w-7xl mx-auto px-6">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                        <motion.div
                            initial={{ opacity: 0, x: -50 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.8 }}
                            viewport={{ once: true }}
                            className="order-2 lg:order-1"
                        >
                            <div className="inline-flex items-center px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-500 text-xs font-bold mb-6 tracking-wider uppercase">
                                The Digital Workforce
                            </div>
                            <h2 className="text-3xl md:text-4xl font-bold mb-6 tracking-tight text-foreground">Agents as Employees</h2>
                            <p className="text-lg text-slate-600 dark:text-slate-400 mb-8 leading-relaxed">
                                Deploy AI agents that act as &quot;digital employees,&quot; each assigned to a human manager. They learn from every interaction and escalate when uncertain.
                            </p>
                            <div className="space-y-4">
                                <div className="flex items-center gap-4 p-4 rounded-xl border border-border bg-background group hover:border-blue-500/50 transition-colors">
                                    <div className="w-10 h-10 rounded-full bg-blue-500/10 flex items-center justify-center text-blue-500">
                                        <TrendingUp className="w-5 h-5" />
                                    </div>
                                    <div>
                                        <div className="font-bold text-foreground">Continuous Learning</div>
                                        <div className="text-xs text-slate-500">Agents learn from every manager interaction and feedback loop.</div>
                                    </div>
                                </div>
                                <div className="flex items-center gap-4 p-4 rounded-xl border border-border bg-background group hover:border-blue-500/50 transition-colors">
                                    <div className="w-10 h-10 rounded-full bg-blue-500/10 flex items-center justify-center text-blue-500">
                                        <MessageSquare className="w-5 h-5" />
                                    </div>
                                    <div>
                                        <div className="font-bold text-foreground">Human-in-the-Loop</div>
                                        <div className="text-xs text-slate-500">Humans act as guides for low-confidence tasks and sign off on high-value transactions.</div>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                        <div className="order-1 lg:order-2">
                            <OptimizationIllustration />
                        </div>
                    </div>
                </div>
            </section>

            {/* CTA */}
            {/* <section className="py-16 bg-background border-t border-border">
                <div className="max-w-7xl mx-auto px-6 text-center">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                        viewport={{ once: true }}
                        className="bg-slate-50 dark:bg-slate-900 p-10 rounded-3xl shadow-lg border border-border inline-block w-full max-w-4xl"
                    >
                        <h3 className="text-2xl font-bold mb-8 text-foreground">Ready to Dive Deeper?</h3>
                        <div className="flex flex-col sm:flex-row gap-4 justify-center px-4">
                            <Button className="h-14 px-8 text-lg font-bold bg-navy-900 text-white hover:bg-navy-800">
                                Schedule a Demo <Calendar className="ml-2 w-5 h-5" />
                            </Button>
                            <Button variant="outline" className="h-14 px-8 text-lg font-bold border-slate-300 dark:border-slate-700">
                                Read Documentation
                            </Button>
                        </div>
                    </motion.div>
                </div>
            </section> */}

        </div>
    );
}
