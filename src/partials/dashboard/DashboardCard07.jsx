// import { useNavigate } from 'react-router-dom';
// import { toast } from 'react-toastify';
// import React, { useState, useEffect } from 'react';

// function DashboardCard07() {
//   const navigate = useNavigate();
//   const [chargerData, setChargerData] = useState([]); // Initial state is an empty array
//   const [loading, setLoading] = useState(true); // State to handle loading status

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
//           } else {
//             console.log("You are an authorized user");
//             navigate("/")
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

//   useEffect(() => {
//     const fetchAllChargerData = async () => {
//       const rooturi = import.meta.env.VITE_ROOT_URI;
//       const apikey = import.meta.env.VITE_API_KEY;

//       try {
//         const response = await fetch(`${rooturi}/admin/listofcharges`, {
//           method: "GET",
//           headers: {
//             'Content-Type': 'application/json',
//             'apiauthkey': apikey,
//           },
//         });

//         const result = await response.json();
//         const data = Array.isArray(result.data) ? result.data : [];
//         console.log("list of incoming data", data);
//         setChargerData(data);
//         setLoading(false);
//       } catch (error) {
//         console.error("Error fetching charger data:", error);
//         toast("Failed to fetch charger data");
//         setChargerData([]);
//         setLoading(false);
//       }
//     };

//     fetchAllChargerData();
//   }, []);

//   return (
//     <div className="col-span-full xl:col-span-8 bg-white dark:bg-gray-800 shadow-sm rounded-xl">
//       <header className="px-5 py-4 border-b border-gray-100 dark:border-gray-700/60">
//         <h2 className="font-semibold text-gray-800 dark:text-gray-100">Charger Data</h2>
//       </header>
//       <div className="p-3">
//         {/* Scrollable Table Container */}
//         <div className="overflow-x-auto" style={{ maxHeight: '400px', overflowY: 'auto' }}>
//           <table className="table-auto w-full dark:text-gray-300">
//             {/* Table header */}
//             <thead className="text-xs uppercase text-gray-400 dark:text-gray-500 bg-gray-50 dark:bg-gray-700 dark:bg-opacity-50 rounded-sm">
//               <tr>
//                 <th className="p-2"><div className="font-semibold text-left">Charger Name</div></th>
//                 <th className="p-2"><div className="font-semibold text-center">Charger Serial Number</div></th>
//                 <th className="p-2"><div className="font-semibold text-center">Total Capacity</div></th>
//                 <th className="p-2"><div className="font-semibold text-center">Connector Type</div></th>
//                 <th className="p-2"><div className="font-semibold text-center">Open Status</div></th>
//               </tr>
//             </thead>
//             {/* Table body */}
//             <tbody className="text-sm font-medium divide-y divide-gray-100 dark:divide-gray-700/60">
//               {loading ? (
//                 <tr>
//                   <td colSpan={5} className="text-center p-4">Loading...</td>
//                 </tr>
//               ) : (
//                 chargerData.map((charger) => (
//                   <tr key={charger.id}>
//                     <td className="p-2">{charger.ChargerName}</td>
//                     <td className="p-2">{charger.Chargerserialnum}</td>
//                     <td className="p-2">{charger.Total_Capacity}</td>
//                     <td className="p-2">{charger.Connector_type}</td>
//                     <td className="p-2">{charger.twenty_four_seven_open_status}</td>
//                   </tr>
//                 ))
//               )}
//             </tbody>
//           </table>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default DashboardCard07;

import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import React, { useState, useEffect } from 'react';

