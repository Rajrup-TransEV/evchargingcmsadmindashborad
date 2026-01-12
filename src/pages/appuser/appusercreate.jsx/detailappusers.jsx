// import React, { useState, useEffect } from 'react';
// import { useParams, useNavigate } from 'react-router-dom';
// import { toast } from 'react-toastify';

// const DetailsAppUser = () => {
//     const { uid } = useParams();
//     const navigate = useNavigate();

//     // State declarations
//     const [userData, setUserData] = useState(null);
//     const [loading, setLoading] = useState(true);
//     const [pfimage,setpfimage]=useState('');
//     const [ipAddress, setIpAddress] = useState('');

//     // Check authentication
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

//     // IP tracking facility
//     useEffect(() => {
//         const fetchIpAddress = async () => {
//             const rooturi = import.meta.env.VITE_ROOT_URI;
//             const apikey = import.meta.env.VITE_API_KEY;

//             try {
//                 const response = await fetch("https://api.ipify.org?format=json");
//                 const data = await response.json();

//                 if (data) {
//                     setIpAddress(data.ip);
//                     const currentDateTime = new Date().toISOString();
//                     const pathfinder = "detailsappusers.jsx";

//                     await fetch(`${rooturi}/admin/getip`, {
//                         method: 'POST',
//                         headers: {
//                             'Content-Type': 'application/json',
//                             'apiauthkey': apikey,
//                         },
//                         body: JSON.stringify({ ip: data.ip, datetime: currentDateTime, path: pathfinder })
//                     });
//                 }
//             } catch (error) {
//                 console.error("Error fetching IP address:", error);
//             }
//         };

//         fetchIpAddress();
//     }, []); // Runs once after initial render

//     // Fetch single user details
//     useEffect(() => {
//         const fetchsingulardata = async () => {
//             const rooturi = import.meta.env.VITE_ROOT_URI;
//             const apikey = import.meta.env.VITE_API_KEY;

//             try {
//                 const response = await fetch(`${rooturi}/users/puprofile`, {
//                     method: "POST",
//                     headers: {
//                         'Content-Type': 'application/json',
//                         'apiauthkey': apikey,
//                     },
//                     body: JSON.stringify({ userid: uid })
//                 });

//                 if (response.ok) {
//                     const result = await response.json();
//                     setUserData(result.data);
//                     setpfimage(result.pfimage)
//                 } else {
//                     toast("Failed to fetch user details");
//                 }
//             } catch (error) {
//                 console.error("Error during data fetch:", error);
//                 toast("An error occurred while fetching data");
//             } finally {
//                 setLoading(false);
//             }
//         };

//         fetchsingulardata();
//     }, [uid]);

//     // Render loading state or user details
//     if (loading) return <div>Loading...</div>;

//     return (
//         <div className="container mx-auto py-8">
//             <div className="py-11">
//                 <button 
//                     className="relative inline-block text-white font-bold py-2 px-4 rounded-full overflow-hidden group transition-transform duration-300 transform hover:scale-105"
//                     onClick={(event) => navigate("/")}
//                 >
//                     <span className="absolute inset-0 bg-gradient-to-r from-teal-400 via-teal-500 to-teal-600 transform scale-110 group-hover:scale-100 transition duration-300"></span>
//                     <span className="relative z-10">HOME</span>
//                 </button>
//             </div>

//             <h1 className="text-3xl font-bold mb-4">User Details</h1>
//             <p className="mb-4">User UID: {uid}</p>
            
