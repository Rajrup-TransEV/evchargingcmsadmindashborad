import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const Contactdetails = () => {
    const navigate = useNavigate();
    const { uid } = useParams();
    const [hubData, setHubData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [ipAddress, setIpAddress] = useState('');

    useEffect(() => {
        const fetchsingulardata = async () => {
            const rooturi = import.meta.env.VITE_ROOT_URI;
            const apikey = import.meta.env.VITE_API_KEY;

            try {
                const response = await fetch(`${rooturi}/users/contactbyid`, {
                    method: "POST",
                    headers: {
                        'Content-Type': 'application/json',
                        'apiauthkey': apikey,
                    },
                    body: JSON.stringify({ uid: uid })
                });

                if (response.ok) {
                    const result = await response.json();
                    console.log(result);
                    
                    // Check if result.data is an array and has at least one item
                    if (Array.isArray(result.data) && result.data.length > 0) {
                        setHubData(result.data[0]); // Set hubData to the first item in the array
                    } else {
                        toast("No contact data found");
                    }
                } else {
                    toast("Failed to fetch contact details details");
                }
            } catch (error) {
                console.error("Error during data fetch:", error);
                toast("An error occurred while fetching data");
            } finally {
                setLoading(false);
            }
        };

        fetchsingulardata();
    }, [uid]);

    
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
    // Fetch the user's IP address
    useEffect(() => {
        const fetchIpAddress = async () => {
            try {
                const response = await fetch("https://api.ipify.org?format=json");
                const data = await response.json();

                if (data && data.ip) {
                    setIpAddress(data.ip);

                    const rooturi = import.meta.env.VITE_ROOT_URI;
                    const apikey = import.meta.env.VITE_API_KEY;
                    const currentDateTime = new Date().toISOString();

                    await fetch(`${rooturi}/admin/getip`, {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                            'apiauthkey': apikey,
                        },
                        body: JSON.stringify({
                            ip: data.ip,
                            datetime: currentDateTime,
                            path: "contactdetails.jsx"
                        })
                    });
                }
            } catch (error) {
                console.error("Error fetching IP address:", error);
            }
        };

        fetchIpAddress();
    }, []);



    // Handle back to home button click
    const backtohome = () => {
        navigate('/');
    };
  return (
     <div className="container mx-auto py-8">
            <h1 className="text-3xl font-bold mb-4">Contact Details</h1>
            <p className="mb-4">Contact UID: {uid}</p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Hub Data */}
                {hubData && (
                    <div className="border p-4 rounded shadow">
                        <h2 className="text-xl font-semibold mb-2">Contact Information</h2>
                        <p className="font-bold">firstname:</p>
                        <p className="mb-2">{hubData.firstname}</p>
                        <p className="font-bold">lastname:</p>
                        <p className="mb-2">{hubData.lastname}</p>
                        <p className="font-bold">email:</p>
                        <p className="mb-2">{hubData.email}</p>
                        <p className="font-bold">message:</p>
                        <p className="mb-2">{hubData.message}</p>           
                    </div>
                )}  
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
    </div>
  )
}

export default Contactdetails
