'use client'
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Lightbulb, Users, Zap, TrendingUp, MapPin, Briefcase, Mail } from "lucide-react";
import { motion } from "framer-motion";
import { ApplyModal } from "./_components/ApplyModal";

const jobs = [
    {
        title: "AI Engineering Architect",
        dept: "Product & Engineering",
        location: "Karachi, Pakistan",
        description: "The AI Engineering Architect designs and builds the AI-native SDLC toolset used by software developers. The role owns the full software lifecycle — from requirements and solution design through coding, testing, deployment, and operation. We develop with Claude Code.",
        scope: [
            "Requirements intake and decomposition",
            "Architecture and design workflows",
            "AI-assisted coding, testing, and review",
            "CI/CD, deployment, and application operations",
            "Build and maintain the developer toolset (Claude Code workflows, MCPs, Skills, Hooks, slash-commands) and prompts",
            "E2E integration and automation of the SDLC across stages into a single, traceable workflow",
            "Define and enforce standards through tooling, not documentation",
            "Ensure adoption of the toolset (incl training and communication)"
        ],
        skills: [
            "Expert level experience with Claude Code (non-negotiable), MCPs, Skills, prompting",
            "End-to-End understanding of the SDLC from requirements to maintenance and beyond",
            "Solid experience in SW-Architecture, Testing and CI/CD"
        ]
    },

];

export default function CareersPage() {
    const [selectedJob, setSelectedJob] = useState<typeof jobs[0] | null>(null);
    const [isDialogOpen, setIsDialogOpen] = useState(false);

    const handleApplyClick = (job: typeof jobs[0]) => {
        setSelectedJob(job);
        setIsDialogOpen(true);
    };

    return (
        <div className="flex flex-col min-h-screen">
            {/* Hero */}
            <section className="bg-navy-900 py-24 md:py-40 px-6 text-center relative overflow-hidden">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,#1e293b_0%,#020617_100%)]"></div>
                <div className="max-w-4xl mx-auto relative z-10">
                    <motion.h1
                        className="text-2xl md:text-5xl font-bold text-white mb-8 leading-tight tracking-tight"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                    >
                        Join Our Team & Shape the Future of AI at Flowmaster
                    </motion.h1>

                    <motion.p
                        className="text-xl md:text-2xl text-blue-100/80 max-w-2xl mx-auto leading-relaxed"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.1 }}
                    >
                        Critical thinkers welcome. We hire strategists who deliver. Discover exciting opportunities and build
                        your career with us.
                    </motion.p>
                </div>
            </section>

            {/* Culture */}
            <section className="bg-background py-16 px-6 md:px-12 border-b border-border">
                <div className="max-w-6xl mx-auto">
                    <motion.div
                        className="mb-16"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5 }}
                    >
                        <h2 className="text-3xl font-bold text-foreground mb-4">Our Culture & Values</h2>
                        <p className="text-slate-500 text-lg max-w-2xl">We are building an autonomous future. Our core
                            values reflect our dedication to innovation, impact, and collective growth.</p>
                    </motion.div>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
                        {[
                            { label: "Innovation", icon: Lightbulb, desc: "Endorse, innovation and collaborative recruiting for the AI age." },
                            { label: "Collaboration", icon: Users, desc: "Collaboration in the networks, and work for innovation across borders." },
                            { label: "Impact", icon: Zap, desc: "Impact with real business results and shared resources." },
                            { label: "Growth", icon: TrendingUp, desc: "Growth and organizing AI to convene and promote personal growth." },
                        ].map((item, i) => (
                            <motion.div
                                key={item.label}
                                className="flex flex-col items-start"
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.5, delay: i * 0.1 }}
                            >
                                <div className="mb-4 bg-blue-50 dark:bg-blue-900/20 p-3 rounded-lg text-blue-500">
                                    <item.icon className="w-8 h-8" />
                                </div>
                                <h3 className="text-xl font-bold text-foreground mb-2">{item.label}</h3>
                                <p className="text-slate-500 dark:text-slate-400">{item.desc}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Details Grid */}
            <section className="py-16 px-6 md:px-12 bg-slate-50 dark:bg-slate-900/30">
                <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-12">
                    {[
                        { title: "What You’ll Work On", items: ["Scalable enterprise-grade AI agent systems.", "Complex natural language processing pipelines.", "Integration layers for global SaaS ecosystems."] },
                        { title: "What It’s Like Here", items: ["High-speed execution with radical candor.", "Judgment-focused decision making.", "Autonomy and ownership from day one."] },
                        { title: "Who We’re Looking For", items: ["Self-driven builders and architects.", "T-shaped talent with deep technical expertise.", "Curious minds hungry to disrupt the status quo."] },
                    ].map((section, i) => (
                        <motion.div
                            key={section.title}
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: i * 0.1 }}
                        >
                            <h3 className="text-2xl font-bold text-foreground mb-6">{section.title}</h3>
                            <ul className="space-y-4">
                                {section.items.map((item, idx) => (
                                    <li key={idx} className="flex items-center">
                                        <span className="mr-2 text-blue-500 text-sm">●</span>
                                        <span className="text-slate-600 dark:text-slate-300">{item}</span>
                                    </li>
                                ))}
                            </ul>
                        </motion.div>
                    ))}
                </div>
            </section>

            {/* Jobs */}
            <section className="bg-background py-20 px-6 md:px-12">
                <div className="max-w-6xl mx-auto">
                    <motion.h2
                        className="text-3xl font-bold text-foreground mb-12"
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                    >
                        Open Positions
                    </motion.h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {jobs.map((job, i) => (
                            <motion.div
                                key={job.title}
                                className="bg-card text-card-foreground p-8 rounded-2xl border border-border shadow-sm hover:shadow-md transition-shadow"
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.4, delay: i * 0.1 }}
                                whileHover={{ y: -5 }}
                            >
                                <h3 className="text-2xl font-bold mb-4">{job.title}</h3>
                                <div className="space-y-3 mb-8">
                                    <div className="flex items-center text-slate-500 dark:text-slate-400">
                                        <MapPin className="w-5 h-5 mr-2" />
                                        <span>{job.location}</span>
                                    </div>
                                    <div className="flex items-center text-slate-500 dark:text-slate-400">
                                        <Briefcase className="w-5 h-5 mr-2" />
                                        <span>{job.dept}</span>
                                    </div>
                                </div>
                                <Button
                                    className="w-full bg-navy-900 text-white font-semibold hover:bg-navy-800"
                                    onClick={() => handleApplyClick(job)}
                                >
                                    Apply Now
                                </Button>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {isDialogOpen && (
                <ApplyModal
                    job={selectedJob}
                    open={isDialogOpen}
                    onOpenChange={setIsDialogOpen}
                />
            )}

            {/* CTA */}
            <section className="bg-navy-900 py-24 px-6 text-center text-white">
                <motion.div
                    className="max-w-3xl mx-auto"
                    initial={{ opacity: 0, scale: 0.95 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5 }}
                >
                    <h2 className="text-4xl font-bold mb-6">Intrigued? Let&apos;s talk!</h2>
                    <p className="text-xl text-blue-100 mb-10">
                        Don&apos;t see the perfect role? Send us a note with your CV and tell us how you can help us shape the future
                        of enterprise AI.
                    </p>
                    <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                        <Button onClick={() => window.location.href = "/contact-us"} className="bg-white text-navy-900 px-10 py-6 h-auto text-lg hover:bg-slate-100 font-bold">
                            Send a Note <Mail className="ml-2 w-5 h-5" />
                        </Button>
                        {/* <Button variant="outline" className="border-white/30 text-white px-10 py-6 h-auto text-lg hover:bg-white/10 hover:text-white font-bold bg-transparent">
                            Join Talent Network
                        </Button> */}
                    </div>
                </motion.div>
            </section>
        </div>
    );
}
