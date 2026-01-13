import React from 'react';
import { motion } from 'framer-motion';
import {
    Network,      // Integration (connecting silos)
    GitBranch,    // Process Design (versioning & approvals)
    Zap,          // Process Execution (fast execution)
    MonitorSmartphone, // UX (mobile/web generation)
    Lock,         // Security (privacy & control)
    Terminal      // BaC (deploying changes as code)
} from 'lucide-react';

const FeaturesSection = () => {
    const features = [
        {
            icon: <Network className="w-6 h-6 text-blue-600 dark:text-blue-400" />,
            title: "Integration",
            description: "FlowMasterSDX technology makes existing data structures across the enterprise usable for Agents. Just add AI across silos."
        },
        {
            icon: <GitBranch className="w-6 h-6 text-blue-600 dark:text-indigo-400" />,
            title: "Process Design",
            description: "Bring your own processes: Upload as PDF and modify via drag-and-drop editor with full versioning and approvals."
        },
        {
            icon: <Zap className="w-6 h-6 text-blue-600 dark:text-amber-400" />,
            title: "Process Execution",
            description: "Self-learning agents execute with oversight. No black boxes, full audit trail, and human-in-the-loop controls."
        },
        {
            icon: <MonitorSmartphone className="w-6 h-6 text-blue-600 dark:text-emerald-400" />,
            title: "User Experience",
            description: "Connect to existing front-end apps or use FlowMasterDXG for ad-hoc generation of mobile and web user apps."
        },
        {
            icon: <Lock className="w-6 h-6 text-blue-600 dark:text-rose-400" />,
            title: "Security & Privacy",
            description: "Available as SaaS or fully self-hosted. Supports all common LLMs with maximum control over your data."
        },
        {
            icon: <Terminal className="w-6 h-6 text-blue-600 dark:text-slate-300" />,
            title: "Business-as-Code (BaC)",
            description: "Analysis, design, sign-off, and execution in one platform. Deploy changes as code for seamless enterprise agility."
        }
    ];

    return (
        <section className="py-24 bg-slate-50 dark:bg-[#0B1120]">
            <div className="max-w-7xl mx-auto px-6">
                <motion.div 
                    className="text-center mb-16"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    viewport={{ once: true }}
                >
                    <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 dark:text-white mb-4">
                        Enterprise-Grade Execution
                    </h2>
                    <p className="text-slate-600 dark:text-slate-400 max-w-2xl mx-auto text-lg">
                        The ultimate infrastructure for deploying agentic AI in complex environments.
                    </p>
                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {features.map((feature, index) => (
                        <motion.div
                            key={index}
                            className="relative group bg-white dark:bg-slate-900/50 p-8 rounded-3xl cursor-pointer border border-slate-200 dark:border-slate-800 shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.4, delay: index * 0.1 }}
                            viewport={{ once: true }}
                        >
                            {/* Icon Container */}
                            <div className="w-12 h-12 rounded-lg bg-slate-50 dark:bg-slate-800 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                                {feature.icon}
                            </div>

                            <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-3">
                                {feature.title}
                            </h3>

                            <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
                                {feature.description}
                            </p>

                            {/* Subtle hover accent */}
                            <div className="absolute inset-x-0 bottom-0 h-1 bg-gradient-to-r from-transparent via-blue-500 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-b-2xl" />
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default FeaturesSection;