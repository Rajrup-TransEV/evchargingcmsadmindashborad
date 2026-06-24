// import React, { useState, useEffect } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { toast } from 'react-toastify';

// const AddCharger = () => {
//   const [Chargerserialnum, setChargerserialnum] = useState('');
//   const [ChargerName, setChargerName] = useState('');
//   const [Chargerhost, setChargerhost] = useState('');
//   const [Segment, setSegment] = useState('');
//   const [Subsegment, setSubsegment] = useState('');
//   const [Total_Capacity, setTotal_Capacity] = useState('');
//   const [Chargertype, setChargertype] = useState('');
//   const [parking, setParking] = useState('');
//   const [number_of_connectors, setNumber_of_connectors] = useState('');
//   const [Connector_type, setConnector_type] = useState('');
//   const [connector_total_capacity, setConnector_total_capacity] = useState('');
//   const [lattitude, setLattitude] = useState('');
//   const [longitute, setLongitute] = useState('');
//   const [full_address, setFull_address] = useState('');
//   const [charger_use_type, setCharger_use_type] = useState('');
//   const [twenty_four_seven_open_status, setTwenty_four_seven_open_status] = useState('');
//   const [charger_image, setCharger_image] = useState(null);
//   const [chargerbuyer, setChargerbuyer] = useState('');
//   const [loading, setLoading] = useState(false);
//   const [ocppurl, setOcppurl] = useState('');
//   const [chargeridentity, setChargerIdentity] = useState('');
//   const navigate = useNavigate();


//   useEffect(() => {
//     const checkAuthentication = async () => {
//         const rooturi = import.meta.env.VITE_ROOT_URI;
//         const apikey = import.meta.env.VITE_API_KEY;

//         try {
//             const gettoken = localStorage.getItem("token");
//             if (!gettoken) {
//                 navigate("/signin");
//                 return;
//             }

//             const response = await fetch(`${rooturi}/userauth/verifyuser`, {
//                 method: 'POST',
//                 headers: {
//                     'Content-Type': 'application/json',
//                     'apiauthkey': apikey,
//                 },
//                 body: JSON.stringify({ token: gettoken })
//             });

//             const data = await response.json();
//             if (response.ok) {
//                 if (data.user.userType !== "superadmin") {
//                     toast("You have no authorization to view this page");
//                     navigate("/signin");
//                 } else {
//                     console.log("You are an authorized user");
//                 }
//             } else {
//                 toast("Failed to verify user");
//                 navigate("/signin");
//             }
//         } catch (error) {
//             console.error("Error during authentication check:", error);
//             toast("An error occurred during authentication");
//             navigate("/signin");
//         }
//     };

//     checkAuthentication();
// }, [navigate]);

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setLoading(true);

//     try {
//       const apikey = import.meta.env.VITE_API_KEY;
//       const rooturi = import.meta.env.VITE_ROOT_URI;

//       let imageBase64 = '';
//       if (charger_image) {
//         const reader = new FileReader();
//         reader.readAsDataURL(charger_image);
//         reader.onloadend = async () => {
//           imageBase64 = reader.result.split(',')[1]; // Extract base64 string

//           // Send the data with the base64 string
//           const response = await fetch(`${rooturi}/admin/createchargerunit`, {
//             method: 'POST',
//             headers: {
//               'Content-Type': 'application/json',
//               'apiauthkey': apikey,
//             },
//             body: JSON.stringify({
//               Chargerserialnum,
//               ChargerName,
//               Chargerhost,
//               Segment,
//               Subsegment,
//               Total_Capacity,
//               Chargertype,
//               parking,
//               number_of_connectors,
//               Connector_type,
//               connector_total_capacity,
//               lattitude,
//               longitute,
//               full_address,
//               charger_use_type,
//               twenty_four_seven_open_status,
//               charger_image: imageBase64, // Include base64 string in payload
//               chargerbuyer,
//               chargeridentity,
//             })
//           });

