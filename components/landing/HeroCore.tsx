// import { Monitor, Smartphone, Tablet, ShieldCheck, Settings, Brain } from "lucide-react";

// export function HeroCore() {
//     return (
//         <div className="relative w-full max-w-[500px] aspect-square flex items-center justify-center">
//             {/* Central Core */}
//             <div className="z-20 w-32 h-32 rounded-full bg-navy-800 border-4 border-blue-500 flex items-center justify-center glow-effect agent-core-pulse">
//                 <div className="text-center flex flex-col items-center">
//                     <ShieldCheck className="text-blue-300 w-10 h-10" />
//                     <div className="text-[10px] uppercase font-bold tracking-widest mt-1 text-blue-100">AI Agent<br />Core</div>
//                 </div>
//             </div>

//             {/* Connection Lines (SVG) */}
//             <svg className="absolute inset-0 w-full h-full z-10 opacity-60" viewBox="0 0 500 500">
//                 <path d="M120,100 Q200,100 250,250" fill="none" stroke="#3B82F6" strokeDasharray="4 4" strokeWidth="2"></path>
//                 <path d="M120,250 Q200,250 250,250" fill="none" stroke="#3B82F6" strokeDasharray="4 4" strokeWidth="2"></path>
//                 <path d="M120,400 Q200,400 250,250" fill="none" stroke="#3B82F6" strokeDasharray="4 4" strokeWidth="2"></path>
//                 <path d="M380,250 Q300,250 250,250" fill="none" stroke="#3B82F6" strokeDasharray="4 4" strokeWidth="2"></path>
//                 <path d="M350,150 Q420,150 420,250 Q420,350 350,350" fill="none" stroke="#3B82F6" strokeDasharray="4 4" strokeWidth="2"></path>
//             </svg>

//             {/* Nodes */}
//             {/* Process Manager */}
//             <div className="absolute top-[10%] left-[10%] text-center">
//                 <div className="bg-slate-800 p-3 rounded-lg border border-slate-700 mb-2 inline-flex">
//                     <Monitor className="text-slate-400 w-8 h-8" />
//                 </div>
//                 <p className="text-[11px] font-bold text-slate-300 uppercase">Process Manager:<br />Import Processes</p>
//             </div>

//             {/* Manager App */}
//             <div className="absolute top-[40%] left-[-5%] text-center">
//                 <div className="bg-slate-800 p-3 rounded-lg border border-slate-700 mb-2 inline-flex">
//                     <Smartphone className="text-slate-400 w-8 h-8" />
//                 </div>
//                 <p className="text-[11px] font-bold text-slate-300 uppercase">Manager App:<br />Approve</p>
//             </div>

//             {/* Employee App */}
//             <div className="absolute bottom-[10%] left-[10%] text-center">
//                 <div className="bg-slate-800 p-3 rounded-lg border border-slate-700 mb-2 inline-flex">
//                     <Smartphone className="text-slate-400 w-8 h-8" />
//                 </div>
//                 <p className="text-[11px] font-bold text-slate-300 uppercase">Employee App:<br />Execute</p>
//             </div>

//             {/* Partner App */}
//             <div className="absolute right-[5%] top-[40%] text-center">
//                 <div className="bg-slate-800 p-3 rounded-lg border border-slate-700 mb-2 inline-flex">
//                     <Tablet className="text-slate-400 w-10 h-10" />
//                 </div>
//                 <p className="text-[11px] font-bold text-slate-300 uppercase">Partner/Customer App:<br />Collaborate</p>
//             </div>

//             {/* Self-Learning Agents */}
//             <div className="absolute right-[-10%] top-[20%] text-center flex flex-col items-center">
//                 <Brain className="text-blue-400 w-8 h-8 mb-1" />
//                 <div className="flex justify-center space-x-1">
//                     <Settings className="text-blue-300 w-3 h-3" />
//                     <Settings className="text-blue-300 w-3 h-3" />
//                 </div>
//                 <p className="text-[11px] font-bold text-slate-300 uppercase mt-1">Self-Learning<br />Agents</p>
//             </div>
//         </div>
//     );
// }
import React from "react";
import {
    ShieldCheck,
    Brain,
    Database,
    Workflow,
    Share2,
    Boxes,
    Settings
} from "lucide-react";

