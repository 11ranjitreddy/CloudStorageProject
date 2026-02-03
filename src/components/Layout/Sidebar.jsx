import { NavLink, Link } from 'react-router-dom';
import {
    LayoutDashboard,
    FolderOpen,
    Clock,
    Settings,
    LogOut,
    ChevronLeft,
    ChevronRight,
    ShieldAlert
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useState } from 'react';
import { clsx } from 'clsx';
import { motion } from 'framer-motion';

const Sidebar = ({ collapsed, setCollapsed }) => {
    const { user, logout } = useAuth();

    const navItems = [
        { name: 'Dashboard', icon: LayoutDashboard, path: '/dashboard' },
        { name: 'All Files', icon: FolderOpen, path: '/files' },
        { name: 'Recent Activities', icon: Clock, path: '/activities' },
        { name: 'Settings', icon: Settings, path: '/settings' },
    ];

    return (
        <aside
            className={clsx(
                "h-screen bg-surface-50/50 dark:bg-surface-950/50 backdrop-blur-xl border-r border-surface-200/50 dark:border-surface-800/50 transition-all duration-300 flex flex-col sticky top-0 z-40",
                collapsed ? "w-20" : "w-72"
            )}
        >
            <div className="p-6 flex items-center justify-between">
                <Link to="/dashboard" className={clsx("flex items-center space-x-3 overflow-hidden transition-all duration-300", collapsed ? "w-0 opacity-0" : "w-auto opacity-100")}>
                    <div className="bg-gradient-to-tr from-primary-600 to-indigo-500 p-2.5 rounded-xl text-white shadow-glow">
                        <ShieldAlert size={22} />
                    </div>
                    <div>
                        <span className="font-bold text-lg dark:text-white tracking-tight block leading-none">CloudVault</span>
                        <span className="text-[10px] text-surface-500 font-medium tracking-wider uppercase">Enterprise</span>
                    </div>
                </Link>
                <button
                    onClick={() => setCollapsed(!collapsed)}
                    className="p-2 hover:bg-surface-200/50 dark:hover:bg-surface-800/50 rounded-xl text-surface-500 transition-colors"
                >
                    {collapsed ? <ChevronRight size={18} /> : <ChevronLeft size={18} />}
                </button>
            </div>

            <nav className="flex-1 px-4 mt-4 space-y-2">
                {navItems.map((item) => (
                    <NavLink
                        key={item.path}
                        to={item.path}
                        className={({ isActive }) => clsx(
                            "flex items-center space-x-3 px-4 py-3.5 rounded-2xl transition-all group relative overflow-hidden",
                            isActive
                                ? "bg-white dark:bg-surface-800/50 text-primary-600 dark:text-primary-400 shadow-soft"
                                : "text-surface-500 dark:text-surface-400 hover:bg-white/50 dark:hover:bg-surface-800/30 hover:text-surface-900 dark:hover:text-surface-200"
                        )}
                    >
                        {({ isActive }) => (
                            <>
                                {isActive && (
                                    <motion.div
                                        layoutId="active-nav"
                                        className="absolute inset-0 bg-gradient-to-r from-primary-50 to-transparent dark:from-primary-900/10 opacity-50"
                                        initial={false}
                                        transition={{ type: "spring", stiffness: 500, damping: 30 }}
                                    />
                                )}
                                <item.icon size={22} className={clsx("flex-shrink-0 relative z-10 transition-colors", isActive && "text-primary-600 dark:text-primary-400")} />
                                <span className={clsx("font-medium relative z-10 transition-all duration-300", collapsed ? "opacity-0 w-0 translate-x-4" : "opacity-100 w-auto translate-x-0")}>
                                    {item.name}
                                </span>
                            </>
                        )}
                    </NavLink>
                ))}
            </nav>

            <div className="p-4 m-4 bg-surface-100/50 dark:bg-surface-900/50 rounded-2xl border border-surface-200/50 dark:border-surface-800/50 backdrop-blur-sm">
                <button
                    onClick={logout}
                    className="w-full flex items-center justify-center space-x-2 p-2 text-surface-500 hover:text-red-500 transition-colors text-sm font-medium"
                >
                    <LogOut size={18} />
                    <span className={clsx("transition-all duration-300", collapsed ? "hidden" : "block")}>Sign Out</span>
                </button>
            </div>
        </aside>
    );
};

export default Sidebar;
