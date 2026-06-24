// import React, { useState, useEffect } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { toast } from 'react-toastify';

// const Login = () => {
//     const [email, setEmail] = useState('');
//     const [password, setPassword] = useState('');
//     const [otp, setOtp] = useState('');
//     const [error, setError] = useState(null);
//     const [loading, setLoading] = useState(false);
//     const [showOtpField, setShowOtpField] = useState(false);
//     const navigate = useNavigate();

//     useEffect(() => {
//         const checkAuthentication = async () => {
//             const rooturi = import.meta.env.VITE_AUTH_ROOT_URI;
//             const apikey = import.meta.env.VITE_AUTH_API_KEY;


//             try {
//                 const gettoken = localStorage.getItem("token");
//                 if (!gettoken) {
//                     navigate("/signin");
//                     return;
//                 }

//                 const response = await fetch(`${rooturi}/userauth/verifyuser`, {
//                     method: 'POST',
//                     headers: {
//                         'Content-Type': 'application/json',
//                         'apiauthkey': apikey,
//                     },
//                     body: JSON.stringify({ token: gettoken })
//                 });

//                 const data = await response.json();
//                 if (response.ok) {
//                     if (data.user.userType !== "superadmin") {
//                         toast("You have no authorization to view this page");
//                         navigate("/signin");
//                     } else {
//                         console.log("You are an authorized user");
//                         navigate("/");
//                     }
//                 } else {
//                     toast("Failed to verify user");
//                     navigate("/signin");
//                 }
//             } catch (error) {
//                 console.error("Error during authentication check:", error);
//                 toast("An error occurred during authentication");
//                 navigate("/signin");
//             }
//         };

//         checkAuthentication();
//     }, [navigate]);

//     const handleSubmit = async (e) => {
//         e.preventDefault();
//         setLoading(true);
//         setError(null);
//         try {
//             const rooturi = import.meta.env.VITE_ROOT_URI;
//             const apikey = import.meta.env.VITE_API_KEY;
//             const response = await fetch(`${rooturi}/userauth/login`, {
//                 method: 'POST',
//                 headers: {
//                     'Content-Type': 'application/json',
//                     'apiauthkey': apikey,
//                 },
//                 body: JSON.stringify({ email, password }),
//             });

//             const data = await response.json();

//             if (response.ok) {
//                 setShowOtpField(true);
//                 toast("OTP sent to your email. Please check your inbox.");
//             } else {
//                 toast(data.message);
//                 setError(data.message || 'Login failed');
//             }
//         } catch (error) {
//             console.error("Error during login:", error);
//             setError('An error occurred during login');
//         } finally {
//             setLoading(false);
//         }
//     };

//     const handleOtpSubmit = async (e) => {
//         e.preventDefault();
//         const rooturi = import.meta.env.VITE_ROOT_URI;
//         const apikey = import.meta.env.VITE_API_KEY;
//         try {
//             const response = await fetch(`${rooturi}/userauth/login`, {
//                 method: 'POST',
//                 headers: {
//                     'Content-Type': 'application/json',
//                     'apiauthkey': apikey,
//                 },
//                 body: JSON.stringify({ email, password, otp }),
//             });

//             if (response.ok) {
//                 const data = await response.json();
//                 localStorage.setItem("token", data.token); // Store the token
//                 navigate("/");
//             } else {
//                 const data = await response.json();
//                 toast(data.message || "OTP verification failed");
//             }
//         } catch (error) {
//             console.error("Error during OTP submission:", error);
//             toast("An error occurred during OTP verification");
//         }
//     };

//     const handelForgotpasswordclick = () => {
//         navigate("/forgotpassword");
//     };

//     return (
//         <div className="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8 bg-cover bg-center backdrop-blur-md"
//             style={{ backgroundImage: "url('https://res.cloudinary.com/djvmehyvd/image/upload/v1730708478/jjb6gtwippzrubjbykda.png')" }}>
//             <div className="sm:mx-auto sm:w-full sm:max-w-sm">
//                 <img src="https://res.cloudinary.com/djvmehyvd/image/upload/v1728105550/f2wo1jiwdtkhouymt94a.png" alt="logo" className="px-150 mt-40 bg-white" />
//                 <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">Sign in to your account</h2>
//             </div>

