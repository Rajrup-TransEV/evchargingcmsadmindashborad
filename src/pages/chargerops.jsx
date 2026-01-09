// import React, { useState, useEffect } from "react";
// import { useNavigate } from "react-router-dom";
// import { toast } from "react-toastify";
// import { FiEdit, FiTrash2, FiSettings, FiHome, FiSearch } from "react-icons/fi";

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
//           toast("Unauthorized");
//           navigate("/signin");
//         }
//       } catch {
//         toast("Auth error");
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
//         toast("Failed to fetch data");
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
//         toast.success("Deleted");
//         setChargerData((p) => p.filter((c) => c.uid !== uid));
//       } else toast.error("Delete failed");
//     } catch {
//       toast.error("Delete error");
//     }
//   };

//   /* ================= UI ================= */
//   return (
//     <div className="min-h-screen p-6 bg-gradient-to-br from-[#020617] via-[#0b1220] to-[#020617] text-gray-200">
//       {/* Header */}
//       <div className="flex flex-col md:flex-row justify-between items-center mb-6 gap-4">
//         <h1 className="text-3xl font-extrabold text-gray-100">
//           Charger Dashboard
//         </h1>

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
//       <div className="hidden md:block overflow-x-auto rounded-xl bg-[#020617]/90 backdrop-blur border border-gray-700 shadow-2xl">
//         <table className="min-w-full text-xs border-collapse">
//           {/* HEADER */}
//           <thead className="sticky top-0 bg-[#020617] z-10 border-b border-gray-700">
//             <tr>
//               {[
//                 "ID","UID","Name","Serial","Host","Segment","Subsegment","Type",
//                 "Total Cap.","Parking","Connectors","Conn. Type","Conn. Cap.",
//                 "Lat","Long","Address","Use Type","24/7","Image",
//                 "Buyer","Created","Settings","Update","Delete"
//               ].map((h) => (
//                 <th
//                   key={h}
//                   className="px-3 py-3 uppercase tracking-wider font-bold text-gray-300 border-r border-gray-700 whitespace-nowrap"
//                 >
//                   {h}
//                 </th>
//               ))}
//             </tr>
//           </thead>

//           {/* BODY */}
//           <tbody>
//             {loading ? (
//               <tr>
//                 <td colSpan="24" className="py-8 text-center text-gray-400">
//                   Loading...
//                 </td>
//               </tr>
//             ) : currentChargers.length === 0 ? (
//               <tr>
//                 <td colSpan="24" className="py-8 text-center text-gray-400">
//                   No chargers found
//                 </td>
//               </tr>
//             ) : (
//               currentChargers.map((ch) => (
//                 <tr
//                   key={ch.uid}
//                   className="odd:bg-[#020617] even:bg-[#0b1220] hover:bg-[#111827]"
//                 >
//                   {[
//                     ch.id,
//                     <span className="text-blue-400 cursor-pointer">{ch.uid}</span>,
//                     ch.ChargerName,
//                     ch.Chargerserialnum,
//                     ch.Chargerhost,
//                     ch.Segment,
//                     ch.Subsegment,
//                     ch.Chargertype,
//                     ch.Total_Capacity,
//                     ch.parking,
//                     ch.number_of_connectors,
//                     ch.Connector_type,
//                     ch.connector_total_capacity,
//                     ch.lattitude,
//                     ch.longitute,
//                     ch.full_address,
//                     ch.charger_use_type,
//                     ch.twenty_four_seven_open_status,
//                     ch.charger_image ? (
//                       <img src={ch.charger_image} className="w-10 h-10 rounded border border-gray-700" />
//                     ) : "—",
//                     ch.chargerbuyer,
//                     ch.created_at,
//                     <FiSettings onClick={() => navigate(`/settings/${ch.uid}`)} />,
//                     <FiEdit onClick={() => navigate(`/updatechargerdetails/${ch.uid}`)} />,
//                     <FiTrash2 onClick={() => handleDelete(ch.uid)} />,
//                   ].map((cell, i) => (
//                     <td
//                       key={i}
//                       className="px-3 py-2 border-r border-gray-800 whitespace-nowrap"
//                     >
//                       {cell}
//                     </td>
//                   ))}
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
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
        <div>
          <h1 className="text-3xl font-extrabold tracking-wide text-white">
            Charger Operations
          </h1>
          <p className="text-sm text-gray-400 mt-1">
            Monitor, update and manage charger units
          </p>
        </div>

        <div className="flex items-center gap-3">
          <div className="relative">
            <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search UID or Name"
              className="pl-10 pr-4 py-2 w-64 bg-[#020617] border border-gray-700 rounded-xl text-sm focus:ring-2 focus:ring-teal-500 outline-none"
            />
          </div>

          <button
            onClick={() => navigate("/")}
            className="flex items-center gap-2 px-4 py-2 rounded-xl bg-teal-700 hover:bg-teal-600 transition font-semibold shadow"
          >
            <FiHome /> Home
          </button>
        </div>
      </div>

      {/* TABLE */}
      <div className="overflow-x-auto rounded-2xl bg-[#020617]/90 backdrop-blur border border-gray-700 shadow-xl">
        <table className="min-w-full text-xs">
          <thead className="sticky top-0 bg-[#020617] border-b border-gray-700 z-10">
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
                  className="border-b border-gray-800 hover:bg-[#111827] transition"
                >
                  <td className="px-3 py-2">{ch.id}</td>
                  <td className="px-3 py-2 text-blue-400 font-medium cursor-pointer">
                    {ch.uid}
                  </td>
                  <td className="px-3 py-2">{ch.ChargerName}</td>
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
                  <td className="px-3 py-2">{ch.twenty_four_seven_open_status}</td>
                  <td className="px-3 py-2">
                    {ch.charger_image ? (
                      <img
                        src={ch.charger_image}
                        alt="charger"
                        className="w-10 h-10 rounded-lg object-cover border border-gray-700"
                      />
                    ) : (
                      "—"
                    )}
                  </td>
                  <td className="px-3 py-2">{ch.chargerbuyer}</td>
                  <td className="px-3 py-2">{ch.created_at}</td>
                  <td className="px-3 py-2">
                    <FiSettings
                      className="cursor-pointer hover:text-teal-400"
                      onClick={() => navigate(`/settings/${ch.uid}`)}
                    />
                  </td>
                  <td className="px-3 py-2">
                    <FiEdit
                      className="cursor-pointer hover:text-blue-400"
                      onClick={() => navigate(`/updatechargerdetails/${ch.uid}`)}
                    />
                  </td>
                  <td className="px-3 py-2">
                    <FiTrash2
                      className="cursor-pointer hover:text-red-500"
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
              className={`px-4 py-2 rounded-lg text-sm font-semibold transition ${
                currentPage === i + 1
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
