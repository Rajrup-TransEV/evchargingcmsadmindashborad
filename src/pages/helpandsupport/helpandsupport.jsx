import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const HelpandSupport = () => {
    const navigate = useNavigate();
    const [userData, setUserData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage] = useState(10);

    useEffect(() => {
        const checkAuthentication = async () => {
            const rootUri = import.meta.env.VITE_ROOT_URI;
            const apiKey = import.meta.env.VITE_API_KEY;

            try {
                const token = localStorage.getItem("token");
                if (!token) {
                    navigate("/signin");
                    return;
                }

                const response = await fetch(`${rootUri}/userauth/verifyuser`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'apiauthkey': apiKey,
                    },
                    body: JSON.stringify({ token })
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

    useEffect(() => {
        const fetchAllChargerData = async () => {
            const rootUri = import.meta.env.VITE_ROOT_URI;
            const apiKey = import.meta.env.VITE_API_KEY;

            try {
                const response = await fetch(`${rootUri}/admin/vham`, {
                    method: "GET",
                    headers: {
                        'Content-Type': 'application/json',
                        'apiauthkey': apiKey,
                    },
                });

                const result = await response.json();
                const data = Array.isArray(result.data) ? result.data : [];
                setUserData(data);
                setLoading(false);
            } catch (error) {
                console.error("Error fetching charger data:", error);
                toast("Failed to fetch charger data");
                setUserData([]);
                setLoading(false);
            }
        };

        fetchAllChargerData();
    }, []);

    const handleDelete = async (uid) => {
        const rootUri = import.meta.env.VITE_ROOT_URI;
        const apiKey = import.meta.env.VITE_API_KEY;

        try {
            const response = await fetch(`${rootUri}/admin/deleteadmindata`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'apiauthkey': apiKey,
                },
                body: JSON.stringify({ uid }),
            });

            if (response.ok) {
                toast.success("User deleted successfully");
                setUserData((prevUsers) => prevUsers.filter(user => user.uid !== uid));
            } else {
                toast.error("Failed to delete user");
            }
        } catch (error) {
            console.error("Error deleting user:", error);
            toast.error("An error occurred while deleting the user");
        }
    };

    const indexOfLastUser = currentPage * itemsPerPage;
    const indexOfFirstUser = indexOfLastUser - itemsPerPage;
    const currentUsers = userData.slice(indexOfFirstUser, indexOfLastUser);

    const totalPages = Math.ceil(userData.length / itemsPerPage);

    const handleUidClick = (uid) => {
        navigate(`/supportdetails/${uid}`);
    };

    const backToHome = (event) => {
        event.preventDefault();
        navigate("/");
    };

    return (
        <div className="rounded-lg border border-gray-200 p-6">
            <div className="overflow-x-auto">
                <table className="min-w-full divide-y-2 divide-gray-200 bg-white text-sm">
                    <thead className="text-left bg-gray-50">
                        <tr>
                            {['id', 'uid', 'name', 'email', 'phonenumber', 'message', 'adminuid', 'messagestatus', 'createdAt', 'updatedAt', 'Actions'].map((heading) => (
                                <th key={heading} className="px-4 py-2 text-gray-900 font-semibold">{heading}</th>
                            ))}
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                        {loading ? (
                            <tr>
                                <td colSpan="11" className="text-center py-4 text-gray-500">Loading...</td>
                            </tr>
                        ) : (
                            currentUsers.length > 0 ? (
                                currentUsers.map((user) => (
                                    <tr key={user.id}>
                                        <td className="px-4 py-2 text-gray-700">{user.id}</td>
                                        <td className="px-4 py-2 text-gray-700">
                                            <button className="text-blue-600 hover:underline" onClick={() => handleUidClick(user.uid)}>
                                                {user.uid}
                                            </button>
                                        </td>
                                        <td className="px-4 py-2 text-gray-700">{user.name}</td>
                                        <td className="px-4 py-2 text-gray-700">{user.email}</td>
                                        <td className="px-4 py-2 text-gray-700">{user.phonenumber}</td>
                                        <td className="px-4 py-2 text-gray-700">{user.message}</td>
                                        <td className="px-4 py-2 text-gray-700">{user.adminuid}</td>
                                        <td className="px-4 py-2 text-gray-700">{user.messagestatus}</td>
                                        <td className="px-4 py-2 text-gray-700">{user.createdAt}</td>
                                        <td className="px-4 py-2 text-gray-700">{user.updatedAt}</td>
                                        <td className="px-4 py-2 text-red-600 cursor-pointer hover:underline" onClick={() => handleDelete(user.uid)}>
                                            Delete
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="11" className="text-center py-4 text-gray-500">No data available</td>
                                </tr>
                            )
                        )}
                    </tbody>
                </table>
            </div>

            <div className="mt-4 flex justify-between items-center">
                <button
                    onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                    disabled={currentPage === 1}
                    className="px-4 py-2 bg-blue-500 text-white rounded-md disabled:bg-gray-300"
                >
                    Prev
                </button>
                <div className="flex gap-2">
                    {Array.from({ length: totalPages }, (_, index) => (
                        <button
                            key={index}
                            onClick={() => setCurrentPage(index + 1)}
                            className={`w-8 h-8 rounded-full text-center ${currentPage === index + 1 ? 'bg-blue-600 text-white' : 'border border-gray-300'}`}
                        >
                            {index + 1}
                        </button>
                    ))}
                </div>
                <button
                    onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                    disabled={currentPage === totalPages}
                    className="px-4 py-2 bg-blue-500 text-white rounded-md disabled:bg-gray-300"
                >
                    Next
                </button>
            </div>

            <div className="mt-8 flex justify-center">
                <button
                    className="inline-block bg-teal-500 text-white px-4 py-2 rounded-full hover:bg-teal-600 transition duration-300"
                    onClick={backToHome}
                >
                    Home
                </button>
            </div>
        </div>
    );
};

export default HelpandSupport;
