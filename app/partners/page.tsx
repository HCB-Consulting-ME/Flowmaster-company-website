"use client";

import { Button } from "@/components/ui/button";
import { Lightbulb, Handshake, Headphones, DollarSign, ArrowRight } from "lucide-react";
import Link from "next/link";
import { motion } from "framer-motion";

export default function PartnersPage() {
    return (
        <div className="flex flex-col min-h-screen">
            {/* Hero */}
            <section className="bg-navy-900 pt-40 pb-20 md:pt-48 md:pb-32 px-6 text-center relative overflow-hidden">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,#1e293b_0%,#020617_100%)]"></div>

                <div className="max-w-7xl mx-auto relative z-10">
                    <motion.h1
                        className="text-4xl md:text-6xl font-bold text-white mb-6 leading-tight tracking-tight"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                    >
                        Partner with FlowMaster: <br />
                        <span className="text-blue-500">Drive Growth and Innovation Together.</span>
                    </motion.h1>
                    <motion.p
                        className="text-xl text-slate-300 max-w-3xl mx-auto mb-10"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.1 }}
                    >
                        Join our ecosystem of technology leaders and solution providers to deliver world-class AI agent
                        solutions to enterprises globally.
                    </motion.p>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.2 }}
                    >
                        <Link href="/contact-us">
                            <Button className="bg-blue-600 hover:bg-blue-500 text-white font-bold text-lg h-14 px-8 rounded-full shadow-[0_0_20px_rgba(37,99,235,0.3)] transition-all hover:scale-105">
                                Become a Partner <ArrowRight className="ml-2 w-5 h-5" />
                            </Button>
                        </Link>
                    </motion.div>

                    {/* <motion.div
                        className="relative max-w-5xl mx-auto rounded-xl overflow-hidden shadow-2xl border border-slate-700/50 mt-16 glow-effect"
                        initial={{ opacity: 0, y: 40 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.7, delay: 0.3 }}
                    >
                        <div className="absolute inset-0 bg-navy-900/40 z-10"></div>
                        <img
                            alt="Professional team collaborating"
                            width={1200}
                            height={600}
                            className="w-full h-[400px] object-cover"
                            src="https://lh3.googleusercontent.com/aida-public/AB6AXuDdYYyXxEwnig9BlXlwH_VRz6jhmAoBDqGn4A6ZDHaMIfqJ9pIblvBbOpXlKDcNJZi2-pr8Ox0lREfS1qkOSML2nAmzDgQjjtsvipTZfQcX-EvcdNaV4cY4q5jHLyg_dZMPUR_YpmUvfMZWms6MQsVF6agFShEstNNTIPzoCCQNdHYQGXj1kMZZVdq44xb5O8WS4XicVBKE5J8YMlxi6jeWFc4hWyYBRpMh4Wuxtvq0v3z2YsIOXDaMLH1ZWoxbH-LdhG-CN2-YCFKx"
                        />
                    </motion.div> */}
                </div>
            </section>

            {/* Benefits */}
            <section className="py-24 px-6 bg-background">
                <div className="max-w-7xl mx-auto">
                    <motion.div
                        className="text-center mb-16"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                    >
                        <h2 className="text-3xl md:text-4xl font-bold text-navy-900 dark:text-white mb-4">Why Partner with Us?</h2>
                        <p className="text-slate-500 text-lg max-w-2xl mx-auto">Scale your business with the leading enterprise AI platform.</p>
                    </motion.div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                        {[
                            { title: "Access to Technology", desc: "Exclusive access to our AI Agent core, roadmap updates, and beta features.", icon: Lightbulb, color: "text-yellow-500 bg-yellow-50 dark:bg-yellow-900/20" },
                            { title: "Co-Marketing Opportunities", desc: "Joint webinars, case studies, and featuring in our global partner directory.", icon: Handshake, color: "text-blue-500 bg-blue-50 dark:bg-blue-900/20" },
                            { title: "Dedicated Support", desc: "Priority technical support and a dedicated channel for solution architecture.", icon: Headphones, color: "text-purple-500 bg-purple-50 dark:bg-purple-900/20" },
                            { title: "Revenue Share", desc: "Competitive referral fees and co-sell incentives to grow your bottom line.", icon: DollarSign, color: "text-emerald-500 bg-emerald-50 dark:bg-emerald-900/20" },
                        ].map((item, idx) => (
                            <motion.div
                                key={item.title}
                                className="p-8 rounded-2xl border border-border bg-white dark:bg-slate-900 hover:shadow-xl transition-all hover:-translate-y-1 group"
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ delay: idx * 0.1 }}
                                viewport={{ once: true }}
                            >
                                <div className={`w-14 h-14 rounded-xl flex items-center justify-center mb-6 text-primary group-hover:scale-110 transition-transform`}>
                                    <item.icon className="w-7 h-7" />
                                </div>
                                <h3 className="text-xl font-bold mb-3 text-foreground">{item.title}</h3>
                                <p className="text-slate-600 dark:text-slate-400 leading-relaxed text-sm">{item.desc}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Partner Ecosystem */}
            {/* <section className="py-24 px-6 bg-slate-50 dark:bg-slate-900/30 border-t border-border">
                <div className="max-w-7xl mx-auto text-center">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                    >
                        <h2 className="text-3xl md:text-4xl font-bold mb-16 text-foreground">Our Strategic Partners</h2>
                    </motion.div>

                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8 items-center justify-items-center opacity-80">
                        {[
                            { name: "Salesforce", img: "https://lh3.googleusercontent.com/aida-public/AB6AXuA97BIXI5XSAEVbRgqsUe60Ohi5sqD8Wa1iHirRBeNwGKisAI_dKPfyCigiqeSemEE9zYllnMIFk1K0ZTuLkjxW9KwwSAv2-cIYsINcY8M9yTNsT4w3bLBniLqDc-B7CodLwYmaqKlGzdqsIaJsWtJ_7UbbaZgbW1-c2mPRnPmvgtMR2BNZ39t7TRu1L_0pbLxWNNwIOctIGWsV5Sd26irC2dIMQQngbYILG_SYcDExTa__Ewm5r73-g3cgardD6B0Dzrl0qRbat_R5" },
                            { name: "Microsoft", img: "https://lh3.googleusercontent.com/aida-public/AB6AXuCQdyLM6OFnrEqVt6ZBKFHB_SXPsh-XCTzkW6lcS79UtkWULpICUeeFoG4phcmFZDdLfv3NKCsGzPRYTUkjWwzhT-sMnM8tyy-tywpQj6Qv9X1PbR86VoLthxiAXnNqPTxM4j7svrJWrnQaxtFiRhdD5402IxH_xxwNK4fxIIV8EFQ57-4KA0ZxlinNxtZao5yAnaXooc1qEbXk8eFgWnL9AwfMH2ObZ5dNRS4CyRnkh2GPubXooNv1N3dm3lOpiPs4nOyOHXdX4tCC" },
                            { name: "Google Cloud", img: "https://lh3.googleusercontent.com/aida-public/AB6AXuAoyQzdLHInfe5m72bjri-8LcP1Z3mqadxZMrMFSKRJbstC2aLH1HVIPcLTrvvDjlm_9glAx7AKlIoc1AASoI2ytV-6uubfGEsDx4IBfE-Czi17DUclNqXeuRi2jkMGXNOlWQKCYE7zz93nydwyYDoG4E2kxbyOtw4tEL-1DMuBloB37FOZ1qRpPhGvy1qIlRfoHqzjdvm5nH_GOmAmVWuvX7ZuGgDBitJ_zltdAqmX0pFNr8aKGwtfStDeQwvYnZMTDVijDEGTiF1m" },
                            { name: "AWS", img: "https://lh3.googleusercontent.com/aida-public/AB6AXuBD5H63aXXJg36-gCAc56yZexf_Y9bOUnH1-QjDSucb_s4iA-0Dsv8Ak1bq9ZVcvAgSE9VLVTP-Iz3tQxz9p51HYpSQlSFSYyXAvmSHgC7EdAWpp9YGS5b6PKX1eYOxH-zYEBf2id7NVtDtq79aPpOFpd6t3M1KW3TXtxuwn7FE6Z6tnh7RkqkqvIbWhP8l48DN007krw8Nq54g9sYsNNWJDwCS6o3vDyUTM5cn0eB-HTYbYredHseBaLL_O_j53m0BAORlBnUTCLmj" },
                            { name: "Apple", img: "https://lh3.googleusercontent.com/aida-public/AB6AXuBSoVS-QXpLEyPPbVA1bXbGqoTfDtg-2hwUmYPebYmLDJ0b-CH_ARITG0lyC-WJDbhX-j9S1tX7ayCZ31N7jqLxkbq-heeqoDu_bw6_LSMBTu_YTRH7Uhycstw4gRnEeXuFBpI-gPGq0UAjiEeBSBxIQ2ZA9D1S6SryXWhdDzuSTI1xhFBRoF_xvPolBpf9iXByCyi7gktVsgx3fdIcaawv7N66RbDKG3tIoZJADIyKYSQjsK-a4XMBgGCTSUqsTSNVDd4ey-xbhrZx" },
                        ].map((p, i) => (
                            <motion.div
                                key={p.name}
                                className="w-full flex items-center justify-center p-6 bg-white dark:bg-slate-800 rounded-xl shadow-sm border border-slate-100 dark:border-slate-700 hover:shadow-lg transition-all"
                                initial={{ opacity: 0, scale: 0.8 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                transition={{ delay: i * 0.1 }}
                                viewport={{ once: true }}
                            >
                                <img alt={p.name} className="h-8 md:h-10 w-auto object-contain dark:invert" src={p.img} />
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section> */}


        </div>
    );
}