//           const data = await response.json();
//           if (response.ok) {
//             setOcppurl(data.ocppurl);
//             toast(data.message);
//           } else {
//             toast.error('Something went wrong, please try again');
//             setLoading(false);
//           }
//         };
//         reader.onerror = () => {
//           toast.error('Failed to read image file');
//           setLoading(false);
//         };
//       } else {
//         // Handle case when no image is uploaded
//         const response = await fetch(`${rooturi}/admin/createchargerunit`, {
//           method: 'POST',
//           headers: {
//             'Content-Type': 'application/json',
//             'apiauthkey': apikey,
//           },
//           body: JSON.stringify({
//             Chargerserialnum,
//             ChargerName,
//             Chargerhost,
//             Segment,
//             Subsegment,
//             Total_Capacity,
//             Chargertype,
//             parking,
//             number_of_connectors,
//             Connector_type,
//             connector_total_capacity,
//             lattitude,
//             longitute,
//             full_address,
//             charger_use_type,
//             twenty_four_seven_open_status,
//             charger_image: '', // No image
//             chargerbuyer,
//             chargeridentity,
//           })
//         });

//         const data = await response.json();
//         if (response.ok) {
//           setOcppurl(data.ocppurl);
//           toast(data.message);
//         } else {
//           toast.error('Something went wrong, please try again');
//           setLoading(false);
//         }
//       }
//     } catch (error) {
//       console.error(error);
//       toast.error('Failure occurred');
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleFileUpload = (e) => {
//     const selectedFile = e.target.files[0];
//     if (selectedFile) {
//       setCharger_image(selectedFile);
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
//               const pathfinder = "addcharger.jsx"
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

//   return (
//     <section className="relative flex flex-col h-screen overflow-y-auto bg-cover bg-center" style={{ backgroundImage: "url('https://res.cloudinary.com/djvmehyvd/image/upload/v1730708478/jjb6gtwippzrubjbykda.png')" }}>
//       <div className="lg:grid lg:min-h-screen lg:grid-cols-12">
//         <main className="flex items-center justify-center px-8 py-8 sm:px-12 lg:col-span-7 lg:px-16 lg:py-12 xl:col-span-6">
//           <div className="max-w-xl lg:max-w-3xl">
//             <a className="block text-blue-600" href="/">
//               <span className="sr-only">Home</span>
//              Home
//             </a>

//             <h1 className="mt-6 text-2xl font-bold text-gray-900 sm:text-3xl md:text-4xl">
//               Add Charger Details
//             </h1>

//             <p className="mt-4 leading-relaxed text-gray-500">
//               Please fill in the details below to add a new charger.
//             </p>

//             <form action="#" className="mt-8 grid grid-cols-6 gap-6" onSubmit={handleSubmit}>
//               <div className="col-span-6">
//                 <label htmlFor="Chargerserialnum" className="block text-sm font-medium text-gray-700">
//                   Charger Serial Number
//                 </label>
//                 <input
//                   type="text"
//                   id="Chargerserialnum"
//                   name="Chargerserialnum"
//                   value={Chargerserialnum}
//                   onChange={(e) => setChargerserialnum(e.target.value)}
//                   className="mt-1 w-full rounded-md border-gray-200 bg-white text-sm text-gray-700 shadow-sm"
//                 />
//               </div>

//               <div className="col-span-6">
//                 <label htmlFor="ChargerName" className="block text-sm font-medium text-gray-700">
//                   Charger Name
//                 </label>
//                 <input
//                   type="text"
//                   id="ChargerName"
//                   name="ChargerName"
//                   value={ChargerName}
//                   onChange={(e) => setChargerName(e.target.value)}
//                   className="mt-1 w-full rounded-md border-gray-200 bg-white text-sm text-gray-700 shadow-sm"
//                 />
//               </div>

//               <div className="col-span-6">
//                 <label htmlFor="Chargerhost" className="block text-sm font-medium text-gray-700">
//                   Charger Host
//                 </label>
//                 <input
//                   type="text"
//                   id="Chargerhost"
//                   name="Chargerhost"
//                   value={Chargerhost}
//                   onChange={(e) => setChargerhost(e.target.value)}
//                   className="mt-1 w-full rounded-md border-gray-200 bg-white text-sm text-gray-700 shadow-sm"
//                 />
//               </div>

//               <div className="col-span-6">
//                 <label htmlFor="Segment" className="block text-sm font-medium text-gray-700">
//                   Segment
//                 </label>
//                 <input
//                   type="text"
//                   id="Segment"
//                   name="Segment"
//                   value={Segment}
//                   onChange={(e) => setSegment(e.target.value)}
//                   className="mt-1 w-full rounded-md border-gray-200 bg-white text-sm text-gray-700 shadow-sm"
//                 />
//               </div>

//               <div className="col-span-6">
//                 <label htmlFor="Subsegment" className="block text-sm font-medium text-gray-700">
//                   Subsegment
//                 </label>
//                 <input
//                   type="text"
//                   id="Subsegment"
//                   name="Subsegment"
//                   value={Subsegment}
//                   onChange={(e) => setSubsegment(e.target.value)}
//                   className="mt-1 w-full rounded-md border-gray-200 bg-white text-sm text-gray-700 shadow-sm"
//                 />
//               </div>

//               <div className="col-span-6">
//                 <label htmlFor="Total_Capacity" className="block text-sm font-medium text-gray-700">
//                   Total Capacity
//                 </label>
//                 <input
//                   type="text"
//                   id="Total_Capacity"
//                   name="Total_Capacity"
//                   value={Total_Capacity}
//                   onChange={(e) => setTotal_Capacity(e.target.value)}
//                   className="mt-1 w-full rounded-md border-gray-200 bg-white text-sm text-gray-700 shadow-sm"
//                 />
//               </div>

//                     <div className="col-span-6">
//                     <label htmlFor="Chargertype" className="block text-sm font-medium text-gray-700">
//                       Charger Type
//                     </label>
//                     <select
//                       id="Chargertype"
//                       name="Chargertype"
//                       value={Chargertype}
//                       onChange={(e) => setChargertype(e.target.value)}
//                       className="mt-1 w-full rounded-md border-gray-200 bg-white text-sm text-gray-700 shadow-sm"
//                     >
//                       <option value="" disabled>Select Charger Type</option>
//                       <option value="AC">AC</option>
//                       <option value="DC">DC</option>
//                       <option value="HYBRID">HYBRID</option>
//                     </select>
//                   </div>
//               <div className="col-span-6">
//                 <label htmlFor="parking" className="block text-sm font-medium text-gray-700">
//                   Parking
//                 </label>
//                 <input
//                   type="text"
//                   id="parking"
//                   name="parking"
//                   value={parking}
//                   onChange={(e) => setParking(e.target.value)}
//                   className="mt-1 w-full rounded-md border-gray-200 bg-white text-sm text-gray-700 shadow-sm"
//                 />
//               </div>

//               <div className="col-span-6">
//                 <label htmlFor="number_of_connectors" className="block text-sm font-medium text-gray-700">
//                   Number of Connectors
//                 </label>
//                 <input
//                   type="text"
//                   id="number_of_connectors"
//                   name="number_of_connectors"
//                   value={number_of_connectors}
//                   onChange={(e) => setNumber_of_connectors(e.target.value)}
//                   className="mt-1 w-full rounded-md border-gray-200 bg-white text-sm text-gray-700 shadow-sm"
//                 />
//               </div>

//               <div className="col-span-6">
//                 <label htmlFor="Connector_type" className="block text-sm font-medium text-gray-700">
//                   Connector Type
//                 </label>
//                 <input
//                   type="text"
//                   id="Connector_type"
//                   name="Connector_type"
//                   value={Connector_type}
//                   onChange={(e) => setConnector_type(e.target.value)}
//                   className="mt-1 w-full rounded-md border-gray-200 bg-white text-sm text-gray-700 shadow-sm"
//                 />
//               </div>

//               <div className="col-span-6">
//                 <label htmlFor="connector_total_capacity" className="block text-sm font-medium text-gray-700">
//                   Connector Total Capacity
//                 </label>
//                 <input
//                   type="text"
//                   id="connector_total_capacity"
//                   name="connector_total_capacity"
//                   value={connector_total_capacity}
//                   onChange={(e) => setConnector_total_capacity(e.target.value)}
//                   className="mt-1 w-full rounded-md border-gray-200 bg-white text-sm text-gray-700 shadow-sm"
//                 />
//               </div>

//               <div className="col-span-6">
//                 <label htmlFor="lattitude" className="block text-sm font-medium text-gray-700">
//                   Latitude
//                 </label>
//                 <input
//                   type="text"
//                   id="lattitude"
//                   name="lattitude"
//                   value={lattitude}
//                   onChange={(e) => setLattitude(e.target.value)}
//                   className="mt-1 w-full rounded-md border-gray-200 bg-white text-sm text-gray-700 shadow-sm"
//                 />
//               </div>

//               <div className="col-span-6">
//                 <label htmlFor="longitute" className="block text-sm font-medium text-gray-700">
//                   Longitude
//                 </label>
//                 <input
//                   type="text"
//                   id="longitute"
//                   name="longitute"
//                   value={longitute}
//                   onChange={(e) => setLongitute(e.target.value)}
//                   className="mt-1 w-full rounded-md border-gray-200 bg-white text-sm text-gray-700 shadow-sm"
//                 />
//               </div>

//               <div className="col-span-6">
//                 <label htmlFor="full_address" className="block text-sm font-medium text-gray-700">
//                   Full Address
//                 </label>
//                 <input
//                   type="text"
//                   id="full_address"
//                   name="full_address"
//                   value={full_address}
//                   onChange={(e) => setFull_address(e.target.value)}
//                   className="mt-1 w-full rounded-md border-gray-200 bg-white text-sm text-gray-700 shadow-sm"
//                 />
//               </div>

//               <div className="col-span-6">
//                 <label htmlFor="charger_use_type" className="block text-sm font-medium text-gray-700">
//                   Charger Use Type
//                 </label>
//                 <input
//                   type="text"
//                   id="charger_use_type"
//                   name="charger_use_type"
//                   value={charger_use_type}
//                   onChange={(e) => setCharger_use_type(e.target.value)}
//                   className="mt-1 w-full rounded-md border-gray-200 bg-white text-sm text-gray-700 shadow-sm"
//                 />
//               </div>

//               <div className="col-span-6">
//                 <label htmlFor="twenty_four_seven_open_status" className="block text-sm font-medium text-gray-700">
//                   24/7 Open Status
//                 </label>
//                 <input
//                   type="text"
//                   id="twenty_four_seven_open_status"
//                   name="twenty_four_seven_open_status"
//                   value={twenty_four_seven_open_status}
//                   onChange={(e) => setTwenty_four_seven_open_status(e.target.value)}
//                   className="mt-1 w-full rounded-md border-gray-200 bg-white text-sm text-gray-700 shadow-sm"
//                 />
//               </div>

//               <div className="col-span-6">
//                 <label htmlFor="charger_image" className="block text-sm font-medium text-gray-700">
//                   Charger Image
//                 </label>
//                 <input
//                   type="file"
//                   id="charger_image"
//                   name="charger_image"
//                   onChange={handleFileUpload}
//                   className="mt-1 w-full rounded-md border-gray-200 bg-white text-sm text-gray-700 shadow-sm"
//                 />
//               </div>

//               <div className="col-span-6">
//                 <label htmlFor="chargerbuyer" className="block text-sm font-medium text-gray-700">
//                   Charger Buyer
//                 </label>
//                 <input
//                   type="text"
//                   id="chargerbuyer"
//                   name="chargerbuyer"
//                   value={chargerbuyer}
//                   onChange={(e) => setChargerbuyer(e.target.value)}
//                   className="mt-1 w-full rounded-md border-gray-200 bg-white text-sm text-gray-700 shadow-sm"
//                 />
//               </div>

//               <div className="col-span-6">
//                 <label htmlFor="chargeridentity" className="block text-sm font-medium text-gray-700">
//                   Charger Identity
//                 </label>
//                 <input
//                   type="text"
//                   id="chargeridentity"
//                   name="chargeridentity"
//                   value={chargeridentity}
//                   onChange={(e) => setChargerIdentity(e.target.value)}
//                   className="mt-1 w-full rounded-md border-gray-200 bg-white text-sm text-gray-700 shadow-sm"
//                 />
//               </div>

//               <div className="col-span-6 sm:flex sm:items-center sm:gap-4">
//               <button
//                   type="submit"
//                   className={`inline-block shrink-0 rounded-md border px-12 py-3 text-sm font-medium text-white transition focus:outline-none focus:ring active:text-blue-500 ${
//                     loading ? 'bg-gray-400 border-gray-400' : 'bg-blue-600 border-blue-600'
//                   }`}
//                   disabled={loading}
//                 >
//                   {loading ? (
//                     <>
//                       <svg className="animate-spin h-5 w-5 mr-3 inline" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
//                         <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
//                         <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 0115.9-4.1A8 8 0 014 12z"></path>
//                       </svg>
//                       Processing...
//                     </>
//                   ) : (
//                     'Save Charger Details'
//                   )}
//                 </button>
//               </div>
//             </form>

//             {ocppurl && (
//               <div className="mt-6">
//                 <h2 className="text-xl font-semibold text-gray-900">OCPP URL</h2>
//                 <input
//                   type="text"
//                   id="ocppurl"
//                   name="ocppurl"
//                   value={ocppurl}
//                   className="mt-1 w-full rounded-md border-gray-200 bg-white text-sm text-gray-700 shadow-sm"
//                   readOnly
//                 />
//               </div>
//             )}
//           </div>
//         </main>
//       </div>
//     </section>
//   );
// };

// export default AddCharger;

import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import Sidebar from '../partials/Sidebar'; // Adjust path as needed

/* ================= UI HELPERS (DESIGN ONLY) ================= */

const Section = ({ title, icon }) => (
  <div className="flex items-center gap-3 mt-10 first:mt-0">
    <div className="h-8 w-1 rounded-full bg-gradient-to-b from-teal-400 to-indigo-600" />
    <h2 className="text-xl font-bold text-white tracking-wide flex items-center gap-2">
      {icon && <span className="text-teal-400">{icon}</span>}
      {title}
    </h2>
  </div>
);

const Grid = ({ children }) => (
  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
    {children}
  </div>
);

const Input = ({ label, value, onChange, full = false, type = "text", placeholder = "", required = false }) => (
  <div className={full ? "md:col-span-2 lg:col-span-3" : ""}>
    <label className="text-sm font-semibold text-gray-300 flex items-center gap-1">
      {label}
      {required && <span className="text-red-400 text-xs">*</span>}
    </label>
    <input
      type={type}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder}
      className="mt-2 w-full rounded-xl bg-black/40 border border-white/20 px-4 py-3 text-white placeholder-gray-500 focus:ring-2 focus:ring-teal-400 outline-none transition-all duration-200 hover:border-white/40"
    />
  </div>
);

