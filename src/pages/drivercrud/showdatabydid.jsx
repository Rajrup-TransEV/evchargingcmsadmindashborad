import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const ShowDataByID = () => {
    const navigate = useNavigate();
    const { uid } = useParams();
    const [driverData, setdriverData] = useState(null);
    const [vehicledata, setvehicledata] = useState([]); // Initialize as an array
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

    useEffect(() => {
        const fetchsingulardata = async () => {
            const rooturi = import.meta.env.VITE_ROOT_URI;
            const apikey = import.meta.env.VITE_API_KEY;

            try {
                const response = await fetch(`${rooturi}/admin/getvobye`, {
                    method: "POST",
                    headers: {
                        'Content-Type': 'application/json',
                        'apiauthkey': apikey,
                    },
                    body: JSON.stringify({ uid: uid })
                });

                if (response.ok) {
                    const result = await response.json();
                    console.log(result.vedata)
                    setdriverData(result.vodata);
                    setvehicledata(result.vedata || []); // Ensure it's an array
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

    const backtohome = (event) => {
        event.preventDefault(); // Prevent default action
        navigate("/"); // Navigate to home
      }
    if (loading) return <div>Loading...</div>;

    return (
        <div className="container mx-auto py-8">
            <h1 className="text-3xl font-bold mb-4">Driver Details</h1>
            <p className="mb-4">Driver UID: {uid}</p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Driver Data */}
                {driverData && (
                    <div className="border p-4 rounded shadow">
                        <h2 className="text-xl font-semibold mb-2">Driver Information</h2>
                        <p className="font-bold">Vehicle Owner First Name:</p>
                        <p className="mb-2">{driverData.vehicleowenerfirstname}</p>
                        <p className="font-bold">Vehicle Owner Last Name:</p>
                        <p className="mb-2">{driverData.vehicleowenerlastename}</p>
                        <p className="font-bold">Vehicle Owner Email:</p>
                        <p className="mb-2">{driverData.vehicleoweneremail}</p>
                        <p className="font-bold">Vehicle Owner Address:</p>
                        <p className="mb-2">{driverData.vehicleoweneraddress}</p>
                        <p className="font-bold">Vehicle Owner Gov Docs:</p>
                        <p className="mb-2">{driverData.vehicleowenergovdocs}</p>
                        <p className="font-bold">Admin ID:</p>
                        <p className="mb-2">{driverData.adminid}</p>
                        <p className="font-bold">Vehicle Owner License:</p>
                        <p className="mb-2">{driverData.vehicleowenerlicense}</p>
                        <p className="font-bold">Vehicle Owner Nationality:</p>
                        <p className="mb-2">{driverData.vehicleowenernationality}</p>
                        <p className="font-bold">Vehicle Owner Role:</p>
                        <p className="mb-2">{driverData.vehicleowenerrole}</p>
                    </div>
                )}

                {/* Vehicle Data */}
                {vehicledata.length > 0 && (
                    <div className="border p-4 rounded shadow">
                        <h2 className="text-xl font-semibold mb-2">Vehicle Information</h2>
                        {vehicledata.map((vehicle) => (
                            <div key={vehicle.id} className="mb-4">
                                <h3 className="font-semibold">Vehicle UID: {vehicle.uid}</h3>
                                <p className="font-bold">Vehicle Category:</p>
                                <p className="mb-2">{vehicle.vehiclecategory}</p>
                                <p className="font-bold">vehiclelicense:</p>
                                <p className="mb-2">{vehicle.vehiclelicense}</p>
                                <p className="font-bold">vehiclemodel:</p>
                                <p className="mb-2">{vehicle.vehiclemodel}</p>
                                <p className="font-bold">vehiclename:</p>
                                <p className="mb-2">{vehicle.vehiclename}</p>
                                <p className="font-bold">vehicleowenerId:</p>
                                <p className="mb-2">{vehicle.vehicleowenerId}</p>
                                <p className="font-bold">vehicletype:</p>
                                <p className="mb-2">{vehicle.vehicletype}</p>
                            </div>
                        ))}
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

export default ShowDataByID;
