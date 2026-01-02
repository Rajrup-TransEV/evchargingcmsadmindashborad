// // Dispute form list
// import React, { useState, useEffect } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { toast } from 'react-toastify';

// const DisputeformList = () => {
//     const navigate = useNavigate();
//     const [userData, setUserData] = useState([]); 
//     const [loading, setLoading] = useState(true); 
//     const [currentPage, setCurrentPage] = useState(1); 
//     const [itemsPerPage] = useState(10); 
//     useEffect(() => {
//         const checkAuthentication = async () => {
//           const rooturi = import.meta.env.VITE_ROOT_URI;
//           const apikey = import.meta.env.VITE_API_KEY;
    
//           try {
//             const gettoken = localStorage.getItem("token");
//             if (!gettoken) {
//               navigate("/signin");
//               return;
//             }
    
//             const response = await fetch(`${rooturi}/userauth/verifyuser`, {
//               method: 'POST',
//               headers: {
//                 'Content-Type': 'application/json',
//                 'apiauthkey': apikey,
//               },
//               body: JSON.stringify({ token: gettoken })
//             });
    
//             const data = await response.json();
//             if (response.ok) {
//               if (data.user.userType !== "superadmin") {
//                 toast("You have no authorization to view this page");
//                 navigate("/signin");
//               } else {
//                 console.log("You are an authorized user");
//               }
//             } else {
//               toast("Failed to verify user");
//               navigate("/signin");
//             }
//           } catch (error) {
//             console.error("Error during authentication check:", error);
//             toast("An error occurred during authentication");
//             navigate("/signin");
//           }
//         };
    
//         checkAuthentication();
//       }, [navigate]);
//       useEffect(() => {
//         const fetchAllHubData = async () => {
//           const rooturi = import.meta.env.VITE_ROOT_URI;
//           const apikey = import.meta.env.VITE_API_KEY;
    
//           try {
//             const response = await fetch(`${rooturi}/admin/alldfs`, {
//               method: "GET",
//               headers: {
//                 'Content-Type': 'application/json',
//                 'apiauthkey': apikey,
//               },
//             });
    
//             const result = await response.json();
//             const data = Array.isArray(result.data) ? result.data : [];
//             setUserData(data);
//             setLoading(false);
//           } catch (error) {
//             console.error("Error fetching hub data:", error);
//             toast("Failed to fetch hub data");
//             setUserData([]);
//             setLoading(false);
//           }
//         };
    
//         fetchAllHubData();
//       }, []);
    
//       // Calculate the current hubs to display
//       const indexOfLastUser = currentPage * itemsPerPage;
//       const indexOfFirstUser = indexOfLastUser - itemsPerPage;
//       const currentUsers = userData.slice(indexOfFirstUser, indexOfLastUser);
    
//       // Calculate total pages
//       const totalPages = Math.ceil(userData.length / itemsPerPage);
    
//       // Handle UID click for hub details
//       const handleUidClick = (id) => {
//         navigate(`/disputeformdetails/${id}`);
//       };
    
//       // Delete function
//       const handleDelete = async (uid) => {
//         // Display confirmation dialog
//         const userConfirmed = window.confirm("Are you sure you want to delete this hub?");
        
//         if (userConfirmed) {
//           const rooturi = import.meta.env.VITE_ROOT_URI;
//           const apikey = import.meta.env.VITE_API_KEY;
    
//           try {
//             const response = await fetch(`${rooturi}/admin/dfd`, {
//               method: 'POST',
//               headers: {
//                 'Content-Type': 'application/json',
//                 'apiauthkey': apikey,
//               },
//               body: JSON.stringify({ uid }), // Pass uid in request body
//             });
    