//             {userData && (
//                 <div className="bg-white shadow-lg rounded-lg overflow-hidden transform transition-all duration-300 hover:scale-105">
//                     <div className="p-6">
//                         <div className="flex items-center mb-4">
//                             <img 
//                                 src={pfimage || 'https://via.placeholder.com/150'} 
//                                 alt="Profile"
//                                 className="w-24 h-24 rounded-full border-2 border-teal-500"
//                             />
//                             <div className="ml-4">
//                                 <h2 className="text-xl font-semibold">{userData.username} {userData.lastname}</h2>
//                                 <p className="text-gray-600">Role: {userData.email}</p>
//                                 <p className="text-gray-600">Phone: {userData.phonenumber}</p>
//                             </div>
//                         </div>
//                         {/* <div>
//                             <p className="font-bold">Address:</p>
//                             <p className="mb-2">{userData.address}</p>
//                             <p className="font-bold">Designation:</p>
//                             <p className="mb-2">{userData.designation}</p>
//                         </div> */}
//                     </div>
//                 </div>
//             )}
//         </div>
//     );
// };

// export default DetailsAppUser;
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const DetailsAppUser = () => {
  const { uid } = useParams();
  const navigate = useNavigate();

  const [userData, setUserData] = useState(null);
  const [pfimage, setPfImage] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
      const rooturi = import.meta.env.VITE_ROOT_URI;
      const apikey = import.meta.env.VITE_API_KEY;

      try {
        const res = await fetch(`${rooturi}/users/puprofile`, {
          method: "POST",
          headers: {
            'Content-Type': 'application/json',
            'apiauthkey': apikey
          },
          body: JSON.stringify({ userid: uid })
        });

        const data = await res.json();
        if (res.ok) {
          setUserData(data.data);
          setPfImage(data.pfimage);
        } else {
          toast.error("Failed to load user");
        }
      } catch {
        toast.error("Something went wrong");
      } finally {
        setLoading(false);
      }
    };
    fetchUser();
  }, [uid]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#0B0F14]">
        <div className="text-gray-400 animate-pulse text-lg">
          Loading user profile…
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0B0F14] px-6 py-12 text-gray-200">
      
      {/* Header */}
      <div className="max-w-6xl mx-auto flex items-center justify-between mb-10">
        <div>
          <h1 className="text-3xl font-semibold text-gray-100">User Profile</h1>
          <p className="text-sm text-gray-400 mt-1">
            View application user details
          </p>
        </div>

        <button
          onClick={() => navigate("/")}
          className="px-5 py-2 rounded-lg bg-[#1F2937] border border-gray-700 text-sm font-medium hover:bg-[#374151] transition"
        >
          ← Back
        </button>
      </div>

      {/* Card */}
      <div className="max-w-6xl mx-auto bg-[#111827] rounded-2xl border border-gray-800 shadow-lg">
        <div className="p-10">
          <div className="flex flex-col md:flex-row gap-10">

            {/* Avatar */}
            <div className="flex-shrink-0">
              <img
                src={pfimage || "https://via.placeholder.com/150"}
                alt="Profile"
                className="w-32 h-32 rounded-full object-cover border border-gray-700"
              />
            </div>

            {/* Details */}
            <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 gap-x-12 gap-y-7">

              <Detail label="User UID" value={uid} mono />
              <Detail label="Username" value={userData.username} />
              <Detail label="Email" value={userData.email} />
              <Detail label="Phone" value={userData.phonenumber || "—"} />

            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="px-10 py-6 border-t border-gray-800 flex justify-end gap-4 bg-[#0F172A] rounded-b-2xl">
          <button
            onClick={() => navigate(`/updateuser/${uid}`)}
            className="px-6 py-2 rounded-lg bg-blue-600 text-white text-sm font-medium hover:bg-blue-700 transition"
          >
            Edit User
          </button>

          <button
            onClick={() => navigate("/")}
            className="px-6 py-2 rounded-lg border border-gray-700 text-sm font-medium hover:bg-gray-800 transition"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

const Detail = ({ label, value, mono }) => (
  <div>
    <p className="text-xs uppercase tracking-wide text-gray-400 mb-1">
      {label}
    </p>
    <p className={`text-lg ${mono ? 'font-mono text-gray-300' : 'text-gray-100'}`}>
      {value}
    </p>
  </div>
);

export default DetailsAppUser;
