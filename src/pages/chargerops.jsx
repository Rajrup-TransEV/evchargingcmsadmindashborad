// import React, { useState, useEffect } from "react";
// import { useNavigate } from "react-router-dom";
// import { toast } from "react-toastify";
// import {
//   FiEdit,
//   FiTrash2,
//   FiSettings,
//   FiHome,
//   FiSearch,
// } from "react-icons/fi";

// const ChargerOperationsView = () => {
//   const navigate = useNavigate();
//   const [chargerData, setChargerData] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [currentPage, setCurrentPage] = useState(1);
//   const [itemsPerPage] = useState(8);
//   const [searchQuery, setSearchQuery] = useState("");

//   /* ================= AUTH ================= */
//   useEffect(() => {
//     const checkAuth = async () => {
//       const rooturi = import.meta.env.VITE_ROOT_URI;
//       const apikey = import.meta.env.VITE_API_KEY;

//       try {
//         const token = localStorage.getItem("token");
//         if (!token) return navigate("/signin");

//         const res = await fetch(`${rooturi}/userauth/verifyuser`, {
//           method: "POST",
//           headers: {
//             "Content-Type": "application/json",
//             apiauthkey: apikey,
//           },
//           body: JSON.stringify({ token }),
//         });

//         const data = await res.json();
//         if (!res.ok || data.user.userType !== "superadmin") {
//           toast.error("Unauthorized");
//           navigate("/signin");
//         }
//       } catch {
//         toast.error("Authentication error");
//         navigate("/signin");
//       }
//     };

//     checkAuth();
//   }, [navigate]);

//   /* ================= FETCH ================= */
//   useEffect(() => {
//     const fetchChargers = async () => {
//       const rooturi = import.meta.env.VITE_ROOT_URI;
//       const apikey = import.meta.env.VITE_API_KEY;

//       try {
//         const res = await fetch(`${rooturi}/admin/listofcharges`, {
//           headers: { apiauthkey: apikey },
//         });

//         const result = await res.json();
//         setChargerData(Array.isArray(result.data) ? result.data : []);
//       } catch {
//         toast.error("Failed to fetch charger list");
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchChargers();
//   }, []);

//   /* ================= FILTER & PAGINATION ================= */
//   const filteredChargers = chargerData.filter(
//     (ch) =>
//       ch.ChargerName?.toLowerCase().includes(searchQuery.toLowerCase()) ||
//       ch.uid?.toLowerCase().includes(searchQuery.toLowerCase())
//   );

//   const indexOfLast = currentPage * itemsPerPage;
//   const indexOfFirst = indexOfLast - itemsPerPage;
//   const currentChargers = filteredChargers.slice(
//     indexOfFirst,
//     indexOfLast
//   );

//   /* ================= DELETE ================= */
//   const handleDelete = async (uid) => {
//     if (!window.confirm("Delete this charger?")) return;

//     const rooturi = import.meta.env.VITE_ROOT_URI;
//     const apikey = import.meta.env.VITE_API_KEY;

//     try {
//       const res = await fetch(`${rooturi}/admin/deletechargerunits`, {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//           apiauthkey: apikey,
//         },
//         body: JSON.stringify({ uid }),
//       });

//       if (res.ok) {
//         toast.success("Charger deleted");
//         setChargerData((prev) => prev.filter((c) => c.uid !== uid));
//       } else {
//         toast.error("Delete failed");
//       }
//     } catch {
//       toast.error("Delete error");
//     }
//   };

//   /* ================= UI ================= */
//   return (
//     <div className="min-h-screen p-6 bg-gradient-to-br from-[#020617] via-[#0b1220] to-[#020617] text-gray-200">
//       {/* Header */}
//       <div className="flex flex-col md:flex-row justify-between items-center mb-6 gap-4">
//         <h1 className="text-3xl font-extrabold">Charger Dashboard</h1>

//         <div className="flex items-center gap-3">
//           <div className="relative">
//             <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
//             <input
//               value={searchQuery}
//               onChange={(e) => setSearchQuery(e.target.value)}
//               placeholder="Search UID / Name"
//               className="pl-10 pr-4 py-2 bg-[#020617] border border-gray-700 rounded-lg text-sm focus:ring-2 focus:ring-teal-500 outline-none"
//             />
//           </div>

//           <button
//             onClick={() => navigate("/")}
//             className="flex items-center gap-2 px-4 py-2 bg-teal-700 hover:bg-teal-600 rounded-lg font-bold"
//           >
//             <FiHome /> HOME
//           </button>
//         </div>
//       </div>