export function HeroCore() {
    return (
        <div className="relative w-full max-w-[600px] aspect-square flex items-center justify-center mx-auto overflow-visible">
            {/* Central FlowMaster SDX Core */}
            <div className="z-30 w-24 h-24 sm:w-32 sm:h-32 rounded-full bg-slate-900 border-4 border-blue-500 flex items-center justify-center shadow-[0_0_30px_rgba(59,130,246,0.5)] animate-pulse">
                <div className="text-center flex flex-col items-center p-2">
                    <ShieldCheck className="text-blue-400 w-8 h-8 sm:w-10 sm:h-10 mb-1" />
                    <div className="text-[8px] sm:text-[10px] uppercase font-black tracking-tighter sm:tracking-widest text-blue-100 leading-tight">
                        FlowMaster<br />SDX Protocol
                    </div>
                </div>
            </div>

            {/* Connection Lines (Converging at 250,250) */}
            <svg className="absolute inset-0 w-full h-full z-10 opacity-40 pointer-events-none" viewBox="0 0 500 500">
                {/* SDX Data to Core */}
                <path d="M100,100 L250,250" fill="none" stroke="#60A5FA" strokeDasharray="6 4" strokeWidth="2" />
                {/* SDX Tools to Core */}
                <path d="M80,250 L250,250" fill="none" stroke="#60A5FA" strokeDasharray="6 4" strokeWidth="2" />
                {/* SDX Processes to Core */}
                <path d="M100,400 L250,250" fill="none" stroke="#60A5FA" strokeDasharray="6 4" strokeWidth="2" />
                {/* Cross-Org Transactions to Core */}
                <path d="M400,250 L250,250" fill="none" stroke="#60A5FA" strokeDasharray="6 4" strokeWidth="2" />
                {/* Agent Learning Curve */}
                <path d="M380,120 Q450,150 450,250 Q450,350 380,380" fill="none" stroke="#3B82F6" strokeDasharray="4 4" strokeWidth="2" />
            </svg>

            {/* SDX Nodes */}

            {/* TOP LEFT: Self-Declared Data */}
            <div className="absolute top-[5%] left-[5%] text-center z-20 group">
                <div className="bg-slate-900/80 p-2 sm:p-3 rounded-xl border border-blue-500/30 mb-2 inline-flex shadow-lg group-hover:border-blue-400 transition-colors">
                    <Database className="text-blue-400 w-6 h-6 sm:w-8 sm:h-8" />
                </div>
                <p className="text-[9px] sm:text-[11px] font-bold text-slate-300 uppercase leading-none">
                    SDX Data:<br /><span className="text-blue-400 text-[8px] sm:text-[10px]">ERP / CRM / HCM</span>
                </p>
            </div>

            {/* MID LEFT: Self-Declared Tools */}
            <div className="absolute top-[45%] left-[-2%] text-center z-20 group">
                <div className="bg-slate-900/80 p-2 sm:p-3 rounded-xl border border-slate-700 mb-2 inline-flex group-hover:bg-slate-800 transition-all">
                    <Boxes className="text-slate-400 w-6 h-6 sm:w-8 sm:h-8" />
                </div>
                <p className="text-[9px] sm:text-[11px] font-bold text-slate-400 uppercase leading-none">
                    SDX Tools:<br /><span className="text-white text-[8px] sm:text-[10px]">Microservices</span>
                </p>
            </div>

            {/* BOTTOM LEFT: Self-Declared Processes */}
            <div className="absolute bottom-[5%] left-[5%] text-center z-20 group">
                <div className="bg-slate-900/80 p-2 sm:p-3 rounded-xl border border-slate-700 mb-2 inline-flex group-hover:scale-105 transition-transform">
                    <Workflow className="text-slate-400 w-6 h-6 sm:w-8 sm:h-8" />
                </div>
                <p className="text-[9px] sm:text-[11px] font-bold text-slate-400 uppercase leading-none">
                    SDX Processes:<br /><span className="text-white text-[8px] sm:text-[10px]">Execution Nodes</span>
                </p>
            </div>

            {/* MID RIGHT: Cross-Org Transactions */}
            <div className="absolute right-[2%] top-[45%] text-center z-20 group">
                <div className="bg-slate-900/80 p-2 sm:p-3 rounded-xl border border-blue-500/30 mb-2 inline-flex group-hover:shadow-[0_0_15px_rgba(59,130,246,0.3)] transition-all">
                    <Share2 className="text-blue-400 w-7 h-7 sm:w-9 sm:h-9" />
                </div>
                <p className="text-[9px] sm:text-[11px] font-bold text-slate-300 uppercase leading-none">
                    Transactions:<br /><span className="text-blue-400 text-[8px] sm:text-[10px]">Cross-Org Partners</span>
                </p>
            </div>

            {/* TOP RIGHT: SDX Agents & Learning */}
            <div className="absolute right-[5%] top-[10%] text-center z-20 flex flex-col items-center">
                <div className="relative">
                    <Brain className="text-blue-400 w-8 h-8 sm:w-10 sm:h-10 mb-1 animate-bounce" />
                    <div className="absolute -bottom-1 flex justify-center w-full space-x-1">
                        <Settings className="text-blue-300 w-2 h-2 sm:w-3 sm:h-3 animate-spin" />
                        <Settings className="text-blue-300 w-2 h-2 sm:w-3 sm:h-3 animate-spin-slow" />
                    </div>
                </div>
                <p className="text-[9px] sm:text-[11px] font-bold text-slate-300 uppercase mt-2 leading-none">
                    SDX Agents:<br /><span className="text-blue-300 text-[8px] sm:text-[10px]">Agent Learning</span>
                </p>
            </div>
        </div>
    );
}