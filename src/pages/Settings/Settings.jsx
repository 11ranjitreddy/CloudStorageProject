import DashboardLayout from '../../components/Layout/DashboardLayout';
import { User, Bell, Shield, Cloud, CreditCard, ChevronRight, Save } from 'lucide-react';
import { motion } from 'framer-motion';

const Settings = () => {
    const sections = [
        { id: 'profile', name: 'Profile Information', icon: User, desc: 'Update your personal details and public profile' },
        { id: 'notifications', name: 'Notifications', icon: Bell, desc: 'Manage how you receive alerts and updates' },
        { id: 'security', name: 'Security', icon: Shield, desc: 'Manage passwords and account authentication' },
        { id: 'storage', name: 'Storage Plan', icon: Cloud, desc: 'View usage and upgrade your current plan' },
        { id: 'billing', name: 'Billing', icon: CreditCard, desc: 'Manage payment methods and view history' },
    ];

    return (
        <DashboardLayout>
            <div className="max-w-4xl mx-auto space-y-8">
                <header>
                    <h1 className="text-2xl font-bold text-surface-900 dark:text-white">Settings</h1>
                    <p className="text-surface-500 dark:text-surface-400 mt-1">Customize your experience and manage your account.</p>
                </header>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    <nav className="space-y-2">
                        {sections.map((section) => (
                            <button
                                key={section.id}
                                className={`w-full flex items-center justify-between px-4 py-3 rounded-xl transition-all ${section.id === 'profile' ? 'bg-primary-50 text-primary-600 dark:bg-primary-900/20 dark:text-primary-400' : 'text-surface-600 dark:text-surface-400 hover:bg-surface-100 dark:hover:bg-surface-800'
                                    }`}
                            >
                                <div className="flex items-center space-x-3">
                                    <section.icon size={18} />
                                    <span className="text-sm font-semibold">{section.name}</span>
                                </div>
                                <ChevronRight size={16} className={section.id === 'profile' ? 'opacity-100' : 'opacity-0'} />
                            </button>
                        ))}
                    </nav>

                    <div className="md:col-span-2 space-y-6">
                        <motion.div
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            className="card p-6 space-y-6"
                        >
                            <div className="flex items-center space-x-4">
                                <div className="w-16 h-16 bg-primary-100 dark:bg-primary-900/30 rounded-2xl flex items-center justify-center text-2xl font-bold text-primary-600">
                                    JD
                                </div>
                                <div>
                                    <h3 className="font-bold text-surface-900 dark:text-white">John Doe</h3>
                                    <p className="text-sm text-surface-500">Premium Plan • Member since 2024</p>
                                    <button className="text-xs font-bold text-primary-600 hover:text-primary-500 mt-1 uppercase tracking-wider">Change Avatar</button>
                                </div>
                            </div>

                            <div className="grid grid-cols-1 gap-4">
                                <div>
                                    <label className="block text-xs font-bold text-surface-500 uppercase mb-1.5">Full Name</label>
                                    <input type="text" className="input-field" defaultValue="John Doe" />
                                </div>
                                <div>
                                    <label className="block text-xs font-bold text-surface-500 uppercase mb-1.5">Email Address</label>
                                    <input type="email" className="input-field" defaultValue="john@example.com" />
                                </div>
                                <div>
                                    <label className="block text-xs font-bold text-surface-500 uppercase mb-1.5">Job Title</label>
                                    <input type="text" className="input-field" defaultValue="Product Designer" />
                                </div>
                            </div>

                            <div className="pt-4 border-t border-surface-200 dark:border-surface-800 flex justify-end">
                                <button className="btn-primary flex items-center space-x-2">
                                    <Save size={18} />
                                    <span>Save Changes</span>
                                </button>
                            </div>
                        </motion.div>

                        <div className="card p-6 bg-red-50 dark:bg-red-900/5 border-red-200 dark:border-red-900/30">
                            <h4 className="font-bold text-red-600 dark:text-red-400 flex items-center space-x-2">
                                <Shield size={18} />
                                <span>Security Alert</span>
                            </h4>
                            <p className="text-sm text-red-600/80 dark:text-red-400/80 mt-2">
                                You haven't updated your password in over 6 months. We recommend changing it for better security.
                            </p>
                            <button className="text-xs font-bold text-red-600 dark:text-red-400 mt-3 uppercase tracking-wider hover:underline">Change Password Now</button>
                        </div>
                    </div>
                </div>
            </div>
        </DashboardLayout>
    );
};

export default Settings;
