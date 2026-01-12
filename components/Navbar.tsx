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
} from "@/components/ui/sheet";
import { ChevronDown } from "lucide-react";
import Image from "next/image";

const routes = [
    { label: "Platform", href: "/platform" },
    {
        label: "Company",
        children: [
            { label: "Our Company", href: "/company" },
            { label: "Partners", href: "/partners" },
            { label: "Careers", href: "/careers" },
        ],
    },
    // {
    //     label: "Solutions",
    //     children: [
    //     ],
    // },
    { label: "Solutions", href: "/solutions" },
    { label: "Pricing", href: "/pricing" },
    { label: "Contact Us", href: "/contact-us" },
];

export function Navbar() {
    const [isScrolled, setIsScrolled] = React.useState(false);
    const [isOpen, setIsOpen] = React.useState(false);
    const pathname = usePathname();

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
                    ? "bg-darkbg dark:bg-black/80 backdrop-blur-md border-white/10 shadow-md py-2"
                    : "bg-transparent py-4"
            )}
        >
            <nav className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
                <Link href="/" className="hover:opacity-90 transition-opacity">
                    {/* <Logo /> */}
                    <Image src="/logo/newLogo.png" alt="Flowmaster Logo" width={220} height={220} />
                </Link>

                {/* Desktop Navigation */}
                <div className="hidden md:flex items-center space-x-8">
                    <NavigationMenu>
                        <NavigationMenuList>
                            {routes.map((route) => (
                                <NavigationMenuItem key={route.label}>
                                    {route.children ? (
                                        <>
                                            <NavigationMenuTrigger className="bg-transparent cursor-pointer text-slate-300 hover:text-white hover:bg-transparent focus:bg-transparent focus:text-white data-[state=open]:bg-transparent data-[active]:bg-transparent font-medium">
                                                {route.label}
                                            </NavigationMenuTrigger>
                                            <NavigationMenuContent className="bg-navy-900 border-slate-700">
                                                <ul className="grid w-[250px] cursor-pointer gap-2 p-4">
                                                    {route.children.map((child) => (
                                                        <li key={child.href}>
                                                            <NavigationMenuLink asChild>
                                                                <Link
                                                                    href={child.href}
                                                                    className={cn(
                                                                        "block cursor-pointer select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-slate-800 hover:text-accent-foreground focus:bg-slate-800 focus:text-accent-foreground",
                                                                        pathname === child.href && "bg-slate-800"
                                                                    )}
                                                                >
                                                                    <div className={cn("text-sm font-medium leading-none text-slate-200", pathname === child.href && "text-white")}>{child.label}</div>
                                                                    <p className="line-clamp-2 text-sm leading-snug text-slate-400">
                                                                        {/* Placeholder description logic could go here if we had it */}
                                                                        Explore our {child.label}
                                                                    </p>
                                                                </Link>
                                                            </NavigationMenuLink>
                                                        </li>
                                                    ))}
                                                </ul>
                                            </NavigationMenuContent>
                                        </>
                                    ) : (
                                        <Link href={route.href} passHref>
                                            <NavigationMenuLink
                                                className={cn(
                                                    navigationMenuTriggerStyle(),
                                                    "bg-transparent hover:bg-transparent focus:bg-transparent hover:text-white focus:text-white data-[active]:bg-transparent",
                                                    pathname === route.href ? "text-white font-bold" : "text-slate-300"
                                                )}
                                            >
                                                {route.label}
                                            </NavigationMenuLink>
                                        </Link>
                                    )}
                                </NavigationMenuItem>
                            ))}
                        </NavigationMenuList>
                    </NavigationMenu>

                    {/* <Button className="bg-white text-navy-900 font-bold hover:bg-slate-100 shadow-lg ml-4">
                        Request Briefing
                    </Button> */}
                </div>

                {/* Mobile Navigation */}
                <div className="md:hidden">
                    <Sheet open={isOpen} onOpenChange={setIsOpen}>
                        <SheetTrigger asChild>
                            <Button variant="ghost" size="icon" className="text-white hover:bg-white/10">
                                <Menu className="w-6 h-6" />
                            </Button>
                        </SheetTrigger>
                        <SheetContent side="right" className="bg-navy-900/95 border-l-slate-700 text-white w-[300px]">
                            <div className="flex flex-col space-y-8 mt-10">
                                {/* <Logo textSize="text-xl" /> */}
                                <div className="flex flex-col space-y-4">
                                    {routes.map((route) => {
                                        if (route.children) {
                                            return (
                                                <div key={route.label} className="space-y-2">
                                                    <h4 className="font-semibold text-primary">{route.label}</h4>
                                                    <div className="pl-4 border-l border-slate-700 flex flex-col space-y-2">
                                                        {route.children.map(child => (
                                                            <Link
                                                                key={child.href}
                                                                href={child.href}
                                                                onClick={() => setIsOpen(false)}
                                                                className="text-slate-300 hover:text-white text-sm"
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
                                                    "text-lg font-medium transition-colors hover:text-primary",
                                                    pathname === route.href ? "text-primary" : "text-slate-200"
                                                )}
                                            >
                                                {route.label}
                                            </Link>
                                        );
                                    })}
                                    <Button className="w-full bg-primary text-white mt-4 font-bold">
                                        Request Briefing
                                    </Button>
                                </div>
                            </div>
                        </SheetContent>
                    </Sheet>
                </div>
            </nav>
        </header>
    );
}
