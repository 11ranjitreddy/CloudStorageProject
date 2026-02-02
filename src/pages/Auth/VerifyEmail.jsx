import { useState, useRef, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Loader2, ArrowLeft, Mail } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import { useAuth } from '../../context/AuthContext';

const VerifyEmail = () => {
    const [loading, setLoading] = useState(false);
    const [otp, setOtp] = useState(['', '', '', '', '', '']);
    const inputRefs = useRef([]);
    const navigate = useNavigate();
    const location = useLocation();
    const { login } = useAuth();

    // Get email from router state or default
    const email = location.state?.email || 'user@example.com';

    useEffect(() => {
        // Focus first input
        if (inputRefs.current[0]) {
            inputRefs.current[0].focus();
        }
    }, []);

    const handleChange = (index, value) => {
        // Allow only numbers
        if (value && !/^\d+$/.test(value)) return;

        const newOtp = [...otp];
        newOtp[index] = value;
        setOtp(newOtp);

        // Auto advance
        if (value && index < 5) {
            inputRefs.current[index + 1].focus();
        }
    };

    const handleKeyDown = (index, e) => {
        // Backspace handling
        if (e.key === 'Backspace' && !otp[index] && index > 0) {
            inputRefs.current[index - 1].focus();
        }
    };

    const handlePaste = (e) => {
        e.preventDefault();
        const pastedData = e.clipboardData.getData('text').slice(0, 6);
        if (!/^\d+$/.test(pastedData)) return;

        const newOtp = [...otp];
        pastedData.split('').forEach((char, index) => {
            if (index < 6) newOtp[index] = char;
        });
        setOtp(newOtp);

        // Focus last filled or first empty
        const lastIndex = Math.min(pastedData.length, 5);
        inputRefs.current[lastIndex].focus();
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const otpString = otp.join('');

        if (otpString.length !== 6) {
            toast.error('Please enter a 6-digit code');
            return;
        }

        setLoading(true);

        // Simulate API verification
        setTimeout(() => {
            setLoading(false);
            if (otpString === '123456') { // Mock OTP
                login({ email }); // Log user in
                toast.success('Email verified successfully!');
                navigate('/dashboard');
            } else {
                toast.error('Invalid code. Please try again. (Hint: 123456)');
            }
        }, 1500);
    };

    const handleResend = () => {
        toast.info('New code sent to your email');
    };

    return (
        <div className="space-y-6">
            <div className="text-center">
                <div className="mx-auto w-12 h-12 bg-primary-100 dark:bg-primary-900/30 rounded-full flex items-center justify-center mb-4 text-primary-600 dark:text-primary-400">
                    <Mail size={24} />
                </div>
                <h2 className="text-2xl font-semibold text-surface-900 dark:text-white">Verify your email</h2>
                <p className="text-surface-600 dark:text-surface-400 text-sm mt-1">
                    We've sent a code to <span className="font-medium text-surface-900 dark:text-white">{email}</span>
                </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
                <div className="flex justify-between gap-2">
                    {otp.map((digit, index) => (
                        <input
                            key={index}
                            ref={(el) => (inputRefs.current[index] = el)}
                            type="text"
                            maxLength={1}
                            value={digit}
                            onChange={(e) => handleChange(index, e.target.value)}
                            onKeyDown={(e) => handleKeyDown(index, e)}
                            onPaste={handlePaste}
                            className="w-12 h-12 text-center text-xl font-bold bg-white dark:bg-surface-800 border border-surface-300 dark:border-surface-700 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none transition-all"
                        />
                    ))}
                </div>

                <button
                    type="submit"
                    disabled={loading}
                    className="btn-primary w-full flex items-center justify-center space-x-2 h-11"
                >
                    {loading ? (
                        <>
                            <Loader2 className="animate-spin" size={18} />
                            <span>Verifying...</span>
                        </>
                    ) : (
                        <span>Verify Email</span>
                    )}
                </button>
            </form>

            <div className="flex items-center justify-between text-sm">
                <button
                    onClick={() => navigate('/auth/register')}
                    className="flex items-center text-surface-500 hover:text-surface-900 dark:hover:text-white transition-colors"
                >
                    <ArrowLeft size={16} className="mr-1" />
                    Back to Register
                </button>
                <button
                    onClick={handleResend}
                    className="font-medium text-primary-600 hover:text-primary-500"
                >
                    Resend Code
                </button>
            </div>
        </div>
    );
};

export default VerifyEmail;
