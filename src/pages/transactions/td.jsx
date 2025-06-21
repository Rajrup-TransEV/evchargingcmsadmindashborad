import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const TD = () => {
    const navigate = useNavigate();
    const { uid } = useParams();
    const [loading, setLoading] = useState(true);
    const [transdata, setTransdata] = useState([]);
    const [au, setAu] = useState([]); // Initialize as an empty array

    // Check for user authentication
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

    // Fetch transaction details
    useEffect(() => {
        const fetchtd = async () => {
            const rooturi = import.meta.env.VITE_ROOT_URI;
            const apikey = import.meta.env.VITE_API_KEY;

            try {
                const response = await fetch(`${rooturi}/admin/thisu`, {
                    method: "POST",
                    headers: {
                        'Content-Type': 'application/json',
                        'apiauthkey': apikey,
                    },
                    body: JSON.stringify({ userid: uid })
                });
                
                if (response.ok) {
                    const result = await response.json();
                    setTransdata(result.td); // Assuming result.td is an array
                    setAu(result.au); // Ensure au is an array
                    console.log("au data",au)
                }
            } catch (error) {
                console.error("Error during data fetch:", error);
                toast("An error occurred while fetching the data");
            } finally {
                setLoading(false);
            }
        };
        fetchtd();
    }, [uid]);

    // IP tracking facility
    useEffect(() => {
        const fetchIpAddress = async () => {
            const rooturi = import.meta.env.VITE_ROOT_URI;
            const apikey = import.meta.env.VITE_API_KEY;

            try {
                const response = await fetch("https://api.ipify.org?format=json");
                const data = await response.json();
                
                if (data) {
                    const currentDateTime = new Date().toISOString();
                    await fetch(`${rooturi}/admin/getip`, {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                            'apiauthkey': apikey,
                        },
                        body: JSON.stringify({ ip: data.ip, datetime: currentDateTime, path: "td.jsx" })
                    });
                }
            } catch (error) {
                console.error("Error fetching IP address:", error);
            }
        };

        fetchIpAddress();
    }, []);

    // Navigate back to home
    const backtohome = (event) => {
        event.preventDefault();
        navigate("/");
    };

    if (loading) return <div>Loading...</div>;

    return (
        <div className="container mx-auto py-8">
            <div className="py-11">
                <button 
                    className="relative inline-block text-white font-bold py-2 px-4 rounded-full overflow-hidden group transition-transform duration-300 transform hover:scale-105"
                    onClick={backtohome}
                >
                    <span className="absolute inset-0 bg-gradient-to-r from-teal-400 via-teal-500 to-teal-600 transform scale-110 group-hover:scale-100 transition duration-300"></span>
                    <span className="relative z-10">HOME</span>
                </button>
            </div>
            <h1 className="text-3xl font-bold mb-4">Transactions Details</h1>
            <p className="mb-4">User UID: {uid}</p>

            {transdata.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {/* Transaction Details */}
                    {transdata.map((transaction) => (
                        <div key={transaction.uid} className="border p-4 rounded shadow mb-4">
                            <p className="font-bold">Transaction ID:</p>
                            <p className="mb-2">{transaction.paymentid}</p>
                            <p className="font-bold">Wallet ID:</p>
                            <p className="mb-2">{transaction.walletid}</p>
                            <p className="font-bold">User ID:</p>
                            <p className="mb-2">{transaction.userid}</p>
                            <p className="font-bold">Price:</p>
                            <p className="mb-2">{transaction.price}</p>
                            <p className="font-bold">Charger UID:</p>
                            <p className="mb-2">{transaction.chargeruid}</p>
                        </div>
                    ))}

                    {/* Associated User Details
                    <div>
                        <h1 className="text-3xl font-bold mb-4">Associated User Details</h1>
                        {au.length > 0 ? (
                            au.map((user) => (
                                <div key={user.uid} className="border p-4 rounded shadow mb-4">
                                    <h2 className="text-xl font-semibold mb-2">User UID: {user.uid}</h2>
                                    <p className="font-bold">Full Name:</p>
                                    <p className="mb-2">{user.username}</p>
                                    <p className="font-bold">Email:</p>
                                    <p className="mb-2">{user.email}</p>
                                    <p className="font-bold">Phone Number:</p>
                                    <p className="mb-2">{user.phonenumber}</p>
                                </div>
                            ))
                        ) : (
                            <p>No associated users found.</p>
                        )}
                    </div> */}
                </div>
            ) : (
                <p>No transaction details found.</p>
            )}
        </div>
    );
};

export default TD;