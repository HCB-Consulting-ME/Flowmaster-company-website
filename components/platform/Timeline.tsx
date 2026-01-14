import React from 'react';
import { motion } from 'framer-motion';
import { Settings, Play, Database, Cpu, Users } from 'lucide-react';
import Image from 'next/image';

const FlowMasterTimeline = () => {
    const steps = [
        {
            id: "step1",
            title: "Process Ingestion",
            desc: "Ingest SOPs, RACIs, and existing process documentation into the local secure fabric.",
            icon: <Settings size={20} />,
            role: "Process Architect"
        },
        {
            id: "step2",
            title: "SDX Intelligence",
            desc: "Our Secure Data Fabric maps processes to enterprise data with full contextual awareness.",
            icon: <Cpu size={20} />,
            role: "AI Agents & Bots"
        },
        {
            id: "step3",
            title: "Agent Assembly",
            desc: "No-code orchestration of autonomous agents and human task handover.",
            icon: <Play size={20} />,
            role: "Execution Engine"
        },
        {
            id: "step4",
            title: "Live Execution",
            desc: "Continuous monitoring and secure execution across core systems.",
            icon: <Database size={20} />,
            role: "Platform Admin"
        }
    ];

    const LOOP_DURATION = 8; // Seconds for one full pass

    return (
        <div className="w-full relative group">
            <div className="absolute inset-0 bg-blue-500/5 blur-3xl rounded-full pointer-events-none"></div>

            <div className="relative w-full bg-slate-900/40 backdrop-blur-xl p-6 md:p-12 rounded-[2.5rem] border border-white/5 font-sans shadow-2xl overflow-hidden">
                <div className="max-w-6xl mx-auto relative">

                    {/* Desktop Horizontal Timeline */}
                    <div className="hidden md:block">
                        {/* Top Roles */}
                        <div className="grid grid-cols-4 mb-8">
                            {steps.map((step, idx) => (
                                <motion.div
                                    key={step.id}
                                    className="flex flex-col items-center"
                                    // Reveal role text as indicator passes
                                    animate={{ opacity: [0, 0, 1, 1], y: [10, 10, 0, 0] }}
                                    transition={{
                                        duration: LOOP_DURATION,
                                        times: [0, (idx * 0.25), (idx * 0.25) + 0.05, 1],
                                        repeat: Infinity
                                    }}
                                >
                                    <div className="flex items-center gap-2 mb-3 text-slate-500">
                                        <Users size={14} className="opacity-50" />
                                        <span className="text-[10px] font-bold uppercase tracking-[0.2em]">{step.role}</span>
                                    </div>
                                </motion.div>
                            ))}
                        </div>

                        {/* The Unified Track */}
                        <div className="relative h-20 bg-slate-950/40 rounded-3xl border border-white/5 flex items-center px-4 overflow-hidden shadow-[inset_0_2px_10px_rgba(0,0,0,0.3)]">

                            {/* Moving Hub Indicator */}
                            <motion.div
                                initial={{ left: "-10%" }}
                                animate={{ left: "110%" }}
                                transition={{
                                    duration: LOOP_DURATION,
                                    ease: "linear",
                                    repeat: Infinity,
                                }}
                                className="absolute z-20 h-full flex items-center pointer-events-none"
                            >
                                <div className="relative h-24 w-24 translate-x-[-50%] opacity-90">
                                    <Image
                                        src="/logo/logoicon2.png"
                                        alt="Indicator"
                                        fill
                                        className="object-contain"
                                    />
                                    <div className="absolute inset-0 bg-blue-500/30 blur-2xl rounded-full -z-10"></div>
                                </div>
                            </motion.div>

                            {/* Step Stations Overlay */}
                            <div className="relative z-10 w-full grid grid-cols-4">
                                {steps.map((step, idx) => (
                                    <motion.div
                                        key={step.id}
                                        className="flex items-center justify-center gap-4"
                                        // ITEM REVEAL LOGIC:
                                        // Opacity stays 0 until the indicator reaches its column
                                        animate={{
                                            opacity: [0, 0, 1, 1],
                                            scale: [0.8, 0.8, 1, 1],
                                            filter: ["blur(4px)", "blur(4px)", "blur(0px)", "blur(0px)"]
                                        }}
                                        transition={{
                                            duration: LOOP_DURATION,
                                            // idx * 0.25 triggers at 0s, 2s, 4s, 6s for the 4 items
                                            times: [0, (idx * 0.25), (idx * 0.25) + 0.05, 1],
                                            repeat: Infinity,
                                            ease: "linear"
                                        }}
                                    >
                                        <div className="w-12 h-12 rounded-2xl bg-slate-800/80 border border-white/10 flex items-center justify-center shadow-2xl backdrop-blur-sm">
                                            {React.cloneElement(step.icon as React.ReactElement<{ className?: string }>, { className: "text-blue-400 w-5 h-5" })}
                                        </div>
                                        <span className="text-sm font-bold text-slate-200 tracking-wide">{step.title}</span>
                                    </motion.div>
                                ))}
                            </div>
                        </div>

                        {/* Bottom Descriptions */}
                        <div className="grid grid-cols-4 mt-8">
                            {steps.map((step, idx) => (
                                <motion.div
                                    key={step.id}
                                    className="px-6 text-center"
                                    animate={{ opacity: [0, 0, 1, 1] }}
                                    transition={{
                                        duration: LOOP_DURATION,
                                        times: [0, (idx * 0.25) + 0.05, (idx * 0.25) + 0.1, 1],
                                        repeat: Infinity
                                    }}
                                >
                                    <p className="text-xs text-slate-500 leading-relaxed font-medium">
                                        {step.desc}
                                    </p>
                                </motion.div>
                            ))}
                        </div>
                    </div>

                    {/* Mobile Timeline: Simplified reveal for vertical flow */}
                    <div className="md:hidden space-y-10 relative pl-4">
                        {steps.map((step) => (
                            <motion.div
                                key={step.id}
                                initial={{ opacity: 0 }}
                                whileInView={{ opacity: 1 }}
                                viewport={{ margin: "-100px" }}
                                transition={{ duration: 0.5 }}
                                className="relative flex gap-6"
                            >
                                <div className="shrink-0 w-12 h-12 rounded-2xl bg-slate-800 border border-white/10 flex items-center justify-center">
                                    {React.cloneElement(step.icon as React.ReactElement<{ className?: string }>, { className: "text-blue-400 w-5 h-5" })}
                                </div>
                                <div className="flex flex-col pt-1">
                                    <h4 className="text-lg font-bold text-slate-100 mb-1">{step.title}</h4>
                                    <p className="text-sm text-slate-400 leading-relaxed">{step.desc}</p>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default FlowMasterTimeline;