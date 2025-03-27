'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Log } from 'contentlayer/generated';

interface LogCardProps {
    logs: Log[];
    day: number;
    className?: string;
}

export default function LogCard({ logs, day, className = '' }: LogCardProps) {
    const [currentIndex, setCurrentIndex] = useState(0);
    const currentLog = logs[currentIndex];

    const navigate = (direction: 'next' | 'prev') => {
        setCurrentIndex(prev => {
            if (direction === 'next') {
                return prev === logs.length - 1 ? 0 : prev + 1;
            } else {
                return prev === 0 ? logs.length - 1 : prev - 1;
            }
        });
    };

    return (
        <div className={`relative ${className}`}>
            <div className="flex items-center gap-2 mb-3">
                <div className="flex items-center gap-2">
                    <span className="text-sm font-semibold text-[#FF6F61]">Day {day}</span>
                    {logs.length > 1 && (
                        <span className="text-xs bg-[#FF6F61]/10 text-[#FF6F61] px-2 py-0.5 rounded-full">
                            {logs.length} updates
                        </span>
                    )}
                </div>

                {/* Navigation dots for multiple logs */}
                {logs.length > 1 && (
                    <div className="flex gap-2 ml-auto">
                        {logs.map((_, index) => (
                            <button
                                key={index}
                                onClick={() => setCurrentIndex(index)}
                                className={`w-3 h-3 rounded-full transition-all duration-300 ${index === currentIndex
                                    ? 'bg-[#98F7CF] scale-125 ring-2 ring-[#98F7CF]/20'
                                    : 'bg-gray-200 hover:bg-[#98F7CF]/50 hover:scale-110'
                                    }`}
                                aria-label={`Go to update ${index + 1}`}
                            />
                        ))}
                    </div>
                )}
            </div>

            {/* Log content with animations */}
            <div className="relative">
                <AnimatePresence mode="wait">
                    <motion.div
                        key={currentIndex}
                        initial={{ opacity: 0, x: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, x: -10 }}
                        transition={{ duration: 0.2 }}
                    >
                        <div className="bg-white rounded-lg border border-gray-100 p-5 shadow-sm hover:shadow-md transition-shadow">
                            <h3 className="font-medium text-slate-800 mb-3 text-lg">
                                {currentLog.title}
                            </h3>
                            <p className="text-gray-600 text-sm leading-relaxed">
                                {currentLog.progress}
                            </p>
                            {currentLog.challenges && currentLog.challenges.length > 0 && (
                                <div className="mt-4 pt-4 border-t border-gray-100">
                                    <h4 className="text-xs font-medium text-[#FF6F61] mb-2">Challenges:</h4>
                                    <ul className="space-y-2">
                                        {currentLog.challenges.map((challenge, i) => (
                                            <li
                                                key={i}
                                                className="text-sm text-gray-600 flex items-start gap-2"
                                            >
                                                <span className="w-1.5 h-1.5 rounded-full bg-[#FF6F61]/20 mt-1.5 flex-shrink-0" />
                                                {challenge}
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            )}
                        </div>
                    </motion.div>
                </AnimatePresence>

                {/* Navigation arrows for multiple logs */}
                {logs.length > 1 && (
                    <>
                        <button
                            onClick={() => navigate('prev')}
                            className="absolute -left-3 top-1/2 -translate-y-1/2 p-1.5 rounded-full bg-white border border-gray-200 
                            shadow-sm hover:shadow-md transition-all hover:border-[#FF6F61]/30 group"
                            aria-label="Previous update"
                        >
                            <ChevronLeft className="w-4 h-4 text-gray-400 group-hover:text-[#FF6F61]" />
                        </button>
                        <button
                            onClick={() => navigate('next')}
                            className="absolute -right-3 top-1/2 -translate-y-1/2 p-1.5 rounded-full bg-white border border-gray-200 
                            shadow-sm hover:shadow-md transition-all hover:border-[#FF6F61]/30 group"
                            aria-label="Next update"
                        >
                            <ChevronRight className="w-4 h-4 text-gray-400 group-hover:text-[#FF6F61]" />
                        </button>
                    </>
                )}
            </div>
        </div>
    );
} 