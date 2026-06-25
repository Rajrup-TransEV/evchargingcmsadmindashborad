// import React, { useState, useEffect } from 'react';
// import { useParams, useNavigate } from 'react-router-dom';
// import { toast } from 'react-toastify';

// const AddHub = () => {
//     const [hubname, sethubname] = useState('');
//     const [hubchargers, sethubcharges] = useState([]);
//     const [hubtariff, sethubtariff] = useState('');
//     const [hublocation, sethublocation] = useState('');
//     const [adminid, setadminid] = useState('');
//     const [chargerids, setchargerids] = useState([]);
//     const [loading, setLoading] = useState(false);
//     const navigate = useNavigate();

//     // Use effect to check for user authentication
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

//     // Fetch all charger data
//     useEffect(() => {
//         const fetchAllChargerData = async () => {
//             const rooturi = import.meta.env.VITE_ROOT_URI;
//             const apikey = import.meta.env.VITE_API_KEY;

//             try {
//                 const response = await fetch(`${rooturi}/admin/listofcharges`, {
//                     method: "GET",
//                     headers: {
//                         'Content-Type': 'application/json',
//                         'apiauthkey': apikey,
//                     },
//                 });

//                 const result = await response.json();
//                 const data = Array.isArray(result.data) ? result.data : [];
//                 setchargerids(data.map(item => item.uid));
//                 setLoading(false);
//             } catch (error) {
//                 console.error("Error fetching charger data:", error);
//                 toast("Failed to fetch charger data");
//                 setchargerids([]);
//                 setLoading(false);
//             }
//         };

//         fetchAllChargerData();
//     }, []);


//    // Handle form submission
//     const handleSubmit = async (e) => {
//         e.preventDefault();

//         const dataToSubmit = {
//             hubname,
//             hubchargers,
//             hubtariff,
//             hublocation,
//             adminid,
//         };

//         const rooturi = import.meta.env.VITE_ROOT_URI;
//         const apikey = import.meta.env.VITE_API_KEY;

//         try {
//             const response = await fetch(`${rooturi}/admin/addhubs`, {
//                 method: 'POST',
//                 headers: {
//                     'Content-Type': 'application/json',
//                     'apiauthkey': apikey,
//                 },
//                 body: JSON.stringify(dataToSubmit),
//             });

//             if (response.ok) {
//                 toast("Hub added successfully!");
//             } else {
//                 toast("Failed to add hub");
//             }
//         } catch (error) {
//             console.error("Error during hub submission:", error);
//             toast("An error occurred while adding the hub");
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
//                 const pathfinder = "addhub.jsx"
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
//   }, []); 

//   const backtohome = (event) => {
//     event.preventDefault(); // Prevent default action
//     navigate("/"); // Navigate to home
// }
//     return (
//         <section className="bg-white dark:bg-gray-900">
//             <div className="lg:grid lg:min-h-screen lg:grid-cols-12">
//                 <aside className="relative block h-16 lg:order-last lg:col-span-5 lg:h-full xl:col-span-6">
//                     <img
//                         alt=""
//                         src="https://res.cloudinary.com/djvmehyvd/image/upload/v1730708478/jjb6gtwippzrubjbykda.png"
//                         className="absolute inset-0 h-full w-full object-cover"
//                     />
//                 </aside>

//                 <main className="flex items-center justify-center px-8 py-8 sm:px-12 lg:col-span-7 lg:px-16 lg:py-12 xl:col-span-6">
//                     <div className="max-w-xl lg:max-w-3xl">
//                         <a className="block text-blue-600" href="/">
//                             <span className="sr-only">Home</span>
//                             {/* SVG icon omitted for brevity */}
//                         </a>

//                         <h1 className="mt-6 text-2xl font-bold text-gray-900 sm:text-3xl md:text-4xl dark:text-white">
//                             Welcome to Add hub section 🦑
//                         </h1>

//                         <p className="mt-4 leading-relaxed text-gray-500 dark:text-gray-400">
//                             Through this section you can add data for hubs.
//                         </p>

//                         <form onSubmit={handleSubmit} className="mt-8 grid grid-cols-6 gap-6">
//                             <div className="col-span-6 sm:col-span-3">
//                                 <label
//                                     htmlFor="hubname"
//                                     className="block text-sm font-medium text-gray-700 dark:text-gray-200"
//                                 >
//                                     hubname
//                                 </label>

