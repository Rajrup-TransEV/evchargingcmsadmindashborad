// import React, { useState, useEffect } from "react";
// import { useNavigate } from "react-router-dom";
// import { toast } from "react-toastify";
// import { FiEdit, FiTrash2, FiSettings, FiHome, FiSearch } from "react-icons/fi";

// const ChargerOperationsView = () => {
//   const navigate = useNavigate();
//   const [chargerData, setChargerData] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [currentPage, setCurrentPage] = useState(1);
//   const itemsPerPage = 8;
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
//           toast.error("Unauthorized access");
//           navigate("/signin");
//         }
//       } catch {
//         toast.error("Authentication failed");
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
//         toast.error("Failed to fetch charger data");
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
//   const currentChargers = filteredChargers.slice(indexOfFirst, indexOfLast);
//   const totalPages = Math.ceil(filteredChargers.length / itemsPerPage);

//   /* ================= ACTIONS ================= */
//   const handleDelete = async (uid) => {
//     if (!window.confirm("Are you sure you want to delete this charger?")) return;
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
//         toast.success("Charger deleted successfully");
//         setChargerData((p) => p.filter((c) => c.uid !== uid));
//       } else toast.error("Delete failed");
//     } catch {
//       toast.error("Delete request failed");
//     }
//   };

//   /* ================= UI ================= */
//   return (
//     <div className="min-h-screen p-6 bg-gradient-to-br from-[#020617] via-[#0b1220] to-[#020617] text-gray-200">
//       {/* Header */}
//       <div className="mb-8 pb-4 border-b border-gray-800">
//         <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
//           <div>
//             <h1 className="text-4xl font-bold tracking-tight text-white">
//               Charger Operations
//             </h1>
//             <p className="text-sm text-gray-400 mt-1">
//               Monitor, update and manage EV charging infrastructure
//             </p>
//           </div>

//           <div className="flex items-center gap-3">
//             <div className="relative">
//               <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" />
//               <input
//                 value={searchQuery}
//                 onChange={(e) => setSearchQuery(e.target.value)}
//                 placeholder="Search by UID or Name"
//                 className="pl-10 pr-4 py-2.5 w-64 rounded-xl bg-[#020617] border border-gray-700 text-sm focus:ring-2 focus:ring-teal-500 outline-none"
//               />
//             </div>

//             <button
//               onClick={() => navigate("/")}
//               className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-teal-600 hover:bg-teal-500 font-semibold shadow-lg transition"
//             >
//               <FiHome /> Home
//             </button>
//           </div>
//         </div>
//       </div>

//       {/* TABLE */}
//       <div className="overflow-x-auto rounded-3xl bg-[#020617]/80 backdrop-blur-xl border border-gray-700 shadow-[0_20px_50px_rgba(0,0,0,0.4)]">
//         {/* <table className="min-w-full text-xs"> */}
//         <table className="min-w-full text-xs table-fixed">
//           <thead className="sticky top-0 bg-[#020617] border-b border-gray-700 shadow z-10">
//             <tr>
//               {[
//                 "ID",
//                 "Charger UID",
//                 "Charger Name",
//                 "Charger Serial Number",
//                 "Charger Host",
//                 "Segment",
//                 "Sub Segment",
//                 "Charger Type",
//                 "Total Capacity",
//                 "Parking Availability",
//                 "Number of Connectors",
//                 "Connector Type",
//                 "Connector Total Capacity",
//                 "Latitude",
//                 "Longitude",
//                 "Full Address",
//                 "Charger Use Type",
//                 "24/7 Open Status",
//                 "Charger Image",
//                 "Charger Buyer",
//                 "Created At",
//                 "Settings",
//                 "Edit Charger",
//                 "Delete Charger",
//               ].map((h) => (
//                 <th
//                   key={h}
//                   className="px-4 py-4 text-left text-sm font-semibold text-gray-300 whitespace-nowrap border-r border-gray-800"
//                 >
//                   {h}
//                 </th>
//               ))}
//             </tr>
//           </thead>

//           <colgroup>
//             <col className="w-16" />
//             <col className="w-48" />
//             <col className="w-56" />
//             <col className="w-56" />
//             <col className="w-40" />
//             <col className="w-40" />
//             <col className="w-40" />
//             <col className="w-40" />
//             <col className="w-40" />
//             <col className="w-40" />
//             <col className="w-48" />
//             <col className="w-48" />
//             <col className="w-56" />
//             <col className="w-32" />
//             <col className="w-32" />
//             <col className="w-[28rem]" />
//             <col className="w-48" />
//             <col className="w-40" />
//             <col className="w-32" />
//             <col className="w-40" />
//             <col className="w-40" />
//             <col className="w-24" />
//             <col className="w-24" />
//             <col className="w-24" />
//           </colgroup>

