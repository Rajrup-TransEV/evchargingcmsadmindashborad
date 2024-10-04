import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const AddMinimumBalance = () => {
    const [minbal,setminbal]=useState('');
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

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
                        // navigate("/");
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

const handleSubmit= async(e)=>{
    e.preventDefault();
        setLoading(true);
        setError(null);
    try {
        const rooturi = import.meta.env.VITE_ROOT_URI;
        const apikey = import.meta.env.VITE_API_KEY;

        const response = await fetch(`${rooturi}/users/createmb`,{
            method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'apiauthkey': apikey,
            },
            body:JSON.stringify({minbalance:minbal})
        })
        const data = await response.json()
        if(response.ok){
            toast.info(data.message)
        }
    } catch (error) {
        toast.error("Unkown error occurred",error)
        console.log(error)
    }finally{
        setLoading(false)
    }


} 
  return (
    <div>
    <form action="#" onSubmit={handleSubmit}>
  <label htmlFor="minbal" className="block text-xs font-medium text-gray-700 dark:text-gray-200">
    Minimum Balance
  </label>

  <input
    type="text"
    id="minbal"
    name="minbal"
    value = {minbal}
    onChange={(e)=>setminbal(e.target.value)}
    placeholder="Ex. RS 300"
    className="mt-1 w-full rounded-md border-gray-200 shadow-sm sm:text-sm dark:border-gray-700 dark:bg-gray-800 dark:text-white"
  />
     <div className="col-span-6 sm:flex sm:items-center sm:gap-4">
              <button
                className="inline-block shrink-0 rounded-md border border-blue-600 bg-blue-600 px-12 py-3 text-sm font-medium text-white transition hover:bg-transparent hover:text-blue-600 focus:outline-none focus:ring active:text-blue-500 dark:hover:bg-blue-700 dark:hover:text-white"
              >
           {loading ? 'Processing...' : 'Save'}
              </button>
            </div>
    </form>
    </div>
  )
}

export default AddMinimumBalance
