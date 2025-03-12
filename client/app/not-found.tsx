"use client";
import Link from "next/link";
import { ArrowLeftCircle } from "lucide-react";
import { motion } from "framer-motion";
import { useState, useEffect } from "react";

// Array of Legal Advice (India Specific)
const legalAdvices = [
    "Under Article 21 of the Indian Constitution, you have the Right to Life and Personal Liberty.",
    "Police cannot detain you for more than 24 hours without presenting you before a magistrate (Article 22).",
    "Verbal abuse in public places can be considered a punishable offense under IPC Section 294.",
    "Buying or renting a property? Always verify the legal ownership documents to avoid fraud.",
    "In India, it is illegal to demand or give dowry under the Dowry Prohibition Act, 1961.",
    "A woman can lodge an FIR at any police station, regardless of the jurisdiction (Zero FIR concept).",
    "You have the right to free legal aid if you cannot afford a lawyer (Article 39A).",
    "If an employer denies maternity leave, it violates the Maternity Benefit Act, 1961.",
    "Landlord-tenant disputes? The Rent Control Act protects tenants from unfair eviction.",
    "Online scams are punishable under the IT Act, 2000. Always report cyber fraud to cybercrime.gov.in.",
];

export default function NotFoundPage() {
    const [randomAdvice, setRandomAdvice] = useState("");

    useEffect(() => {
        // Check if advice is already stored in session storage
        let storedAdvice = sessionStorage.getItem("legalAdvice");

        if (!storedAdvice) {
            // Select a new random legal advice
            const newAdvice = legalAdvices[Math.floor(Math.random() * legalAdvices.length)];
            setRandomAdvice(newAdvice);
            sessionStorage.setItem("legalAdvice", newAdvice); // Store in session storage
        } else {
            setRandomAdvice(storedAdvice);
        }
    }, []);

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900 text-white overflow-hidden">
            {/* Animated 404 Text */}
            <motion.h1
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                className="text-9xl font-extrabold tracking-widest text-gray-100"
            >
                404
            </motion.h1>

            {/* Animated Divider */}
            <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5, duration: 0.6 }}
                className="bg-blue-500 px-3 py-1 text-lg font-semibold rounded-md mt-2"
            >
                Page Not Found
            </motion.div>

            {/* Animated Description */}
            <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.7, duration: 0.6 }}
                className="mt-4 text-gray-400 text-lg max-w-lg text-center"
            >
                Oops! The page you are looking for does not exist or has been moved.
            </motion.p>

            {/* Legal Advice Tip (Remains Same Until a New Wrong Page Visit) */}
            {randomAdvice && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1.2, duration: 0.8 }}
                    className="mt-6 text-center text-gray-300 bg-gray-800 px-6 py-3 rounded-lg max-w-md shadow-md"
                >
                    <strong className="text-blue-400">Did You Know?</strong>
                    <p className="mt-2">{randomAdvice}</p>
                </motion.div>
            )}

            {/* Animated Home Button */}
            <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 1.5, duration: 0.5 }}
            >
                <Link
                    href="/"
                    className="mt-6 flex items-center gap-2 px-6 py-3 bg-blue-600 text-white text-lg font-semibold rounded-lg shadow-md hover:bg-blue-500 transition-all"
                >
                    <ArrowLeftCircle size={24} />
                    Go Home
                </Link>
            </motion.div>
        </div>
    );
}
