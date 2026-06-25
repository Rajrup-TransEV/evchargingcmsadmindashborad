// import React, { useState, useEffect } from 'react';
// import { useParams, useNavigate } from 'react-router-dom';
// import { toast } from 'react-toastify';

// const ChargerDetails = () => {
//   const navigate = useNavigate();
//   const { uid } = useParams();
//   const [chargerData, setChargerData] = useState(null);
//   const [qrCode, setQrcode] = useState(null);
//   const [chargerImage, setChargerImage] = useState(null);
//   const [loading, setLoading] = useState(true);

//   // Check authentication
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

//   // Fetch single charger data
//   useEffect(() => {
//     const fetchsingulardata = async () => {
//       const rooturi = import.meta.env.VITE_ROOT_URI;
//       const apikey = import.meta.env.VITE_API_KEY;

//       try {
//         const response = await fetch(`${rooturi}/admin/getsinglechargerdetails`, {
//           method: "POST",
//           headers: {
//             'Content-Type': 'application/json',
//             'apiauthkey': apikey,
//           },
//           body: JSON.stringify({ chargeruid: uid })
//         });

//         if (response.ok) {
//           const result = await response.json();
//           setChargerData(result.chargerdata);
//           setQrcode(result.qrdata);
//           setChargerImage(result.chargerimageurl);
//         } else {
//           toast("Failed to fetch charger details");
//         }
//       } catch (error) {
//         console.error("Error during data fetch:", error);
//         toast("An error occurred while fetching data");
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchsingulardata();
//   }, [uid]);

//   // IP tracking facility
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
//           await fetch(`${rooturi}/admin/getip`, {
//             method: 'POST',
//             headers: {
//               'Content-Type': 'application/json',
//               'apiauthkey': apikey,
//             },
//             body: JSON.stringify({ ip: data.ip, datetime: currentDateTime, path: "chargerdetails.jsx" })
//           });
//         }
//       } catch (error) {
//         console.error("Error fetching IP address:", error);
//       }
//     };

//     fetchIpAddress();
//   }, []);

//   const backtohome = (event) => {
//     event.preventDefault(); // Prevent default action
//     navigate("/"); // Navigate to home
//   }

//   if (loading) return <div>Loading...</div>;

//   return (
//     <div className="relative flex flex-col h-screen overflow-y-auto bg-cover bg-center" style={{ backgroundImage: "url('https://res.cloudinary.com/djvmehyvd/image/upload/v1730708478/jjb6gtwippzrubjbykda.png')" }}>
//       <div className="absolute inset-0  opacity-50 backdrop-blur-md"></div>

//       <div className="container mx-auto py-8 relative z-10  h-full">
//         <div className="py-11">
//           <button 
//             className="relative inline-block text-white font-bold py-2 px-4 rounded-full overflow-hidden group transition-transform duration-300 transform hover:scale-105"
//             onClick={backtohome}
//           >
//             <span className="absolute inset-0 bg-gradient-to-r from-teal-400 via-teal-500 to-teal-600 transform scale-110 group-hover:scale-100 transition duration-300"></span>
//             <span className="relative z-10">HOME</span>
//           </button>
//         </div>
        
//         <h1 className="text-3xl font-bold mb-4 text-white">Charger Details</h1>
//         <p className="mb-4 text-white">Charger UID: {uid}</p>
        
//         {chargerData && (
//           <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
//             <div>
//               <p className="font-bold text-white">Charger Name:</p>
//               <p className="mb-2 text-white">{chargerData.ChargerName}</p>
//               <p className="font-bold text-white">Charger Serial Number:</p>
//               <p className="mb-2 text-white">{chargerData.Chargerserialnum}</p>
//               <p className="font-bold text-white">Charger Type:</p>
//               <p className="mb-2 text-white">{chargerData.Chargertype}</p>
//               <p className="font-bold text-white">Connector Type:</p>
//               <p className="mb-2 text-white">{chargerData.Connector_type}</p>
//               <p className="font-bold text-white">Segment:</p>
//               <p className="mb-2 text-white">{chargerData.Segment}</p>
//               <p className="font-bold text-white">Subsegment:</p>
//               <p className="mb-2 text-white">{chargerData.Subsegment}</p>
//               <p className="font-bold text-white">Total Capacity:</p>
//               <p className="mb-2 text-white">{chargerData.Total_Capacity}</p>
//             </div>

