// import React, { useState, useEffect } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { toast } from 'react-toastify';

// const ResetPassword = () => {
//     const [ipAddress, setIpAddress] = useState('');
//     const [email, setEmail] = useState('');
//     const [newPassword, setNewPassword] = useState('');
//     const [otp, setOtp] = useState('');
//     const [otpSent, setOtpSent] = useState(false);
//     const navigate = useNavigate();

//     // Fetch IP address
//     useEffect(() => {
//         const fetchIpAddress = async () => {
//             const rootUri = import.meta.env.VITE_ROOT_URI;
//             const apiKey = import.meta.env.VITE_API_KEY;
//             try {
//                 const response = await fetch("https://api.ipify.org?format=json");
//                 const data = await response.json();
//                 if (data) {
//                     setIpAddress(data.ip);
//                     const currentDateTime = new Date().toISOString();
//                     await fetch(`${rootUri}/admin/getip`, {
//                         method: 'POST',
//                         headers: {
//                             'Content-Type': 'application/json',
//                             'apiauthkey': apiKey,
//                         },
//                         body: JSON.stringify({ ip: data.ip, datetime: currentDateTime, path: "resetpassword.jsx" })
//                     });
//                 }
//             } catch (error) {
//                 console.error("Error fetching IP address:", error);
//             }
//         };

//         fetchIpAddress();
//     }, []);

//     // Handle email submission for OTP
//     const handleEmailSubmit = async (e) => {
//         e.preventDefault();
//         const rootUri = import.meta.env.VITE_ROOT_URI;
//         const apiKey = import.meta.env.VITE_API_KEY;
//         try {
//             const response = await fetch(`${rootUri}/userauth/userpasswordreset`, {
//                 method: 'POST',
//                 headers: {
//                     'Content-Type': 'application/json',
//                     'apiauthkey': apiKey,
//                 },
//                 body: JSON.stringify({ email }),
//             });

//             if (response.ok) {
//                 setOtpSent(true);
//                 toast.success("OTP sent to your email.");
//             } else {
//                 const data = await response.json();
//                 toast.error(data.message || "Failed to send OTP.");
//             }
//         } catch (error) {
//             console.error("Error sending OTP:", error);
//             toast.error("An error occurred while sending OTP.");
//         }
//     };

//     // Handle final submission with OTP and new password
//     const handleFinalSubmit = async (e) => {
//         e.preventDefault();
//         const rootUri = import.meta.env.VITE_ROOT_URI;
//         const apiKey = import.meta.env.VITE_API_KEY;
//         try {
//             const response = await fetch(`${rootUri}/userauth/userpasswordreset`, {
//                 method: 'POST',
//                 headers: {
//                     'Content-Type': 'application/json',
//                     'apiauthkey': apiKey,
//                 },
//                 body: JSON.stringify({ email, otp, newPassword }),
//             });

//             if (response.ok) {
//                 toast.success("Password reset successfully!");
//                 navigate('/'); // Redirect to login page
//             } else {
//                 const data = await response.json();
//                 toast.error(data.message || "Failed to reset password.");
//             }
//         } catch (error) {
//             console.error("Error resetting password:", error);
//             toast.error("An error occurred while resetting password.");
//         }
//     };

//     return (
//         <div className="relative flex items-center justify-center min-h-screen bg-cover bg-center" style={{ backgroundImage: "url('https://res.cloudinary.com/djvmehyvd/image/upload/v1730708478/jjb6gtwippzrubjbykda.png')" }}>
//             <div className="absolute inset-0 bg-black opacity-50 backdrop-blur-md"></div>
//             <div className="relative z-10 mx-auto max-w-screen-xl px-4 py-16 sm:px-6 lg:px-8">
//                 <div className="mx-auto max-w-lg text-center">
//                     <h1 className="text-2xl font-bold sm:text-3xl text-white">Transev Reset Password</h1>
//                 </div>

//                 <form onSubmit={otpSent ? handleFinalSubmit : handleEmailSubmit} className="mx-auto mb-0 mt-8 max-w-md space-y-4 bg-white bg-opacity-80 rounded-lg p-6 shadow-lg">
//                     <div>
//                         <label htmlFor="email" className="sr-only">Email</label>
//                         <input
//                             type="email"
//                             className="w-full rounded-lg border-gray-200 p-4 pe-12 text-sm shadow-sm"
//                             placeholder="Enter email"
//                             value={email}
//                             onChange={(e) => setEmail(e.target.value)}
//                         />
//                     </div>

