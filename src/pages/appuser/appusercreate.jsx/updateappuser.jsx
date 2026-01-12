// import React, { useState,useEffect } from 'react';
// import { useNavigate,useParams } from 'react-router-dom';
// import { toast } from 'react-toastify';

// const UpdateAppUser = () => {
//     const navigate = useNavigate()
//     const { uid } = useParams();
//     const[userprofilepicture,setuserprofilepicture]=useState(null);
//     const[username,setusername]=useState('');
//     const[email,setemail]=useState('');
//     const [loading, setLoading] = useState(false);

//     //use effect to directly check for if user logged in or not
//     useEffect(() => {
//       const checkAuthentication = async () => {
       
//         // Take API key value from env
//         const rooturi = import.meta.env.VITE_ROOT_URI;
//         const apikey = import.meta.env.VITE_API_KEY;
        
//         try {
//           const gettoken = localStorage.getItem("token");
//           console.log(gettoken)
//           if (!gettoken) {
//             navigate("/signin");
//             return;
//           }
          
//           const response = await fetch(`${rooturi}/userauth/verifyuser`, {
//             method: 'POST',
//             headers: {
//               'Content-Type': 'application/json',
//               'apiauthkey': apikey,
//             },
//             body: JSON.stringify({ token: gettoken })
//           });
          
//           const data = await response.json();
//           console.log(data)        
//           if (response.ok) {
  
//             if (data.user.userType !== "superadmin") {
//               toast("You have no authorization to view this page");
//               navigate("/signin");
//             } else {
//               console.log("You are an authorized user");
//             }
//           } else {
//             toast("Failed to verify user");
//             navigate("/signin");
//           }
//         } catch (error) {
//           console.error("Error during authentication check:", error);
//           toast("An error occurred during authentication");
//           navigate("/signin");
//         }
//       };
  
//       checkAuthentication();
//     }, [navigate]); // Dependency array includes navigate to avoid stale closure
    
//     const handleSubmit = async (e) => {
//         e.preventDefault();
//         setLoading(true);
//         try {
//             const apikey = import.meta.env.VITE_API_KEY;
//             const rooturi = import.meta.env.VITE_ROOT_URI;

//             let imageBase64 = '';
//             if (userprofilepicture) {
//                 const reader = new FileReader();
//                 reader.readAsDataURL(userprofilepicture);
                
//                 reader.onload = async () => {
//                     imageBase64 = reader.result.split(',')[1]; // Extract base64 string

//                     const response = await fetch(`${rooturi}/users/updateprofile`, {
//                         method: 'POST',
//                         headers: {
//                             'Content-Type': 'application/json',
//                             'apiauthkey': apikey,
//                         },
//                         body: JSON.stringify({
//                             uid,
//                             username:username,
//                             email:email,
//                             userprofilepicture: imageBase64 // Use base64 string
//                         })
//                     });

//                     if (response.ok) {
//                         toast("Profile updated successfully!");
//                         // Optionally reset form
//                         setuid('');
//                         setuserprofilepicture(null);
//                     } else {
//                         toast("Failed to update profile");
//                     }
//                 };

//                 reader.onerror = () => {
//                     toast("Error reading file");
//                     setLoading(false);
//                 };
                
//             } else {
//                 // Handle case where no file is selected
//                 toast("Please select a profile picture");
//                 setLoading(false);
//             }
//         } catch (error) {
//             console.error("Error during profile update:", error);
//             toast("An error occurred while updating your profile");
//         } finally {
//             setLoading(false);
//         }
//     };
//     const handleFileUpload = (e) => {
//         const selectedFile = e.target.files[0];
//         if (selectedFile) {
//             setuserprofilepicture(selectedFile);
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
//                 const pathfinder = "updateappuser.jsx"
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
// <section className="bg-white dark:bg-gray-900">
//   <div className="lg:grid lg:min-h-screen lg:grid-cols-12">
//     <aside className="relative block h-16 lg:order-last lg:col-span-5 lg:h-full xl:col-span-6">
//       <img
//         alt=""
//         src="https://res.cloudinary.com/djvmehyvd/image/upload/v1730708478/jjb6gtwippzrubjbykda.png"
//         className="absolute inset-0 h-full w-full object-cover"
//       />
//     </aside>

//     <main
//       className="flex items-center justify-center px-8 py-8 sm:px-12 lg:col-span-7 lg:px-16 lg:py-12 xl:col-span-6"
//     >
//       <div className="max-w-xl lg:max-w-3xl">
//         <a className="block text-blue-600" href="/">
//           <span className="sr-only">Home</span>
//           <svg
//             className="h-8 sm:h-10"
//             viewBox="0 0 28 24"
//             fill="none"
//             xmlns="http://www.w3.org/2000/svg"
//           >
//             <path
//               d="M0.41 10.3847C1.14777 7.4194 2.85643 4.7861 5.2639 2.90424C7.6714 1.02234 10.6393 0 13.695 0C16.7507 0 19.7186 1.02234 22.1261 2.90424C24.5336 4.7861 26.2422 7.4194 26.98 10.3847H25.78C23.7557 10.3549 21.7729 10.9599 20.11 12.1147C20.014 12.1842 19.9138 12.2477 19.81 12.3047H19.67C19.5662 12.2477 19.466 12.1842 19.37 12.1147C17.6924 10.9866 15.7166 10.3841 13.695 10.3841C11.6734 10.3841 9.6976 10.9866 8.02 12.1147C7.924 12.1842 7.8238 12.2477 7.72 12.3047H7.58C7.4762 12.2477 7.376 12.1842 7.28 12.1147C5.6171 10.9599 3.6343 10.3549 1.61 10.3847H0.41ZM23.62 16.6547C24.236 16.175 24.9995 15.924 25.78 15.9447H27.39V12.7347H25.78C24.4052 12.7181 23.0619 13.146 21.95 13.9547C21.3243 14.416 20.5674 14.6649 19.79 14.6649C19.0126 14.6649 18.2557 14.416 17.63 13.9547C16.4899 13.1611 15.1341 12.7356 13.745 12.7356C12.3559 12.7356 11.0001 13.1611 9.86 13.9547C9.2343 14.416 8.4774 14.6649 7.7 14.6649C6.9226 14.6649 6.1657 14.416 5.54 13.9547C4.4144 13.1356 3.0518 12.7072 1.66 12.7347H0V15.9447H1.61C2.39051 15.924 3.154 16.175 3.77 16.6547C4.908 17.4489 6.2623 17.8747 7.65 17.8747C9.0377 17.8747 10.392 17.4489 11.53 16.6547C12.1468 16.1765 12.9097 15.9257 13.69 15.9447C14.4708 15.9223 15.2348 16.1735 15.85 16.6547C16.9901 17.4484 18.3459 17.8738 19.735 17.8738C21.1241 17.8738 22.4799 17.4484 23.62 16.6547ZM23.62 22.3947C24.236 21.915 24.9995 21.664 25.78 21.6847H27.39V18.4747H25.78C24.4052 18.4581 23.0619 18.886 21.95 19.6947C21.3243 20.156 20.5674 20.4049 19.79 20.4049C19.0126 20.4049 18.2557 20.156 17.63 19.6947C16.4899 18.9011 15.1341 18.4757 13.745 18.4757C12.3559 18.4757 11.0001 18.9011 9.86 19.6947C9.2343 20.156 8.4774 20.4049 7.7 20.4049C6.9226 20.4049 6.1657 20.156 5.54 19.6947C4.4144 18.8757 3.0518 18.4472 1.66 18.4747H0V21.6847H1.61C2.39051 21.664 3.154 21.915 3.77 22.3947C4.908 23.1889 6.2623 23.6147 7.65 23.6147C9.0377 23.6147 10.392 23.1889 11.53 22.3947C12.1468 21.9165 12.9097 21.6657 13.69 21.6847C14.4708 21.6623 15.2348 21.9135 15.85 22.3947C16.9901 23.1884 18.3459 23.6138 19.735 23.6138C21.1241 23.6138 22.4799 23.1884 23.62 22.3947Z"
//               fill="currentColor"
//             />
//           </svg>
//         </a>

//         <h1 className="mt-6 text-2xl font-bold text-gray-900 sm:text-3xl md:text-4xl dark:text-white">
//           Welcome to Transmogrify user update
//         </h1>

//         <p className="mt-4 leading-relaxed text-gray-500 dark:text-gray-400">
//         </p>

//         <form action="#" onSubmit={handleSubmit} className="mt-8 grid grid-cols-6 gap-6">
//           <div className="col-span-6 sm:col-span-3">
//             <label
//               htmlFor="username"
//               className="block text-sm font-medium text-gray-700 dark:text-gray-200"
//             >
//               Username
//             </label>

//             <input
//               type="text"
//               id="username"
//               name="username"
//               value={username}
//               onChange={(e)=>setusername(e.target.value)}
//               className="mt-1 w-full rounded-md border-gray-200 bg-white text-sm text-gray-700 shadow-sm dark:border-gray-700 dark:bg-gray-800 dark:text-gray-200"
//             />
//           </div>

//           <div className="col-span-6 sm:col-span-3">
//             <label
//               htmlFor="email"
//               className="block text-sm font-medium text-gray-700 dark:text-gray-200"
//             >
//               Email
//             </label>

//             <input
//               type="email"
//               id="email"
//               name="email"
//               value={email}
//               onChange={(e)=>setemail(e.target.value)}
//               className="mt-1 w-full rounded-md border-gray-200 bg-white text-sm text-gray-700 shadow-sm dark:border-gray-700 dark:bg-gray-800 dark:text-gray-200"
//             />
//           </div>
//         <div className="col-span-6">
//                     <label htmlFor="userprofilepicture" className="block text-sm font-medium text-gray-700">
//                         Profile Picture
//                     </label>
//                     <input
//                         type="file"
//                         id="userprofilepicture"
//                         name="userprofilepicture"
//                         onChange={handleFileUpload}
//                         className="mt-1 w-full rounded-md border-gray-200 bg-white text-sm text-gray-700 shadow-sm"
//                     />
//         </div>

//           <div className="col-span-6 sm:flex sm:items-center sm:gap-4">
//           <button
//                     type="submit"
//                     className={`inline-block shrink-0 rounded-md border px-12 py-3 text-sm font-medium text-white transition focus:outline-none focus:ring active:text-blue-500 ${
//                         loading ? 'bg-gray-400 border-gray-400' : 'bg-blue-600 border-blue-600'
//                     }`}
//                     disabled={loading}
//                 >
//                     {loading ? (
//                         <>
//                             <svg className="animate-spin h-5 w-5 mr-3 inline" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
//                                 <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
//                                 <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 0115.9-4.1A8 8 0 014 12z"></path>
//                             </svg>
//                             Processing...
//                         </>
//                     ) : (
//                         'Save Profile Details'
//                     )}
//                 </button>
//           </div>
//         </form>
//       </div>
//     </main>
 
//   </div>
//   <div className="py-11">
//                 <button 
//         className="relative inline-block text-white font-bold py-2 px-4 rounded-full overflow-hidden group transition-transform duration-300 transform hover:scale-105"
//         onClick={(event) => backtohome(event)}
//     >
//         <span className="absolute inset-0 bg-gradient-to-r from-teal-400 via-teal-500 to-teal-600 transform scale-110 group-hover:scale-100 transition duration-300"></span>
//         <span className="relative z-10">HOME</span>
//     </button>
// </div>
// </section>
//   )
// }

// export default UpdateAppUser

import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';

