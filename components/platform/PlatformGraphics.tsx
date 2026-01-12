"use client";

import {
    Monitor,
    Smartphone,
    Tablet,
    Server,
    Key,
    Shield,
    Database,
    Activity,
    TrendingUp,
    Zap,
    Brain,
    Workflow,
} from "lucide-react";
import { motion } from "framer-motion";

export function ManagerAppIllustration() {
    return (
        <div className="relative w-full">
            {/* Background grid effect */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(59,130,246,0.05)_1px,transparent_1px)] [background-size:50px_50px] rounded-lg pointer-events-none"></div>

            <svg className="absolute inset-0 w-full h-full pointer-events-none hidden md:block" style={{ top: 0, left: 0 }}>
                <defs>
                    <marker id="arrowhead-blue" markerWidth="10" markerHeight="10" refX="9" refY="3" orient="auto">
                        <polygon points="0 0, 10 3, 0 6" fill="rgb(59, 130, 246)" />
                    </marker>
                    <filter id="glow">
                        <feGaussianBlur stdDeviation="2" result="coloredBlur" />
                        <feMerge>
                            <feMergeNode in="coloredBlur" />
                            <feMergeNode in="SourceGraphic" />
                        </feMerge>
                    </filter>
                    <linearGradient id="flowGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                        <stop offset="0%" stopColor="rgba(59, 130, 246, 0)" />
                        <stop offset="50%" stopColor="rgb(59, 130, 246)" />
                        <stop offset="100%" stopColor="rgba(59, 130, 246, 0)" />
                    </linearGradient>
                </defs>

                {/* Main flow lines with gradient and glow */}
                <motion.line
                    x1="100"
                    y1="60"
                    x2="210"
                    y2="95"
                    stroke="url(#flowGradient)"
                    strokeWidth="2.5"
                    markerEnd="url(#arrowhead-blue)"
                    filter="url(#glow)"
                    initial={{ pathLength: 0, opacity: 0 }}
                    animate={{ pathLength: 1, opacity: 1 }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                />
                <motion.line
                    x1="420"
                    y1="95"
                    x2="520"
                    y2="120"
                    stroke="rgb(59, 130, 246)"
                    strokeWidth="2.5"
                    markerEnd="url(#arrowhead-blue)"
                    filter="url(#glow)"
                    initial={{ pathLength: 0 }}
                    animate={{ pathLength: 1 }}
                    transition={{ duration: 1, delay: 0.5 }}
                />
                <motion.line
                    x1="710"
                    y1="120"
                    x2="840"
                    y2="100"
                    stroke="url(#flowGradient)"
                    strokeWidth="2.5"
                    markerEnd="url(#arrowhead-blue)"
                    filter="url(#glow)"
                    initial={{ pathLength: 0, opacity: 0 }}
                    animate={{ pathLength: 1, opacity: 1 }}
                    transition={{ duration: 1.5, repeat: Infinity, delay: 1 }}
                />
            </svg>

            <div className="flex flex-col md:grid md:grid-cols-12 items-center gap-6 md:gap-3 text-white relative z-10 px-4 md:px-2 py-8 md:py-0">
                {/* Manager App */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="w-full md:w-auto md:col-span-2 flex flex-col items-center group"
                >
                    <div className="w-20 h-16 bg-gradient-to-br from-slate-700 to-slate-900 rounded-xl flex items-center justify-center border-2 border-blue-500/40 shadow-lg group-hover:border-blue-400 group-hover:shadow-[0_0_20px_rgba(59,130,246,0.4)] transition-all duration-300">
                        <Monitor className="text-blue-400 w-8 h-8" />
                    </div>
                    <p className="text-xs text-slate-400 font-semibold mt-3 group-hover:text-blue-300 transition-colors">
                        Manager App
                    </p>
                </motion.div>

                {/* Connection dot and line */}
                <div className="hidden md:flex col-span-1 justify-center items-center h-24">
                    <div className="flex flex-col items-center justify-center h-full">
                        <motion.div
                            animate={{ scale: [1, 1.2, 1] }}
                            transition={{ duration: 2, repeat: Infinity }}
                            className="w-2 h-2 rounded-full bg-blue-400 shadow-[0_0_8px_rgba(96,165,250,0.8)]"
                        ></motion.div>
                    </div>
                </div>

                {/* Mobile Connector */}
                <div className="md:hidden flex flex-col items-center">
                    <div className="w-0.5 h-8 bg-gradient-to-b from-blue-500/0 via-blue-500 to-blue-500/0"></div>
                </div>

                {/* Process Ingestion & Governance */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.1 }}
                    className="w-full md:w-auto md:col-span-2 group"
                >
                    <div className="bg-gradient-to-br from-slate-800/60 to-slate-900/40 p-5 rounded-xl border-2 border-slate-700/60 text-center h-auto md:h-32 flex flex-col justify-center hover:border-blue-500/60 hover:bg-slate-800/80 transition-all duration-300 shadow-lg group-hover:shadow-[0_0_20px_rgba(59,130,246,0.2)]">
                        <div className="flex items-center justify-center gap-2 mb-2">
                            <Workflow className="w-4 h-4 text-blue-400" />
                            <h3 className="text-xs md:text-sm font-bold text-slate-100">Process Ingestion</h3>
                        </div>
                        <p className="text-[10px] text-slate-400 mb-2">& Governance</p>
                        <div className="w-full h-1 bg-slate-700/50 rounded-full overflow-hidden">
                            <motion.div
                                animate={{ x: ["-100%", "100%"] }}
                                transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                                className="h-full w-1/2 bg-gradient-to-r from-blue-500 to-blue-300"
                            ></motion.div>
                        </div>
                    </div>
                </motion.div>

                {/* Connection dot */}
                <div className="hidden md:flex col-span-1 justify-center items-center h-24">
                    <div className="flex flex-col items-center justify-center h-full">
                        <motion.div
                            animate={{ scale: [1, 1.2, 1] }}
                            transition={{ duration: 2, repeat: Infinity, delay: 0.5 }}
                            className="w-2 h-2 rounded-full bg-blue-400 shadow-[0_0_8px_rgba(96,165,250,0.8)]"
                        ></motion.div>
                    </div>
                </div>

                {/* Mobile Connector */}
                <div className="md:hidden flex flex-col items-center">
                    <div className="w-0.5 h-8 bg-gradient-to-b from-blue-500/0 via-blue-500 to-blue-500/0"></div>
                </div>

                {/* AI Agent Core - Central Hub */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                    className="w-full md:w-auto md:col-span-2 px-0 md:px-2 group"
                >
                    <div className="relative">
                        <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-blue-600/5 rounded-xl blur-lg group-hover:from-blue-500/20 transition-all duration-300"></div>
                        <div className="relative bg-gradient-to-br from-slate-900/90 to-slate-950/90 p-5 rounded-xl border-2 border-blue-500/50 shadow-[0_0_25px_rgba(59,130,246,0.2)] group-hover:shadow-[0_0_35px_rgba(59,130,246,0.3)] group-hover:border-blue-400/70 transition-all duration-300">
                            <div className="flex items-center justify-center gap-2 mb-3">
                                <Brain className="w-5 h-5 text-blue-300 animate-pulse" />
                                <span className="text-xs font-bold text-blue-200">AI Agent Core</span>
                            </div>
                            <div className="space-y-2">
                                <div className="bg-blue-500/15 p-2 text-center text-xs rounded-lg border border-blue-500/40 text-blue-200 font-semibold hover:bg-blue-500/25 transition-colors">
                                    Cognitive Engine
                                </div>
                                <div className="bg-slate-800/50 p-2 text-center text-xs rounded-lg border border-slate-700 text-slate-300 text-[10px]">
                                    Knowledge Graph
                                </div>
                            </div>
                        </div>
                    </div>
                </motion.div>

                {/* Connection dot */}
                <div className="hidden md:flex col-span-1 justify-center items-center h-24">
                    <div className="flex flex-col items-center justify-center h-full">
                        <motion.div
                            animate={{ scale: [1, 1.2, 1] }}
                            transition={{ duration: 2, repeat: Infinity, delay: 1 }}
                            className="w-2 h-2 rounded-full bg-blue-400 shadow-[0_0_8px_rgba(96,165,250,0.8)]"
                        ></motion.div>
                    </div>
                </div>

                {/* Mobile Connector */}
                <div className="md:hidden flex flex-col items-center">
                    <div className="w-0.5 h-8 bg-gradient-to-b from-blue-500/0 via-blue-500 to-blue-500/0"></div>
                </div>

                {/* Execution Layer */}
                <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: 0.3 }}
                    className="w-full md:w-auto md:col-span-3 group"
                >
                    <div className="bg-gradient-to-br from-slate-800/60 to-slate-900/40 p-5 rounded-xl border-2 border-slate-700/60 text-center h-auto md:h-32 flex flex-col justify-center mb-4 hover:border-blue-500/60 hover:bg-slate-800/80 transition-all duration-300 shadow-lg group-hover:shadow-[0_0_20px_rgba(59,130,246,0.2)]">
                        <div className="flex items-center justify-center gap-2 mb-1">
                            <Zap className="w-4 h-4 text-blue-400" />
                            <h3 className="text-xs md:text-sm font-bold text-slate-100">Execution</h3>
                        </div>
                        <p className="text-[10px] text-slate-400">Endpoints</p>
                    </div>
                    <div className="flex justify-around items-center">
                        <div className="flex flex-col items-center group/endpoint">
                            <div className="w-10 h-10 rounded-lg bg-slate-800/50 border border-slate-700 flex items-center justify-center mb-1 group-hover/endpoint:border-blue-400 group-hover/endpoint:bg-slate-800 transition-all">
                                <Smartphone className="text-slate-500 w-5 h-5 group-hover/endpoint:text-blue-400 transition-colors" />
                            </div>
                            <span className="text-[10px] text-slate-500 group-hover/endpoint:text-slate-300 transition-colors">
                                Employee
                            </span>
                        </div>
                        <div className="flex flex-col items-center group/endpoint">
                            <div className="w-10 h-10 rounded-lg bg-slate-800/50 border border-slate-700 flex items-center justify-center mb-1 group-hover/endpoint:border-blue-400 group-hover/endpoint:bg-slate-800 transition-all">
                                <Tablet className="text-slate-500 w-5 h-5 group-hover/endpoint:text-blue-400 transition-colors" />
                            </div>
                            <span className="text-[10px] text-slate-500 group-hover/endpoint:text-slate-300 transition-colors">
                                Partner
                            </span>
                        </div>
                        <div className="flex flex-col items-center group/endpoint">
                            <div className="w-10 h-10 rounded-lg bg-slate-800/50 border border-slate-700 flex items-center justify-center mb-1 group-hover/endpoint:border-blue-400 group-hover/endpoint:bg-slate-800 transition-all">
                                <Server className="text-slate-500 w-5 h-5 group-hover/endpoint:text-blue-400 transition-colors" />
                            </div>
                            <span className="text-[10px] text-slate-500 group-hover/endpoint:text-slate-300 transition-colors">
                                Core
                            </span>
                        </div>
                    </div>
                </motion.div>
            </div>
        </div>
    )
}

