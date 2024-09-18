import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import ChargerUnitDetails from '../extracomp/userChargerDetails';

const SingleUserDetails = () => {
    const [userData, setUserData] = useState(null);
    const [chargerData, setChargerData] = useState(null);
    const [adminDriverdata, setAdminDriverdata] = useState([]); // Initialize as an array
    const [loading, setLoading] = useState(true);
    const { uid } = useParams();
    const navigate = useNavigate();

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

    // Fetch single user details
    useEffect(() => {
        const fetchsingulardata = async () => {
            const rooturi = import.meta.env.VITE_ROOT_URI;
            const apikey = import.meta.env.VITE_API_KEY;

            try {
                const response = await fetch(`${rooturi}/admin/getadminbyemail`, {
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
                    setChargerData(result.data.chargerUnits);
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

    // Fetch admin driver data
    useEffect(() => {
        const fetchasddata = async () => {
            const rooturi = import.meta.env.VITE_ROOT_URI;
            const apikey = import.meta.env.VITE_API_KEY;
            try {
                const response = await fetch(`${rooturi}/admin/getvobyaid`, {
                    method: "POST",
                    headers: {
                        'Content-Type': 'application/json',
                        'apiauthkey': apikey,
                    },
                    body: JSON.stringify({ adminid: uid })
                });

                if (response.ok) {
                    const result = await response.json();
                    setAdminDriverdata(result.data || []); // Ensure it's an array
                } else {
                    toast.error("Failed to fetch the details");
                }
            } catch (error) {
                toast.error(`An error occurred while fetching the data ${error}`);
            } finally {
                setLoading(false);
            }
        };
        fetchasddata();
    }, [uid]);

    if (loading) return <div>Loading...</div>;

    return (
        <div className="container mx-auto py-8">
            <h1 className="text-3xl font-bold mb-4">User Details</h1>
            <p className="mb-4">User UID: {uid}</p>
            {userData && chargerData && (
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    <div>
                        <p className="font-bold">First Name:</p>
                        <p className="mb-2">{userData.firstname}</p>
                        <p className="font-bold">Last Name:</p>
                        <p className="mb-2">{userData.lastname}</p>
                        <p className="font-bold">Phone Number:</p>
                        <p className="mb-2">{userData.phonenumber}</p>
                        <p className="font-bold">Role:</p>
                        <p className="mb-2">{userData.role}</p>
                        <p className="font-bold">Address:</p>
                        <p className="mb-2">{userData.address}</p>
                        <p className="font-bold">Designation:</p>
                        <p className="mb-2">{userData.designation}</p>
                    </div>

                    {/* Charger Details */}
                    <div>
                        <h1 className="text-3xl font-bold mb-4">User Bought Charger Details</h1>
                        {chargerData.map((charger, index) => (
                            <ChargerUnitDetails key={index} chargerData={charger} />
                        ))}
                    </div>

                    {/* Driver Details */}
                    <div>
                        <h1 className="text-3xl font-bold mb-4">User Associated Driver Details</h1>
                        {adminDriverdata && adminDriverdata.length > 0 ? (
                            adminDriverdata.map((driver) => (
                                <div key={driver.uid} className="border p-4 rounded shadow mb-4">
                                    <h2 className="text-xl font-semibold mb-2">
                                        Driver UID: {driver.uid}
                                    </h2>
                                    <p className="font-bold">First Name:</p>
                                    <p className="mb-2">{driver.vehicleowenerfirstname}</p>
                                    <p className="font-bold">Last Name:</p>
                                    <p className="mb-2">{driver.vehicleowenerlastename}</p>
                                    <p className="font-bold">Email:</p>
                                    <p className="mb-2">{driver.vehicleoweneremail}</p>
                                    <p className="font-bold">Phone Number:</p>
                                    <p className="mb-2">{driver.phonenumber}</p>

                                    {/* Display Vehicle Information */}
                                    {driver.vehicles && driver.vehicles.length > 0 ? (
                                        <>
                                            <h3 className="text-lg font-semibold mt-4">Associated Vehicles:</h3>
                                            {driver.vehicles.map(vehicle => (
                                                <div key={vehicle.id} className="border p-2 rounded mt-2">
                                                      <p className="font-bold">Vehicle UID:</p>
                                                      <p>{vehicle.uid}</p>
                                                    <p className="font-bold">Vehicle Name:</p>
                                                    <p>{vehicle.vehiclename}</p>
                                                    <p className="font-bold">Vehicle Model:</p>
                                                    <p>{vehicle.vehiclemodel}</p>
                                                    <p className="font-bold">Vehicle ownerFirstName:</p>
                                                    <p>{vehicle.ownerFirstName}</p>
                                                    <p className="font-bold">Vehicle ownerLastName:</p>
                                                    <p>{vehicle.ownerLastName}</p>
                                                </div>
                                            ))}
                                        </>
                                    ) : (
                                        <p>No associated vehicles found.</p>
                                    )}
                                </div>
                            ))
                        ) : (
                            <p>No associated drivers found.</p>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
}

export default SingleUserDetails;