const UpdateAppUser = () => {
  const navigate = useNavigate();
  const { uid } = useParams();
  const [userprofilepicture, setuserprofilepicture] = useState(null);
  const [previewImage, setPreviewImage] = useState(null);
  const [username, setusername] = useState('');
  const [email, setemail] = useState('');
  const [loading, setLoading] = useState(false);

  // Auth check
  useEffect(() => {
    const checkAuth = async () => {
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
    checkAuth();
  }, [navigate]);

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setuserprofilepicture(file);
      const reader = new FileReader();
      reader.onload = () => setPreviewImage(reader.result);
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const rooturi = import.meta.env.VITE_ROOT_URI;
      const apikey = import.meta.env.VITE_API_KEY;

      if (!userprofilepicture) { toast("Please select a profile picture"); setLoading(false); return; }

      const reader = new FileReader();
      reader.readAsDataURL(userprofilepicture);
      reader.onload = async () => {
        const imageBase64 = reader.result.split(',')[1];
        const response = await fetch(`${rooturi}/users/updateprofile`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json', 'apiauthkey': apikey },
          body: JSON.stringify({ uid, username, email, userprofilepicture: imageBase64 })
        });
        if (response.ok) toast.success("Profile updated successfully!");
        else toast.error("Failed to update profile");
      };
      reader.onerror = () => toast.error("Error reading file");
    } catch (error) {
      console.error(error);
      toast.error("An error occurred while updating profile");
    } finally { setLoading(false); }
  };

  const backtohome = (e) => { e.preventDefault(); navigate("/"); }

  return (
    <section className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 flex items-center justify-center p-6 relative overflow-hidden">
      
      {/* Animated background circles */}
      <div className="absolute -top-20 -left-20 w-72 h-72 bg-blue-500/30 rounded-full blur-3xl animate-blob animation-delay-2000"></div>
      <div className="absolute -bottom-20 -right-20 w-72 h-72 bg-pink-500/30 rounded-full blur-3xl animate-blob animation-delay-4000"></div>

      {/* Floating Glass Card */}
      <div className="relative z-10 w-full max-w-md p-10 rounded-3xl bg-white/10 backdrop-blur-lg border border-white/20 shadow-2xl overflow-hidden">
        
        {/* Animated gradient border */}
        <div className="absolute inset-0 rounded-3xl border-4 border-transparent bg-gradient-to-r from-blue-500 via-teal-400 to-pink-500 bg-clip-border animate-gradient-x pointer-events-none"></div>

        <div className="relative z-10 text-center">
          <h1 className="text-3xl font-extrabold text-white mb-3">Update App User</h1>
          <p className="text-gray-300 mb-6">Edit user details and upload a profile picture</p>

          {/* Profile Picture Preview */}
          {previewImage && (
            <div className="flex justify-center mb-6">
              <img
                src={previewImage}
                alt="Preview"
                className="w-28 h-28 rounded-full border-4 border-gradient-to-r from-blue-400 via-teal-400 to-pink-500 shadow-xl object-cover transition-transform hover:scale-110"
              />
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5 text-left">
            <div>
              <label className="text-gray-200 font-semibold mb-1 block">Username</label>
              <input
                type="text"
                value={username}
                onChange={e => setusername(e.target.value)}
                className="w-full px-4 py-3 rounded-xl bg-gray-700 text-white focus:ring-2 focus:ring-blue-500 focus:outline-none shadow-lg transition"
                placeholder="Enter username"
                required
              />
            </div>

            <div>
              <label className="text-gray-200 font-semibold mb-1 block">Email</label>
              <input
                type="email"
                value={email}
                onChange={e => setemail(e.target.value)}
                className="w-full px-4 py-3 rounded-xl bg-gray-700 text-white focus:ring-2 focus:ring-blue-500 focus:outline-none shadow-lg transition"
                placeholder="Enter email"
                required
              />
            </div>

            <div>
              <label className="text-gray-200 font-semibold mb-1 block">Profile Picture</label>
              <input
                type="file"
                onChange={handleFileUpload}
                accept="image/*"
                className="w-full text-white"
                required
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className={`w-full py-3 rounded-xl font-bold text-white text-lg shadow-xl transition-transform transform hover:scale-105 ${
                loading ? 'bg-gray-600 cursor-not-allowed' : 'bg-gradient-to-r from-blue-500 via-teal-400 to-pink-500'
              }`}
            >
              {loading ? 'Processing...' : 'Save Profile Details'}
            </button>

            <button
              onClick={backtohome}
              className="w-full py-3 rounded-xl font-bold text-white bg-gradient-to-r from-teal-400 via-blue-500 to-purple-500 shadow-lg hover:scale-105 transition-transform"
            >
              HOME
            </button>
          </form>
        </div>
      </div>

      {/* Tailwind Animations */}
      <style>{`
        @keyframes blob {
          0%, 100% { transform: translate(0px, 0px) scale(1); }
          33% { transform: translate(30px, -50px) scale(1.1); }
          66% { transform: translate(-20px, 20px) scale(0.9); }
        }
        .animate-blob { animation: blob 7s infinite; }
        .animation-delay-2000 { animation-delay: 2s; }
        .animation-delay-4000 { animation-delay: 4s; }
        @keyframes gradient-x { 0% { background-position: 0% } 50% { background-position: 100% } 100% { background-position: 0% } }
        .animate-gradient-x { background-size: 300% 300%; animation: gradient-x 6s ease infinite; }
      `}</style>
    </section>
  );
};

export default UpdateAppUser;
