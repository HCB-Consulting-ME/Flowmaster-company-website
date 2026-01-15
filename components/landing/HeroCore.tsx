import React from "react";
import { motion } from "framer-motion";
import {
    ShieldCheck, Brain, Database, Cloud,
    Bot, RefreshCw, LineChart, CheckCircle2,
    Settings2, ChevronRight
} from "lucide-react";

export function HeroCore() {
    // Re-integrated your specific animation logic
    const pulseVariants = {
        animate: {
            scale: [1, 1.03, 1],
            boxShadow: [
                "0 0 20px rgba(59,130,246,0.3)",
                "0 0 50px rgba(59,130,246,0.6)",
                "0 0 20px rgba(59,130,246,0.3)"
            ],
            transition: { duration: 3, repeat: Infinity, ease: "easeInOut" as const }
        }
    };

    const flowVariants = {
        animate: {
            opacity: [0.2, 0.8, 0.2],
            translateX: [0, 5, 0],
            transition: { duration: 2, repeat: Infinity }
        }
    };

    return (
        <div className="w-full min-h-[400px] p-2 flex flex-col items-center justify-center font-sans">

            {/* Responsive Wrapper: 
               - Uses flex-col on mobile, flex-row on desktop
            */}
            <div className="w-full max-w-5xl flex flex-col md:flex-row items-center justify-between gap-4 md:gap-3 scale-[0.8] sm:scale-[0.85] md:scale-90 transition-transform duration-500">

                {/* 1. USER DATA SOURCES */}
                <div className="flex flex-col items-center text-center flex-1">
                    <motion.div
                        whileHover={{ y: -5 }}
                        className="bg-slate-900 p-2 md:p-4 rounded-2xl border border-blue-500/30 mb-2 flex gap-1 md:gap-2 shadow-lg"
                    >
                        <Database className="text-blue-400 w-4 h-4 md:w-6 md:h-6" />
                        <Cloud className="text-blue-400 w-4 h-4 md:w-6 md:h-6" />
                    </motion.div>
                    <p className="text-[8px] md:text-[11px] font-bold text-slate-300 uppercase leading-tight tracking-tighter">
                        Enterprise Data<br />
                        <span className="text-blue-400 font-medium lowercase">(apis/erp)</span>
                    </p>
                </div>

                {/* Arrow 1 */}
                <motion.div variants={flowVariants} animate="animate" className="flex-shrink-0 rotate-90 md:rotate-0">
                    <ChevronRight className="text-white/50 w-3 h-3 md:w-6 md:h-6" />
                </motion.div>

                {/* 2. CENTRAL CORE & ENGINE (The vertical move down) */}
                <div className="flex flex-col items-center relative flex-[1.5] mb-20 md:mb-0">
                    <motion.div
                        variants={pulseVariants}
                        animate="animate"
                        className="z-20 w-24 h-24 md:w-36 md:h-36 rounded-full border-4 border-blue-500 bg-slate-900 flex flex-col items-center justify-center"
                    >
                        <ShieldCheck className="text-blue-400 w-6 h-6 md:w-10 md:h-10 mb-1" />
                        <div className="text-center px-1">
                            <span className="text-[7px] md:text-[10px] font-black text-blue-100 block leading-tight uppercase tracking-[0.1em] md:tracking-widest">
                                FLOWMASTER<br />SDX PROTOCOL
                            </span>
                        </div>
                    </motion.div>

                    {/* Alignment Engine - Always positioned below the core */}
                    <div className="absolute top-[110%] flex flex-col items-center w-full">
                        <div className="h-4 md:h-8 border-l-2 border-dashed border-blue-500/40 relative">
                            <div className="absolute -bottom-1 -left-[5px] w-2 h-2 rounded-full bg-blue-400 animate-pulse" />
                        </div>
                        <div className="bg-slate-900 p-1.5 md:p-2 rounded-xl border border-slate-700 shadow-2xl">
                            <div className="relative">
                                <Brain className="text-blue-400 w-4 h-4 md:w-6 md:h-6" />
                                <Settings2 className="absolute -bottom-1 -right-1 text-blue-300 w-2 h-2 md:w-3 md:h-3 animate-spin" />
                            </div>
                        </div>
                        <p className="mt-2 text-[7px] md:text-[10px] font-bold text-slate-400 uppercase text-center whitespace-nowrap">
                            Alignment & Processing
                        </p>
                    </div>
                </div>

                {/* Arrow 2 */}
                <motion.div variants={flowVariants} animate="animate" className="flex-shrink-0 rotate-90 md:rotate-0">
                    <ChevronRight className="text-white/50 w-3 h-3 md:w-6 md:h-6" />
                </motion.div>

                {/* 3. AGENTIC PROCESSES */}
                <div className="flex flex-col items-center text-center flex-1">
                    <motion.div
                        whileHover={{ scale: 1.05 }}
                        className="bg-slate-900 p-2 md:p-4 rounded-2xl border border-slate-700 mb-2 shadow-lg"
                    >
                        <div className="flex flex-col items-center gap-1">
                            <Bot className="text-blue-400 w-5 h-5 md:w-6 md:h-6" />
                            <RefreshCw className="text-blue-300 w-2 h-2 md:w-3 md:h-3 animate-spin-slow" />
                        </div>
                    </motion.div>
                    <p className="text-[8px] md:text-[11px] font-bold text-slate-300 uppercase leading-tight">
                        Agentic<br />Processes
                    </p>
                </div>

                {/* Arrow 3 */}
                <motion.div variants={flowVariants} animate="animate" className="flex-shrink-0 rotate-90 md:rotate-0">
                    <ChevronRight className="text-white/50 w-3 h-3 md:w-6 md:h-6" />
                </motion.div>

                {/* 4. BUSINESS OUTCOMES */}
                <div className="flex flex-col items-center text-center flex-1">
                    <motion.div
                        whileHover={{ y: -5 }}
                        className="bg-slate-900 p-2 md:p-4 rounded-2xl border border-blue-500/30 mb-2 relative shadow-lg"
                    >
                        <LineChart className="text-blue-400 w-5 h-5 md:w-6 md:h-6" />
                        <CheckCircle2 className="absolute -bottom-1 -right-1 text-blue-400 w-3 h-3 md:w-4 md:h-4 bg-slate-900 rounded-full" />
                    </motion.div>
                    <p className="text-[8px] md:text-[11px] font-bold text-slate-300 uppercase leading-tight tracking-tighter">
                        Business<br />Outcomes
                    </p>
                </div>

            </div>

            {/* Bottom spacer to account for the Engine which is absolutely positioned below the flow line */}
            <div className="h-0 md:h-24"></div>
        </div>
    );
}