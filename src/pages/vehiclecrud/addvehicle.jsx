import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const AddVehicle = () => {
  const navigate = useNavigate();
  const[vehiclename,setvehiclename]=useState('');
  const[vehiclemodel,setvehiclemodel]=useState('');
  const[vehiclelicense,setvehiclelicense]=useState('');
  const[vehicleowner,setvehicleowner]=useState('');
  const[vehicletype,setvehicletype]=useState('');
  const[vehiclecategory,setvehiclecategory]=useState('')
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const checkAuthentication = async () => {
        const rooturi = import.meta.env.VITE_ROOT_URI;
        const apikey = import.meta.env.VITE_API_KEY;

        try {
            const gettoken = localStorage.getItem("token");
            if (!gettoken) {
                navigate("/signin");
                return;
            }

            const response = await fetch(`${rooturi}/userauth/verifyuser`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'apiauthkey': apikey,
                },
                body: JSON.stringify({ token: gettoken })
            });

            const data = await response.json();
            if (response.ok) {
                if (data.user.userType !== "superadmin") {
                    toast("You have no authorization to view this page");
                    navigate("/signin");
                } else {
                    console.log("You are an authorized user");
                }
            } else {
                toast("Failed to verify user");
                navigate("/signin");
            }
        } catch (error) {
            console.error("Error during authentication check:", error);
            toast("An error occurred during authentication");
            navigate("/signin");
        }
    };

    checkAuthentication();
}, [navigate]);


const handelSubmit = async(e)=>{
  e.preventDefault();
  setLoading(true);

  try {
    const apikey = import.meta.env.VITE_API_KEY;
    const rooturi = import.meta.env.VITE_ROOT_URI;

    const response = await fetch(`${rooturi}/admin/createav`,{
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'apiauthkey': apikey,
      },
      body:JSON.stringify({
        vehiclename,
        vehiclemodel,
        vehiclelicense,
        vehicleowner,
        vehicletype,
        vehiclecategory
      })
    })
    const data= await response.json()
    if(response.ok){
      toast(data.message)
    }else{
      toast.error(data.message)
      setLoading(false)
    }
  } catch (error) {
    console.log(error)
    toast.error('Failed to add data')
    setLoading(false)
  }

}

const [ipAddress, setIpAddress] = useState('');
//ip tracking facility
useEffect(() => {
  // Fetch the IP address from the API
  const fetchIpAddress = async () => {
    const rooturi = import.meta.env.VITE_ROOT_URI;
    const apikey = import.meta.env.VITE_API_KEY;
      try {
          const response = await fetch("https://api.ipify.org?format=json");
          const data = await response.json();
          console.log(data)
          // Set the IP address in state
          if(data){
            setIpAddress(data.ip);
            const currentDateTime = new Date().toISOString();
            const pathfinder = "addvehicle.jsx"
            const resp = await fetch(`${rooturi}/admin/getip`,{
                method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'apiauthkey': apikey,
            },
            body: JSON.stringify({ip:data.ip,datetime:currentDateTime,path:pathfinder})
            })
          }
      

      } catch (error) {
          console.error("Error fetching IP address:", error);
      }
  };

  fetchIpAddress();
}, []); // Empty dependency array means this runs once after the initial render

