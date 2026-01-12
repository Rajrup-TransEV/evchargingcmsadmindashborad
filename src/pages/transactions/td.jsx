// import React, { useState, useEffect } from 'react';
// import { useParams, useNavigate } from 'react-router-dom';
// import { toast } from 'react-toastify';

// const TD = () => {
//     const navigate = useNavigate();
//     const { uid } = useParams();
//     const [loading, setLoading] = useState(true);
//     const [transdata, setTransdata] = useState([]);
//     const [au, setAu] = useState([]); // Initialize as an empty array

//     // Check for user authentication
//     useEffect(() => {
//         const checkAuthentication = async () => {
//             const rooturi = import.meta.env.VITE_ROOT_URI;
//             const apikey = import.meta.env.VITE_API_KEY;

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

//     // Fetch transaction details
//     useEffect(() => {
//         const fetchtd = async () => {
//             const rooturi = import.meta.env.VITE_ROOT_URI;
//             const apikey = import.meta.env.VITE_API_KEY;

//             try {
//                 const response = await fetch(`${rooturi}/admin/thisu`, {
//                     method: "POST",
//                     headers: {
//                         'Content-Type': 'application/json',
//                         'apiauthkey': apikey,
//                     },
//                     body: JSON.stringify({ userid: uid })
//                 });
                
//                 if (response.ok) {
//                     const result = await response.json();
//                     setTransdata(result.td); // Assuming result.td is an array
//                     setAu(result.au); // Ensure au is an array
//                     console.log("au data",au)
//                 }
//             } catch (error) {
//                 console.error("Error during data fetch:", error);
//                 toast("An error occurred while fetching the data");
//             } finally {
//                 setLoading(false);
//             }
//         };
//         fetchtd();
//     }, [uid]);

//     // IP tracking facility
//     useEffect(() => {
//         const fetchIpAddress = async () => {
//             const rooturi = import.meta.env.VITE_ROOT_URI;
//             const apikey = import.meta.env.VITE_API_KEY;

//             try {
//                 const response = await fetch("https://api.ipify.org?format=json");
//                 const data = await response.json();
                
//                 if (data) {
//                     const currentDateTime = new Date().toISOString();
//                     await fetch(`${rooturi}/admin/getip`, {
//                         method: 'POST',
//                         headers: {
//                             'Content-Type': 'application/json',
//                             'apiauthkey': apikey,
//                         },
//                         body: JSON.stringify({ ip: data.ip, datetime: currentDateTime, path: "td.jsx" })
//                     });
//                 }
//             } catch (error) {
//                 console.error("Error fetching IP address:", error);
//             }
//         };

//         fetchIpAddress();
//     }, []);

//     // Navigate back to home
//     const backtohome = (event) => {
//         event.preventDefault();
//         navigate("/");
//     };

//     if (loading) return <div>Loading...</div>;

//     return (
//         <div className="container mx-auto py-8">
//             <div className="py-11">
//                 <button 
//                     className="relative inline-block text-white font-bold py-2 px-4 rounded-full overflow-hidden group transition-transform duration-300 transform hover:scale-105"
//                     onClick={backtohome}
//                 >
//                     <span className="absolute inset-0 bg-gradient-to-r from-teal-400 via-teal-500 to-teal-600 transform scale-110 group-hover:scale-100 transition duration-300"></span>
//                     <span className="relative z-10">HOME</span>
//                 </button>
//             </div>
//             <h1 className="text-3xl font-bold mb-4">Transactions Details</h1>
//             <p className="mb-4">User UID: {uid}</p>

//             {transdata.length > 0 ? (
//                 <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
//                     {/* Transaction Details */}
//                     {transdata.map((transaction) => (
//                         <div key={transaction.uid} className="border p-4 rounded shadow mb-4">
//                             <p className="font-bold">Transaction ID:</p>
//                             <p className="mb-2">{transaction.paymentid}</p>
//                             <p className="font-bold">Wallet ID:</p>
//                             <p className="mb-2">{transaction.walletid}</p>
//                             <p className="font-bold">User ID:</p>
//                             <p className="mb-2">{transaction.userid}</p>
//                             <p className="font-bold">Price:</p>
//                             <p className="mb-2">{transaction.price}</p>
//                             <p className="font-bold">Charger UID:</p>
//                             <p className="mb-2">{transaction.chargeruid}</p>
//                         </div>
//                     ))}

