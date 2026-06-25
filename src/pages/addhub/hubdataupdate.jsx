// import React, { useState, useEffect } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { toast } from 'react-toastify';

// const UpdateHub = () => {
//   const [hubid, sethubid] = useState('');
//   const [hubname, sethubname] = useState('');
//   const [hubtariff, sethubtariff] = useState('');
//   const [hublocation, sethublocation] = useState('');
//   const [adminid, setadminid] = useState('');
//   const [addChargerId, setAddChargerId] = useState('');
//   const [removeChargerId, setRemoveChargerId] = useState('');
//   const [ipAddress, setIpAddress] = useState('');
//   const navigate = useNavigate();

//   // Auth check
//   useEffect(() => {
//     const checkAuthentication = async () => {
//       const rooturi = import.meta.env.VITE_ROOT_URI;
//       const apikey = import.meta.env.VITE_API_KEY;

//       try {
//         const gettoken = localStorage.getItem("token");
//         if (!gettoken) {
//           navigate("/signin");
//           return;
//         }

//         const response = await fetch(`${rooturi}/userauth/verifyuser`, {
//           method: 'POST',
//           headers: {
//             'Content-Type': 'application/json',
//             'apiauthkey': apikey,
//           },
//           body: JSON.stringify({ token: gettoken })
//         });

//         const data = await response.json();
//         if (response.ok) {
//           if (data.user.userType !== "superadmin") {
//             toast("You have no authorization to view this page");
//             navigate("/signin");
//           }
//         } else {
//           toast("Failed to verify user");
//           navigate("/signin");
//         }
//       } catch (error) {
//         console.error("Error during authentication check:", error);
//         toast("An error occurred during authentication");
//         navigate("/signin");
//       }
//     };

//     checkAuthentication();
//   }, [navigate]);

//   // IP Tracking
//   useEffect(() => {
//     const fetchIpAddress = async () => {
//       const rooturi = import.meta.env.VITE_ROOT_URI;
//       const apikey = import.meta.env.VITE_API_KEY;

//       try {
//         const response = await fetch("https://api.ipify.org?format=json");
//         const data = await response.json();

//         if (data) {
//           setIpAddress(data.ip);
//           const currentDateTime = new Date().toISOString();
//           const pathfinder = "updatehub.jsx";
//           await fetch(`${rooturi}/admin/getip`, {
//             method: 'POST',
//             headers: {
//               'Content-Type': 'application/json',
//               'apiauthkey': apikey,
//             },
//             body: JSON.stringify({ ip: data.ip, datetime: currentDateTime, path: pathfinder })
//           });
//         }
//       } catch (error) {
//         console.error("Error fetching IP address:", error);
//       }
//     };

//     fetchIpAddress();
//   }, []);

//   // Submit handler
//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     const rooturi = import.meta.env.VITE_ROOT_URI;
//     const apikey = import.meta.env.VITE_API_KEY;

//     const dataToSubmit = {
//       hubid,
//       ...(hubname && { hubname }),
//       ...(hubtariff && { hubtariff }),
//       ...(hublocation && { hublocation }),
//       ...(adminid && { adminuid: adminid }),
//       ...(addChargerId && { addChargerId }),
//       ...(removeChargerId && { removeChargerId }),
//     };

//     try {
//       const response = await fetch(`${rooturi}/admin/updatehubdata`, {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//           'apiauthkey': apikey,
//         },
//         body: JSON.stringify(dataToSubmit),
//       });

//       if (response.ok) {
//         toast("Hub updated successfully!");
//       } else {
//         toast("Failed to update hub");
//       }
//     } catch (error) {
//       console.error("Error during hub update:", error);
//       toast("An error occurred while updating the hub");
//     }
//   };

//   const backtohome = (event) => {
//     event.preventDefault();
//     navigate("/");
//   };

//   return (
//     <section className="bg-white dark:bg-gray-900">
//       <div className="lg:grid lg:min-h-screen lg:grid-cols-12">
//         <aside className="relative block h-16 lg:order-last lg:col-span-5 lg:h-full xl:col-span-6">
//           <img
//             alt=""
//             src="https://res.cloudinary.com/djvmehyvd/image/upload/v1730708478/jjb6gtwippzrubjbykda.png"
//             className="absolute inset-0 h-full w-full object-cover"
//           />
//         </aside>

