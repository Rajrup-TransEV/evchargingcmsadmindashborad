// import React, { useState, useEffect } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { toast } from 'react-toastify';

// const AddMinimumBalance = () => {
//     const [minbal,setminbal]=useState('');
//     const [error, setError] = useState(null);
//     const [loading, setLoading] = useState(false);
//     const navigate = useNavigate();

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
//                         // navigate("/");
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

// const handleSubmit= async(e)=>{
//     e.preventDefault();
//         setLoading(true);
//         setError(null);
//     try {
//         const rooturi = import.meta.env.VITE_ROOT_URI;
//         const apikey = import.meta.env.VITE_API_KEY;

//         const response = await fetch(`${rooturi}/users/createmb`,{
//             method: 'POST',
//                 headers: {
//                     'Content-Type': 'application/json',
//                     'apiauthkey': apikey,
//             },
//             body:JSON.stringify({minbalance:minbal})
//         })
//         const data = await response.json()
//         if(response.ok){
//             toast.info(data.message)
//         }
//     } catch (error) {
//         toast.error("Unkown error occurred",error)
//         console.log(error)
//     }finally{
//         setLoading(false)
//     }
// } 

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
//             const pathfinder = "addminimumbalance.jsx"
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
//     event.preventDefault(); // Prevent default action
//     navigate("/"); // Navigate to home
//   }
  

// return (
//     <div>
//     <form action="#" onSubmit={handleSubmit}>
//   <label htmlFor="minbal" className="block text-xs font-medium text-gray-700 dark:text-gray-200">
//     Minimum Balance
//   </label>

//   <input
//     type="text"
//     id="minbal"
//     name="minbal"
//     value = {minbal}
//     onChange={(e)=>setminbal(e.target.value)}
//     placeholder="Ex. RS 300"
//     className="mt-1 w-full rounded-md border-gray-200 shadow-sm sm:text-sm dark:border-gray-700 dark:bg-gray-800 dark:text-white"
//   />
//      <div className="col-span-6 sm:flex sm:items-center sm:gap-4">
//               <button
//                 className="inline-block shrink-0 rounded-md border border-blue-600 bg-blue-600 px-12 py-3 text-sm font-medium text-white transition hover:bg-transparent hover:text-blue-600 focus:outline-none focus:ring active:text-blue-500 dark:hover:bg-blue-700 dark:hover:text-white"
//               >
//            {loading ? 'Processing...' : 'Save'}
//               </button>
//             </div>
//     </form>
//     <div className="py-11">
//                 <button 
//         className="relative inline-block text-white font-bold py-2 px-4 rounded-full overflow-hidden group transition-transform duration-300 transform hover:scale-105"
//         onClick={(event) => backtohome(event)}
//     >
//         <span className="absolute inset-0 bg-gradient-to-r from-teal-400 via-teal-500 to-teal-600 transform scale-110 group-hover:scale-100 transition duration-300"></span>
//         <span className="relative z-10">HOME</span>
//     </button>
// </div>
//     </div>
//   )
// }

// export default AddMinimumBalance
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const AddMinimumBalance = () => {
  const [minbal, setMinbal] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  // Authentication check
  useEffect(() => {
    const checkAuth = async () => {
      const rooturi = import.meta.env.VITE_ROOT_URI;
      const apikey = import.meta.env.VITE_API_KEY;
      try {
        const token = localStorage.getItem("token");
        if (!token) return navigate("/signin");

        const res = await fetch(`${rooturi}/userauth/verifyuser`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json', 'apiauthkey': apikey },
          body: JSON.stringify({ token })
        });

        const data = await res.json();
        if (!res.ok || data.user.userType !== "superadmin") {
          toast("Unauthorized access");
          navigate("/signin");
        }
      } catch (error) {
        console.error(error);
        toast("Authentication error");
        navigate("/signin");
      }
    };
    checkAuth();
  }, [navigate]);

  // Handle submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const rooturi = import.meta.env.VITE_ROOT_URI;
      const apikey = import.meta.env.VITE_API_KEY;

      const res = await fetch(`${rooturi}/users/createmb`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'apiauthkey': apikey },
        body: JSON.stringify({ minbalance: minbal })
      });

      const data = await res.json();
      if (res.ok) toast.info(data.message);
    } catch (error) {
      console.error(error);
      toast.error("Unknown error occurred");
    } finally {
      setLoading(false);
    }
  };

  // IP tracking
  useEffect(() => {
    const fetchIp = async () => {
      const rooturi = import.meta.env.VITE_ROOT_URI;
      const apikey = import.meta.env.VITE_API_KEY;
      try {
        const res = await fetch("https://api.ipify.org?format=json");
        const data = await res.json();
        if (data) {
          const currentDateTime = new Date().toISOString();
          const pathfinder = "addminimumbalance.jsx";
          await fetch(`${rooturi}/admin/getip`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json', 'apiauthkey': apikey },
            body: JSON.stringify({ ip: data.ip, datetime: currentDateTime, path: pathfinder })
          });
        }
      } catch (error) {
        console.error(error);
      }
    };
    fetchIp();
  }, []);

  const backToHome = (e) => { e.preventDefault(); navigate("/"); };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-6">
      <div className="bg-white dark:bg-gray-900 shadow-2xl rounded-3xl p-8 w-full max-w-md">
        <h1 className="text-2xl font-bold text-gray-800 dark:text-gray-200 text-center mb-6">
          Add <span className="text-blue-600">Minimum Balance</span>
        </h1>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="minbal" className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-1">
              Minimum Balance
            </label>
            <input
              type="text"
              id="minbal"
              value={minbal}
              onChange={(e) => setMinbal(e.target.value)}
              placeholder="Ex. RS 300"
              className="w-full rounded-xl border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-gray-200 px-4 py-2 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 px-6 rounded-full bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 text-white font-semibold shadow-lg hover:from-blue-600 hover:to-blue-800 transition-all duration-300"
          >
            {loading ? "Processing..." : "Save"}
          </button>
        </form>

        <div className="mt-8 text-center">
          <button
            onClick={backToHome}
            className="relative inline-block text-white font-bold py-2 px-6 rounded-full overflow-hidden group transition-transform duration-300 transform hover:scale-105"
          >
            <span className="absolute inset-0 bg-gradient-to-r from-teal-400 via-teal-500 to-teal-600 transform scale-110 group-hover:scale-100 transition duration-300"></span>
            <span className="relative z-10">HOME</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddMinimumBalance;
