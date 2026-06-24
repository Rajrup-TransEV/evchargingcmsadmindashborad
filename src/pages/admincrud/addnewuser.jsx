// import React, { useState,useEffect } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { toast } from 'react-toastify';
// const AddNewuser = () => {
//   const [firstname,setFirstname]=useState('')
//   const [lastname,setLastname]=useState('')
//   const [email,setEmail]=useState('')
//   const [password,setpassword]=useState('')
//   const [address,setAddress]=useState('')
//   const [phonenumber,setPhonenumber]=useState('')
//   const [role,setRole]=useState('')
//   const [designation,setDesignation]=useState('')
//   const [loading, setLoading] = useState(false)
//   const navigate = useNavigate()
//   //use effect to directly check for if user logged in or not
//   useEffect(() => {
//     const checkAuthentication = async () => {
     
//       // Take API key value from env
//       const rooturi = import.meta.env.VITE_ROOT_URI;
//       const apikey = import.meta.env.VITE_API_KEY;
      
//       try {
//         const gettoken = localStorage.getItem("token");
//         console.log(gettoken)
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
//         console.log(data)        
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
//   }, [navigate]); // Dependency array includes navigate to avoid stale closure
  
//   //handel the submitted from data
//   const handleSubmit = async(e)=>{
//     e.preventDefault();
//     setLoading(true);

//     try {
//               //take api key value from env
//         const apikey = import.meta.env.VITE_API_KEY;
//         const rooturi = import.meta.env.VITE_ROOT_URI;
//         const response = await fetch(`${rooturi}/admin/create/userprofilecreate`,{
//           method:'POST',
//           headers:{
//             'Content-Type': 'application/json',
//             'apiauthkey': apikey,
//         },
//         body:JSON.stringify({firstname,lastname,email,password,address,phonenumber,role,designation})
//         })
//         const data = await response.json()
//         console.log(data)
//         if(response.ok){
//             toast.info(data.message)
//         }else{
//               toast.error(data.message)
//               console.log(data.error)
//         }
//     } catch (error) {
//       toast.error("unknown error occurred",error)
//       console.log(error)
//     }finally{
//       setLoading(false)
//     }
//   }

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
//               const pathfinder = "addnewuser.jsx"
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

// const backtohome = (event) => {
//   event.preventDefault(); // Prevent default action
//   navigate("/"); // Navigate to home
// }


//   return (

//   <section class="bg-white dark:bg-gray-900">
//     <div class="lg:grid lg:min-h-screen lg:grid-cols-12">
//       <aside class="relative block h-16 lg:order-last lg:col-span-5 lg:h-full xl:col-span-6">
//         <img
//           alt=""
//           src="https://res.cloudinary.com/djvmehyvd/image/upload/v1730708478/jjb6gtwippzrubjbykda.png"
//           class="absolute inset-0 h-full w-full object-cover"
//         />
//       </aside>
  
