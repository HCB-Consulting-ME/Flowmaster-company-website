"use client";

import { Button } from "@/components/ui/button";
import { Check, ArrowRight, Sparkles, ShieldCheck } from "lucide-react";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

export default function PricingPage() {
    return (
        <div className="flex flex-col min-h-screen">
            <header className="bg-navy-900 pt-20 pb-32 px-6 text-center relative overflow-hidden">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,#1e293b_0%,#020617_100%)]"></div>
                <div className="max-w-7xl mx-auto relative z-10">
                    <motion.h1
                        className="text-4xl md:text-5xl font-bold text-white mb-4 my-10"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                    >
                        Simple, Scalable Pricing
                    </motion.h1>
                    <motion.p
                        className="text-blue-100 text-lg max-w-2xl mx-auto"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.1 }}
                    >
                        Power your enterprise with FlowMaster AI Agents. From personal experimentation to full-scale global
                        deployments.
                    </motion.p>
                </div>
            </header>

            <main className="max-w-7xl mx-auto px-6 -mt-20 pb-20 w-full relative z-10">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">

                    {/* Free Tier */}
                    <motion.div
                        className="lg:col-span-5 bg-background rounded-xl shadow-xl overflow-hidden border border-border"
                        initial={{ opacity: 0, x: -50 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.5, delay: 0.2 }}
                    >
                        <div className="p-6 border-b border-border flex justify-between items-center">
                            <div>
                                <h2 className="text-2xl font-bold text-navy-900 dark:text-blue-400">Free</h2>
                                <p className="text-slate-500 text-sm">For individuals & prototyping</p>
                            </div>
                            <span className="px-3 py-1 bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 text-xs font-semibold rounded-full uppercase tracking-wider">
                                Current Plan
                            </span>
                        </div>
                        <div className="p-6">
                            <div className="mb-6">
                                <div className="flex items-baseline">
                                    <span className="text-4xl font-bold text-foreground">$0</span>
                                    <span className="text-slate-500 ml-2">/month</span>
                                </div>
                            </div>
                            <div className="overflow-hidden rounded-lg border border-border">
                                <table className="w-full text-left text-sm">
                                    <thead className="bg-navy-900 text-white">
                                        <tr>
                                            <th className="px-4 py-3 font-semibold uppercase tracking-wider text-xs">Item</th>
                                            <th className="px-4 py-3 font-semibold uppercase tracking-wider text-xs">Configuration</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-border bg-slate-50 dark:bg-slate-900/20">
                                        {[
                                            { l: "CPU", r: "AMD Ryzen™ 5 3600 (6c/12t)" },
                                            { l: "Generation", r: "Matisse (Zen 2)" },
                                            { l: "RAM", r: "128 GB DDR4 RAM" },
                                            { l: "Drives", r: "2 x 512 GB NVMe SSD" },
                                            { l: "Locations", r: "1 x Germany, 1 x Finland" },
                                        ].map((row, i) => (
                                            <tr key={i} className="even:bg-slate-100/50 dark:even:bg-slate-800/30">
                                                <td className="px-4 py-3 font-medium text-slate-700 dark:text-slate-300">{row.l}</td>
                                                <td className="px-4 py-3 font-mono text-xs text-slate-600 dark:text-slate-400">{row.r}</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                            <Button className="w-full mt-8" variant="outline" size="lg">
                                Get Started Free
                            </Button>
                        </div>
                    </motion.div>

                    {/* Enterprise Tier */}
                    <motion.div
                        className="lg:col-span-7 bg-background rounded-xl shadow-xl overflow-hidden border-2 border-navy-900 dark:border-blue-500 relative"
                        initial={{ opacity: 0, x: 50 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.5, delay: 0.3 }}
                    >
                        <div className="absolute top-0 right-0 bg-navy-900 dark:bg-blue-600 text-white text-[10px] font-bold px-3 py-1 rounded-bl-lg uppercase tracking-widest">
                            Recommended
                        </div>
                        <div className="p-6 border-b border-border flex justify-between items-center">
                            <div>
                                <h2 className="text-2xl font-bold text-navy-900 dark:text-blue-400">Enterprise</h2>
                                <p className="text-slate-500 text-sm">Customized for scale & security</p>
                            </div>
                            <a className="text-navy-900 dark:text-blue-400 font-semibold flex items-center gap-1 hover:underline cursor-pointer">
                                Contact Us <ArrowRight className="w-4 h-4" />
                            </a>
                        </div>
                        <div className="p-6 space-y-6">
                            <div className="bg-slate-100 dark:bg-slate-800 p-6 rounded-lg border-l-4 border-navy-900 dark:border-blue-500">
                                <div className="flex items-start gap-4">
                                    <Sparkles className="text-navy-900 dark:text-blue-400 mt-1 w-5 h-5" />
                                    <div>
                                        <h3 className="text-xl font-bold mb-1 text-foreground">250M token usage p.a. in Gemini 3 Flash</h3>
                                        <p className="text-slate-600 dark:text-slate-400 text-sm italic">
                                            (equals approx. 200m words, or 5% of English Wikipedia)
                                        </p>
                                    </div>
                                </div>
                            </div>

                            <div className="bg-slate-50 dark:bg-slate-900/50 p-4 rounded-xl">
                                <h4 className="text-lg font-bold mb-4 flex items-center gap-2 text-foreground">
                                    <ShieldCheck className="w-5 h-5 text-green-600" />
                                    Unlimited, non-restrictive License.
                                </h4>
                                <div className="overflow-hidden rounded-lg border border-border">
                                    <table className="w-full text-left text-sm">
                                        <thead className="bg-navy-900 text-white">
                                            <tr>
                                                <th className="px-4 py-3 font-semibold uppercase tracking-wider text-xs w-1/2">Item</th>
                                                <th className="px-4 py-3 font-semibold uppercase tracking-wider text-xs">Included Services</th>
                                            </tr>
                                        </thead>
                                        <tbody className="divide-y divide-border bg-background">
                                            {[
                                                { l: "Process executions", r: "Unlimited", type: "bold" },
                                                { l: "Number of agents", r: "Unlimited", type: "bold" },
                                                { l: "MCP servers", r: "Unlimited", type: "bold" },
                                                { l: "Integrations", r: "Unlimited", type: "bold" },
                                                { l: "On-Prem usage", r: "Included (client hosted)", type: "italic" },
                                                { l: "SaaS based usage", r: "Included (client hosted)", type: "italic" },
                                                { l: "Single Sign On", r: "Included", type: "green" },
                                                { l: "Audit", r: "Included", type: "green" },
                                            ].map((row, i) => (
                                                <tr key={i} className="even:bg-slate-100/50 dark:even:bg-slate-800/30">
                                                    <td className="px-4 py-3 font-medium text-slate-700 dark:text-slate-300">{row.l}</td>
                                                    <td className={cn(
                                                        "px-4 py-3",
                                                        row.type === "bold" && "text-navy-900 dark:text-blue-400 font-bold uppercase text-xs",
                                                        row.type === "italic" && "italic text-slate-600 dark:text-slate-400",
                                                        row.type === "green" && "text-green-600 font-semibold"
                                                    )}>{row.r}</td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            </div>

                            <Button className="w-full py-6 text-sm font-bold uppercase tracking-widest bg-navy-900 text-white hover:bg-navy-800">
                                Contact Sales for Custom Quote
                            </Button>
                        </div>
                    </motion.div>

                </div>

                <footer className="mt-20 border-t border-border pt-10 text-center">
                    <div className="flex flex-col md:flex-row justify-center items-center gap-8 text-slate-500 dark:text-slate-400 text-sm">
                        <span className="flex items-center gap-2 font-medium">Global Infrastructure</span>
                        <span className="flex items-center gap-2 font-medium">Enterprise Grade Security</span>
                        <span className="flex items-center gap-2 font-medium">24/7 Priority Support</span>
                    </div>
                    <p className="mt-10 opacity-50 text-xs">Last Updated: 09/01/2026</p>
                </footer>
            </main>
        </div>
    );
}