//       {/* TABLE */}
//       <div className="overflow-x-auto rounded-xl bg-[#020617]/90 backdrop-blur border border-gray-700 shadow-2xl">
//         <table className="min-w-full text-xs border-collapse">
//           <thead className="bg-[#020617] border-b border-gray-700">
//             <tr>
//               {[
//                 "ID",
//                 "UID",
//                 "Name",
//                 "Serial",
//                 "Host",
//                 "Segment",
//                 "Subsegment",
//                 "Type",
//                 "Total Cap.",
//                 "Parking",
//                 "Connectors",
//                 "Conn. Type",
//                 "Conn. Cap.",
//                 "Lat",
//                 "Long",
//                 "Address",
//                 "Use Type",
//                 "24/7",
//                 "Image",
//                 "Buyer",
//                 "Created",
//                 "Settings",
//                 "Update",
//                 "Delete",
//               ].map((h) => (
//                 <th
//                   key={h}
//                   className="px-3 py-3 font-bold border-r border-gray-700 whitespace-nowrap"
//                 >
//                   {h}
//                 </th>
//               ))}
//             </tr>
//           </thead>

//           <tbody>
//             {loading ? (
//               <tr>
//                 <td colSpan="24" className="py-8 text-center">
//                   Loading...
//                 </td>
//               </tr>
//             ) : currentChargers.length === 0 ? (
//               <tr>
//                 <td colSpan="24" className="py-8 text-center">
//                   No chargers found
//                 </td>
//               </tr>
//             ) : (
//               currentChargers.map((ch) => (
//                 <tr
//                   key={ch.uid}
//                   className="odd:bg-[#020617] even:bg-[#0b1220] hover:bg-[#111827]"
//                 >
//                   <td className="px-3 py-2">{ch.id}</td>

//                   {/* ✅ CLICKABLE UID */}
//                   <td className="px-3 py-2">
//                     <span
//                       onClick={() =>
//                         // navigate(`/charger-details/${ch.uid}`)
//                         navigate(`/chargerdetails/${ch.uid}`)

//                       }
//                       className="text-blue-400 cursor-pointer hover:underline font-medium"
//                       title="View charger details"
//                     >
//                       {ch.uid}
//                     </span>
//                   </td>

//                   <td className="px-3 py-2">{ch.ChargerName}</td>
//                   <td className="px-3 py-2">{ch.Chargerserialnum}</td>
//                   <td className="px-3 py-2">{ch.Chargerhost}</td>
//                   <td className="px-3 py-2">{ch.Segment}</td>
//                   <td className="px-3 py-2">{ch.Subsegment}</td>
//                   <td className="px-3 py-2">{ch.Chargertype}</td>
//                   <td className="px-3 py-2">{ch.Total_Capacity}</td>
//                   <td className="px-3 py-2">{ch.parking}</td>
//                   <td className="px-3 py-2">{ch.number_of_connectors}</td>
//                   <td className="px-3 py-2">{ch.Connector_type}</td>
//                   <td className="px-3 py-2">
//                     {ch.connector_total_capacity}
//                   </td>
//                   <td className="px-3 py-2">{ch.lattitude}</td>
//                   <td className="px-3 py-2">{ch.longitute}</td>
//                   <td className="px-3 py-2">{ch.full_address}</td>
//                   <td className="px-3 py-2">
//                     {ch.charger_use_type}
//                   </td>
//                   <td className="px-3 py-2">
//                     {ch.twenty_four_seven_open_status}
//                   </td>
//                   <td className="px-3 py-2">
//                     {ch.charger_image ? (
//                       <img
//                         src={ch.charger_image}
//                         alt="charger"
//                         className="w-10 h-10 rounded border border-gray-700"
//                       />
//                     ) : (
//                       "—"
//                     )}
//                   </td>
//                   <td className="px-3 py-2">{ch.chargerbuyer}</td>
//                   <td className="px-3 py-2">{ch.created_at}</td>

//                   <td className="px-3 py-2 cursor-pointer">
//                     <FiSettings
//                       onClick={() =>
//                         navigate(`/settings/${ch.uid}`)
//                       }
//                     />
//                   </td>

//                   <td className="px-3 py-2 cursor-pointer">
//                     <FiEdit
//                       onClick={() =>
//                         navigate(
//                           `/updatechargerdetails/${ch.uid}`
//                         )
//                       }
//                     />
//                   </td>

//                   <td className="px-3 py-2 cursor-pointer">
//                     <FiTrash2
//                       onClick={() => handleDelete(ch.uid)}
//                     />
//                   </td>
//                 </tr>
//               ))
//             )}
//           </tbody>
//         </table>
//       </div>
//     </div>
//   );
// };

// export default ChargerOperationsView;



import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { FiEdit, FiTrash2, FiSettings, FiHome, FiSearch } from "react-icons/fi";

