"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

interface SiteSettings {
    companyName: string;
    copyrightYear: string;
    contactEmail: string;
}

export default function Footer() {
    const [settings, setSettings] = useState<SiteSettings>({
        companyName: "FlowMaster FZC LLC",
        copyrightYear: "2026",
        contactEmail: "contact@flow-master.ai",
    });

    useEffect(() => {
        const fetchSettings = async () => {
            try {
                const res = await fetch("/api/public/settings");
                if (res.ok) {
                    const data = await res.json();
                    setSettings({
                        companyName: data.companyName || "FlowMaster FZC LLC",
                        copyrightYear: data.copyrightYear || "2026",
                        contactEmail: data.contactEmail || "contact@flow-master.ai",
                    });
                }
            } catch (error) {
                console.error("Failed to fetch settings:", error);
            }
        };
        fetchSettings();
    }, []);

    // Extract short company name for "About X" heading
    const shortName = settings.companyName.split(" ")[0] || "FlowMaster";

    return (
        <footer className="hero-gradient text-white relative overflow-hidden">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,#1e293b_0%,#020617_100%)]"></div>
            <div className="mx-auto max-w-7xl px-6 py-16 relative z-10">

                <div className="grid grid-cols-1 gap-12 md:grid-cols-2 lg:grid-cols-[1.5fr_1fr_1fr_1fr] lg:gap-8 text-left">

                    {/* Description */}
                    <div className="space-y-4">
                        <h4 className="text-lg font-semibold text-white uppercase">
                            About {shortName}
                        </h4>
                        <p className="text-sm text-white/80">
                            {shortName} enables enterprises to execute existing business processes using AI. It provides a single end-to-end orchestration and execution layer across current systems and data landscapes, with human oversight where required.
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
                                <Link href={`mailto:${settings.contactEmail}`} className="hover:text-white transition-colors">
                                    {settings.contactEmail}
                                </Link>
                            </li>
                            <li>© {settings.copyrightYear} {settings.companyName}</li>
                        </ul>
                    </div>
                </div>
            </div>
        </footer>
    );
}
