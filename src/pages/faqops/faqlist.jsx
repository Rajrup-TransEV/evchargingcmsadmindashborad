// import React, { useState, useEffect } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { toast } from 'react-toastify';
// const Faqlist = () => {
//     const navigate = useNavigate();
//     const [chargerData, setChargerData] = useState([]);
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
//         const fetchAllChargerData = async () => {
//           const rooturi = import.meta.env.VITE_ROOT_URI;
//           const apikey = import.meta.env.VITE_API_KEY;
      
//           try {
//             const response = await fetch(`${rooturi}/users/faqlist`, {
//               method: "GET",
//               headers: {
//                 'Content-Type': 'application/json',
//                 'apiauthkey': apikey,
//               },
//             });
      
//             const result = await response.json();
//             const data = Array.isArray(result.data) ? result.data : [];
//             console.log("list of incoming data",data)
//             setChargerData(data);
//             setLoading(false);
//           } catch (error) {
//             console.error("Error fetching faq data:", error);
//             toast("Failed to fetch charger data");
//             setChargerData([]);
//             setLoading(false);
//           }
//         };
      
//         fetchAllChargerData();
//       }, []);
    
//       // Calculate the current chargers to display
//       const indexOfLastCharger = currentPage * itemsPerPage;
//       const indexOfFirstCharger = indexOfLastCharger - itemsPerPage;
//       const currentChargers = chargerData.slice(indexOfFirstCharger, indexOfLastCharger);
    
//       // Calculate total pages
//       const totalPages = Math.ceil(chargerData.length / itemsPerPage);
    
//       //charger details
//       const handleUidClick = (uid) => {
//         navigate(`/faqdetails/${uid}`);
//       };
//          // Delete function
//          const handleDelete = async (uid) => {
//             // Display confirmation dialog
//             const userConfirmed = window.confirm("Are you sure you want to delete this charger?");
            
//             if (userConfirmed) {
//               const rooturi = import.meta.env.VITE_ROOT_URI;
//               const apikey = import.meta.env.VITE_API_KEY;
        
//               try {
//                 const response = await fetch(`${rooturi}/users/faqdelete`, {
//                   method: 'POST',
//                   headers: {
//                     'Content-Type': 'application/json',
//                     'apiauthkey': apikey,
//                   },
//                   body: JSON.stringify({ uid }), // Pass uid in request body
//                 });
        
//                 if (response.ok) {
//                   toast.success("Charger deleted successfully");
//                   // Remove deleted charger from state
//                   setChargerData((prevChargers) => prevChargers.filter(charger => charger.uid !== uid));
//                 } else {
//                   toast.error("Failed to delete charger");
//                 }
//               } catch (error) {
//                 console.error("Error deleting charger:", error);
//                 toast.error("An error occurred while deleting the charger");
//               }
//             } else {
//               toast.info("Delete operation canceled");
//             }
//           };
      
//           const [ipAddress, setIpAddress] = useState('');
//           //ip tracking facility
//           useEffect(() => {
//             // Fetch the IP address from the API
//             const fetchIpAddress = async () => {
//               const rooturi = import.meta.env.VITE_ROOT_URI;
//               const apikey = import.meta.env.VITE_API_KEY;
//                 try {
//                     const response = await fetch("https://api.ipify.org?format=json");
//                     const data = await response.json();
//                     console.log(data)
//                     // Set the IP address in state
//                     if(data){
//                       setIpAddress(data.ip);
//                       const currentDateTime = new Date().toISOString();
//                       const pathfinder = "feedbackformlist.jsx"
//                       const resp = await fetch(`${rooturi}/admin/getip`,{
//                           method: 'POST',
//                       headers: {
//                           'Content-Type': 'application/json',
//                           'apiauthkey': apikey,
//                       },
//                       body: JSON.stringify({ip:data.ip,datetime:currentDateTime,path:pathfinder})
//                       })
//                     }
                
      
//                 } catch (error) {
//                     console.error("Error fetching IP address:", error);
//                 }
//             };
        
//             fetchIpAddress();
//         }, []); // Empty dependency array means this runs once after the initial render
        
      
//         const backtohome = (event) => {
//           event.preventDefault(); // Prevent default action
//           navigate("/"); // Navigate to home
//         }
    
//       const handelUpdate=(uid)=>{
//         navigate(`/faqupdate/${uid}`)
//       }
    