//         <main className="flex items-center justify-center px-8 py-8 sm:px-12 lg:col-span-7 lg:px-16 lg:py-12 xl:col-span-6">
//           <div className="max-w-xl lg:max-w-3xl">
//             <h1 className="mt-6 text-2xl font-bold text-gray-900 sm:text-3xl md:text-4xl dark:text-white">
//               Welcome to update hub section 🦑
//             </h1>
//             <p className="mt-4 leading-relaxed text-gray-500 dark:text-gray-400">
//               Through this section you can update selected hub data.
//             </p>

//             <form onSubmit={handleSubmit} className="mt-8 grid grid-cols-6 gap-6">

//               <div className="col-span-6">
//                 <label htmlFor="hubid" className="block text-sm font-medium text-gray-700 dark:text-gray-200">
//                   Hub ID
//                 </label>
//                 <input
//                   type="text"
//                   id="hubid"
//                   value={hubid}
//                   onChange={(e) => sethubid(e.target.value)}
//                   required
//                   className="mt-1 w-full rounded-md border-gray-200 bg-white text-sm text-gray-700 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-200"
//                 />
//               </div>

//               <div className="col-span-6 sm:col-span-3">
//                 <label htmlFor="hubname" className="block text-sm font-medium text-gray-700 dark:text-gray-200">
//                   Hub Name
//                 </label>
//                 <input
//                   type="text"
//                   id="hubname"
//                   value={hubname}
//                   onChange={(e) => sethubname(e.target.value)}
//                   className="mt-1 w-full rounded-md border-gray-200 bg-white text-sm text-gray-700 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-200"
//                 />
//               </div>

//               <div className="col-span-6 sm:col-span-3">
//                 <label htmlFor="hubtariff" className="block text-sm font-medium text-gray-700 dark:text-gray-200">
//                   Hub Tariff
//                 </label>
//                 <input
//                   type="text"
//                   id="hubtariff"
//                   value={hubtariff}
//                   onChange={(e) => sethubtariff(e.target.value)}
//                   className="mt-1 w-full rounded-md border-gray-200 bg-white text-sm text-gray-700 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-200"
//                 />
//               </div>

//               <div className="col-span-6 sm:col-span-3">
//                 <label htmlFor="hublocation" className="block text-sm font-medium text-gray-700 dark:text-gray-200">
//                   Hub Location
//                 </label>
//                 <input
//                   type="text"
//                   id="hublocation"
//                   value={hublocation}
//                   onChange={(e) => sethublocation(e.target.value)}
//                   className="mt-1 w-full rounded-md border-gray-200 bg-white text-sm text-gray-700 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-200"
//                 />
//               </div>

//               <div className="col-span-6 sm:col-span-3">
//                 <label htmlFor="adminid" className="block text-sm font-medium text-gray-700 dark:text-gray-200">
//                   Admin UID
//                 </label>
//                 <input
//                   type="text"
//                   id="adminid"
//                   value={adminid}
//                   onChange={(e) => setadminid(e.target.value)}
//                   className="mt-1 w-full rounded-md border-gray-200 bg-white text-sm text-gray-700 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-200"
//                 />
//               </div>

//               <div className="col-span-6 sm:col-span-3">
//                 <label htmlFor="addChargerId" className="block text-sm font-medium text-gray-700 dark:text-gray-200">
//                   Add Charger ID
//                 </label>
//                 <input
//                   type="text"
//                   id="addChargerId"
//                   value={addChargerId}
//                   onChange={(e) => setAddChargerId(e.target.value)}
//                   placeholder="Enter charger ID to add"
//                   className="mt-1 w-full rounded-md border-gray-200 bg-white text-sm text-gray-700 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-200"
//                 />
//               </div>

//               <div className="col-span-6 sm:col-span-3">
//                 <label htmlFor="removeChargerId" className="block text-sm font-medium text-gray-700 dark:text-gray-200">
//                   Remove Charger ID
//                 </label>
//                 <input
//                   type="text"
//                   id="removeChargerId"
//                   value={removeChargerId}
//                   onChange={(e) => setRemoveChargerId(e.target.value)}
//                   placeholder="Enter charger ID to remove"
//                   className="mt-1 w-full rounded-md border-gray-200 bg-white text-sm text-gray-700 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-200"
//                 />
//               </div>

//               <div className="col-span-6">
//                 <button
//                   type="submit"
//                   className="inline-block w-full rounded-md bg-blue-600 px-5 py-3 text-sm font-medium text-white shadow hover:bg-blue-700 focus:outline-none"
//                 >
//                   Update Hub
//                 </button>
//               </div>

//               <div className="col-span-6">
//                 <button
//                   className="relative inline-block text-white font-bold py-2 px-4 rounded-full overflow-hidden group transition-transform duration-300 transform hover:scale-105"
//                   onClick={backtohome}
//                 >
//                   <span className="absolute inset-0 bg-gradient-to-r from-teal-400 via-teal-500 to-teal-600 transform scale-110 group-hover:scale-100 transition duration-300"></span>
//                   <span className="relative z-10">HOME</span>
//                 </button>
//               </div>

//             </form>
//           </div>
//         </main>
//       </div>
//     </section>
//   );
// };

// export default UpdateHub;
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import Sidebar from '../../partials/Sidebar';
import {
  FiArrowLeft,
  FiSave,
  FiHome,
  FiMapPin,
  FiZap,
  FiTag,
  FiUser,
  FiPlus,
  FiMinus,
  FiEdit2,
  FiRefreshCw,
  FiInfo,
  FiCheckCircle,
  FiAlertCircle
} from 'react-icons/fi';

const UpdateHub = () => {
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const [hubid, setHubId] = useState('');
  const [hubname, setHubName] = useState('');
  const [hubtariff, setHubTariff] = useState('');
  const [hublocation, setHubLocation] = useState('');
  const [adminid, setAdminId] = useState('');
  const [addChargerId, setAddChargerId] = useState('');
  const [removeChargerId, setRemoveChargerId] = useState('');
  const [loading, setLoading] = useState(false);
  const [hubData, setHubData] = useState(null);

  /* ================= AUTH ================= */
  useEffect(() => {
    const checkAuth = async () => {
      const rooturi = import.meta.env.VITE_ROOT_URI;
      const apikey = import.meta.env.VITE_API_KEY;
      const token = localStorage.getItem("token");

      if (!token) return navigate("/signin");

      try {
        const res = await fetch(`${rooturi}/userauth/verifyuser`, {
          method: "POST",
          headers: { "Content-Type": "application/json", apiauthkey: apikey },
          body: JSON.stringify({ token })
        });

        const data = await res.json();
        if (!res.ok || data.user.userType !== "superadmin") {
          toast.error("Unauthorized access");
          navigate("/signin");
        }
      } catch {
        toast.error("Authentication failed");
        navigate("/signin");
      }
    };

    checkAuth();
  }, [navigate]);

  /* ================= FETCH HUB DATA ================= */
  const fetchHubData = async () => {
    if (!hubid) {
      toast.warning("Please enter a Hub ID first");
      return;
    }

    const rooturi = import.meta.env.VITE_ROOT_URI;
    const apikey = import.meta.env.VITE_API_KEY;

    try {
      setLoading(true);
      const res = await fetch(`${rooturi}/admin/hubdetails`, {
        method: "POST",
        headers: {
          'Content-Type': 'application/json',
          'apiauthkey': apikey,
        },
        body: JSON.stringify({ uid: hubid })
      });

      if (res.ok) {
        const result = await res.json();
        if (Array.isArray(result.data) && result.data.length > 0) {
          const data = result.data[0];
          setHubData(data);
          setHubName(data.hubname || '');
          setHubTariff(data.hubtariff || '');
          setHubLocation(data.hublocation || '');
          setAdminId(data.adminuid || '');
          toast.success("Hub data loaded successfully");
        } else {
          toast.error("No hub found with this ID");
          setHubData(null);
        }
      } else {
        toast.error("Failed to fetch hub details");
        setHubData(null);
      }
    } catch {
      toast.error("Server error");
      setHubData(null);
    } finally {
      setLoading(false);
    }
  };

  /* ================= SUBMIT ================= */
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const rooturi = import.meta.env.VITE_ROOT_URI;
    const apikey = import.meta.env.VITE_API_KEY;

    const payload = {
      hubid,
      ...(hubname && { hubname }),
      ...(hubtariff && { hubtariff }),
      ...(hublocation && { hublocation }),
      ...(adminid && { adminuid: adminid }),
      ...(addChargerId && { addChargerId }),
      ...(removeChargerId && { removeChargerId }),
    };

    try {
      const res = await fetch(`${rooturi}/admin/updatehubdata`, {
        method: "POST",
        headers: { "Content-Type": "application/json", apiauthkey: apikey },
        body: JSON.stringify(payload)
      });

      if (res.ok) {
        toast.success("Hub updated successfully 🚀");
        // Reset add/remove fields after successful update
        setAddChargerId('');
        setRemoveChargerId('');
        // Refresh hub data
        await fetchHubData();
      } else {
        const error = await res.json();
        toast.error(error.message || "Update failed");
      }
    } catch {
      toast.error("Server error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex h-screen overflow-hidden bg-gradient-to-br from-slate-50 via-white to-emerald-50">
      {/* Sidebar */}
      <Sidebar
        sidebarOpen={sidebarOpen}
        setSidebarOpen={setSidebarOpen}
        variant="default"
      />

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Mobile Header */}
        <header className="lg:hidden flex items-center justify-between p-4 bg-white/90 backdrop-blur-sm border-b border-gray-100">
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="p-2 rounded-lg text-gray-600 hover:bg-gray-100 transition-colors"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
          <h1 className="text-xl font-bold text-gray-800">Update Hub</h1>
          <div className="w-10" />
        </header>

        {/* Page Content */}
        <div className="flex-1 overflow-y-auto p-4 md:p-8">
          {/* Header */}
          <div className="hidden lg:flex items-center gap-4 mb-8">
            <button
              onClick={() => navigate('/listofhubs')}
              className="p-2.5 rounded-xl bg-white border border-gray-200 text-gray-600 hover:text-emerald-600 hover:border-emerald-300 hover:bg-emerald-50 transition-all duration-200 shadow-sm"
            >
              <FiArrowLeft className="w-5 h-5" />
            </button>
            <div>
              <h1 className="text-3xl font-bold text-gray-800 flex items-center gap-3">
                <span className="bg-gradient-to-r from-emerald-500 to-teal-500 p-2.5 rounded-xl text-white shadow-lg">
                  <FiEdit2 className="w-6 h-6" />
                </span>
                Update Hub
              </h1>
              <p className="text-gray-500 mt-1">Modify hub details, tariffs and charger mappings</p>
            </div>
          </div>

          {/* Form */}
          <div className="max-w-4xl mx-auto">
            <div className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-xl border border-gray-100 overflow-hidden hover:shadow-2xl transition-shadow duration-300">
              <form onSubmit={handleSubmit} className="p-6 md:p-8">
                {/* Info Banner */}
                <div className="mb-6 p-4 bg-gradient-to-r from-emerald-50 to-teal-50 rounded-xl border border-emerald-200 flex items-start gap-3">
                  <FiInfo className="w-5 h-5 text-emerald-500 mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="text-sm text-gray-700">
                      Enter the Hub ID and click <span className="font-semibold text-emerald-600">"Load Hub Data"</span> to fetch existing details, then update the fields you want to change.
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Hub ID with Load Button */}
                  <div className="md:col-span-2">
                    <label className="text-sm font-semibold text-gray-700 flex items-center gap-1">
                      <FiTag className="w-4 h-4 text-emerald-500" />
                      Hub ID <span className="text-red-500 text-xs">*</span>
                    </label>
                    <div className="flex gap-3 mt-1">
                      <input
                        required
                        value={hubid}
                        onChange={e => setHubId(e.target.value)}
                        className="flex-1 rounded-xl bg-gray-50 border border-gray-200 text-gray-700 px-4 py-3 focus:ring-2 focus:ring-emerald-400 focus:border-transparent outline-none transition-all duration-200"
                        placeholder="Enter Hub UID"
                      />
                      <button
                        type="button"
                        onClick={fetchHubData}
                        disabled={loading || !hubid}
                        className="px-6 py-3 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-500 text-white font-semibold shadow-md hover:shadow-lg hover:scale-105 transition transform disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2 whitespace-nowrap"
                      >
                        <FiRefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
                        Load Hub
                      </button>
                    </div>
                  </div>

                  {/* Hub Name */}
                  <div>
                    <label className="text-sm font-semibold text-gray-700 flex items-center gap-1">
                      <FiMapPin className="w-4 h-4 text-emerald-500" />
                      Hub Name
                    </label>
                    <input
                      value={hubname}
                      onChange={e => setHubName(e.target.value)}
                      className="mt-1 w-full rounded-xl bg-gray-50 border border-gray-200 text-gray-700 px-4 py-3 focus:ring-2 focus:ring-emerald-400 focus:border-transparent outline-none transition-all duration-200"
                      placeholder="Enter hub name"
                    />
                  </div>

                  {/* Hub Tariff */}
                  <div>
                    <label className="text-sm font-semibold text-gray-700 flex items-center gap-1">
                      <FiZap className="w-4 h-4 text-emerald-500" />
                      Hub Tariff (₹)
                    </label>
                    <input
                      value={hubtariff}
                      onChange={e => setHubTariff(e.target.value)}
                      className="mt-1 w-full rounded-xl bg-gray-50 border border-gray-200 text-gray-700 px-4 py-3 focus:ring-2 focus:ring-emerald-400 focus:border-transparent outline-none transition-all duration-200"
                      placeholder="e.g., 5.00/kWh"
                    />
                  </div>

                  {/* Hub Location */}
                  <div>
                    <label className="text-sm font-semibold text-gray-700 flex items-center gap-1">
                      <FiMapPin className="w-4 h-4 text-emerald-500" />
                      Hub Location
                    </label>
                    <input
                      value={hublocation}
                      onChange={e => setHubLocation(e.target.value)}
                      className="mt-1 w-full rounded-xl bg-gray-50 border border-gray-200 text-gray-700 px-4 py-3 focus:ring-2 focus:ring-emerald-400 focus:border-transparent outline-none transition-all duration-200"
                      placeholder="Enter location"
                    />
                  </div>

                  {/* Admin ID */}
                  <div>
                    <label className="text-sm font-semibold text-gray-700 flex items-center gap-1">
                      <FiUser className="w-4 h-4 text-emerald-500" />
                      Admin UID
                    </label>
                    <input
                      value={adminid}
                      onChange={e => setAdminId(e.target.value)}
                      className="mt-1 w-full rounded-xl bg-gray-50 border border-gray-200 text-gray-700 px-4 py-3 focus:ring-2 focus:ring-emerald-400 focus:border-transparent outline-none transition-all duration-200"
                      placeholder="Enter admin UID"
                    />
                  </div>

                  {/* Charger Operations */}
                  <div className="md:col-span-2">
                    <div className="border-t border-gray-200 pt-6 mt-2">
                      <h3 className="text-sm font-semibold text-gray-700 flex items-center gap-2 mb-4">
                        <FiZap className="w-4 h-4 text-emerald-500" />
                        Charger Operations
                      </h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                          <label className="text-sm font-semibold text-gray-700 flex items-center gap-1">
                            <FiPlus className="w-4 h-4 text-emerald-500" />
                            Add Charger ID
                          </label>
                          <input
                            value={addChargerId}
                            onChange={e => setAddChargerId(e.target.value)}
                            className="mt-1 w-full rounded-xl bg-gray-50 border border-gray-200 text-gray-700 px-4 py-3 focus:ring-2 focus:ring-emerald-400 focus:border-transparent outline-none transition-all duration-200"
                            placeholder="Enter charger UID to add"
                          />
                        </div>
                        <div>
                          <label className="text-sm font-semibold text-gray-700 flex items-center gap-1">
                            <FiMinus className="w-4 h-4 text-red-500" />
                            Remove Charger ID
                          </label>
                          <input
                            value={removeChargerId}
                            onChange={e => setRemoveChargerId(e.target.value)}
                            className="mt-1 w-full rounded-xl bg-gray-50 border border-gray-200 text-gray-700 px-4 py-3 focus:ring-2 focus:ring-red-400 focus:border-transparent outline-none transition-all duration-200"
                            placeholder="Enter charger UID to remove"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="mt-8 pt-6 border-t border-gray-200 flex flex-col sm:flex-row gap-4">
                  <button
                    type="submit"
                    disabled={loading}
                    className="flex-1 py-3 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-500 text-white font-bold shadow-md hover:shadow-lg hover:scale-105 transition transform disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                  >
                    {loading ? (
                      <>
                        <svg className="animate-spin h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        Updating Hub...
                      </>
                    ) : (
                      <>
                        <FiSave className="w-5 h-5" />
                        Update Hub
                      </>
                    )}
                  </button>

                  <button
                    type="button"
                    onClick={() => navigate('/listofhubs')}
                    className="flex-1 py-3 rounded-xl text-gray-700 font-semibold border border-gray-300 hover:bg-gray-50 transition-all duration-200 flex items-center justify-center gap-2"
                  >
                    <FiArrowLeft className="w-4 h-4" />
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          </div>

          {/* Footer */}
          <div className="mt-8 text-center text-xs text-gray-400 border-t border-gray-200 pt-4">
            © {new Date().getFullYear()} Admin Panel. All rights reserved.
          </div>
        </div>
      </div>
    </div>
  );
};

export default UpdateHub;