//                                 <input
//                                     type="text"
//                                     id="hubname"
//                                     name="hubname"
//                                     value={hubname}
//                                     onChange={(e) => sethubname(e.target.value)}
//                                     className="mt-1 w-full rounded-md border-gray-200 bg-white text-sm text-gray-700 shadow-sm dark:border-gray-700 dark:bg-gray-800 dark:text-gray-200"
//                                 />
//                             </div>

//                             <div className="col-span-6 sm:col-span-3">
//                                 <label
//                                     htmlFor="hubchargers"
//                                     className="block text-sm font-medium text-gray-700 dark:text-gray-200"
//                                 >
//                                     hubchargers
//                                 </label>

//                                 <select
//                                     id="hubchargers"
//                                     name="hubchargers"
//                                     multiple
//                                     value={hubchargers}
//                                     onChange={(e) => {
//                                         const options = Array.from(e.target.options);
//                                         const selectedValues = options
//                                             .filter(option => option.selected)
//                                             .map(option => option.value);
//                                         sethubcharges(selectedValues);
//                                     }}
//                                     className="mt-1 w-full rounded-md border-gray-200 bg-white text-sm text-gray-700 shadow-sm dark:border-gray-700 dark:bg-gray-800 dark:text-gray-200"
//                                 >
//                                     {chargerids.map(chargerId => (
//                                         <option key={chargerId} value={chargerId}>
//                                             {chargerId}
//                                         </option>
//                                     ))}
//                                 </select>
//                             </div>

//                             <div className="col-span-6">
//                                 <label htmlFor="hubtariff" className="block text-sm font-medium text-gray-700 dark:text-gray-200">
//                                     hubtariff
//                                 </label>

//                                 <input
//                                     type="text"
//                                     id="hubtariff"
//                                     name="hubtariff"
//                                     value={hubtariff}
//                                     onChange={(e) => sethubtariff(e.target.value)}
//                                     className="mt-1 w-full rounded-md border-gray-200 bg-white text-sm text-gray-700 shadow-sm dark:border-gray-700 dark:bg-gray-800 dark:text-gray-200"
//                                 />
//                             </div>

//                             <div className="col-span-6 sm:col-span-3">
//                                 <label
//                                     htmlFor="hublocation"
//                                     className="block text-sm font-medium text-gray-700 dark:text-gray-200"
//                                 >
//                                     hublocation
//                                 </label>

//                                 <input
//                                     type="text"
//                                     id="hublocation"
//                                     name="hublocation"
//                                     value={hublocation}
//                                     onChange={(e) => sethublocation(e.target.value)}
//                                     className="mt-1 w-full rounded-md border-gray-200 bg-white text-sm text-gray-700 shadow-sm dark:border-gray-700 dark:bg-gray-800 dark:text-gray-200"
//                                 />
//                             </div>

//                             <div className="col-span-6 sm:col-span-3">
//                                 <label
//                                     htmlFor="adminid"
//                                     className="block text-sm font-medium text-gray-700 dark:text-gray-200"
//                                 >
//                                     adminid
//                                 </label>

//                                 <input
//                                     type="text"
//                                     id="adminid"
//                                     name="adminid"
//                                     value={adminid}
//                                     onChange={(e) => setadminid(e.target.value)}
//                                     className="mt-1 w-full rounded-md border-gray-200 bg-white text-sm text-gray-700 shadow-sm dark:border-gray-700 dark:bg-gray-800 dark:text-gray-200"
//                                 />
//                             </div>

//                             <div className="col-span-6">
//                                 <button
//                                     type="submit"
//                                     className="inline-block w-full rounded-md bg-blue-600 px-5 py-3 text-sm font-medium text-white shadow hover:bg-blue-700 focus:outline-none focus:ring active:bg-blue-500"
//                                 >
//                                     Add Hub
//                                 </button>
//                             </div>
//                             <button 
//     className="relative inline-block text-white font-bold py-2 px-4 rounded-full overflow-hidden group transition-transform duration-300 transform hover:scale-105"
//     onClick={(event) => backtohome(event)}
// >
//     <span className="absolute inset-0 bg-gradient-to-r from-teal-400 via-teal-500 to-teal-600 transform scale-110 group-hover:scale-100 transition duration-300"></span>
//     <span className="relative z-10">HOME</span>
// </button>
//                         </form>
//                     </div>
//                 </main>
//             </div>
//         </section>
//     );
// };

// export default AddHub;

import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import Sidebar from '../../partials/Sidebar';
import { 
  FiPlus, 
  FiHome, 
  FiMapPin, 
  FiZap, 
  FiTag, 
  FiUser, 
  FiArrowLeft,
  FiList,
  FiCheck,
  FiX,
  FiRefreshCw,
  FiInfo
} from 'react-icons/fi';

