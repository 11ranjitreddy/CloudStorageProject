import DashboardLayout from '../../components/Layout/DashboardLayout';
import {
    FileText,
    Image as ImageIcon,
    Video,
    MoreHorizontal,
    Download,
    Trash2,
    ExternalLink,
    Plus
} from 'lucide-react';
import { motion } from 'framer-motion';
import { useState } from 'react';
import UploadModal from '../../components/Upload/UploadModal';

const StatCard = ({ title, value, subtext, icon: Icon, color }) => (
    <div className="card p-6 relative overflow-hidden group hover:-translate-y-1 transition-transform duration-300">
        <div className={`absolute top-0 right-0 p-3 opacity-10 group-hover:opacity-20 transition-opacity text-${color}-600`}>
            <Icon size={120} />
        </div>
        <div className="relative z-10 flex flex-col h-full justify-between">
            <div className="flex items-center justify-between mb-4">
                <div className={`p-3 rounded-2xl bg-${color}-50 dark:bg-${color}-900/20 text-${color}-600 dark:text-${color}-400 ring-1 ring-${color}-100 dark:ring-${color}-800`}>
                    <Icon size={24} />
                </div>
                <span className={`text-xs font-bold px-2 py-1 rounded-full bg-${color}-100/50 dark:bg-${color}-900/30 text-${color}-700 dark:text-${color}-300`}>
                    +12%
                </span>
            </div>
            <div>
                <h3 className="text-3xl font-bold text-surface-900 dark:text-white tracking-tight">{value}</h3>
                <p className="text-sm text-surface-500 font-medium mt-1">{title}</p>
            </div>
            <div className="mt-4 pt-4 border-t border-surface-100 dark:border-surface-800/50">
                <p className="text-xs text-surface-400 dark:text-surface-500 flex items-center">
                    <div className={`w-1.5 h-1.5 rounded-full bg-${color}-500 mr-2`}></div>
                    {subtext}
                </p>
            </div>
        </div>
    </div>
);

const Dashboard = () => {
    const [isUploadOpen, setIsUploadOpen] = useState(false);

    const recentFiles = [
        { name: 'Project_Requirements.pdf', type: 'PDF', size: '2.4 MB', date: '2 hours ago', icon: FileText, color: 'blue' },
        { name: 'Dashboard_Final_v2.png', type: 'Image', size: '1.2 MB', date: '5 hours ago', icon: ImageIcon, color: 'purple' },
        { name: 'Product_Demo.mp4', type: 'Video', size: '45.8 MB', date: 'Yesterday', icon: Video, color: 'orange' },
    ];

    return (
        <DashboardLayout>
            <div className="max-w-7xl mx-auto space-y-8">
                <header className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div>
                        <h1 className="text-2xl font-bold text-surface-900 dark:text-white">Good morning, John!</h1>
                        <p className="text-surface-500 dark:text-surface-400 mt-1">Here's what's happening with your files today.</p>
                    </div>
                    <button
                        onClick={() => setIsUploadOpen(true)}
                        className="flex items-center space-x-2 px-6 py-3 bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-500 hover:to-indigo-500 text-white rounded-xl shadow-lg shadow-indigo-500/30 hover:shadow-indigo-500/50 hover:-translate-y-0.5 transition-all duration-300 font-medium"
                    >
                        <Plus size={20} />
                        <span>Upload Content</span>
                    </button>
                </header>

                {/* Modal */}
                <UploadModal isOpen={isUploadOpen} onClose={() => setIsUploadOpen(false)} />

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    <StatCard title="Total Files" value="1,284" subtext="+12 since last week" icon={FileText} color="primary" />
                    <StatCard title="Storage Used" value="45.8 GB" subtext="72% of 64GB plan" icon={ImageIcon} color="purple" />
                    <StatCard title="Total Shared" value="86" subtext="4 active links" icon={ExternalLink} color="blue" />
                    <StatCard title="Downloads" value="2.4k" subtext="+15% monthly growth" icon={Download} color="green" />
                </div>

                <section className="space-y-4">
                    <div className="flex items-center justify-between">
                        <h2 className="text-xl font-bold text-surface-900 dark:text-white">Recent Uploads</h2>
                        <button className="text-sm font-medium text-primary-600 hover:text-primary-500">View All</button>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {recentFiles.map((file, i) => (
                            <motion.div
                                key={file.name}
                                initial={{ opacity: 0, scale: 0.95 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ delay: i * 0.1 }}
                                className="card p-5 group hover:border-primary-500 focus-within:border-primary-500 transition-all cursor-pointer"
                            >
                                <div className="flex items-start justify-between">
                                    <div className={`p-3 rounded-lg bg-${file.color}-50 dark:bg-${file.color}-900/10 text-${file.color}-600 dark:text-${file.color}-400 group-hover:bg-${file.color}-600 group-hover:text-white transition-all`}>
                                        <file.icon size={24} />
                                    </div>
                                    <button className="p-1 text-surface-400 hover:text-surface-600 dark:hover:text-surface-200">
                                        <MoreHorizontal size={20} />
                                    </button>
                                </div>
                                <div className="mt-4">
                                    <h4 className="font-semibold text-surface-900 dark:text-white truncate">{file.name}</h4>
                                    <div className="flex items-center space-x-2 mt-1 text-xs text-surface-500">
                                        <span>{file.size}</span>
                                        <span>•</span>
                                        <span>{file.date}</span>
                                    </div>
                                </div>
                                <div className="grid grid-cols-2 gap-3 mt-6">
                                    <button className="flex items-center justify-center space-x-2 py-2 px-3 bg-emerald-50 dark:bg-emerald-900/20 text-emerald-600 dark:text-emerald-400 rounded-lg text-sm font-medium hover:bg-emerald-100 dark:hover:bg-emerald-900/40 transition-colors">
                                        <Download size={14} />
                                        <span>Download</span>
                                    </button>
                                    <button className="flex items-center justify-center space-x-2 py-2 px-3 bg-rose-50 dark:bg-rose-900/20 text-rose-600 dark:text-rose-400 rounded-lg text-sm font-medium hover:bg-rose-100 dark:hover:bg-rose-900/40 transition-colors">
                                        <Trash2 size={14} />
                                        <span>Delete</span>
                                    </button>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </section>
            </div>
        </DashboardLayout>
    );
};

export default Dashboard;