//       <main
//         class="flex items-center justify-center px-8 py-8 sm:px-12 lg:col-span-7 lg:px-16 lg:py-12 xl:col-span-6"
//       >
//         <div class="max-w-xl lg:max-w-3xl">
//           <a class="block text-blue-600" href="/">
//             <span class="sr-only">Home</span>
//             <svg
//               class="h-8 sm:h-10"
//               viewBox="0 0 28 24"
//               fill="none"
//               xmlns="http://www.w3.org/2000/svg"
//             >
//               <path
//                 d="M0.41 10.3847C1.14777 7.4194 2.85643 4.7861 5.2639 2.90424C7.6714 1.02234 10.6393 0 13.695 0C16.7507 0 19.7186 1.02234 22.1261 2.90424C24.5336 4.7861 26.2422 7.4194 26.98 10.3847H25.78C23.7557 10.3549 21.7729 10.9599 20.11 12.1147C20.014 12.1842 19.9138 12.2477 19.81 12.3047H19.67C19.5662 12.2477 19.466 12.1842 19.37 12.1147C17.6924 10.9866 15.7166 10.3841 13.695 10.3841C11.6734 10.3841 9.6976 10.9866 8.02 12.1147C7.924 12.1842 7.8238 12.2477 7.72 12.3047H7.58C7.4762 12.2477 7.376 12.1842 7.28 12.1147C5.6171 10.9599 3.6343 10.3549 1.61 10.3847H0.41ZM23.62 16.6547C24.236 16.175 24.9995 15.924 25.78 15.9447H27.39V12.7347H25.78C24.4052 12.7181 23.0619 13.146 21.95 13.9547C21.3243 14.416 20.5674 14.6649 19.79 14.6649C19.0126 14.6649 18.2557 14.416 17.63 13.9547C16.4899 13.1611 15.1341 12.7356 13.745 12.7356C12.3559 12.7356 11.0001 13.1611 9.86 13.9547C9.2343 14.416 8.4774 14.6649 7.7 14.6649C6.9226 14.6649 6.1657 14.416 5.54 13.9547C4.4144 13.1356 3.0518 12.7072 1.66 12.7347H0V15.9447H1.61C2.39051 15.924 3.154 16.175 3.77 16.6547C4.908 17.4489 6.2623 17.8747 7.65 17.8747C9.0377 17.8747 10.392 17.4489 11.53 16.6547C12.1468 16.1765 12.9097 15.9257 13.69 15.9447C14.4708 15.9223 15.2348 16.1735 15.85 16.6547C16.9901 17.4484 18.3459 17.8738 19.735 17.8738C21.1241 17.8738 22.4799 17.4484 23.62 16.6547ZM23.62 22.3947C24.236 21.915 24.9995 21.664 25.78 21.6847H27.39V18.4747H25.78C24.4052 18.4581 23.0619 18.886 21.95 19.6947C21.3243 20.156 20.5674 20.4049 19.79 20.4049C19.0126 20.4049 18.2557 20.156 17.63 19.6947C16.4899 18.9011 15.1341 18.4757 13.745 18.4757C12.3559 18.4757 11.0001 18.9011 9.86 19.6947C9.2343 20.156 8.4774 20.4049 7.7 20.4049C6.9226 20.4049 6.1657 20.156 5.54 19.6947C4.4144 18.8757 3.0518 18.4472 1.66 18.4747H0V21.6847H1.61C2.39051 21.664 3.154 21.915 3.77 22.3947C4.908 23.1889 6.2623 23.6147 7.65 23.6147C9.0377 23.6147 10.392 23.1889 11.53 22.3947C12.1468 21.9165 12.9097 21.6657 13.69 21.6847C14.4708 21.6623 15.2348 21.9135 15.85 22.3947C16.9901 23.1884 18.3459 23.6138 19.735 23.6138C21.1241 23.6138 22.4799 23.1884 23.62 22.3947Z"
//                 fill="currentColor"
//               />
//             </svg>
//           </a>
  
//           <h1 class="mt-6 text-2xl font-bold text-gray-900 sm:text-3xl md:text-4xl dark:text-white">
//             Welcome to Create new user section 🦑
//           </h1>
  
//           <p class="mt-4 leading-relaxed text-gray-500 dark:text-gray-400">
//             Create a new admin user from here directly
//           </p>
  
//           <form action="#" class="mt-8 grid grid-cols-6 gap-6" onSubmit={handleSubmit} >
//             <div class="col-span-6 sm:col-span-3">
//               <label
//                 for="FirstName"
//                 class="block text-sm font-medium text-gray-700 dark:text-gray-200"
//               >
//                 First Name
//               </label>
  
//               <input
//                 type="text"
//                 id="firstname"
//                 name="firstname"
//                 value={firstname}
//                 onChange={(e)=>setFirstname(e.target.value)}
//                 class="mt-1 w-full rounded-md border-gray-200 bg-white text-sm text-gray-700 shadow-sm dark:border-gray-700 dark:bg-gray-800 dark:text-gray-200"
//               />
//             </div>
  
//             <div class="col-span-6 sm:col-span-3">
//               <label
//                 for="lastname"
//                 class="block text-sm font-medium text-gray-700 dark:text-gray-200"
//               >
//                 Last Name
//               </label>
  
//               <input
//                 type="text"
//                 id="lastname"
//                 name="lastname"
//                 value={lastname}
//                 onChange={(e)=>setLastname(e.target.value)}
//                 class="mt-1 w-full rounded-md border-gray-200 bg-white text-sm text-gray-700 shadow-sm dark:border-gray-700 dark:bg-gray-800 dark:text-gray-200"
//               />
//             </div>
  
//             <div class="col-span-6">
//               <label for="Email" class="block text-sm font-medium text-gray-700 dark:text-gray-200">
//                 Email
//               </label>
  
//               <input
//                 type="email"
//                 id="email"
//                 name="email"
//                 value={email}
//                 onChange={(e)=>setEmail(e.target.value)}
//                 class="mt-1 w-full rounded-md border-gray-200 bg-white text-sm text-gray-700 shadow-sm dark:border-gray-700 dark:bg-gray-800 dark:text-gray-200"
//               />
//             </div>
  
//             <div class="col-span-6 sm:col-span-3">
//               <label
//                 for="Password"
//                 class="block text-sm font-medium text-gray-700 dark:text-gray-200"
//               >
//                 Password
//               </label>
  
//               <input
//                 type="password"
//                 id="password"
//                 name="password"
//                 value={password}
//                 onChange={(e)=>setpassword(e.target.value)}
//                 class="mt-1 w-full rounded-md border-gray-200 bg-white text-sm text-gray-700 shadow-sm dark:border-gray-700 dark:bg-gray-800 dark:text-gray-200"
//               />
//             </div>
//             <div class="col-span-6 sm:col-span-3">
//               <label
//                 for="address"
//                 class="block text-sm font-medium text-gray-700 dark:text-gray-200"
//               >
//                 Address
//               </label>
  
//               <input
//                 type="text"
//                 id="address"
//                 name="address"
//                 value={address}
//                 onChange={(e)=>setAddress(e.target.value)}
//                 class="mt-1 w-full rounded-md border-gray-200 bg-white text-sm text-gray-700 shadow-sm dark:border-gray-700 dark:bg-gray-800 dark:text-gray-200"
//               />
//             </div>
//             <div class="col-span-6 sm:col-span-3">
//               <label
//                 for="address"
//                 class="block text-sm font-medium text-gray-700 dark:text-gray-200"
//               >
//                 Phone Number
//               </label>
  
//               <input
//                 type="text"
//                 id="phonenumber"
//                 name="phonenumber"
//                 value={phonenumber}
//                 onChange={(e)=>setPhonenumber(e.target.value)}
//                 class="mt-1 w-full rounded-md border-gray-200 bg-white text-sm text-gray-700 shadow-sm dark:border-gray-700 dark:bg-gray-800 dark:text-gray-200"
//               />
//             </div>
//                         <div className="col-span-6 sm:col-span-3">
//               <label
//                 htmlFor="role"
//                 className="block text-sm font-medium text-gray-700 dark:text-gray-200"
//               >
//                 Role (e.g., Admin, User)
//               </label>

//               <select
//                 id="role"
//                 name="role"
//                 value={role}
//                 onChange={(e) => setRole(e.target.value)}
//                 className="mt-1 w-full rounded-md border-gray-200 bg-white text-sm text-gray-700 shadow-sm dark:border-gray-700 dark:bg-gray-800 dark:text-gray-200"
//               >
//                 <option value="" disabled>Select Role</option>
//                 <option value="admin">Admin</option>
//                 {/* <option value="user">User</option> */}
//               </select>
//             </div>

//             <div class="col-span-6 sm:col-span-3">
//               <label
//                 for="role"
//                 class="block text-sm font-medium text-gray-700 dark:text-gray-200"
//               >
//                 Designation
//               </label>
  
