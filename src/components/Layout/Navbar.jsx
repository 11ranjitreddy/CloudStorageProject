import { Search, Bell, User } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { Link } from 'react-router-dom';

const Navbar = () => {
    const { user } = useAuth();

    return (
        <header className="h-20 bg-white/80 dark:bg-surface-900/80 backdrop-blur-md border-b border-surface-200 dark:border-surface-800 px-8 flex items-center justify-between sticky top-0 z-10">
            <div className="flex-1 max-w-xl">
                <div className="relative group">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-surface-400 group-focus-within:text-primary-500 transition-colors">
                        <Search size={18} />
                    </div>
                    <input
                        type="text"
                        className="w-full pl-10 pr-4 py-2.5 bg-surface-100 dark:bg-surface-800 border-transparent focus:bg-white dark:focus:bg-surface-800/50 border focus:border-primary-500 rounded-xl outline-none transition-all placeholder:text-surface-500"
                        placeholder="Search files, folders, or people..."
                    />
                </div>
            </div>

            <div className="flex items-center space-x-4 ml-8">
                <button className="relative p-2.5 bg-surface-100 dark:bg-surface-800 text-surface-600 dark:text-surface-400 rounded-xl hover:bg-surface-200 dark:hover:bg-surface-700 transition-colors">
                    <Bell size={20} />
                    <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full border-2 border-white dark:border-surface-800"></span>
                </button>

                <div className="h-10 w-px bg-surface-200 dark:bg-surface-800 mx-2"></div>

                <Link to="/settings" className="flex items-center space-x-3 pl-2 hover:bg-surface-50 dark:hover:bg-surface-800/50 p-2 rounded-xl transition-colors cursor-pointer">
                    <div className="text-right hidden sm:block">
                        <p className="text-sm font-semibold text-surface-900 dark:text-white leading-tight">{user?.name}</p>
                        <p className="text-xs text-surface-500 dark:text-surface-400 leading-tight capitalise">{user?.role?.toLowerCase()}</p>
                    </div>
                    <div className="h-10 w-10 bg-primary-100 dark:bg-primary-900/30 text-primary-600 dark:text-primary-400 rounded-xl flex items-center justify-center font-bold">
                        {user?.name?.[0] || <User size={20} />}
                    </div>
                </Link>
            </div>
        </header>
    );
};

export default Navbar;
