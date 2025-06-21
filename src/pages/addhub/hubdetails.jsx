import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const HubDetails = () => {
    const navigate = useNavigate();
    const { uid } = useParams();
    const [hubData, setHubData] = useState({});
    const [loading, setLoading] = useState(true);

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

    // Fetch hub details
    useEffect(() => {
        const fetchsingulardata = async () => {
            const rooturi = import.meta.env.VITE_ROOT_URI;
            const apikey = import.meta.env.VITE_API_KEY;

            try {
                const response = await fetch(`${rooturi}/admin/hubdetails`, {
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
                        toast("No hub data found");
                    }
                } else {
                    toast("Failed to fetch charger details");
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

    // Go to user details page
    const handleUidClick = (uid) => {
        navigate(`/userdetails/${uid}`);
    };

    // Go to charger details page
    const handleChargerUidClick = (uid) => {
        navigate(`/chargerdetails/${uid}`);
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
                const pathfinder = "hubdetails.jsx"
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
    // Loading state
    if (loading) return <div>Loading...</div>;

    return (
        <div className="container mx-auto py-8">
            <h1 className="text-3xl font-bold mb-4">Hub Details</h1>
            <p className="mb-4">Hub UID: {uid}</p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Hub Data */}
                {hubData && (
                    <div className="border p-4 rounded shadow">
                        <h2 className="text-xl font-semibold mb-2">Hub Information</h2>
                        <p className="font-bold">hubname:</p>
                        <p className="mb-2">{hubData.hubname}</p>
                        <p className="font-bold">hubchargers:</p>
                        <p className="mb-2">
                            {Array.isArray(hubData.hubchargers) && hubData.hubchargers.length > 0 ? (
                                hubData.hubchargers.map((chargerId, index) => (
                                    <span key={chargerId}>
                                        <button 
                                            className="text-blue-600 hover:underline" 
                                            onClick={() => handleChargerUidClick(chargerId)}
                                        >
                                            {chargerId}
                                        </button>
                                        {index < hubData.hubchargers.length - 1 && ', '}
                                    </span>
                                ))
                            ) : (
                                <span>No chargers available</span>
                            )}
                        </p>
                        <p className="font-bold">hubtariff:</p>
                        <p className="mb-2">{hubData.hubtariff}</p>
                        <p className="font-bold">hublocation:</p>
                        <p className="mb-2">{hubData.hublocation}</p>
                        <p className="font-bold">adminuid:</p>
                        <p className="mb-2">
                            <button 
                                className="text-blue-600 hover:underline" 
                                onClick={() => handleUidClick(hubData.adminuid)}
                            >
                                {hubData.adminuid}
                            </button>
                        </p>            
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
    );
}

export default HubDetails;