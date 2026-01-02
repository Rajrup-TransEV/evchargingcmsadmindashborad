// import React, { useState, useEffect } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { toast } from 'react-toastify';

// const UpdateHub = () => {
//   const [hubid, sethubid] = useState('');
//   const [hubname, sethubname] = useState('');
//   const [hubtariff, sethubtariff] = useState('');
//   const [hublocation, sethublocation] = useState('');
//   const [adminid, setadminid] = useState('');
//   const [addChargerId, setAddChargerId] = useState('');
//   const [removeChargerId, setRemoveChargerId] = useState('');
//   const [ipAddress, setIpAddress] = useState('');
//   const navigate = useNavigate();

//   // Auth check
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

//   // IP Tracking
//   useEffect(() => {
//     const fetchIpAddress = async () => {
//       const rooturi = import.meta.env.VITE_ROOT_URI;
//       const apikey = import.meta.env.VITE_API_KEY;

//       try {
//         const response = await fetch("https://api.ipify.org?format=json");
//         const data = await response.json();

//         if (data) {
//           setIpAddress(data.ip);
//           const currentDateTime = new Date().toISOString();
//           const pathfinder = "updatehub.jsx";
//           await fetch(`${rooturi}/admin/getip`, {
//             method: 'POST',
//             headers: {
//               'Content-Type': 'application/json',
//               'apiauthkey': apikey,
//             },
//             body: JSON.stringify({ ip: data.ip, datetime: currentDateTime, path: pathfinder })
//           });
//         }
//       } catch (error) {
//         console.error("Error fetching IP address:", error);
//       }
//     };

//     fetchIpAddress();
//   }, []);

//   // Submit handler
//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     const rooturi = import.meta.env.VITE_ROOT_URI;
//     const apikey = import.meta.env.VITE_API_KEY;

//     const dataToSubmit = {
//       hubid,
//       ...(hubname && { hubname }),
//       ...(hubtariff && { hubtariff }),
//       ...(hublocation && { hublocation }),
//       ...(adminid && { adminuid: adminid }),
//       ...(addChargerId && { addChargerId }),
//       ...(removeChargerId && { removeChargerId }),
//     };

//     try {
//       const response = await fetch(`${rooturi}/admin/updatehubdata`, {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//           'apiauthkey': apikey,
//         },
//         body: JSON.stringify(dataToSubmit),
//       });

//       if (response.ok) {
//         toast("Hub updated successfully!");
//       } else {
//         toast("Failed to update hub");
//       }
//     } catch (error) {
//       console.error("Error during hub update:", error);
//       toast("An error occurred while updating the hub");
//     }
//   };

//   const backtohome = (event) => {
//     event.preventDefault();
//     navigate("/");
//   };

//   return (
//     <section className="bg-white dark:bg-gray-900">
//       <div className="lg:grid lg:min-h-screen lg:grid-cols-12">
//         <aside className="relative block h-16 lg:order-last lg:col-span-5 lg:h-full xl:col-span-6">
//           <img
//             alt=""
//             src="https://res.cloudinary.com/djvmehyvd/image/upload/v1730708478/jjb6gtwippzrubjbykda.png"
//             className="absolute inset-0 h-full w-full object-cover"
//           />
//         </aside>

//         <main className="flex items-center justify-center px-8 py-8 sm:px-12 lg:col-span-7 lg:px-16 lg:py-12 xl:col-span-6">
//           <div className="max-w-xl lg:max-w-3xl">
//             <h1 className="mt-6 text-2xl font-bold text-gray-900 sm:text-3xl md:text-4xl dark:text-white">
//               Welcome to update hub section 🦑
//             </h1>
//             <p className="mt-4 leading-relaxed text-gray-500 dark:text-gray-400">
//               Through this section you can update selected hub data.
//             </p>

//             <form onSubmit={handleSubmit} className="mt-8 grid grid-cols-6 gap-6">

//               <div className="col-span-6">
//                 <label htmlFor="hubid" className="block text-sm font-medium text-gray-700 dark:text-gray-200">
//                   Hub ID
//                 </label>
//                 <input
//                   type="text"
//                   id="hubid"
//                   value={hubid}
//                   onChange={(e) => sethubid(e.target.value)}
//                   required
//                   className="mt-1 w-full rounded-md border-gray-200 bg-white text-sm text-gray-700 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-200"
//                 />
//               </div>

