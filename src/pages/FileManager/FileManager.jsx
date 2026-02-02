import { useState } from 'react';
import DashboardLayout from '../../components/Layout/DashboardLayout';
import {
    Grid,
    List,
    Search,
    Filter,
    Plus,
    Folder,
    FileText,
    Image as ImageIcon,
    Video,
    MoreHorizontal,
    ChevronRight,
    Download,
    Share2,
    Trash2,
    Edit2
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { clsx } from 'clsx';
import UploadModal from '../../components/Upload/UploadModal';

const FileManager = () => {
    const [view, setView] = useState('grid');
    const [searchQuery, setSearchQuery] = useState('');
    const [isUploadOpen, setIsUploadOpen] = useState(false);

    const folders = [
        { name: 'Documents', items: 24, size: '4.2 GB', color: 'blue' },
        { name: 'Design Assets', items: 156, size: '12.8 GB', color: 'purple' },
        { name: 'Video Projects', items: 12, size: '28.5 GB', color: 'orange' },
        { name: 'Family Photos', items: 842, size: '5.2 GB', color: 'green' },
    ];

    const files = [
        { name: 'Annual_Report_2025.pdf', type: 'PDF', size: '2.4 MB', date: 'Feb 12, 2026', icon: FileText, color: 'blue' },
        { name: 'Branding_Guidelines.ai', type: 'Adobe Illustrator', size: '18.5 MB', date: 'Feb 10, 2026', icon: FileText, color: 'orange' },
        { name: 'Office_Layout.png', type: 'Image', size: '4.2 MB', date: 'Feb 08, 2026', icon: ImageIcon, color: 'purple' },
        { name: 'Website_Redesign_v2.mp4', type: 'Video', size: '124.8 MB', date: 'Feb 05, 2026', icon: Video, color: 'indigo' },
        { name: 'Budget_Q1.xlsx', type: 'Spreadsheet', size: '1.2 MB', date: 'Feb 01, 2026', icon: FileText, color: 'green' },
    ];

    return (
        <DashboardLayout>
            <div className="max-w-7xl mx-auto space-y-6">
                {/* Header & Controls */}
                <header className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                    <div className="flex items-center space-x-2 text-sm text-surface-500">
                        <span className="hover:text-primary-600 cursor-pointer">All Files</span>
                        <ChevronRight size={16} />
                        <span className="font-semibold text-surface-900 dark:text-white">Workspace</span>
                    </div>

                    <div className="flex items-center space-x-3">
                        <div className="relative group">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-surface-400 group-focus-within:text-primary-500 transition-colors" size={18} />
                            <input
                                type="text"
                                placeholder="Search workspace..."
                                className="pl-10 pr-4 py-2 bg-white dark:bg-surface-900 border border-surface-200 dark:border-surface-800 rounded-xl outline-none focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500 transition-all text-sm w-64"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                            />
                        </div>

                        <div className="flex items-center bg-white dark:bg-surface-900 border border-surface-200 dark:border-surface-800 rounded-xl p-1">
                            <button
                                onClick={() => setView('grid')}
                                className={clsx("p-1.5 rounded-lg transition-all", view === 'grid' ? "bg-surface-100 dark:bg-surface-800 text-primary-600" : "text-surface-400 hover:text-surface-600")}
                            >
                                <Grid size={18} />
                            </button>
                            <button
                                onClick={() => setView('list')}
                                className={clsx("p-1.5 rounded-lg transition-all", view === 'list' ? "bg-surface-100 dark:bg-surface-800 text-primary-600" : "text-surface-400 hover:text-surface-600")}
                            >
                                <List size={18} />
                            </button>
                        </div>

                        <button
                            onClick={() => setIsUploadOpen(true)}
                            className="flex items-center space-x-2 h-10 px-6 bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-500 hover:to-indigo-500 text-white rounded-xl shadow-lg shadow-indigo-500/20 hover:shadow-indigo-500/40 transition-all font-medium"
                        >
                            <Plus size={18} />
                            <span className="hidden sm:inline">Upload Content</span>
                        </button>
                    </div>
                </header>

                <UploadModal isOpen={isUploadOpen} onClose={() => setIsUploadOpen(false)} />

                {/* Folders Section */}
                <section className="space-y-4">
                    <h2 className="text-lg font-bold text-surface-900 dark:text-white">Folders</h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                        {folders.map((folder, i) => (
                            <motion.div
                                key={folder.name}
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: i * 0.05 }}
                                className="card p-4 hover:border-primary-500 group transition-all h-32 flex flex-col justify-between cursor-pointer"
                            >
                                <div className="flex items-start justify-between">
                                    <div className={`p-2.5 rounded-xl bg-${folder.color}-100 dark:bg-${folder.color}-900/30 text-${folder.color}-600 dark:text-${folder.color}-400 group-hover:bg-${folder.color}-600 group-hover:text-white transition-all`}>
                                        <Folder size={24} fill="currentColor" fillOpacity={0.2} />
                                    </div>
                                    <button className="p-1 text-surface-400 hover:text-surface-600 opacity-0 group-hover:opacity-100 transition-opacity">
                                        <MoreHorizontal size={18} />
                                    </button>
                                </div>
                                <div>
                                    <h3 className="font-semibold text-surface-900 dark:text-white text-sm">{folder.name}</h3>
                                    <p className="text-xs text-surface-500 dark:text-surface-400 mt-0.5">{folder.items} items • {folder.size}</p>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </section>

                {/* Files Section */}
                <section className="space-y-4">
                    <div className="flex items-center justify-between">
                        <h2 className="text-lg font-bold text-surface-900 dark:text-white">Recent Files</h2>
                        <button className="flex items-center space-x-2 text-sm text-surface-500 hover:text-primary-600">
                            <Filter size={16} />
                            <span>Sort by Date</span>
                        </button>
                    </div>

                    <AnimatePresence mode="popLayout">
                        {view === 'grid' ? (
                            <motion.div
                                key="grid-view"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-5 gap-4"
                            >
                                {files.map((file, i) => (
                                    <motion.div
                                        key={file.name}
                                        initial={{ scale: 0.9, opacity: 0 }}
                                        animate={{ scale: 1, opacity: 1 }}
                                        transition={{ delay: i * 0.03 }}
                                        className="card p-3 group hover:shadow-md transition-all cursor-pointer relative"
                                    >
                                        <div className="aspect-square rounded-lg bg-surface-100 dark:bg-surface-800 mb-3 flex items-center justify-center relative overflow-hidden">
                                            <file.icon size={48} className={`text-${file.color}-500/50 group-hover:scale-110 transition-transform duration-300`} />
                                            <div className="absolute inset-0 bg-surface-900/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center space-x-3 backdrop-blur-[2px]">
                                                <button className="p-2.5 bg-white rounded-xl text-emerald-600 hover:text-emerald-700 shadow-lg hover:scale-110 transition-all" title="Download">
                                                    <Download size={18} />
                                                </button>
                                                <button className="p-2.5 bg-white rounded-xl text-blue-600 hover:text-blue-700 shadow-lg hover:scale-110 transition-all" title="Share">
                                                    <Share2 size={18} />
                                                </button>
                                            </div>
                                        </div>
                                        <div className="px-1">
                                            <h4 className="font-medium text-surface-900 dark:text-white text-xs truncate" title={file.name}>{file.name}</h4>
                                            <p className="text-[10px] text-surface-500 mt-0.5 font-medium">{file.size} • {file.date}</p>
                                        </div>
                                    </motion.div>
                                ))}
                            </motion.div>
                        ) : (
                            <motion.div
                                key="list-view"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                className="card overflow-hidden"
                            >
                                <table className="w-full text-left">
                                    <thead>
                                        <tr className="bg-surface-50 dark:bg-surface-900/50 text-surface-500 uppercase text-[10px] tracking-widest font-bold">
                                            <th className="px-6 py-4">Name</th>
                                            <th className="px-6 py-4">Size</th>
                                            <th className="px-6 py-4">Type</th>
                                            <th className="px-6 py-4">Last Modified</th>
                                            <th className="px-6 py-4"></th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-surface-200 dark:divide-surface-800">
                                        {files.map((file) => (
                                            <tr key={file.name} className="hover:bg-surface-50 dark:hover:bg-surface-800/50 group transition-colors cursor-pointer">
                                                <td className="px-6 py-4">
                                                    <div className="flex items-center space-x-3">
                                                        <div className={`p-1.5 rounded-lg bg-${file.color}-100 dark:bg-${file.color}-900/30 text-${file.color}-600 dark:text-${file.color}-400`}>
                                                            <file.icon size={16} />
                                                        </div>
                                                        <span className="text-sm font-medium text-surface-900 dark:text-white">{file.name}</span>
                                                    </div>
                                                </td>
                                                <td className="px-6 py-4 text-xs text-surface-500">{file.size}</td>
                                                <td className="px-6 py-4 text-xs text-surface-500">{file.type}</td>
                                                <td className="px-6 py-4 text-xs text-surface-500">{file.date}</td>
                                                <td className="px-6 py-4 text-right">
                                                    <div className="flex items-center justify-end space-x-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                                        <button className="p-1.5 hover:bg-emerald-50 dark:hover:bg-emerald-900/20 rounded-lg text-surface-400 hover:text-emerald-600 transition-colors"><Download size={16} /></button>
                                                        <button className="p-1.5 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded-lg text-surface-400 hover:text-blue-600 transition-colors"><Share2 size={16} /></button>
                                                        <button className="p-1.5 hover:bg-rose-50 dark:hover:bg-rose-900/20 rounded-lg text-surface-400 hover:text-rose-600 transition-colors"><Trash2 size={16} /></button>
                                                    </div>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </section>
            </div>
        </DashboardLayout>
    );
};

export default FileManager;