//               <input
//                 type="text"
//                 id="designation"
//                 name="designation"
//                 value={designation}
//                 onChange={(e)=>setDesignation(e.target.value)}
//                 class="mt-1 w-full rounded-md border-gray-200 bg-white text-sm text-gray-700 shadow-sm dark:border-gray-700 dark:bg-gray-800 dark:text-gray-200"
//               />
//             </div>
//             <div class="col-span-6 sm:flex sm:items-center sm:gap-4">
//               <button
//                 class="inline-block shrink-0 rounded-md border border-blue-600 bg-blue-600 px-12 py-3 text-sm font-medium text-white transition hover:bg-transparent hover:text-blue-600 focus:outline-none focus:ring active:text-blue-500 dark:hover:bg-blue-700 dark:hover:text-white"
//               >
//            {loading ? 'Processing...' : 'Save charger user details'}
//               </button>
//             </div>
//             <div className="py-11">
//                 <button 
//         className="relative inline-block text-white font-bold py-2 px-4 rounded-full overflow-hidden group transition-transform duration-300 transform hover:scale-105"
//         onClick={(event) => backtohome(event)}
//     >
//         <span className="absolute inset-0 bg-gradient-to-r from-teal-400 via-teal-500 to-teal-600 transform scale-110 group-hover:scale-100 transition duration-300"></span>
//         <span className="relative z-10">HOME</span>
//     </button>
// </div>
//           </form>
//         </div>
       
//       </main>
//     </div>
//   </section>
  
//   )
// }

// export default AddNewuser


import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import Sidebar from '../../partials/Sidebar';
import { 
  FiUser, 
  FiMail, 
  FiPhone, 
  FiLock, 
  FiMapPin, 
  FiBriefcase, 
  FiUserPlus,
  FiArrowLeft,
  FiUsers,
  FiShield,
  FiCheckCircle,
  FiEye,
  FiEyeOff
} from 'react-icons/fi';

const AddNewuser = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [firstname, setFirstname] = useState('');
  const [lastname, setLastname] = useState('');
  const [email, setEmail] = useState('');
  const [password, setpassword] = useState('');
  const [address, setAddress] = useState('');
  const [phonenumber, setPhonenumber] = useState('');
  const [role, setRole] = useState('');
  const [designation, setDesignation] = useState('');
  const [loading, setLoading] = useState(false);
  const [ipAddress, setIpAddress] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const navigate = useNavigate();

  /* ================= AUTH ================= */
  useEffect(() => {
    const checkAuthentication = async () => {
      const rooturi = import.meta.env.VITE_ROOT_URI;
      const apikey = import.meta.env.VITE_API_KEY;

      try {
        const token = localStorage.getItem("token");
        if (!token) return navigate("/signin");

        const response = await fetch(`${rooturi}/userauth/verifyuser`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            apiauthkey: apikey,
          },
          body: JSON.stringify({ token })
        });

        const data = await response.json();
        if (!response.ok || data.user.userType !== "superadmin") {
          toast.error("Unauthorized access");
          navigate("/signin");
        }
      } catch {
        toast.error("Authentication error");
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
            headers: {
              'Content-Type': 'application/json',
              apiauthkey: apikey,
            },
            body: JSON.stringify({
              ip: data.ip,
              datetime: new Date().toISOString(),
              path: "addnewuser.jsx"
            })
          });
        }
      } catch {}
    };
    fetchIpAddress();
  }, []);

  /* ================= PREVENT AUTO-FILL ================= */
  useEffect(() => {
    // Clear any autofilled values on component mount
    const inputs = document.querySelectorAll('input');
    inputs.forEach(input => {
      if (input.value && (input.type === 'email' || input.type === 'password')) {
        input.value = '';
      }
    });
  }, []);

  /* ================= SUBMIT ================= */
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    // Validate required fields
    if (!firstname || !lastname || !email || !password || !phonenumber || !role) {
      toast.error("Please fill in all required fields");
      setLoading(false);
      return;
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      toast.error("Please enter a valid email address");
      setLoading(false);
      return;
    }

    // Validate password length
    if (password.length < 6) {
      toast.error("Password must be at least 6 characters long");
      setLoading(false);
      return;
    }

    try {
      const rooturi = import.meta.env.VITE_ROOT_URI;
      const apikey = import.meta.env.VITE_API_KEY;

      const payload = {
        firstname: firstname.trim(),
        lastname: lastname.trim(),
        email: email.trim().toLowerCase(),
        password: password,
        address: address.trim(),
        phonenumber: phonenumber.trim(),
        role: role,
        designation: designation.trim()
      };

      const response = await fetch(`${rooturi}/admin/create/userprofilecreate`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          apiauthkey: apikey,
        },
        body: JSON.stringify(payload)
      });

      const data = await response.json();

      if (response.ok) {
        toast.success(data.message || "User created successfully!");
        // Reset form
        setFirstname('');
        setLastname('');
        setEmail('');
        setpassword('');
        setAddress('');
        setPhonenumber('');
        setRole('');
        setDesignation('');
        // Clear any autofilled values
        setTimeout(() => {
          const inputs = document.querySelectorAll('input');
          inputs.forEach(input => {
            if (input.type === 'email' || input.type === 'password') {
              input.value = '';
            }
          });
        }, 100);
      } else {
        toast.error(data.message || "Failed to create user");
      }
    } catch (error) {
      console.error("Error:", error);
      toast.error("An error occurred while creating user");
    } finally {
      setLoading(false);
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

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
          <h1 className="text-xl font-bold text-gray-800">Create CPO</h1>
          <div className="w-10" />
        </header>

        {/* Page Content */}
        <div className="flex-1 overflow-y-auto p-4 md:p-8">
          {/* Desktop Header */}
          <div className="hidden lg:flex items-center gap-4 mb-8">
            <button
              onClick={() => navigate('/listofusers')}
              className="p-2 rounded-xl bg-white border border-gray-200 text-gray-600 hover:text-indigo-600 hover:border-indigo-300 hover:bg-indigo-50 transition-all duration-200"
            >
              <FiArrowLeft className="w-5 h-5" />
            </button>
            <div>
              <h1 className="text-3xl font-bold text-gray-800 flex items-center gap-3">
                <span className="bg-gradient-to-r from-indigo-500 to-purple-500 p-2.5 rounded-xl text-white shadow-lg">
                  <FiUserPlus className="w-6 h-6" />
                </span>
                Create New CPO
              </h1>
              <p className="text-gray-500 mt-1">Add a new administrator with full access privileges</p>
            </div>
          </div>

          {/* Form */}
          <div className="max-w-5xl mx-auto">
            <div className="rounded-3xl bg-white shadow-xl border border-gray-100 p-6 md:p-10">
              {/* Stats Cards */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
                <div className="p-4 rounded-xl bg-gradient-to-br from-emerald-50 to-emerald-100/50 border border-emerald-200">
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-lg bg-emerald-100">
                      <FiUsers className="w-5 h-5 text-emerald-600" />
                    </div>
                    <div>
                      <p className="text-xs text-gray-500">Total CPO's</p>
                      {/* <p className="text-lg font-bold text-gray-800">+1 New</p> */}
                    </div>
                  </div>
                </div>
                <div className="p-4 rounded-xl bg-gradient-to-br from-blue-50 to-blue-100/50 border border-blue-200">
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-lg bg-blue-100">
                      <FiShield className="w-5 h-5 text-blue-600" />
                    </div>
                    <div>
                      <p className="text-xs text-gray-500">Role</p>
                      <p className="text-lg font-bold text-gray-800">Admin</p>
                    </div>
                  </div>
                </div>
                <div className="p-4 rounded-xl bg-gradient-to-br from-purple-50 to-purple-100/50 border border-purple-200">
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-lg bg-purple-100">
                      <FiCheckCircle className="w-5 h-5 text-purple-600" />
                    </div>
                    <div>
                      <p className="text-xs text-gray-500">Status</p>
                      <p className="text-lg font-bold text-gray-800">Active</p>
                    </div>
                  </div>
                </div>
              </div>

              <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6" autoComplete="off">
                {/* Personal Information Section */}
                <div className="md:col-span-2">
                  <div className="flex items-center gap-2 mb-4">
                    <div className="h-6 w-1 rounded-full bg-gradient-to-b from-indigo-400 to-purple-400" />
                    <h2 className="text-sm font-semibold text-gray-600 uppercase tracking-wider">
                      Personal Information
                    </h2>
                  </div>
                </div>

                <div>
                  <label className="text-sm font-semibold text-gray-700 flex items-center gap-1">
                    <FiUser className="w-4 h-4 text-indigo-500" />
                    First Name <span className="text-red-500 text-xs">*</span>
                  </label>
                  <input
                    value={firstname}
                    onChange={(e) => setFirstname(e.target.value)}
                    type="text"
                    placeholder="Enter first name"
                    className="mt-2 w-full rounded-xl bg-gray-50 border border-gray-200 px-4 py-3 text-gray-700 placeholder-gray-400 focus:ring-2 focus:ring-indigo-400 focus:border-transparent outline-none transition-all duration-200 hover:border-gray-300"
                    required
                    autoComplete="off"
                  />
                </div>

                <div>
                  <label className="text-sm font-semibold text-gray-700 flex items-center gap-1">
                    <FiUser className="w-4 h-4 text-indigo-500" />
                    Last Name <span className="text-red-500 text-xs">*</span>
                  </label>
                  <input
                    value={lastname}
                    onChange={(e) => setLastname(e.target.value)}
                    type="text"
                    placeholder="Enter last name"
                    className="mt-2 w-full rounded-xl bg-gray-50 border border-gray-200 px-4 py-3 text-gray-700 placeholder-gray-400 focus:ring-2 focus:ring-indigo-400 focus:border-transparent outline-none transition-all duration-200 hover:border-gray-300"
                    required
                    autoComplete="off"
                  />
                </div>

                {/* Contact Information Section */}
                <div className="md:col-span-2">
                  <div className="flex items-center gap-2 mb-4 mt-2">
                    <div className="h-6 w-1 rounded-full bg-gradient-to-b from-indigo-400 to-purple-400" />
                    <h2 className="text-sm font-semibold text-gray-600 uppercase tracking-wider">
                      Contact Information
                    </h2>
                  </div>
                </div>

                <div>
                  <label className="text-sm font-semibold text-gray-700 flex items-center gap-1">
                    <FiMail className="w-4 h-4 text-indigo-500" />
                    Email Address <span className="text-red-500 text-xs">*</span>
                  </label>
                  <input
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    type="email"
                    placeholder="Enter email address"
                    className="mt-2 w-full rounded-xl bg-gray-50 border border-gray-200 px-4 py-3 text-gray-700 placeholder-gray-400 focus:ring-2 focus:ring-indigo-400 focus:border-transparent outline-none transition-all duration-200 hover:border-gray-300"
                    required
                    autoComplete="new-email"
                    autoCorrect="off"
                    spellCheck="false"
                  />
                </div>

                <div>
                  <label className="text-sm font-semibold text-gray-700 flex items-center gap-1">
                    <FiLock className="w-4 h-4 text-indigo-500" />
                    Password <span className="text-red-500 text-xs">*</span>
                  </label>
                  <div className="relative mt-2">
                    <input
                      value={password}
                      onChange={(e) => setpassword(e.target.value)}
                      type={showPassword ? "text" : "password"}
                      placeholder="Enter password"
                      className="w-full rounded-xl bg-gray-50 border border-gray-200 px-4 py-3 text-gray-700 placeholder-gray-400 focus:ring-2 focus:ring-indigo-400 focus:border-transparent outline-none transition-all duration-200 hover:border-gray-300"
                      required
                      minLength={6}
                      autoComplete="new-password"
                    />
                    <button
                      type="button"
                      onClick={togglePasswordVisibility}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                    >
                      {showPassword ? (
                        <FiEyeOff className="w-5 h-5" />
                      ) : (
                        <FiEye className="w-5 h-5" />
                      )}
                    </button>
                  </div>
                  <p className="text-xs text-gray-400 mt-1">Minimum 6 characters</p>
                </div>

                <div>
                  <label className="text-sm font-semibold text-gray-700 flex items-center gap-1">
                    <FiPhone className="w-4 h-4 text-indigo-500" />
                    Phone Number <span className="text-red-500 text-xs">*</span>
                  </label>
                  <input
                    value={phonenumber}
                    onChange={(e) => setPhonenumber(e.target.value)}
                    type="tel"
                    placeholder="Enter phone number"
                    className="mt-2 w-full rounded-xl bg-gray-50 border border-gray-200 px-4 py-3 text-gray-700 placeholder-gray-400 focus:ring-2 focus:ring-indigo-400 focus:border-transparent outline-none transition-all duration-200 hover:border-gray-300"
                    required
                    autoComplete="off"
                  />
                </div>

                {/* Professional Information Section */}
                <div className="md:col-span-2">
                  <div className="flex items-center gap-2 mb-4 mt-2">
                    <div className="h-6 w-1 rounded-full bg-gradient-to-b from-indigo-400 to-purple-400" />
                    <h2 className="text-sm font-semibold text-gray-600 uppercase tracking-wider">
                      Professional Information
                    </h2>
                  </div>
                </div>

                <div>
                  <label className="text-sm font-semibold text-gray-700 flex items-center gap-1">
                    <FiBriefcase className="w-4 h-4 text-indigo-500" />
                    Designation
                  </label>
                  <input
                    value={designation}
                    onChange={(e) => setDesignation(e.target.value)}
                    type="text"
                    placeholder="e.g., Senior Administrator"
                    className="mt-2 w-full rounded-xl bg-gray-50 border border-gray-200 px-4 py-3 text-gray-700 placeholder-gray-400 focus:ring-2 focus:ring-indigo-400 focus:border-transparent outline-none transition-all duration-200 hover:border-gray-300"
                    autoComplete="off"
                  />
                </div>

                <div>
                  <label className="text-sm font-semibold text-gray-700 flex items-center gap-1">
                    <FiShield className="w-4 h-4 text-indigo-500" />
                    Role <span className="text-red-500 text-xs">*</span>
                  </label>
                  <select
                    value={role}
                    onChange={(e) => setRole(e.target.value)}
                    className="mt-2 w-full rounded-xl bg-gray-50 border border-gray-200 px-4 py-3 text-gray-700 focus:ring-2 focus:ring-indigo-400 focus:border-transparent outline-none transition-all duration-200 hover:border-gray-300"
                    required
                  >
                    <option value="">Select Role</option>
                    <option value="admin">Admin</option>
                  </select>
                </div>

                <div className="md:col-span-2">
                  <label className="text-sm font-semibold text-gray-700 flex items-center gap-1">
                    <FiMapPin className="w-4 h-4 text-indigo-500" />
                    Address
                  </label>
                  <input
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    type="text"
                    placeholder="Enter full address"
                    className="mt-2 w-full rounded-xl bg-gray-50 border border-gray-200 px-4 py-3 text-gray-700 placeholder-gray-400 focus:ring-2 focus:ring-indigo-400 focus:border-transparent outline-none transition-all duration-200 hover:border-gray-300"
                    autoComplete="off"
                  />
                </div>

                {/* Form Actions */}
                <div className="md:col-span-2 flex flex-col sm:flex-row gap-4 justify-end mt-4 pt-4 border-t border-gray-200">
                  <button
                    type="button"
                    onClick={() => navigate('/listofusers')}
                    className="px-8 py-3 rounded-xl text-gray-700 font-semibold border border-gray-300 hover:bg-gray-50 transition-all duration-200"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={loading}
                    className="px-8 py-3 rounded-xl bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-white font-bold shadow-lg hover:shadow-xl hover:scale-105 transition transform disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2 justify-center"
                  >
                    {loading ? (
                      <>
                        <svg className="animate-spin h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        Creating User...
                      </>
                    ) : (
                      <>
                        <FiUserPlus className="w-5 h-5" />
                        Create User
                      </>
                    )}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddNewuser;