// import React, { useState, useEffect } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { toast } from 'react-toastify';

// const HelpandSupport = () => {
//     const navigate = useNavigate();
//     const [userData, setUserData] = useState([]);
//     const [loading, setLoading] = useState(true);
//     const [currentPage, setCurrentPage] = useState(1);
//     const [itemsPerPage] = useState(10);

//     useEffect(() => {
//         const checkAuthentication = async () => {
//             const rootUri = import.meta.env.VITE_ROOT_URI;
//             const apiKey = import.meta.env.VITE_API_KEY;

//             try {
//                 const token = localStorage.getItem("token");
//                 if (!token) {
//                     navigate("/signin");
//                     return;
//                 }

//                 const response = await fetch(`${rootUri}/userauth/verifyuser`, {
//                     method: 'POST',
//                     headers: {
//                         'Content-Type': 'application/json',
//                         'apiauthkey': apiKey,
//                     },
//                     body: JSON.stringify({ token })
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

//     useEffect(() => {
//         const fetchAllChargerData = async () => {
//             const rootUri = import.meta.env.VITE_ROOT_URI;
//             const apiKey = import.meta.env.VITE_API_KEY;

//             try {
//                 const response = await fetch(`${rootUri}/admin/vham`, {
//                     method: "GET",
//                     headers: {
//                         'Content-Type': 'application/json',
//                         'apiauthkey': apiKey,
//                     },
//                 });

//                 const result = await response.json();
//                 const data = Array.isArray(result.data) ? result.data : [];
//                 setUserData(data);
//                 setLoading(false);
//             } catch (error) {
//                 console.error("Error fetching charger data:", error);
//                 toast("Failed to fetch charger data");
//                 setUserData([]);
//                 setLoading(false);
//             }
//         };

//         fetchAllChargerData();
//     }, []);

//     const handleDelete = async (uid) => {
//         const rootUri = import.meta.env.VITE_ROOT_URI;
//         const apiKey = import.meta.env.VITE_API_KEY;

//         try {
//             const response = await fetch(`${rootUri}/admin/cam`, {
//                 method: 'POST',
//                 headers: {
//                     'Content-Type': 'application/json',
//                     'apiauthkey': apiKey,
//                 },
//                 body: JSON.stringify({ uid }),
//             });

//             if (response.ok) {
//                 toast.success("Message deleted successfully");
//                 setUserData((prevUsers) => prevUsers.filter(user => user.uid !== uid));
//             } else {
//                 toast.error("Failed to delete Message");
//             }
//         } catch (error) {
//             console.error("Error deleting user:", error);
//             toast.error("An error occurred while deleting the Message");
//         }
//     };

//     const indexOfLastUser = currentPage * itemsPerPage;
//     const indexOfFirstUser = indexOfLastUser - itemsPerPage;
//     const currentUsers = userData.slice(indexOfFirstUser, indexOfLastUser);

//     const totalPages = Math.ceil(userData.length / itemsPerPage);

//     const handleUidClick = (uid) => {
//         navigate(`/supportdetails/${uid}`);
//     };

//     const backToHome = (event) => {
//         event.preventDefault();
//         navigate("/");
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
//                 const pathfinder = "Helpandsupport.jsx"
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
  

//     return (
//         <div className="rounded-lg border border-gray-200 p-6">
//             <div className="overflow-x-auto">
//                 <table className="min-w-full divide-y-2 divide-gray-200 bg-white text-sm">
//                     <thead className="text-left bg-gray-50">
//                         <tr>
//                             {['id', 'uid', 'name', 'email', 'phonenumber', 'message', 'adminuid', 'messagestatus', 'createdAt', 'updatedAt', 'Actions'].map((heading) => (
//                                 <th key={heading} className="px-4 py-2 text-gray-900 font-semibold">{heading}</th>
//                             ))}
//                         </tr>
//                     </thead>
//                     <tbody className="divide-y divide-gray-200">
//                         {loading ? (
//                             <tr>
//                                 <td colSpan="11" className="text-center py-4 text-gray-500">Loading...</td>
//                             </tr>
//                         ) : (
//                             currentUsers.length > 0 ? (
//                                 currentUsers.map((user) => (
//                                     <tr key={user.id}>
//                                         <td className="px-4 py-2 text-gray-700">{user.id}</td>
//                                         <td className="px-4 py-2 text-gray-700">
//                                             <button className="text-blue-600 hover:underline" onClick={() => handleUidClick(user.uid)}>
//                                                 {user.uid}
//                                             </button>
//                                         </td>
//                                         <td className="px-4 py-2 text-gray-700">{user.name}</td>
//                                         <td className="px-4 py-2 text-gray-700">{user.email}</td>
//                                         <td className="px-4 py-2 text-gray-700">{user.phonenumber}</td>
//                                         <td className="px-4 py-2 text-gray-700">{user.message}</td>
//                                         <td className="px-4 py-2 text-gray-700">{user.adminuid}</td>
//                                         <td className="px-4 py-2 text-gray-700">{user.messagestatus}</td>
//                                         <td className="px-4 py-2 text-gray-700">{user.createdAt}</td>
//                                         <td className="px-4 py-2 text-gray-700">{user.updatedAt}</td>
//                                         <td className="px-4 py-2 text-red-600 cursor-pointer hover:underline" onClick={() => handleDelete(user.uid)}>
//                                             Delete
//                                         </td>
//                                     </tr>
//                                 ))
//                             ) : (
//                                 <tr>
//                                     <td colSpan="11" className="text-center py-4 text-gray-500">No data available</td>
//                                 </tr>
//                             )
//                         )}
//                     </tbody>
//                 </table>
//             </div>

