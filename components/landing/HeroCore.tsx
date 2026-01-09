import { Monitor, Smartphone, Tablet, ShieldCheck, Settings, Brain } from "lucide-react";

export function HeroCore() {
    return (
        <div className="relative w-full max-w-[500px] aspect-square flex items-center justify-center">
            {/* Central Core */}
            <div className="z-20 w-32 h-32 rounded-full bg-navy-800 border-4 border-blue-500 flex items-center justify-center glow-effect agent-core-pulse">
                <div className="text-center flex flex-col items-center">
                    <ShieldCheck className="text-blue-300 w-10 h-10" />
                    <div className="text-[10px] uppercase font-bold tracking-widest mt-1 text-blue-100">AI Agent<br />Core</div>
                </div>
            </div>

            {/* Connection Lines (SVG) */}
            <svg className="absolute inset-0 w-full h-full z-10 opacity-60" viewBox="0 0 500 500">
                <path d="M120,100 Q200,100 250,250" fill="none" stroke="#3B82F6" strokeDasharray="4 4" strokeWidth="2"></path>
                <path d="M120,250 Q200,250 250,250" fill="none" stroke="#3B82F6" strokeDasharray="4 4" strokeWidth="2"></path>
                <path d="M120,400 Q200,400 250,250" fill="none" stroke="#3B82F6" strokeDasharray="4 4" strokeWidth="2"></path>
                <path d="M380,250 Q300,250 250,250" fill="none" stroke="#3B82F6" strokeDasharray="4 4" strokeWidth="2"></path>
                <path d="M350,150 Q420,150 420,250 Q420,350 350,350" fill="none" stroke="#3B82F6" strokeDasharray="4 4" strokeWidth="2"></path>
            </svg>

            {/* Nodes */}
            {/* Process Manager */}
            <div className="absolute top-[10%] left-[10%] text-center">
                <div className="bg-slate-800 p-3 rounded-lg border border-slate-700 mb-2 inline-flex">
                    <Monitor className="text-slate-400 w-8 h-8" />
                </div>
                <p className="text-[11px] font-bold text-slate-300 uppercase">Process Manager:<br />Import Processes</p>
            </div>

            {/* Manager App */}
            <div className="absolute top-[40%] left-[-5%] text-center">
                <div className="bg-slate-800 p-3 rounded-lg border border-slate-700 mb-2 inline-flex">
                    <Smartphone className="text-slate-400 w-8 h-8" />
                </div>
                <p className="text-[11px] font-bold text-slate-300 uppercase">Manager App:<br />Approve</p>
            </div>

            {/* Employee App */}
            <div className="absolute bottom-[10%] left-[10%] text-center">
                <div className="bg-slate-800 p-3 rounded-lg border border-slate-700 mb-2 inline-flex">
                    <Smartphone className="text-slate-400 w-8 h-8" />
                </div>
                <p className="text-[11px] font-bold text-slate-300 uppercase">Employee App:<br />Execute</p>
            </div>

            {/* Partner App */}
            <div className="absolute right-[5%] top-[40%] text-center">
                <div className="bg-slate-800 p-3 rounded-lg border border-slate-700 mb-2 inline-flex">
                    <Tablet className="text-slate-400 w-10 h-10" />
                </div>
                <p className="text-[11px] font-bold text-slate-300 uppercase">Partner/Customer App:<br />Collaborate</p>
            </div>

            {/* Self-Learning Agents */}
            <div className="absolute right-[-10%] top-[20%] text-center flex flex-col items-center">
                <Brain className="text-blue-400 w-8 h-8 mb-1" />
                <div className="flex justify-center space-x-1">
                    <Settings className="text-blue-300 w-3 h-3" />
                    <Settings className="text-blue-300 w-3 h-3" />
                </div>
                <p className="text-[11px] font-bold text-slate-300 uppercase mt-1">Self-Learning<br />Agents</p>
            </div>
        </div>
    );
}
