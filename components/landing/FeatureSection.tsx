import React from 'react';
import { motion } from 'framer-motion';
import {
    Database,
    FileEdit,
    Cpu,
    LayoutTemplate,
    ShieldCheck,
    Code2
} from 'lucide-react';

const FeaturesSection = () => {
    const features = [
        {
            icon: <Database className="text-primary w-7 h-7" />,
            title: "Integration",
            description: "FlowMasterSDX technology makes existing data structures across the enterprise usable for Agents. Just add AI across silos."
        },
        {
            icon: <FileEdit className="text-primary w-7 h-7" />,
            title: "Process Design",
            description: "Bring your own processes: Upload as PDF and modify via drag-and-drop editor with full versioning and approvals."
        },
        {
            icon: <Cpu className="text-primary w-7 h-7" />,
            title: "Process Execution",
            description: "Self-learning agents execute with oversight. No black boxes, full audit trail, and human-in-the-loop controls."
        },
        {
            icon: <LayoutTemplate className="text-primary w-7 h-7" />,
            title: "User Experience",
            description: "Connect to existing front-end apps or use FlowMasterDXG for ad-hoc generation of mobile and web user apps."
        },
        {
            icon: <ShieldCheck className="text-primary w-7 h-7" />,
            title: "Security & Privacy",
            description: "Available as SaaS or fully self-hosted. Supports all common LLMs with maximum control over your data."
        },
        {
            icon: <Code2 className="text-primary w-7 h-7" />,
            title: "Business-as-Code (BaC)",
            description: "Analysis, design, sign-off, and execution in one platform. Deploy changes as code for seamless enterprise agility."
        }
    ];

    return (
        <section className="py-24 bg-background">
            <div className="max-w-7xl mx-auto px-6">
                <motion.h2
                    className="text-3xl md:text-4xl font-bold text-center mb-20 text-navy-900 dark:text-white"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    viewport={{ once: true }}
                >
                    Enterprise-Grade Execution
                </motion.h2>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-12 gap-y-16">
                    {features.map((feature, index) => (
                        <motion.div
                            key={index}
                            className="group flex flex-col items-center text-center"
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                            viewport={{ once: true }}
                        >
                            <motion.div
                                className="w-16 h-16 bg-blue-50/50 dark:bg-slate-800/50 border border-blue-100 dark:border-slate-700 rounded-2xl flex items-center justify-center mb-6 transition-colors group-hover:bg-blue-100 dark:group-hover:bg-slate-700"
                                whileHover={{
                                    scale: 1.05,
                                    rotate: [0, -5, 5, 0],
                                    transition: { duration: 0.4 }
                                }}
                            >
                                {feature.icon}
                            </motion.div>

                            <h3 className="text-xl font-bold mb-3 dark:text-white tracking-tight">
                                {feature.title}
                            </h3>

                            <p className="text-slate-600 dark:text-slate-400 leading-relaxed text-sm md:text-base">
                                {feature.description}
                            </p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default FeaturesSection;