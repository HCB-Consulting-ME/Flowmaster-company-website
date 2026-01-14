"use client";

import Link from "next/link";
import { Separator } from "@/components/ui/separator";

export default function Footer() {
    return (
        <footer className="hero-gradient text-white relative overflow-hidden">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,#1e293b_0%,#020617_100%)]"></div>
            <div className="mx-auto max-w-7xl px-6 py-16 relative z-10">

                {/* Branding Header Section */}
                {/* <div className="flex flex-col md:flex-row items-center gap-6">
                    <Image
                        src="/logo/newLogo.png"
                        alt="Company Logo"
                        width={230}
                        height={230}
                        priority
                        className="object-contain"
                    />
                    <div className="hidden md:block h-10 w-[1px] bg-white/30" />
                    <h2 className="text-xl md:text-2xl font-medium tracking-tight text-center md:text-left">
                        The Operating System for AI Native Enterprises
                    </h2>
                </div> */}

                {/* Divider */}
                {/* <Separator className="my-5 mb-10 bg-white/20" /> */}

                <div className="grid grid-cols-1 gap-12 md:grid-cols-4">

                    {/* Description */}
                    <div className="space-y-4">
                        <h4 className="text-lg font-semibold text-white uppercase">
                            About FlowMaster
                        </h4>
                        <p className="text-sm text-white/80">
                            Building intelligent platforms that help teams automate,
                            scale, and move faster with confidence.
                        </p>
                    </div>

                    {/* Company */}
                    <div>
                        <h4 className="mb-4 text-sm font-semibold text-white uppercase tracking-wider">
                            Company
                        </h4>
                        <ul className="space-y-3 text-sm text-white/80">
                            <li>
                                <Link href="/company" className="hover:text-white transition-colors">
                                    Our Company
                                </Link>
                            </li>
                            <li>
                                <Link href="/partners" className="hover:text-white transition-colors">
                                    Partners
                                </Link>
                            </li>
                            <li>
                                <Link href="/careers" className="hover:text-white transition-colors">
                                    Careers
                                </Link>
                            </li>
                        </ul>
                    </div>

                    {/* Solutions */}
                    <div>
                        <h4 className="mb-4 text-sm font-semibold text-white uppercase tracking-wider">
                            Solutions
                        </h4>
                        <ul className="space-y-3 text-sm text-white/80">
                            <li>
                                <Link href="/solutions" className="hover:text-white transition-colors">
                                    Our Solutions
                                </Link>
                            </li>
                            <li>
                                <Link href="/platform" className="hover:text-white transition-colors">
                                    Platform
                                </Link>
                            </li>
                            <li>
                                <Link href="/pricing" className="hover:text-white transition-colors">
                                    Pricing
                                </Link>
                            </li>
                        </ul>
                    </div>

                    {/* Contact */}
                    <div>
                        <h4 className="mb-4 text-sm font-semibold text-white uppercase tracking-wider">
                            Get in Touch
                        </h4>
                        <ul className="space-y-3 text-sm text-white/80">
                            <li>
                                <Link href="/contact-us" className="hover:text-white transition-colors">
                                    Contact Us
                                </Link>
                            </li>
                            <li>
                                <Link href="mailto:contact@flow-master.ai" className="hover:text-white transition-colors">
                                    contact@flow-master.ai
                                </Link>
                            </li>
                            <li>© 2025 FlowMaster FZC LLC</li>
                        </ul>
                    </div>
                </div>

                <Separator className="my-10 bg-white/20" />

                {/* Bottom Bar */}
                <div className="flex flex-col items-center justify-between gap-4 text-xs md:flex-row text-white/70">
                    <p>All rights reserved. Built for the future of automation.</p>
                    <div className="flex gap-6">
                        <Link href="/privacy" className="hover:text-white transition-colors">
                            Privacy Policy
                        </Link>
                        <Link href="/terms" className="hover:text-white transition-colors">
                            Terms of Service
                        </Link>
                    </div>
                </div>
            </div>
        </footer>
    );
}