"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";

interface TextScrambleProps {
    text: string;
    className?: string;
    trigger?: boolean;
}

const CHARACTERS = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()_+";

export const TextScramble = ({ text, className, trigger = true }: TextScrambleProps) => {
    const [displayText, setDisplayText] = useState(text);
    const [isScrambling, setIsScrambling] = useState(false);

    useEffect(() => {
        if (!trigger) return;

        let iterations = 0;
        setIsScrambling(true);

        const interval = setInterval(() => {
            setDisplayText((currentText) =>
                currentText
                    .split("")
                    .map((char, index) => {
                        if (index < iterations) {
                            return text[index];
                        }
                        return CHARACTERS[Math.floor(Math.random() * CHARACTERS.length)];
                    })
                    .join("")
            );

            if (iterations >= text.length) {
                clearInterval(interval);
                setIsScrambling(false);
            }

            iterations += 1 / 3;
        }, 30);

        return () => clearInterval(interval);
    }, [text, trigger]);

    return (
        <motion.span className={className} layout>
            {displayText}
        </motion.span>
    );
};
