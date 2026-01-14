// import React, { useState, useEffect } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { toast } from 'react-toastify';

// const AddMinimumBalance = () => {
//   const navigate = useNavigate();

//   const [minbal, setMinbal] = useState('');
//   const [hardLimit, setHardLimit] = useState('');
//   const [loadingMin, setLoadingMin] = useState(false);
//   const [loadingHard, setLoadingHard] = useState(false);

//   /* ================= AUTH CHECK ================= */
//   useEffect(() => {
//     const checkAuth = async () => {
//       const rooturi = import.meta.env.VITE_ROOT_URI;
//       const apikey = import.meta.env.VITE_API_KEY;

//       try {
//         const token = localStorage.getItem("token");
//         if (!token) return navigate("/signin");

//         const res = await fetch(`${rooturi}/userauth/verifyuser`, {
//           method: 'POST',
//           headers: {
//             'Content-Type': 'application/json',
//             'apiauthkey': apikey
//           },
//           body: JSON.stringify({ token })
//         });

//         const data = await res.json();
//         if (!res.ok || data.user.userType !== "superadmin") {
//           toast.error("Unauthorized access");
//           navigate("/signin");
//         }
//       } catch (error) {
//         console.error(error);
//         toast.error("Authentication error");
//         navigate("/signin");
//       }
//     };

//     checkAuth();
//   }, [navigate]);

//   /* ================= MIN BALANCE SUBMIT ================= */
//   const handleMinBalanceSubmit = async (e) => {
//     e.preventDefault();
//     if (!minbal) return toast.error("Minimum balance is required");

//     setLoadingMin(true);
//     try {
//       const rooturi = import.meta.env.VITE_ROOT_URI;
//       const apikey = import.meta.env.VITE_API_KEY;

//       const res = await fetch(`${rooturi}/users/createmb`, {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//           'apiauthkey': apikey
//         },
//         body: JSON.stringify({ minbalance: minbal })
//       });

//       const data = await res.json();
//       if (res.ok) toast.success(data.message);
//       else toast.error(data.message || "Failed to save minimum balance");
//     } catch (error) {
//       console.error(error);
//       toast.error("Unknown error occurred");
//     } finally {
//       setLoadingMin(false);
//     }
//   };

//   /* ================= HARD LIMIT SUBMIT ================= */
//   const handleHardLimitSubmit = async (e) => {
//     e.preventDefault();
//     if (!hardLimit) return toast.error("Hard limit is required");

//     setLoadingHard(true);
//     try {
//       const rooturi = import.meta.env.VITE_ROOT_URI;
//       const apikey = import.meta.env.VITE_API_KEY;

//       const res = await fetch(
//         `${rooturi}/admin/setwallethardlimit`,
//         {
//           method: 'POST',
//           headers: {
//             'Content-Type': 'application/json',
//             'apiauthkey': apikey
//           },
//           body: JSON.stringify({ hardlimit: hardLimit.toString() })
//         }
//       );

//       const data = await res.json();
//       if (res.ok) toast.success(data.message);
//       else toast.error(data.message || "Failed to set hard limit");
//     } catch (error) {
//       console.error(error);
//       toast.error("Unknown error occurred");
//     } finally {
//       setLoadingHard(false);
//     }
//   };

//   /* ================= IP TRACKING ================= */
//   useEffect(() => {
//     const fetchIp = async () => {
//       const rooturi = import.meta.env.VITE_ROOT_URI;
//       const apikey = import.meta.env.VITE_API_KEY;

//       try {
//         const res = await fetch("https://api.ipify.org?format=json");
//         const data = await res.json();

//         if (data?.ip) {
//           await fetch(`${rooturi}/admin/getip`, {
//             method: 'POST',
//             headers: {
//               'Content-Type': 'application/json',
//               'apiauthkey': apikey
//             },
//             body: JSON.stringify({
//               ip: data.ip,
//               datetime: new Date().toISOString(),
//               path: "addminimumbalance.jsx"
//             })
//           });
//         }
//       } catch (error) {
//         console.error(error);
//       }
//     };

//     fetchIp();
//   }, []);

//   const backToHome = (e) => {
//     e.preventDefault();
//     navigate("/");
//   };

//   return (
//     <div className="min-h-screen bg-gray-50 flex items-center justify-center p-6">
//       <div className="bg-white dark:bg-gray-900 shadow-2xl rounded-3xl p-8 w-full max-w-md space-y-10">

