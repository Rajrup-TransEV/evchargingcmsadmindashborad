// import React, { useState, useEffect } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { toast } from 'react-toastify';

// const ListofUsers = () => {
//   const navigate = useNavigate();
//   const [userData, setuserData] = useState([]); // Initial state is an empty array
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
//     const fetchAllChargerData = async () => {
//       const rooturi = import.meta.env.VITE_ROOT_URI;
//       const apikey = import.meta.env.VITE_API_KEY;
  
//       try {
//         const response = await fetch(`${rooturi}/admin/getalladmindata`, {
//           method: "GET",
//           headers: {
//             'Content-Type': 'application/json',
//             'apiauthkey': apikey,
//           },
//         });
  
//         const result = await response.json();
//         const data = Array.isArray(result.data) ? result.data : [];
//         setuserData(data);
//         setLoading(false);
//       } catch (error) {
//         console.error("Error fetching charger data:", error);
//         toast("Failed to fetch charger data");
//         setuserData([]);
//         setLoading(false);
//       }
//     };
  
//     fetchAllChargerData();
//   }, []);

//   const handleDelete = async (uid) => {
//     const rooturi = import.meta.env.VITE_ROOT_URI;
//     const apikey = import.meta.env.VITE_API_KEY;

//     try {
//       const response = await fetch(`${rooturi}/admin/deleteadmindata`, {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//           'apiauthkey': apikey,
//         },
//         body: JSON.stringify({ uid }), // Pass uid in request body
//       });

//       if (response.ok) {
//         toast.success("User deleted successfully");
//         // Remove deleted user from state
//         setuserData((prevUsers) => prevUsers.filter(user => user.uid !== uid));
//       } else {
//         toast.error("Failed to delete user");
//       }
//     } catch (error) {
//       console.error("Error deleting user:", error);
//       toast.error("An error occurred while deleting the user");
//     }
//   };
//   // Calculate the current chargers to display
//   const indexOfLastUser = currentPage * itemsPerPage;
//   const indexOfFirstUser = indexOfLastUser - itemsPerPage;
//   const currentUsers = userData.slice(indexOfFirstUser, indexOfLastUser);

//   // Calculate total pages
//   const totalPages = Math.ceil(userData.length / itemsPerPage);
// //charger details
// const handleUidClick = (uid) => {
//   navigate(`/userdetails/${uid}`);
// };

// const [ipAddress, setIpAddress] = useState('');
// //ip tracking facility
// useEffect(() => {
//   // Fetch the IP address from the API
//   const fetchIpAddress = async () => {
//     const rooturi = import.meta.env.VITE_ROOT_URI;
//     const apikey = import.meta.env.VITE_API_KEY;
//       try {
//           const response = await fetch("https://api.ipify.org?format=json");
//           const data = await response.json();
//           console.log(data)
//           // Set the IP address in state
//           if(data){
//             setIpAddress(data.ip);
//             const currentDateTime = new Date().toISOString();
//             const pathfinder = "listofusers.jsx"
//             const resp = await fetch(`${rooturi}/admin/getip`,{
//                 method: 'POST',
//             headers: {
//                 'Content-Type': 'application/json',
//                 'apiauthkey': apikey,
//             },
//             body: JSON.stringify({ip:data.ip,datetime:currentDateTime,path:pathfinder})
//             })
//           }
      

//       } catch (error) {
//           console.error("Error fetching IP address:", error);
//       }
//   };

