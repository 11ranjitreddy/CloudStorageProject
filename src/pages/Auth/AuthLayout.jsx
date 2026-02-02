import { Outlet, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Cloud, Shield, Zap } from 'lucide-react';

const AuthLayout = () => {
    return (
        <div className="min-h-screen w-full flex bg-surface-50 dark:bg-surface-950">
            {/* Left Side - Visual */}
            <div className="hidden lg:flex lg:w-1/2 relative overflow-hidden bg-primary-600 dark:bg-primary-900 items-center justify-center p-12">
                <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=2564&auto=format&fit=crop')] bg-cover bg-center opacity-20 mix-blend-overlay"></div>
                <div className="absolute inset-0 bg-gradient-to-br from-primary-600/90 to-indigo-900/90 backdrop-blur-sm"></div>

                <div className="relative z-10 max-w-lg text-white space-y-8">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                        className="flex items-center space-x-3 mb-8"
                    >
                        <div className="p-3 bg-white/10 backdrop-blur-md rounded-xl border border-white/20">
                            <Cloud size={32} className="text-white" />
                        </div>
                        <span className="text-3xl font-bold tracking-tight">CloudVault</span>
                    </motion.div>

                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                        className="text-5xl font-bold leading-tight"
                    >
                        Secure storage for your digital life.
                    </motion.h1>

                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.4 }}
                        className="text-lg text-primary-100 leading-relaxed"
                    >
                        Experience the most elegant and secure way to manage your files.
                        End-to-end encryption, lightning fast sharing, and a beautiful interface designed for you.
                    </motion.p>

                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.8, delay: 0.6 }}
                        className="flex items-center space-x-8 pt-4"
                    >
                        <div className="flex items-center space-x-3">
                            <div className="p-2 bg-white/10 rounded-lg"><Shield size={20} /></div>
                            <span className="text-sm font-medium">Bank-grade Security</span>
                        </div>
                        <div className="flex items-center space-x-3">
                            <div className="p-2 bg-white/10 rounded-lg"><Zap size={20} /></div>
                            <span className="text-sm font-medium">Lightning Fast</span>
                        </div>
                    </motion.div>
                </div>
            </div>

            {/* Right Side - Form */}
            <div className="w-full lg:w-1/2 flex flex-col justify-center items-center p-8 sm:p-12 relative">
                <div className="w-full max-w-md space-y-8">
                    {/* Mobile Logo */}
                    <div className="lg:hidden flex justify-center mb-8">
                        <Link to="/" className="flex items-center space-x-2 text-primary-600 dark:text-primary-400">
                            <Cloud size={32} />
                            <span className="text-2xl font-bold">CloudVault</span>
                        </Link>
                    </div>

                    <Outlet />
                </div>

                <div className="absolute bottom-6 text-xs text-surface-400 dark:text-surface-600">
                    &copy; {new Date().getFullYear()} CloudVault Inc. All rights reserved.
                </div>
            </div>
        </div>
    );
};

export default AuthLayout;
