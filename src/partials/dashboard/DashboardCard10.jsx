// import { useNavigate } from 'react-router-dom';
// import { toast } from 'react-toastify';
// import React, { useState, useEffect } from 'react';

// function DashboardCard10() {
//   const navigate = useNavigate();
//   const [userData, setuserData] = useState([]); // Initial state is an empty array
//   const [loading, setLoading] = useState(true); // State to handle loading status
//   const [currentPage, setCurrentPage] = useState(1); // Current page state
//   const [itemsPerPage] = useState(10); // Number of items per page

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
//             navigate("/")
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
//         const response = await fetch(`${rooturi}/admin/getalladmindata`, {
//           method: "GET",
//           headers: {
//             'Content-Type': 'application/json',
//             'apiauthkey': apikey,
//           },
//         });

//         const result = await response.json();
//         const data = Array.isArray(result.data) ? result.data : [];
//         setuserData(data);
//         setLoading(false);
//       } catch (error) {
//         console.error("Error fetching charger data:", error);
//         toast("Failed to fetch charger data");
//         setuserData([]);
//         setLoading(false);
//       }
//     };

//     fetchAllChargerData();
//   }, []);

//   return (
//     <div className="col-span-full xl:col-span-6 bg-white dark:bg-gray-800 shadow-sm rounded-xl">
//       <header className="px-5 py-4 border-b border-gray-100 dark:border-gray-700/60">
//         <h2 className="font-semibold text-gray-800 dark:text-gray-100">Customers</h2>
//       </header>      
//       <div className="p-3">

//         {/* Scrollable Table */}
//         <div className="overflow-x-auto">
//           <table className="table-auto w-full min-w-max">
//             {/* Table header */}
//             <thead className="text-xs font-semibold uppercase text-gray-400 dark:text-gray-500 bg-gray-50 dark:bg-gray-700 dark:bg-opacity-50">
//               <tr>
//                 <th className="p-2 whitespace-nowrap">
//                   <div className="font-semibold text-left">Name</div>
//                 </th>
//                 <th className="p-2 whitespace-nowrap">
//                   <div className="font-semibold text-left">Email</div>
//                 </th>
//                 <th className="p-2 whitespace-nowrap">
//                   <div className="font-semibold text-left">Role</div>
//                 </th>
//                 <th className="p-2 whitespace-nowrap">
//                   <div className="font-semibold text-center">Phonenumber</div>
//                 </th>
//               </tr>
//             </thead>
//             {/* Table body */}
//             <tbody className="text-sm divide-y divide-gray-100 dark:divide-gray-700/60">
//               {
//                 userData.map(customer => (
//                   <tr key={customer.id}>
//                     <td className="p-2 whitespace-nowrap">
//                       <div className="flex items-center">
//                         <div className="w-10 h-10 shrink-0 mr-2 sm:mr-3">
//                           {/* Placeholder for customer image */}
//                          {/* <div className="font-medium text-gray-800 dark:text-gray-100">{customer.id}</div> */}
//                         </div>
//                         <div className="font-medium text-gray-800 dark:text-gray-100">{customer.firstname}</div>
//                       </div>
//                     </td>
//                     <td className="p-2 whitespace-nowrap">
//                       <div className="text-left">{customer.email}</div>
//                     </td>
//                     <td className="p-2 whitespace-nowrap">
//                       <div className="text-left font-medium text-green-500">{customer.role}</div>
//                     </td>
//                     <td className="p-2 whitespace-nowrap">
//                       <div className="text-lg text-center">{customer.phonenumber}</div>
//                     </td>
//                   </tr>
//                 ))
//               }
//             </tbody>
//           </table>

//         </div>

//       </div>
//     </div>
//   );
// }

// export default DashboardCard10;
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import React, { useState, useEffect } from 'react';

function DashboardCard10() {
  const navigate = useNavigate();
  const [userData, setUserData] = useState([]);
  const [loading, setLoading] = useState(true);

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
          body: JSON.stringify({ token }),
        });

        const data = await res.json();
        if (!res.ok || data.user.userType !== "superadmin") {
          toast("Unauthorized access");
          navigate("/signin");
        }
      } catch {
        toast("Authentication failed");
        navigate("/signin");
      }
    };

    checkAuthentication();
  }, [navigate]);

  useEffect(() => {
    const fetchUsers = async () => {
      const rooturi = import.meta.env.VITE_ROOT_URI;
      const apikey = import.meta.env.VITE_API_KEY;

      try {
        const res = await fetch(`${rooturi}/admin/getalladmindata`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            apiauthkey: apikey,
          },
        });

        const result = await res.json();
        setUserData(Array.isArray(result.data) ? result.data : []);
      } catch {
        toast("Failed to load users");
        setUserData([]);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  return (
    <section className="col-span-full xl:col-span-6">
      <div
        className="relative rounded-2xl border border-gray-700/60
        bg-gradient-to-br from-gray-900 via-gray-900/90 to-gray-800
        shadow-[0_0_0_1px_rgba(14,165,233,0.15)]
        hover:shadow-[0_0_25px_rgba(14,165,233,0.25)]
        transition-all duration-300"
      >
        {/* Glow */}
        <div className="absolute -top-24 -left-24 w-56 h-56 bg-cyan-500/20 rounded-full blur-3xl"></div>

        {/* Header */}
        <div className="relative px-6 py-5 border-b border-gray-700">
          <h2 className="text-xl font-semibold text-white tracking-wide">
            Customers
          </h2>
          <p className="mt-1 text-sm text-gray-400">
            Registered platform users
          </p>
          <div className="mt-3 h-[2px] w-24 bg-gradient-to-r from-cyan-500 to-indigo-500 rounded-full"></div>
        </div>

        {/* Table */}
        <div className="relative overflow-hidden">
          <div className="overflow-x-auto overflow-y-auto max-h-[420px]">
            <table className="min-w-full text-sm">

              {/* Table Header */}
              <thead className="sticky top-0 z-10 bg-gray-900/95 backdrop-blur border-b border-gray-700">
                <tr className="text-xs uppercase tracking-widest text-gray-400">
                  <th className="px-6 py-4 text-left">User</th>
                  <th className="px-6 py-4 text-left">Email</th>
                  <th className="px-6 py-4 text-left">Role</th>
                  <th className="px-6 py-4 text-center">Phone</th>
                </tr>
              </thead>

              {/* Table Body */}
              <tbody className="divide-y divide-gray-800">
                {loading ? (
                  <tr>
                    <td colSpan="4" className="px-6 py-10 text-center text-gray-500">
                      Loading users…
                    </td>
                  </tr>
                ) : userData.length === 0 ? (
                  <tr>
                    <td colSpan="4" className="px-6 py-10 text-center text-gray-500">
                      No users found
                    </td>
                  </tr>
                ) : (
                  userData.map((user, index) => (
                    <tr
                      key={user.id || index}
                      className="group hover:bg-gray-800/60 transition"
                    >
                      {/* Name */}
                      <td className="px-6 py-4 flex items-center gap-3">
                        <div className="w-9 h-9 rounded-full bg-gradient-to-br from-cyan-500 to-indigo-500 flex items-center justify-center text-white font-semibold">
                          {user.firstname?.charAt(0)?.toUpperCase()}
                        </div>
                        <span className="font-medium text-white">
                          {user.firstname}
                        </span>
                      </td>

                      {/* Email */}
                      <td className="px-6 py-4 text-gray-400">
                        {user.email}
                      </td>

                      {/* Role */}
                      <td className="px-6 py-4">
                        <span className="inline-flex px-3 py-1 rounded-full text-xs font-semibold
                          bg-indigo-500/15 text-indigo-400 ring-1 ring-indigo-500/40">
                          {user.role}
                        </span>
                      </td>

                      {/* Phone */}
                      <td className="px-6 py-4 text-center text-gray-300">
                        {user.phonenumber}
                      </td>
                    </tr>
                  ))
                )}
              </tbody>

            </table>
          </div>
        </div>
      </div>
    </section>
  );
}

export default DashboardCard10;