//             <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm bg-white bg-opacity-80 rounded-lg p-6">
//                 <form className="space-y-6" onSubmit={showOtpField ? handleOtpSubmit : handleSubmit}>
//                     <div>
//                         <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">Email address</label>
//                         <div className="mt-2">
//                             <input
//                                 id="email"
//                                 name="email"
//                                 type="email"
//                                 autoComplete="email"
//                                 required
//                                 value={email}
//                                 onChange={(e) => setEmail(e.target.value)}
//                                 className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
//                             />
//                         </div>
//                     </div>

//                     <div>
//                         <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">Password</label>
//                         <div className="mt-2">
//                             <input
//                                 id="password"
//                                 name="password"
//                                 type="password"
//                                 autoComplete="current-password"
//                                 required
//                                 value={password}
//                                 onChange={(e) => setPassword(e.target.value)}
//                                 className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
//                             />
//                         </div>
//                     </div>

//                     {showOtpField && (
//                         <div>
//                             <label htmlFor="otp" className="block text-sm font-medium leading-6 text-gray-900">OTP</label>
//                             <div className="mt-2">
//                                 <input
//                                     id="otp"
//                                     name="otp"
//                                     type="text"
//                                     required
//                                     value={otp}
//                                     onChange={(e) => setOtp(e.target.value)}
//                                     className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
//                                 />
//                             </div>
//                         </div>
//                     )}

//                     <div>
//                         <button
//                             type="submit"
//                             disabled={loading}
//                             className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
//                         >
//                             {loading ? 'Loading...' : (showOtpField ? 'Verify OTP' : 'Sign in')}
//                         </button>
//                     </div>
//                 </form>

//                 {error && <p className="mt-2 text-center text-sm text-red-500">{error}</p>}
//             </div>
//             <button
//                 className='mt-10 text-center text-lg text-lime-600 text-wrap'
//                 onClick={handelForgotpasswordclick}
//             >
//                 Forgot Password
//             </button>
//         </div>
//     );
// };

// export default Login;


import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import { Eye, EyeOff, X } from "lucide-react"; // Added X icon for close button