//             <div className="mt-4 flex justify-between items-center">
//                 <button
//                     onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
//                     disabled={currentPage === 1}
//                     className="px-4 py-2 bg-blue-500 text-white rounded-md disabled:bg-gray-300"
//                 >
//                     Prev
//                 </button>
//                 <div className="flex gap-2">
//                     {Array.from({ length: totalPages }, (_, index) => (
//                         <button
//                             key={index}
//                             onClick={() => setCurrentPage(index + 1)}
//                             className={`w-8 h-8 rounded-full text-center ${currentPage === index + 1 ? 'bg-blue-600 text-white' : 'border border-gray-300'}`}
//                         >
//                             {index + 1}
//                         </button>
//                     ))}
//                 </div>
//                 <button
//                     onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
//                     disabled={currentPage === totalPages}
//                     className="px-4 py-2 bg-blue-500 text-white rounded-md disabled:bg-gray-300"
//                 >
//                     Next
//                 </button>
//             </div>

//             <div className="mt-8 flex justify-center">
//                 <button
//                     className="inline-block bg-teal-500 text-white px-4 py-2 rounded-full hover:bg-teal-600 transition duration-300"
//                     onClick={backToHome}
//                 >
//                     Home
//                 </button>
//             </div>
//         </div>
//     );
// };

// export default HelpandSupport;

import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const HelpandSupport = () => {
  const navigate = useNavigate();
  const [userData, setUserData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);

  // Authentication check
  useEffect(() => {
    const checkAuthentication = async () => {
      const rootUri = import.meta.env.VITE_ROOT_URI;
      const apiKey = import.meta.env.VITE_API_KEY;
      try {
        const token = localStorage.getItem("token");
        if (!token) return navigate("/signin");

        const response = await fetch(`${rootUri}/userauth/verifyuser`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json', 'apiauthkey': apiKey },
          body: JSON.stringify({ token })
        });

        const data = await response.json();
        if (!response.ok || data.user.userType !== "superadmin") {
          toast("Unauthorized access");
          navigate("/signin");
        }
      } catch (error) {
        console.error(error);
        toast("Authentication error");
        navigate("/signin");
      }
    };
    checkAuthentication();
  }, [navigate]);

  // Fetch help/support data
  useEffect(() => {
    const fetchAllChargerData = async () => {
      const rootUri = import.meta.env.VITE_ROOT_URI;
      const apiKey = import.meta.env.VITE_API_KEY;
      try {
        const response = await fetch(`${rootUri}/admin/vham`, {
          method: "GET",
          headers: { 'Content-Type': 'application/json', 'apiauthkey': apiKey },
        });
        const result = await response.json();
        const data = Array.isArray(result.data) ? result.data : [];
        setUserData(data);
        setLoading(false);
      } catch (error) {
        console.error(error);
        toast("Failed to fetch data");
        setUserData([]);
        setLoading(false);
      }
    };
    fetchAllChargerData();
  }, []);

  const handleDelete = async (uid) => {
    const rootUri = import.meta.env.VITE_ROOT_URI;
    const apiKey = import.meta.env.VITE_API_KEY;

    if (!window.confirm("Are you sure you want to delete this message?")) return;

    try {
      const response = await fetch(`${rootUri}/admin/cam`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'apiauthkey': apiKey },
        body: JSON.stringify({ uid }),
      });

      if (response.ok) {
        toast.success("Message deleted successfully");
        setUserData(prev => prev.filter(user => user.uid !== uid));
      } else toast.error("Failed to delete message");
    } catch (error) {
      console.error(error);
      toast.error("Error deleting message");
    }
  };

  const indexOfLastUser = currentPage * itemsPerPage;
  const indexOfFirstUser = indexOfLastUser - itemsPerPage;
  const currentUsers = userData.slice(indexOfFirstUser, indexOfLastUser);
  const totalPages = Math.ceil(userData.length / itemsPerPage);

  const handleUidClick = (uid) => navigate(`/supportdetails/${uid}`);
  const backToHome = (event) => { event.preventDefault(); navigate("/"); };

  return (
    <section className="min-h-screen bg-gradient-to-br from-[#020617] via-[#0b1220] to-[#020617] p-6">
      <div className="max-w-7xl mx-auto">

        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-extrabold text-white mb-2">Help & Support</h1>
          <p className="text-gray-400 text-sm">Manage all help and support messages</p>
        </div>

        {/* Table Container */}
        <div className="overflow-x-auto rounded-3xl bg-[#020617]/60 backdrop-blur-xl border border-gray-700 shadow-[0_20px_60px_rgba(0,0,0,0.7)]">
          <table className="min-w-full text-sm text-gray-300">
            <thead className="bg-[#020617]/80 border-b border-gray-700">
              <tr>
                {['ID', 'UID', 'Name', 'Email', 'Phone', 'Message', 'Admin UID', 'Status', 'Created At', 'Updated At', 'Actions'].map((head) => (
                  <th key={head} className="px-5 py-3 text-left font-semibold uppercase tracking-wider">
                    {head}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr>
                  <td colSpan="11" className="py-8 text-center text-gray-500 font-semibold">Loading...</td>
                </tr>
              ) : currentUsers.length > 0 ? currentUsers.map((user) => (
                <tr key={user.id} className="transition hover:bg-[#111827]">
                  <td className="px-5 py-3">{user.id}</td>
                  <td
                    className="px-5 py-3 text-teal-400 font-semibold cursor-pointer hover:underline"
                    onClick={() => handleUidClick(user.uid)}
                  >
                    {user.uid}
                  </td>
                  <td className="px-5 py-3">{user.name}</td>
                  <td className="px-5 py-3">{user.email}</td>
                  <td className="px-5 py-3">{user.phonenumber}</td>
                  <td className="px-5 py-3">{user.message}</td>
                  <td className="px-5 py-3">{user.adminuid}</td>
                  <td className="px-5 py-3">{user.messagestatus}</td>
                  <td className="px-5 py-3">{user.createdAt}</td>
                  <td className="px-5 py-3">{user.updatedAt}</td>
                  <td className="px-5 py-3">
                    <button
                      onClick={() => handleDelete(user.uid)}
                      className="bg-red-600 px-3 py-1 rounded-full hover:bg-red-500 transition text-white font-semibold"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              )) : (
                <tr>
                  <td colSpan="11" className="py-8 text-center text-gray-500 font-semibold">No data available</td>
                </tr>
              )}
            </tbody>
          </table>

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="flex flex-wrap justify-center gap-2 p-4">
              <button
                onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                disabled={currentPage === 1}
                className="px-3 py-1 rounded-md bg-gray-700 hover:bg-gray-600 disabled:opacity-50 transition"
              >
                Prev
              </button>
              {Array.from({ length: totalPages }, (_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrentPage(i + 1)}
                  className={`px-3 py-1 rounded-md transition ${currentPage === i + 1 ? 'bg-teal-500 text-white shadow-lg' : 'bg-gray-700 hover:bg-gray-600'}`}
                >
                  {i + 1}
                </button>
              ))}
              <button
                onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                disabled={currentPage === totalPages}
                className="px-3 py-1 rounded-md bg-gray-700 hover:bg-gray-600 disabled:opacity-50 transition"
              >
                Next
              </button>
            </div>
          )}
        </div>

        {/* Back Button */}
        <div className="mt-8 flex justify-center">
          <button
            className="bg-teal-500 text-white font-bold px-6 py-3 rounded-full shadow-md hover:bg-teal-600 transition duration-300"
            onClick={backToHome}
          >
            Back to Home
          </button>
        </div>

      </div>
    </section>
  );
};

export default HelpandSupport;
