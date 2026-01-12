// import React, { useState, useEffect } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { toast } from 'react-toastify';

// const ListofAppUser = () => {
//     const navigate = useNavigate();
//     const [userData, setuserData] = useState([]);
//     const [loading, setLoading] = useState(true);
//     const [currentPage, setCurrentPage] = useState(1);
//     const [itemsPerPage] = useState(50);

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
//                     headers: { 'Content-Type': 'application/json', 'apiauthkey': apikey },
//                     body: JSON.stringify({ token: gettoken })
//                 });

//                 const data = await response.json();
//                 if (!response.ok || data.user.userType !== "superadmin") {
//                     toast("You have no authorization to view this page");
//                     navigate("/signin");
//                 }
//             } catch (error) {
//                 console.error(error);
//                 toast("Authentication failed");
//                 navigate("/signin");
//             }
//         };

//         checkAuthentication();
//     }, [navigate]);

//     useEffect(() => {
//         const fetchAllUserData = async () => {
//             const rooturi = import.meta.env.VITE_ROOT_URI;
//             const apikey = import.meta.env.VITE_API_KEY;

//             try {
//                 const response = await fetch(`${rooturi}/users/getallappuserdata`, {
//                     method: "GET",
//                     headers: { 'Content-Type': 'application/json', 'apiauthkey': apikey },
//                 });

//                 const result = await response.json();
//                 const data = Array.isArray(result.userprofile) ? result.userprofile : [];
//                 setuserData(data);
//                 setLoading(false);
//             } catch (error) {
//                 console.error(error);
//                 toast("Failed to fetch user data");
//                 setuserData([]);
//                 setLoading(false);
//             }
//         };

//         fetchAllUserData();
//     }, []);

//     const handleDelete = async (uid) => {
//         const rooturi = import.meta.env.VITE_ROOT_URI;
//         const apikey = import.meta.env.VITE_API_KEY;

//         try {
//             const response = await fetch(`${rooturi}/users/deleteauserdata`, {
//                 method: 'POST',
//                 headers: { 'Content-Type': 'application/json', 'apiauthkey': apikey },
//                 body: JSON.stringify({ userid: uid }),
//             });

//             if (response.ok) toast.success("User deleted successfully");
//             else toast.error("Failed to delete user");
//         } catch (error) {
//             console.error(error);
//             toast.error("An error occurred while deleting the user");
//         }
//     };

//     const indexOfLastUser = currentPage * itemsPerPage;
//     const indexOfFirstUser = indexOfLastUser - itemsPerPage;
//     const currentUsers = userData.slice(indexOfFirstUser, indexOfLastUser);
//     const totalPages = Math.ceil(userData.length / itemsPerPage);

//     const handleUidClick = (uid) => navigate(`/appuserdetails/${uid}`);
//     const handelUpdate = (uid) => navigate(`/updateuser/${uid}`);

//     return (
//         <div className="min-h-screen bg-gray-900 p-6">
//             <h1 className="text-4xl font-extrabold text-white mb-8 text-center tracking-widest">
//                 🔥 App Users Dashboard
//             </h1>

//             <div className="overflow-x-auto rounded-xl shadow-2xl bg-gray-800 border border-gray-700">
//                 <table className="min-w-full divide-y divide-gray-700">
//                     <thead className="bg-gray-700">
//                         <tr>
//                             {['Profile', 'UID', 'Username', 'Email', 'Phone', 'Actions'].map((heading) => (
//                                 <th
//                                     key={heading}
//                                     className="px-6 py-4 text-left text-sm font-bold text-white uppercase tracking-wider"
//                                 >
//                                     {heading}
//                                 </th>
//                             ))}
//                         </tr>
//                     </thead>
//                     <tbody className="divide-y divide-gray-700">
//                         {loading ? (
//                             <tr>
//                                 <td colSpan="6" className="px-6 py-4 text-center text-gray-400 font-bold">
//                                     Loading...
//                                 </td>
//                             </tr>
//                         ) : (
//                             currentUsers.length > 0 ? (
//                                 currentUsers.map((user) => (
//                                     <tr key={user.uid} className="hover:bg-gray-700 transition-all duration-200 cursor-pointer">
//                                         <td className="px-6 py-3">
//                                             <img
//                                                 src={user.profilepicture || 'default-profile.png'}
//                                                 alt="Profile"
//                                                 className="rounded-full w-14 h-14 border-2 border-blue-500 object-cover"
//                                             />
//                                         </td>
//                                         <td
//                                             className="px-6 py-3 text-blue-400 font-bold hover:underline"
//                                             onClick={() => handleUidClick(user.uid)}
//                                         >
//                                             {user.uid}
//                                         </td>
//                                         <td className="px-6 py-3 text-white font-semibold">{user.username}</td>
//                                         <td className="px-6 py-3 text-white">{user.email}</td>
//                                         <td className="px-6 py-3 text-white">{user.phonenumber}</td>
//                                         <td className="px-6 py-3 flex gap-2">
//                                             <button
//                                                 className="px-4 py-1 font-bold text-white bg-green-500 rounded-lg hover:bg-green-600 transition-all"
//                                                 onClick={() => handelUpdate(user.uid)}
//                                             >
//                                                 Update
//                                             </button>
//                                             <button
//                                                 className="px-4 py-1 font-bold text-white bg-red-500 rounded-lg hover:bg-red-600 transition-all"
//                                                 onClick={() => handleDelete(user.uid)}
//                                             >
//                                                 Delete
//                                             </button>
//                                         </td>
//                                     </tr>
//                                 ))
//                             ) : (
//                                 <tr>
//                                     <td colSpan="6" className="px-6 py-4 text-center text-gray-400 font-bold">
//                                         No data available
//                                     </td>
//                                 </tr>
//                             )
//                         )}
//                     </tbody>
//                 </table>
//             </div>

//             {/* Pagination */}
//             <div className="mt-8 flex justify-center items-center gap-2">
//                 <button
//                     onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
//                     disabled={currentPage === 1}
//                     className="px-4 py-2 font-bold text-white bg-blue-600 rounded-lg hover:bg-blue-700 disabled:opacity-50 transition"
//                 >
//                     Prev
//                 </button>
//                 {Array.from({ length: totalPages }, (_, index) => (
//                     <button
//                         key={index}
//                         onClick={() => setCurrentPage(index + 1)}
//                         className={`px-4 py-2 font-bold rounded-lg ${currentPage === index + 1 ? 'bg-yellow-500 text-gray-900' : 'bg-gray-700 text-white hover:bg-gray-600'} transition`}
//                     >
//                         {index + 1}
//                     </button>
//                 ))}
//                 <button
//                     onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
//                     disabled={currentPage === totalPages}
//                     className="px-4 py-2 font-bold text-white bg-blue-600 rounded-lg hover:bg-blue-700 disabled:opacity-50 transition"
//                 >
//                     Next
//                 </button>
//             </div>
//         </div>
//     );
// };

// export default ListofAppUser;


