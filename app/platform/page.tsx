import { Button } from "@/components/ui/button";
import { CheckCircle2, Lock, FileKey, TrendingUp, MessageSquare, Calendar } from "lucide-react";
import { ManagerAppIllustration, FeatureIllustration, SecurityIllustration, OptimizationIllustration } from "@/components/platform/PlatformGraphics";

export default function PlatformPage() {
    return (
        <div className="flex flex-col min-h-screen">
            {/* Hero */}
            <section className="bg-navy-900 pt-20 pb-40 text-white overflow-hidden relative">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,#1e293b_0%,#020617_100%)]"></div>
                <div className="relative max-w-7xl mx-auto px-6 text-center mb-16">
                    <h1 className="text-4xl md:text-6xl font-bold mb-6 tracking-tight mt-20">
                        The Flowmaster AI Agent Platform
                    </h1>
                    <p className="text-xl text-slate-400 max-w-3xl mx-auto">
                        Explore the powerful architecture and features of our enterprise-grade AI system.
                    </p>
                </div>
                <div className="relative max-w-6xl mx-auto px-4">
                    <ManagerAppIllustration />
                </div>
            </section>

            {/* Orchestration */}
            <section className="relative bg-background py-24 overflow-hidden">
                <div className="absolute inset-0 bg-[radial-gradient(circle,rgba(59,130,246,0.05)_1px,transparent_1px)] [background-size:40px_40px]"></div>
                <div className="max-w-7xl mx-auto px-6 relative">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center mb-40">
                        <div className="order-2 lg:order-1">
                            <div className="inline-flex items-center px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-500 text-xs font-bold mb-6 tracking-wider uppercase">
                                Core Intelligence
                            </div>
                            <h2 className="text-3xl md:text-4xl font-bold mb-6 tracking-tight text-foreground">Advanced Process Orchestration</h2>
                            <p className="text-lg text-slate-600 dark:text-slate-400 mb-8 leading-relaxed">
                                Import and manage existing processes via intuitive screens with full governance. Automate
                                repetitive tasks with high precision through our hierarchical workflow engine that maps complex
                                enterprise dependencies into executable logic.
                            </p>
                            <ul className="space-y-4">
                                <li className="flex items-start gap-3">
                                    <CheckCircle2 className="text-blue-500 w-5 h-5 mt-1" />
                                    <span className="text-slate-700 dark:text-slate-300">Visual mapping of cross-departmental flows</span>
                                </li>
                                <li className="flex items-start gap-3">
                                    <CheckCircle2 className="text-blue-500 w-5 h-5 mt-1" />
                                    <span className="text-slate-700 dark:text-slate-300">Real-time governance and policy enforcement</span>
                                </li>
                            </ul>
                        </div>
                        <div className="order-1 lg:order-2">
                            <FeatureIllustration />
                        </div>
                    </div>
                </div>
            </section>

            {/* Security */}
            <section className="py-24 bg-background border-t border-border">
                <div className="max-w-7xl mx-auto px-6">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center mb-40">
                        <div>
                            <SecurityIllustration />
                        </div>
                        <div>
                            <div className="inline-flex items-center px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-500 text-xs font-bold mb-6 tracking-wider uppercase">
                                Security Layer
                            </div>
                            <h2 className="text-3xl md:text-4xl font-bold mb-6 tracking-tight text-foreground">Secure AI Agent Framework</h2>
                            <p className="text-lg text-slate-600 dark:text-slate-400 mb-8 leading-relaxed">
                                A zero-trust architecture designed for enterprise-grade deployments. Every interaction is
                                validated, every piece of data is encrypted at rest and in transit.
                            </p>
                            <div className="grid grid-cols-2 gap-4">
                                <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-900 border border-border">
                                    <Lock className="text-blue-500 mb-2 w-6 h-6" />
                                    <div className="text-sm font-bold text-foreground">End-to-End Encryption</div>
                                </div>
                                <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-900 border border-border">
                                    <FileKey className="text-blue-500 mb-2 w-6 h-6" />
                                    <div className="text-sm font-bold text-foreground">RBAC Permissions</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Optimization */}
            <section className="py-24 bg-slate-50 dark:bg-slate-900/30 border-t border-border">
                <div className="max-w-7xl mx-auto px-6">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                        <div className="order-2 lg:order-1">
                            <div className="inline-flex items-center px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-500 text-xs font-bold mb-6 tracking-wider uppercase">
                                Optimization Loop
                            </div>
                            <h2 className="text-3xl md:text-4xl font-bold mb-6 tracking-tight text-foreground">Continuous Learning</h2>
                            <p className="text-lg text-slate-600 dark:text-slate-400 mb-8 leading-relaxed">
                                Agents aren't static. They continuously ingest manager feedback and operational data to refine
                                their cognitive models.
                            </p>
                            <div className="space-y-4">
                                <div className="flex items-center gap-4 p-4 rounded-xl border border-border bg-background group hover:border-blue-500/50 transition-colors">
                                    <div className="w-10 h-10 rounded-full bg-blue-500/10 flex items-center justify-center text-blue-500">
                                        <TrendingUp className="w-5 h-5" />
                                    </div>
                                    <div>
                                        <div className="font-bold text-foreground">Efficiency Scoring</div>
                                        <div className="text-xs text-slate-500">Benchmark performance against historical KPIs</div>
                                    </div>
                                </div>
                                <div className="flex items-center gap-4 p-4 rounded-xl border border-border bg-background group hover:border-blue-500/50 transition-colors">
                                    <div className="w-10 h-10 rounded-full bg-blue-500/10 flex items-center justify-center text-blue-500">
                                        <MessageSquare className="w-5 h-5" />
                                    </div>
                                    <div>
                                        <div className="font-bold text-foreground">Human-in-the-Loop</div>
                                        <div className="text-xs text-slate-500">Managers refine agent logic via direct feedback</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="order-1 lg:order-2">
                            <OptimizationIllustration />
                        </div>
                    </div>
                </div>
            </section>

            {/* CTA */}
            <section className="py-24 bg-background border-t border-border">
                <div className="max-w-7xl mx-auto px-6 text-center">
                    <div className="bg-slate-50 dark:bg-slate-900 p-10 rounded-3xl shadow-lg border border-border inline-block w-full max-w-4xl">
                        <h3 className="text-2xl font-bold mb-8 text-foreground">Ready to Dive Deeper?</h3>
                        <div className="flex flex-col sm:flex-row gap-4 justify-center px-4">
                            <Button className="h-14 px-8 text-lg font-bold bg-navy-900 text-white hover:bg-navy-800">
                                Schedule a Demo <Calendar className="ml-2 w-5 h-5" />
                            </Button>
                            <Button variant="outline" className="h-14 px-8 text-lg font-bold border-slate-300 dark:border-slate-700">
                                Read Documentation
                            </Button>
                        </div>
                    </div>
                </div>
            </section>

        </div>
    );
}