//               <div className="col-span-6 sm:col-span-3">
//                 <label htmlFor="hubname" className="block text-sm font-medium text-gray-700 dark:text-gray-200">
//                   Hub Name
//                 </label>
//                 <input
//                   type="text"
//                   id="hubname"
//                   value={hubname}
//                   onChange={(e) => sethubname(e.target.value)}
//                   className="mt-1 w-full rounded-md border-gray-200 bg-white text-sm text-gray-700 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-200"
//                 />
//               </div>

//               <div className="col-span-6 sm:col-span-3">
//                 <label htmlFor="hubtariff" className="block text-sm font-medium text-gray-700 dark:text-gray-200">
//                   Hub Tariff
//                 </label>
//                 <input
//                   type="text"
//                   id="hubtariff"
//                   value={hubtariff}
//                   onChange={(e) => sethubtariff(e.target.value)}
//                   className="mt-1 w-full rounded-md border-gray-200 bg-white text-sm text-gray-700 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-200"
//                 />
//               </div>

//               <div className="col-span-6 sm:col-span-3">
//                 <label htmlFor="hublocation" className="block text-sm font-medium text-gray-700 dark:text-gray-200">
//                   Hub Location
//                 </label>
//                 <input
//                   type="text"
//                   id="hublocation"
//                   value={hublocation}
//                   onChange={(e) => sethublocation(e.target.value)}
//                   className="mt-1 w-full rounded-md border-gray-200 bg-white text-sm text-gray-700 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-200"
//                 />
//               </div>

//               <div className="col-span-6 sm:col-span-3">
//                 <label htmlFor="adminid" className="block text-sm font-medium text-gray-700 dark:text-gray-200">
//                   Admin UID
//                 </label>
//                 <input
//                   type="text"
//                   id="adminid"
//                   value={adminid}
//                   onChange={(e) => setadminid(e.target.value)}
//                   className="mt-1 w-full rounded-md border-gray-200 bg-white text-sm text-gray-700 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-200"
//                 />
//               </div>

//               <div className="col-span-6 sm:col-span-3">
//                 <label htmlFor="addChargerId" className="block text-sm font-medium text-gray-700 dark:text-gray-200">
//                   Add Charger ID
//                 </label>
//                 <input
//                   type="text"
//                   id="addChargerId"
//                   value={addChargerId}
//                   onChange={(e) => setAddChargerId(e.target.value)}
//                   placeholder="Enter charger ID to add"
//                   className="mt-1 w-full rounded-md border-gray-200 bg-white text-sm text-gray-700 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-200"
//                 />
//               </div>

//               <div className="col-span-6 sm:col-span-3">
//                 <label htmlFor="removeChargerId" className="block text-sm font-medium text-gray-700 dark:text-gray-200">
//                   Remove Charger ID
//                 </label>
//                 <input
//                   type="text"
//                   id="removeChargerId"
//                   value={removeChargerId}
//                   onChange={(e) => setRemoveChargerId(e.target.value)}
//                   placeholder="Enter charger ID to remove"
//                   className="mt-1 w-full rounded-md border-gray-200 bg-white text-sm text-gray-700 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-200"
//                 />
//               </div>

//               <div className="col-span-6">
//                 <button
//                   type="submit"
//                   className="inline-block w-full rounded-md bg-blue-600 px-5 py-3 text-sm font-medium text-white shadow hover:bg-blue-700 focus:outline-none"
//                 >
//                   Update Hub
//                 </button>
//               </div>

//               <div className="col-span-6">
//                 <button
//                   className="relative inline-block text-white font-bold py-2 px-4 rounded-full overflow-hidden group transition-transform duration-300 transform hover:scale-105"
//                   onClick={backtohome}
//                 >
//                   <span className="absolute inset-0 bg-gradient-to-r from-teal-400 via-teal-500 to-teal-600 transform scale-110 group-hover:scale-100 transition duration-300"></span>
//                   <span className="relative z-10">HOME</span>
//                 </button>
//               </div>

//             </form>
//           </div>
//         </main>
//       </div>
//     </section>
//   );
// };