const backtohome = (event) => {
  event.preventDefault(); // Prevent default action
  navigate("/"); // Navigate to home
}

  return (
  
  <section class="bg-white dark:bg-gray-900">
    <div class="lg:grid lg:min-h-screen lg:grid-cols-12">
      <aside class="relative block h-16 lg:order-last lg:col-span-5 lg:h-full xl:col-span-6">
        <img
          alt=""
          src="https://images.unsplash.com/photo-1605106702734-205df224ecce?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80"
          class="absolute inset-0 h-full w-full object-cover"
        />
      </aside>
  
      <main
        class="flex items-center justify-center px-8 py-8 sm:px-12 lg:col-span-7 lg:px-16 lg:py-12 xl:col-span-6"
      >
        <div class="max-w-xl lg:max-w-3xl">
          <a class="block text-blue-600" href="/">
            <span class="sr-only">Home</span>
            <svg
              class="h-8 sm:h-10"
              viewBox="0 0 28 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M0.41 10.3847C1.14777 7.4194 2.85643 4.7861 5.2639 2.90424C7.6714 1.02234 10.6393 0 13.695 0C16.7507 0 19.7186 1.02234 22.1261 2.90424C24.5336 4.7861 26.2422 7.4194 26.98 10.3847H25.78C23.7557 10.3549 21.7729 10.9599 20.11 12.1147C20.014 12.1842 19.9138 12.2477 19.81 12.3047H19.67C19.5662 12.2477 19.466 12.1842 19.37 12.1147C17.6924 10.9866 15.7166 10.3841 13.695 10.3841C11.6734 10.3841 9.6976 10.9866 8.02 12.1147C7.924 12.1842 7.8238 12.2477 7.72 12.3047H7.58C7.4762 12.2477 7.376 12.1842 7.28 12.1147C5.6171 10.9599 3.6343 10.3549 1.61 10.3847H0.41ZM23.62 16.6547C24.236 16.175 24.9995 15.924 25.78 15.9447H27.39V12.7347H25.78C24.4052 12.7181 23.0619 13.146 21.95 13.9547C21.3243 14.416 20.5674 14.6649 19.79 14.6649C19.0126 14.6649 18.2557 14.416 17.63 13.9547C16.4899 13.1611 15.1341 12.7356 13.745 12.7356C12.3559 12.7356 11.0001 13.1611 9.86 13.9547C9.2343 14.416 8.4774 14.6649 7.7 14.6649C6.9226 14.6649 6.1657 14.416 5.54 13.9547C4.4144 13.1356 3.0518 12.7072 1.66 12.7347H0V15.9447H1.61C2.39051 15.924 3.154 16.175 3.77 16.6547C4.908 17.4489 6.2623 17.8747 7.65 17.8747C9.0377 17.8747 10.392 17.4489 11.53 16.6547C12.1468 16.1765 12.9097 15.9257 13.69 15.9447C14.4708 15.9223 15.2348 16.1735 15.85 16.6547C16.9901 17.4484 18.3459 17.8738 19.735 17.8738C21.1241 17.8738 22.4799 17.4484 23.62 16.6547ZM23.62 22.3947C24.236 21.915 24.9995 21.664 25.78 21.6847H27.39V18.4747H25.78C24.4052 18.4581 23.0619 18.886 21.95 19.6947C21.3243 20.156 20.5674 20.4049 19.79 20.4049C19.0126 20.4049 18.2557 20.156 17.63 19.6947C16.4899 18.9011 15.1341 18.4757 13.745 18.4757C12.3559 18.4757 11.0001 18.9011 9.86 19.6947C9.2343 20.156 8.4774 20.4049 7.7 20.4049C6.9226 20.4049 6.1657 20.156 5.54 19.6947C4.4144 18.8757 3.0518 18.4472 1.66 18.4747H0V21.6847H1.61C2.39051 21.664 3.154 21.915 3.77 22.3947C4.908 23.1889 6.2623 23.6147 7.65 23.6147C9.0377 23.6147 10.392 23.1889 11.53 22.3947C12.1468 21.9165 12.9097 21.6657 13.69 21.6847C14.4708 21.6623 15.2348 21.9135 15.85 22.3947C16.9901 23.1884 18.3459 23.6138 19.735 23.6138C21.1241 23.6138 22.4799 23.1884 23.62 22.3947Z"
                fill="currentColor"
              />
            </svg>
          </a>
  
          <h1 class="mt-6 text-2xl font-bold text-gray-900 sm:text-3xl md:text-4xl dark:text-white">
            Welcome to Add new vehicle section 🦑
          </h1>
  
          <p class="mt-4 leading-relaxed text-gray-500 dark:text-gray-400">
        Add a new vehicle here 
          </p>
  
          <form action="#" class="mt-8 grid grid-cols-6 gap-6" onSubmit={handelSubmit}>
            <div class="col-span-6 sm:col-span-3">
              <label
                for="vehiclename"
                class="block text-sm font-medium text-gray-700 dark:text-gray-200"
              >
                Vehicle Name
              </label>
  
              <input
                type="text"
                id="vehiclename"
                name="vehiclename"
                value={vehiclename}
                onChange={(e)=>setvehiclename(e.target.value)}
                class="mt-1 w-full rounded-md border-gray-200 bg-white text-sm text-gray-700 shadow-sm dark:border-gray-700 dark:bg-gray-800 dark:text-gray-200"
              />
            </div>
  
            <div class="col-span-6 sm:col-span-3">
              <label
                for="vehiclemodel"
                class="block text-sm font-medium text-gray-700 dark:text-gray-200"
              >
               vehiclemodel
              </label>
  
              <input
                type="text"
                id="vehiclemodel"
                name="vehiclemodel"
                value={vehiclemodel}
                onChange={(e)=>setvehiclemodel(e.target.value)}
                class="mt-1 w-full rounded-md border-gray-200 bg-white text-sm text-gray-700 shadow-sm dark:border-gray-700 dark:bg-gray-800 dark:text-gray-200"
              />
            </div>
  
            <div class="col-span-6">
              <label for="vehiclelicense" class="block text-sm font-medium text-gray-700 dark:text-gray-200">
              vehiclelicense
              </label>
  
              <input
                type="text"
                id="vehiclelicense"
                name="vehiclelicense"
                value={vehiclelicense}
                onChange={(e)=>setvehiclelicense(e.target.value)}
                class="mt-1 w-full rounded-md border-gray-200 bg-white text-sm text-gray-700 shadow-sm dark:border-gray-700 dark:bg-gray-800 dark:text-gray-200"
              />
            </div>
  
            <div class="col-span-6 sm:col-span-3">
              <label
                for="vehicleowner"
                class="block text-sm font-medium text-gray-700 dark:text-gray-200"
              >
                Vehicleowner email
              </label>
  
              <input
                type="text"
                id="vehicleowner"
                name="vehicleowner"
                value={vehicleowner}
                onChange={(e)=>setvehicleowner(e.target.value)}
                class="mt-1 w-full rounded-md border-gray-200 bg-white text-sm text-gray-700 shadow-sm dark:border-gray-700 dark:bg-gray-800 dark:text-gray-200"
              />
            </div>
  
            <div class="col-span-6 sm:col-span-3">
              <label
                for="vehicletype"
                class="block text-sm font-medium text-gray-700 dark:text-gray-200"
              >
                Vehicle condition
              </label>
  
              <select
                 id="vehicletype"
                 name="vehicletype"
                 value={vehicletype}
                 onChange={(e)=>setvehicletype(e.target.value)}
                    className="mt-1 w-full rounded-md border-gray-200 bg-white text-sm text-gray-700 shadow-sm dark:border-gray-700 dark:bg-gray-800 dark:text-gray-200"
              >
                    <option value="" disabled>Select Vehicle condition</option>
                    <option value="good">Good</option>
                    <option value="bad">Bad</option>
              </select>
            </div>
             <div class="col-span-6 sm:col-span-3">
              <label
                for="vehiclecategory"
                class="block text-sm font-medium text-gray-700 dark:text-gray-200"
              >
                vehiclecategory
              </label>
  
              <input
                type="text"
                id="vehiclecategory"
                name="vehiclecategory"
                value={vehiclecategory}
                onChange={(e)=>setvehiclecategory(e.target.value)}
                class="mt-1 w-full rounded-md border-gray-200 bg-white text-sm text-gray-700 shadow-sm dark:border-gray-700 dark:bg-gray-800 dark:text-gray-200"
              />
            </div>
            <div class="col-span-6 sm:flex sm:items-center sm:gap-4">
              <button
                class="inline-block shrink-0 rounded-md border border-blue-600 bg-blue-600 px-12 py-3 text-sm font-medium text-white transition hover:bg-transparent hover:text-blue-600 focus:outline-none focus:ring active:text-blue-500 dark:hover:bg-blue-700 dark:hover:text-white"
              >
                Create an account
              </button>
            </div>
          </form>
        </div>
      </main>
    </div>
    <div className="py-11">
                <button 
        className="relative inline-block text-white font-bold py-2 px-4 rounded-full overflow-hidden group transition-transform duration-300 transform hover:scale-105"
        onClick={(event) => backtohome(event)}
    >
        <span className="absolute inset-0 bg-gradient-to-r from-teal-400 via-teal-500 to-teal-600 transform scale-110 group-hover:scale-100 transition duration-300"></span>
        <span className="relative z-10">HOME</span>
    </button>
</div>
  </section>
  
  )
}

export default AddVehicle
