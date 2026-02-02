import DashboardLayout from '../../components/Layout/DashboardLayout';
import { Search, Filter, ArrowUpRight, ArrowDownLeft, User, Calendar } from 'lucide-react';
import { motion } from 'framer-motion';

const ActivityLogs = () => {
    const logs = [
        { id: 1, file: 'Project_Alpha.pdf', action: 'Download', user: 'Sarah Miller', timestamp: '2026-02-12 14:30', status: 'Success' },
        { id: 2, file: 'Dashboard_UI.png', action: 'Upload', user: 'John Doe', timestamp: '2026-02-12 12:45', status: 'Success' },
        { id: 3, file: 'Expenses.xlsx', action: 'Delete', user: 'Admin', timestamp: '2026-02-11 16:20', status: 'Success' },
        { id: 4, file: 'API_Specs.pdf', action: 'Shared', user: 'John Doe', timestamp: '2026-02-11 09:15', status: 'Warning' },
        { id: 5, file: 'Intro_Video.mp4', action: 'Download', user: 'Mike Ross', timestamp: '2026-02-10 18:30', status: 'Success' },
    ];

    return (
        <DashboardLayout>
            <div className="max-w-7xl mx-auto space-y-6">
                <header className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div>
                        <h1 className="text-2xl font-bold text-surface-900 dark:text-white">Activity Logs</h1>
                        <p className="text-surface-500 dark:text-surface-400 mt-1">Monitor all file interactions across the workspace.</p>
                    </div>

                    <div className="flex items-center space-x-3">
                        <div className="relative">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-surface-400" size={18} />
                            <input
                                type="text"
                                placeholder="Filter logs..."
                                className="pl-10 pr-4 py-2 bg-white dark:bg-surface-900 border border-surface-200 dark:border-surface-800 rounded-xl outline-none focus:ring-2 focus:ring-primary-500/20 text-sm"
                            />
                        </div>
                        <button className="p-2 bg-white dark:bg-surface-900 border border-surface-200 dark:border-surface-800 rounded-xl text-surface-600 dark:text-surface-400 hover:bg-surface-50 transition-colors">
                            <Filter size={20} />
                        </button>
                    </div>
                </header>

                <div className="card overflow-hidden">
                    <div className="overflow-x-auto">
                        <table className="w-full text-left">
                            <thead>
                                <tr className="bg-surface-50 dark:bg-surface-900/50 text-surface-500 uppercase text-[10px] tracking-widest font-bold">
                                    <th className="px-6 py-4">Action</th>
                                    <th className="px-6 py-4">File Name</th>
                                    <th className="px-6 py-4">User</th>
                                    <th className="px-6 py-4">Timestamp</th>
                                    <th className="px-6 py-4">Status</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-surface-200 dark:divide-surface-800">
                                {logs.map((log, i) => (
                                    <motion.tr
                                        key={log.id}
                                        initial={{ opacity: 0, x: -10 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{ delay: i * 0.05 }}
                                        className="hover:bg-surface-50 dark:hover:bg-surface-800/50 transition-colors"
                                    >
                                        <td className="px-6 py-4">
                                            <div className="flex items-center space-x-2">
                                                {log.action === 'Upload' ? <ArrowUpRight size={16} className="text-green-500" /> : <ArrowDownLeft size={16} className="text-blue-500" />}
                                                <span className="text-sm font-semibold dark:text-white">{log.action}</span>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 text-sm text-surface-700 dark:text-surface-300 font-medium">{log.file}</td>
                                        <td className="px-6 py-4">
                                            <div className="flex items-center space-x-2">
                                                <div className="w-6 h-6 rounded-full bg-primary-100 dark:bg-primary-900/30 flex items-center justify-center text-[10px] font-bold text-primary-600">
                                                    {log.user[0]}
                                                </div>
                                                <span className="text-xs text-surface-600 dark:text-surface-400">{log.user}</span>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className="flex items-center space-x-2 text-xs text-surface-500">
                                                <Calendar size={14} />
                                                <span>{log.timestamp}</span>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${log.status === 'Success' ? 'bg-green-100 text-green-700 dark:bg-green-900/20 dark:text-green-400' : 'bg-orange-100 text-orange-700 dark:bg-orange-900/20 dark:text-orange-400'
                                                }`}>
                                                {log.status}
                                            </span>
                                        </td>
                                    </motion.tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                    <div className="px-6 py-4 bg-surface-50 dark:bg-surface-900/50 border-t border-surface-200 dark:border-surface-800 flex items-center justify-between">
                        <p className="text-xs text-surface-500">Showing 5 of 1,248 activities</p>
                        <div className="flex space-x-2">
                            <button className="px-3 py-1 bg-white dark:bg-surface-800 border border-surface-200 dark:border-surface-700 rounded-lg text-xs font-semibold hover:bg-surface-100 transition-colors">Previous</button>
                            <button className="px-3 py-1 bg-white dark:bg-surface-800 border border-surface-200 dark:border-surface-700 rounded-lg text-xs font-semibold hover:bg-surface-100 transition-colors">Next</button>
                        </div>
                    </div>
                </div>
            </div>
        </DashboardLayout>
    );
};

export default ActivityLogs;
