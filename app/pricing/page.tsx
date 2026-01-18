"use client";

import { Button } from "@/components/ui/button";
import { Sparkles, ShieldCheck, Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";

interface PricingFeature {
    label?: string;
    value?: string;
    type?: string;
    l?: string;
    r?: string;
}

interface PricingPlan {
    id: string;
    name: string;
    subtitle?: string;
    price: string;
    period?: string;
    badge?: string;
    features: (string | PricingFeature)[];
    specs?: PricingFeature[];
    ctaText?: string;
    ctaLink?: string;
    isPopular: boolean;
    isHighlighted: boolean;
}

const DEFAULT_PLANS: PricingPlan[] = [
    {
        id: "free",
        name: "Free",
        subtitle: "For individuals & prototyping",
        price: "$0",
        period: "month",
        badge: "Current Plan",
        features: [],
        specs: [
            { label: "CPU", value: "AMD Ryzen™ 5 3600 (6c/12t)" },
            { label: "Generation", value: "Matisse (Zen 2)" },
            { label: "RAM", value: "128 GB DDR4 RAM" },
            { label: "Drives", value: "2 x 512 GB NVMe SSD" },
            { label: "Locations", value: "1 x Germany, 1 x Finland" },
        ],
        ctaText: "Join the Waitlist",
        ctaLink: "/contact-us",
        isPopular: false,
        isHighlighted: false,
    },
    {
        id: "enterprise",
        name: "Enterprise",
        subtitle: "Customized for scale & security",
        price: "Custom",
        period: "",
        badge: "Recommended",
        features: [
            { label: "Process executions", value: "Unlimited", type: "bold" },
            { label: "Number of agents", value: "Unlimited", type: "bold" },
            { label: "MCP servers", value: "Unlimited", type: "bold" },
            { label: "Integrations", value: "Unlimited", type: "bold" },
            { label: "On-Prem usage", value: "Included (client hosted)", type: "italic" },
            { label: "SaaS based usage", value: "Included (client hosted)", type: "italic" },
            { label: "Single Sign On", value: "Included", type: "green" },
            { label: "Audit", value: "Included", type: "green" },
        ],
        specs: [
            { label: "Token Usage", value: "250M token usage p.a. in Gemini 3 Flash (approx. 200M words)" },
        ],
        ctaText: "Join the Waitlist",
        ctaLink: "/contact-us",
        isPopular: true,
        isHighlighted: true,
    },
];

export default function PricingPage() {
    const [plans, setPlans] = useState<PricingPlan[]>(DEFAULT_PLANS);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        async function fetchPlans() {
            try {
                const res = await fetch("/api/public/pricing");
                if (res.ok) {
                    const data = await res.json();
                    setPlans(data);
                }
            } catch (error) {
                console.error("Failed to fetch pricing plans:", error);
            } finally {
                setIsLoading(false);
            }
        }
        fetchPlans();
    }, []);

    const renderFeatureValue = (feature: string | PricingFeature) => {
        if (typeof feature === "string") {
            return <span>{feature}</span>;
        }
        const type = feature.type;
        const value = feature.value || feature.r || "";
        return (
            <span className={cn(
                type === "bold" && "text-navy-900 dark:text-blue-400 font-bold uppercase text-xs",
                type === "italic" && "italic text-slate-600 dark:text-slate-400",
                type === "green" && "text-green-600 font-semibold"
            )}>
                {value}
            </span>
        );
    };

    const getFeatureLabel = (feature: string | PricingFeature): string => {
        if (typeof feature === "string") return feature;
        return feature.label || feature.l || "";
    };

    const getFeatureValue = (feature: string | PricingFeature): string => {
        if (typeof feature === "string") return "";
        return feature.value || feature.r || "";
    };

    if (isLoading) {
        return (
            <div className="flex flex-col min-h-screen">
                <header className="bg-navy-900 pt-20 pb-32 px-6 text-center relative overflow-hidden">
                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,#1e293b_0%,#020617_100%)]"></div>
                    <div className="max-w-7xl mx-auto relative z-10">
                        <h1 className="text-4xl md:text-5xl font-bold text-white mb-4 my-10">
                            Simple, Scalable Pricing
                        </h1>
                    </div>
                </header>
                <main className="max-w-7xl mx-auto px-6 -mt-16 pb-20 w-full relative z-10 flex justify-center items-center py-20">
                    <Loader2 className="h-8 w-8 animate-spin text-blue-600" />
                </main>
            </div>
        );
    }

    return (
        <div className="flex flex-col min-h-screen">
            <header className="bg-navy-900 pt-20 pb-32 px-6 text-center relative overflow-hidden">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,#1e293b_0%,#020617_100%)]"></div>
                <div className="max-w-7xl mx-auto relative z-10">
                    <motion.h1
                        className="text-4xl md:text-5xl font-bold text-white mb-4 my-10"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                    >
                        Simple, Scalable Pricing
                    </motion.h1>
                    <motion.p
                        className="text-blue-100 text-lg max-w-2xl mx-auto"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.1 }}
                    >
                        Power your enterprise with FlowMaster AI Agents. From personal experimentation to full-scale global
                        deployments.
                    </motion.p>
                </div>
            </header>

            <main className="max-w-7xl mx-auto px-6 -mt-16 pb-20 w-full relative z-10">
                <div className={cn(
                    "grid gap-8 items-start",
                    plans.length === 1 && "grid-cols-1 max-w-xl mx-auto",
                    plans.length === 2 && "grid-cols-1 lg:grid-cols-12",
                    plans.length >= 3 && "grid-cols-1 md:grid-cols-2 lg:grid-cols-3"
                )}>
                    {plans.map((plan, index) => (
                        <motion.div
                            key={plan.id}
                            className={cn(
                                "bg-background rounded-xl shadow-xl overflow-hidden relative",
                                plan.isHighlighted
                                    ? "border-2 border-navy-900 dark:border-blue-500"
                                    : "border border-border",
                                plans.length === 2 && !plan.isHighlighted && "lg:col-span-5",
                                plans.length === 2 && plan.isHighlighted && "lg:col-span-7"
                            )}
                            initial={{ opacity: 0, x: plan.isHighlighted ? 50 : -50 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.5, delay: 0.2 + index * 0.1 }}
                        >
                            {plan.badge && plan.isHighlighted && (
                                <div className="absolute top-0 right-0 bg-navy-900 dark:bg-blue-600 text-white text-[10px] font-bold px-3 py-1 rounded-bl-lg uppercase tracking-widest">
                                    {plan.badge}
                                </div>
                            )}

                            <div className="p-6 border-b border-border flex justify-between items-center">
                                <div>
                                    <h2 className="text-2xl font-bold text-navy-900 dark:text-blue-400">{plan.name}</h2>
                                    {plan.subtitle && (
                                        <p className="text-slate-500 text-sm">{plan.subtitle}</p>
                                    )}
                                </div>
                                {plan.badge && !plan.isHighlighted && (
                                    <span className="px-3 py-1 bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 text-xs font-semibold rounded-full uppercase tracking-wider">
                                        {plan.badge}
                                    </span>
                                )}
                            </div>

                            <div className="p-6 space-y-6">
                                {/* Price display for non-highlighted plans */}
                                {!plan.isHighlighted && (
                                    <div className="mb-6">
                                        <div className="flex items-baseline">
                                            <span className="text-4xl font-bold text-foreground">{plan.price}</span>
                                            {plan.period && (
                                                <span className="text-slate-500 ml-2">/{plan.period}</span>
                                            )}
                                        </div>
                                    </div>
                                )}

                                {/* Specs highlight for highlighted plans */}
                                {plan.isHighlighted && plan.specs && plan.specs.length > 0 && (
                                    <div className="bg-slate-100 dark:bg-slate-800 p-6 rounded-lg border-l-4 border-navy-900 dark:border-blue-500">
                                        <div className="flex items-start gap-4">
                                            <Sparkles className="text-navy-900 dark:text-blue-400 mt-1 w-5 h-5" />
                                            <div>
                                                <h3 className="text-xl font-bold mb-1 text-foreground">
                                                    {plan.specs[0]?.value || plan.specs[0]?.label}
                                                </h3>
                                                {plan.specs.length > 1 && (
                                                    <p className="text-slate-600 dark:text-slate-400 text-sm italic">
                                                        {plan.specs[1]?.value || plan.specs[1]?.label}
                                                    </p>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                )}

                                {/* Features table for highlighted plans */}
                                {plan.isHighlighted && plan.features && plan.features.length > 0 && (
                                    <div className="bg-slate-50 dark:bg-slate-900/50 p-4 rounded-xl">
                                        <h4 className="text-lg font-bold mb-4 flex items-center gap-2 text-foreground">
                                            <ShieldCheck className="w-5 h-5 text-green-600" />
                                            Unlimited, non-restrictive License.
                                        </h4>
                                        <div className="overflow-hidden rounded-lg border border-border">
                                            <table className="w-full text-left text-sm">
                                                <thead className="bg-navy-900 text-white">
                                                    <tr>
                                                        <th className="px-4 py-3 font-semibold uppercase tracking-wider text-xs w-1/2">Item</th>
                                                        <th className="px-4 py-3 font-semibold uppercase tracking-wider text-xs">Included Services</th>
                                                    </tr>
                                                </thead>
                                                <tbody className="divide-y divide-border bg-background">
                                                    {plan.features.map((feature, i) => (
                                                        <tr key={i} className="even:bg-slate-100/50 dark:even:bg-slate-800/30">
                                                            <td className="px-4 py-3 font-medium text-slate-700 dark:text-slate-300">
                                                                {getFeatureLabel(feature)}
                                                            </td>
                                                            <td className="px-4 py-3">
                                                                {renderFeatureValue(feature)}
                                                            </td>
                                                        </tr>
                                                    ))}
                                                </tbody>
                                            </table>
                                        </div>
                                    </div>
                                )}

                                {/* Specs table for non-highlighted plans */}
                                {!plan.isHighlighted && plan.specs && plan.specs.length > 0 && (
                                    <div className="overflow-hidden rounded-lg border border-border">
                                        <table className="w-full text-left text-sm">
                                            <thead className="bg-navy-900 text-white">
                                                <tr>
                                                    <th className="px-4 py-3 font-semibold uppercase tracking-wider text-xs">Item</th>
                                                    <th className="px-4 py-3 font-semibold uppercase tracking-wider text-xs">Configuration</th>
                                                </tr>
                                            </thead>
                                            <tbody className="divide-y divide-border bg-slate-50 dark:bg-slate-900/20">
                                                {plan.specs.map((spec, i) => (
                                                    <tr key={i} className="even:bg-slate-100/50 dark:even:bg-slate-800/30">
                                                        <td className="px-4 py-3 font-medium text-slate-700 dark:text-slate-300">
                                                            {spec.label || spec.l}
                                                        </td>
                                                        <td className="px-4 py-3 font-mono text-xs text-slate-600 dark:text-slate-400">
                                                            {spec.value || spec.r}
                                                        </td>
                                                    </tr>
                                                ))}
                                            </tbody>
                                        </table>
                                    </div>
                                )}

                                {/* Simple features list for non-highlighted plans with features but no specs */}
                                {!plan.isHighlighted && plan.features && plan.features.length > 0 && (!plan.specs || plan.specs.length === 0) && (
                                    <ul className="space-y-3">
                                        {plan.features.map((feature, i) => (
                                            <li key={i} className="flex items-start gap-2 text-slate-600 dark:text-slate-400">
                                                <span className="text-green-500 mt-0.5">✓</span>
                                                <span>
                                                    {typeof feature === "string"
                                                        ? feature
                                                        : `${getFeatureLabel(feature)}${getFeatureValue(feature) ? `: ${getFeatureValue(feature)}` : ""}`
                                                    }
                                                </span>
                                            </li>
                                        ))}
                                    </ul>
                                )}

                                <Button
                                    onClick={() => { window.location.href = plan.ctaLink || "/contact-us" }}
                                    className={cn(
                                        "w-full",
                                        plan.isHighlighted
                                            ? "py-6 text-sm font-bold uppercase tracking-widest bg-navy-900 text-white hover:bg-navy-800"
                                            : "mt-8"
                                    )}
                                    variant={plan.isHighlighted ? "default" : "outline"}
                                    size={plan.isHighlighted ? "default" : "lg"}
                                >
                                    {plan.ctaText || "Get Started"}
                                </Button>
                            </div>
                        </motion.div>
                    ))}
                </div>

                <footer className="mt-20 border-t border-border pt-10 text-center">
                    <div className="flex flex-col md:flex-row justify-center items-center gap-8 text-slate-500 dark:text-slate-400 text-sm">
                        <span className="flex items-center gap-2 font-medium">Global Infrastructure</span>
                        <span className="flex items-center gap-2 font-medium">Enterprise Grade Security</span>
                        <span className="flex items-center gap-2 font-medium">24/7 Priority Support</span>
                    </div>
                </footer>
            </main>
        </div>
    );
}
