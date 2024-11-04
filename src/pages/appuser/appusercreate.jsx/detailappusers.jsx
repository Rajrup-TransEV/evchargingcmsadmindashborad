import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const DetailsAppUser = () => {
    const { uid } = useParams();
    const navigate = useNavigate();

    // State declarations
    const [userData, setUserData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [pfimage,setpfimage]=useState('');
    const [ipAddress, setIpAddress] = useState('');

    // Check authentication
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

    // IP tracking facility
    useEffect(() => {
        const fetchIpAddress = async () => {
            const rooturi = import.meta.env.VITE_ROOT_URI;
            const apikey = import.meta.env.VITE_API_KEY;

            try {
                const response = await fetch("https://api.ipify.org?format=json");
                const data = await response.json();

                if (data) {
                    setIpAddress(data.ip);
                    const currentDateTime = new Date().toISOString();
                    const pathfinder = "detailsappusers.jsx";

                    await fetch(`${rooturi}/admin/getip`, {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                            'apiauthkey': apikey,
                        },
                        body: JSON.stringify({ ip: data.ip, datetime: currentDateTime, path: pathfinder })
                    });
                }
            } catch (error) {
                console.error("Error fetching IP address:", error);
            }
        };

        fetchIpAddress();
    }, []); // Runs once after initial render

    // Fetch single user details
    useEffect(() => {
        const fetchsingulardata = async () => {
            const rooturi = import.meta.env.VITE_ROOT_URI;
            const apikey = import.meta.env.VITE_API_KEY;

            try {
                const response = await fetch(`${rooturi}/users/puprofile`, {
                    method: "POST",
                    headers: {
                        'Content-Type': 'application/json',
                        'apiauthkey': apikey,
                    },
                    body: JSON.stringify({ userid: uid })
                });

                if (response.ok) {
                    const result = await response.json();
                    setUserData(result.data);
                    setpfimage(result.pfimage)
                } else {
                    toast("Failed to fetch user details");
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

    // Render loading state or user details
    if (loading) return <div>Loading...</div>;

    return (
        <div className="container mx-auto py-8">
            <div className="py-11">
                <button 
                    className="relative inline-block text-white font-bold py-2 px-4 rounded-full overflow-hidden group transition-transform duration-300 transform hover:scale-105"
                    onClick={(event) => navigate("/")}
                >
                    <span className="absolute inset-0 bg-gradient-to-r from-teal-400 via-teal-500 to-teal-600 transform scale-110 group-hover:scale-100 transition duration-300"></span>
                    <span className="relative z-10">HOME</span>
                </button>
            </div>

            <h1 className="text-3xl font-bold mb-4">User Details</h1>
            <p className="mb-4">User UID: {uid}</p>
            
            {userData && (
                <div className="bg-white shadow-lg rounded-lg overflow-hidden transform transition-all duration-300 hover:scale-105">
                    <div className="p-6">
                        <div className="flex items-center mb-4">
                            <img 
                                src={pfimage || 'https://via.placeholder.com/150'} 
                                alt="Profile"
                                className="w-24 h-24 rounded-full border-2 border-teal-500"
                            />
                            <div className="ml-4">
                                <h2 className="text-xl font-semibold">{userData.username} {userData.lastname}</h2>
                                <p className="text-gray-600">Role: {userData.email}</p>
                                <p className="text-gray-600">Phone: {userData.phonenumber}</p>
                            </div>
                        </div>
                        {/* <div>
                            <p className="font-bold">Address:</p>
                            <p className="mb-2">{userData.address}</p>
                            <p className="font-bold">Designation:</p>
                            <p className="mb-2">{userData.designation}</p>
                        </div> */}
                    </div>
                </div>
            )}
        </div>
    );
};

export default DetailsAppUser;
