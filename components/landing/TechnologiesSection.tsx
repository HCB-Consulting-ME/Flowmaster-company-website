import React from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';

const TechnologyItem = ({ name, short }: { name: string, short?: string }) => (
    <div className="flex items-center justify-center px-4 py-2 grayscale opacity-70 hover:grayscale-0 hover:opacity-100 transition-all duration-300">
        <span className="text-lg md:text-xl font-bold text-slate-700 dark:text-slate-300 whitespace-nowrap">
            {name}
        </span>
    </div>
);

const TechnologiesSection = () => {
    const technologies = [
        "FlowMaster SDX",
        "FlowMaster DXG",
        "FlowMaster BAC",
        "MCP",
        "A2A",
        "Agent Skills",
        "Claude",
        "Grok",
        "ChatGPT",
        "DeepSeek",
        "Gemini",
        "LLaMA"
    ];

    return (
        <section className="py-16 bg-background border-b border-slate-100 dark:border-slate-800">
            <div className="max-w-7xl mx-auto px-6">

                {/* Header with lines */}
                <div className="flex items-center justify-center mb-12">
                    <div className="h-[1px] bg-slate-200 dark:bg-slate-700 w-12 md:w-32 lg:w-48"></div>
                    <span className="px-6 text-sm md:text-base font-bold text-navy-900 uppercase">
                        Technologies
                    </span>
                    <div className="h-[1px] bg-slate-200 dark:bg-slate-700 w-12 md:w-32 lg:w-48"></div>
                </div>

                {/* Tech Grid */}
                <div className="flex flex-wrap justify-center gap-x-8 gap-y-8 justify-between items-center">
                    <Image src='/technologies/tech1.png' alt="Technology 1" width={1000} height={1000} />
                    <Image src='/technologies/tech2.png' alt="Technology 2" width={1000} height={1000} />

                    {/* <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-8 w-full items-center justify-items-center">
                        {technologies.map((tech, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 10 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.5, delay: index * 0.05 }}
                                viewport={{ once: true }}
                                className='cursor-pointer'
                            >
                                <TechnologyItem name={tech} />
                            </motion.div>
                        ))}
                    </div> */}
                </div>
            </div>
        </section>
    );
};

export default TechnologiesSection;