//                     {/* Associated User Details
//                     <div>
//                         <h1 className="text-3xl font-bold mb-4">Associated User Details</h1>
//                         {au.length > 0 ? (
//                             au.map((user) => (
//                                 <div key={user.uid} className="border p-4 rounded shadow mb-4">
//                                     <h2 className="text-xl font-semibold mb-2">User UID: {user.uid}</h2>
//                                     <p className="font-bold">Full Name:</p>
//                                     <p className="mb-2">{user.username}</p>
//                                     <p className="font-bold">Email:</p>
//                                     <p className="mb-2">{user.email}</p>
//                                     <p className="font-bold">Phone Number:</p>
//                                     <p className="mb-2">{user.phonenumber}</p>
//                                 </div>
//                             ))
//                         ) : (
//                             <p>No associated users found.</p>
//                         )}
//                     </div> */}
//                 </div>
//             ) : (
//                 <p>No transaction details found.</p>
//             )}
//         </div>
//     );
// };

// export default TD;

import React, { useState, useEffect, useMemo } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const ITEMS_PER_PAGE = 10;

const TD = () => {
  const navigate = useNavigate();
  const { uid } = useParams();

  const [loading, setLoading] = useState(true);
  const [transdata, setTransdata] = useState([]);

  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [sortField, setSortField] = useState("createdAt");
  const [sortOrder, setSortOrder] = useState("desc");
  const [currentPage, setCurrentPage] = useState(1);

  /* AUTH */
  useEffect(() => {
    const checkAuth = async () => {
      const token = localStorage.getItem("token");
      if (!token) return navigate("/signin");

      const res = await fetch(`${import.meta.env.VITE_ROOT_URI}/userauth/verifyuser`, {
        method: "POST",
        headers: { "Content-Type": "application/json", apiauthkey: import.meta.env.VITE_API_KEY },
        body: JSON.stringify({ token })
      });

      const data = await res.json();
      if (!res.ok || data.user.userType !== "superadmin") {
        toast("Unauthorized access");
        navigate("/signin");
      }
    };

    checkAuth();
  }, [navigate]);

  /* DATA */
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch(`${import.meta.env.VITE_ROOT_URI}/admin/thisu`, {
          method: "POST",
          headers: { "Content-Type": "application/json", apiauthkey: import.meta.env.VITE_API_KEY },
          body: JSON.stringify({ userid: uid })
        });

        const result = await res.json();
        setTransdata(Array.isArray(result.td) ? result.td : []);
      } catch {
        toast("Failed to load transactions");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [uid]);

  /* FILTER + SORT */
  const filteredData = useMemo(() => {
    let data = [...transdata];

    if (search) {
      data = data.filter((tx) =>
        tx.paymentid?.toLowerCase().includes(search.toLowerCase()) ||
        tx.userid?.toLowerCase().includes(search.toLowerCase())
      );
    }

    if (statusFilter !== "all") {
      data = data.filter((tx) => (tx.status || "completed").toLowerCase() === statusFilter);
    }

    data.sort((a, b) => {
      const aVal = a[sortField] || "";
      const bVal = b[sortField] || "";
      return sortOrder === "asc" ? (aVal > bVal ? 1 : -1) : aVal < bVal ? 1 : -1;
    });

    return data;
  }, [transdata, search, statusFilter, sortField, sortOrder]);

  /* PAGINATION */
  const totalPages = Math.ceil(filteredData.length / ITEMS_PER_PAGE);
  const paginatedData = filteredData.slice((currentPage - 1) * ITEMS_PER_PAGE, currentPage * ITEMS_PER_PAGE);

  useEffect(() => setCurrentPage(1), [search, statusFilter]);

  const exportCSV = () => {
    if (!filteredData.length) return;
    const headers = Object.keys(filteredData[0]);
    const rows = filteredData.map((r) => headers.map((h) => `"${r[h] ?? ""}"`).join(","));
    const csv = [headers.join(","), ...rows].join("\n");

    const blob = new Blob([csv], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "transactions.csv";
    a.click();
  };

  const handleSort = (field) => {
    if (sortField === field) setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    else {
      setSortField(field);
      setSortOrder("asc");
    }
  };

  if (loading) return <div className="h-screen flex items-center justify-center text-xl">Loading…</div>;

  return (
  <div className="min-h-screen bg-[#0B0F14] px-6 py-10 text-gray-200">
    <div className="max-w-7xl mx-auto">

      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
        <div>
          <h1 className="text-3xl font-semibold text-gray-100">
            Transaction Details
          </h1>
          <p className="text-sm text-gray-400 mt-1">
            User UID: <span className="font-mono">{uid}</span>
          </p>
        </div>

        <button
          onClick={exportCSV}
          className="px-5 py-2 rounded-lg bg-blue-600 text-white text-sm font-medium hover:bg-blue-700 transition"
        >
          Export CSV
        </button>
      </div>

      {/* Filters */}
      <div className="bg-[#111827] border border-gray-800 rounded-2xl p-5 mb-6 flex flex-col md:flex-row gap-4">
        <input
          className="bg-[#0F172A] border border-gray-700 rounded-lg px-4 py-2 text-sm text-gray-200 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-600"
          placeholder="Search Payment ID or User ID"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <select
          className="bg-[#0F172A] border border-gray-700 rounded-lg px-4 py-2 text-sm text-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-600"
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
        >
          <option value="all">All Status</option>
          <option value="completed">Completed</option>
          <option value="pending">Pending</option>
          <option value="failed">Failed</option>
        </select>
      </div>

      {/* Table */}
      <div className="bg-[#111827] border border-gray-800 rounded-2xl overflow-hidden shadow-lg">
        <table className="min-w-full text-sm">
          <thead className="bg-[#0F172A] text-gray-400 border-b border-gray-800">
            <tr>
              {[
                ["paymentid", "Payment ID"],
                ["walletid", "Wallet"],
                ["userid", "User"],
                ["price", "Amount"],
                ["chargeruid", "Charger"],
              ].map(([key, label]) => (
                <th
                  key={key}
                  onClick={() => handleSort(key)}
                  className="px-5 py-4 text-left font-medium cursor-pointer hover:text-gray-200 transition"
                >
                  {label}
                </th>
              ))}
              <th className="px-5 py-4 text-left font-medium">Status</th>
            </tr>
          </thead>

          <tbody>
            {paginatedData.length ? (
              paginatedData.map((tx) => (
                <tr
                  key={tx.uid}
                  className="border-t border-gray-800 hover:bg-[#0F172A] transition"
                >
                  <td className="px-5 py-4 font-mono text-gray-300">
                    {tx.paymentid}
                  </td>
                  <td className="px-5 py-4">{tx.walletid}</td>
                  <td className="px-5 py-4">{tx.userid}</td>
                  <td className="px-5 py-4 font-semibold text-blue-400">
                    ₹{tx.price}
                  </td>
                  <td className="px-5 py-4">{tx.chargeruid}</td>
                  <td className="px-5 py-4">
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-medium ${
                        (tx.status || "completed") === "failed"
                          ? "bg-red-500/10 text-red-400"
                          : (tx.status || "completed") === "pending"
                          ? "bg-yellow-500/10 text-yellow-400"
                          : "bg-green-500/10 text-green-400"
                      }`}
                    >
                      {tx.status || "Completed"}
                    </span>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={6} className="text-center py-12 text-gray-500">
                  No transactions found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="flex flex-col md:flex-row justify-between items-center mt-6 gap-4">
        <p className="text-sm text-gray-500">
          Showing {paginatedData.length} of {filteredData.length} records
        </p>

        <div className="flex gap-2">
          <button
            disabled={currentPage === 1}
            onClick={() => setCurrentPage((p) => p - 1)}
            className="px-4 py-2 rounded-lg border border-gray-700 text-sm disabled:opacity-40 hover:bg-gray-800 transition"
          >
            Prev
          </button>
          <button
            disabled={currentPage === totalPages}
            onClick={() => setCurrentPage((p) => p + 1)}
            className="px-4 py-2 rounded-lg border border-gray-700 text-sm disabled:opacity-40 hover:bg-gray-800 transition"
          >
            Next
          </button>
        </div>
      </div>

    </div>
  </div>
);
};

export default TD;