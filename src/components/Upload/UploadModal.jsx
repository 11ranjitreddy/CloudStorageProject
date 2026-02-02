import { X, Upload, File, Loader2, CheckCircle2, AlertCircle, Image as ImageIcon, Video, Folder, Music } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useState, useCallback } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { toast } from 'react-toastify';

const uploadSchema = z.object({
    expiryDate: z.string().optional(),
    folder: z.string().default('root'),
});

const UploadModal = ({ isOpen, onClose }) => {
    const [files, setFiles] = useState([]);
    const [uploading, setUploading] = useState(false);
    const [progress, setProgress] = useState(0);

    const onDragOver = (e) => {
        e.preventDefault();
        e.stopPropagation();
    };

    const onDrop = (e) => {
        e.preventDefault();
        e.stopPropagation();
        const droppedFiles = Array.from(e.dataTransfer.files);
        setFiles((prev) => [...prev, ...droppedFiles]);
    };

    const handleFileSelect = (e) => {
        const selectedFiles = Array.from(e.target.files);
        setFiles((prev) => [...prev, ...selectedFiles]);
    };

    const removeFile = (index) => {
        setFiles((prev) => prev.filter((_, i) => i !== index));
    };

    const handleUpload = async () => {
        if (files.length === 0) return;

        setUploading(true);
        // Simulate upload progress
        const interval = setInterval(() => {
            setProgress((prev) => {
                if (prev >= 100) {
                    clearInterval(interval);
                    setUploading(false);
                    toast.success(`${files.length} files uploaded successfully!`);
                    setFiles([]);
                    setProgress(0);
                    onClose();
                    return 100;
                }
                return prev + 10;
            });
        }, 200);
    };

    if (!isOpen) return null;

    return (
        <AnimatePresence>
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    onClick={onClose}
                    className="absolute inset-0 bg-surface-950/60 backdrop-blur-sm"
                />

                <motion.div
                    initial={{ opacity: 0, scale: 0.95, y: 20 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.95, y: 20 }}
                    className="relative w-full max-w-xl bg-white dark:bg-surface-900 rounded-2xl shadow-2xl border border-surface-200 dark:border-surface-800 overflow-hidden"
                >
                    <div className="px-6 py-4 border-b border-surface-200 dark:border-surface-800 flex items-center justify-between bg-surface-50 dark:bg-surface-900/50">
                        <h3 className="font-bold text-surface-900 dark:text-white">Upload Content</h3>
                        <button onClick={onClose} className="p-1 hover:bg-surface-200 dark:hover:bg-surface-800 rounded-full transition-colors">
                            <X size={20} className="text-surface-500" />
                        </button>
                    </div>

                    <div className="p-6 space-y-6">
                        <div
                            onDragOver={onDragOver}
                            onDrop={onDrop}
                            className="relative border-2 border-dashed border-surface-300 dark:border-surface-700 rounded-2xl p-10 flex flex-col items-center justify-center text-center group hover:border-primary-500 transition-all bg-surface-50 dark:bg-surface-900/50"
                        >
                            <div className="p-4 bg-primary-100 dark:bg-primary-900/30 text-primary-600 dark:text-primary-400 rounded-full mb-4 group-hover:scale-110 transition-transform">
                                <Upload size={32} />
                            </div>
                            <h4 className="text-lg font-semibold text-surface-900 dark:text-white">Drag & drop files or folders</h4>
                            <p className="text-sm text-surface-500 mt-2 mb-6">Support for images, videos, docs, and more</p>

                            <div className="flex items-center space-x-4 relative z-20">
                                <label className="cursor-pointer px-4 py-2 bg-white dark:bg-surface-800 border border-surface-200 dark:border-surface-700 rounded-lg text-sm font-medium text-surface-700 dark:text-surface-300 hover:bg-surface-50 dark:hover:bg-surface-700 transition-colors shadow-sm">
                                    <span>Browse Files</span>
                                    <input
                                        type="file"
                                        multiple
                                        className="hidden"
                                        onChange={handleFileSelect}
                                    />
                                </label>
                                <span className="text-surface-400 text-sm">or</span>
                                <label className="cursor-pointer px-4 py-2 bg-white dark:bg-surface-800 border border-surface-200 dark:border-surface-700 rounded-lg text-sm font-medium text-surface-700 dark:text-surface-300 hover:bg-surface-50 dark:hover:bg-surface-700 transition-colors shadow-sm">
                                    <span>Upload Folder</span>
                                    <input
                                        type="file"
                                        webkitdirectory=""
                                        directory=""
                                        multiple
                                        className="hidden"
                                        onChange={handleFileSelect}
                                    />
                                </label>
                            </div>

                            {/* Overlay Drag Zone */}
                            <input
                                type="file"
                                multiple
                                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
                                onChange={handleFileSelect}
                                title=""
                            />
                        </div>

                        {files.length > 0 && (
                            <div className="space-y-3 max-h-48 overflow-auto pr-2">
                                <h5 className="text-xs font-bold text-surface-500 uppercase tracking-widest">Added Files ({files.length})</h5>
                                {files.map((file, i) => (
                                    <div key={i} className="flex items-center space-x-3 p-2 bg-surface-100 dark:bg-surface-800 rounded-lg group text-sm">
                                        <File size={16} className="text-surface-500" />
                                        <span className="flex-1 truncate dark:text-surface-200">{file.name}</span>
                                        <span className="text-xs text-surface-500">{(file.size / 1024).toFixed(1)} KB</span>
                                        <button onClick={() => removeFile(i)} className="text-surface-400 hover:text-red-500">
                                            <X size={14} />
                                        </button>
                                    </div>
                                ))}
                            </div>
                        )}

                        {uploading && (
                            <div className="space-y-2">
                                <div className="flex items-center justify-between text-xs">
                                    <span className="font-semibold text-primary-600">Uploading...</span>
                                    <span className="text-surface-500">{progress}%</span>
                                </div>
                                <div className="w-full bg-surface-200 dark:bg-surface-800 h-2 rounded-full overflow-hidden">
                                    <motion.div
                                        initial={{ width: 0 }}
                                        animate={{ width: `${progress}%` }}
                                        className="bg-primary-600 h-full"
                                    />
                                </div>
                            </div>
                        )}

                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className="block text-xs font-bold text-surface-500 uppercase mb-1.5">Set Expiry</label>
                                <input type="date" className="input-field py-2 text-sm" />
                            </div>
                            <div>
                                <label className="block text-xs font-bold text-surface-500 uppercase mb-1.5">Destination</label>
                                <select className="input-field py-2 text-sm bg-none">
                                    <option>Home Folder</option>
                                    <option>Documents</option>
                                    <option>Design Assets</option>
                                </select>
                            </div>
                        </div>
                    </div>

                    <div className="p-6 bg-surface-50 dark:bg-surface-900/50 border-t border-surface-200 dark:border-surface-800 flex justify-end space-x-3">
                        <button onClick={onClose} className="px-4 py-2 text-sm font-semibold text-surface-600 dark:text-surface-400 hover:bg-surface-200 dark:hover:bg-surface-800 rounded-xl transition-all">
                            Cancel
                        </button>
                        <button
                            onClick={handleUpload}
                            disabled={files.length === 0 || uploading}
                            className="btn-primary h-10 px-6 flex items-center space-x-2"
                        >
                            {uploading ? (
                                <>
                                    <Loader2 size={18} className="animate-spin" />
                                    <span>Uploading</span>
                                </>
                            ) : (
                                <>
                                    <Upload size={18} />
                                    <span>Start Upload</span>
                                </>
                            )}
                        </button>
                    </div>
                </motion.div>
            </div>
        </AnimatePresence>
    );
};

export default UploadModal;