//   fetchIpAddress();
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
//                 'id', 'uid', 'firstname', 'lastname', 'email', 
//                 'password', 'address', 'phonenumber', 'role',
//                 'designation', 'createdAt', 'updatedAt', 'Actions'
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
//                       className="text-blue-600 hover:underline" 
//                       onClick={() => handleUidClick(user.uid)}
//                     >
//                       {user.uid}
//                     </button>,user.firstname,
//                       user.lastname, user.email, user.password, user.address,
//                       user.phonenumber, user.role, user.designation,
//                      user.createdAt,user.updatedAt,
//                      <button 
//                         className="text-red-600 hover:underline" 
//                         onClick={() => handleDelete(user.uid)}
//                       >
//                         Delete
//                       </button>
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
//               <svg
//                 xmlns="http://www.w3.org/2000/svg"
//                 className="w-3 h-3"
//                 viewBox="0 0 20 20"
//                 fill="currentColor"
//               >
//                 <path
//                   fillRule="evenodd"
//                   d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
//                   clipRule="evenodd"
//                 />
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
//               <svg
//                 xmlns="http://www.w3.org/2000/svg"
//                 className="w-3 h-3"
//                 viewBox="0 0 20 20"
//                 fill="currentColor"
//               >
//                 <path
//                   fillRule="evenodd"
//                   d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
//                   clipRule="evenodd"
//                 />
//               </svg>
//             </button>
//           </li>
//         </ol>
//       </div>
//       <div className="py-11">
//                 <button 
//         className="relative inline-block text-white font-bold py-2 px-4 rounded-full overflow-hidden group transition-transform duration-300 transform hover:scale-105"
//         onClick={(event) => backtohome(event)}
//     >
//         <span className="absolute inset-0 bg-gradient-to-r from-teal-400 via-teal-500 to-teal-600 transform scale-110 group-hover:scale-100 transition duration-300"></span>
//         <span className="relative z-10">HOME</span>
//     </button>
// </div>
//     </div>
//   );
// };

// export default ListofUsers;

import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import Sidebar from '../../partials/Sidebar';
import { 
  FiUsers, 
  FiUser, 
  FiMail, 
  FiPhone, 
  FiShield, 
  FiBriefcase,
  FiTrash2,
  FiEye,
  FiPlus,
  FiSearch,
  FiChevronLeft,
  FiChevronRight,
  FiCalendar,
  FiClock,
  FiUserCheck
} from 'react-icons/fi';