//             <div>
//               {chargerImage && (
//                 <img src={chargerImage} alt="Charger" className="mb-4" />
//               )}
//               <p className="font-bold text-white">Charger Use Type:</p>
//               <p className="mb-2 text-white">{chargerData.charger_use_type}</p>
//               <p className="font-bold text-white">Connector Total Capacity:</p>
//               <p className="mb-2 text-white">{chargerData.connector_total_capacity}</p>
//               <p className="font-bold text-white">Full Address:</p>
//               <p className="mb-2 text-white">{chargerData.full_address}</p>
//               <p className="font-bold text-white">Latitude:</p>
//               <p className="mb-2 text-white">{chargerData.lattitude}</p>
//               <p className="font-bold text-white">Longitude:</p>
//               <p className="mb-2 text-white">{chargerData.longitute}</p>
//               <p className="font-bold text-white">Number of Connectors:</p>
//               <p className="mb-2 text-white">{chargerData.number_of_connectors}</p>
//               <p className="font-bold text-white">Parking:</p>
//               <p className="mb-2 text-white">{chargerData.parking}</p>
//               <p className="font-bold text-white">24/7 Open Status:</p>
//               <p className="mb-2 text-white">{chargerData.twenty_four_seven_open_status}</p>
//               <p className="font-bold text-white">UID:</p>
//               <p className="mb-2 text-white">{chargerData.uid}</p>
//             </div>
//           </div>
//         )}

//          {/* Display the QR code */}
//          {qrCode && (
//            <div className="mt-8">
//              <h2 className="text-2xl font-bold mb-4 text-white">QR Code</h2>
//              <div className="flex justify-center">
//                <img src={qrCode} alt="QR Code" />
//              </div>
//            </div>
//          )}
//       </div> 
//     </div> 
//   );
// };

// export default ChargerDetails;
import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Sidebar from '../partials/Sidebar';
import { 
  FiArrowLeft, 
  FiZap, 
  FiMapPin, 
  FiTag, 
  FiUser, 
  FiCalendar,
  FiClock,
  FiInfo,
  FiCopy,
  FiHome,
  FiImage,
  FiLink,
  FiGlobe,
  FiGrid,
  FiCode
} from "react-icons/fi";

/* ---------- UI Helper Components ---------- */
const Info = ({ label, value, icon: Icon }) => {
  // 🔥 SAFE RENDERING: Handle objects, arrays, null, undefined
  let displayValue = "—";
  
  if (value !== null && value !== undefined) {
    if (typeof value === "string") {
      displayValue = value;
    } else if (typeof value === "number" || typeof value === "boolean") {
      displayValue = String(value);
    } else if (typeof value === "object") {
      // For objects, show a readable summary
      if (Array.isArray(value)) {
        displayValue = `[${value.length} items]`;
      } else {
        // For objects like associatedadminid, show the ID if it has one
        if (value.id) {
          displayValue = value.id;
        } else if (value._id) {
          displayValue = value._id;
        } else {
          // Fallback: show JSON string
          displayValue = JSON.stringify(value);
        }
      }
    }
  }

  return (
    <div className="flex items-start gap-3 bg-gray-50 rounded-xl px-4 py-3 border border-gray-200 hover:border-emerald-200 transition-colors">
      {Icon && <Icon className="w-5 h-5 text-emerald-500 mt-0.5 flex-shrink-0" />}
      <div className="flex-1 min-w-0">
        <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider">{label}</p>
        <p className="text-sm text-gray-800 font-medium break-all">{displayValue}</p>
      </div>
    </div>
  );
};

