import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const DispuetformDetails = () => {
    const navigate = useNavigate();
    const { id } = useParams();
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

    // Fetch dispute form details
    useEffect(() => {
        const fetchDetails = async () => {
            const rooturi = import.meta.env.VITE_ROOT_URI;
            const apikey = import.meta.env.VITE_API_KEY;
            try {
                const response = await fetch(`${rooturi}/admin/dfsbid`, {
                    method: "POST",
                    headers: {
                        'Content-Type': 'application/json',
                        'apiauthkey': apikey,
                    },
                    body: JSON.stringify({ id: id })
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

        fetchDetails();
    }, [id]);

    return (
        <div className="relative flex items-center justify-center min-h-screen bg-cover bg-center" style={{ backgroundImage: "url('https://res.cloudinary.com/djvmehyvd/image/upload/v1730708478/jjb6gtwippzrubjbykda.png')" }}>
            <div className="absolute inset-0 bg-black opacity-50 backdrop-blur-md"></div>
            <div className="relative z-10 mx-auto max-w-5xl px-4 py-16 sm:px-6 lg:px-8">
                <div className="mx-auto max-w-lg text-center">
                    <h1 className="text-3xl font-bold text-white mb-4">Disputeform Details</h1>
                    <p className="text-white mb-4">Disputeform UID: {id}</p>
                </div>

                {/* Hub Data */}
                {hubData && (
                    <div className="relative z-10 bg-white bg-opacity-90 rounded-lg p-6 shadow-lg backdrop-blur-md mx-auto">
                        <h2 className="text-xl font-semibold mb-2">Disputeform</h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <p className="font-bold">Customer Name:</p>
                                <p className="mb-2">{hubData.customername}</p>
                                <p className="font-bold">Related to EV:</p>
                                <p className="mb-2">{hubData.relatedtoev}</p>
                                <p className="font-bold">Reason:</p>
                                <p className="mb-2">{hubData.reason}</p>
                                <p className="font-bold">More than one charge:</p>
                                <p className="mb-2">{hubData.morethanonecharge}</p>
                            </div>
                            <div>
                                <p className="font-bold">Wrong charged:</p>
                                <p className="mb-2">{hubData.wrongcharged}</p>
                                <p className="font-bold">Did not receive refund:</p>
                                <p className="mb-2">{hubData.didnotreceiverefund}</p>
                                <p className="font-bold">Paid for other means:</p>
                                <p className="mb-2">{hubData.paidforothermeans}</p>
                                <p className="font-bold">Dispute transaction:</p>
                                <p className="mb-2">{hubData.disputtransaction}</p>
                                <p className="font-bold">Charged regularly:</p>
                                <p className="mb-2">{hubData.chargedregularly}</p>
                            </div>
                        </div>

                        {/* Additional fields in a new row */}
                        <div className="mt-4">
                            <p className="font-bold">Not listed above:</p>
                            <p className="mb-2">{hubData.notlistedabove}</p>
                            <p className="font-bold">Transaction details:</p>
                            <p className="mb-2">{hubData.transactiondetails}</p> 
                            <p className="font-bold">Dispute details:</p>
                            <p className="mb-2">{hubData.disputedetails}</p>  
                            <p className="font-bold">Associated admin ID:</p>
                            <p className="mb-2">{hubData.associatedadminid}</p>                   
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
