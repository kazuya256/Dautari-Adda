'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { Eye, EyeOff } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function AdminLogin() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const router = useRouter();

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        try {
            const res = await fetch('/api/auth/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, password }),
            });

            const data = await res.json();

            if (res.ok && data.success) {
                router.push('/admin/dashboard');
            } else {
                setError(data.message || 'Login failed');
                setLoading(false);
            }
        } catch (error) {

            setError('Something went wrong. Please try again.');
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-[#050505] flex items-center justify-center p-4 relative overflow-hidden">
            {/* Ambient Background */}
            <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
                <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-[#e3984e]/5 rounded-full blur-[120px]"></div>
                <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-[#e3984e]/5 rounded-full blur-[120px]"></div>
            </div>

            <div className="w-full max-w-md bg-[#111] border border-[#e3984e]/20 p-8 md:p-12 shadow-2xl relative z-10 backdrop-blur-sm">

                <div className="text-center mb-10">
                    <h1 className="text-4xl font-['Playfair_Display'] italic text-[#e3984e] mb-2">Dautari <span className="text-white">Admin</span></h1>
                    <p className="text-gray-500 text-xs uppercase tracking-[0.3em]">Restricted Access</p>
                </div>

                <form onSubmit={handleLogin} className="space-y-6">
                    <AnimatePresence>
                        {error && (
                            <motion.div
                                initial={{ opacity: 0, y: -10 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -10 }}
                                className="bg-red-500/10 border border-red-500/50 text-red-500 text-xs px-4 py-3 rounded text-center uppercase tracking-wider"
                            >
                                {error}
                            </motion.div>
                        )}
                    </AnimatePresence>
                    <div>
                        <label className="block text-xs uppercase tracking-widest text-gray-500 mb-2">Email Address</label>
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="w-full bg-[#0a0a0a] border border-[#333] text-white px-4 py-3 focus:outline-none focus:border-[#e3984e] transition-colors placeholder-gray-700"
                            placeholder="admin@dautari.com"
                        />
                    </div>

                    <div className="relative">
                        <label className="block text-xs uppercase tracking-widest text-gray-500 mb-2">Password</label>
                        <div className="relative">
                            <input
                                type={showPassword ? 'text' : 'password'}
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="w-full bg-[#0a0a0a] border border-[#333] text-white px-4 py-3 pr-12 focus:outline-none focus:border-[#e3984e] transition-colors placeholder-gray-700"
                                placeholder="••••••••"
                            />
                            <button
                                type="button"
                                onClick={() => setShowPassword(!showPassword)}
                                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-[#e3984e] transition-colors"
                            >
                                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                            </button>
                        </div>
                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full bg-[#e3984e] text-black font-bold uppercase tracking-widest py-4 hover:bg-[#c68e17] transition-all disabled:opacity-50 disabled:cursor-not-allowed mt-4"
                    >
                        {loading ? 'Authenticating...' : 'Enter Dashboard'}
                    </button>
                </form>

                <div className="mt-8 text-center">
                    <Link href="/" className="text-xs text-gray-600 hover:text-[#e3984e] transition-colors">
                        ← Back to Website
                    </Link>
                </div>
            </div>
        </div>
    );
}
