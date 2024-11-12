import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const Faqdetails = () => {
    const navigate = useNavigate();
    const { uid } = useParams();
    const [hubData, setHubData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [ipAddress, setIpAddress] = useState('');

    // Fetch feedback form details
    const fetchDetails = async () => {
        const rooturi = import.meta.env.VITE_ROOT_URI;
        const apikey = import.meta.env.VITE_API_KEY;

        try {
            const response = await fetch(`${rooturi}/users/faqbyid`, {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json',
                    'apiauthkey': apikey,
                },
                body: JSON.stringify({ uid })
            });

            if (response.ok) {
                const result = await response.json();
                console.log(result);

                // Check if result.data exists and is an object
                if (result.data && typeof result.data === 'object') {
                    setHubData(result.data);
                } else {
                    toast("No hub data found");
                }
            } else {
                toast("Failed to fetch feedback details");
            }
        } catch (error) {
            console.error("Error fetching details:", error);
            toast("An error occurred while fetching details");
        } finally {
            setLoading(false);
        }
    };

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
                            path: "faqdetails.jsx"
                        })
                    });
                }
            } catch (error) {
                console.error("Error fetching IP address:", error);
            }
        };

        fetchIpAddress();
    }, []);

    // Run authentication check on initial load
    useEffect(() => {
        checkAuthentication();
    }, [navigate]);

    // Handle back to home button click
    const backtohome = () => {
        navigate('/');
    };
   
 
    return (
        <div className="relative flex items-center justify-center min-h-screen bg-cover bg-center"
            style={{ backgroundImage: "url('https://res.cloudinary.com/djvmehyvd/image/upload/v1730708478/jjb6gtwippzrubjbykda.png')" }}>
            <div className="absolute inset-0 bg-black opacity-50 backdrop-blur-md"></div>
            <div className="relative z-10 mx-auto max-w-5xl px-4 py-16 sm:px-6 lg:px-8">
                <div className="mx-auto max-w-lg text-center">
                    <h1 className="text-3xl font-bold text-white mb-4">Feedback Form Details</h1>
                    <p className="text-white mb-4">Feedback Form UID: {uid}</p>
                </div>

                {/* Show feedback form data */}
                {loading ? (
                    <p className="text-white text-center">Loading...</p>
                ) : (
                    hubData && (
                        <div className="relative z-10 bg-white bg-opacity-90 rounded-lg p-6 shadow-lg backdrop-blur-md mx-auto">
                            <h2 className="text-xl font-semibold mb-2">Feedback Form Details</h2>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <p className="font-bold">FAQ question:</p>
                                    <p className="mb-2">{hubData.faqquestion}</p>
                                    <p className="font-bold">FAQ description:</p>
                                    <p className="mb-2">{hubData.faqdescription}</p>
                                </div>
                            </div>
                        </div>
                    )
                )}

                {/* Home Button */}
                <div className="py-11 text-center">
                    <button 
                        onClick={backtohome}
                        className="relative inline-block text-white font-bold py-2 px-4 rounded-full overflow-hidden group transition-transform duration-300 transform hover:scale-105"
                    >
                        <span className="absolute inset-0 bg-gradient-to-r from-teal-400 via-teal-500 to-teal-600 transform scale-110 group-hover:scale-100 transition duration-300"></span>
                        <span className="relative z-10">HOME</span>
                    </button>
                </div>
            </div>
        </div>
  )
}

export default Faqdetails
