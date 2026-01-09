"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
    Landmark, RadioTower, Zap, Wallet, Truck,
    UserPlus, FileText, Gavel, Banknote,
    CheckCircle2, ArrowRight
} from "lucide-react";
import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "framer-motion";

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
            topic: "Merchant Onboarding & Compliance Orchestration",
            issue: "Long onboarding cycles; manual KYC/KYB checks; multiple handoffs between sales, risk, compliance, ops; inconsistent decisions; poor audit readiness.",
            impact: "FlowMaster orchestrates the full onboarding process end-to-end: intake of merchant data and documents, automated validation and enrichment, routing to risk/compliance agents, human-in-the-loop exceptions, and final activation. Rules and checks are explicit, versioned, and logged. Every decision has a trace.",
            benefit: "Faster merchant activation, predictable onboarding, reduced compliance friction, regulator-ready audit trail",
            icon: UserPlus
        },
        {
            topic: "Pricing, Fee Configuration & Deal Execution",
            issue: "Custom pricing per merchant; errors between sales promises and ops configuration; spreadsheet-based approvals; pricing leakage; slow turnaround.",
            impact: "FlowMaster turns pricing into an executable process: price request → validation → approvals → automatic configuration across systems. Constraints, approval thresholds, and exceptions are enforced centrally. What sales sells is exactly what ops configures.",
            benefit: "Revenue protection, faster deal closure, fewer disputes, higher commercial discipline",
            icon: Banknote
        },
        {
            topic: "Settlement, Reconciliation & Exception Handling",
            issue: "Daily reconciliation mismatches; manual investigations; ops-heavy exception handling; slow resolution impacts merchant trust.",
            impact: "FlowMaster runs reconciliation as a managed process: ingestion of settlement data, automated matching, AI-driven classification of exceptions, routing to the right owner, and closure tracking. Humans focus only on true anomalies.",
            benefit: "Lower ops load, faster issue resolution, higher merchant trust, scalable operations",
            icon: Gavel
        },
        {
            topic: "Regulatory Reporting & Audit Preparation",
            issue: "Ad-hoc data pulls; repeated manual reporting; stress during audits; fragmented evidence across systems.",
            impact: "Because FlowMaster executes the processes, it already has the evidence. Reports are generated from execution logs: who approved what, when, and under which rule set. No “audit scramble.”",
            benefit: "Reduced audit effort, lower regulatory risk, predictable compliance",
            icon: FileText
        },
        {
            topic: "Cross-Border / Multi-Market Operations",
            issue: "Different rules per country; partner-specific processes; inconsistent execution; knowledge locked in people.",
            impact: "FlowMaster runs one logical process with country- and partner-specific rulesets. Agents adapt execution based on geography while management retains a single operational view.",
            benefit: "Faster market entry, consistent execution, easier scaling",
            icon: Landmark
        },
        {
            topic: "Incident & Issue Resolution (Ops Control Tower)",
            issue: "Payment failures escalate manually; unclear ownership; repeat incidents; firefighting culture.",
            impact: "FlowMaster coordinates incident handling: capture → triage → root cause analysis → resolution → preventive action. Patterns are detected and fed back into process rules.",
            benefit: "Fewer repeat incidents, clearer accountability, calmer ops",
            icon: CheckCircle2
        }
    ],
    logistics: [
        {
            topic: "Shipment Acceptance & Check-In",
            issue: "Manual acceptance checks; inconsistent SLA compliance; paper-based documentation; delays in handover from forwarders; errors in weight and dimension capture.",
            impact: "FlowMaster orchestrates acceptance end-to-end: booking verification, document validation, weight/dimension capture, dangerous goods checks, and handoff confirmation. Rules for acceptance criteria and SLA thresholds are enforced automatically with full traceability.",
            benefit: "Faster acceptance, consistent SLA performance, reduced errors, airline-ready audit trail",
            icon: Truck
        },
        {
            topic: "Warehouse Operations & Storage Management",
            issue: "Manual location tracking; lost or misplaced shipments; inefficient space utilization; no visibility on storage charges; temperature excursions go undetected.",
            impact: "FlowMaster manages warehouse workflows: location assignment, movement tracking, storage billing triggers, temperature monitoring alerts, and retrieval sequencing. Every move is logged and exceptions are routed for immediate action.",
            benefit: "Real-time inventory visibility, optimized space usage, accurate billing, reduced cargo loss",
            icon: RadioTower
        },
        {
            topic: "ULD Build-Up & Breakdown",
            issue: "Build plans received late; manual coordination between teams; weight distribution errors; ULD damage goes unreported; breakdown delays impact connections.",
            impact: "FlowMaster coordinates build-up/breakdown as managed processes: plan ingestion, task assignment, weight validation, damage reporting, and completion confirmation. Constraints for aircraft type and special cargo are enforced automatically.",
            benefit: "Faster turnaround, safer builds, reduced ULD damage, on-time flight departures",
            icon: Zap
        },
        {
            topic: "Ramp Handling & Aircraft Loading",
            issue: "Miscommunication between warehouse and ramp; last-minute load changes; weight and balance discrepancies; missed offload items; manual paperwork.",
            impact: "FlowMaster runs ramp operations as a structured workflow: load instruction receipt, cart sequencing, loading confirmation, discrepancy capture, and final manifest reconciliation. Real-time updates flow between warehouse, ramp, and flight ops.",
            benefit: "Smoother aircraft turns, fewer discrepancies, accurate manifests, reduced delays",
            icon: Truck
        },
        {
            topic: "Special Cargo Handling (DGR, PER, Pharma)",
            issue: "Complex regulatory requirements; manual compliance checks; temperature chain breaks; inadequate documentation; high-risk exposure for perishables and live animals.",
            impact: "FlowMaster orchestrates special cargo workflows: certification verification, handling instruction enforcement, temperature logging, milestone tracking, and compliance reporting. AI agents flag deviations while humans make critical decisions.",
            benefit: "Regulatory compliance, protected cargo integrity, reduced claims, airline confidence",
            icon: CheckCircle2
        },
        {
            topic: "SLA Monitoring & Airline Reporting",
            issue: "Manual KPI tracking; disputes over service failures; delayed invoicing; no real-time performance visibility; reactive issue management.",
            impact: "FlowMaster captures SLA performance from execution: milestone timestamps, exception counts, root cause tagging, and automated report generation. Dashboards show real-time status while historical data supports contract reviews.",
            benefit: "Transparent performance, faster dispute resolution, accurate invoicing, proactive improvement",
            icon: FileText
        },
        {
            topic: "Booking & Capacity Management",
            issue: "Manual booking processes; fragmented capacity views across routes; overbooking or under-utilization; slow response to agents and forwarders; no real-time availability.",
            impact: "FlowMaster orchestrates the booking workflow end-to-end: request intake, capacity validation, rate application, automatic confirmations, and allotment management. Rules for priority customers, embargo restrictions, and dynamic pricing are enforced centrally.",
            benefit: "Faster booking confirmations, optimized load factors, reduced revenue leakage, better agent experience",
            icon: UserPlus
        },
        {
            topic: "AWB Processing & Documentation",
            issue: "Manual air waybill entry; data errors between systems; customs documentation delays; compliance gaps; scattered document management.",
            impact: "FlowMaster manages AWB lifecycle: data capture and validation, automated enrichment from master data, customs pre-filing, document generation, and handoff to handling agents. Every step is logged and traceable.",
            benefit: "Reduced data errors, faster document turnaround, customs compliance, complete audit trail",
            icon: FileText
        },
        {
            topic: "ULD Planning & Build-Up Coordination",
            issue: "Suboptimal ULD utilization; last-minute build changes; disconnects between warehouse and ramp; manual weight and balance coordination; planning done in spreadsheets.",
            impact: "FlowMaster coordinates ULD planning as a managed process: shipment allocation, build-up sequencing, weight distribution validation, and real-time updates to operations. Constraints and safety rules are enforced automatically.",
            benefit: "Higher ULD utilization, fewer last-minute changes, safer load planning, smoother ground operations",
            icon: Zap
        },
        {
            topic: "Flight Irregularity & Recovery",
            issue: "Manual rebooking during disruptions; unclear shipment priorities; slow communication to customers; no systematic recovery process; firefighting culture.",
            impact: "FlowMaster runs disruption handling as a structured workflow: impact assessment, priority-based rebooking, customer notifications, and recovery tracking. AI agents suggest optimal recovery options while humans approve critical decisions.",
            benefit: "Faster recovery, protected priority shipments, proactive customer communication, calmer operations",
            icon: RadioTower
        },
        {
            topic: "Revenue Accounting & Interline Settlement",
            issue: "Complex proration calculations; disputes with interline partners; manual reconciliation of CASS/CNS data; revenue recognition delays; audit findings.",
            impact: "FlowMaster executes revenue processes: AWB rating validation, proration calculation, interline billing, exception handling, and settlement reconciliation. Discrepancies are flagged and routed for resolution automatically.",
            benefit: "Accurate revenue recognition, faster interline settlement, fewer disputes, audit-ready records",
            icon: Banknote
        },
        {
            topic: "Regulatory Compliance & Security Screening",
            issue: "Evolving security regulations across markets; manual screening record-keeping; ACC3/RA3 compliance burden; fragmented known shipper databases; audit stress.",
            impact: "FlowMaster orchestrates compliance workflows: shipper validation, screening method selection, record generation, and regulatory reporting. Country-specific rules are applied automatically while maintaining a single operational view.",
            benefit: "Consistent compliance, reduced regulatory risk, streamlined audits, faster market entry",
            icon: Gavel
        }
    ],
    telecom: [],
    energy: [],
    gov: []
};

