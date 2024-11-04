import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const ForgotPassword = () => {
    const [ipAddress, setIpAddress] = useState('');
    const [email, setEmail] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [otp, setOtp] = useState('');
    const [otpSent, setOtpSent] = useState(false);
    const navigate = useNavigate();

    // Fetch IP address
    useEffect(() => {
        const fetchIpAddress = async () => {
            const rootUri = import.meta.env.VITE_ROOT_URI;
            const apiKey = import.meta.env.VITE_API_KEY;
            try {
                const response = await fetch("https://api.ipify.org?format=json");
                const data = await response.json();
                if (data) {
                    setIpAddress(data.ip);
                    const currentDateTime = new Date().toISOString();
                    await fetch(`${rootUri}/admin/getip`, {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                            'apiauthkey': apiKey,
                        },
                        body: JSON.stringify({ ip: data.ip, datetime: currentDateTime, path: "forgotpassword.jsx" })
                    });
                }
            } catch (error) {
                console.error("Error fetching IP address:", error);
            }
        };

        fetchIpAddress();
    }, []);

    // Handle email submission for OTP
    const handleEmailSubmit = async (e) => {
        e.preventDefault();
        const rootUri = import.meta.env.VITE_ROOT_URI;
        const apiKey = import.meta.env.VITE_API_KEY;
        try {
            const response = await fetch(`${rootUri}/userauth/userpasswordreset`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'apiauthkey': apiKey,
                },
                body: JSON.stringify({ email }),
            });

            if (response.ok) {
                setOtpSent(true);
                toast.success("OTP sent to your email.");
            } else {
                const data = await response.json();
                toast.error(data.message || "Failed to send OTP.");
            }
        } catch (error) {
            console.error("Error sending OTP:", error);
            toast.error("An error occurred while sending OTP.");
        }
    };

    // Handle final submission with OTP and new password
    const handleFinalSubmit = async (e) => {
        e.preventDefault();
        const rootUri = import.meta.env.VITE_ROOT_URI;
        const apiKey = import.meta.env.VITE_API_KEY;
        try {
            const response = await fetch(`${rootUri}/userauth/userpasswordreset`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'apiauthkey': apiKey,
                },
                body: JSON.stringify({ email, otp, newPassword }),
            });

            if (response.ok) {
                toast.success("Password reset successfully!");
                navigate('/'); // Redirect to login page
            } else {
                const data = await response.json();
                toast.error(data.message || "Failed to reset password.");
            }
        } catch (error) {
            console.error("Error resetting password:", error);
            toast.error("An error occurred while resetting password.");
        }
    };

    return (
        <div className="relative flex items-center justify-center min-h-screen bg-cover bg-center" style={{ backgroundImage: "url('https://res.cloudinary.com/djvmehyvd/image/upload/v1730708478/jjb6gtwippzrubjbykda.png')" }}>
            <div className="absolute inset-0 bg-black opacity-50 backdrop-blur-md"></div>
            <div className="relative z-10 mx-auto max-w-screen-xl px-4 py-16 sm:px-6 lg:px-8">
                <div className="mx-auto max-w-lg text-center">
                    <h1 className="text-2xl font-bold sm:text-3xl text-white">Transev Forgot Password Page</h1>
                </div>

                <form onSubmit={otpSent ? handleFinalSubmit : handleEmailSubmit} className="mx-auto mb-0 mt-8 max-w-md space-y-4 bg-white bg-opacity-80 rounded-lg p-6 shadow-lg">
                    <div>
                        <label htmlFor="email" className="sr-only">Email</label>
                        <input
                            type="email"
                            className="w-full rounded-lg border-gray-200 p-4 pe-12 text-sm shadow-sm"
                            placeholder="Enter email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>

                    {otpSent && (
                        <>
                            <div>
                                <label htmlFor="newPassword" className="sr-only">New Password</label>
                                <input
                                    type="password"
                                    className="w-full rounded-lg border-gray-200 p-4 pe-12 text-sm shadow-sm"
                                    placeholder="Enter new password"
                                    value={newPassword}
                                    onChange={(e) => setNewPassword(e.target.value)}
                                />
                            </div>

                            <div>
                                <label htmlFor="otp" className="sr-only">OTP</label>
                                <input
                                    type="text"
                                    className="w-full rounded-lg border-gray-200 p-4 pe-12 text-sm shadow-sm"
                                    placeholder="Enter OTP"
                                    value={otp}
                                    onChange={(e) => setOtp(e.target.value)}
                                />
                            </div>
                        </>
                    )}

                    <div className="flex items-center justify-between">
                        <button
                            type="submit"
                            className="inline-block rounded-lg bg-blue-500 px-5 py-3 text-sm font-medium text-white hover:bg-blue-600 transition duration-300"
                        >
                            {otpSent ? "Reset Password" : "Send OTP"}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default ForgotPassword;