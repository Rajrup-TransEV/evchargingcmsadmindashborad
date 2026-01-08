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

const LoginScreen = () => {
  const [step, setStep] = useState(0); // For animation sequence

  // --- API states ---
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [otp, setOtp] = useState("");
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [showOtpField, setShowOtpField] = useState(false);

  const navigate = useNavigate();

  // --- Animation sequence ---
  useEffect(() => {
    const timers = [
      setTimeout(() => setStep(1), 500), // Greeting + subtitle
      setTimeout(() => setStep(2), 1800), // Email
      setTimeout(() => setStep(3), 2600), // Password
      setTimeout(() => setStep(4), 3400), // Button
      setTimeout(() => setStep(5), 4200), // Forgot password
    ];
    return () => timers.forEach(clearTimeout);
  }, []);

  // --- Login submit ---
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

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
        setError(data.message || "Login failed");
        toast.error(data.message || "Login failed");
      }
    } catch (err) {
      console.error("Login error:", err);
      setError("An error occurred during login");
      toast.error("An error occurred during login");
    } finally {
      setLoading(false);
    }
  };

  // --- OTP submit ---
  const handleOtpSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
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
        toast.error(data.message || "OTP verification failed");
      }
    } catch (err) {
      console.error("OTP verification error:", err);
      toast.error("An error occurred during OTP verification");
    } finally {
      setLoading(false);
    }
  };

  const handleForgotPassword = () => {
    navigate("/forgotpassword");
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
              className="mt-1 block w-full rounded-lg border border-gray-300 bg-white/70 px-3 py-2 text-gray-900 placeholder-gray-400 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-400 focus:outline-none sm:text-sm"
            />
          </div>

          {/* Password */}
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
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter your password"
                required
                className="mt-1 block w-full rounded-lg border border-gray-300 bg-white/70 px-3 py-2 text-gray-900 placeholder-gray-400 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-400 focus:outline-none sm:text-sm"
              />
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
    </div>
  );
};

export default LoginScreen;