const Select = ({ label, value, onChange, options = [], required = false }) => (
  <div>
    <label className="text-sm font-semibold text-gray-300 flex items-center gap-1">
      {label}
      {required && <span className="text-red-400 text-xs">*</span>}
    </label>
    <select
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="mt-2 w-full rounded-xl bg-black/40 border border-white/20 px-4 py-3 text-white focus:ring-2 focus:ring-teal-400 outline-none transition-all duration-200 hover:border-white/40"
    >
      <option value="">Select {label}</option>
      {options.map((opt) => (
        <option key={opt} value={opt}>{opt}</option>
      ))}
    </select>
  </div>
);

const FileInput = ({ label, onChange, accept = "image/*" }) => (
  <div>
    <label className="text-sm font-semibold text-gray-300">{label}</label>
    <div className="mt-2 relative">
      <input
        type="file"
        onChange={onChange}
        accept={accept}
        className="w-full rounded-xl bg-black/40 border border-white/20 px-4 py-3 text-gray-300 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-gradient-to-r file:from-teal-400 file:to-indigo-600 file:text-white hover:file:opacity-90 transition-all duration-200"
      />
    </div>
  </div>
);

/* ================= MAIN COMPONENT ================= */

const AddCharger = () => {
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const [Chargerserialnum, setChargerserialnum] = useState('');
  const [ChargerName, setChargerName] = useState('');
  const [Chargerhost, setChargerhost] = useState('');
  const [Segment, setSegment] = useState('');
  const [Subsegment, setSubsegment] = useState('');
  const [Total_Capacity, setTotal_Capacity] = useState('');
  const [Chargertype, setChargertype] = useState('');
  const [parking, setParking] = useState('');
  const [number_of_connectors, setNumber_of_connectors] = useState('');
  const [Connector_type, setConnector_type] = useState('');
  const [connector_total_capacity, setConnector_total_capacity] = useState('');
  const [lattitude, setLattitude] = useState('');
  const [longitute, setLongitute] = useState('');
  const [full_address, setFull_address] = useState('');
  const [charger_use_type, setCharger_use_type] = useState('');
  const [twenty_four_seven_open_status, setTwenty_four_seven_open_status] = useState('');
  const [charger_image, setCharger_image] = useState(null);
  const [chargerbuyer, setChargerbuyer] = useState('');
  const [chargeridentity, setChargerIdentity] = useState('');
  const [loading, setLoading] = useState(false);
  const [ocppurl, setOcppurl] = useState('');
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
          method: 'POST',
          headers: { 'Content-Type': 'application/json', apiauthkey: apikey },
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
            headers: { 'Content-Type': 'application/json', apiauthkey: apikey },
            body: JSON.stringify({
              ip: data.ip,
              datetime: new Date().toISOString(),
              path: "addcharger.jsx"
            })
          });
        }
      } catch {}
    };
    fetchIpAddress();
  }, []);

  /* ================= SUBMIT ================= */
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const rooturi = import.meta.env.VITE_ROOT_URI;
      const apikey = import.meta.env.VITE_API_KEY;

      let imageBase64 = "";
      if (charger_image) {
        const reader = new FileReader();
        reader.readAsDataURL(charger_image);
        reader.onloadend = async () => {
          imageBase64 = reader.result.split(",")[1];
          await sendData(imageBase64);
        };
      } else {
        await sendData("");
      }

      async function sendData(image) {
        const res = await fetch(`${rooturi}/admin/createchargerunit`, {
          method: "POST",
          headers: { 'Content-Type': 'application/json', apiauthkey: apikey },
          body: JSON.stringify({
            Chargerserialnum,
            ChargerName,
            Chargerhost,
            Segment,
            Subsegment,
            Total_Capacity,
            Chargertype,
            parking,
            number_of_connectors,
            Connector_type,
            connector_total_capacity,
            lattitude,
            longitute,
            full_address,
            charger_use_type,
            twenty_four_seven_open_status,
            charger_image: image,
            chargerbuyer,
            chargeridentity
          })
        });

        const data = await res.json();
        if (res.ok) {
          setOcppurl(data.ocppurl);
          toast.success(data.message || "Charger created successfully!");
          // Reset form after success
          resetForm();
        } else {
          toast.error(data.message || "Failed to create charger");
        }
      }
    } catch (error) {
      console.error("Error:", error);
      toast.error("An error occurred while creating charger");
    } finally {
      setLoading(false);
    }
  };

  const resetForm = () => {
    setChargerserialnum('');
    setChargerName('');
    setChargerhost('');
    setSegment('');
    setSubsegment('');
    setTotal_Capacity('');
    setChargertype('');
    setParking('');
    setNumber_of_connectors('');
    setConnector_type('');
    setConnector_total_capacity('');
    setLattitude('');
    setLongitute('');
    setFull_address('');
    setCharger_use_type('');
    setTwenty_four_seven_open_status('');
    setCharger_image(null);
    setChargerbuyer('');
    setChargerIdentity('');
  };

  const handleFileUpload = (e) => setCharger_image(e.target.files[0]);

  /* ================= UI ================= */
  return (
    <div className="flex h-screen overflow-hidden bg-gradient-to-br from-gray-900 via-slate-900 to-black">
      {/* Sidebar */}
      <Sidebar 
        sidebarOpen={sidebarOpen} 
        setSidebarOpen={setSidebarOpen} 
        variant="default"
      />

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Mobile Header */}
        <header className="lg:hidden flex items-center justify-between p-4 bg-black/30 backdrop-blur-sm border-b border-white/10">
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="p-2 rounded-lg text-white hover:bg-white/10 transition-colors"
            aria-label="Toggle sidebar"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
          <h1 className="text-xl font-bold text-white">⚡ Add EV Charger</h1>
          <div className="w-10" />
        </header>

        {/* Page Content */}
        <div className="flex-1 overflow-y-auto p-4 md:p-6">
          {/* Desktop Header */}
          <div className="hidden lg:flex justify-between items-center mb-8">
            <div>
              <h1 className="text-3xl font-extrabold text-white flex items-center gap-3">
                <span className="bg-gradient-to-r from-teal-400 to-indigo-600 p-2 rounded-xl">
                  ⚡
                </span>
                Add EV Charger
              </h1>
              <p className="text-gray-400 mt-1">Fill in the details to register a new EV charger</p>
            </div>
            {/* <button
              onClick={() => navigate('/')}
              className="rounded-full bg-gradient-to-r from-teal-400 to-indigo-600 px-6 py-2.5 text-white font-bold hover:scale-105 transition transform hover:shadow-xl shadow-lg"
            >
              🏠 Home
            </button> */}
          </div>

          <form onSubmit={handleSubmit} className="rounded-3xl bg-white/5 backdrop-blur-xl border border-white/10 p-6 md:p-10 shadow-2xl">

            <Section title="Charger Identity" icon="🔑" />
            <Grid>
              <Input 
                label="Serial Number" 
                value={Chargerserialnum} 
                onChange={setChargerserialnum} 
                placeholder="e.g., CHG-2024-001"
                required
              />
              <Input 
                label="Charger Name" 
                value={ChargerName} 
                onChange={setChargerName} 
                placeholder="e.g., Tesla Supercharger"
                required
              />
              <Input 
                label="Charger Host" 
                value={Chargerhost} 
                onChange={setChargerhost} 
                placeholder="e.g., Host-001"
              />
              <Input 
                label="Charger Identity" 
                value={chargeridentity} 
                onChange={setChargerIdentity} 
                placeholder="e.g., ID-12345"
                required
              />
            </Grid>

            <Section title="Technical Details" icon="⚙️" />
            <Grid>
              <Select 
                label="Charger Type" 
                value={Chargertype} 
                onChange={setChargertype}
                options={['AC', 'DC', 'HYBRID']}
                required
              />
              <Input 
                label="Total Capacity (kW)" 
                value={Total_Capacity} 
                onChange={setTotal_Capacity} 
                placeholder="e.g., 50"
                type="number"
                required
              />
              <Input 
                label="Number of Connectors" 
                value={number_of_connectors} 
                onChange={setNumber_of_connectors} 
                placeholder="e.g., 2"
                type="number"
                required
              />
              <Select 
                label="Connector Type" 
                value={Connector_type} 
                onChange={setConnector_type}
                options={['CCS2', 'CHAdeMO', 'Type 2', 'GB/T']}
                required
              />
              <Input 
                label="Connector Capacity (kW)" 
                value={connector_total_capacity} 
                onChange={setConnector_total_capacity} 
                placeholder="e.g., 50"
                type="number"
                required
              />
            </Grid>

            <Section title="Location Details" icon="📍" />
            <Grid>
              <Input 
                label="Latitude" 
                value={lattitude} 
                onChange={setLattitude} 
                placeholder="e.g., 28.6139"
                required
              />
              <Input 
                label="Longitude" 
                value={longitute} 
                onChange={setLongitute} 
                placeholder="e.g., 77.2090"
                required
              />
              <Input 
                label="Parking" 
                value={parking} 
                onChange={setParking} 
                placeholder="e.g., Yes/No"
                required
              />
            </Grid>

            <Input 
              label="Full Address" 
              value={full_address} 
              onChange={setFull_address} 
              placeholder="e.g., 123 Main Street, City, State, ZIP"
              full 
              required
            />

            <Section title="Ownership & Usage" icon="🏢" />
            <Grid>
              <Input 
                label="Buyer/Operator" 
                value={chargerbuyer} 
                onChange={setChargerbuyer} 
                placeholder="e.g., Tesla Inc."
                required
              />
              <Select 
                label="Use Type" 
                value={charger_use_type} 
                onChange={setCharger_use_type}
                options={['PUBLIC', 'PRIVATE', 'SEMI-PUBLIC']}
                required
              />
              <Select 
                label="24x7 Open Status" 
                value={twenty_four_seven_open_status} 
                onChange={setTwenty_four_seven_open_status}
                options={['YES', 'NO']}
                required
              />
            </Grid>

            <Section title="Media" icon="🖼️" />
            <Grid>
              <FileInput 
                label="Charger Image" 
                onChange={handleFileUpload} 
                accept="image/*"
              />
              <div className="col-span-2">
                {charger_image && (
                  <div className="mt-4 p-4 bg-black/40 rounded-xl border border-white/20">
                    <p className="text-sm text-gray-400">Selected file: 
                      <span className="text-white ml-2">{charger_image.name}</span>
                    </p>
                    <p className="text-xs text-gray-500 mt-1">
                      Size: {(charger_image.size / 1024).toFixed(2)} KB
                    </p>
                  </div>
                )}
              </div>
            </Grid>

            {ocppurl && (
              <div className="mt-8 p-4 bg-emerald-500/10 border border-emerald-500/30 rounded-xl">
                <p className="text-sm text-emerald-400 font-semibold">✅ Charger Created Successfully!</p>
                <p className="text-sm text-gray-300 mt-2">
                  <span className="font-mono text-teal-300">{ocppurl}</span>
                </p>
              </div>
            )}

            <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-end">
              <button
                type="button"
                onClick={() => navigate('/listofcharger')}
                className="rounded-xl px-6 py-3 text-white font-semibold border border-white/20 hover:bg-white/10 transition-all duration-200"
              >
                📋 View Chargers
              </button>
              <button
                type="submit"
                disabled={loading}
                className="rounded-xl bg-gradient-to-r from-teal-400 via-indigo-500 to-purple-600 px-10 py-3 text-lg font-extrabold text-white shadow-xl hover:scale-105 transition transform disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? (
                  <span className="flex items-center gap-2">
                    <svg className="animate-spin h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Processing...
                  </span>
                ) : (
                  "🚀 Save Charger"
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddCharger;