"use client";

import { useState } from "react";
import {
    Landmark, RadioTower, Zap, Wallet, Truck,
    UserPlus, FileText, Gavel, Banknote,
    CheckCircle2, ArrowRight, Lightbulb
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

// Shadcn Components (Ensure these are installed)
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {

    Globe, ShieldCheck, Activity,
    Server, Construction, ClipboardList
} from "lucide-react"
const industries = [
    { id: "banking", label: "Banking & Finance", icon: Landmark },
    { id: "telecom", label: "Telecom & Tech", icon: RadioTower },
    { id: "energy", label: "Energy & Utilities", icon: Zap },
    { id: "gov", label: "Government", icon: Wallet },
    { id: "logistics", label: "Logistics & Cargo", icon: Truck },
];
const solutionsData = {
    banking: [
        {
            topic: "Merchant Onboarding",
            issue: "Long onboarding cycles and manual KYC/KYB checks leading to poor audit readiness.",
            impact: "FlowMaster orchestrates end-to-end data intake, automated validation, and risk routing.",
            benefit: "Faster activation",
            icon: UserPlus
        },
        {
            topic: "Pricing & Deal Execution",
            issue: "Custom pricing errors and spreadsheet-based approvals causing revenue leakage.",
            impact: "Turns pricing into an executable process with enforced approval thresholds.",
            benefit: "Revenue protection",
            icon: Banknote
        },
        {
            topic: "Settlement & Reconciliation",
            issue: "Daily mismatches and manual investigations impacting merchant trust.",
            impact: "FlowMaster runs reconciliation as a managed process with AI-driven classification of anomalies.",
            benefit: "Scalable operations",
            icon: Gavel
        },
        {
            topic: "Regulatory Reporting",
            issue: "Ad-hoc data pulls and manual reporting causing stress during audits.",
            impact: "Reports are generated directly from execution logs, providing a clear audit trail.",
            benefit: "Reduced audit effort",
            icon: FileText
        },
        {
            topic: "Cross-Border Operations",
            issue: "Inconsistent execution and different rules per country locked in personal knowledge.",
            impact: "One logical process with country-specific rulesets while maintaining a single operational view.",
            benefit: "Faster market entry",
            icon: Globe
        },
        {
            topic: "Incident & Issue Resolution",
            issue: "Payment failures escalate manually with unclear ownership and a firefighting culture.",
            impact: "Coordinates capture, triage, and root cause analysis with automated resolution tracking.",
            benefit: "Clearer accountability",
            icon: Activity
        }
    ],
    logistics: [
        {
            topic: "Shipment Acceptance",
            issue: "Manual checks and inconsistent SLA compliance causing delays in handover.",
            impact: "Orchestrates booking verification and automated document validation.",
            benefit: "SLA Performance",
            icon: Truck
        },
        {
            topic: "Warehouse Operations",
            issue: "Manual location tracking and lost shipments due to inefficient space utilization.",
            impact: "Manages workflows for location assignment, movement tracking, and storage billing.",
            benefit: "Inventory visibility",
            icon: ClipboardList
        },
        {
            topic: "ULD Build-Up & Breakdown",
            issue: "Build plans received late and manual coordination leading to weight distribution errors.",
            impact: "Coordinates build-up as a managed process with automated constraint enforcement.",
            benefit: "Faster turnaround",
            icon: Zap
        },
        {
            topic: "Special Cargo Handling",
            issue: "Complex regulatory requirements and high-risk exposure for perishables.",
            impact: "Enforces handling instructions and temperature logging with AI-flagging of deviations.",
            benefit: "Cargo Integrity",
            icon: CheckCircle2
        },
        {
            topic: "Booking & Capacity",
            issue: "Fragmented capacity views and slow response times to agents and forwarders.",
            impact: "Orchestrates the booking workflow with real-time capacity and rate application.",
            benefit: "Optimized load factors",
            icon: Server
        },
        {
            topic: "Flight Irregularity",
            issue: "Manual rebooking during disruptions and slow communication to customers.",
            impact: "Structured recovery workflow with priority-based rebooking suggestions.",
            benefit: "Faster recovery",
            icon: RadioTower
        }
    ],
    telecom: [
        {
            topic: "Network Provisioning",
            issue: "Manual configuration of network assets leading to service activation delays.",
            impact: "Automated orchestration of hardware and software provisioning workflows.",
            benefit: "Rapid deployment",
            icon: RadioTower
        },
        {
            topic: "SLA Compliance Tracking",
            issue: "Difficulty in monitoring real-time performance against complex enterprise SLAs.",
            impact: "Continuous monitoring with automated alerts and penalty calculations.",
            benefit: "Contractual accuracy",
            icon: ShieldCheck
        }
    ],
    energy: [
        {
            topic: "Grid Maintenance",
            issue: "Reactive maintenance schedules leading to avoidable power outages.",
            impact: "Predictive maintenance workflows triggered by AI sensor data analysis.",
            benefit: "Enhanced uptime",
            icon: Zap
        },
        {
            topic: "Renewable Integration",
            issue: "Variable power inputs causing instability in legacy grid management systems.",
            impact: "Orchestrates dynamic load balancing between traditional and renewable sources.",
            benefit: "Grid stability",
            icon: Activity
        }
    ],
    gov: [
        {
            topic: "Permit Processing",
            issue: "Massive backlogs and fragmented documentation across various agencies.",
            impact: "Unified digital workflow for intake, cross-agency review, and automated approval.",
            benefit: "Reduced wait times",
            icon: FileText
        },
        {
            topic: "Public Safety Response",
            issue: "Siloed communication during emergency incidents hindering coordination.",
            impact: "FlowMaster acts as an Ops Control Tower for multi-agency emergency response.",
            benefit: "Calmer operations",
            icon: ShieldCheck
        }
    ]
};

export default function SolutionsPage() {
    const [activeTab, setActiveTab] = useState("banking");

    return (
        <div className="flex flex-col min-h-screen bg-slate-50 dark:bg-[#020617]">
            {/* Hero Section */}
            <section className="relative overflow-hidden bg-navy-900 pt-20 pb-24 md:pt-32 md:pb-40 text-center px-6">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,#1e293b_0%,#020617_100%)]"></div>
                <div className="max-w-4xl mx-auto relative z-10">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                    >
                        <h1 className="text-3xl sm:text-4xl md:text-6xl font-bold text-white mb-6 leading-tight tracking-tight">
                            AI Solutions for Every Industry:<br className="hidden sm:block" />
                            <span className="text-blue-400">Advanced FlowMaster Intelligence.</span>
                        </h1>
                        <p className="text-slate-300 text-base md:text-xl max-w-2xl mx-auto leading-relaxed">
                            Deep vertical expertise powered by enterprise-grade AI agents. Discover how we solve mission-critical
                            challenges with automated high-tech workflows.
                        </p>
                    </motion.div>
                </div>
            </section>

            {/* Main Content */}
            <main className="max-w-7xl mx-auto px-4 sm:px-6 -mt-8 md:-mt-20 mb-24 z-10 w-full relative">
                <Tabs defaultValue="banking" className="w-full" onValueChange={setActiveTab}>

                    {/* Tabs Navigation */}
                    <div className="flex justify-center mb-8 md:mb-12">
                        <TabsList className="h-auto p-1.5 md:p-2 bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl border border-white/10 shadow-2xl rounded-2xl w-full max-w-4xl flex overflow-x-auto scrollbar-hide justify-start md:justify-center">
                            {industries.map((ind) => (
                                <TabsTrigger
                                    key={ind.id}
                                    value={ind.id}
                                    className="rounded-xl cursor-pointer px-4 md:px-6 py-2.5 md:py-3 data-[state=active]:bg-navy-900 data-[state=active]:text-white flex items-center gap-2 transition-all whitespace-nowrap text-sm font-semibold hover:bg-slate-100 dark:hover:bg-slate-800 data-[state=active]:shadow-lg"
                                >
                                    <ind.icon className="w-4 h-4" />
                                    <span>{ind.label}</span>
                                </TabsTrigger>
                            ))}
                        </TabsList>
                    </div>

                    {/* Tab Content Area */}
                    <AnimatePresence mode="wait">
                        <TabsContent value={activeTab} key={activeTab} className="mt-0 outline-none">
                            <motion.div
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -10 }}
                                transition={{ duration: 0.3 }}
                            >
                                {solutionsData[activeTab as keyof typeof solutionsData]?.length > 0 ? (
                                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                        {solutionsData[activeTab as keyof typeof solutionsData].map((item, idx) => (
                                            <Card key={idx} className="group border-none shadow-xl hover:shadow-2xl transition-all duration-500 dark:bg-slate-900/40 backdrop-blur-md dark:border dark:border-white/5 hover:translate-y-[-4px]">
                                                <CardHeader className="pb-4">
                                                    <div className="w-14 h-14 rounded-2xl bg-blue-500/10 flex items-center justify-center mb-6 group-hover:bg-blue-600 group-hover:scale-110 transition-all duration-500 shadow-inner">
                                                        <item.icon className="w-7 h-7 text-blue-500 group-hover:text-white transition-colors duration-500" />
                                                    </div>
                                                    <CardTitle className="text-xl md:text-2xl font-bold tracking-tight text-slate-900 dark:text-white">{item.topic}</CardTitle>
                                                    <Badge variant="secondary" className="w-fit mt-3 bg-blue-500/5 dark:bg-blue-500/10 text-blue-600 dark:text-blue-400 border border-blue-500/20 px-3 py-1 rounded-full text-[11px] font-bold uppercase tracking-wider">
                                                        {item.benefit}
                                                    </Badge>
                                                </CardHeader>
                                                <CardContent className="space-y-6 pt-2">
                                                    <div className="space-y-2">
                                                        <div className="flex items-center gap-2">
                                                            <div className="w-1 h-3 bg-slate-300 dark:bg-slate-700 rounded-full"></div>
                                                            <p className="text-[10px] font-extrabold uppercase tracking-widest text-slate-400">The Challenge</p>
                                                        </div>
                                                        <p className="text-sm md:text-base text-slate-600 dark:text-slate-400 leading-relaxed font-medium">
                                                            {item.issue}
                                                        </p>
                                                    </div>
                                                    <div className="pt-6 border-t border-slate-100 dark:border-white/5 space-y-2">
                                                        <div className="flex items-center gap-2">
                                                            <div className="w-1 h-3 bg-blue-500 rounded-full shadow-[0_0_8px_rgba(59,130,246,0.5)]"></div>
                                                            <p className="text-[10px] font-extrabold uppercase tracking-widest text-blue-500">FlowMaster Solution</p>
                                                        </div>
                                                        <p className="text-sm md:text-base text-slate-700 dark:text-slate-300 leading-relaxed font-semibold">
                                                            {item.impact}
                                                        </p>
                                                    </div>
                                                </CardContent>
                                            </Card>
                                        ))}
                                    </div>
                                ) : (
                                    <Card className="py-24 md:py-32 text-center bg-white/40 dark:bg-slate-900/20 backdrop-blur-sm border-dashed border-2 border-slate-200 dark:border-slate-800 rounded-[2rem]">
                                        <div className="flex flex-col items-center">
                                            <div className="p-6 rounded-full bg-slate-50 dark:bg-slate-900/50 mb-6 shadow-inner">
                                                <Lightbulb className="w-12 h-12 text-slate-300 dark:text-slate-600 animate-pulse" />
                                            </div>
                                            <h3 className="text-2xl font-bold text-slate-400 dark:text-slate-500">Industry Module: Pending</h3>
                                            <p className="text-slate-400 dark:text-slate-500 max-w-sm mx-auto mt-3 text-lg">
                                                We are currently mapping high-impact AI agents for the <span className="text-slate-500 dark:text-slate-400 font-bold">{industries.find(i => i.id === activeTab)?.label}</span> sector.
                                            </p>
                                        </div>
                                    </Card>
                                )}
                            </motion.div>
                        </TabsContent>
                    </AnimatePresence>
                </Tabs>
            </main>
        </div>
    );
}