// export default UpdateHub;
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const UpdateHub = () => {
  const navigate = useNavigate();

  const [hubid, setHubId] = useState('');
  const [hubname, setHubName] = useState('');
  const [hubtariff, setHubTariff] = useState('');
  const [hublocation, setHubLocation] = useState('');
  const [adminid, setAdminId] = useState('');
  const [addChargerId, setAddChargerId] = useState('');
  const [removeChargerId, setRemoveChargerId] = useState('');

  /* ================= AUTH ================= */
  useEffect(() => {
    const checkAuth = async () => {
      const rooturi = import.meta.env.VITE_ROOT_URI;
      const apikey = import.meta.env.VITE_API_KEY;
      const token = localStorage.getItem("token");

      if (!token) return navigate("/signin");

      const res = await fetch(`${rooturi}/userauth/verifyuser`, {
        method: "POST",
        headers: { "Content-Type": "application/json", apiauthkey: apikey },
        body: JSON.stringify({ token })
      });

      const data = await res.json();
      if (!res.ok || data.user.userType !== "superadmin") {
        toast.error("Unauthorized access");
        navigate("/signin");
      }
    };

    checkAuth();
  }, [navigate]);

  /* ================= SUBMIT ================= */
  const handleSubmit = async (e) => {
    e.preventDefault();

    const rooturi = import.meta.env.VITE_ROOT_URI;
    const apikey = import.meta.env.VITE_API_KEY;

    const payload = {
      hubid,
      ...(hubname && { hubname }),
      ...(hubtariff && { hubtariff }),
      ...(hublocation && { hublocation }),
      ...(adminid && { adminuid: adminid }),
      ...(addChargerId && { addChargerId }),
      ...(removeChargerId && { removeChargerId }),
    };

    try {
      const res = await fetch(`${rooturi}/admin/updatehubdata`, {
        method: "POST",
        headers: { "Content-Type": "application/json", apiauthkey: apikey },
        body: JSON.stringify(payload)
      });

      res.ok ? toast.success("Hub updated successfully 🚀") : toast.error("Update failed");
    } catch {
      toast.error("Server error");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black flex items-center justify-center p-6">
      <div className="w-full max-w-5xl bg-white/10 backdrop-blur-xl rounded-2xl shadow-2xl p-8 border border-white/10">

        {/* HEADER */}
        <div className="mb-8 text-center">
          <h1 className="text-4xl font-extrabold text-white tracking-wide">
            Update Hub
          </h1>
          <p className="text-gray-300 mt-2">
            Modify hub details, tariffs and charger mappings
          </p>
        </div>

        {/* FORM */}
        <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">

          {/* HUB ID */}
          <div className="md:col-span-2">
            <label className="text-sm text-gray-300 font-semibold">Hub ID *</label>
            <input
              required
              value={hubid}
              onChange={e => setHubId(e.target.value)}
              className="mt-1 w-full rounded-lg bg-black/40 border border-gray-600 text-white px-4 py-3 focus:ring-2 focus:ring-teal-500 outline-none"
              placeholder="Enter Hub UID"
            />
          </div>

          <Input label="Hub Name" value={hubname} setValue={setHubName} />
          <Input label="Hub Tariff (₹)" value={hubtariff} setValue={setHubTariff} />
          <Input label="Hub Location" value={hublocation} setValue={setHubLocation} />
          <Input label="Admin UID" value={adminid} setValue={setAdminId} />

          {/* CHARGERS */}
          <div className="md:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-6">
            <Input label="Add Charger ID" value={addChargerId} setValue={setAddChargerId} />
            <Input label="Remove Charger ID" value={removeChargerId} setValue={setRemoveChargerId} />
          </div>

          {/* ACTIONS */}
          <div className="md:col-span-2 flex flex-col sm:flex-row gap-4 mt-6">
            <button
              type="submit"
              className="flex-1 py-3 rounded-xl font-bold text-white bg-gradient-to-r from-teal-500 to-blue-600 hover:scale-105 transition shadow-lg"
            >
              UPDATE HUB
            </button>

            <button
              type="button"
              onClick={() => navigate("/")}
              className="flex-1 py-3 rounded-xl font-bold text-white bg-gradient-to-r from-gray-600 to-gray-800 hover:scale-105 transition shadow-lg"
            >
              HOME
            </button>
          </div>

        </form>
      </div>
    </div>
  );
};

/* ===== Reusable Input ===== */
const Input = ({ label, value, setValue }) => (
  <div>
    <label className="text-sm text-gray-300 font-semibold">{label}</label>
    <input
      value={value}
      onChange={e => setValue(e.target.value)}
      className="mt-1 w-full rounded-lg bg-black/40 border border-gray-600 text-white px-4 py-3 focus:ring-2 focus:ring-teal-500 outline-none"
    />
  </div>
);

export default UpdateHub;