const ListofUsers = () => {
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [userData, setuserData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);
  const [searchQuery, setSearchQuery] = useState('');
  const [ipAddress, setIpAddress] = useState('');

  /* ================= AUTH ================= */
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
          toast.error("Unauthorized access");
          navigate("/signin");
        }
      } catch {
        toast.error("Authentication failed");
        navigate("/signin");
      }
    };
    checkAuthentication();
  }, [navigate]);

  /* ================= FETCH USERS ================= */
  useEffect(() => {
    const fetchAllUsers = async () => {
      const rooturi = import.meta.env.VITE_ROOT_URI;
      const apikey = import.meta.env.VITE_API_KEY;

      try {
        const res = await fetch(`${rooturi}/admin/getalladmindata`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            apiauthkey: apikey,
          },
        });

        const result = await res.json();
        setuserData(Array.isArray(result.data) ? result.data : []);
      } catch {
        toast.error("Failed to fetch users");
        setuserData([]);
      } finally {
        setLoading(false);
      }
    };
    fetchAllUsers();
  }, []);

  /* ================= DELETE ================= */
  const handleDelete = async (uid) => {
    if (!window.confirm('Are you sure you want to delete this user?')) return;

    const rooturi = import.meta.env.VITE_ROOT_URI;
    const apikey = import.meta.env.VITE_API_KEY;

    try {
      const res = await fetch(`${rooturi}/admin/deleteadmindata`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          apiauthkey: apikey,
        },
        body: JSON.stringify({ uid }),
      });

      if (res.ok) {
        toast.success("User deleted successfully");
        setuserData(prev => prev.filter(u => u.uid !== uid));
      } else {
        toast.error("Delete failed");
      }
    } catch {
      toast.error("Delete error");
    }
  };

  /* ================= PAGINATION ================= */
  const filteredUsers = userData.filter(user => 
    user.firstname?.toLowerCase().includes(searchQuery.toLowerCase()) ||
    user.lastname?.toLowerCase().includes(searchQuery.toLowerCase()) ||
    user.email?.toLowerCase().includes(searchQuery.toLowerCase()) ||
    user.role?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const indexOfLastUser = currentPage * itemsPerPage;
  const indexOfFirstUser = indexOfLastUser - itemsPerPage;
  const currentUsers = filteredUsers.slice(indexOfFirstUser, indexOfLastUser);
  const totalPages = Math.ceil(filteredUsers.length / itemsPerPage);

  const handleUidClick = (uid) => navigate(`/userdetails/${uid}`);

  /* ================= IP TRACK ================= */
  useEffect(() => {
    const fetchIpAddress = async () => {
      try {
        const rooturi = import.meta.env.VITE_ROOT_URI;
        const apikey = import.meta.env.VITE_API_KEY;

        const res = await fetch("https://api.ipify.org?format=json");
        const data = await res.json();

        if (data?.ip) {
          setIpAddress(data.ip);
          await fetch(`${rooturi}/admin/getip`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              apiauthkey: apikey,
            },
            body: JSON.stringify({
              ip: data.ip,
              datetime: new Date().toISOString(),
              path: "listofusers.jsx",
            }),
          });
        }
      } catch {}
    };
    fetchIpAddress();
  }, []);

  const formatDate = (dateString) => {
    if (!dateString) return '—';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      month: 'short', 
      day: 'numeric', 
      year: 'numeric' 
    });
  };

  return (
    <div className="flex h-screen overflow-hidden bg-gradient-to-br from-blue-50 via-white to-indigo-50">
      {/* Sidebar */}
      <Sidebar 
        sidebarOpen={sidebarOpen} 
        setSidebarOpen={setSidebarOpen} 
        variant="default"
      />

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Mobile Header */}
        <header className="lg:hidden flex items-center justify-between p-4 bg-white/80 backdrop-blur-sm border-b border-gray-200">
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="p-2 rounded-lg text-gray-600 hover:bg-gray-100 transition-colors"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
          <h1 className="text-xl font-bold text-gray-800">Admin Users</h1>
          <div className="w-10" />
        </header>

        {/* Page Content */}
        <div className="flex-1 overflow-y-auto p-4 md:p-8">
          {/* Header */}
          <div className="hidden lg:flex items-center gap-4 mb-8">
            <div>
              <h1 className="text-3xl font-bold text-gray-800 flex items-center gap-3">
                <span className="bg-gradient-to-r from-indigo-500 to-purple-500 p-2.5 rounded-xl text-white shadow-lg">
                  <FiUsers className="w-6 h-6" />
                </span>
                Admin Users
              </h1>
              <p className="text-gray-500 mt-1">Manage all administrator accounts</p>
            </div>
          </div>

          {/* Stats and Actions */}
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
            <div className="flex flex-wrap items-center gap-4">
              <div className="flex items-center gap-2 bg-white rounded-xl px-4 py-2 shadow-sm border border-gray-200">
                <FiUsers className="w-5 h-5 text-indigo-500" />
                <span className="text-sm text-gray-600">Total:</span>
                <span className="text-lg font-bold text-gray-800">{filteredUsers.length}</span>
              </div>
              <div className="flex items-center gap-2 bg-white rounded-xl px-4 py-2 shadow-sm border border-gray-200">
                <FiUserCheck className="w-5 h-5 text-emerald-500" />
                <span className="text-sm text-gray-600">Active:</span>
                <span className="text-lg font-bold text-gray-800">{filteredUsers.length}</span>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-3">
              <div className="relative">
                <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search users..."
                  value={searchQuery}
                  onChange={(e) => {
                    setSearchQuery(e.target.value);
                    setCurrentPage(1);
                  }}
                  className="pl-10 pr-4 py-2.5 rounded-xl bg-white border border-gray-200 text-gray-700 placeholder-gray-400 focus:ring-2 focus:ring-indigo-400 focus:border-transparent outline-none transition-all duration-200 w-full sm:w-64"
                />
              </div>
              <button
                onClick={() => navigate('/createnewuser')}
                className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-indigo-500 to-purple-500 text-white font-semibold shadow-md hover:shadow-lg hover:scale-105 transition transform"
              >
                <FiPlus className="w-5 h-5" />
                New User
              </button>
            </div>
          </div>

          {/* Table */}
          <div className="bg-white rounded-2xl shadow-xl border border-gray-200 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="min-w-full">
                <thead className="bg-gradient-to-r from-gray-50 to-gray-100 border-b border-gray-200">
                  <tr>
                    {[
                      "ID", "User", "Email", "Phone", "Role", 
                      "Designation", "Created", "Actions"
                    ].map(h => (
                      <th key={h} className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                        {h}
                      </th>
                    ))}
                  </tr>
                </thead>

                <tbody className="divide-y divide-gray-100">
                  {loading ? (
                    <tr>
                      <td colSpan="8" className="px-4 py-12 text-center">
                        <div className="flex items-center justify-center gap-3 text-gray-500">
                          <svg className="animate-spin h-6 w-6 text-indigo-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                          </svg>
                          Loading users...
                        </div>
                      </td>
                    </tr>
                  ) : currentUsers.length ? (
                    currentUsers.map((user, index) => (
                      <tr key={user.id} className="hover:bg-indigo-50/50 transition-colors duration-150">
                        <td className="px-4 py-3 text-sm text-gray-500">
                          {indexOfFirstUser + index + 1}
                        </td>

                        <td className="px-4 py-3">
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-full bg-gradient-to-r from-indigo-100 to-purple-100 flex items-center justify-center text-indigo-600 font-semibold">
                              {user.firstname?.[0]}{user.lastname?.[0]}
                            </div>
                            <div>
                              <div className="text-sm font-semibold text-gray-800">
                                {user.firstname} {user.lastname}
                              </div>
                              <button
                                onClick={() => handleUidClick(user.uid)}
                                className="text-xs text-indigo-500 hover:text-indigo-700 font-mono hover:underline"
                              >
                                {user.uid}
                              </button>
                            </div>
                          </div>
                        </td>

                        <td className="px-4 py-3">
                          <div className="flex items-center gap-2 text-sm text-gray-600">
                            <FiMail className="w-4 h-4 text-gray-400" />
                            {user.email}
                          </div>
                        </td>

                        <td className="px-4 py-3">
                          <div className="flex items-center gap-2 text-sm text-gray-600">
                            <FiPhone className="w-4 h-4 text-gray-400" />
                            {user.phonenumber || '—'}
                          </div>
                        </td>

                        <td className="px-4 py-3">
                          <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                            user.role === 'admin' 
                              ? 'bg-indigo-100 text-indigo-700'
                              : 'bg-purple-100 text-purple-700'
                          }`}>
                            <FiShield className="inline w-3 h-3 mr-1" />
                            {user.role || '—'}
                          </span>
                        </td>

                        <td className="px-4 py-3">
                          <div className="flex items-center gap-2 text-sm text-gray-600">
                            <FiBriefcase className="w-4 h-4 text-gray-400" />
                            {user.designation || '—'}
                          </div>
                        </td>

                        <td className="px-4 py-3">
                          <div className="text-sm text-gray-600">
                            <div className="flex items-center gap-1">
                              <FiCalendar className="w-3 h-3 text-gray-400" />
                              {formatDate(user.createdAt)}
                            </div>
                            <div className="flex items-center gap-1 text-xs text-gray-400 mt-0.5">
                              <FiClock className="w-3 h-3" />
                              {user.createdAt ? new Date(user.createdAt).toLocaleTimeString('en-US', { 
                                hour: '2-digit', 
                                minute: '2-digit' 
                              }) : '—'}
                            </div>
                          </div>
                        </td>

                        <td className="px-4 py-3">
                          <div className="flex items-center gap-2">
                            <button
                              onClick={() => handleUidClick(user.uid)}
                              className="p-2 rounded-lg bg-indigo-50 text-indigo-600 hover:bg-indigo-100 transition-colors"
                              title="View Details"
                            >
                              <FiEye className="w-4 h-4" />
                            </button>
                            <button
                              onClick={() => handleDelete(user.uid)}
                              className="p-2 rounded-lg bg-red-50 text-red-500 hover:bg-red-100 transition-colors"
                              title="Delete User"
                            >
                              <FiTrash2 className="w-4 h-4" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="8" className="px-4 py-12 text-center">
                        <div className="flex flex-col items-center gap-2 text-gray-400">
                          <FiUsers className="w-12 h-12 text-gray-300" />
                          <p className="text-lg font-medium text-gray-500">No users found</p>
                          <p className="text-sm">Try adjusting your search or create a new user</p>
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
                  Showing {indexOfFirstUser + 1} to {Math.min(indexOfLastUser, filteredUsers.length)} of {filteredUsers.length} users
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
                              ? "bg-gradient-to-r from-indigo-500 to-purple-500 text-white font-semibold shadow-md"
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
          <div className="mt-4 text-center text-xs text-gray-400">
            © {new Date().getFullYear()} Admin Panel. All rights reserved.
          </div>
        </div>
      </div>
    </div>
  );
};

export default ListofUsers;