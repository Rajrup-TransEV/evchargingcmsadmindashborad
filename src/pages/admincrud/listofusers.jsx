// import React, { useState, useEffect } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { toast } from 'react-toastify';

// const ListofUsers = () => {
//   const navigate = useNavigate();
//   const [userData, setuserData] = useState([]); // Initial state is an empty array
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

//   const handleDelete = async (uid) => {
//     const rooturi = import.meta.env.VITE_ROOT_URI;
//     const apikey = import.meta.env.VITE_API_KEY;

//     try {
//       const response = await fetch(`${rooturi}/admin/deleteadmindata`, {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//           'apiauthkey': apikey,
//         },
//         body: JSON.stringify({ uid }), // Pass uid in request body
//       });

//       if (response.ok) {
//         toast.success("User deleted successfully");
//         // Remove deleted user from state
//         setuserData((prevUsers) => prevUsers.filter(user => user.uid !== uid));
//       } else {
//         toast.error("Failed to delete user");
//       }
//     } catch (error) {
//       console.error("Error deleting user:", error);
//       toast.error("An error occurred while deleting the user");
//     }
//   };
//   // Calculate the current chargers to display
//   const indexOfLastUser = currentPage * itemsPerPage;
//   const indexOfFirstUser = indexOfLastUser - itemsPerPage;
//   const currentUsers = userData.slice(indexOfFirstUser, indexOfLastUser);

//   // Calculate total pages
//   const totalPages = Math.ceil(userData.length / itemsPerPage);
// //charger details
// const handleUidClick = (uid) => {
//   navigate(`/userdetails/${uid}`);
// };

// const [ipAddress, setIpAddress] = useState('');
// //ip tracking facility
// useEffect(() => {
//   // Fetch the IP address from the API
//   const fetchIpAddress = async () => {
//     const rooturi = import.meta.env.VITE_ROOT_URI;
//     const apikey = import.meta.env.VITE_API_KEY;
//       try {
//           const response = await fetch("https://api.ipify.org?format=json");
//           const data = await response.json();
//           console.log(data)
//           // Set the IP address in state
//           if(data){
//             setIpAddress(data.ip);
//             const currentDateTime = new Date().toISOString();
//             const pathfinder = "listofusers.jsx"
//             const resp = await fetch(`${rooturi}/admin/getip`,{
//                 method: 'POST',
//             headers: {
//                 'Content-Type': 'application/json',
//                 'apiauthkey': apikey,
//             },
//             body: JSON.stringify({ip:data.ip,datetime:currentDateTime,path:pathfinder})
//             })
//           }
      

//       } catch (error) {
//           console.error("Error fetching IP address:", error);
//       }
//   };

//   fetchIpAddress();
// }, []); // Empty dependency array means this runs once after the initial render


// const backtohome = (event) => {
//   event.preventDefault(); // Prevent default action
//   navigate("/"); // Navigate to home
// }


//   return (
//     <div className="rounded-lg border border-gray-200 p-4 sm:p-6 md:p-8">
//       <div className="overflow-x-auto">
//         <table className="min-w-full divide-y-2 divide-gray-200 bg-white text-sm">
//           <thead className="ltr:text-left rtl:text-right">
//             <tr>
//               {[
//                 'id', 'uid', 'firstname', 'lastname', 'email', 
//                 'password', 'address', 'phonenumber', 'role',
//                 'designation', 'createdAt', 'updatedAt', 'Actions'
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
//                       className="text-blue-600 hover:underline" 
//                       onClick={() => handleUidClick(user.uid)}
//                     >
//                       {user.uid}
//                     </button>,user.firstname,
//                       user.lastname, user.email, user.password, user.address,
//                       user.phonenumber, user.role, user.designation,
//                      user.createdAt,user.updatedAt,
//                      <button 
//                         className="text-red-600 hover:underline" 
//                         onClick={() => handleDelete(user.uid)}
//                       >
//                         Delete
//                       </button>
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
//               <svg
//                 xmlns="http://www.w3.org/2000/svg"
//                 className="w-3 h-3"
//                 viewBox="0 0 20 20"
//                 fill="currentColor"
//               >
//                 <path
//                   fillRule="evenodd"
//                   d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
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

