// //feedbackformlist
// import React, { useState, useEffect } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { toast } from 'react-toastify';

// const Feedbackfromlist = () => {
//     const navigate = useNavigate();
//     const [chargerData, setChargerData] = useState([]); // Initial state is an empty array
//     const [loading, setLoading] = useState(true); // State to handle loading status
//     const [currentPage, setCurrentPage] = useState(1); // Current page state
//     const [itemsPerPage] = useState(10); // Number of items to display per page

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
    
      
//   useEffect(() => {
//     const fetchAllChargerData = async () => {
//       const rooturi = import.meta.env.VITE_ROOT_URI;
//       const apikey = import.meta.env.VITE_API_KEY;
  
//       try {
//         const response = await fetch(`${rooturi}/users/liofdbck`, {
//           method: "GET",
//           headers: {
//             'Content-Type': 'application/json',
//             'apiauthkey': apikey,
//           },
//         });
  
//         const result = await response.json();
//         const data = Array.isArray(result.data) ? result.data : [];
//         console.log("list of incoming data",data)
//         setChargerData(data);
//         setLoading(false);
//       } catch (error) {
//         console.error("Error fetching charger data:", error);
//         toast("Failed to fetch charger data");
//         setChargerData([]);
//         setLoading(false);
//       }
//     };
  
//     fetchAllChargerData();
//   }, []);

//   // Calculate the current chargers to display
//   const indexOfLastCharger = currentPage * itemsPerPage;
//   const indexOfFirstCharger = indexOfLastCharger - itemsPerPage;
//   const currentChargers = chargerData.slice(indexOfFirstCharger, indexOfLastCharger);

//   // Calculate total pages
//   const totalPages = Math.ceil(chargerData.length / itemsPerPage);

//   //charger details
//   const handleUidClick = (uid) => {
//     navigate(`/feedbackdetails/${uid}`);
//   };
//      // Delete function
//      const handleDelete = async (uid) => {
//         // Display confirmation dialog
//         const userConfirmed = window.confirm("Are you sure you want to delete this charger?");
        
//         if (userConfirmed) {
//           const rooturi = import.meta.env.VITE_ROOT_URI;
//           const apikey = import.meta.env.VITE_API_KEY;
    
//           try {
//             const response = await fetch(`${rooturi}/users/fedbkdel`, {
//               method: 'POST',
//               headers: {
//                 'Content-Type': 'application/json',
//                 'apiauthkey': apikey,
//               },
//               body: JSON.stringify({ uid }), // Pass uid in request body
//             });
    
//             if (response.ok) {
//               toast.success("Charger deleted successfully");
//               // Remove deleted charger from state
//               setChargerData((prevChargers) => prevChargers.filter(charger => charger.uid !== uid));
//             } else {
//               toast.error("Failed to delete charger");
//             }
//           } catch (error) {
//             console.error("Error deleting charger:", error);
//             toast.error("An error occurred while deleting the charger");
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
//                   const pathfinder = "feedbackformlist.jsx"
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
//     <div className="rounded-lg border border-gray-200 p-4 sm:p-6 md:p-8">
//     <div className="overflow-x-auto">
//       <table className="min-w-full divide-y-2 divide-gray-200 bg-white text-sm">
//         <thead className="ltr:text-left rtl:text-right">
//           <tr>
//             {[
//               'id', 'uid', 'username', 'email', 'ratingnumber', 
//               'feedbackmessage','feedbacktype', 'associatedadminid', 'isserveytook', 'Delete'  // Added Manipulate header
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
//                     </button>, charger.username, charger.email,
//                     charger.ratingnumber, charger.feedbackmessage, charger.feedbacktype, charger.associatedadminid,
//                     charger.isserveytook ? "Survey already took" : "didnot participated in survey", // This is the change,charger.createdAt,charger.updatedAt,
//  // Added Delete button here
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

// export default Feedbackfromlist
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const FeedbackFormList = () => {
    const navigate = useNavigate();
    const [feedbackData, setFeedbackData] = useState([]);
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
                if (response.ok && data.user.userType !== "superadmin") {
                    toast("You have no authorization to view this page");
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

    useEffect(() => {
        const fetchFeedbackData = async () => {
            const rooturi = import.meta.env.VITE_ROOT_URI;
            const apikey = import.meta.env.VITE_API_KEY;
            try {
                const response = await fetch(`${rooturi}/users/liofdbck`, {
                    method: "GET",
                    headers: { 'Content-Type': 'application/json', 'apiauthkey': apikey }
                });
                const result = await response.json();
                setFeedbackData(Array.isArray(result.data) ? result.data : []);
                setLoading(false);
            } catch (error) {
                console.error(error);
                toast("Failed to fetch feedback data");
                setFeedbackData([]);
                setLoading(false);
            }
        };
        fetchFeedbackData();
    }, []);

    const indexOfLast = currentPage * itemsPerPage;
    const indexOfFirst = indexOfLast - itemsPerPage;
    const currentItems = feedbackData.slice(indexOfFirst, indexOfLast);
    const totalPages = Math.ceil(feedbackData.length / itemsPerPage);

    const handleUidClick = (uid) => navigate(`/feedbackdetails/${uid}`);
    const handleDelete = async (uid) => {
        if (!window.confirm("Are you sure you want to delete this feedback?")) return toast.info("Delete canceled");

        const rooturi = import.meta.env.VITE_ROOT_URI;
        const apikey = import.meta.env.VITE_API_KEY;
        try {
            const response = await fetch(`${rooturi}/users/fedbkdel`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json', 'apiauthkey': apikey },
                body: JSON.stringify({ uid })
            });
            if (response.ok) {
                toast.success("Feedback deleted successfully");
                setFeedbackData(prev => prev.filter(f => f.uid !== uid));
            } else toast.error("Failed to delete feedback");
        } catch (error) {
            console.error(error);
            toast.error("Error deleting feedback");
        }
    };

    const backToHome = (e) => { e.preventDefault(); navigate("/"); };

    return (
        <div className="min-h-screen bg-gray-100 p-8">
            <h1 className="text-4xl font-extrabold text-gray-800 mb-6 text-center">Feedback Form List</h1>

            <div className="overflow-x-auto bg-white shadow-lg rounded-xl border border-gray-200">
                <table className="min-w-full divide-y divide-gray-200 text-sm">
                    <thead className="bg-gray-50">
                        <tr>
                            {['ID', 'UID', 'Username', 'Email', 'Rating', 'Message', 'Type', 'Admin UID', 'Survey Status', 'Actions'].map((heading) => (
                                <th key={heading} className="px-5 py-3 text-left font-bold text-gray-900 uppercase tracking-wider">
                                    {heading}
                                </th>
                            ))}
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                        {loading ? (
                            <tr>
                                <td colSpan="10" className="py-6 text-center text-gray-500 font-semibold">Loading...</td>
                            </tr>
                        ) : currentItems.length > 0 ? (
                            currentItems.map((item) => (
                                <tr key={item.id} className="hover:bg-gray-50 transition duration-200">
                                    <td className="px-5 py-3 font-medium text-gray-700">{item.id}</td>
                                    <td className="px-5 py-3 font-semibold text-blue-600 cursor-pointer hover:underline" onClick={() => handleUidClick(item.uid)}>{item.uid}</td>
                                    <td className="px-5 py-3 text-gray-700">{item.username}</td>
                                    <td className="px-5 py-3 text-gray-700">{item.email}</td>
                                    <td className="px-5 py-3 text-gray-700">{item.ratingnumber}</td>
                                    <td className="px-5 py-3 text-gray-700">{item.feedbackmessage}</td>
                                    <td className="px-5 py-3 text-gray-700">{item.feedbacktype}</td>
                                    <td className="px-5 py-3 text-gray-700">{item.associatedadminid}</td>
                                    <td className="px-5 py-3">
                                        {item.isserveytook ? 
                                            <span className="px-2 py-1 text-xs font-semibold text-white bg-green-500 rounded-full">Participated</span> :
                                            <span className="px-2 py-1 text-xs font-semibold text-white bg-red-500 rounded-full">Not Participated</span>
                                        }
                                    </td>
                                    <td className="px-5 py-3">
                                        <button className="text-red-600 font-bold hover:underline" onClick={() => handleDelete(item.uid)}>Delete</button>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="10" className="py-6 text-center text-gray-500 font-semibold">No data available</td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>

            {/* Pagination */}
            <div className="mt-6 flex justify-center items-center gap-2">
                <button
                    onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                    disabled={currentPage === 1}
                    className="px-4 py-2 bg-blue-600 text-white font-bold rounded-md disabled:bg-gray-300 transition duration-300"
                >
                    Prev
                </button>
                {Array.from({ length: totalPages }, (_, i) => (
                    <button
                        key={i}
                        onClick={() => setCurrentPage(i + 1)}
                        className={`w-9 h-9 rounded-full text-center font-semibold transition duration-300 ${currentPage === i + 1 ? 'bg-blue-600 text-white shadow-lg' : 'border border-gray-300 bg-white text-gray-900 hover:bg-gray-200'}`}
                    >
                        {i + 1}
                    </button>
                ))}
                <button
                    onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                    disabled={currentPage === totalPages}
                    className="px-4 py-2 bg-blue-600 text-white font-bold rounded-md disabled:bg-gray-300 transition duration-300"
                >
                    Next
                </button>
            </div>

            {/* Home Button */}
            <div className="mt-8 flex justify-center">
                <button
                    className="relative inline-block text-white font-bold py-3 px-6 rounded-full overflow-hidden group transition-transform duration-300 transform hover:scale-105"
                    onClick={backToHome}
                >
                    <span className="absolute inset-0 bg-gradient-to-r from-teal-400 via-teal-500 to-teal-600 transform scale-110 group-hover:scale-100 transition duration-300"></span>
                    <span className="relative z-10">HOME</span>
                </button>
            </div>
        </div>
    );
};

export default FeedbackFormList;
