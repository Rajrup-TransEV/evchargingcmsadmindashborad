// import React, { useState, useEffect } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { toast } from 'react-toastify';

// const ListofHubData = () => {
//   const navigate = useNavigate();
//   const [userData, setUserData] = useState([]); // Initial state is an empty array
//   const [loading, setLoading] = useState(true); // State to handle loading status
//   const [currentPage, setCurrentPage] = useState(1); // Current page state
//   const [itemsPerPage] = useState(10); // Number of items to display per page

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
//     const fetchAllHubData = async () => {
//       const rooturi = import.meta.env.VITE_ROOT_URI;
//       const apikey = import.meta.env.VITE_API_KEY;

//       try {
//         const response = await fetch(`${rooturi}/admin/allhubs`, {
//           method: "GET",
//           headers: {
//             'Content-Type': 'application/json',
//             'apiauthkey': apikey,
//           },
//         });

//         const result = await response.json();
//         const data = Array.isArray(result.data) ? result.data : [];
//         setUserData(data);
//         setLoading(false);
//       } catch (error) {
//         console.error("Error fetching hub data:", error);
//         toast("Failed to fetch hub data");
//         setUserData([]);
//         setLoading(false);
//       }
//     };

//     fetchAllHubData();
//   }, []);

//   // Calculate the current hubs to display
//   const indexOfLastUser = currentPage * itemsPerPage;
//   const indexOfFirstUser = indexOfLastUser - itemsPerPage;
//   const currentUsers = userData.slice(indexOfFirstUser, indexOfLastUser);

//   // Calculate total pages
//   const totalPages = Math.ceil(userData.length / itemsPerPage);

//   // Handle UID click for hub details
//   const handleUidClick = (uid) => {
//     navigate(`/hubdetails/${uid}`);
//   };

//   // Delete function
//   const handleDelete = async (uid) => {
//     // Display confirmation dialog
//     const userConfirmed = window.confirm("Are you sure you want to delete this hub?");
    
//     if (userConfirmed) {
//       const rooturi = import.meta.env.VITE_ROOT_URI;
//       const apikey = import.meta.env.VITE_API_KEY;

//       try {
//         const response = await fetch(`${rooturi}/admin/deletehubdata`, {
//           method: 'POST',
//           headers: {
//             'Content-Type': 'application/json',
//             'apiauthkey': apikey,
//           },
//           body: JSON.stringify({ uid }), // Pass uid in request body
//         });

//         if (response.ok) {
//           toast.success("Hub deleted successfully");
//           // Remove deleted hub from state
//           setUserData((prevHubs) => prevHubs.filter(hub => hub.uid !== uid));
//         } else {
//           toast.error("Failed to delete hub");
//         }
//       } catch (error) {
//         console.error("Error deleting hub:", error);
//         toast.error("An error occurred while deleting the hub");
//       }
//     } else {
//       toast.info("Delete operation canceled");
//     }
//   };
//   const [ipAddress, setIpAddress] = useState('');
//   //ip tracking facility
//   useEffect(() => {
//     // Fetch the IP address from the API
//     const fetchIpAddress = async () => {
//       const rooturi = import.meta.env.VITE_ROOT_URI;
//       const apikey = import.meta.env.VITE_API_KEY;
//         try {
//             const response = await fetch("https://api.ipify.org?format=json");
//             const data = await response.json();
//             console.log(data)
//             // Set the IP address in state
//             if(data){
//               setIpAddress(data.ip);
//               const currentDateTime = new Date().toISOString();
//               const pathfinder = "listofhubdata.jsx"
//               const resp = await fetch(`${rooturi}/admin/getip`,{
//                   method: 'POST',
//               headers: {
//                   'Content-Type': 'application/json',
//                   'apiauthkey': apikey,
//               },
//               body: JSON.stringify({ip:data.ip,datetime:currentDateTime,path:pathfinder})
//               })
//             }
        

//         } catch (error) {
//             console.error("Error fetching IP address:", error);
//         }
//     };

//     fetchIpAddress();
// }, []); // Empty dependency array means this runs once after the initial render