//                     {otpSent && (
//                         <>
//                             <div>
//                                 <label htmlFor="newPassword" className="sr-only">New Password</label>
//                                 <input
//                                     type="password"
//                                     className="w-full rounded-lg border-gray-200 p-4 pe-12 text-sm shadow-sm"
//                                     placeholder="Enter new password"
//                                     value={newPassword}
//                                     onChange={(e) => setNewPassword(e.target.value)}
//                                 />
//                             </div>

//                             <div>
//                                 <label htmlFor="otp" className="sr-only">OTP</label>
//                                 <input
//                                     type="text"
//                                     className="w-full rounded-lg border-gray-200 p-4 pe-12 text-sm shadow-sm"
//                                     placeholder="Enter OTP"
//                                     value={otp}
//                                     onChange={(e) => setOtp(e.target.value)}
//                                 />
//                             </div>
//                         </>
//                     )}

//                     <div className="flex items-center justify-between">
//                         <button
//                             type="submit"
//                             className="inline-block rounded-lg bg-blue-500 px-5 py-3 text-sm font-medium text-white hover:bg-blue-600 transition duration-300"
//                         >
//                             {otpSent ? "Reset Password" : "Send OTP"}
//                         </button>
//                     </div>
//                 </form>
//             </div>
//         </div>
//     );
// };

// export default ResetPassword;

import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const ResetPassword = () => {
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
            headers: { 'Content-Type': 'application/json', 'apiauthkey': apiKey },
            body: JSON.stringify({ ip: data.ip, datetime: currentDateTime, path: "resetpassword.jsx" })
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
        headers: { 'Content-Type': 'application/json', 'apiauthkey': apiKey },
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
      console.error(error);
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
        headers: { 'Content-Type': 'application/json', 'apiauthkey': apiKey },
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
      console.error(error);
      toast.error("An error occurred while resetting password.");
    }
  };

  return (
    <div className="relative flex items-center justify-center min-h-screen bg-gradient-to-br from-[#0f172a] via-[#1e293b] to-[#0f172a]">
      
      {/* Glass Overlay */}
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm"></div>

      {/* Form Container */}
      <div className="relative z-10 w-full max-w-md mx-auto p-8 bg-[#1e293b]/80 backdrop-blur-lg rounded-3xl shadow-2xl border border-gray-700">
        <div className="text-center mb-6">
          <h1 className="text-3xl font-bold text-white">Reset Password</h1>
          <p className="text-gray-300 mt-1 text-sm">
            {otpSent ? "Enter your new password and OTP to reset" : "Enter your registered email to receive OTP"}
          </p>
        </div>

        <form onSubmit={otpSent ? handleFinalSubmit : handleEmailSubmit} className="space-y-4">
          
          {/* Email Input */}
          <div className="relative">
            <input
              type="email"
              className="w-full rounded-xl border border-gray-600 bg-[#0f172a]/70 text-white p-4 text-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-teal-500 transition"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          {/* New Password Input */}
          {otpSent && (
            <>
              <div className="relative">
                <input
                  type="password"
                  className="w-full rounded-xl border border-gray-600 bg-[#0f172a]/70 text-white p-4 text-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-teal-500 transition"
                  placeholder="Enter new password"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  required
                />
              </div>

              {/* OTP Input */}
              <div className="relative">
                <input
                  type="text"
                  className="w-full rounded-xl border border-gray-600 bg-[#0f172a]/70 text-white p-4 text-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-teal-500 transition"
                  placeholder="Enter OTP"
                  value={otp}
                  onChange={(e) => setOtp(e.target.value)}
                  required
                />
              </div>
            </>
          )}

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-teal-500 hover:bg-teal-600 text-white font-semibold py-3 rounded-xl shadow-lg transition-all duration-300"
          >
            {otpSent ? "Reset Password" : "Send OTP"}
          </button>

          {/* Back Button */}
          <button
            type="button"
            onClick={() => navigate('/')}
            className="w-full bg-gray-700 hover:bg-gray-600 text-white font-semibold py-3 rounded-xl shadow-lg transition-all duration-300"
          >
            Back to Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default ResetPassword;