//           <tbody>
//             {loading ? (
//               <tr>
//                 <td colSpan="24" className="py-10 text-center text-gray-400">
//                   Loading charger data...
//                 </td>
//               </tr>
//             ) : currentChargers.length === 0 ? (
//               <tr>
//                 <td colSpan="24" className="py-10 text-center text-gray-400">
//                   No chargers found
//                 </td>
//               </tr>
//             ) : (
//               currentChargers.map((ch) => (
//                 <tr
//                   key={ch.uid}
//                   className="border-b border-gray-800 hover:bg-[#0f172a] transition duration-200 align-top"
//                 >


//                   <td className="px-3 py-2">{ch.id}</td>
//                   <td className="px-4 py-4">
//                     <span
//                       onClick={() => navigate(`/chargerdetails/${ch.uid}`)}
//                       className="text-blue-400 font-semibold cursor-pointer hover:underline"
//                     >
//                       {ch.uid}
//                     </span>
//                   </td>


//                   <td className="px-4 py-4">
//                     <div className="font-semibold text-gray-100">
//                       {ch.ChargerName || "—"}
//                     </div>
//                     <div className="text-xs text-gray-400 mt-0.5">
//                       {ch.Chargerserialnum}
//                     </div>
//                   </td>


//                   <td className="px-3 py-2">{ch.Chargerserialnum}</td>
//                   <td className="px-3 py-2">{ch.Chargerhost}</td>
//                   <td className="px-3 py-2">{ch.Segment}</td>
//                   <td className="px-3 py-2">{ch.Subsegment}</td>
//                   <td className="px-3 py-2">{ch.Chargertype}</td>
//                   <td className="px-3 py-2">{ch.Total_Capacity}</td>
//                   <td className="px-3 py-2">{ch.parking}</td>
//                   <td className="px-3 py-2">{ch.number_of_connectors}</td>
//                   <td className="px-3 py-2">{ch.Connector_type}</td>
//                   <td className="px-3 py-2">{ch.connector_total_capacity}</td>
//                   <td className="px-3 py-2">{ch.lattitude}</td>
//                   <td className="px-3 py-2">{ch.longitute}</td>
//                   <td className="px-3 py-2 max-w-xs truncate" title={ch.full_address}>
//                     {ch.full_address}
//                   </td>
//                   <td className="px-3 py-2">{ch.charger_use_type}</td>
//                   <td className="px-4 py-4">
//                     <span
//                       className={`px-3 py-1 rounded-full text-xs font-semibold ${ch.twenty_four_seven_open_status === "Yes"
//                         ? "bg-green-500/15 text-green-400"
//                         : "bg-red-500/15 text-red-400"
//                         }`}
//                     >
//                       {ch.twenty_four_seven_open_status || "—"}
//                     </span>
//                   </td>


//                   <td className="px-4 py-4">
//                     {ch.charger_image ? (
//                       <img
//                         src={ch.charger_image}
//                         alt="charger"
//                         className="w-11 h-11 rounded-xl object-cover border border-gray-700 shadow"
//                       />
//                     ) : (
//                       <span className="text-gray-500">—</span>
//                     )}
//                   </td>

//                   <td className="px-3 py-2">{ch.chargerbuyer}</td>
//                   <td className="px-3 py-2">{ch.created_at}</td>
//                   <td className="px-4 py-4 text-center">
//                     <FiSettings
//                       className="mx-auto text-lg cursor-pointer text-gray-400 hover:text-teal-400 transition"
//                       onClick={() => navigate(`/settings/${ch.uid}`)}
//                     />
//                   </td>

//                   <td className="px-4 py-4 text-center">
//                     <FiEdit
//                       className="mx-auto text-lg cursor-pointer text-gray-400 hover:text-blue-400 transition"
//                       onClick={() => navigate(`/updatechargerdetails/${ch.uid}`)}
//                     />
//                   </td>

//                   <td className="px-4 py-4 text-center">
//                     <FiTrash2
//                       className="mx-auto text-lg cursor-pointer text-gray-400 hover:text-red-500 transition"
//                       onClick={() => handleDelete(ch.uid)}
//                     />
//                   </td>


//                 </tr>
//               ))
//             )}
//           </tbody>
//         </table>
//       </div>

//       {/* Pagination */}
//       {totalPages > 1 && (
//         <div className="flex justify-center gap-2 mt-6">
//           {Array.from({ length: totalPages }).map((_, i) => (
//             <button
//               key={i}
//               onClick={() => setCurrentPage(i + 1)}
//               className={`px-4 py-2 rounded-lg text-sm font-semibold transition ${currentPage === i + 1
//                 ? "bg-teal-600 text-white"
//                 : "bg-[#020617] border border-gray-700 hover:bg-[#111827]"
//                 }`}
//             >
//               {i + 1}
//             </button>
//           ))}
//         </div>
//       )}
//     </div>
//   );
// };

// export default ChargerOperationsView;
import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Sidebar from "../partials/Sidebar";
import {
  FiEdit,
  FiTrash2,
  FiSettings,
  FiHome,
  FiSearch,
  FiFilter,
  FiX,
  FiChevronLeft,
  FiChevronRight,
  FiRefreshCw,
  FiDownload,
  FiEye,
} from "react-icons/fi";

const ChargerOperationsView = () => {
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const [chargerData, setChargerData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
  const [searchQuery, setSearchQuery] = useState("");
  const [showFilters, setShowFilters] = useState(false);

  const searchTimer = useRef(null);
  const [filters, setFilters] = useState({
    segment: "",
    subsegment: "",
    protocol: "",
    connector_type: "",
    charger_type: "",
    use_type: "",
    open_247: "",
  });

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

  /* ================= INITIAL FETCH ================= */
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

  /* ================= SEARCH API (BACKEND) ================= */
  useEffect(() => {
    const rooturi = import.meta.env.VITE_ROOT_URI;
    const apikey = import.meta.env.VITE_API_KEY;

    if (searchTimer.current) clearTimeout(searchTimer.current);

    searchTimer.current = setTimeout(async () => {
      try {
        setLoading(true);

        const hasSearch = searchQuery.trim();
        const hasFilters = Object.values(filters).some(Boolean);

        if (!hasSearch && !hasFilters) {
          const res = await fetch(`${rooturi}/admin/listofcharges`, {
            headers: { apiauthkey: apikey },
          });
          const result = await res.json();
          setChargerData(Array.isArray(result.data) ? result.data : []);
          setCurrentPage(1);
          setLoading(false);
          return;
        }

        const queryString = buildQueryParams();

        const res = await fetch(
          `${rooturi}/admin/searchallchargers?${queryString}`,
          { headers: { apiauthkey: apikey } }
        );

        const result = await res.json();
        setChargerData(Array.isArray(result.data) ? result.data : []);
        setCurrentPage(1);
      } catch {
        toast.error("Search / filter failed");
      } finally {
        setLoading(false);
      }
    }, 400);

    return () => clearTimeout(searchTimer.current);
  }, [searchQuery, filters]);

  /* ================= PAGINATION ================= */
  const indexOfLast = currentPage * itemsPerPage;
  const indexOfFirst = indexOfLast - itemsPerPage;
  const currentChargers = chargerData.slice(indexOfFirst, indexOfLast);
  const totalPages = Math.ceil(chargerData.length / itemsPerPage);

  /* ================= DELETE ================= */
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
        setChargerData((prev) => prev.filter((c) => c.uid !== uid));
      } else {
        toast.error("Delete failed");
      }
    } catch {
      toast.error("Delete request failed");
    }
  };

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters((prev) => ({
      ...prev,
      [name]: value,
    }));
    setCurrentPage(1);
  };

  const buildQueryParams = () => {
    const params = new URLSearchParams();

    if (searchQuery.trim()) {
      params.append("q", searchQuery.trim());
    }

    Object.entries(filters).forEach(([key, value]) => {
      if (value) params.append(key, value);
    });

    params.append("limit", 200);
    params.append("offset", 0);

    return params.toString();
  };

  const uniqueValues = (key) => {
    return [...new Set(chargerData.map((c) => c[key]).filter(Boolean))];
  };

  const clearAllFilters = () => {
    setFilters({
      segment: "",
      subsegment: "",
      protocol: "",
      connector_type: "",
      charger_type: "",
      use_type: "",
      open_247: "",
    });
    setSearchQuery("");
    setCurrentPage(1);
  };

  const getActiveFilterCount = () => {
    return Object.values(filters).filter(Boolean).length;
  };

  /* ================= UI ================= */
  return (
    <div className="flex h-screen overflow-hidden bg-gradient-to-br from-slate-900 via-gray-900 to-black">
      {/* Sidebar */}
      <Sidebar
        sidebarOpen={sidebarOpen}
        setSidebarOpen={setSidebarOpen}
        variant="default"
      />

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Mobile Header */}
        <header className="lg:hidden flex items-center justify-between p-4 bg-black/30 backdrop-blur-sm border-b border-white/10">
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="p-2 rounded-lg text-white hover:bg-white/10 transition-colors"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
          <h1 className="text-xl font-bold text-white">All Chargers</h1>
          <div className="w-10" />
        </header>

        {/* Page Content */}
        <div className="flex-1 overflow-y-auto p-4 md:p-6">
          {/* Header */}
          <div className="hidden lg:flex justify-between items-center mb-6">
            <div>
              <h1 className="text-3xl font-extrabold text-white flex items-center gap-3">
                <span className="bg-gradient-to-r from-teal-400 to-indigo-600 p-2 rounded-xl text-2xl">
                  ⚡
                </span>
                All Chargers
              </h1>
              <p className="text-gray-400 mt-1">
                Manage and monitor all EV charging stations
              </p>
            </div>
            {/* <button
              onClick={() => navigate("/")}
              className="flex items-center gap-2 rounded-xl bg-gradient-to-r from-teal-400 to-indigo-600 px-6 py-2.5 text-white font-bold hover:scale-105 transition transform hover:shadow-xl shadow-lg"
            >
              <FiHome /> Home
            </button> */}
          </div>

          {/* Search and Filter Bar */}
          <div className="mb-6 flex flex-col sm:flex-row gap-4">
            <div className="flex-1 relative">
              <FiSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" />
              <input
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search chargers by name, serial, address..."
                className="w-full pl-11 pr-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-gray-500 focus:ring-2 focus:ring-teal-400 focus:border-transparent outline-none transition-all duration-200"
              />
            </div>
            <div className="flex gap-3">
              <button
                onClick={() => setShowFilters(!showFilters)}
                className={`flex items-center gap-2 px-4 py-3 rounded-xl border transition-all duration-200 ${
                  showFilters || getActiveFilterCount() > 0
                    ? "bg-teal-500/20 border-teal-400/50 text-teal-400"
                    : "bg-white/5 border-white/10 text-gray-400 hover:text-white hover:bg-white/10"
                }`}
              >
                <FiFilter />
                <span>Filters</span>
                {getActiveFilterCount() > 0 && (
                  <span className="flex items-center justify-center w-5 h-5 text-xs font-bold bg-teal-500 text-white rounded-full">
                    {getActiveFilterCount()}
                  </span>
                )}
              </button>
              <button
                onClick={() => {
                  setSearchQuery("");
                  clearAllFilters();
                }}
                className="px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-gray-400 hover:text-white hover:bg-white/10 transition-all duration-200"
              >
                <FiRefreshCw />
              </button>
            </div>
          </div>

          {/* Filters Panel */}
          {showFilters && (
            <div className="mb-6 p-6 rounded-xl bg-white/5 border border-white/10 backdrop-blur-sm animate-slideDown">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-sm font-semibold text-gray-300 uppercase tracking-wider flex items-center gap-2">
                  <FiFilter /> Advanced Filters
                </h3>
                <button
                  onClick={clearAllFilters}
                  className="text-xs text-gray-400 hover:text-red-400 transition-colors flex items-center gap-1"
                >
                  <FiX className="w-3 h-3" /> Clear All
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {/* Segment */}
                <div>
                  <label className="block mb-1.5 text-xs text-gray-400 font-medium">
                    Segment
                  </label>
                  <select
                    name="segment"
                    value={filters.segment}
                    onChange={handleFilterChange}
                    className="w-full bg-black/40 border border-white/10 rounded-lg px-3 py-2.5 text-sm text-white focus:ring-2 focus:ring-teal-400 focus:border-transparent outline-none transition-all"
                  >
                    <option value="">All Segments</option>
                    {uniqueValues("Segment").map((v) => (
                      <option key={v} value={v}>
                        {v}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Protocol */}
                <div>
                  <label className="block mb-1.5 text-xs text-gray-400 font-medium">
                    Protocol
                  </label>
                  <select
                    name="protocol"
                    value={filters.protocol}
                    onChange={handleFilterChange}
                    className="w-full bg-black/40 border border-white/10 rounded-lg px-3 py-2.5 text-sm text-white focus:ring-2 focus:ring-teal-400 focus:border-transparent outline-none transition-all"
                  >
                    <option value="">All Protocols</option>
                    {uniqueValues("protocol").map((v) => (
                      <option key={v} value={v}>
                        {v}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Connector Type */}
                <div>
                  <label className="block mb-1.5 text-xs text-gray-400 font-medium">
                    Connector Type
                  </label>
                  <select
                    name="connector_type"
                    value={filters.connector_type}
                    onChange={handleFilterChange}
                    className="w-full bg-black/40 border border-white/10 rounded-lg px-3 py-2.5 text-sm text-white focus:ring-2 focus:ring-teal-400 focus:border-transparent outline-none transition-all"
                  >
                    <option value="">All Connectors</option>
                    {uniqueValues("Connector_type").map((v) => (
                      <option key={v} value={v}>
                        {v}
                      </option>
                    ))}
                  </select>
                </div>

                {/* 24/7 Open */}
                <div>
                  <label className="block mb-1.5 text-xs text-gray-400 font-medium">
                    24/7 Availability
                  </label>
                  <select
                    name="open_247"
                    value={filters.open_247}
                    onChange={handleFilterChange}
                    className="w-full bg-black/40 border border-white/10 rounded-lg px-3 py-2.5 text-sm text-white focus:ring-2 focus:ring-teal-400 focus:border-transparent outline-none transition-all"
                  >
                    <option value="">All</option>
                    {uniqueValues("twenty_four_seven_open_status").map((v) => (
                      <option key={v} value={v}>
                        {v}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </div>
          )}

          {/* Stats Bar */}
          <div className="mb-4 flex flex-wrap items-center justify-between gap-3 text-sm">
            <div className="text-gray-400">
              Showing <span className="text-white font-semibold">{indexOfFirst + 1}</span> to{" "}
              <span className="text-white font-semibold">
                {Math.min(indexOfLast, chargerData.length)}
              </span>{" "}
              of <span className="text-white font-semibold">{chargerData.length}</span> chargers
            </div>
            {searchQuery && (
              <div className="flex items-center gap-2 text-teal-400">
                <span>Search results for: "{searchQuery}"</span>
                <button
                  onClick={() => setSearchQuery("")}
                  className="p-1 hover:bg-white/10 rounded-lg transition-colors"
                >
                  <FiX className="w-4 h-4" />
                </button>
              </div>
            )}
          </div>

          {/* Table */}
          <div className="overflow-x-auto rounded-xl border border-white/10 bg-white/5 backdrop-blur-sm">
            <table className="min-w-full text-xs">
              <thead className="bg-black/40 border-b border-white/10">
                <tr>
                  {[
                    "ID",
                    "Charger UID",
                    "Name",
                    "Serial",
                    "Type",
                    "Capacity",
                    "Connectors",
                    "Address",
                    "Status",
                    "Actions",
                  ].map((h) => (
                    <th
                      key={h}
                      className="px-4 py-3 text-left font-semibold text-gray-300 uppercase tracking-wider text-[10px]"
                    >
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>

              <tbody>
                {loading ? (
                  <tr>
                    <td colSpan="10" className="py-12 text-center">
                      <div className="flex items-center justify-center gap-3 text-gray-400">
                        <svg className="animate-spin h-6 w-6 text-teal-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        Loading chargers...
                      </div>
                    </td>
                  </tr>
                ) : currentChargers.length === 0 ? (
                  <tr>
                    <td colSpan="10" className="py-12 text-center">
                      <div className="flex flex-col items-center gap-2 text-gray-400">
                        <FiSearch className="w-12 h-12 text-gray-600" />
                        <p className="text-lg font-medium">No chargers found</p>
                        <p className="text-sm">Try adjusting your search or filters</p>
                      </div>
                    </td>
                  </tr>
                ) : (
                  currentChargers.map((ch, index) => (
                    <tr
                      key={ch.uid}
                      className="border-b border-white/5 hover:bg-white/5 transition-colors duration-150"
                    >
                      <td className="px-4 py-3 text-gray-400">{indexOfFirst + index + 1}</td>
                      <td
                        className="px-4 py-3 text-teal-400 cursor-pointer hover:text-teal-300 transition-colors font-mono"
                        onClick={() => navigate(`/chargerdetails/${ch.uid}`)}
                      >
                        <div className="flex items-center gap-2">
                          <FiEye className="w-3 h-3" />
                          {ch.uid?.substring(0, 8)}...
                        </div>
                      </td>
                      <td className="px-4 py-3 font-medium text-white">{ch.ChargerName}</td>
                      <td className="px-4 py-3 text-gray-400 font-mono text-[10px]">
                        {ch.Chargerserialnum}
                      </td>
                      <td className="px-4 py-3">
                        <span className={`px-2 py-1 rounded-full text-[10px] font-semibold ${
                          ch.Chargertype === 'DC' ? 'bg-purple-500/20 text-purple-400' :
                          ch.Chargertype === 'AC' ? 'bg-blue-500/20 text-blue-400' :
                          'bg-teal-500/20 text-teal-400'
                        }`}>
                          {ch.Chargertype || 'N/A'}
                        </span>
                      </td>
                      <td className="px-4 py-3 text-white">{ch.Total_Capacity} kW</td>
                      <td className="px-4 py-3 text-gray-300">{ch.number_of_connectors}</td>
                      <td className="px-4 py-3 text-gray-400 max-w-[150px] truncate">
                        {ch.full_address}
                      </td>
                      <td className="px-4 py-3">
                        <span className={`px-2 py-1 rounded-full text-[10px] font-semibold ${
                          ch.twenty_four_seven_open_status === 'YES'
                            ? 'bg-emerald-500/20 text-emerald-400'
                            : 'bg-red-500/20 text-red-400'
                        }`}>
                          {ch.twenty_four_seven_open_status === 'YES' ? '🟢 24/7' : '🔴 Limited'}
                        </span>
                      </td>
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => navigate(`/settings/${ch.uid}`)}
                            className="p-2 rounded-lg bg-white/5 hover:bg-teal-500/20 hover:text-teal-400 transition-all group"
                            title="Settings"
                          >
                            <FiSettings className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => navigate(`/updatechargerdetails/${ch.uid}`)}
                            className="p-2 rounded-lg bg-white/5 hover:bg-blue-500/20 hover:text-blue-400 transition-all group"
                            title="Edit"
                          >
                            <FiEdit className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => handleDelete(ch.uid)}
                            className="p-2 rounded-lg bg-white/5 hover:bg-red-500/20 hover:text-red-400 transition-all group"
                            title="Delete"
                          >
                            <FiTrash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="mt-6 flex flex-wrap items-center justify-between gap-4">
              <div className="text-sm text-gray-400">
                Page {currentPage} of {totalPages}
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
                  disabled={currentPage === 1}
                  className="flex items-center gap-2 px-4 py-2 rounded-lg bg-white/5 border border-white/10 text-gray-300 hover:bg-white/10 transition-all disabled:opacity-40 disabled:cursor-not-allowed"
                >
                  <FiChevronLeft className="w-4 h-4" /> Previous
                </button>
                <div className="flex gap-1">
                  {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                    let pageNum;
                    if (totalPages <= 5) {
                      pageNum = i + 1;
                    } else if (currentPage <= 3) {
                      pageNum = i + 1;
                    } else if (currentPage >= totalPages - 2) {
                      pageNum = totalPages - 4 + i;
                    } else {
                      pageNum = currentPage - 2 + i;
                    }
                    return (
                      <button
                        key={pageNum}
                        onClick={() => setCurrentPage(pageNum)}
                        className={`w-10 h-10 rounded-lg transition-all ${
                          currentPage === pageNum
                            ? "bg-gradient-to-r from-teal-400 to-indigo-600 text-white font-bold shadow-lg"
                            : "bg-white/5 border border-white/10 text-gray-400 hover:bg-white/10"
                        }`}
                      >
                        {pageNum}
                      </button>
                    );
                  })}
                </div>
                <button
                  onClick={() => setCurrentPage((p) => Math.min(p + 1, totalPages))}
                  disabled={currentPage === totalPages}
                  className="flex items-center gap-2 px-4 py-2 rounded-lg bg-white/5 border border-white/10 text-gray-300 hover:bg-white/10 transition-all disabled:opacity-40 disabled:cursor-not-allowed"
                >
                  Next <FiChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Custom Animations */}
      <style jsx>{`
        @keyframes slideDown {
          from {
            opacity: 0;
            transform: translateY(-10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-slideDown {
          animation: slideDown 0.3s ease-out;
        }
      `}</style>
    </div>
  );
};

export default ChargerOperationsView;