const ChargerOperationsView = () => {
  const navigate = useNavigate();
  const [chargerData, setChargerData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;
  const [searchQuery, setSearchQuery] = useState("");

  /* ================= AUTH ================= */
  useEffect(() => {
    const checkAuth = async () => {
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

  /* ================= FETCH ================= */
  useEffect(() => {
    const fetchChargers = async () => {
      const rooturi = import.meta.env.VITE_ROOT_URI;
      const apikey = import.meta.env.VITE_API_KEY;
      try {
        const res = await fetch(`${rooturi}/admin/listofcharges`, {
          headers: { apiauthkey: apikey },
        });
        const result = await res.json();
        setChargerData(Array.isArray(result.data) ? result.data : []);
      } catch {
        toast.error("Failed to fetch charger data");
      } finally {
        setLoading(false);
      }
    };
    fetchChargers();
  }, []);

  /* ================= FILTER & PAGINATION ================= */
  const filteredChargers = chargerData.filter(
    (ch) =>
      ch.ChargerName?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      ch.uid?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const indexOfLast = currentPage * itemsPerPage;
  const indexOfFirst = indexOfLast - itemsPerPage;
  const currentChargers = filteredChargers.slice(indexOfFirst, indexOfLast);
  const totalPages = Math.ceil(filteredChargers.length / itemsPerPage);

  /* ================= ACTIONS ================= */
  const handleDelete = async (uid) => {
    if (!window.confirm("Are you sure you want to delete this charger?")) return;
    const rooturi = import.meta.env.VITE_ROOT_URI;
    const apikey = import.meta.env.VITE_API_KEY;
    try {
      const res = await fetch(`${rooturi}/admin/deletechargerunits`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          apiauthkey: apikey,
        },
        body: JSON.stringify({ uid }),
      });
      if (res.ok) {
        toast.success("Charger deleted successfully");
        setChargerData((p) => p.filter((c) => c.uid !== uid));
      } else toast.error("Delete failed");
    } catch {
      toast.error("Delete request failed");
    }
  };

  /* ================= UI ================= */
  return (
    <div className="min-h-screen p-6 bg-gradient-to-br from-[#020617] via-[#0b1220] to-[#020617] text-gray-200">
      {/* Header */}
      <div className="mb-8 pb-4 border-b border-gray-800">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <h1 className="text-4xl font-bold tracking-tight text-white">
              Charger Operations
            </h1>
            <p className="text-sm text-gray-400 mt-1">
              Monitor, update and manage EV charging infrastructure
            </p>
          </div>

          <div className="flex items-center gap-3">
            <div className="relative">
              <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" />
              <input
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search by UID or Name"
                className="pl-10 pr-4 py-2.5 w-64 rounded-xl bg-[#020617] border border-gray-700 text-sm focus:ring-2 focus:ring-teal-500 outline-none"
              />
            </div>

            <button
              onClick={() => navigate("/")}
              className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-teal-600 hover:bg-teal-500 font-semibold shadow-lg transition"
            >
              <FiHome /> Home
            </button>
          </div>
        </div>
      </div>

      {/* TABLE */}
      <div className="overflow-x-auto rounded-3xl bg-[#020617]/80 backdrop-blur-xl border border-gray-700 shadow-[0_20px_50px_rgba(0,0,0,0.4)]">
        {/* <table className="min-w-full text-xs"> */}
        <table className="min-w-full text-xs table-fixed">
          <thead className="sticky top-0 bg-[#020617] border-b border-gray-700 shadow z-10">
            <tr>
              {[
                "ID",
                "Charger UID",
                "Charger Name",
                "Charger Serial Number",
                "Charger Host",
                "Segment",
                "Sub Segment",
                "Charger Type",
                "Total Capacity",
                "Parking Availability",
                "Number of Connectors",
                "Connector Type",
                "Connector Total Capacity",
                "Latitude",
                "Longitude",
                "Full Address",
                "Charger Use Type",
                "24/7 Open Status",
                "Charger Image",
                "Charger Buyer",
                "Created At",
                "Settings",
                "Edit Charger",
                "Delete Charger",
              ].map((h) => (
                <th
                  key={h}
                  className="px-4 py-4 text-left text-sm font-semibold text-gray-300 whitespace-nowrap border-r border-gray-800"
                >
                  {h}
                </th>
              ))}
            </tr>
          </thead>

          <colgroup>
            <col className="w-16" />
            <col className="w-48" />
            <col className="w-56" />
            <col className="w-56" />
            <col className="w-40" />
            <col className="w-40" />
            <col className="w-40" />
            <col className="w-40" />
            <col className="w-40" />
            <col className="w-40" />
            <col className="w-48" />
            <col className="w-48" />
            <col className="w-56" />
            <col className="w-32" />
            <col className="w-32" />
            <col className="w-[28rem]" />
            <col className="w-48" />
            <col className="w-40" />
            <col className="w-32" />
            <col className="w-40" />
            <col className="w-40" />
            <col className="w-24" />
            <col className="w-24" />
            <col className="w-24" />
          </colgroup>

          <tbody>
            {loading ? (
              <tr>
                <td colSpan="24" className="py-10 text-center text-gray-400">
                  Loading charger data...
                </td>
              </tr>
            ) : currentChargers.length === 0 ? (
              <tr>
                <td colSpan="24" className="py-10 text-center text-gray-400">
                  No chargers found
                </td>
              </tr>
            ) : (
              currentChargers.map((ch) => (
                <tr
                  key={ch.uid}
                  className="border-b border-gray-800 hover:bg-[#0f172a] transition duration-200 align-top"
                >


                  <td className="px-3 py-2">{ch.id}</td>
                  <td className="px-4 py-4">
                    <span
                      onClick={() => navigate(`/chargerdetails/${ch.uid}`)}
                      className="text-blue-400 font-semibold cursor-pointer hover:underline"
                    >
                      {ch.uid}
                    </span>
                  </td>


                  <td className="px-4 py-4">
                    <div className="font-semibold text-gray-100">
                      {ch.ChargerName || "—"}
                    </div>
                    <div className="text-xs text-gray-400 mt-0.5">
                      {ch.Chargerserialnum}
                    </div>
                  </td>


                  <td className="px-3 py-2">{ch.Chargerserialnum}</td>
                  <td className="px-3 py-2">{ch.Chargerhost}</td>
                  <td className="px-3 py-2">{ch.Segment}</td>
                  <td className="px-3 py-2">{ch.Subsegment}</td>
                  <td className="px-3 py-2">{ch.Chargertype}</td>
                  <td className="px-3 py-2">{ch.Total_Capacity}</td>
                  <td className="px-3 py-2">{ch.parking}</td>
                  <td className="px-3 py-2">{ch.number_of_connectors}</td>
                  <td className="px-3 py-2">{ch.Connector_type}</td>
                  <td className="px-3 py-2">{ch.connector_total_capacity}</td>
                  <td className="px-3 py-2">{ch.lattitude}</td>
                  <td className="px-3 py-2">{ch.longitute}</td>
                  <td className="px-3 py-2 max-w-xs truncate" title={ch.full_address}>
                    {ch.full_address}
                  </td>
                  <td className="px-3 py-2">{ch.charger_use_type}</td>
                  <td className="px-4 py-4">
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-semibold ${ch.twenty_four_seven_open_status === "Yes"
                        ? "bg-green-500/15 text-green-400"
                        : "bg-red-500/15 text-red-400"
                        }`}
                    >
                      {ch.twenty_four_seven_open_status || "—"}
                    </span>
                  </td>


                  <td className="px-4 py-4">
                    {ch.charger_image ? (
                      <img
                        src={ch.charger_image}
                        alt="charger"
                        className="w-11 h-11 rounded-xl object-cover border border-gray-700 shadow"
                      />
                    ) : (
                      <span className="text-gray-500">—</span>
                    )}
                  </td>

                  <td className="px-3 py-2">{ch.chargerbuyer}</td>
                  <td className="px-3 py-2">{ch.created_at}</td>
                  <td className="px-4 py-4 text-center">
                    <FiSettings
                      className="mx-auto text-lg cursor-pointer text-gray-400 hover:text-teal-400 transition"
                      onClick={() => navigate(`/settings/${ch.uid}`)}
                    />
                  </td>

                  <td className="px-4 py-4 text-center">
                    <FiEdit
                      className="mx-auto text-lg cursor-pointer text-gray-400 hover:text-blue-400 transition"
                      onClick={() => navigate(`/updatechargerdetails/${ch.uid}`)}
                    />
                  </td>

                  <td className="px-4 py-4 text-center">
                    <FiTrash2
                      className="mx-auto text-lg cursor-pointer text-gray-400 hover:text-red-500 transition"
                      onClick={() => handleDelete(ch.uid)}
                    />
                  </td>


                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex justify-center gap-2 mt-6">
          {Array.from({ length: totalPages }).map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrentPage(i + 1)}
              className={`px-4 py-2 rounded-lg text-sm font-semibold transition ${currentPage === i + 1
                ? "bg-teal-600 text-white"
                : "bg-[#020617] border border-gray-700 hover:bg-[#111827]"
                }`}
            >
              {i + 1}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default ChargerOperationsView;