function DashboardCard07() {
  const navigate = useNavigate();
  const [chargerData, setChargerData] = useState([]);
  const [loading, setLoading] = useState(true);

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
          toast("Unauthorized");
          navigate("/signin");
        }
      } catch {
        toast("Authentication failed");
        navigate("/signin");
      }
    };

    checkAuthentication();
  }, [navigate]);

  useEffect(() => {
    const fetchAllChargerData = async () => {
      const rooturi = import.meta.env.VITE_ROOT_URI;
      const apikey = import.meta.env.VITE_API_KEY;

      try {
        const res = await fetch(`${rooturi}/admin/listofcharges`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            apiauthkey: apikey,
          },
        });

        const result = await res.json();
        setChargerData(Array.isArray(result.data) ? result.data : []);
      } catch {
        toast("Failed to fetch charger data");
        setChargerData([]);
      } finally {
        setLoading(false);
      }
    };

    fetchAllChargerData();
  }, []);

  return (
    <section className="col-span-full xl:col-span-8">
      <div
        className="relative rounded-2xl border border-gray-700/60
        bg-gradient-to-br from-gray-900 via-gray-900/90 to-gray-800
        shadow-[0_0_0_1px_rgba(99,102,241,0.15)]
        hover:shadow-[0_0_25px_rgba(99,102,241,0.25)]
        transition-all duration-300"
      >
        {/* Glow Accent */}
        <div className="absolute -top-24 -right-24 w-56 h-56 bg-indigo-500/20 rounded-full blur-3xl"></div>

        {/* Header */}
        <div className="relative px-6 py-5 border-b border-gray-700">
          <h2 className="text-xl font-semibold text-white tracking-wide">
            Charger Inventory
          </h2>
          <p className="mt-1 text-sm text-gray-400">
            Real-time overview of all charging stations
          </p>

          {/* Accent line */}
          <div className="mt-3 h-[2px] w-24 bg-gradient-to-r from-indigo-500 to-cyan-500 rounded-full"></div>
        </div>

        {/* Table */}
        <div className="relative overflow-hidden">
          <div className="overflow-x-auto overflow-y-auto max-h-[420px]">
            <table className="min-w-full text-sm">

              {/* Table Header */}
              <thead className="sticky top-0 z-10 bg-gray-900/95 backdrop-blur border-b border-gray-700">
                <tr className="text-xs uppercase tracking-widest text-gray-400">
                  <th className="px-6 py-4 text-left">Charger</th>
                  <th className="px-6 py-4 text-center">Serial No</th>
                  <th className="px-6 py-4 text-center">Capacity</th>
                  <th className="px-6 py-4 text-center">Connector</th>
                  <th className="px-6 py-4 text-center">Status</th>
                </tr>
              </thead>

              {/* Table Body */}
              <tbody className="divide-y divide-gray-800">
                {loading ? (
                  <tr>
                    <td colSpan="5" className="px-6 py-10 text-center text-gray-500">
                      Loading chargers…
                    </td>
                  </tr>
                ) : chargerData.length === 0 ? (
                  <tr>
                    <td colSpan="5" className="px-6 py-10 text-center text-gray-500">
                      No chargers available
                    </td>
                  </tr>
                ) : (
                  chargerData.map((charger, index) => (
                    <tr
                      key={charger.id || index}
                      className="group hover:bg-gray-800/60 transition"
                    >
                      <td className="px-6 py-4 font-medium text-white">
                        {charger.ChargerName}
                      </td>
                      <td className="px-6 py-4 text-center text-gray-400">
                        {charger.Chargerserialnum}
                      </td>
                      <td className="px-6 py-4 text-center text-gray-300">
                        {charger.Total_Capacity}
                      </td>
                      <td className="px-6 py-4 text-center text-gray-300">
                        {charger.Connector_type}
                      </td>
                      <td className="px-6 py-4 text-center">
                        <span
                          className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold
                          ${
                            charger.twenty_four_seven_open_status === "YES"
                              ? "bg-green-500/15 text-green-400 ring-1 ring-green-500/40"
                              : "bg-red-500/15 text-red-400 ring-1 ring-red-500/40"
                          }`}
                        >
                          {charger.twenty_four_seven_open_status === "YES"
                            ? "OPEN 24×7"
                            : "LIMITED"}
                        </span>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>

            </table>
          </div>
        </div>
      </div>
    </section>
  );
}

export default DashboardCard07;
