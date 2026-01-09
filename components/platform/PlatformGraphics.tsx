import { Monitor, Smartphone, Tablet, Server, RefreshCw, Key, Shield, Database, Activity, TrendingUp, MessageSquare } from "lucide-react";

export function ManagerAppIllustration() {
    return (
        <div className="grid grid-cols-12 items-center gap-4 text-white">
            <div className="col-span-2 flex flex-col items-center">
                <div className="w-20 h-16 bg-slate-800 rounded-lg flex items-center justify-center border border-slate-700 mb-2">
                    <Monitor className="text-slate-400" />
                </div>
                <p className="text-xs text-slate-400 font-medium">Manager App</p>
            </div>
            <div className="col-span-3">
                <div className="bg-slate-800/50 p-6 rounded-xl border border-slate-700 text-center h-32 flex flex-col justify-center">
                    <h3 className="text-xs md:text-sm font-bold mb-1">Process Ingestion & Governance</h3>
                    <div className="w-full h-0.5 bg-slate-700 mt-2 relative overflow-hidden">
                        <div className="absolute inset-0 bg-blue-500 w-1/2 opacity-50"></div>
                    </div>
                </div>
            </div>
            <div className="col-span-4 px-2">
                <div className="glow-effect bg-slate-900/80 p-6 rounded-xl relative z-10 border border-blue-500/30">
                    <div className="space-y-3">
                        <div className="bg-slate-800 p-2 text-center text-xs font-bold rounded border border-slate-700">AI Agent Core</div>
                        <div className="bg-slate-800/50 p-2 text-center text-xs rounded border border-slate-700">Cognitive Engine</div>
                        <div className="bg-slate-800/50 p-2 text-center text-xs rounded border border-slate-700">Knowledge Graph</div>
                    </div>
                </div>
            </div>
            <div className="col-span-3">
                <div className="bg-slate-800/50 p-6 rounded-xl border border-slate-700 text-center h-32 flex flex-col justify-center mb-4">
                    <h3 className="text-xs md:text-sm font-bold">Execution Layer</h3>
                </div>
                <div className="flex justify-around items-center">
                    <div className="flex flex-col items-center">
                        <Smartphone className="text-slate-500 w-5 h-5" />
                        <span className="text-[10px] text-slate-500">Employee</span>
                    </div>
                    <div className="flex flex-col items-center">
                        <Tablet className="text-slate-500 w-5 h-5" />
                        <span className="text-[10px] text-slate-500">Partner</span>
                    </div>
                    <div className="flex flex-col items-center">
                        <Server className="text-slate-500 w-5 h-5" />
                        <span className="text-[10px] text-slate-500">Core</span>
                    </div>
                </div>
            </div>
        </div>
    );
}

export function FeatureIllustration() {
    return (
        <div className="relative border border-border p-8 rounded-3xl backdrop-blur-sm min-h-[400px] flex items-center justify-center bg-background/50">
            <div className="w-full h-full flex flex-col items-center justify-center space-y-4">
                <div className="relative w-64 h-64">
                    <div className="absolute inset-0 border border-blue-500/30 rounded-lg rotate-45"></div>
                    <div className="absolute inset-4 border-2 border-blue-500/50 rounded-full flex items-center justify-center">
                        <Activity className="w-16 h-16 text-blue-500" />
                    </div>
                    <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3 h-3 bg-blue-500 rounded-full shadow-[0_0_10px_rgba(59,130,246,0.8)]"></div>
                    <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-3 h-3 bg-blue-500 rounded-full shadow-[0_0_10px_rgba(59,130,246,0.8)]"></div>
                    <div className="absolute left-0 top-1/2 -translate-y-1/2 w-3 h-3 bg-blue-500 rounded-full shadow-[0_0_10px_rgba(59,130,246,0.8)]"></div>
                    <div className="absolute right-0 top-1/2 -translate-y-1/2 w-3 h-3 bg-blue-500 rounded-full shadow-[0_0_10px_rgba(59,130,246,0.8)]"></div>
                </div>
                <div className="flex gap-4">
                    <div className="w-12 h-1 bg-slate-300 dark:bg-slate-700 rounded-full"></div>
                    <div className="w-12 h-1 bg-blue-500 rounded-full"></div>
                    <div className="w-12 h-1 bg-slate-300 dark:bg-slate-700 rounded-full"></div>
                </div>
            </div>
        </div>
    )
}

export function SecurityIllustration() {
    return (
        <div className="relative border border-border p-8 rounded-3xl backdrop-blur-sm min-h-[400px] flex items-center justify-center bg-background/50">
            <div className="w-full h-full flex flex-col items-center justify-center space-y-4">
                <div className="relative w-72 h-56 flex items-center justify-center">
                    <div className="absolute inset-0 border border-border rounded-xl overflow-hidden bg-background">
                        <div className="h-6 bg-slate-100 dark:bg-slate-800 border-b border-border px-2 flex items-center gap-1">
                            <div className="w-2 h-2 rounded-full bg-red-400"></div>
                            <div className="w-2 h-2 rounded-full bg-yellow-400"></div>
                            <div className="w-2 h-2 rounded-full bg-green-400"></div>
                        </div>
                    </div>
                    <div className="relative z-10 flex flex-col items-center">
                        <Shield className="w-16 h-16 text-blue-500 mb-4" />
                        <div className="text-[10px] font-mono text-slate-400">ENCRYPTED_TUNNEL: ACTIVE</div>
                    </div>
                    <div className="absolute -bottom-4 -right-4 w-24 h-24 border border-blue-500/20 rounded-full bg-blue-500/5 backdrop-blur flex items-center justify-center">
                        <Key className="text-blue-500 w-8 h-8" />
                    </div>
                </div>
            </div>
        </div>
    )
}

export function OptimizationIllustration() {
    return (
        <div className="relative border border-border p-8 rounded-3xl backdrop-blur-sm min-h-[400px] flex items-center justify-center bg-background/50">
            <div className="w-full h-full flex flex-col items-center justify-center">
                <div className="relative w-64 h-64">
                    <div className="absolute inset-0 rounded-full border-4 border-slate-100 dark:border-slate-800"></div>
                    <div className="absolute inset-0 rounded-full border-t-4 border-blue-500 animate-[spin_10s_linear_infinite]"></div>
                    <div className="absolute inset-0 flex items-center justify-center">
                        <div className="text-center">
                            <TrendingUp className="mx-auto w-12 h-12 text-blue-500 mb-2" />
                            <div className="text-2xl font-bold text-blue-500">99.8%</div>
                            <div className="text-[10px] text-slate-500 uppercase tracking-widest">Accuracy</div>
                        </div>
                    </div>
                    <div className="absolute -top-4 left-1/2 w-8 h-8 bg-background border border-blue-500/40 rounded-lg flex items-center justify-center shadow-lg">
                        <Database className="w-4 h-4 text-blue-500" />
                    </div>
                </div>
            </div>
        </div>
    )
}