export default function SolutionsPage() {
    const [activeTab, setActiveTab] = useState("banking");

    return (
        <div className="flex flex-col min-h-screen">
            {/* Hero */}
            <section className="bg-navy-900 pt-24 pb-32 text-center px-6 relative overflow-hidden">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,#1e293b_0%,#020617_100%)]"></div>
                <div className="max-w-4xl mx-auto relative z-10">
                    <h1 className="text-4xl md:text-5xl font-bold text-white mb-6 leading-tight">
                        AI Solutions for Every Industry:<br />
                        <span className="text-blue-400">Advanced FlowMaster Intelligence.</span>
                    </h1>
                    <p className="text-slate-300 text-lg max-w-2xl mx-auto">
                        Deep vertical expertise powered by enterprise-grade AI agents. Discover how we solve mission-critical
                        challenges with automated high-tech workflows.
                    </p>
                </div>
            </section>

            {/* Content Tabs */}
            <main className="max-w-7xl mx-auto px-6 -mt-16 mb-24 z-10 relative">
                <div className="bg-background rounded-xl shadow-2xl border border-border overflow-hidden flex flex-col md:flex-row min-h-[800px]">
                    <aside className="w-full md:w-72 border-r border-border bg-slate-50 dark:bg-slate-900/50">
                        <div className="p-6 border-b border-border">
                            <h2 className="text-xs font-bold text-slate-400 uppercase tracking-widest">Industry Segments</h2>
                        </div>
                        <nav className="flex flex-col">
                            {industries.map((ind) => (
                                <button
                                    key={ind.id}
                                    onClick={() => setActiveTab(ind.id)}
                                    className={cn(
                                        "flex items-center gap-4 px-6 py-5 text-left font-semibold transition-all border-l-4",
                                        activeTab === ind.id
                                            ? "bg-navy-900 text-white border-blue-500"
                                            : "text-slate-500 border-transparent hover:bg-slate-100 dark:hover:bg-slate-800"
                                    )}
                                >
                                    <ind.icon className="w-5 h-5" />
                                    <span>{ind.label}</span>
                                </button>
                            ))}
                        </nav>
                    </aside>

                    <div className="flex-1 flex flex-col bg-background">
                        <div className="p-8 border-b border-border flex items-center justify-between">
                            <div>
                                <h3 className="text-2xl font-bold text-foreground">
                                    {industries.find(i => i.id === activeTab)?.label}
                                </h3>
                                <p className="text-slate-500 mt-1">
                                    Modernizing critical platforms to protect resilience and manage regulatory pressure.
                                </p>
                            </div>
                            <div className="hidden sm:block">
                                <span className="inline-flex items-center rounded-md bg-blue-50 dark:bg-blue-900/30 px-2 py-1 text-xs font-medium text-blue-700 dark:text-blue-300 ring-1 ring-inset ring-blue-700/10">
                                    {solutionsData[activeTab as keyof typeof solutionsData]?.length || 0} Active Use Cases
                                </span>
                            </div>
                        </div>

                        <div className="flex-1 overflow-auto">
                            <div className="min-w-[800px]">
                                <div className="grid grid-cols-12 gap-4 px-8 py-4 font-bold text-xs uppercase tracking-wider bg-navy-900 text-white">
                                    <div className="col-span-3">Topic & Focus</div>
                                    <div className="col-span-3">The Challenge</div>
                                    <div className="col-span-3">FlowMaster Impact</div>
                                    <div className="col-span-3">Business Benefit</div>
                                </div>

                                <AnimatePresence mode="wait">
                                    <motion.div
                                        key={activeTab}
                                        initial={{ opacity: 0, y: 10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        exit={{ opacity: 0, y: -10 }}
                                        transition={{ duration: 0.3 }}
                                    >
                                        {solutionsData[activeTab as keyof typeof solutionsData]?.map((item, idx) => (
                                            <div key={idx} className="grid grid-cols-12 gap-4 px-8 py-8 border-b border-border hover:bg-slate-50 dark:hover:bg-slate-800/20 transition-colors">
                                                <div className="col-span-3 pr-4">
                                                    <div className="flex items-start gap-3">
                                                        <div className="w-10 h-10 rounded bg-blue-100 dark:bg-blue-900 text-navy-900 dark:text-blue-100 flex items-center justify-center shrink-0">
                                                            <item.icon className="w-5 h-5" />
                                                        </div>
                                                        <div>
                                                            <h4 className="font-bold text-foreground leading-tight">{item.topic}</h4>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="col-span-3 text-sm text-slate-600 dark:text-slate-400 leading-relaxed pr-4">
                                                    {item.issue}
                                                </div>
                                                <div className="col-span-3 text-sm text-slate-600 dark:text-slate-400 leading-relaxed pr-4">
                                                    {item.impact}
                                                </div>
                                                <div className="col-span-3 text-sm text-slate-600 dark:text-slate-400 leading-relaxed pr-4">
                                                    {item.benefit}
                                                </div>
                                            </div>
                                        ))}
                                        {solutionsData[activeTab as keyof typeof solutionsData]?.length === 0 && (
                                            <div className="p-12 text-center text-slate-500">
                                                No use cases defined for this industry yet.
                                            </div>
                                        )}
                                    </motion.div>
                                </AnimatePresence>
                            </div>
                        </div>

                        <div className="bg-slate-50 dark:bg-slate-900/50 p-6 flex items-center justify-between border-t border-border">
                            <div className="flex -space-x-2">
                                {[
                                    "https://lh3.googleusercontent.com/aida-public/AB6AXuDlfzEk11QZZwqG-UozIA1SLjS0jvoHbIr27KiGntW9j0OT72UoiJLxDIpQoqU686HWrwS2YT42sOLA9anni3j-8oF3BZo5oGPL-D4zB1dY-TWmaz77n2ehzioKV7gYfys9CQK-0iagkZq36tO3lgfKRk5BP3MUFKc33Y8ZL7qOSIQ0Q4yni3HlYY7IKacrwZ6KX7K379e4PFVdaKoXt05ToqTQNvVy52FiHBLSNkDC3M2o1j8ps0qOfc8EKMBI-o99cOg3kHMnPKY_",
                                    "https://lh3.googleusercontent.com/aida-public/AB6AXuAYZnuKLDNuHjEu0lo2dWX2elX6WVY9dXXawm9Vbnc6zIIdW4uONIkSJCBWo346xWHIP6bD8__SuKcHTzbu1s17-9LJlwtFVdoRLy2LamywgY8wvNXzhWhC7m_zJxIDjxmV13mqYX8ifyljICcG6nKN97hp_AR-d5L-cEzsAA0b_MKMMUHVGQ9UqzmEnsfAJBswNTP5u4Ol3HqViyZWfmVhqhflW3-Nqxah5oziWtzfEi7efV_9nCjqQAxkV4movYAFBEVgZIcszjs2",
                                    "https://lh3.googleusercontent.com/aida-public/AB6AXuCX6p26VON1c3IP6Y6A7WVU70t5TwBnZOFNt9pzBoO_kskf_KOVZuJsofFg9O7WDugDJFrcJ4jFcfp_xRJLaaHzo2ITDzCUaY0zHTU_UTtXIMttG2K5wm2MtDWN3zHgG0IkiwufW1RRVdfOd8dEffMV8f2351j7vnIDJMv7L8Y9yEYDHNh6kVXrSkzQnSqALJ24mP-1Ngu45fXtIyKAa95F6WB-YMlQ9rk6AWcbBOO-fM6Z3FzMEsO9yfzxugEtUEKks4IJOssRmvVg"
                                ].map((src, i) => (
                                    <img key={i} alt="User" src={src} className="w-8 h-8 rounded-full border-2 border-background" />
                                ))}
                            </div>
                            <p className="text-xs text-slate-500 font-medium hidden md:block">Trusted by leading institutions globally.</p>
                            <Button className="bg-navy-900 text-white font-bold text-sm">
                                Explore Detailed Specs
                            </Button>
                        </div>

                    </div>
                </div>
            </main>

            {/* Case Studies */}
            <section className="py-24 bg-slate-50 dark:bg-background/50">
                <div className="max-w-7xl mx-auto px-6">
                    <h2 className="text-3xl font-bold mb-12 text-foreground">Case Studies & Success Stories</h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-12 border-t border-border pt-12">
                        {[
                            { name: "Lauzon", color: "bg-navy-900", icon: Gavel, quote: "FlowMaster AI solutions have integrated and automated professional workflows, allowing our teams to focus on high-impact strategic initiatives." },
                            { name: "Enterprise Bank", color: "bg-blue-600", icon: Landmark, quote: "We have replaced manual financial evaluations with FlowMaster AI models, ensuring greater accuracy in our reporting." },
                            { name: "Global Logistics", color: "bg-teal-600", icon: Truck, quote: "The platform's ability to learn and adapt to our unique supply chain challenges has made it an indispensable partner." },
                        ].map((study) => (
                            <div key={study.name} className="flex flex-col gap-6 group">
                                <div className="flex items-center gap-3">
                                    <div className={`w-10 h-10 ${study.color} rounded flex items-center justify-center`}>
                                        <study.icon className="text-white w-5 h-5" />
                                    </div>
                                    <span className="font-bold text-foreground text-lg">{study.name}</span>
                                </div>
                                <p className="text-slate-600 dark:text-slate-400 italic text-sm leading-relaxed">
                                    "{study.quote}"
                                </p>
                                <a className="text-blue-600 text-xs font-bold flex items-center gap-1 group-hover:underline uppercase tracking-wider cursor-pointer">
                                    Read Full Story <ArrowRight className="w-3 h-3" />
                                </a>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
        </div>
    );
}