//         {/* ================= MIN BALANCE SECTION ================= */}
//         <div>
//           <h1 className="text-2xl font-bold text-center text-gray-800 dark:text-gray-200 mb-6">
//             Add <span className="text-blue-600">Minimum Balance</span>
//           </h1>

//           <form onSubmit={handleMinBalanceSubmit} className="space-y-6">
//             <div>
//               <label className="block text-sm font-medium mb-1">
//                 Minimum Balance
//               </label>
//               <input
//                 type="number"
//                 value={minbal}
//                 onChange={(e) => setMinbal(e.target.value)}
//                 placeholder="Ex. 300"
//                 className="w-full rounded-xl border px-4 py-2"
//               />
//             </div>

//             <button
//               type="submit"
//               disabled={loadingMin}
//               className="w-full py-3 rounded-full bg-blue-600 text-white font-semibold"
//             >
//               {loadingMin ? "Processing..." : "Save Minimum Balance"}
//             </button>
//           </form>
//         </div>

//         {/* ================= HARD LIMIT SECTION ================= */}
//         <div className="border-t pt-8">
//           <h2 className="text-xl font-bold text-center text-gray-800 dark:text-gray-200 mb-6">
//             Set <span className="text-red-600">Wallet Hard Limit</span>
//           </h2>

//           <form onSubmit={handleHardLimitSubmit} className="space-y-6">
//             <div>
//               <label className="block text-sm font-medium mb-1">
//                 Hard Limit Amount
//               </label>
//               <input
//                 type="number"
//                 value={hardLimit}
//                 onChange={(e) => setHardLimit(e.target.value)}
//                 placeholder="Ex. 5000"
//                 className="w-full rounded-xl border px-4 py-2"
//               />
//             </div>

//             <button
//               type="submit"
//               disabled={loadingHard}
//               className="w-full py-3 rounded-full bg-red-600 text-white font-semibold"
//             >
//               {loadingHard ? "Processing..." : "Set Hard Limit"}
//             </button>
//           </form>
//         </div>

//         {/* ================= HOME BUTTON ================= */}
//         <div className="text-center">
//           <button
//             onClick={backToHome}
//             className="py-2 px-6 rounded-full bg-teal-500 text-white font-bold"
//           >
//             HOME
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default AddMinimumBalance;
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const AddMinimumBalance = () => {
  const navigate = useNavigate();

  const [minbal, setMinbal] = useState('');
  const [hardLimit, setHardLimit] = useState('');
  const [loadingMin, setLoadingMin] = useState(false);
  const [loadingHard, setLoadingHard] = useState(false);

  // ✅ GET DATA STATES
  const [currentMinBal, setCurrentMinBal] = useState(null);
  const [currentHardLimit, setCurrentHardLimit] = useState(null);

  /* ================= AUTH CHECK ================= */
  useEffect(() => {
    const checkAuth = async () => {
      const rooturi = import.meta.env.VITE_ROOT_URI;
      const apikey = import.meta.env.VITE_API_KEY;

      try {
        const token = localStorage.getItem("token");
        if (!token) return navigate("/signin");

        const res = await fetch(`${rooturi}/userauth/verifyuser`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'apiauthkey': apikey
          },
          body: JSON.stringify({ token })
        });

        const data = await res.json();
        if (!res.ok || data.user.userType !== "superadmin") {
          toast.error("Unauthorized access");
          navigate("/signin");
        }
      } catch {
        toast.error("Authentication error");
        navigate("/signin");
      }
    };

    checkAuth();
    fetchMinBalance();
    fetchHardLimit();
  }, [navigate]);

  /* ================= GET APIS ================= */
  const fetchMinBalance = async () => {
    try {
      const rooturi = import.meta.env.VITE_ROOT_URI;
      const apikey = import.meta.env.VITE_API_KEY;

      const res = await fetch(`${rooturi}/users/getmb`, {
        headers: { apiauthkey: apikey }
      });

      const data = await res.json();
      if (res.ok) setCurrentMinBal(data?.minbalance);
    } catch {}
  };

  const fetchHardLimit = async () => {
    try {
      const rooturi = import.meta.env.VITE_ROOT_URI;
      const apikey = import.meta.env.VITE_API_KEY;

      const res = await fetch(`${rooturi}/admin/getwallethardlimit`, {
        headers: { apiauthkey: apikey }
      });

      const data = await res.json();
      if (res.ok) setCurrentHardLimit(data?.hardlimit);
    } catch {}
  };

  /* ================= SUBMITS (UNCHANGED) ================= */
  const handleMinBalanceSubmit = async (e) => {
    e.preventDefault();
    if (!minbal) return toast.error("Minimum balance is required");

    setLoadingMin(true);
    try {
      const rooturi = import.meta.env.VITE_ROOT_URI;
      const apikey = import.meta.env.VITE_API_KEY;

      const res = await fetch(`${rooturi}/users/createmb`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'apiauthkey': apikey
        },
        body: JSON.stringify({ minbalance: minbal })
      });

      const data = await res.json();

      if (res.ok) {
        toast.success(data.message);
        setMinbal('');
        fetchMinBalance(); // ✅ REFRESH GET
      } else {
        toast.error(data.message || "Failed");
      }
    } catch {
      toast.error("Unknown error occurred");
    } finally {
      setLoadingMin(false);
    }
  };

  const handleHardLimitSubmit = async (e) => {
    e.preventDefault();
    if (!hardLimit) return toast.error("Hard limit is required");

    setLoadingHard(true);
    try {
      const rooturi = import.meta.env.VITE_ROOT_URI;
      const apikey = import.meta.env.VITE_API_KEY;

      const res = await fetch(`${rooturi}/admin/setwallethardlimit`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'apiauthkey': apikey
        },
        body: JSON.stringify({ hardlimit: hardLimit.toString() })
      });

      const data = await res.json();

      if (res.ok) {
        toast.success(data.message);
        setHardLimit('');
        fetchHardLimit(); // ✅ REFRESH GET
      } else {
        toast.error(data.message || "Failed");
      }
    } catch {
      toast.error("Unknown error occurred");
    } finally {
      setLoadingHard(false);
    }
  };

  const backToHome = () => navigate("/");

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0f172a] via-[#020617] to-black flex items-center justify-center p-6">
      <div className="relative w-full max-w-lg rounded-3xl border border-white/10 bg-white/5 backdrop-blur-xl shadow-[0_0_40px_rgba(0,0,0,0.6)] p-8 space-y-10">

        <h1 className="text-center text-3xl font-bold tracking-wide text-white">
          Wallet <span className="text-cyan-400">Controls</span>
        </h1>

        {/* ===== Minimum Balance ===== */}
        <div className="rounded-2xl bg-black/40 border border-white/10 p-6 space-y-4">
          <h2 className="text-lg font-semibold text-cyan-300 text-center">
            Minimum Balance
          </h2>

          <form onSubmit={handleMinBalanceSubmit} className="space-y-5">
            <input
              type="number"
              value={minbal}
              onChange={(e) => setMinbal(e.target.value)}
              placeholder="300"
              className="w-full rounded-xl bg-black/60 border border-white/10 px-4 py-3 text-white"
            />

            <button disabled={loadingMin} className="w-full rounded-xl py-3 bg-cyan-600 text-white">
              {loadingMin ? "Saving..." : "Save Minimum Balance"}
            </button>
          </form>

          {currentMinBal !== null && (
            <p className="text-center text-sm text-green-400">
              Current Minimum Balance: ₹{currentMinBal}
            </p>
          )}
        </div>

        {/* ===== Hard Limit ===== */}
        <div className="rounded-2xl bg-black/40 border border-red-500/20 p-6 space-y-4">
          <h2 className="text-lg font-semibold text-red-400 text-center">
            Wallet Hard Limit
          </h2>

          <form onSubmit={handleHardLimitSubmit} className="space-y-5">
            <input
              type="number"
              value={hardLimit}
              onChange={(e) => setHardLimit(e.target.value)}
              placeholder="5000"
              className="w-full rounded-xl bg-black/60 border border-white/10 px-4 py-3 text-white"
            />

            <button disabled={loadingHard} className="w-full rounded-xl py-3 bg-red-600 text-white">
              {loadingHard ? "Applying..." : "Set Hard Limit"}
            </button>
          </form>

          {currentHardLimit !== null && (
            <p className="text-center text-sm text-green-400">
              Current Hard Limit: ₹{currentHardLimit}
            </p>
          )}
        </div>

        <div className="text-center">
          <button onClick={backToHome} className="text-gray-300 hover:text-white">
            ← Back to Dashboard
          </button>
        </div>

      </div>
    </div>
  );
};

export default AddMinimumBalance;