import Image from "next/image";

export function FeatureIllustration() {
    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
            className="relative border-2 border-blue-500/30 p-8 rounded-3xl backdrop-blur-sm min-h-[400px] flex items-center justify-center bg-gradient-to-br from-blue-500/5 to-slate-900/10 group hover:border-blue-500/50 transition-all duration-300 overflow-hidden"
        >
            <div className="absolute inset-0 bg-blue-500/5 blur-3xl rounded-full"></div>

            <div className="relative z-10 w-full h-[350px] rounded-lg overflow-hidden border border-blue-500/20 shadow-2xl">
                <Image
                    src="/Screenshots/processcanvas.png"
                    alt="Flowmaster Canvas"
                    fill
                    className="object-contain object-top hover:scale-105 transition-transform duration-700"
                />
            </div>
        </motion.div>
    )
}



export function SecurityIllustration() {
    return (
        <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="relative border-2 border-blue-500/30 p-8 rounded-3xl backdrop-blur-sm min-h-[400px] flex items-center justify-center bg-gradient-to-br from-blue-500/5 to-slate-900/10 group hover:border-blue-500/50 transition-all duration-300"
        >
            <div className="w-full h-full flex flex-col items-center justify-center space-y-6 relative z-10">
                <div className="relative w-80 h-64 flex items-center justify-center">
                    {/* Window frame */}
                    <div className="absolute inset-0 border-2 border-blue-500/40 rounded-xl overflow-hidden bg-gradient-to-b from-slate-900 to-slate-950 shadow-[0_0_20px_rgba(59,130,246,0.1)]">
                        <div className="h-8 bg-gradient-to-r from-slate-800 to-slate-900 border-b border-slate-700/50 px-3 flex items-center gap-1 group/titlebar">
                            <div className="w-2.5 h-2.5 rounded-full bg-red-400/70 group-hover/titlebar:bg-red-400 transition-colors"></div>
                            <div className="w-2.5 h-2.5 rounded-full bg-yellow-400/70 group-hover/titlebar:bg-yellow-400 transition-colors"></div>
                            <div className="w-2.5 h-2.5 rounded-full bg-green-400/70 group-hover/titlebar:bg-green-400 transition-colors"></div>
                        </div>
                        {/* Scan lines effect */}
                        <div className="absolute inset-8 top-10 flex flex-col justify-center items-center opacity-80">
                            <div className="mb-4 text-[11px] font-mono text-blue-300/80">
                                <span className="animate-pulse">●</span> ENCRYPTION_TUNNEL
                            </div>
                            <div className="text-[10px] font-mono text-slate-500">STATUS: ACTIVE</div>
                        </div>
                    </div>

                    {/* Shield icon with glow */}
                    <div className="absolute z-20 flex flex-col items-center">
                        <div className="relative w-24 h-24 flex items-center justify-center">
                            <div className="absolute inset-0 bg-gradient-to-br from-blue-500/20 to-transparent rounded-lg blur-xl animate-pulse"></div>
                            <Shield className="w-16 h-16 text-blue-400 relative z-10" />
                        </div>
                    </div>

                    {/* Key indicator */}
                    <motion.div
                        animate={{ y: [0, -5, 0] }}
                        transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                        className="absolute -bottom-6 -right-6 w-28 h-28 border-2 border-blue-500/30 rounded-full bg-blue-500/5 backdrop-blur flex items-center justify-center group/keyicon hover:border-blue-500/60 transition-colors"
                    >
                        <Key className="text-blue-400 w-10 h-10" />
                    </motion.div>
                </div>

                {/* Security status badge */}
                <motion.div
                    initial={{ scale: 0.8, opacity: 0 }}
                    whileInView={{ scale: 1, opacity: 1 }}
                    transition={{ delay: 0.4 }}
                    className="mt-8 px-6 py-2 rounded-full border border-green-500/40 bg-green-500/10 text-green-300 text-xs font-semibold flex items-center gap-2"
                >
                    <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse"></div>
                    Secure Connection
                </motion.div>
            </div>
        </motion.div>
    )
}