const LoginScreen = () => {
  const [step, setStep] = useState(0); // For animation sequence

  // --- API states ---
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [otp, setOtp] = useState("");
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [showOtpField, setShowOtpField] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showErrorModal, setShowErrorModal] = useState(false); // New state for modal

  const navigate = useNavigate();

  // --- Animation sequence ---
  useEffect(() => {
    const timers = [
      setTimeout(() => setStep(1), 500),
      setTimeout(() => setStep(2), 1800),
      setTimeout(() => setStep(3), 2600),
      setTimeout(() => setStep(4), 3400),
      setTimeout(() => setStep(5), 4200),
    ];
    return () => timers.forEach(clearTimeout);
  }, []);

  // --- Login submit ---
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setShowErrorModal(false);

    try {
      const rooturi = import.meta.env.VITE_ROOT_URI;
      const apikey = import.meta.env.VITE_API_KEY;

      const response = await fetch(`${rooturi}/userauth/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          apiauthkey: apikey,
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (response.ok) {
        setShowOtpField(true);
        toast.success("OTP sent to your email. Please check your inbox.");
      } else {
        const errorMessage = data.message || "Login failed. Please try again.";
        setError(errorMessage);
        setShowErrorModal(true); // Show modal on error
        toast.error(errorMessage);
      }
    } catch (err) {
      console.error("Login error:", err);
      const errorMessage = "Network error. Please check your connection.";
      setError(errorMessage);
      setShowErrorModal(true); // Show modal on network error
      toast.error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  // --- OTP submit ---
  const handleOtpSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setShowErrorModal(false);
    
    try {
      const rooturi = import.meta.env.VITE_ROOT_URI;
      const apikey = import.meta.env.VITE_API_KEY;

      const response = await fetch(`${rooturi}/userauth/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          apiauthkey: apikey,
        },
        body: JSON.stringify({ email, password, otp }),
      });

      if (response.ok) {
        const data = await response.json();
        localStorage.setItem("token", data.token);
        toast.success("Login successful!");
        navigate("/");
      } else {
        const data = await response.json();
        const errorMessage = data.message || "OTP verification failed";
        setError(errorMessage);
        setShowErrorModal(true);
        toast.error(errorMessage);
      }
    } catch (err) {
      console.error("OTP verification error:", err);
      const errorMessage = "Network error. Please check your connection.";
      setError(errorMessage);
      setShowErrorModal(true);
      toast.error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const handleForgotPassword = () => {
    navigate("/forgotpassword");
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const closeErrorModal = () => {
    setShowErrorModal(false);
    setError(null);
  };

  return (
    <div
      className="flex min-h-screen items-center justify-center bg-cover bg-center relative"
      style={{
        backgroundImage:
          "url('https://res.cloudinary.com/djvmehyvd/image/upload/v1730708478/jjb6gtwippzrubjbykda.png')",
      }}
    >
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm"></div>

      {/* Error Modal */}
      {showErrorModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fadeIn">
          <div className="relative w-full max-w-md bg-white rounded-2xl shadow-2xl overflow-hidden animate-slideUp">
            {/* Modal Header */}
            <div className="bg-gradient-to-r from-red-500 to-pink-500 px-6 py-4 flex items-center justify-between">
              <h3 className="text-xl font-bold text-white">Error</h3>
              <button
                onClick={closeErrorModal}
                className="text-white hover:text-gray-200 transition-colors"
                aria-label="Close modal"
              >
                <X className="h-6 w-6" />
              </button>
            </div>

            {/* Modal Body */}
            <div className="p-6">
              <div className="flex items-start space-x-4">
                <div className="flex-shrink-0">
                  <div className="h-12 w-12 rounded-full bg-red-100 flex items-center justify-center">
                    <svg
                      className="h-6 w-6 text-red-600"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                      />
                    </svg>
                  </div>
                </div>
                <div className="flex-1">
                  <p className="text-gray-800 font-medium">Login Failed</p>
                  <p className="text-gray-600 text-sm mt-1">{error}</p>
                  <p className="text-gray-500 text-xs mt-2">
                    Please check your credentials and try again.
                  </p>
                </div>
              </div>
            </div>

            {/* Modal Footer */}
            <div className="bg-gray-50 px-6 py-4 flex justify-end border-t border-gray-100">
              <button
                onClick={closeErrorModal}
                className="px-4 py-2 bg-gradient-to-r from-indigo-500 to-purple-500 text-white font-medium rounded-lg hover:opacity-90 transition-opacity focus:outline-none focus:ring-2 focus:ring-indigo-400"
              >
                Try Again
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="z-10 w-full max-w-md p-10 bg-white/80 rounded-3xl shadow-2xl backdrop-blur-md flex flex-col items-center">
        {/* Logo */}
        <div className="w-32 h-32 flex items-center justify-center rounded-full bg-white/30 backdrop-blur-lg shadow-xl mb-6 transform transition-transform duration-1000 hover:scale-105">
          <img
            src="https://res.cloudinary.com/djvmehyvd/image/upload/v1728105550/f2wo1jiwdtkhouymt94a.png"
            alt="logo"
            className="w-20 h-20 object-contain"
          />
        </div>

        {/* Greeting + Subtitle */}
        <div
          className={`text-center transition-all duration-1000 ${
            step >= 1 ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
          }`}
        >
          <h2 className="text-3xl sm:text-4xl font-extrabold bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 bg-clip-text text-transparent drop-shadow-md">
            Hello, Superadmin!
          </h2>
          <p className="text-gray-800 italic mt-2 sm:text-base">
            Ready to manage? Sign in to get started.
          </p>
        </div>

        {/* Form */}
        <form
          className="w-full mt-8 space-y-4"
          onSubmit={showOtpField ? handleOtpSubmit : handleSubmit}
        >
          {/* Email */}
          <div
            className={`transition-all duration-1000 transform ${
              step >= 2 ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
            }`}
          >
            <label className="block text-sm font-medium text-gray-900">
              Email address
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              required
              className={`mt-1 block w-full rounded-lg border ${
                error && !showOtpField ? "border-red-500 focus:border-red-500 focus:ring-red-400" : "border-gray-300 focus:border-indigo-500 focus:ring-indigo-400"
              } bg-white/70 px-3 py-2 text-gray-900 placeholder-gray-400 focus:ring-2 focus:outline-none sm:text-sm`}
            />
          </div>

          {/* Password with Eye Icon */}
          {!showOtpField && (
            <div
              className={`transition-all duration-1000 transform ${
                step >= 3
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-6"
              }`}
            >
              <label className="block text-sm font-medium text-gray-900">
                Password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter your password"
                  required
                  className={`mt-1 block w-full rounded-lg border ${
                    error && !showOtpField ? "border-red-500 focus:border-red-500 focus:ring-red-400" : "border-gray-300 focus:border-indigo-500 focus:ring-indigo-400"
                  } bg-white/70 px-3 py-2 pr-10 text-gray-900 placeholder-gray-400 focus:ring-2 focus:outline-none sm:text-sm`}
                />
                <button
                  type="button"
                  onClick={togglePasswordVisibility}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-600 hover:text-gray-800 focus:outline-none mt-1"
                  aria-label={showPassword ? "Hide password" : "Show password"}
                >
                  {showPassword ? (
                    <EyeOff className="h-5 w-5" />
                  ) : (
                    <Eye className="h-5 w-5" />
                  )}
                </button>
              </div>
            </div>
          )}

          {/* OTP Field */}
          {showOtpField && (
            <div
              className={`transition-all duration-1000 transform ${
                step >= 3
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-6"
              }`}
            >
              <label className="block text-sm font-medium text-gray-900">
                Enter OTP
              </label>
              <input
                type="text"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
                placeholder="Enter OTP"
                required
                className="mt-1 block w-full rounded-lg border border-gray-300 bg-white/70 px-3 py-2 text-gray-900 placeholder-gray-400 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-400 focus:outline-none sm:text-sm"
              />
            </div>
          )}

          {/* Button */}
          <div
            className={`transition-all duration-1000 transform ${
              step >= 4 ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
            }`}
          >
            <button
              type="submit"
              disabled={loading}
              className="w-full rounded-full bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 px-4 py-2 text-white font-semibold shadow-lg hover:scale-105 transition-transform duration-300 disabled:opacity-60"
            >
              {showOtpField ? (loading ? "Verifying OTP..." : "Verify OTP") : loading ? "Signing in..." : "Sign in"}
            </button>
          </div>

          {/* Forgot Password */}
          {!showOtpField && (
            <div
              className={`w-full text-center transition-all duration-1000 transform ${
                step >= 5
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-6"
              }`}
            >
              <button
                type="button"
                className="mt-4 text-sm font-medium text-indigo-600 hover:text-indigo-500 underline"
                onClick={handleForgotPassword}
              >
                Forgot Password?
              </button>
            </div>
          )}
        </form>
      </div>

      {/* Add custom styles for modal animations */}
      <style jsx>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }
        @keyframes slideUp {
          from {
            transform: translateY(30px);
            opacity: 0;
          }
          to {
            transform: translateY(0);
            opacity: 1;
          }
        }
        .animate-fadeIn {
          animation: fadeIn 0.3s ease-out;
        }
        .animate-slideUp {
          animation: slideUp 0.3s ease-out;
        }
      `}</style>
    </div>
  );
};

export default LoginScreen;