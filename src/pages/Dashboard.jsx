// import React, { useState, useEffect } from 'react';
// import { useNavigate } from 'react-router-dom';
// import Sidebar from '../partials/Sidebar';
// import Header from '../partials/Header';
// import FilterButton from '../components/DropdownFilter';
// import Datepicker from '../components/Datepicker';
// import DashboardCard01 from '../partials/dashboard/DashboardCard01';
// import DashboardCard02 from '../partials/dashboard/DashboardCard02';
// import DashboardCard03 from '../partials/dashboard/DashboardCard03';
// import DashboardCard04 from '../partials/dashboard/DashboardCard04';
// import DashboardCard05 from '../partials/dashboard/DashboardCard05';
// import DashboardCard06 from '../partials/dashboard/DashboardCard06';
// import DashboardCard07 from '../partials/dashboard/DashboardCard07';
// import DashboardCard08 from '../partials/dashboard/DashboardCard08';
// import DashboardCard09 from '../partials/dashboard/DashboardCard09';
// import DashboardCard10 from '../partials/dashboard/DashboardCard10';
// import DashboardCard11 from '../partials/dashboard/DashboardCard11';
// import DashboardCard12 from '../partials/dashboard/DashboardCard12';
// import DashboardCard13 from '../partials/dashboard/DashboardCard13';
// // import Banner from '../partials/Banner';
// import { toast } from 'react-toastify';

// function Dashboard() {
//   const [sidebarOpen, setSidebarOpen] = useState(false);
//   const navigate = useNavigate();
//   const [ipAddress, setIpAddress] = useState('');

//   // Authorization effect
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

//   // Fetch IP address
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
//           const pathfinder = "dashboard.jsx";
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

//   return (
//     <div className="relative flex h-screen overflow-hidden bg-cover bg-center" style={{ backgroundImage: "url('https://res.cloudinary.com/djvmehyvd/image/upload/v1730708478/jjb6gtwippzrubjbykda.png')" }}>
//       <div className="absolute inset-0 bg-black opacity-50 backdrop-blur-md"></div>

//       {/* Sidebar */}
//       <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

//       {/* Content area */}
//       <div className="relative flex flex-col flex-1 overflow-y-auto overflow-x-hidden z-10">
        
//         {/* Site header */}
//         <Header sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

//         <main className="grow">
//           <div className="px-4 sm:px-6 lg:px-8 py-8 w-full max-w-9xl mx-auto">

//             {/* Dashboard actions */}
//             <div className="sm:flex sm:justify-between sm:items-center mb-8">

//               {/* Left: Title */}
//               <div className="mb-4 sm:mb-0">
//                 <h1 className="text-2xl md:text-3xl text-gray-800 dark:text-gray-100 font-bold">Dashboard</h1>
//                 <p>Your IP is {ipAddress}</p>
//               </div>

//               {/* Right: Actions */}
//               <div className="grid grid-flow-col sm:auto-cols-max justify-start sm:justify-end gap-2">
//                 {/* Filter button */}
//                 <FilterButton align="right" />
//                 {/* Datepicker built with flatpickr */}
//                 <Datepicker align="right" />
//                 {/* Add view button */}
//                 <button className="btn bg-gray-900 text-gray-100 hover:bg-gray-800 dark:bg-gray-100 dark:text-gray-800 dark:hover:bg-white">
//                   <svg className="fill-current shrink-0 xs:hidden" width="16" height="16" viewBox="0 0 16 16">
//                     <path d="M15 7H9V1c0-.6-.4-1-1-1S7 .4 7 1v6H1c-.6 0-1 .4-1 1s.4 1 1 1h6v6c0 .6.4 1 1 1s1-.4 1-1V9h6c.6 0 1-.4 1-1s-.4-1-1-1z" />
//                   </svg>
//                   <span className="max-xs:sr-only">Add View</span>
//                 </button>                
//               </div>

//             </div>

