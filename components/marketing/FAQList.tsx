'use client';

import { useState } from 'react';
import { Plus, Minus } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export function FAQList({ faqs }: { faqs: any[] }) {
    const [openIndex, setOpenIndex] = useState<number | null>(0);

    return (
        <div className="space-y-4">
            {faqs.map((faq, index) => (
                <div
                    key={faq.id}
                    className={`group rounded-2xl border transition-all duration-300 ${openIndex === index
                        ? 'bg-white/10 border-violet-500/30 shadow-lg shadow-violet-500/10'
                        : 'bg-white/5 border-white/10 hover:border-white/20'
                        }`}
                >
                    <button
                        onClick={() => setOpenIndex(openIndex === index ? null : index)}
                        className="w-full text-left p-6 flex justify-between items-center gap-4"
                    >
                        <span className={`text-lg font-medium transition-colors ${openIndex === index ? 'text-white' : 'text-gray-300 group-hover:text-white'
                            }`}>
                            {faq.question}
                        </span>
                        <div className={`p-2 rounded-full transition-colors ${openIndex === index ? 'bg-violet-600 text-white' : 'bg-white/10 text-gray-600 dark:text-gray-400 group-hover:bg-white/20'
                            }`}>
                            {openIndex === index ? <Minus className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
                        </div>
                    </button>

                    <AnimatePresence>
                        {openIndex === index && (
                            <motion.div
                                initial={{ height: 0, opacity: 0 }}
                                animate={{ height: 'auto', opacity: 1 }}
                                exit={{ height: 0, opacity: 0 }}
                                transition={{ duration: 0.3, ease: 'easeInOut' }}
                                className="overflow-hidden"
                            >
                                <div className="p-6 pt-0 text-gray-600 dark:text-gray-400 leading-relaxed border-t border-white/5 mx-6 mt-2">
                                    {faq.answer}
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            ))}
        </div>
    );
}
