'use client'
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ShieldAlert, Home, ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function NotFound() {
    return (
        <div className="min-h-screen bg-navy-900 flex flex-col items-center justify-center p-4 font-sans overflow-hidden relative text-white">

            {/* Background Decorative Element */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,#1e293b_0%,#020617_100%)]"></div>
            <div className="absolute inset-0 z-0 opacity-20 pointer-events-none">
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-blue-500 rounded-full blur-[120px]" />
            </div>

            <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
                className="z-10 text-center max-w-md w-full"
            >
                {/* Animated Icon Container */}
                <div className="mb-8 flex justify-center">
                    <div className="relative">
                        <div className="absolute inset-0 bg-blue-500/20 rounded-full blur-2xl animate-pulse" />
                        <div className="relative bg-slate-900 border-2 border-blue-500/30 p-6 rounded-3xl shadow-2xl">
                            <ShieldAlert className="w-16 h-16 text-blue-400" />
                        </div>
                    </div>
                </div>

                {/* Error Messaging */}
                <h1 className="text-6xl font-black text-white mb-2 tracking-tighter">
                    404
                </h1>
                <h2 className="text-xl font-bold text-blue-100 uppercase tracking-widest mb-4">
                    Route Not Found
                </h2>
                <p className="text-slate-400 text-sm leading-relaxed mb-10 px-4">
                    The process foundation you are looking for has been moved or does not exist in the current SDX Protocol.
                </p>

                {/* Action Buttons */}
                <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                    <Button
                        asChild
                        className="bg-blue-600 hover:bg-blue-500 text-white rounded-full font-bold shadow-[0_0_20px_rgba(37,99,235,0.4)] h-auto py-3 px-6"
                    >
                        <Link href="/" className="flex items-center gap-2">
                            <Home className="w-4 h-4" />
                            Return Home
                        </Link>
                    </Button>

                    <Button
                        variant="outline"
                        onClick={() => window.history.back()}
                        className="border-slate-700 hover:border-blue-500/50 text-black hover:text-blue-100 hover:bg-slate-800 rounded-full font-bold h-auto py-3 px-6"
                    >
                        <ArrowLeft className="w-4 h-4 mr-2" />
                        Go Back
                    </Button>
                </div>
            </motion.div>

            {/* Footer Branding */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 0.3 }}
                transition={{ delay: 0.5, duration: 1 }}
                className="mt-20 opacity-30 z-10"
            >
                <p className="text-[10px] text-blue-200 uppercase tracking-[0.3em] font-light">
                    FlowMaster Enterprise Governance
                </p>
            </motion.div>
        </div>
    );
}