//             if (response.ok) {
//               toast.success("Diputefrom deleted successfully");
//               // Remove deleted hub from state
//               setUserData((prevHubs) => prevHubs.filter(hub => hub.uid !== uid));
//             } else {
//               toast.error("Failed to delete");
//             }
//           } catch (error) {
//             console.error("Error deleting Disputeform:", error);
//             toast.error("An error occurred while deleting the Disputeform");
//           }
//         } else {
//           toast.info("Delete operation canceled");
//         }
//       };
//       const [ipAddress, setIpAddress] = useState('');
//       //ip tracking facility
//       useEffect(() => {
//         // Fetch the IP address from the API
//         const fetchIpAddress = async () => {
//           const rooturi = import.meta.env.VITE_ROOT_URI;
//           const apikey = import.meta.env.VITE_API_KEY;
//             try {
//                 const response = await fetch("https://api.ipify.org?format=json");
//                 const data = await response.json();
//                 console.log(data)
//                 // Set the IP address in state
//                 if(data){
//                   setIpAddress(data.ip);
//                   const currentDateTime = new Date().toISOString();
//                   const pathfinder = "disputeformlist.jsx"
//                   const resp = await fetch(`${rooturi}/admin/getip`,{
//                       method: 'POST',
//                   headers: {
//                       'Content-Type': 'application/json',
//                       'apiauthkey': apikey,
//                   },
//                   body: JSON.stringify({ip:data.ip,datetime:currentDateTime,path:pathfinder})
//                   })
//                 }
            
    
//             } catch (error) {
//                 console.error("Error fetching IP address:", error);
//             }
//         };
    
//         fetchIpAddress();
//     }, []); // Empty dependency array means this runs once after the initial render
    
//     const backtohome = (event) => {
//       event.preventDefault(); // Prevent default action
//       navigate("/"); // Navigate to home
//     }
//   return (
// <div className="rounded-lg border border-gray-200 p-4 sm:p-6 md:p-8">
//       <div className="overflow-x-auto">
//         <table className="min-w-full divide-y-2 divide-gray-200 bg-white text-sm">
//           <thead className="ltr:text-left rtl:text-right">
//             <tr>
//               {[
//                 'id', 'uid', 'userid', 'customername', 'relatedtoev', 
//                 'reason', 'morethanonecharge', 'wrongcharged', 'didnotreceiverefund', 'paidforothermeans','disputtransaction','chargedregularly','notlistedabove',
//                 'transactiondetails',
//                 'disputedetails',
//                 'associatedadminid',
//                 'Delete'
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
//                         onClick={() => handleUidClick(user.id)}
//                       >
//                         {user.uid}
//                       </button>,
//                       user.userid,
//                       user.customername,
//                       user.relatedtoev,
//                       user.reason,
//                       user.morethanonecharge,
//                       user.wrongcharged,
//                       user.didnotreceiverefund,
//                       user.paidforothermeans,
//                       user.disputtransaction,
//                       user.chargedregularly,
//                       user.notlistedabove,
//                       user.transactiondetails,
//                       user.disputedetails,
//                       user.associatedadminid,
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
//   )
// }