import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const ListofAppUser = () => {
  const navigate = useNavigate();
  const [userData, setUserData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(50);

  // Authentication
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
          toast("You have no authorization to view this page");
          navigate("/signin");
        }
      } catch (error) {
        console.error(error);
        toast("Authentication failed");
        navigate("/signin");
      }
    };
    checkAuthentication();
  }, [navigate]);

  // Fetch Users
  useEffect(() => {
    const fetchAllUserData = async () => {
      const rooturi = import.meta.env.VITE_ROOT_URI;
      const apikey = import.meta.env.VITE_API_KEY;
      try {
        const response = await fetch(`${rooturi}/users/getallappuserdata`, {
          method: "GET",
          headers: { 'Content-Type': 'application/json', 'apiauthkey': apikey },
        });
        const result = await response.json();
        const data = Array.isArray(result.userprofile) ? result.userprofile : [];
        setUserData(data);
        setLoading(false);
      } catch (error) {
        console.error(error);
        toast("Failed to fetch user data");
        setUserData([]);
        setLoading(false);
      }
    };
    fetchAllUserData();
  }, []);

  // Delete User
  const handleDelete = async (uid) => {
    const rooturi = import.meta.env.VITE_ROOT_URI;
    const apikey = import.meta.env.VITE_API_KEY;

    if (!window.confirm("Are you sure you want to delete this user?")) return toast.info("Delete canceled");

    try {
      const response = await fetch(`${rooturi}/users/deleteauserdata`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'apiauthkey': apikey },
        body: JSON.stringify({ userid: uid }),
      });

      if (response.ok) {
        toast.success("User deleted successfully");
        setUserData(prev => prev.filter(user => user.uid !== uid));
      } else toast.error("Failed to delete user");
    } catch (error) {
      console.error(error);
      toast.error("Error deleting user");
    }
  };

  const indexOfLastUser = currentPage * itemsPerPage;
  const indexOfFirstUser = indexOfLastUser - itemsPerPage;
  const currentUsers = userData.slice(indexOfFirstUser, indexOfLastUser);
  const totalPages = Math.ceil(userData.length / itemsPerPage);

  const handleUidClick = (uid) => navigate(`/appuserdetails/${uid}`);
  const handleUpdate = (uid) => navigate(`/updateuser/${uid}`);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 p-6">
      <h1 className="text-5xl font-extrabold text-white mb-12 text-center tracking-wide animate-pulse">
        🔥 App Users Dashboard
      </h1>

      {/* Glass Table */}
      <div className="overflow-x-auto rounded-3xl shadow-2xl bg-gray-800/60 backdrop-blur-xl border border-gray-700">
        <table className="min-w-full divide-y divide-gray-700 text-white">
          <thead className="bg-gradient-to-r from-blue-600 via-blue-700 to-blue-800">
            <tr>
              {['Profile', 'UID', 'Username', 'Email', 'Phone', 'Actions'].map((heading) => (
                <th key={heading} className="px-6 py-4 text-left text-sm font-bold uppercase tracking-wider">
                  {heading}
                </th>
              ))}
            </tr>
          </thead>

          <tbody className="divide-y divide-gray-700">
            {loading ? (
              <tr>
                <td colSpan="6" className="px-6 py-4 text-center text-gray-300 font-bold">
                  Loading...
                </td>
              </tr>
            ) : currentUsers.length > 0 ? (
              currentUsers.map((user, idx) => (
                <tr key={user.uid} className={`transition-all duration-300 hover:bg-gray-700/50 ${idx % 2 === 0 ? 'bg-gray-800/50' : 'bg-gray-800/40'}`}>
                  <td className="px-6 py-3">
                    <img
                      src={user.profilepicture || 'default-profile.png'}
                      alt="Profile"
                      className="rounded-full w-14 h-14 border-2 border-teal-400 object-cover shadow-lg hover:scale-110 transition-transform"
                    />
                  </td>
                  <td
                    className="px-6 py-3 text-teal-400 font-bold cursor-pointer hover:underline hover:text-teal-300"
                    onClick={() => handleUidClick(user.uid)}
                  >
                    {user.uid}
                  </td>
                  <td className="px-6 py-3 font-semibold">{user.username}</td>
                  <td className="px-6 py-3">{user.email}</td>
                  <td className="px-6 py-3">{user.phonenumber}</td>
                  <td className="px-6 py-3 flex gap-2">
                    <button
                      className="px-4 py-2 font-bold text-white bg-gradient-to-r from-green-400 to-teal-500 rounded-xl shadow-lg hover:scale-105 hover:from-green-500 hover:to-teal-600 transition-all"
                      onClick={() => handleUpdate(user.uid)}
                    >
                      Update
                    </button>
                    <button
                      className="px-4 py-2 font-bold text-white bg-gradient-to-r from-red-400 to-pink-500 rounded-xl shadow-lg hover:scale-105 hover:from-red-500 hover:to-pink-600 transition-all"
                      onClick={() => handleDelete(user.uid)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="6" className="px-6 py-4 text-center text-gray-400 font-bold">
                  No data available
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="mt-8 flex justify-center items-center gap-3 flex-wrap">
        <button
          onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
          disabled={currentPage === 1}
          className="px-5 py-2 font-bold text-white bg-blue-600 rounded-full hover:bg-blue-700 disabled:opacity-50 transition-all"
        >
          Prev
        </button>
        {Array.from({ length: totalPages }, (_, i) => (
          <button
            key={i}
            onClick={() => setCurrentPage(i + 1)}
            className={`px-5 py-2 font-bold rounded-full transition-all ${
              currentPage === i + 1
                ? 'bg-yellow-400 text-gray-900 shadow-2xl scale-105'
                : 'bg-gray-700 text-white hover:bg-gray-600'
            }`}
          >
            {i + 1}
          </button>
        ))}
        <button
          onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
          disabled={currentPage === totalPages}
          className="px-5 py-2 font-bold text-white bg-blue-600 rounded-full hover:bg-blue-700 disabled:opacity-50 transition-all"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default ListofAppUser;
