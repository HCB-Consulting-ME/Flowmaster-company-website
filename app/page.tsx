'use client'
import Link from "next/link";
import { ArrowRight, CheckCircle2, Sliders, MonitorSmartphone, Sparkles, Play } from "lucide-react";
import { HeroCore } from "@/components/landing/HeroCore";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { motion } from "framer-motion";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="bg-[#020617] pt-35 pb-24 md:pb-40 text-white overflow-hidden relative">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,#1e293b_0%,#020617_100%)]"></div>
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <motion.div
            className="space-y-8 z-10"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <motion.h1
              className="text-5xl md:text-6xl font-bold leading-[1.1] tracking-tight"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              The Platform for<br />
              <span className="text-blue-500">Enterprise-Ready</span><br />
              AI Agents.
            </motion.h1>
            <motion.p
              className="text-lg text-slate-300 max-w-lg leading-relaxed"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              Move beyond pilot mode. Securely define, launch, and operate autonomous agents within your existing
              business systems and governance policies.
            </motion.p>
            <motion.ul
              className="space-y-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              <motion.li
                className="flex items-start space-x-3"
                whileHover={{ scale: 1.02 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <CheckCircle2 className="text-blue-400 w-5 h-5 mt-1" />
                <span className="text-slate-200">Execute transactions in your enterprise core systems.</span>
              </motion.li>
              <motion.li
                className="flex items-start space-x-3"
                whileHover={{ scale: 1.02 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <CheckCircle2 className="text-blue-400 w-5 h-5 mt-1" />
                <span className="text-slate-200">Full Governance, Control, and Super Fast Integration.</span>
              </motion.li>
            </motion.ul>
            <motion.div
              className="flex flex-wrap gap-4 pt-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Button className="bg-white text-navy-900 font-bold text-base h-14 px-8 hover:bg-blue-100 shadow-xl rounded-md transition-all">
                  See the Platform in Action
                </Button>
              </motion.div>
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Button variant="outline" className="border-2 border-white/40 text-white bg-transparent font-bold text-base h-14 px-8 hover:bg-white hover:border-white transition-all rounded-md">
                  Request Sandbox Access
                </Button>
              </motion.div>
            </motion.div>
          </motion.div>
          <motion.div
            className="relative flex justify-center items-center z-10"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, delay: 0.2 }}
          >
            <HeroCore />
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24 bg-background">
        <div className="max-w-7xl mx-auto px-6">
          <motion.h2
            className="text-3xl md:text-4xl font-bold text-center mb-16 dark:text-white"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            Enterprise-Grade Execution
          </motion.h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 lg:gap-20">
            {[
              {
                icon: <Sliders className="text-primary w-8 h-8" />,
                title: "Process Management & Import",
                description: "Import and manage existing processes via intuitive screens with full governance."
              },
              {
                icon: <MonitorSmartphone className="text-primary w-8 h-8" />,
                title: "Multi-Platform Apps",
                description: "Employee, Manager, and Partner apps for seamless execution, approval, and collaboration."
              },
              {
                icon: <Sparkles className="text-primary w-8 h-8" />,
                title: "Self-Learning Agents",
                description: "Agents continuously learn from manager feedback and data, optimizing execution."
              }
            ].map((feature, index) => (
              <motion.div
                key={index}
                className="text-center group"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ y: -5 }}
              >
                <motion.div
                  className="w-16 h-16 bg-blue-50 dark:bg-navy-800 rounded-2xl flex items-center justify-center mx-auto mb-6 transition-transform group-hover:-translate-y-2"
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  {feature.icon}
                </motion.div>
                <h3 className="text-xl font-bold mb-4 dark:text-white">{feature.title}</h3>
                <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
                  {feature.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Comparison Section */}
      <section className="py-24 bg-secondary/30 border-t border-slate-100 dark:border-slate-800">
        <div className="max-w-7xl mx-auto px-6">
          <motion.h2
            className="text-3xl md:text-4xl font-bold text-center mb-16 text-navy-900 dark:text-white"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            Why FlowMaster?
          </motion.h2>

          <div className="flex flex-col md:flex-row gap-16 md:gap-24">
            <motion.div
              className="flex-1"
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl font-bold text-navy-900 dark:text-white mb-10 leading-tight">
                Enterprises are stuck in AI Pilot Purgatory
              </h2>
              <ul className="space-y-6">
                {[
                  "Most AI Pilots are chat bots, analytics or other areas with little impact.",
                  "High-value domains remain largely untouched (F&A, Supply Chain, HCM, Operations)",
                  "Governance, compliance, and control break at scale",
                  "Business users depend on developers for every change",
                  "Agents fail in fragmented enterprise data landscapes",
                  "Most solutions are collections of Python scripts and not enterprise ready"
                ].map((item, idx) => (
                  <motion.li
                    key={idx}
                    className="flex items-start space-x-4"
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3, delay: idx * 0.05 }}
                    viewport={{ once: true }}
                    whileHover={{ x: 5 }}
                  >
                    <Play className="text-primary fill-current mt-1 w-5 h-5 flex-shrink-0" />
                    <p className="text-lg text-slate-700 dark:text-slate-300">{item}</p>
                  </motion.li>
                ))}
              </ul>
            </motion.div>

            {/* Divider Illustration for Desktop */}
            <motion.div
              className="lg:flex items-center justify-center px-4"
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              viewport={{ once: true }}
              whileHover={{ rotate: 360 }}
            // transition={{ duration: 0.7, type: "spring" }}
            >
              <Image src="/logo/logoicon2.png" alt="Flowmaster Logo" width={80} height={80} />
            </motion.div>

            <motion.div
              className="flex-1"
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl font-bold text-navy-900 dark:text-white mb-10 leading-tight">
                AI needs to respect YOUR organization the way it is set up today
              </h2>
              <ul className="space-y-6">
                <motion.li
                  className="flex items-start space-x-4"
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3 }}
                  viewport={{ once: true }}
                  whileHover={{ x: 5 }}
                >
                  <Play className="text-primary fill-current mt-1 w-5 h-5 flex-shrink-0" />
                  <p className="text-lg text-slate-700 dark:text-slate-300 font-medium">Enterprises already have governance — for good reasons.</p>
                </motion.li>
                <motion.li
                  className="space-y-6"
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3, delay: 0.1 }}
                  viewport={{ once: true }}
                >
                  <div className="flex items-start space-x-4">
                    <Play className="text-primary fill-current mt-1 w-5 h-5 flex-shrink-0" />
                    <p className="text-lg text-slate-700 dark:text-slate-300 font-medium">Enterprise Grade Agentic AI must work with the existing</p>
                  </div>
                  <ul className="ml-10 space-y-4">
                    {[
                      "Business Processes",
                      "Master Data, Transaction Data",
                      "Governance & Controls",
                      "Interfaces, Middleware & Connectors",
                      "Organizational structure",
                      "Human employees"
                    ].map((subItem, idx) => (
                      <motion.li
                        key={idx}
                        className="flex items-center space-x-3"
                        initial={{ opacity: 0, x: 20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.3, delay: 0.1 + idx * 0.05 }}
                        viewport={{ once: true }}
                        whileHover={{ x: 5 }}
                      >
                        <Play className="text-primary fill-current w-4 h-4 flex-shrink-0" />
                        <span className="text-lg text-slate-600 dark:text-slate-400">{subItem}</span>
                      </motion.li>
                    ))}
                  </ul>
                </motion.li>
              </ul>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
}