//   return (
//     <div className="rounded-lg border border-gray-200 p-4 sm:p-6 md:p-8">
//     <div className="overflow-x-auto">
//       <table className="min-w-full divide-y-2 divide-gray-200 bg-white text-sm">
//         <thead className="ltr:text-left rtl:text-right">
//           <tr>
//             {[
//               'id', 'uid', 'faqquestion', 
//               'faqdescription','update','Delete'  // Added Manipulate header
//             ].map((heading) => (
//               <th key={heading} className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
//                 {heading}
//               </th>
//             ))}
//           </tr>
//         </thead>
//         <tbody className="divide-y divide-gray-200">
//           {loading ? (
//             <tr>
//               <td colSpan="21" className="whitespace-nowrap px-4 py-2 text-center text-gray-700">
//                 Loading...
//               </td>
//             </tr>
//           ) : (
//             currentChargers.length > 0 ? (
//               currentChargers.map((charger) => (
//                 <tr key={charger.id}>
//                   {[
//                     charger.id,  
//                     <button 
//                       className="text-blue-600 hover:underline" 
//                       onClick={() => handleUidClick(charger.uid)}
//                     >
//                       {charger.uid}
//                     </button>, charger.faqquestion, charger.faqdescription,
//                     charger.ratingnumber, charger.feedbackmessage,
//                     <button
//                     className="text-green-600 hover:underline"
//                     onClick={() => handelUpdate(charger.uid)}
//                   >
//                     Update
//                   </button>,
//                     <button
//                     className="text-red-600 hover:underline"
//                     onClick={() => handleDelete(charger.uid)}
//                   >
//                     Delete
//                   </button> // Added Delete button here
//                   ].map((cell, index) => (
//                     <td key={index} className="whitespace-nowrap px-4 py-2 text-gray-700">
//                       {cell}
//                     </td>
//                   ))}
//                 </tr>
//               ))
//             ) : (
//               <tr>
//                 <td colSpan="21" className="whitespace-nowrap px-4 py-2 text-center text-gray-700">
//                   No data available
//                 </td>
//               </tr>
//             )
//           )}
//         </tbody>
//       </table>
//     </div>

//     <div className="rounded-b-lg border-t border-gray-200 px-4 py-2 sm:px-6 md:px-8">
//       <ol className="flex justify-end gap-1 text-xs font-medium">
//         <li>
//           <button
//             onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
//             disabled={currentPage === 1}
//             className="inline-flex items-center justify-center rounded border border-gray-100 bg-white text-gray-900 rtl:rotate-180"
//           >
//             <span className="sr-only">Prev Page</span>
//             <svg
//               xmlns="http://www.w3.org/2000/svg"
//               className="w-3 h-3"
//               viewBox="0 0 20 20"
//               fill="currentColor"
//             >
//               <path
//                 fillRule="evenodd"
//                 d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
//                 clipRule="evenodd"
//               />
//             </svg>
//           </button>
//         </li>

//         {Array.from({ length: totalPages }, (_, index) => (
//           <li key={index}>
//             <button
//               onClick={() => setCurrentPage(index + 1)}
//               className={`block w-8 rounded text-center leading-8 ${currentPage === index + 1 ? 'bg-blue-600 text-white' : 'border border-gray-100 bg-white text-gray-900'}`}
//             >
//               {index + 1}
//             </button>
//           </li>
//         ))}

//         <li>
//           <button
//             onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
//             disabled={currentPage === totalPages}
//             className="inline-flex items-center justify-center rounded border border-gray-100 bg-white text-gray-900 rtl:rotate-180"
//           >
//             <span className="sr-only">Next Page</span>
//             <svg
//               xmlns="http://www.w3.org/2000/svg"
//               className="w-3 h-3"
//               viewBox="0 0 20 20"
//               fill="currentColor"
//             >
//               <path
//                 fillRule="evenodd"
//                 d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
//                 clipRule="evenodd"
//               />
//             </svg>
//           </button>
//         </li>
//       </ol>
//     </div>
//     <div className="py-11">
//               <button 
//       className="relative inline-block text-white font-bold py-2 px-4 rounded-full overflow-hidden group transition-transform duration-300 transform hover:scale-105"
//       onClick={(event) => backtohome(event)}
//   >
//       <span className="absolute inset-0 bg-gradient-to-r from-teal-400 via-teal-500 to-teal-600 transform scale-110 group-hover:scale-100 transition duration-300"></span>
//       <span className="relative z-10">HOME</span>
//   </button>
// </div>
//   </div>
//   )
// }

// export default Faqlist

import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const FaqList = () => {
  const navigate = useNavigate();
  const [faqData, setFaqData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);

  useEffect(() => {
    const checkAuth = async () => {
      const rooturi = import.meta.env.VITE_ROOT_URI;
      const apikey = import.meta.env.VITE_API_KEY;
      try {
        const token = localStorage.getItem("token");
        if (!token) return navigate("/signin");

        const res = await fetch(`${rooturi}/userauth/verifyuser`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json', 'apiauthkey': apikey },
          body: JSON.stringify({ token })
        });

        const data = await res.json();
        if (!res.ok || data.user.userType !== "superadmin") {
          toast("Unauthorized access");
          navigate("/signin");
        }
      } catch (error) {
        console.error(error);
        toast("Authentication error");
        navigate("/signin");
      }
    };
    checkAuth();
  }, [navigate]);

  useEffect(() => {
    const fetchFaqData = async () => {
      const rooturi = import.meta.env.VITE_ROOT_URI;
      const apikey = import.meta.env.VITE_API_KEY;
      try {
        const res = await fetch(`${rooturi}/users/faqlist`, {
          method: 'GET',
          headers: { 'Content-Type': 'application/json', 'apiauthkey': apikey },
        });
        const result = await res.json();
        setFaqData(Array.isArray(result.data) ? result.data : []);
        setLoading(false);
      } catch (error) {
        console.error(error);
        toast("Failed to fetch FAQ data");
        setFaqData([]);
        setLoading(false);
      }
    };
    fetchFaqData();
  }, []);

  const indexOfLast = currentPage * itemsPerPage;
  const indexOfFirst = indexOfLast - itemsPerPage;
  const currentFaqs = faqData.slice(indexOfFirst, indexOfLast);
  const totalPages = Math.ceil(faqData.length / itemsPerPage);

  const handleView = (uid) => navigate(`/faqdetails/${uid}`);
  const handleUpdate = (uid) => navigate(`/faqupdate/${uid}`);

  const handleDelete = async (uid) => {
    if (!window.confirm("Are you sure you want to delete this FAQ?")) {
      toast.info("Delete canceled");
      return;
    }
    const rooturi = import.meta.env.VITE_ROOT_URI;
    const apikey = import.meta.env.VITE_API_KEY;
    try {
      const res = await fetch(`${rooturi}/users/faqdelete`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'apiauthkey': apikey },
        body: JSON.stringify({ uid }),
      });
      if (res.ok) {
        toast.success("FAQ deleted successfully");
        setFaqData(faqData.filter(faq => faq.uid !== uid));
      } else toast.error("Failed to delete FAQ");
    } catch (error) {
      console.error(error);
      toast.error("Error deleting FAQ");
    }
  };

  const backToHome = (e) => { e.preventDefault(); navigate("/"); };

  return (
    <section className="min-h-screen bg-gradient-to-br from-[#020617] via-[#0b1220] to-[#020617] p-6">
      <div className="max-w-7xl mx-auto">

        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-extrabold text-white mb-2">FAQ <span className="text-teal-400">List</span></h1>
          <p className="text-gray-400 text-sm">Manage all FAQs for your platform users</p>
        </div>

        {/* Table Container */}
        <div className="overflow-x-auto rounded-3xl bg-[#020617]/60 backdrop-blur-xl border border-gray-700 shadow-[0_20px_60px_rgba(0,0,0,0.7)]">
          <table className="min-w-full text-sm text-gray-300">
            <thead className="bg-[#020617]/80 border-b border-gray-700">
              <tr>
                {['ID', 'UID', 'Question', 'Description', 'Update', 'Delete'].map(head => (
                  <th key={head} className="px-6 py-3 text-left font-semibold">{head}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr>
                  <td colSpan="6" className="py-8 text-center text-gray-500">Loading...</td>
                </tr>
              ) : currentFaqs.length > 0 ? (
                currentFaqs.map((faq, idx) => (
                  <tr key={faq.uid} className={`transition hover:bg-[#111827] ${idx % 2 === 0 ? 'bg-[#020617]/40' : 'bg-[#020617]/20'}`}>
                    <td className="px-6 py-4">{faq.id}</td>
                    <td className="px-6 py-4">
                      <button onClick={() => handleView(faq.uid)} className="text-teal-400 hover:underline">{faq.uid}</button>
                    </td>
                    <td className="px-6 py-4 font-medium">{faq.faqquestion}</td>
                    <td className="px-6 py-4">{faq.faqdescription}</td>
                    <td className="px-6 py-4">
                      <button
                        onClick={() => handleUpdate(faq.uid)}
                        className="bg-teal-500 text-white px-4 py-1 rounded-full hover:bg-teal-400 transition"
                      >
                        Update
                      </button>
                    </td>
                    <td className="px-6 py-4">
                      <button
                        onClick={() => handleDelete(faq.uid)}
                        className="bg-red-600 text-white px-4 py-1 rounded-full hover:bg-red-500 transition"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="6" className="py-8 text-center text-gray-500">No FAQs available</td>
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
                  className={`px-3 py-1 rounded-md transition ${currentPage === i + 1 ? 'bg-teal-500 text-white' : 'bg-gray-700 hover:bg-gray-600'}`}
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

        {/* Home Button */}
        <div className="flex justify-center mt-10">
          <button
            onClick={backToHome}
            className="relative inline-block text-white font-bold py-3 px-10 rounded-full overflow-hidden group transition-transform duration-300 transform hover:scale-105"
          >
            <span className="absolute inset-0 bg-gradient-to-r from-teal-400 via-cyan-500 to-blue-600 transform scale-110 group-hover:scale-100 transition duration-300"></span>
            <span className="relative z-10">HOME</span>
          </button>
        </div>

      </div>
    </section>
  );
};

export default FaqList;