export function OptimizationIllustration() {
    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
            className="relative border-2 border-blue-500/30 p-8 rounded-3xl backdrop-blur-sm min-h-[400px] flex items-center justify-center bg-gradient-to-br from-slate-900/80 to-slate-950/80 group hover:border-blue-500/50 transition-all duration-300"
        >
            <div className="absolute inset-0 overflow-hidden rounded-3xl pointer-events-none">
                <div className="absolute -bottom-1/2 -left-1/2 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl animate-pulse"></div>
            </div>

            <div className="w-full h-full flex flex-col items-center justify-center relative z-10">
                <div className="relative w-80 h-80 flex items-center justify-center">
                    {/* Outer ring */}
                    <div className="absolute inset-0 rounded-full border-4 border-slate-700 opacity-30"></div>

                    {/* Animated gradient ring */}
                    <div
                        className="absolute inset-0 rounded-full border-t-4 border-r-4 border-b-0 border-l-0 border-transparent animate-[spin_12s_linear_infinite]"
                        style={{ borderTopColor: "#3b82f6", borderRightColor: "#06b6d4" }}
                    ></div>

                    {/* Center content */}
                    <div className="absolute inset-0 flex items-center justify-center">
                        <div className="text-center z-10">
                            <TrendingUp className="mx-auto w-16 h-16 text-blue-400 mb-4 animate-bounce" />
                            <motion.div
                                initial={{ opacity: 0, y: 10 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.2 }}
                                className="text-4xl font-bold bg-gradient-to-r from-blue-400 to-blue-300 bg-clip-text text-transparent"
                            >
                                99.8%
                            </motion.div>
                            <div className="text-xs text-slate-400 uppercase tracking-widest mt-1 font-semibold">Accuracy</div>
                            <div className="text-[10px] text-slate-500 mt-2">Real-time Performance</div>
                        </div>
                    </div>

                    {/* Data node indicators */}
                    <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.5 }}
                        className="absolute -top-6 left-1/2 -translate-x-1/2 w-10 h-10 bg-gradient-to-br from-blue-500 to-blue-600 border-2 border-blue-400 rounded-lg flex items-center justify-center shadow-[0_0_15px_rgba(59,130,246,0.5)] animate-pulse"
                    >
                        <Database className="w-5 h-5 text-white" />
                    </motion.div>
                </div>
            </div>
        </motion.div>
    )
}
