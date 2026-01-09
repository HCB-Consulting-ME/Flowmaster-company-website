"use client";

import Image from "next/image";
import Link from "next/link";
import { Separator } from "@/components/ui/separator";

export default function Footer() {
    return (
        <footer className="hero-gradient text-white">
            <div className="mx-auto max-w-7xl px-6 py-16">
                <div className="grid grid-cols-1 gap-12 md:grid-cols-4">

                    {/* Logo & Description */}
                    <div className="space-y-4">
                        <Image
                            src="/logo/darklogo2.png"
                            alt="Company Logo"
                            width={200}   // ⬅ bigger logo
                            height={60}
                            priority
                            className="object-contain"
                        />
                        <p className="text-sm leading-relaxed text-white/80">
                            Building intelligent platforms that help teams automate,
                            scale, and move faster with confidence.
                        </p>
                    </div>

                    {/* Company */}
                    <div>
                        <h4 className="mb-4 text-sm font-semibold text-white">
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
                        <h4 className="mb-4 text-sm font-semibold text-white">
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
                        <h4 className="mb-4 text-sm font-semibold text-white">
                            Get in Touch
                        </h4>
                        <ul className="space-y-3 text-sm text-white/80">
                            <li>
                                <Link href="/contact-us" className="hover:text-white transition-colors">
                                    Contact Us
                                </Link>
                            </li>
                            <li>support@yourcompany.com</li>
                            <li>© {new Date().getFullYear()} Your Company</li>
                        </ul>
                    </div>
                </div>

                <Separator className="my-10 bg-white/20" />

                {/* Bottom Bar */}
                <div className="flex flex-col items-center justify-between gap-4 text-xs md:flex-row text-white/70">
                    <p>All rights reserved.</p>
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
