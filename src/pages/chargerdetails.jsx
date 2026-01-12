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

/* ---------- UI Helper Components ---------- */
const Section = ({ title }) => (
  <h2 className="text-xl font-extrabold text-teal-300 border-b border-white/20 pb-1 mb-3">
    {title}
  </h2>
);

const Info = ({ label, value }) => (
  <div className="flex justify-between gap-4 bg-black/30 rounded-lg px-4 py-2">
    <span className="text-gray-300 font-semibold">{label}</span>
    <span className="text-white font-bold text-right break-all">
      {value || "-"}
    </span>
  </div>
);
/* ---------------------------------------- */

const ChargerDetails = () => {
  const navigate = useNavigate();
  const { uid } = useParams();

  const [chargerData, setChargerData] = useState(null);
  const [qrCode, setQrcode] = useState(null);
  const [chargerImage, setChargerImage] = useState(null);
  const [loading, setLoading] = useState(true);

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
          return;
        }

        const result = await res.json();
        setChargerData(result.chargerdata);
        setQrcode(result.qrdata);
        setChargerImage(result.chargerimageurl);
      } catch (err) {
        console.error(err);
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

  const backtohome = () => {
    navigate("/");
  };

  if (loading) {
    return (
      <div className="text-center mt-20 text-xl font-bold text-white">
        Loading...
      </div>
    );
  }

  return (
    <div
      className="relative min-h-screen bg-cover bg-center"
      style={{
        backgroundImage:
          "url('https://res.cloudinary.com/djvmehyvd/image/upload/v1730708478/jjb6gtwippzrubjbykda.png')",
      }}
    >
      <div className="absolute inset-0 bg-black/60 backdrop-blur-md"></div>

      <div className="relative z-10 container mx-auto px-4 py-8">
        {/* HOME BUTTON */}
        <button
          onClick={backtohome}
          className="mb-6 inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-teal-400 to-blue-600 text-white font-extrabold rounded-full shadow-lg hover:scale-105 transition-transform"
        >
          HOME
        </button>

        <h1 className="text-4xl font-extrabold text-white mb-2">
          Charger Details
        </h1>
        <p className="text-gray-300 mb-8">
          Charger UID: <span className="font-bold">{uid}</span>
        </p>

        {chargerData && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* LEFT */}
            <div className="bg-white/10 rounded-xl p-6 shadow-xl space-y-4">
              <Section title="Basic Information" />
              <Info label="Charger Name" value={chargerData.ChargerName} />
              <Info label="Serial Number" value={chargerData.Chargerserialnum} />
              <Info label="Type" value={chargerData.Chargertype} />
              <Info label="Segment" value={chargerData.Segment} />
              <Info label="Subsegment" value={chargerData.Subsegment} />
              <Info label="Total Capacity" value={chargerData.Total_Capacity} />
              <Info label="Connector Type" value={chargerData.Connector_type} />
            </div>

            {/* RIGHT */}
            <div className="bg-white/10 rounded-xl p-6 shadow-xl space-y-4">
              <Section title="Location & Usage" />

              {chargerImage && (
                <img
                  src={chargerImage}
                  alt="Charger"
                  className="rounded-lg mb-4 w-full max-h-60 object-cover"
                />
              )}

              <Info label="Use Type" value={chargerData.charger_use_type} />
              <Info label="Connector Capacity" value={chargerData.connector_total_capacity} />
              <Info label="Address" value={chargerData.full_address} />
              <Info label="Latitude" value={chargerData.lattitude} />
              <Info label="Longitude" value={chargerData.longitute} />
              <Info label="Connectors" value={chargerData.number_of_connectors} />
              <Info label="Parking" value={chargerData.parking} />
              <Info label="24/7 Open" value={chargerData.twenty_four_seven_open_status} />
            </div>
          </div>
        )}

        {/* QR CODE */}
        {qrCode && (
          <div className="mt-10 text-center">
            <h2 className="text-2xl font-extrabold text-white mb-4">
              QR Code
            </h2>
            <img
              src={qrCode}
              alt="QR Code"
              className="mx-auto rounded-lg shadow-lg"
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default ChargerDetails;