// export default DisputeformList
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const DisputeformList = () => {
  const navigate = useNavigate();
  const [userData, setUserData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);

  useEffect(() => {
    const checkAuthentication = async () => {
      const rooturi = import.meta.env.VITE_ROOT_URI;
      const apikey = import.meta.env.VITE_API_KEY;
      try {
        const token = localStorage.getItem("token");
        if (!token) { navigate("/signin"); return; }

        const response = await fetch(`${rooturi}/userauth/verifyuser`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json', 'apiauthkey': apikey },
          body: JSON.stringify({ token })
        });
        const data = await response.json();
        if (!response.ok || data.user.userType !== "superadmin") {
          toast.error("You are not authorized!");
          navigate("/signin");
        }
      } catch (error) { console.error(error); toast.error("Auth failed"); navigate("/signin"); }
    };
    checkAuthentication();
  }, [navigate]);

  useEffect(() => {
    const fetchAllHubData = async () => {
      const rooturi = import.meta.env.VITE_ROOT_URI;
      const apikey = import.meta.env.VITE_API_KEY;
      try {
        const response = await fetch(`${rooturi}/admin/alldfs`, {
          method: "GET",
          headers: { 'Content-Type': 'application/json', 'apiauthkey': apikey },
        });
        const result = await response.json();
        const data = Array.isArray(result.data) ? result.data : [];
        setUserData(data);
        setLoading(false);
      } catch (error) { console.error(error); toast.error("Failed to fetch data"); setLoading(false); }
    };
    fetchAllHubData();
  }, []);

  const indexOfLastUser = currentPage * itemsPerPage;
  const indexOfFirstUser = indexOfLastUser - itemsPerPage;
  const currentUsers = userData.slice(indexOfFirstUser, indexOfLastUser);
  const totalPages = Math.ceil(userData.length / itemsPerPage);

  const handleUidClick = (id) => { navigate(`/disputeformdetails/${id}`); };

  const handleDelete = async (uid) => {
    if (!window.confirm("Are you sure you want to delete this record?")) {
      toast.info("Delete canceled"); return;
    }
    const rooturi = import.meta.env.VITE_ROOT_URI;
    const apikey = import.meta.env.VITE_API_KEY;
    try {
      const response = await fetch(`${rooturi}/admin/dfd`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'apiauthkey': apikey },
        body: JSON.stringify({ uid }),
      });
      if (response.ok) {
        toast.success("Dispute form deleted successfully");
        setUserData(prev => prev.filter(user => user.uid !== uid));
      } else { toast.error("Failed to delete"); }
    } catch (error) { console.error(error); toast.error("Error deleting record"); }
  };

  const backtohome = (event) => { event.preventDefault(); navigate("/"); };

  return (
    <section className="min-h-screen bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 p-6">
      <div className="max-w-full mx-auto bg-gray-900/80 backdrop-blur-md rounded-3xl shadow-2xl p-6 md:p-10 overflow-x-auto">
        <h1 className="text-3xl font-extrabold text-white mb-6 text-center">
          Dispute Form List
        </h1>

        <table className="min-w-full divide-y-2 divide-gray-700 text-sm">
          <thead className="bg-gray-800 text-gray-200 uppercase text-xs tracking-wider">
            <tr>
              {[
                'id', 'uid', 'userid', 'customername', 'relatedtoev',
                'reason', 'morethanonecharge', 'wrongcharged', 'didnotreceiverefund', 
                'paidforothermeans','disputtransaction','chargedregularly','notlistedabove',
                'transactiondetails','disputedetails','associatedadminid','Delete'
              ].map((heading) => (
                <th key={heading} className="px-4 py-3 text-left">
                  {heading}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-700">
            {loading ? (
              <tr>
                <td colSpan="20" className="text-center py-4 text-gray-300">Loading...</td>
              </tr>
            ) : currentUsers.length > 0 ? (
              currentUsers.map((user) => (
                <tr key={user.id} className="hover:bg-gray-800 transition-colors">
                  {[user.id,
                    <button className="text-blue-400 hover:underline" onClick={() => handleUidClick(user.id)}>{user.uid}</button>,
                    user.userid,
                    user.customername,
                    user.relatedtoev,
                    user.reason,
                    user.morethanonecharge,
                    user.wrongcharged,
                    user.didnotreceiverefund,
                    user.paidforothermeans,
                    user.disputtransaction,
                    user.chargedregularly,
                    user.notlistedabove,
                    user.transactiondetails,
                    user.disputedetails,
                    user.associatedadminid,
                    <button className="text-red-500 font-bold hover:underline" onClick={() => handleDelete(user.uid)}>Delete</button>
                  ].map((cell, idx) => (
                    <td key={idx} className="px-4 py-3 text-gray-200">{cell}</td>
                  ))}
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="20" className="text-center py-4 text-gray-400">No data available</td>
              </tr>
            )}
          </tbody>
        </table>

        {/* Pagination */}
        <div className="flex justify-center mt-6 gap-2">
          <button
            onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
            className="px-3 py-1 bg-gray-700 text-gray-200 rounded-md hover:bg-gray-600 transition"
          >
            Prev
          </button>

          {Array.from({ length: totalPages }, (_, i) => (
            <button
              key={i}
              onClick={() => setCurrentPage(i + 1)}
              className={`px-3 py-1 rounded-md text-sm font-bold ${
                currentPage === i + 1 ? 'bg-blue-600 text-white' : 'bg-gray-700 text-gray-200 hover:bg-gray-600'
              }`}
            >
              {i + 1}
            </button>
          ))}

          <button
            onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
            disabled={currentPage === totalPages}
            className="px-3 py-1 bg-gray-700 text-gray-200 rounded-md hover:bg-gray-600 transition"
          >
            Next
          </button>
        </div>

        {/* Home Button */}
        <div className="flex justify-center mt-8">
          <button
            className="relative inline-block text-white font-bold py-3 px-6 rounded-full overflow-hidden group transition-transform duration-300 transform hover:scale-105 bg-gradient-to-r from-green-400 via-green-500 to-green-600 shadow-lg"
            onClick={backtohome}
          >
            <span className="relative z-10">HOME</span>
          </button>
        </div>
      </div>
    </section>
  );
};

export default DisputeformList;
