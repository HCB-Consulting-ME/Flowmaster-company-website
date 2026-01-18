"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
    NavigationMenu,
    NavigationMenuContent,
    NavigationMenuItem,
    NavigationMenuLink,
    NavigationMenuList,
    NavigationMenuTrigger,
    navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import {
    Sheet,
    SheetContent,
    SheetTrigger,
    SheetTitle,
} from "@/components/ui/sheet";
import Image from "next/image";

interface SiteSettings {
    logoImage: string;
    companyName: string;
}

const routes = [
    { label: "Platform", href: "/platform" },
    { label: "Solutions", href: "/solutions" },
    { label: "Pricing", href: "/pricing" },
    {
        label: "Company",
        children: [
            {
                label: "Our Company",
                href: "/company",
                description: "Learn about our mission."
            },
            {
                label: "Partners",
                href: "/partners",
                description: "Explore our global network."
            },
            {
                label: "Careers",
                href: "/careers",
                description: "Join our team."
            },
            {
                label: "Contact",
                href: '/contact-us',
                description: "Get in touch with our support."
            }
        ],
    },
];

export function Navbar() {
    const [isScrolled, setIsScrolled] = React.useState(false);
    const [isOpen, setIsOpen] = React.useState(false);
    const [settings, setSettings] = React.useState<SiteSettings>({
        logoImage: "/Logo/newLogo.png",
        companyName: "FlowMaster",
    });
    const pathname = usePathname();

    React.useEffect(() => {
        const fetchSettings = async () => {
            try {
                const res = await fetch("/api/public/settings");
                if (res.ok) {
                    const data = await res.json();
                    setSettings({
                        logoImage: data.logoImage || "/Logo/newLogo.png",
                        companyName: data.companyName || "FlowMaster",
                    });
                }
            } catch (error) {
                console.error("Failed to fetch settings:", error);
            }
        };
        fetchSettings();
    }, []);

    React.useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 10);
        };
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    return (
        <header
            className={cn(
                "fixed top-0 w-full z-50 transition-all duration-300 border-b border-transparent",
                isScrolled
                    ? "bg-slate-950/80 backdrop-blur-md border-white/10 shadow-md py-2"
                    : "bg-transparent py-4"
            )}
        >
            <nav className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
                <Link href="/" className="hover:opacity-90 transition-opacity">
                    <Image src={settings.logoImage} alt={`${settings.companyName} Logo`} width={180} height={40} priority />
                </Link>

                {/* Desktop Navigation */}
                <div className="hidden md:flex items-center space-x-8">
                    {routes.map((route) => (
                        route.children ? (
                            <NavigationMenu key={route.label} className="relative" viewportClassName="right-0 left-auto">
                                <NavigationMenuList>
                                    <NavigationMenuItem>
                                        <NavigationMenuTrigger className={cn(
                                            "bg-transparent cursor-pointer hover:bg-transparent focus:bg-transparent data-[state=open]:bg-transparent data-[active]:bg-transparent font-medium",
                                            "text-slate-300 hover:text-white focus:text-white",
                                            pathname.startsWith(route.href || '/company') && "text-white font-bold"
                                        )}>
                                            {route.label}
                                        </NavigationMenuTrigger>
                                        <NavigationMenuContent className="bg-slate-900 border-slate-700 shadow-2xl">
                                            <ul className="grid w-[250px] gap-2 p-4">
                                                {route.children.map((child) => (
                                                    <li key={child.href}>
                                                        <NavigationMenuLink asChild>
                                                            <Link
                                                                href={child.href}
                                                                className={cn(
                                                                    "block cursor-pointer select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-slate-800 hover:text-white focus:bg-slate-800",
                                                                    pathname === child.href && "bg-slate-800"
                                                                )}
                                                            >
                                                                <div className="text-sm font-semibold text-slate-100">
                                                                    {child.label}
                                                                </div>
                                                                <p className="line-clamp-2 text-xs leading-snug text-slate-400">
                                                                    {child.description}
                                                                </p>
                                                            </Link>
                                                        </NavigationMenuLink>
                                                    </li>
                                                ))}
                                            </ul>
                                        </NavigationMenuContent>
                                    </NavigationMenuItem>
                                </NavigationMenuList>
                            </NavigationMenu>
                        ) : (
                            <Link
                                key={route.href}
                                href={route.href!}
                                className={cn(
                                    navigationMenuTriggerStyle(),
                                    "bg-transparent hover:bg-transparent focus:bg-transparent hover:text-white focus:text-white data-[active]:bg-transparent",
                                    pathname === route.href ? "text-white font-bold" : "text-slate-300"
                                )}
                            >
                                {route.label}
                            </Link>
                        )
                    ))}
                </div>

                {/* Mobile Navigation */}
                <div className="md:hidden">
                    <Sheet open={isOpen} onOpenChange={setIsOpen}>
                        <SheetTrigger asChild>
                            <Button variant="ghost" size="icon" className="text-white hover:bg-white/10">
                                <Menu className="w-6 h-6" />
                            </Button>
                        </SheetTrigger>
                        <SheetContent side="right" className="bg-slate-950 border-l-slate-800 text-white w-[300px]">
                            <SheetTitle className="sr-only">Mobile Menu</SheetTitle>
                            <div className="flex flex-col space-y-8 mt-10">
                                <div className="flex flex-col space-y-4">
                                    {routes.map((route) => {
                                        if (route.children) {
                                            return (
                                                <div key={route.label} className="space-y-2">
                                                    <h4 className="font-semibold text-slate-400 text-sm uppercase tracking-wider">{route.label}</h4>
                                                    <div className="pl-4 border-l border-slate-800 flex flex-col space-y-3">
                                                        {route.children.map(child => (
                                                            <Link
                                                                key={child.href}
                                                                href={child.href}
                                                                onClick={() => setIsOpen(false)}
                                                                className={cn(
                                                                    "text-base hover:text-white transition-colors",
                                                                    pathname === child.href ? "text-white font-bold" : "text-slate-300"
                                                                )}
                                                            >
                                                                {child.label}
                                                            </Link>
                                                        ))}
                                                    </div>
                                                </div>
                                            )
                                        }
                                        return (
                                            <Link
                                                key={route.href}
                                                href={route.href!}
                                                onClick={() => setIsOpen(false)}
                                                className={cn(
                                                    "text-lg font-medium transition-colors hover:text-white",
                                                    pathname === route.href ? "text-white" : "text-slate-400"
                                                )}
                                            >
                                                {route.label}
                                            </Link>
                                        );
                                    })}
                                    {/* <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white mt-4 font-bold">
                                        Get Started
                                    </Button> */}
                                </div>
                            </div>
                        </SheetContent>
                    </Sheet>
                </div>
            </nav>
        </header>
    );
}