// const backtohome = (event) => {
//   event.preventDefault(); // Prevent default action
//   navigate("/"); // Navigate to home
// }
//   return (
//     <div className="rounded-lg border border-gray-200 p-4 sm:p-6 md:p-8">
//       <div className="overflow-x-auto">
//         <table className="min-w-full divide-y-2 divide-gray-200 bg-white text-sm">
//           <thead className="ltr:text-left rtl:text-right">
//             <tr>
//               {[
//                 'id', 'uid', 'hubname', 'hubchargers', 'hubtariff in (Rs)', 
//                 'hublocation', 'adminuid', 'createdAt', 'updatedAt', 'Delete'
//               ].map((heading) => (
//                 <th key={heading} className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
//                   {heading}
//                 </th>
//               ))}
//             </tr>
//           </thead>
//           <tbody className="divide-y divide-gray-200">
//             {loading ? (
//               <tr>
//                 <td colSpan="20" className="whitespace-nowrap px-4 py-2 text-center text-gray-700">
//                   Loading...
//                 </td>
//               </tr>
//             ) : (
//               currentUsers.length > 0 ? (
//                 currentUsers.map((user) => (
//                   <tr key={user.id}>
//                     {[
//                       user.id,
//                       <button 
//                         className="text-blue-600 hover:underline" 
//                         onClick={() => handleUidClick(user.uid)}
//                       >
//                         {user.uid}
//                       </button>,
//                       user.hubname,
//                       user.hubchargers.join(', '), // Convert hubchargers array to a comma-separated string
//                       user.hubtariff,
//                       user.hublocation,
//                       user.adminuid,
//                       user.createdAt,
//                       user.updatedAt,
//                       <button 
//                         className="text-red-600 hover:underline"
//                         onClick={() => handleDelete(user.uid)}
//                       >
//                         Delete
//                       </button> // Added Delete button here
//                     ].map((cell, index) => (
//                       <td key={index} className="whitespace-nowrap px-4 py-2 text-gray-700">
//                         {cell}
//                       </td>
//                     ))}
//                   </tr>
//                 ))
//               ) : (
//                 <tr>
//                   <td colSpan="20" className="whitespace-nowrap px-4 py-2 text-center text-gray-700">
//                     No data available
//                   </td>
//                 </tr>
//               )
//             )}
//           </tbody>
//         </table>
//       </div>

//       <div className="rounded-b-lg border-t border-gray-200 px-4 py-2 sm:px-6 md:px-8">
//         <ol className="flex justify-end gap-1 text-xs font-medium">
//           <li>
//             <button
//               onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
//               disabled={currentPage === 1}
//               className="inline-flex items-center justify-center rounded border border-gray-100 bg-white text-gray-900 rtl:rotate-180"
//             >
//               <span className="sr-only">Prev Page</span>
//               <svg xmlns="http://www.w3.org/2000/svg" className="w-3 h-3" viewBox="0 0 20 20" fill="currentColor">
//                 <path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd" />
//               </svg>
//             </button>
//           </li>

//           {Array.from({ length: totalPages }, (_, index) => (
//             <li key={index}>
//               <button
//                 onClick={() => setCurrentPage(index + 1)}
//                 className={`block w-8 rounded text-center leading-8 ${currentPage === index + 1 ? 'bg-blue-600 text-white' : 'border border-gray-100 bg-white text-gray-900'}`}
//               >
//                 {index + 1}
//               </button>
//             </li>
//           ))}

//           <li>
//             <button
//               onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
//               disabled={currentPage === totalPages}
//               className="inline-flex items-center justify-center rounded border border-gray-100 bg-white text-gray-900 rtl:rotate-180"
//             >
//               <span className="sr-only">Next Page</span>
//               <svg xmlns="http://www.w3.org/2000/svg" className="w-3 h-3" viewBox="0 0 20 20" fill="currentColor">
//                 <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10l-3.293-3.293a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
//               </svg>
//             </button>
//           </li>
//         </ol>
//       </div>
//       <div className="py-11">
//             <button 
//     className="relative inline-block text-white font-bold py-2 px-4 rounded-full overflow-hidden group transition-transform duration-300 transform hover:scale-105"
//     onClick={(event) => backtohome(event)}
// >
//     <span className="absolute inset-0 bg-gradient-to-r from-teal-400 via-teal-500 to-teal-600 transform scale-110 group-hover:scale-100 transition duration-300"></span>
//     <span className="relative z-10">HOME</span>
// </button>
//             </div>
//     </div>
//    );
// };

// export default ListofHubData;
/* FULL MODERN, EYE‑CATCHING VERSION
   – Clean admin look
   – Bold actions
   – Card + table hybrid
   – Sticky header
   – Better pagination
*/


import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import Sidebar from '../../partials/Sidebar';
import { 
  FiHome, 
  FiMapPin, 
  FiZap, 
  FiTag, 
  FiUser, 
  FiList,
  FiTrash2,
  FiEye,
  FiPlus,
  FiSearch,
  FiChevronLeft,
  FiChevronRight,
  FiCalendar,
  FiClock,
  FiUsers,
  FiTrendingUp
} from 'react-icons/fi';

const ListofHubData = () => {
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [userData, setUserData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState('');
  const itemsPerPage = 10;

  /* ================= AUTH CHECK ================= */
  useEffect(() => {
    const verify = async () => {
      const rooturi = import.meta.env.VITE_ROOT_URI;
      const apikey = import.meta.env.VITE_API_KEY;
      const token = localStorage.getItem('token');

      if (!token) return navigate('/signin');

      try {
        const res = await fetch(`${rooturi}/userauth/verifyuser`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json', apiauthkey: apikey },
          body: JSON.stringify({ token })
        });

        const data = await res.json();
        if (!res.ok || data.user.userType !== 'superadmin') {
          toast.error('Unauthorized access');
          navigate('/signin');
        }
      } catch {
        toast.error('Authentication failed');
        navigate('/signin');
      }
    };
    verify();
  }, [navigate]);

  /* ================= FETCH HUB DATA ================= */
  useEffect(() => {
    const fetchHubs = async () => {
      const rooturi = import.meta.env.VITE_ROOT_URI;
      const apikey = import.meta.env.VITE_API_KEY;

      try {
        const res = await fetch(`${rooturi}/admin/allhubs`, {
          headers: { apiauthkey: apikey }
        });
        const json = await res.json();
        setUserData(Array.isArray(json.data) ? json.data : []);
      } catch {
        toast.error('Failed to load hubs');
      } finally {
        setLoading(false);
      }
    };
    fetchHubs();
  }, []);

  /* ================= SEARCH ================= */
  const filteredHubs = userData.filter(hub => 
    hub.hubname?.toLowerCase().includes(searchQuery.toLowerCase()) ||
    hub.uid?.toLowerCase().includes(searchQuery.toLowerCase()) ||
    hub.hublocation?.toLowerCase().includes(searchQuery.toLowerCase()) ||
    hub.adminuid?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  /* ================= PAGINATION ================= */
  const totalPages = Math.ceil(filteredHubs.length / itemsPerPage);
  const currentUsers = filteredHubs.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  /* ================= ACTIONS ================= */
  const handleDelete = async (uid) => {
    if (!window.confirm('Delete this hub permanently?')) return;

    const rooturi = import.meta.env.VITE_ROOT_URI;
    const apikey = import.meta.env.VITE_API_KEY;

    try {
      const res = await fetch(`${rooturi}/admin/deletehubdata`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', apiauthkey: apikey },
        body: JSON.stringify({ uid })
      });

      if (res.ok) {
        toast.success('Hub deleted successfully');
        setUserData(prev => prev.filter(h => h.uid !== uid));
      } else toast.error('Delete failed');
    } catch {
      toast.error('Server error');
    }
  };

  const formatDate = (dateString) => {
    if (!dateString) return '—';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-IN', { 
      month: 'short', 
      day: 'numeric', 
      year: 'numeric' 
    });
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
          <h1 className="text-xl font-bold text-gray-800">Hub Management</h1>
          <div className="w-10" />
        </header>

        {/* Page Content */}
        <div className="flex-1 overflow-y-auto p-4 md:p-8">
          {/* Header */}
          <div className="hidden lg:flex items-center gap-4 mb-8">
            <div>
              <h1 className="text-3xl font-bold text-gray-800 flex items-center gap-3">
                <span className="bg-gradient-to-r from-emerald-500 to-teal-500 p-2.5 rounded-xl text-white shadow-lg">
                  <FiMapPin className="w-6 h-6" />
                </span>
                Hub Management
              </h1>
              <p className="text-gray-500 mt-1">Manage all EV charging hubs</p>
            </div>
          </div>

          {/* Stats and Actions */}
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
            <div className="flex flex-wrap items-center gap-4">
              <div className="flex items-center gap-2 bg-white rounded-xl px-4 py-2 shadow-sm border border-gray-200">
                <div className="p-1.5 rounded-lg bg-emerald-100">
                  <FiMapPin className="w-4 h-4 text-emerald-600" />
                </div>
                <span className="text-sm text-gray-600">Total Hubs:</span>
                <span className="text-lg font-bold text-gray-800">{filteredHubs.length}</span>
              </div>
              <div className="flex items-center gap-2 bg-white rounded-xl px-4 py-2 shadow-sm border border-gray-200">
                <div className="p-1.5 rounded-lg bg-blue-100">
                  <FiZap className="w-4 h-4 text-blue-600" />
                </div>
                <span className="text-sm text-gray-600">Active:</span>
                <span className="text-lg font-bold text-gray-800">{filteredHubs.length}</span>
              </div>
              <div className="flex items-center gap-2 bg-white rounded-xl px-4 py-2 shadow-sm border border-gray-200">
                <div className="p-1.5 rounded-lg bg-purple-100">
                  <FiTrendingUp className="w-4 h-4 text-purple-600" />
                </div>
                <span className="text-sm text-gray-600">Avg Tariff:</span>
                <span className="text-lg font-bold text-emerald-600">₹{filteredHubs.length > 0 ? 
                  (filteredHubs.reduce((acc, hub) => acc + parseFloat(hub.hubtariff || 0), 0) / filteredHubs.length).toFixed(2) : '0.00'}
                </span>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-3">
              <div className="relative">
                <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search hubs..."
                  value={searchQuery}
                  onChange={(e) => {
                    setSearchQuery(e.target.value);
                    setCurrentPage(1);
                  }}
                  className="pl-10 pr-4 py-2.5 rounded-xl bg-white border border-gray-200 text-gray-700 placeholder-gray-400 focus:ring-2 focus:ring-emerald-400 focus:border-transparent outline-none transition-all duration-200 w-full sm:w-64"
                />
              </div>
              <button
                onClick={() => navigate('/addhub')}
                className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-500 text-white font-semibold shadow-md hover:shadow-lg hover:scale-105 transition transform"
              >
                <FiPlus className="w-5 h-5" />
                Add Hub
              </button>
            </div>
          </div>

          {/* Table */}
          <div className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-xl border border-gray-100 overflow-hidden hover:shadow-2xl transition-shadow duration-300">
            <div className="overflow-x-auto">
              <table className="min-w-full">
                <thead className="bg-gradient-to-r from-gray-50 to-gray-100 border-b border-gray-200">
                  <tr>
                    {['#', 'Hub UID', 'Hub Name', 'Chargers', 'Tariff', 'Location', 'Admin', 'Created', 'Actions'].map(h => (
                      <th key={h} className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                        {h}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {loading ? (
                    <tr>
                      <td colSpan="9" className="px-4 py-12 text-center">
                        <div className="flex items-center justify-center gap-3 text-gray-500">
                          <svg className="animate-spin h-6 w-6 text-emerald-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                          </svg>
                          Loading hubs...
                        </div>
                      </td>
                    </tr>
                  ) : currentUsers.length ? (
                    currentUsers.map((hub, index) => (
                      <tr key={hub.id} className="hover:bg-emerald-50/50 transition-colors duration-150 group">
                        <td className="px-4 py-3 text-sm font-medium text-gray-500">
                          {(currentPage - 1) * itemsPerPage + index + 1}
                        </td>
                        <td className="px-4 py-3">
                          <button
                            onClick={() => navigate(`/hubdetails/${hub.uid}`)}
                            className="text-emerald-600 hover:text-emerald-700 font-mono text-sm hover:underline flex items-center gap-1 group-hover:gap-2 transition-all"
                          >
                            <FiEye className="w-3 h-3" />
                            {hub.uid?.substring(0, 12)}...
                          </button>
                        </td>
                        <td className="px-4 py-3">
                          <div className="flex items-center gap-2">
                            <div className="w-8 h-8 rounded-lg bg-gradient-to-r from-emerald-100 to-teal-100 flex items-center justify-center">
                              <FiMapPin className="w-4 h-4 text-emerald-600" />
                            </div>
                            <span className="font-semibold text-gray-800">{hub.hubname}</span>
                          </div>
                        </td>
                        <td className="px-4 py-3">
                          <div className="flex items-center gap-1">
                            <FiZap className="w-3 h-3 text-gray-400" />
                            <span className="text-sm font-semibold text-gray-700">{hub.hubchargers?.length || 0}</span>
                            <span className="text-xs text-gray-400 ml-1">chargers</span>
                          </div>
                          <div className="flex flex-wrap gap-1 mt-1">
                            {hub.hubchargers?.slice(0, 2).map((charger, i) => (
                              <span key={i} className="text-xs text-gray-500 bg-gray-100 px-1.5 py-0.5 rounded">
                                {charger.substring(0, 6)}...
                              </span>
                            ))}
                            {hub.hubchargers?.length > 2 && (
                              <span className="text-xs text-gray-400">+{hub.hubchargers.length - 2}</span>
                            )}
                          </div>
                        </td>
                        <td className="px-4 py-3">
                          <div className="flex items-center gap-1">
                            <span className="text-sm font-bold text-emerald-600">₹</span>
                            <span className="text-sm font-semibold text-gray-800">{hub.hubtariff}</span>
                          </div>
                        </td>
                        <td className="px-4 py-3">
                          <div className="flex items-center gap-1 text-sm text-gray-600">
                            <FiMapPin className="w-3 h-3 text-gray-400" />
                            <span className="truncate max-w-[100px]">{hub.hublocation}</span>
                          </div>
                        </td>
                        <td className="px-4 py-3">
                          <div className="flex items-center gap-1 text-sm text-gray-600">
                            <FiUser className="w-3 h-3 text-gray-400" />
                            {hub.adminuid?.substring(0, 8)}...
                          </div>
                        </td>
                        <td className="px-4 py-3">
                          <div className="text-sm text-gray-600">
                            <div className="flex items-center gap-1">
                              <FiCalendar className="w-3 h-3 text-gray-400" />
                              {formatDate(hub.createdAt)}
                            </div>
                          </div>
                        </td>
                        <td className="px-4 py-3">
                          <div className="flex items-center gap-2">
                            <button
                              onClick={() => navigate(`/hubdetails/${hub.uid}`)}
                              className="p-2 rounded-lg bg-emerald-50 text-emerald-600 hover:bg-emerald-100 hover:scale-110 transition-all duration-200"
                              title="View Details"
                            >
                              <FiEye className="w-4 h-4" />
                            </button>
                            <button
                              onClick={() => handleDelete(hub.uid)}
                              className="p-2 rounded-lg bg-red-50 text-red-500 hover:bg-red-100 hover:scale-110 transition-all duration-200"
                              title="Delete Hub"
                            >
                              <FiTrash2 className="w-4 h-4" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="9" className="px-4 py-12 text-center">
                        <div className="flex flex-col items-center gap-3">
                          <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center">
                            <FiMapPin className="w-10 h-10 text-gray-300" />
                          </div>
                          <p className="text-lg font-medium text-gray-500">No hubs found</p>
                          <p className="text-sm text-gray-400">Try adjusting your search or create a new hub</p>
                          <button
                            onClick={() => navigate('/addhub')}
                            className="mt-2 px-4 py-2 bg-gradient-to-r from-emerald-500 to-teal-500 text-white rounded-xl text-sm font-semibold hover:shadow-lg transition"
                          >
                            <FiPlus className="inline w-4 h-4 mr-1" />
                            Create Hub
                          </button>
                        </div>
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="flex flex-wrap items-center justify-between gap-4 px-4 py-3 bg-gray-50 border-t border-gray-200">
                <div className="text-sm text-gray-600">
                  Showing <span className="font-semibold text-gray-700">{(currentPage - 1) * itemsPerPage + 1}</span> to{' '}
                  <span className="font-semibold text-gray-700">{Math.min(currentPage * itemsPerPage, filteredHubs.length)}</span> of{' '}
                  <span className="font-semibold text-gray-700">{filteredHubs.length}</span> hubs
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setCurrentPage(p => Math.max(p - 1, 1))}
                    disabled={currentPage === 1}
                    className="flex items-center gap-1 px-3 py-1.5 rounded-lg bg-white border border-gray-200 text-gray-600 hover:bg-gray-50 transition disabled:opacity-40 disabled:cursor-not-allowed text-sm"
                  >
                    <FiChevronLeft className="w-4 h-4" />
                    Previous
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
                          className={`w-9 h-9 rounded-lg transition-all text-sm ${
                            currentPage === pageNum
                              ? "bg-gradient-to-r from-emerald-500 to-teal-500 text-white font-semibold shadow-md"
                              : "bg-white border border-gray-200 text-gray-600 hover:bg-gray-50"
                          }`}
                        >
                          {pageNum}
                        </button>
                      );
                    })}
                  </div>
                  <button
                    onClick={() => setCurrentPage(p => Math.min(p + 1, totalPages))}
                    disabled={currentPage === totalPages}
                    className="flex items-center gap-1 px-3 py-1.5 rounded-lg bg-white border border-gray-200 text-gray-600 hover:bg-gray-50 transition disabled:opacity-40 disabled:cursor-not-allowed text-sm"
                  >
                    Next
                    <FiChevronRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            )}
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

export default ListofHubData;