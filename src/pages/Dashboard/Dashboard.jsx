import DashboardLayout from '../../components/Layout/DashboardLayout';
import {
    FileText,
    Image as ImageIcon,
    Video,
    MoreHorizontal,
    Download,
    Trash2,
    ExternalLink,
    Plus,
    Music,
    Folder,
    Search,
    Cloud,
    HardDrive,
    Users
} from 'lucide-react';
import { motion } from 'framer-motion';
import { useState } from 'react';
import UploadModal from '../../components/Upload/UploadModal';

const Dashboard = () => {
    const [isUploadOpen, setIsUploadOpen] = useState(false);

    const categories = [
        { title: 'All Files', count: '1,284 files', icon: FileText, color: 'blue', size: '25%' },
        { title: 'Images', count: '845 photos', icon: ImageIcon, color: 'purple', size: '40%' },
        { title: 'Videos', count: '142 videos', icon: Video, color: 'orange', size: '60%' },
        { title: 'Music', count: '320 tracks', icon: Music, color: 'pink', size: '15%' },
    ];

    const recentFiles = [
        { name: 'Project_Requirements.pdf', type: 'PDF', size: '2.4 MB', date: '2 hours ago', icon: FileText, color: 'blue' },
        { name: 'Dashboard_Final_v2.png', type: 'Image', size: '1.2 MB', date: '5 hours ago', icon: ImageIcon, color: 'purple' },
        { name: 'Product_Demo.mp4', type: 'Video', size: '45.8 MB', date: 'Yesterday', icon: Video, color: 'orange' },
    ];

    return (
        <DashboardLayout>
            <div className="relative min-h-screen bg-surface-50 dark:bg-surface-950 pb-20">
                {/* Hero Section - Cloud Blue Style */}
                <div className="relative bg-gradient-to-r from-sky-400 to-blue-600 dark:from-sky-600 dark:to-blue-800 pb-40 pt-16 px-8">
                    <div className="max-w-7xl mx-auto flex flex-col items-center text-center relative z-10">
                        <motion.div
                            initial={{ y: -20, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            className="flex items-center space-x-2 text-white/90 mb-6 bg-white/20 backdrop-blur-sm px-4 py-1.5 rounded-full text-sm font-medium border border-white/20"
                        >
                            <span className="animate-pulse">✨</span>
                            <span>Premium Cloud Storage</span>
                        </motion.div>

                        <motion.h1
                            initial={{ scale: 0.9, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            className="text-4xl md:text-6xl font-black text-white tracking-tight mb-6 drop-shadow-sm"
                        >
                            Store everything. <br /> Access anywhere.
                        </motion.h1>

                        <motion.p
                            initial={{ y: 20, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            transition={{ delay: 0.1 }}
                            className="text-lg text-white/90 max-w-2xl mb-12 font-medium"
                        >
                            Secure, fast, and organized space for all your digital assets.
                        </motion.p>

                        {/* Search Bar */}
                        <motion.div
                            initial={{ y: 20, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            transition={{ delay: 0.2 }}
                            className="w-full max-w-2xl relative group z-20"
                        >
                            <div className="absolute inset-y-0 left-0 pl-6 flex items-center pointer-events-none">
                                <Search className="h-6 w-6 text-surface-400 group-focus-within:text-blue-500 transition-colors" />
                            </div>
                            <input
                                type="text"
                                className="block w-full pl-14 pr-4 py-5 rounded-2xl border-none shadow-2xl bg-white text-surface-900 placeholder-surface-400 focus:ring-4 focus:ring-blue-500/30 text-lg transition-all"
                                placeholder="Search for files, folders, or documents..."
                            />
                            <div className="absolute inset-y-0 right-3 flex items-center">
                                <button className="bg-blue-500 hover:bg-blue-600 text-white p-2.5 rounded-xl transition-colors shadow-lg shadow-blue-500/30">
                                    <Cloud className="h-6 w-6" />
                                </button>
                            </div>
                        </motion.div>
                    </div>

                    {/* Decorative Background Elements */}
                    <div className="absolute top-0 left-0 -translate-x-1/4 -translate-y-1/4 w-[500px] h-[500px] bg-white/10 rounded-full blur-3xl"></div>
                    <div className="absolute bottom-0 right-0 translate-x-1/4 translate-y-1/4 w-[500px] h-[500px] bg-sky-400/20 rounded-full blur-3xl"></div>

                    {/* Floating Abstract Shapes */}
                    <motion.div
                        animate={{ y: [0, -20, 0] }}
                        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                        className="absolute left-10 top-20 text-white/20 hidden lg:block"
                    >
                        <FileText size={64} />
                    </motion.div>
                    <motion.div
                        animate={{ y: [0, 20, 0] }}
                        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                        className="absolute right-10 bottom-40 text-white/20 hidden lg:block"
                    >
                        <ImageIcon size={64} />
                    </motion.div>
                </div>

                {/* Floating Cards Section */}
                <div className="max-w-7xl mx-auto px-6 -mt-24 relative z-20">
                    <div className="flex flex-col md:flex-row items-center justify-between mb-8 px-2">
                        <h2 className="text-2xl font-bold text-white drop-shadow-md hidden md:block">Your Collections</h2>
                        <button
                            onClick={() => setIsUploadOpen(true)}
                            className="flex items-center space-x-2 px-6 py-3 bg-white text-blue-600 rounded-full shadow-xl hover:bg-blue-50 transition-all font-bold transform hover:-translate-y-0.5"
                        >
                            <Plus size={20} />
                            <span>Quick Upload</span>
                        </button>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {categories.map((cat, i) => (
                            <motion.div
                                key={cat.title}
                                initial={{ opacity: 0, y: 30 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.2 + (i * 0.1) }}
                                className="bg-white dark:bg-surface-900 rounded-[2rem] p-7 shadow-xl hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 group cursor-pointer relative overflow-hidden ring-1 ring-surface-100 dark:ring-surface-800"
                            >
                                <div className={`absolute -right-8 -bottom-8 w-40 h-40 rounded-full bg-${cat.color}-50 dark:bg-${cat.color}-900/10 transition-transform duration-500 group-hover:scale-125`}></div>

                                <div className="relative z-10">
                                    <div className="flex justify-between items-start mb-6">
                                        <div className={`p-4 rounded-2xl bg-${cat.color}-50 dark:bg-${cat.color}-900/20 text-${cat.color}-500 group-hover:bg-${cat.color}-100 dark:group-hover:bg-${cat.color}-900/40 transition-colors`}>
                                            <cat.icon size={32} />
                                        </div>
                                    </div>

                                    <h3 className="text-2xl font-black text-surface-900 dark:text-white mb-1 group-hover:text-blue-600 transition-colors">{cat.title}</h3>
                                    <p className="text-surface-500 font-medium mb-6">{cat.count}</p>

                                    <div className="flex items-center space-x-2 text-xs font-bold text-surface-400 uppercase tracking-wider">
                                        <span>Storage</span>
                                        <div className="flex-1 h-2 bg-surface-100 dark:bg-surface-800 rounded-full overflow-hidden">
                                            <div className={`h-full bg-${cat.color}-500 rounded-full`} style={{ width: cat.size }}></div>
                                        </div>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>

                {/* Recent Activities/Uploads */}
                <div className="max-w-7xl mx-auto px-6 mt-16">
                    <div className="flex items-center justify-between mb-8 px-2">
                        <h2 className="text-2xl font-bold text-surface-900 dark:text-white">Recent Activities</h2>
                        <button className="text-blue-600 font-bold hover:text-blue-700 flex items-center hover:translate-x-1 transition-transform">
                            View All <ExternalLink size={16} className="ml-1" />
                        </button>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {recentFiles.map((file, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, scale: 0.95 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ delay: 0.4 + (i * 0.1) }}
                                className="flex items-center p-5 bg-white dark:bg-surface-900 rounded-3xl shadow-sm border border-surface-200 dark:border-surface-800 hover:border-blue-200 dark:hover:border-blue-900 hover:shadow-md transition-all group"
                            >
                                <div className={`h-14 w-14 rounded-2xl bg-${file.color}-50 dark:bg-${file.color}-900/20 flex items-center justify-center text-${file.color}-600 dark:text-${file.color}-400 mr-5 group-hover:scale-110 transition-transform`}>
                                    <file.icon size={24} />
                                </div>
                                <div className="flex-1 min-w-0">
                                    <h4 className="font-bold text-surface-900 dark:text-white truncate text-lg">{file.name}</h4>
                                    <p className="text-sm text-surface-500">{file.date} • {file.size}</p>
                                </div>
                                <button className="p-3 hover:bg-surface-50 dark:hover:bg-surface-800 rounded-xl text-surface-400 hover:text-blue-500 transition-colors">
                                    <Download size={20} />
                                </button>
                            </motion.div>
                        ))}
                    </div>
                </div>

                <UploadModal isOpen={isUploadOpen} onClose={() => setIsUploadOpen(false)} />
            </div>
        </DashboardLayout>
    );
};

export default Dashboard;