//             {/* Cards */}
//             <div className="grid grid-cols-12 gap-6">
//               {/* Line chart (Acme Plus) */}
//               <DashboardCard01 />
//               {/* Line chart (Acme Advanced) */}
//               <DashboardCard02 />
//               {/* Line chart (Acme Professional) */}
//               <DashboardCard03 />
//               {/* Table (Top Channels) */}
//               <DashboardCard07 />
//               {/* Card (Customers) */}
//               <DashboardCard10 />
//               {/* Card (Income/Expenses) */}
//               <DashboardCard13 />
//             </div>

//           </div>
//         </main>

//         {/* Uncomment if needed */}
//         {/* <Banner /> */}

//       </div>
//     </div>
//   );
// }

// export default Dashboard;
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Sidebar from '../partials/Sidebar';
import Header from '../partials/Header';
import FilterButton from '../components/DropdownFilter';
import Datepicker from '../components/Datepicker';

import DashboardCard01 from '../partials/dashboard/DashboardCard01';
import DashboardCard02 from '../partials/dashboard/DashboardCard02';
import DashboardCard03 from '../partials/dashboard/DashboardCard03';
import DashboardCard07 from '../partials/dashboard/DashboardCard07';
import DashboardCard10 from '../partials/dashboard/DashboardCard10';
import DashboardCard13 from '../partials/dashboard/DashboardCard13';

import { toast } from 'react-toastify';

function Dashboard() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const navigate = useNavigate();
  const [ipAddress, setIpAddress] = useState('');

  /* ================= FORCE DARK THEME ================= */
  useEffect(() => {
    document.documentElement.classList.add('dark'); // always dark
    document.documentElement.classList.remove('light');
    localStorage.setItem('theme', 'dark');
  }, []);

  /* ================= AUTH ================= */
  useEffect(() => {
    const checkAuthentication = async () => {
      const rooturi = import.meta.env.VITE_ROOT_URI;
      const apikey = import.meta.env.VITE_API_KEY;

      try {
        const token = localStorage.getItem('token');
        if (!token) return navigate('/signin');

        const res = await fetch(`${rooturi}/userauth/verifyuser`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            apiauthkey: apikey,
          },
          body: JSON.stringify({ token }),
        });

        const data = await res.json();

        if (!res.ok || data.user.userType !== 'superadmin') {
          toast.error('Unauthorized access');
          navigate('/signin');
        }
      } catch {
        toast.error('Authentication failed');
        navigate('/signin');
      }
    };

    checkAuthentication();
  }, [navigate]);

  /* ================= IP ================= */
  useEffect(() => {
    const fetchIp = async () => {
      try {
        const res = await fetch('https://api.ipify.org?format=json');
        const data = await res.json();
        setIpAddress(data.ip);
      } catch {}
    };
    fetchIp();
  }, []);

  return (
    <div className="relative flex h-screen overflow-hidden bg-gradient-to-br from-black via-gray-900 to-black text-gray-200">

      {/* Background glow */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(99,102,241,0.25),transparent_60%)] pointer-events-none"></div>

      {/* Sidebar */}
      <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

      <div className="relative flex flex-col flex-1 overflow-y-auto z-10">

        {/* Header (still used, but remove toggle inside Header.jsx if exists) */}
        <Header sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

        <main className="grow">
          <div className="px-6 py-8 max-w-[1600px] mx-auto">

            {/* ===== Top Section ===== */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6 mb-10">

              <div>
                <h1 className="text-3xl font-bold text-white tracking-tight">
                  Admin Dashboard
                </h1>
                <div className="inline-flex mt-2 px-3 py-1 rounded-full bg-white/10 text-sm text-gray-300">
                  🌐 IP Address:
                  <span className="ml-2 font-medium text-indigo-400">{ipAddress}</span>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <FilterButton align="right" />
                <Datepicker align="right" />
                <button className="px-4 py-2 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white transition">
                  Add View
                </button>
              </div>

            </div>

            {/* ===== Cards Grid ===== */}
            <div className="grid grid-cols-12 gap-6">
              <DashboardCard01 />
              <DashboardCard02 />
              <DashboardCard03 />
              <DashboardCard07 />
              <DashboardCard10 />
              <DashboardCard13 />
            </div>

          </div>
        </main>
      </div>
    </div>
  );
}

export default Dashboard;
