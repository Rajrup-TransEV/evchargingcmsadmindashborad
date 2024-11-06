import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const DispuetformDetails = () => {
    const navigate = useNavigate();
    const { uid } = useParams();
    const [hubData, setHubData] = useState({});
    const [loading, setLoading] = useState(true);

    // Function to fetch dispute form details
    const fetchDetails = async () => {
        const rooturi = import.meta.env.VITE_ROOT_URI;
        const apikey = import.meta.env.VITE_API_KEY;
        try {
            const response = await fetch(`${rooturi}/admin/dsm`, {
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
                
                // Check if result.data exists and is an object
                if (result.data && typeof result.data === 'object') {
                    setHubData(result.data); // Set hubData to the result.data object
                } else {
                    toast("No hub data found");
                }
            } else {
                toast("Failed to fetch dispute form details");
            }
        } catch (error) {
            console.log(error);
            toast("An error occurred while fetching details");
        }
    };

    // Use effect to check if user is logged in
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

    // Fetch dispute form details on component mount
    useEffect(() => {
        fetchDetails(); // Call the fetchDetails function to get initial data
    }, [uid]);

    // Function to toggle resolved status
    const toggleResolvedStatus = async () => {
        const rooturi = import.meta.env.VITE_ROOT_URI;
        const apikey = import.meta.env.VITE_API_KEY;

        try {
            const response = await fetch(`${rooturi}/admin/ust`, {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json',
                    'apiauthkey': apikey,
                },
                body: JSON.stringify({ uid: uid })
            });

            if (response.ok) {
                const result = await response.json();
                toast(result.message); // Show success message
                // Optionally, refetch details to update the UI
                fetchDetails(); // Call fetchDetails again to get updated status
            } else {
                toast("Failed to update resolved status");
            }
        } catch (error) {
            console.error(error);
            toast("An error occurred while updating resolved status");
        }
    };
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
                const pathfinder = "helpandsupportdetails.jsx"
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
  

    return (
        <div className="relative flex items-center justify-center min-h-screen bg-cover bg-center" style={{ backgroundImage: "url('https://res.cloudinary.com/djvmehyvd/image/upload/v1730708478/jjb6gtwippzrubjbykda.png')" }}>
            <div className="absolute inset-0 bg-black opacity-50 backdrop-blur-md"></div>
            <div className="relative z-10 mx-auto max-w-5xl px-4 py-16 sm:px-6 lg:px-8">
                <div className="mx-auto max-w-lg text-center">
                    <h1 className="text-3xl font-bold text-white mb-4">Help and Support Details</h1>
                    <p className="text-white mb-4">Support ID : {uid}</p>
                </div>

                {/* Hub Data */}
                {hubData && (
                    <div className="relative z-10 bg-white bg-opacity-90 rounded-lg p-6 shadow-lg backdrop-blur-md mx-auto">
                        <h2 className="text-xl font-semibold mb-2">Support ID</h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <p className="font-bold">Customer Name:</p>
                                <p className="mb-2">{hubData.name}</p>
                                <p className="font-bold">Email:</p>
                                <p className="mb-2">{hubData.email}</p>
                                <p className="font-bold">phone:</p>
                                <p className="mb-2">{hubData.phonenumber}</p>
                                <p className="font-bold">Message:</p>
                                <p className="mb-2">{hubData.message}</p>
                            </div>
                            <div>
                                <p className="font-bold">Associated admin:</p>
                                <p className="mb-2">{hubData.adminuid}</p>
                            </div>
                        </div>

                        {/* Additional fields in a new row */}
                        <div className="mt-4">
                            {/* Resolved Status Button */}
                            <div className="mt-4">
                                <button 
                                    onClick={toggleResolvedStatus}
                                    className={`py-2 px-4 rounded-full text-white font-semibold ${hubData.messagestatus ? 'bg-green-500' : 'bg-red-500'}`}
                                >
                                    {hubData.messagestatus ? 'Mark as Not Resolved' : 'Mark as Resolved'}
                                </button>
                            </div>

                            {/* Display current resolved status */}
                            <div className="mt-4">
                                <span className="font-bold">Resolved Status:</span> 
                                <span>{hubData.messagestatus ? 'Resolved' : 'Not Resolved'}</span>                 
                            </div>  
                        </div>
                    </div>
                )}

                {/* Home Button */}
                <div className="py-11 text-center">
                    <button 
                        onClick={() => navigate('/')}
                        className="relative inline-block text-white font-bold py-2 px-4 rounded-full overflow-hidden group transition-transform duration-300 transform hover:scale-105"
                    >
                        <span className="absolute inset-0 bg-gradient-to-r from-teal-400 via-teal-500 to-teal-600 transform scale-110 group-hover:scale-100 transition duration-300"></span>
                        <span className="relative z-10">HOME</span>
                    </button>
                </div>

            </div>
        </div>
    );
}

export default DispuetformDetails;