const Section = ({ title, icon: Icon }) => (
  <div className="flex items-center gap-2 mb-4">
    {Icon && <Icon className="w-5 h-5 text-emerald-500" />}
    <h2 className="text-lg font-bold text-gray-800">{title}</h2>
    <div className="flex-1 h-px bg-gradient-to-r from-emerald-200 to-transparent"></div>
  </div>
);
/* ---------------------------------------- */

const ChargerDetails = () => {
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { uid } = useParams();

  const [chargerData, setChargerData] = useState(null);
  const [qrCode, setQrcode] = useState(null);
  const [chargerImage, setChargerImage] = useState(null);
  const [loading, setLoading] = useState(true);
  const [copied, setCopied] = useState(false);

  /* ---------- AUTH CHECK ---------- */
  useEffect(() => {
    const checkAuthentication = async () => {
      const rooturi = import.meta.env.VITE_ROOT_URI;
      const apikey = import.meta.env.VITE_API_KEY;

      try {
        const token = localStorage.getItem("token");
        if (!token) return navigate("/signin");

        const res = await fetch(`${rooturi}/userauth/verifyuser`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            apiauthkey: apikey,
          },
          body: JSON.stringify({ token }),
        });

        const data = await res.json();

        if (!res.ok || data.user.userType !== "superadmin") {
          toast.error("You are not authorized");
          navigate("/signin");
        }
      } catch (err) {
        console.error(err);
        toast.error("Authentication failed");
        navigate("/signin");
      }
    };

    checkAuthentication();
  }, [navigate]);

  /* ---------- FETCH CHARGER DETAILS ---------- */
  useEffect(() => {
    if (!uid) return;

    const fetchSingleData = async () => {
      const rooturi = import.meta.env.VITE_ROOT_URI;
      const apikey = import.meta.env.VITE_API_KEY;

      try {
        const res = await fetch(`${rooturi}/admin/getsinglechargerdetails`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            apiauthkey: apikey,
          },
          body: JSON.stringify({ chargeruid: uid }),
        });

        if (!res.ok) {
          toast.error("Failed to fetch charger details");
          setLoading(false);
          return;
        }

        const result = await res.json();
        console.log("Charger details response:", result);
        
        // Handle different response structures
        let charger = null;
        if (result.chargerdata) {
          charger = result.chargerdata;
        } else if (result.data) {
          charger = result.data;
        } else if (Array.isArray(result) && result.length > 0) {
          charger = result[0];
        } else if (typeof result === 'object' && result !== null) {
          charger = result;
        }

        setChargerData(charger);
        setQrcode(result.qrdata || result.qrCode || null);
        setChargerImage(result.chargerimageurl || result.chargerImage || null);
        
        if (!charger) {
          toast.warning("No charger data found");
        }
      } catch (err) {
        console.error("Error fetching charger data:", err);
        toast.error("Error fetching charger data");
      } finally {
        setLoading(false);
      }
    };

    fetchSingleData();
  }, [uid]);

  /* ---------- IP TRACKING ---------- */
  useEffect(() => {
    const fetchIpAddress = async () => {
      const rooturi = import.meta.env.VITE_ROOT_URI;
      const apikey = import.meta.env.VITE_API_KEY;

      try {
        const res = await fetch("https://api.ipify.org?format=json");
        const data = await res.json();

        if (data?.ip) {
          await fetch(`${rooturi}/admin/getip`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              apiauthkey: apikey,
            },
            body: JSON.stringify({
              ip: data.ip,
              datetime: new Date().toISOString(),
              path: "chargerdetails.jsx",
            }),
          });
        }
      } catch (err) {
        console.error("IP tracking failed", err);
      }
    };

    fetchIpAddress();
  }, []);

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text).then(() => {
      setCopied(true);
      toast.success('UID copied to clipboard!');
      setTimeout(() => setCopied(false), 3000);
    });
  };

  // Helper function to safely get value from nested object
  const getSafeValue = (obj, key, fallback = "—") => {
    if (!obj) return fallback;
    const value = obj[key];
    if (value === null || value === undefined) return fallback;
    if (typeof value === "object") {
      if (Array.isArray(value)) return `[${value.length} items]`;
      if (value.id) return value.id;
      if (value._id) return value._id;
      return JSON.stringify(value);
    }
    return value;
  };

  if (loading) {
    return (
      <div className="flex h-screen items-center justify-center bg-gradient-to-br from-blue-50 via-white to-indigo-50">
        <div className="flex items-center gap-3 text-gray-500">
          <svg className="animate-spin h-8 w-8 text-emerald-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
          <span className="text-lg font-medium">Loading charger details...</span>
        </div>
      </div>
    );
  }

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
          <h1 className="text-xl font-bold text-gray-800">Charger Details</h1>
          <div className="w-10" />
        </header>

        {/* Page Content */}
        <div className="flex-1 overflow-y-auto p-4 md:p-8">
          {/* Header */}
          <div className="hidden lg:flex items-center gap-4 mb-8">
            <button
              onClick={() => navigate('/listofcharger')}
              className="p-2.5 rounded-xl bg-white border border-gray-200 text-gray-600 hover:text-emerald-600 hover:border-emerald-300 hover:bg-emerald-50 transition-all duration-200 shadow-sm"
            >
              <FiArrowLeft className="w-5 h-5" />
            </button>
            <div>
              <h1 className="text-3xl font-bold text-gray-800 flex items-center gap-3">
                <span className="bg-gradient-to-r from-emerald-500 to-teal-500 p-2.5 rounded-xl text-white shadow-lg">
                  <FiZap className="w-6 h-6" />
                </span>
                Charger Details
              </h1>
              <p className="text-gray-500 mt-1">Complete information about this charging station</p>
            </div>
          </div>

          {/* Charger UID Badge */}
          <div className="mb-6 inline-flex items-center gap-3 px-5 py-2.5 bg-white rounded-xl shadow-sm border border-gray-200 hover:shadow-md transition-shadow">
            <FiZap className="w-4 h-4 text-emerald-500" />
            <span className="text-sm text-gray-600">Charger UID:</span>
            <span className="text-sm font-mono font-semibold text-gray-800">{uid}</span>
            <button
              onClick={() => copyToClipboard(uid)}
              className="p-1.5 hover:bg-gray-100 rounded-lg transition-colors"
              title="Copy UID"
            >
              <FiCopy className="w-4 h-4 text-gray-400 hover:text-gray-600" />
            </button>
          </div>

          {chargerData ? (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Left Column - Basic Info */}
              <div className="lg:col-span-2">
                <div className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-xl border border-gray-100 overflow-hidden hover:shadow-2xl transition-shadow duration-300">
                  <div className="bg-gradient-to-r from-emerald-500 to-teal-500 px-6 py-4">
                    <h2 className="text-lg font-bold text-white flex items-center gap-2">
                      <FiInfo className="w-5 h-5" />
                      Basic Information
                    </h2>
                  </div>
                  <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-4">
                    <Info label="Charger Name" value={getSafeValue(chargerData, 'ChargerName')} icon={FiZap} />
                    <Info label="Serial Number" value={getSafeValue(chargerData, 'Chargerserialnum')} icon={FiTag} />
                    <Info label="Type" value={getSafeValue(chargerData, 'Chargertype')} icon={FiZap} />
                    <Info label="Segment" value={getSafeValue(chargerData, 'Segment')} />
                    <Info label="Subsegment" value={getSafeValue(chargerData, 'Subsegment')} />
                    <Info label="Total Capacity" value={getSafeValue(chargerData, 'Total_Capacity') ? `${getSafeValue(chargerData, 'Total_Capacity')} kW` : "—"} icon={FiZap} />
                    <Info label="Connector Type" value={getSafeValue(chargerData, 'Connector_type')} />
                    <Info label="Connector Capacity" value={getSafeValue(chargerData, 'connector_total_capacity') ? `${getSafeValue(chargerData, 'connector_total_capacity')} kW` : "—"} />
                    <Info label="Number of Connectors" value={getSafeValue(chargerData, 'number_of_connectors')} />
                    <Info label="Parking" value={getSafeValue(chargerData, 'parking')} />
                    <Info label="Buyer" value={getSafeValue(chargerData, 'chargerbuyer')} icon={FiUser} />
                    <Info label="Charger Identity" value={getSafeValue(chargerData, 'chargeridentity')} />
                    <Info label="Status" value={getSafeValue(chargerData, 'status')} icon={FiZap} />
                    <Info label="Created At" value={getSafeValue(chargerData, 'createdAt')} icon={FiCalendar} />
                  </div>
                </div>

                {/* Location Info */}
                <div className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-xl border border-gray-100 overflow-hidden hover:shadow-2xl transition-shadow duration-300 mt-6">
                  <div className="bg-gradient-to-r from-blue-500 to-cyan-500 px-6 py-4">
                    <h2 className="text-lg font-bold text-white flex items-center gap-2">
                      <FiMapPin className="w-5 h-5" />
                      Location Details
                    </h2>
                  </div>
                  <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-4">
                    <Info label="Address" value={getSafeValue(chargerData, 'full_address')} icon={FiMapPin} />
                    <Info label="Latitude" value={getSafeValue(chargerData, 'lattitude')} icon={FiGlobe} />
                    <Info label="Longitude" value={getSafeValue(chargerData, 'longitute')} icon={FiGlobe} />
                    <Info label="24/7 Open" value={getSafeValue(chargerData, 'twenty_four_seven_open_status')} />
                    <Info label="Use Type" value={getSafeValue(chargerData, 'charger_use_type')} />
                  </div>
                </div>
              </div>

              {/* Right Column - Image & QR */}
              <div className="lg:col-span-1 space-y-6">
                {/* Charger Image */}
                <div className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-xl border border-gray-100 overflow-hidden hover:shadow-2xl transition-shadow duration-300">
                  <div className="bg-gradient-to-r from-purple-500 to-pink-500 px-6 py-4">
                    <h2 className="text-lg font-bold text-white flex items-center gap-2">
                      <FiImage className="w-5 h-5" />
                      Charger Image
                    </h2>
                  </div>
                  <div className="p-4">
                    {chargerImage ? (
                      <img
                        src={chargerImage}
                        alt="Charger"
                        className="w-full rounded-xl object-cover max-h-64"
                      />
                    ) : (
                      <div className="text-center py-12 text-gray-400">
                        <FiImage className="w-12 h-12 mx-auto mb-2 text-gray-300" />
                        <p className="text-sm">No image available</p>
                      </div>
                    )}
                  </div>
                </div>

                {/* QR Code */}
                {qrCode && (
                  <div className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-xl border border-gray-100 overflow-hidden hover:shadow-2xl transition-shadow duration-300">
                    <div className="bg-gradient-to-r from-orange-500 to-red-500 px-6 py-4">
                      <h2 className="text-lg font-bold text-white flex items-center gap-2">
                        <FiGrid className="w-5 h-5" />
                        QR Code
                      </h2>
                    </div>
                    <div className="p-4 text-center">
                      <img
                        src={qrCode}
                        alt="QR Code"
                        className="mx-auto rounded-xl max-w-[200px]"
                      />
                    </div>
                  </div>
                )}
              </div>
            </div>
          ) : (
            <div className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-xl border border-gray-100 p-12 text-center">
              <FiZap className="w-16 h-16 mx-auto text-gray-300 mb-4" />
              <h3 className="text-xl font-semibold text-gray-600">No charger data found</h3>
              <p className="text-gray-400 mt-2">The charger with UID {uid} could not be found</p>
            </div>
          )}

          {/* Footer */}
          <div className="mt-8 text-center text-xs text-gray-400 border-t border-gray-200 pt-4">
            © {new Date().getFullYear()} Admin Panel. All rights reserved.
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChargerDetails;