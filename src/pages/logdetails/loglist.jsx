// import React, { useState, useEffect } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { toast } from 'react-toastify';

// const LogRetentionlist = () => {
//     const navigate = useNavigate();
//     const [logData, setLogData] = useState([]); // Initial state is an empty array
//     const [loading, setLoading] = useState(true); // State to handle loading status
//     const [currentPage, setCurrentPage] = useState(1); // Current page state
//     const [itemsPerPage] = useState(50); // Number of items to display per page

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
//                     } else {
//                         console.log("You are an authorized user");
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

//     // Fetch all log data
//     useEffect(() => {
//         const fetchAllLogData = async () => {
//             const rooturi = import.meta.env.VITE_ROOT_URI;
//             const apikey = import.meta.env.VITE_API_KEY;

//             try {
//                 const response = await fetch(`${rooturi}/admin/getalllogs`, {
//                     method: "GET",
//                     headers: {
//                         'Content-Type': 'application/json',
//                         'apiauthkey': apikey,
//                     },
//                 });

//                 const result = await response.json();
//                 const data = Array.isArray(result.data) ? result.data : [];
//                 setLogData(data);
//                 setLoading(false);
//             } catch (error) {
//                 console.error("Error fetching log data:", error);
//                 toast("Failed to fetch log data");
//                 setLogData([]);
//                 setLoading(false);
//             }
//         };

//         fetchAllLogData();
//     }, []);

//     // Function to truncate messages
//     const truncateMessage = (message, length = 80) => {
//         return message.length > length ? `${message.substring(0, length)}...` : message;
//     };

//     // Calculate the current logs to display
//     const indexOfLastLog = currentPage * itemsPerPage;
//     const indexOfFirstLog = indexOfLastLog - itemsPerPage;
//     const currentLogs = logData.slice(indexOfFirstLog, indexOfLastLog);

//     // Calculate total pages
//     const totalPages = Math.ceil(logData.length / itemsPerPage);

//     // Function to determine the class based on message type
//     const getMessageTypeClass = (type) => {
//         switch (type) {
//             case 'info':
//                 return 'bg-gradient-to-r from-teal-300 to-sky-600 bg-clip-text text-transparent'
//             case 'error':
//                 return 'bg-gradient-to-r from-fuchsia-300 to-pink-600 bg-clip-text text-transparent'; // Red for error
//             case 'success':
//                 return 'bg-gradient-to-r from-green-300 to-teal-700 bg-clip-text text-transparent'; // Green for success
//             case 'update':
//                 return 'bg-gradient-to-r from-orange-300 to-red-600 bg-clip-text text-transparent0'; // Orange for update
//             case 'processing':
//                 return 'bg-gradient-to-r from-yellow-300 to-emerald-400 bg-clip-text text-transparent'; // Yellow for processing
//             default:
//                 return 'bg-gradient-to-r from-indigo-500 to-sky-500 bg-clip-text text-transparent'; // Default color
//         }
//     };
//     const [ipAddress, setIpAddress] = useState('');
//     //ip tracking facility
//     useEffect(() => {
//       // Fetch the IP address from the API
//       const fetchIpAddress = async () => {
//         const rooturi = import.meta.env.VITE_ROOT_URI;
//         const apikey = import.meta.env.VITE_API_KEY;
//           try {
//               const response = await fetch("https://api.ipify.org?format=json");
//               const data = await response.json();
//               console.log(data)
//               // Set the IP address in state
//               if(data){
//                 setIpAddress(data.ip);
//                 const currentDateTime = new Date().toISOString();
//                 const pathfinder = "loglist.jsx"
//                 const resp = await fetch(`${rooturi}/admin/getip`,{
//                     method: 'POST',
//                 headers: {
//                     'Content-Type': 'application/json',
//                     'apiauthkey': apikey,
//                 },
//                 body: JSON.stringify({ip:data.ip,datetime:currentDateTime,path:pathfinder})
//                 })
//               }
          

//           } catch (error) {
//               console.error("Error fetching IP address:", error);
//           }
//       };
  
//       fetchIpAddress();
//   }, []); // Empty dependency array means this runs once after the initial render
//   const backtohome = (event) => {
//     event.preventDefault(); // Prevent default action
//     navigate("/"); // Navigate to home
//   }
//   const handleUidClick=(id)=>{
//     navigate(`/logdetails/${id}`)
//   }
//     return (
//         <div className="rounded-lg border border-gray-200 p-4 sm:p-6 md:p-8">
//             <div className="overflow-x-auto">
//                 <table className="min-w-full divide-y-2 divide-gray-200 bg-white text-sm">
//                     <thead className="ltr:text-left rtl:text-right">
//                         <tr>
//                             {['id', 'uid', 'messagetype', 'messages', 'filelocation'].map((heading) => (
//                                 <th key={heading} className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
//                                     {heading}
//                                 </th>
//                             ))}
//                         </tr>
//                     </thead>
//                     <tbody className="divide-y divide-gray-200">
//                         {loading ? (
//                             <tr>
//                                 <td colSpan="5" className="whitespace-nowrap px-4 py-2 text-center text-gray-700">
//                                     Loading...
//                                 </td>
//                             </tr>
//                         ) : (
//                             currentLogs.length > 0 ? (
//                                 currentLogs.map((log) => (
//                                     <tr key={log.id}>
//                                         <td className="whitespace-nowrap px-4 py-2 text-teal-700">
//                                             <button className='text-blue-600 hover:underline'
//                                             onClick={()=>handleUidClick(log.id)}
//                                             >
//                                                 {log.id}
//                                             </button>
//                                         </td>
//                                         <td className="whitespace-nowrap px-4 py-2 text-lime-500">{log.uid}</td>
//                                         <td className="whitespace-nowrap px-4 py-2 ">
//                                             <span className={getMessageTypeClass(log.messagetype)}>
//                                                 {log.messagetype}
//                                             </span>
//                                         </td>
//                                         <td className="whitespace-nowrap px-4 py-2 text-indigo-900">
//                                             {truncateMessage(log.messages)}
//                                         </td>
//                                         <td className="whitespace-nowrap px-4 py-2 text-pink-800">{log.filelocation}</td>
//                                     </tr>
//                                 ))
//                             ) : (
//                                 <tr>
//                                     <td colSpan="5" className="whitespace-nowrap px-4 py-2 text-center text-gray-700">
//                                         No data available
//                                     </td>
//                                 </tr>
//                             )
//                         )}
//                     </tbody>
//                 </table>
//             </div>
//             <div className="rounded-b-lg border-t border-gray-200 px-4 py-2 sm:px-6 md:px-8">
//     <ol className="flex justify-end gap-1 text-xs font-medium">
//         <li>
//             <button
//                 onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
//                 disabled={currentPage === 1}
//                 className="inline-flex items-center justify-center rounded border border-gray-100 bg-white text-gray-900 rtl:rotate-180"
//             >
//                 <span className="sr-only">Prev Page</span>
//                 <svg
//                     xmlns="http://www.w3.org/2000/svg"
//                     className="w-3 h-3"
//                     viewBox="0 0 20 20"
//                     fill="currentColor"
//                 >
//                     <path
//                         fillRule="evenodd"
//                         d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
//                         clipRule="evenodd"
//                     />
//                 </svg>
//             </button>
//         </li>

//         {/* Previous 10 Button */}
//         {currentPage > 10 && (
//             <li>
//                 <button
//                     onClick={() => setCurrentPage(prev => Math.max(prev - 10, 1))}
//                     className="inline-flex items-center justify-center rounded border border-gray-100 bg-white text-gray-900"
//                 >
//                     <span className="sr-only">Previous 10 Pages</span>
//                     Previous 10
//                 </button>
//             </li>
//         )}

//         {/* Page Numbers */}
//         {Array.from({ length: Math.min(totalPages, 10) }, (_, index) => {
//             const pageNumber = index + 1 + (Math.floor((currentPage - 1) / 10) * 10);
//             if (pageNumber > totalPages) return null; // Skip if page number exceeds total pages
//             return (
//                 <li key={pageNumber}>
//                     <button
//                         onClick={() => setCurrentPage(pageNumber)}
//                         className={`block w-8 rounded text-center leading-8 ${currentPage === pageNumber ? 'bg-blue-600 text-white' : 'border border-gray-100 bg-white text-gray-900'}`}
//                     >
//                         {pageNumber}
//                     </button>
//                 </li>
//             );
//         })}

//         {/* Next 10 Button */}
//         {totalPages > 10 && currentPage <= totalPages - 10 && (
//             <li>
//                 <button
//                     onClick={() => setCurrentPage(prev => Math.min(prev + 10, totalPages))}
//                     className="inline-flex items-center justify-center rounded border border-gray-100 bg-white text-gray-900"
//                 >
//                     <span className="sr-only">Next 10 Pages</span>
//                     Next 10
//                 </button>
//             </li>
//         )}

//         <li>
//             <button
//                 onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
//                 disabled={currentPage === totalPages}
//                 className="inline-flex items-center justify-center rounded border border-gray-100 bg-white text-gray-900 rtl:rotate-180"
//             >
//                 <span className="sr-only">Next Page</span>
//                 <svg
//                     xmlns="http://www.w3.org/2000/svg"
//                     className="w-3 h-3"
//                     viewBox="0 0 20 20"
//                     fill="currentColor"
//                 >
//                     <path
//                         fillRule="evenodd"
//                         d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
//                         clipRule="evenodd"
//                     />
//                 </svg>
//             </button>
//         </li>
//     </ol>
// </div>
//     <div className="py-11">
//                 <button 
//         className="relative inline-block text-white font-bold py-2 px-4 rounded-full overflow-hidden group transition-transform duration-300 transform hover:scale-105"
//         onClick={(event) => backtohome(event)}
//     >
//         <span className="absolute inset-0 bg-gradient-to-r from-teal-400 via-teal-500 to-teal-600 transform scale-110 group-hover:scale-100 transition duration-300"></span>
//         <span className="relative z-10">HOME</span>
//     </button>
// </div>

// </div>
//     );
// };

// export default LogRetentionlist;


import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const LogRetentionlist = () => {
  const navigate = useNavigate();
  const [logData, setLogData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(50);
  const [ipAddress, setIpAddress] = useState('');

  /* ---------------- AUTH ---------------- */
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
          body: JSON.stringify({ token })
        });

        const data = await res.json();
        if (!res.ok || data.user.userType !== "superadmin") {
          toast("Unauthorized");
          navigate("/signin");
        }
      } catch {
        navigate("/signin");
      }
    };
    checkAuthentication();
  }, [navigate]);

  /* ---------------- FETCH LOGS ---------------- */
  useEffect(() => {
    const fetchAllLogData = async () => {
      const rooturi = import.meta.env.VITE_ROOT_URI;
      const apikey = import.meta.env.VITE_API_KEY;

      try {
        const res = await fetch(`${rooturi}/admin/getalllogs`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            apiauthkey: apikey,
          },
        });

        const result = await res.json();
        setLogData(Array.isArray(result.data) ? result.data : []);
      } catch {
        toast("Failed to fetch logs");
        setLogData([]);
      } finally {
        setLoading(false);
      }
    };
    fetchAllLogData();
  }, []);

  /* ---------------- IP TRACK ---------------- */
  useEffect(() => {
    const fetchIpAddress = async () => {
      const rooturi = import.meta.env.VITE_ROOT_URI;
      const apikey = import.meta.env.VITE_API_KEY;

      try {
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
              path: "loglist.jsx"
            })
          });
        }
      } catch {}
    };
    fetchIpAddress();
  }, []);

  const truncateMessage = (msg, len = 80) =>
    msg.length > len ? msg.substring(0, len) + "..." : msg;

  const indexOfLast = currentPage * itemsPerPage;
  const indexOfFirst = indexOfLast - itemsPerPage;
  const currentLogs = logData.slice(indexOfFirst, indexOfLast);
  const totalPages = Math.ceil(logData.length / itemsPerPage);

  const getMessageTypeClass = (type) => {
    switch (type) {
      case "info": return "text-sky-400";
      case "error": return "text-red-400";
      case "success": return "text-emerald-400";
      case "update": return "text-orange-400";
      case "processing": return "text-yellow-400";
      default: return "text-indigo-400";
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black p-6">

      {/* HEADER */}
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-extrabold text-white">
          Log Retention List
        </h1>

        <button
          onClick={() => navigate("/")}
          className="px-6 py-2 rounded-full bg-gradient-to-r from-teal-400 to-blue-600 text-white font-bold shadow-lg hover:scale-105 transition"
        >
          HOME
        </button>
      </div>

      {/* TABLE */}
      <div className="bg-white/10 backdrop-blur-lg rounded-xl shadow-2xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full text-sm text-gray-300">
            <thead className="sticky top-0 bg-black/60 backdrop-blur-md">
              <tr>
                {['ID', 'UID', 'TYPE', 'MESSAGE', 'FILE'].map(h => (
                  <th key={h} className="px-4 py-3 text-left font-bold text-white">
                    {h}
                  </th>
                ))}
              </tr>
            </thead>

            <tbody className="divide-y divide-white/10">
              {loading ? (
                <tr>
                  <td colSpan="5" className="text-center py-6 text-white">
                    Loading...
                  </td>
                </tr>
              ) : currentLogs.length ? (
                currentLogs.map(log => (
                  <tr key={log.id} className="hover:bg-white/5 transition">
                    <td className="px-4 py-3 font-bold text-sky-400 cursor-pointer"
                        onClick={() => navigate(`/logdetails/${log.id}`)}>
                      {log.id}
                    </td>
                    <td className="px-4 py-3 text-lime-400">{log.uid}</td>
                    <td className={`px-4 py-3 font-bold ${getMessageTypeClass(log.messagetype)}`}>
                      {log.messagetype}
                    </td>
                    <td className="px-4 py-3 text-gray-200">
                      {truncateMessage(log.messages)}
                    </td>
                    <td className="px-4 py-3 text-pink-400">
                      {log.filelocation}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="5" className="text-center py-6 text-gray-400">
                    No data available
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* PAGINATION */}
        <div className="flex justify-end gap-2 p-4 bg-black/40">
          <button
            disabled={currentPage === 1}
            onClick={() => setCurrentPage(p => Math.max(p - 1, 1))}
            className="px-3 py-1 rounded bg-white/10 text-white disabled:opacity-40"
          >
            ◀
          </button>

          <span className="px-4 py-1 font-bold text-white">
            {currentPage} / {totalPages}
          </span>

          <button
            disabled={currentPage === totalPages}
            onClick={() => setCurrentPage(p => Math.min(p + 1, totalPages))}
            className="px-3 py-1 rounded bg-white/10 text-white disabled:opacity-40"
          >
            ▶
          </button>
        </div>
      </div>
    </div>
  );
};

export default LogRetentionlist;