// export default ListofUsers;
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const ListofUsers = () => {
  const navigate = useNavigate();
  const [userData, setuserData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);
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

  /* ================= FETCH USERS ================= */
  useEffect(() => {
    const fetchAllUsers = async () => {
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
        setuserData(Array.isArray(result.data) ? result.data : []);
      } catch {
        toast("Failed to fetch users");
        setuserData([]);
      } finally {
        setLoading(false);
      }
    };
    fetchAllUsers();
  }, []);

  /* ================= DELETE ================= */
  const handleDelete = async (uid) => {
    const rooturi = import.meta.env.VITE_ROOT_URI;
    const apikey = import.meta.env.VITE_API_KEY;

    try {
      const res = await fetch(`${rooturi}/admin/deleteadmindata`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          apiauthkey: apikey,
        },
        body: JSON.stringify({ uid }),
      });

      if (res.ok) {
        toast.success("User deleted");
        setuserData(prev => prev.filter(u => u.uid !== uid));
      } else {
        toast.error("Delete failed");
      }
    } catch {
      toast.error("Delete error");
    }
  };

  /* ================= PAGINATION ================= */
  const indexOfLastUser = currentPage * itemsPerPage;
  const indexOfFirstUser = indexOfLastUser - itemsPerPage;
  const currentUsers = userData.slice(indexOfFirstUser, indexOfLastUser);
  const totalPages = Math.ceil(userData.length / itemsPerPage);

  const handleUidClick = (uid) => navigate(`/userdetails/${uid}`);

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
            headers: {
              "Content-Type": "application/json",
              apiauthkey: apikey,
            },
            body: JSON.stringify({
              ip: data.ip,
              datetime: new Date().toISOString(),
              path: "listofusers.jsx",
            }),
          });
        }
      } catch {}
    };
    fetchIpAddress();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-slate-900 to-gray-900 p-6">

      {/* HEADER */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-extrabold text-white">
          👥 Admin Users List
        </h1>

        <button
          onClick={() => navigate("/")}
          className="rounded-full bg-gradient-to-r from-teal-400 to-indigo-600 px-6 py-2 text-white font-bold hover:scale-105 transition"
        >
          HOME
        </button>
      </div>

      {/* TABLE CARD */}
      <div className="rounded-3xl bg-white/10 backdrop-blur-xl border border-white/20 shadow-2xl overflow-hidden">

        <div className="overflow-x-auto">
          <table className="min-w-full text-sm text-gray-200">
            <thead className="sticky top-0 bg-black/50 backdrop-blur-xl">
              <tr>
                {[
                  "ID", "UID", "First Name", "Last Name", "Email",
                  "Password", "Address", "Phone", "Role",
                  "Designation", "Created", "Updated", "Actions"
                ].map(h => (
                  <th key={h} className="px-4 py-3 text-left font-semibold text-teal-300">
                    {h}
                  </th>
                ))}
              </tr>
            </thead>

            <tbody className="divide-y divide-white/10">
              {loading ? (
                <tr>
                  <td colSpan="13" className="py-10 text-center">
                    <span className="animate-pulse text-gray-400">Loading users...</span>
                  </td>
                </tr>
              ) : currentUsers.length ? (
                currentUsers.map(user => (
                  <tr key={user.id} className="hover:bg-white/5 transition">
                    <td className="px-4 py-3">{user.id}</td>

                    <td className="px-4 py-3">
                      <button
                        onClick={() => handleUidClick(user.uid)}
                        className="rounded-full bg-indigo-600/20 px-3 py-1 text-indigo-300 hover:bg-indigo-600/40"
                      >
                        {user.uid}
                      </button>
                    </td>

                    <td className="px-4 py-3">{user.firstname}</td>
                    <td className="px-4 py-3">{user.lastname}</td>
                    <td className="px-4 py-3">{user.email}</td>
                    <td className="px-4 py-3">{user.password}</td>
                    <td className="px-4 py-3">{user.address}</td>
                    <td className="px-4 py-3">{user.phonenumber}</td>
                    <td className="px-4 py-3">{user.role}</td>
                    <td className="px-4 py-3">{user.designation}</td>
                    <td className="px-4 py-3">{user.createdAt}</td>
                    <td className="px-4 py-3">{user.updatedAt}</td>

                    <td className="px-4 py-3">
                      <button
                        onClick={() => handleDelete(user.uid)}
                        className="rounded-full bg-red-600/20 px-4 py-1 text-red-400 hover:bg-red-600/40"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="13" className="py-10 text-center text-gray-400">
                    No users found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* PAGINATION */}
        <div className="flex justify-end gap-2 p-4">
          {Array.from({ length: totalPages }, (_, i) => (
            <button
              key={i}
              onClick={() => setCurrentPage(i + 1)}
              className={`w-9 h-9 rounded-full font-bold transition ${
                currentPage === i + 1
                  ? "bg-teal-500 text-black"
                  : "bg-white/10 text-white hover:bg-white/20"
              }`}
            >
              {i + 1}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ListofUsers;
