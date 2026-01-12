'use client'
import Link from "next/link";
import { ArrowRight, CheckCircle2, Sliders, MonitorSmartphone, Sparkles, Play, AlertCircle } from "lucide-react";
import { HeroCore } from "@/components/landing/HeroCore";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { motion } from "framer-motion";
import FeaturesSection from "@/components/landing/FeatureSection";
import TechnologiesSection from "@/components/landing/TechnologiesSection";

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
              className="text-4xl md:text-6xl font-bold leading-[1.1] tracking-tight"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              The Operating System for<br />
              <span className="text-blue-500">AI Native Enterprises</span><br />
            </motion.h1>
            <motion.p
              className="text-lg text-slate-300 max-w-lg leading-relaxed"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              FlowMaster enables enterprises to execute existing business processes using AI. ​It provides a single end-to-end orchestration and execution layer across current systems and data landscapes, with human oversight where required.
            </motion.p>
            {/* <motion.ul
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
            </motion.ul> */}
            <motion.div
              className="flex flex-wrap gap-4 pt-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Button onClick={() => window.location.href = "/#demo"} className="bg-white text-navy-900 font-bold text-base h-14 px-8 hover:bg-blue-100 shadow-xl rounded-md transition-all">
                  See the Platform in Action
                </Button>
              </motion.div>
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Button variant="outline" className="border-2 border-white/40 text-white bg-transparent font-bold text-base h-14 px-8 hover:bg-white hover:border-white transition-all rounded-md">
                  Request Demo
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
            {/* <Image src="/logo/image3.png" alt="Flowmaster Logo" width={1000} height={1000} /> */}
          </motion.div>
        </div>
      </section>



      {/* Features Section */}
      <FeaturesSection />


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

          {/* <div className="flex flex-col md:flex-row gap-16 md:gap-24">
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



          </div> */}
          <div className="flex flex-col md:flex-row gap-8">

            {/* Card 1: The Challenge */}
            <motion.div
              className="flex-1 p-8 rounded-3xl bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-800"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <div className="flex items-center gap-3 mb-6">
                <AlertCircle className="text-red-500 w-6 h-6" />
                <h2 className="text-2xl font-bold text-navy-900 dark:text-white">
                  AI Pilot Purgatory
                </h2>
              </div>

              <ul className="space-y-4">
                {[
                  "Low-impact pilots (chat bots & basic analytics)",
                  "Untouched high-value domains (F&A, Supply Chain)",
                  "Governance and compliance breaks at scale",
                  "Business users dependency on developers",
                  "Agents failing in fragmented data landscapes",
                  "Brittle Python scripts vs. Enterprise readiness"
                ].map((item, idx) => (
                  <li key={idx} className="flex items-start space-x-3">
                    <Play className="text-primary fill-current mt-1.5 w-3.5 h-3.5 shrink-0 opacity-70" />
                    <p className="text-slate-700 dark:text-slate-300">{item}</p>
                  </li>
                ))}
              </ul>
            </motion.div>

            {/* Card 2: The Solution */}
            <motion.div
              className="flex-1 p-8 rounded-3xl bg-primary/5 dark:bg-primary/10 border border-primary/20 dark:border-primary/20"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <div className="flex items-center gap-3 mb-6">
                <CheckCircle2 className="text-primary w-6 h-6" />
                <h2 className="text-2xl font-bold text-navy-900 dark:text-white">
                  The Enterprise Standard
                </h2>
              </div>

              <p className="text-slate-700 dark:text-slate-300 font-medium mb-6">
                Agentic AI that respects existing governance and infrastructure:
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {[
                  "Business Processes",
                  "Master & Transaction Data",
                  "Governance & Controls",
                  "Connectors & Middleware",
                  "Organizational Structure",
                  "Human Employees"
                ].map((subItem, idx) => (
                  <div key={idx} className="flex items-center space-x-3 p-3 rounded-xl bg-white dark:bg-slate-800 border border-slate-100 dark:border-slate-700 shadow-sm">
                    <CheckCircle2 className="text-primary w-4 h-4 shrink-0" />
                    <span className="text-sm font-medium text-slate-600 dark:text-slate-400">{subItem}</span>
                  </div>
                ))}
              </div>
            </motion.div>

          </div>
          {/* Technologies Section */}
          <TechnologiesSection />



          {/* Video Demo Section */}
          <motion.div
            className="mt-24 max-w-4xl mx-auto text-center"
            id="demo"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            <h3 className="text-3xl md:text-4xl font-bold text-navy-900 dark:text-white mb-6" >
              See FlowMaster in Action
            </h3>
            <p className="text-lg text-slate-600 dark:text-slate-400 mb-10 max-w-2xl mx-auto">
              Watch how our autonomous agents orchestrate complex enterprise workflows securely and efficiently.
            </p>

            <div className="relative rounded-2xl overflow-hidden shadow-2xl border-4 border-white dark:border-slate-800 bg-slate-900 ring-1 ring-slate-900/10">
              <video
                src="/video/Media1.mp4"
                controls
                autoPlay
                muted
                loop
                className="w-full h-auto block"
              />
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}