const AddHub = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [hubname, sethubname] = useState('');
  const [hubchargers, sethubcharges] = useState([]);
  const [hubtariff, sethubtariff] = useState('');
  const [hublocation, sethublocation] = useState('');
  const [adminid, setadminid] = useState('');
  const [chargerids, setchargerids] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchCharger, setSearchCharger] = useState('');
  const navigate = useNavigate();

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

  /* ================= CHARGERS ================= */
  useEffect(() => {
    const fetchAllChargerData = async () => {
      const rooturi = import.meta.env.VITE_ROOT_URI;
      const apikey = import.meta.env.VITE_API_KEY;

      try {
        const res = await fetch(`${rooturi}/admin/listofcharges`, {
          headers: { apiauthkey: apikey }
        });
        const result = await res.json();
        setchargerids(Array.isArray(result.data) ? result.data.map(i => i.uid) : []);
      } catch {
        toast.error("Failed to load chargers");
      }
    };
    fetchAllChargerData();
  }, []);

  /* ================= SUBMIT ================= */
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    // Validate required fields
    if (!hubname || !adminid || !hubtariff || !hublocation || hubchargers.length === 0) {
      toast.error("Please fill in all required fields and select at least one charger");
      setLoading(false);
      return;
    }

    const rooturi = import.meta.env.VITE_ROOT_URI;
    const apikey = import.meta.env.VITE_API_KEY;

    try {
      const res = await fetch(`${rooturi}/admin/addhubs`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', apiauthkey: apikey },
        body: JSON.stringify({
          hubname,
          hubchargers,
          hubtariff,
          hublocation,
          adminid,
        }),
      });

      if (res.ok) {
        toast.success("Hub added successfully!");
        // Reset form
        sethubname('');
        sethubcharges([]);
        sethubtariff('');
        sethublocation('');
        setadminid('');
      } else {
        toast.error("Failed to add hub");
      }
    } catch {
      toast.error("Server error");
    } finally {
      setLoading(false);
    }
  };

  const handleChargerSelect = (id) => {
    sethubcharges(prev =>
      prev.includes(id)
        ? prev.filter(item => item !== id)
        : [...prev, id]
    );
  };

  const selectAllChargers = () => {
    if (hubchargers.length === chargerids.length) {
      sethubcharges([]);
    } else {
      sethubcharges([...chargerids]);
    }
  };

  const filteredChargers = chargerids.filter(id => 
    id.toLowerCase().includes(searchCharger.toLowerCase())
  );

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
          <h1 className="text-xl font-bold text-gray-800">Add Charging Hub</h1>
          <div className="w-10" />
        </header>

        {/* Page Content */}
        <div className="flex-1 overflow-y-auto p-4 md:p-8">
          {/* Header */}
          <div className="hidden lg:flex items-center gap-4 mb-8">
            <button
              onClick={() => navigate('/listofhubs')}
              className="p-2.5 rounded-xl bg-white border border-gray-200 text-gray-600 hover:text-indigo-600 hover:border-indigo-300 hover:bg-indigo-50 transition-all duration-200 shadow-sm"
            >
              <FiArrowLeft className="w-5 h-5" />
            </button>
            <div>
              <h1 className="text-3xl font-bold text-gray-800 flex items-center gap-3">
                <span className="bg-gradient-to-r from-emerald-500 to-teal-500 p-2.5 rounded-xl text-white shadow-lg">
                  <FiZap className="w-6 h-6" />
                </span>
                Add Charging Hub
              </h1>
              <p className="text-gray-500 mt-1">Create and manage EV charging hubs</p>
            </div>
          </div>

          {/* Form */}
          <div className="max-w-4xl mx-auto">
            <div className="bg-white rounded-2xl shadow-xl border border-gray-200 overflow-hidden">
              <form onSubmit={handleSubmit} className="p-6 md:p-8">
                {/* Stats Cards */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
                  <div className="p-4 rounded-xl bg-gradient-to-br from-emerald-50 to-emerald-100/50 border border-emerald-200">
                    <div className="flex items-center gap-3">
                      <div className="p-2 rounded-lg bg-emerald-100">
                        <FiZap className="w-5 h-5 text-emerald-600" />
                      </div>
                      <div>
                        <p className="text-xs text-gray-500">Available Chargers</p>
                        <p className="text-lg font-bold text-gray-800">{chargerids.length}</p>
                      </div>
                    </div>
                  </div>
                  <div className="p-4 rounded-xl bg-gradient-to-br from-blue-50 to-blue-100/50 border border-blue-200">
                    <div className="flex items-center gap-3">
                      <div className="p-2 rounded-lg bg-blue-100">
                        <FiCheck className="w-5 h-5 text-blue-600" />
                      </div>
                      <div>
                        <p className="text-xs text-gray-500">Selected Chargers</p>
                        <p className="text-lg font-bold text-gray-800">{hubchargers.length}</p>
                      </div>
                    </div>
                  </div>
                  <div className="p-4 rounded-xl bg-gradient-to-br from-purple-50 to-purple-100/50 border border-purple-200">
                    <div className="flex items-center gap-3">
                      <div className="p-2 rounded-lg bg-purple-100">
                        <FiTag className="w-5 h-5 text-purple-600" />
                      </div>
                      <div>
                        <p className="text-xs text-gray-500">Tariff Rate</p>
                        <p className="text-lg font-bold text-gray-800">{hubtariff || '—'}</p>
                      </div>
                    </div>
                  </div>
                  <div className="p-4 rounded-xl bg-gradient-to-br from-indigo-50 to-indigo-100/50 border border-indigo-200">
                    <div className="flex items-center gap-3">
                      <div className="p-2 rounded-lg bg-indigo-100">
                        <FiMapPin className="w-5 h-5 text-indigo-600" />
                      </div>
                      <div>
                        <p className="text-xs text-gray-500">Location</p>
                        <p className="text-lg font-bold text-gray-800 truncate">{hublocation || '—'}</p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Hub Name */}
                  <div>
                    <label className="text-sm font-semibold text-gray-700 flex items-center gap-1">
                      <FiZap className="w-4 h-4 text-emerald-500" />
                      Hub Name <span className="text-red-500 text-xs">*</span>
                    </label>
                    <input
                      value={hubname}
                      onChange={(e) => sethubname(e.target.value)}
                      type="text"
                      placeholder="Enter hub name"
                      className="mt-2 w-full rounded-xl bg-gray-50 border border-gray-200 px-4 py-3 text-gray-700 placeholder-gray-400 focus:ring-2 focus:ring-emerald-400 focus:border-transparent outline-none transition-all duration-200 hover:border-gray-300"
                      required
                    />
                  </div>

                  {/* Admin ID */}
                  <div>
                    <label className="text-sm font-semibold text-gray-700 flex items-center gap-1">
                      <FiUser className="w-4 h-4 text-emerald-500" />
                      Admin ID <span className="text-red-500 text-xs">*</span>
                    </label>
                    <input
                      value={adminid}
                      onChange={(e) => setadminid(e.target.value)}
                      type="text"
                      placeholder="Enter admin ID"
                      className="mt-2 w-full rounded-xl bg-gray-50 border border-gray-200 px-4 py-3 text-gray-700 placeholder-gray-400 focus:ring-2 focus:ring-emerald-400 focus:border-transparent outline-none transition-all duration-200 hover:border-gray-300"
                      required
                    />
                  </div>

                  {/* Hub Tariff */}
                  <div>
                    <label className="text-sm font-semibold text-gray-700 flex items-center gap-1">
                      <FiTag className="w-4 h-4 text-emerald-500" />
                      Hub Tariff <span className="text-red-500 text-xs">*</span>
                    </label>
                    <input
                      value={hubtariff}
                      onChange={(e) => sethubtariff(e.target.value)}
                      type="text"
                      placeholder="e.g., 5.00/kWh"
                      className="mt-2 w-full rounded-xl bg-gray-50 border border-gray-200 px-4 py-3 text-gray-700 placeholder-gray-400 focus:ring-2 focus:ring-emerald-400 focus:border-transparent outline-none transition-all duration-200 hover:border-gray-300"
                      required
                    />
                  </div>

                  {/* Hub Location */}
                  <div>
                    <label className="text-sm font-semibold text-gray-700 flex items-center gap-1">
                      <FiMapPin className="w-4 h-4 text-emerald-500" />
                      Hub Location <span className="text-red-500 text-xs">*</span>
                    </label>
                    <input
                      value={hublocation}
                      onChange={(e) => sethublocation(e.target.value)}
                      type="text"
                      placeholder="Enter location"
                      className="mt-2 w-full rounded-xl bg-gray-50 border border-gray-200 px-4 py-3 text-gray-700 placeholder-gray-400 focus:ring-2 focus:ring-emerald-400 focus:border-transparent outline-none transition-all duration-200 hover:border-gray-300"
                      required
                    />
                  </div>

                  {/* Select Chargers */}
                  <div className="md:col-span-2">
                    <div className="flex items-center justify-between mb-3">
                      <label className="text-sm font-semibold text-gray-700 flex items-center gap-1">
                        <FiList className="w-4 h-4 text-emerald-500" />
                        Select Chargers <span className="text-red-500 text-xs">*</span>
                      </label>
                      <div className="flex items-center gap-2">
                        <button
                          type="button"
                          onClick={selectAllChargers}
                          className="text-xs text-emerald-600 hover:text-emerald-700 font-semibold"
                        >
                          {hubchargers.length === chargerids.length ? 'Deselect All' : 'Select All'}
                        </button>
                      </div>
                    </div>

                    {/* Search */}
                    <div className="relative mb-3">
                      <input
                        type="text"
                        placeholder="Search chargers..."
                        value={searchCharger}
                        onChange={(e) => setSearchCharger(e.target.value)}
                        className="w-full rounded-xl bg-gray-50 border border-gray-200 px-4 py-2.5 text-gray-700 placeholder-gray-400 focus:ring-2 focus:ring-emerald-400 focus:border-transparent outline-none transition-all duration-200"
                      />
                      <FiInfo className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
                    </div>

                    <div className="rounded-xl border border-gray-200 bg-gray-50 max-h-64 overflow-y-auto">
                      {filteredChargers.length === 0 ? (
                        <p className="text-gray-400 text-sm p-4 text-center">
                          {chargerids.length === 0 ? 'No chargers available' : 'No matching chargers found'}
                        </p>
                      ) : (
                        filteredChargers.map((id) => {
                          const isSelected = hubchargers.includes(id);
                          return (
                            <div
                              key={id}
                              onClick={() => handleChargerSelect(id)}
                              className={`cursor-pointer px-4 py-3 flex items-center justify-between transition-all duration-200 ${
                                isSelected
                                  ? 'bg-gradient-to-r from-emerald-50 to-teal-50 border-l-4 border-emerald-500'
                                  : 'hover:bg-gray-100 border-l-4 border-transparent'
                              } ${!isSelected && 'border-l-4 border-transparent'}`}
                            >
                              <div className="flex items-center gap-3">
                                <div className={`w-5 h-5 rounded border-2 flex items-center justify-center transition-all ${
                                  isSelected 
                                    ? 'bg-emerald-500 border-emerald-500' 
                                    : 'border-gray-300 bg-white'
                                }`}>
                                  {isSelected && <FiCheck className="w-3 h-3 text-white" />}
                                </div>
                                <span className={`font-mono text-sm ${isSelected ? 'text-gray-800 font-semibold' : 'text-gray-600'}`}>
                                  {id}
                                </span>
                              </div>
                              {isSelected && (
                                <span className="text-xs font-semibold bg-emerald-100 text-emerald-700 px-2 py-0.5 rounded-full">
                                  Selected
                                </span>
                              )}
                            </div>
                          );
                        })
                      )}
                    </div>

                    <div className="mt-3 flex items-center justify-between">
                      <p className="text-xs text-gray-500">
                        <span className="font-semibold">{hubchargers.length}</span> charger{hubchargers.length !== 1 ? 's' : ''} selected
                      </p>
                      <p className="text-xs text-gray-400">
                        Click to select/deselect
                      </p>
                    </div>
                  </div>
                </div>

                {/* Form Actions */}
                <div className="mt-8 pt-6 border-t border-gray-200 flex flex-col sm:flex-row gap-4 justify-end">
                  <button
                    type="button"
                    onClick={() => navigate('/listofhubs')}
                    className="px-8 py-3 rounded-xl text-gray-700 font-semibold border border-gray-300 hover:bg-gray-50 transition-all duration-200"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={loading}
                    className="px-8 py-3 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-500 text-white font-bold shadow-lg hover:shadow-xl hover:scale-105 transition transform disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2 justify-center"
                  >
                    {loading ? (
                      <>
                        <svg className="animate-spin h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        Adding Hub...
                      </>
                    ) : (
                      <>
                        <FiPlus className="w-5 h-5" />
                        Add Hub
                      </>
                    )}
                  </button>
                </div>
              </form>
            </div>
          </div>

          {/* Footer */}
          <div className="mt-8 text-center text-xs text-gray-400">
            © {new Date().getFullYear()} Admin Panel. All rights reserved.
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddHub;