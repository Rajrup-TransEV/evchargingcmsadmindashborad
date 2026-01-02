// import React, { useState, useEffect } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { toast } from 'react-toastify';

// const ChargerOperationsView = () => {
//   const navigate = useNavigate();
//   const [chargerData, setChargerData] = useState([]); // Initial state is an empty array
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
//         const response = await fetch(`${rooturi}/admin/listofcharges`, {
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

//   // Handle "Manipulate" click (go to settings page for charger)
//   const handleManipulateClick = (uid) => {
//     navigate(`/settings/${uid}`);
//   };

//   //charger details
//   const handleUidClick = (uid) => {
//     navigate(`/chargerdetails/${uid}`);
//   };
  
//   const handleUpdate=(uid)=>{
//     navigate(`/updatechargerdetails/${uid}`)
//   }

//     // Delete function
//     const handleDelete = async (uid) => {
//       // Display confirmation dialog
//       const userConfirmed = window.confirm("Are you sure you want to delete this charger?");
      
//       if (userConfirmed) {
//         const rooturi = import.meta.env.VITE_ROOT_URI;
//         const apikey = import.meta.env.VITE_API_KEY;
  
//         try {
//           const response = await fetch(`${rooturi}/admin/deletechargerunits`, {
//             method: 'POST',
//             headers: {
//               'Content-Type': 'application/json',
//               'apiauthkey': apikey,
//             },
//             body: JSON.stringify({ uid }), // Pass uid in request body
//           });
  
//           if (response.ok) {
//             toast.success("Charger deleted successfully");
//             // Remove deleted charger from state
//             setChargerData((prevChargers) => prevChargers.filter(charger => charger.uid !== uid));
//           } else {
//             toast.error("Failed to delete charger");
//           }
//         } catch (error) {
//           console.error("Error deleting charger:", error);
//           toast.error("An error occurred while deleting the charger");
//         }
//       } else {
//         toast.info("Delete operation canceled");
//       }
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
//                 const pathfinder = "chargerops.jsx"
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

//   return (
//     <div className="rounded-lg border border-gray-200 p-4 sm:p-6 md:p-8">
//       <div className="overflow-x-auto">
//         <table className="min-w-full divide-y-2 divide-gray-200 bg-white text-sm">
//           <thead className="ltr:text-left rtl:text-right">
//             <tr>
//               {[
//                 'id', 'uid', 'chargeridentity', 'Chargerserialnum', 'ChargerName', 
//                 'Chargerhost', 'Segment', 'Subsegment', 'Total_Capacity', 'Chargertype', 
//                 'parking', 'number_of_connectors', 'Connector_type', 'connector_total_capacity', 
//                 'lattitude', 'longitute', 'full_address', 'charger_use_type', 
//                 'twenty_four_seven_open_status', 'charger_image', 'chargerbuyer', 'Created at', 'Manipulate', 'Delete'  // Added Manipulate header
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
//                 <td colSpan="21" className="whitespace-nowrap px-4 py-2 text-center text-gray-700">
//                   Loading...
//                 </td>
//               </tr>
//             ) : (
//               currentChargers.length > 0 ? (
//                 currentChargers.map((charger) => (
//                   <tr key={charger.id}>
//                     {[
//                       charger.id,  
//                       <button 
//                         className="text-blue-600 hover:underline" 
//                         onClick={() => handleUidClick(charger.uid)}
//                       >
//                         {charger.uid}
//                       </button>, charger.chargeridentity, charger.Chargerserialnum,
//                       charger.ChargerName, charger.Chargerhost, charger.Segment, charger.Subsegment,
//                       charger.Total_Capacity, charger.Chargertype, charger.parking,
//                       charger.number_of_connectors, charger.Connector_type, charger.connector_total_capacity,
//                       charger.lattitude, charger.longitute, charger.full_address,
//                       charger.charger_use_type, charger.twenty_four_seven_open_status,
//                       <img src={charger.charger_image} alt="Charger" className="w-16 h-16 object-cover" />,
//                       charger.chargerbuyer, charger.created_at,
//                       <button 
//                         className="text-indigo-600 hover:underline"
//                         onClick={() => handleManipulateClick(charger.uid)}
//                       >
//                         Manipulate
//                       </button>, // Added Manipulate button here
//                                  <button
//                                  className="text-green-600 hover:underline"
//                                  onClick={() => handleUpdate(charger.uid)}
//                                >
//                                  Update
//                       </button>, // Added Delete button here
//                       <button
//                       className="text-red-600 hover:underline"
//                       onClick={() => handleDelete(charger.uid)}
//                     >
//                       Delete
//                     </button> // Added Delete button here
//                     ].map((cell, index) => (
//                       <td key={index} className="whitespace-nowrap px-4 py-2 text-gray-700">
//                         {cell}
//                       </td>
//                     ))}
//                   </tr>
//                 ))
//               ) : (
//                 <tr>
//                   <td colSpan="21" className="whitespace-nowrap px-4 py-2 text-center text-gray-700">
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
//                   d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
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

// export default ChargerOperationsView;
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { FiEdit, FiTrash2, FiSettings, FiHome, FiSearch } from 'react-icons/fi';

const ChargerOperationsView = () => {
  const navigate = useNavigate();
  const [chargerData, setChargerData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(8);
  const [searchQuery, setSearchQuery] = useState('');

  // Authentication
  useEffect(() => {
    const checkAuth = async () => {
      const rooturi = import.meta.env.VITE_ROOT_URI;
      const apikey = import.meta.env.VITE_API_KEY;
      try {
        const token = localStorage.getItem("token");
        if (!token) return navigate("/signin");
        const res = await fetch(`${rooturi}/userauth/verifyuser`, {
          method: "POST",
          headers: { 'Content-Type': 'application/json', 'apiauthkey': apikey },
          body: JSON.stringify({ token })
        });
        const data = await res.json();
        if (!res.ok || data.user.userType !== "superadmin") {
          toast("You have no authorization to view this page");
          navigate("/signin");
        }
      } catch (err) {
        console.error(err);
        toast("Error verifying user");
        navigate("/signin");
      }
    };
    checkAuth();
  }, [navigate]);

  // Fetch charger data
  useEffect(() => {
    const fetchChargers = async () => {
      const rooturi = import.meta.env.VITE_ROOT_URI;
      const apikey = import.meta.env.VITE_API_KEY;
      try {
        const res = await fetch(`${rooturi}/admin/listofcharges`, {
          method: "GET",
          headers: { 'Content-Type': 'application/json', 'apiauthkey': apikey }
        });
        const result = await res.json();
        setChargerData(Array.isArray(result.data) ? result.data : []);
        setLoading(false);
      } catch (err) {
        console.error(err);
        toast("Failed to fetch charger data");
        setLoading(false);
      }
    };
    fetchChargers();
  }, []);

  const filteredChargers = chargerData.filter(ch =>
    ch.ChargerName?.toLowerCase().includes(searchQuery.toLowerCase()) ||
    ch.uid?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const indexOfLastCharger = currentPage * itemsPerPage;
  const indexOfFirstCharger = indexOfLastCharger - itemsPerPage;
  const currentChargers = filteredChargers.slice(indexOfFirstCharger, indexOfLastCharger);
  const totalPages = Math.ceil(filteredChargers.length / itemsPerPage);

  const handleManipulateClick = uid => navigate(`/settings/${uid}`);
  const handleUidClick = uid => navigate(`/chargerdetails/${uid}`);
  const handleUpdate = uid => navigate(`/updatechargerdetails/${uid}`);
  const handleDelete = async uid => {
    if (!window.confirm("Are you sure you want to delete this charger?")) {
      toast.info("Delete canceled");
      return;
    }
    const rooturi = import.meta.env.VITE_ROOT_URI;
    const apikey = import.meta.env.VITE_API_KEY;
    try {
      const res = await fetch(`${rooturi}/admin/deletechargerunits`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'apiauthkey': apikey },
        body: JSON.stringify({ uid })
      });
      if (res.ok) {
        toast.success("Deleted successfully");
        setChargerData(prev => prev.filter(c => c.uid !== uid));
      } else toast.error("Failed to delete");
    } catch (err) {
      console.error(err);
      toast.error("Error deleting charger");
    }
  };

  const backToHome = () => navigate("/");

  return (
    <div className="p-4 sm:p-6 md:p-8 min-h-screen bg-gradient-to-b from-gray-100 to-gray-200">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row md:justify-between md:items-center mb-6 gap-3">
        <h1 className="text-3xl font-extrabold text-gray-800 tracking-wide">Charger Dashboard</h1>
        <div className="flex flex-wrap items-center gap-3">
          <div className="relative">
            <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"/>
            <input
              type="text"
              placeholder="Search UID or Name"
              className="pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-400 font-semibold"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <button
            onClick={backToHome}
            className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-teal-400 to-teal-600 text-white font-bold rounded-lg hover:scale-105 transition-transform"
          >
            <FiHome /> HOME
          </button>
        </div>
      </div>

      {/* Desktop Table */}
      <div className="hidden md:block overflow-x-auto bg-white rounded-xl shadow-lg">
        <table className="min-w-full divide-y divide-gray-200 text-sm">
          <thead className="bg-gray-100 sticky top-0 shadow-md">
            <tr>
              {['ID','UID','Name','Serial','Host','Segment','Subsegment','Type','Total Capacity','Parking','Connectors','Connector Type','Connector Capacity','Lat','Long','Address','Use Type','24/7','Image','Buyer','Created','Manipulate','Update','Delete'].map(h => (
                <th key={h} className="px-3 py-2 text-left font-bold text-gray-700">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr><td colSpan="24" className="text-center py-6 text-gray-400">Loading...</td></tr>
            ) : currentChargers.length === 0 ? (
              <tr><td colSpan="24" className="text-center py-6 text-gray-400">No chargers found</td></tr>
            ) : currentChargers.map(ch => (
              <tr key={ch.uid} className="hover:bg-gray-50 transition shadow-sm">
                <td className="px-3 py-2 font-semibold">{ch.id}</td>
                <td className="px-3 py-2 text-blue-600 cursor-pointer hover:underline" onClick={() => handleUidClick(ch.uid)}>{ch.uid}</td>
                <td className="px-3 py-2 font-semibold">{ch.ChargerName}</td>
                <td className="px-3 py-2">{ch.Chargerserialnum}</td>
                <td className="px-3 py-2">{ch.Chargerhost}</td>
                <td className="px-3 py-2"><span className="bg-green-100 text-green-800 px-2 py-1 rounded-full text-xs">{ch.Segment}</span></td>
                <td className="px-3 py-2">{ch.Subsegment}</td>
                <td className="px-3 py-2"><span className="bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-xs">{ch.Chargertype}</span></td>
                <td className="px-3 py-2 font-semibold">{ch.Total_Capacity}</td>
                <td className="px-3 py-2">{ch.parking}</td>
                <td className="px-3 py-2">{ch.number_of_connectors}</td>
                <td className="px-3 py-2">{ch.Connector_type}</td>
                <td className="px-3 py-2">{ch.connector_total_capacity}</td>
                <td className="px-3 py-2">{ch.lattitude}</td>
                <td className="px-3 py-2">{ch.longitute}</td>
                <td className="px-3 py-2">{ch.full_address}</td>
                <td className="px-3 py-2">{ch.charger_use_type}</td>
                <td className="px-3 py-2">
                  <span className={`px-2 py-1 rounded-full text-xs font-bold ${ch.twenty_four_seven_open_status==='Yes'?'bg-teal-100 text-teal-800':'bg-red-100 text-red-800'}`}>
                    {ch.twenty_four_seven_open_status}
                  </span>
                </td>
                <td className="px-3 py-2">{ch.charger_image ? <img src={ch.charger_image} alt="charger" className="w-12 h-12 object-cover rounded" />:'N/A'}</td>
                <td className="px-3 py-2">{ch.chargerbuyer}</td>
                <td className="px-3 py-2">{ch.created_at}</td>
                <td className="px-3 py-2 text-indigo-600 cursor-pointer hover:scale-110 transition" onClick={() => handleManipulateClick(ch.uid)}><FiSettings /></td>
                <td className="px-3 py-2 text-green-600 cursor-pointer hover:scale-110 transition" onClick={() => handleUpdate(ch.uid)}><FiEdit /></td>
                <td className="px-3 py-2 text-red-600 cursor-pointer hover:scale-110 transition" onClick={() => handleDelete(ch.uid)}><FiTrash2 /></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile Cards */}
      <div className="md:hidden space-y-4">
        {loading ? <p className="text-center text-gray-400">Loading...</p> :
          currentChargers.length === 0 ? <p className="text-center text-gray-400">No chargers found</p> :
          currentChargers.map(ch => (
            <div key={ch.uid} className="bg-white shadow-lg rounded-xl p-4 flex flex-col gap-1 border-l-4 border-teal-400 hover:shadow-2xl transition">
              
              {/* Header */}
              <div className="flex justify-between items-center mb-2">
                <p className="font-bold text-gray-700">{ch.ChargerName}</p>
                <p className="text-blue-600 cursor-pointer hover:underline" onClick={()=>handleUidClick(ch.uid)}>{ch.uid}</p>
              </div>

              {/* Badges */}
              <div className="flex flex-wrap gap-2 mb-2">
                <span className="bg-green-100 text-green-800 px-2 py-1 rounded-full text-xs">{ch.Segment}</span>
                <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-xs">{ch.Chargertype}</span>
                <span className={`px-2 py-1 rounded-full text-xs font-bold ${ch.twenty_four_seven_open_status==='Yes'?'bg-teal-100 text-teal-800':'bg-red-100 text-red-800'}`}>{ch.twenty_four_seven_open_status}</span>
              </div>

              {/* Info */}
              <p>Serial: {ch.Chargerserialnum}</p>
              <p>Host: {ch.Chargerhost}</p>
              <p>Subsegment: {ch.Subsegment}</p>
              <p>Total Capacity: {ch.Total_Capacity}</p>
              <p>Connectors: {ch.number_of_connectors} ({ch.Connector_type})</p>
              <p>Connector Capacity: {ch.connector_total_capacity}</p>
              <p>Location: Lat {ch.lattitude}, Long {ch.longitute}</p>
              <p>Address: {ch.full_address}</p>
              <p>Use Type: {ch.charger_use_type}</p>
              <p>Buyer: {ch.chargerbuyer}</p>
              <p>Created: {ch.created_at}</p>
              {ch.charger_image && <img src={ch.charger_image} alt="charger" className="w-full h-24 object-cover rounded my-2" />}

              {/* Action buttons */}
              <div className="flex gap-3 mt-2">
                <button onClick={()=>handleManipulateClick(ch.uid)} className="text-indigo-600 hover:scale-110 transition"><FiSettings /></button>
                <button onClick={()=>handleUpdate(ch.uid)} className="text-green-600 hover:scale-110 transition"><FiEdit /></button>
                <button onClick={()=>handleDelete(ch.uid)} className="text-red-600 hover:scale-110 transition"><FiTrash2 /></button>
              </div>
            </div>
          ))
        }
      </div>

      {/* Pagination */}
      <div className="mt-6 flex justify-center items-center gap-2 flex-wrap">
        <button onClick={()=>setCurrentPage(p=>Math.max(p-1,1))} disabled={currentPage===1} className="px-3 py-1 rounded bg-gray-200 hover:bg-gray-300 disabled:opacity-50">Prev</button>
        {Array.from({length: totalPages},(_,i)=>(
          <button key={i} onClick={()=>setCurrentPage(i+1)} className={`px-3 py-1 rounded ${currentPage===i+1?'bg-blue-600 text-white':'bg-gray-200 hover:bg-gray-300'}`}>{i+1}</button>
        ))}
        <button onClick={()=>setCurrentPage(p=>Math.min(p+1,totalPages))} disabled={currentPage===totalPages} className="px-3 py-1 rounded bg-gray-200 hover:bg-gray-300 disabled:opacity-50">Next</button>
      </div>

    </div>
  );
};

export default ChargerOperationsView;
