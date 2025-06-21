import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const ListofAppUser = () => {
    const navigate = useNavigate();
    const [userData, setuserData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage] = useState(50);
    const [ipAddress, setIpAddress] = useState('');

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
        const fetchIpAddress = async () => {
            const rooturi = import.meta.env.VITE_ROOT_URI;
            const apikey = import.meta.env.VITE_API_KEY;
            try {
                const response = await fetch("https://api.ipify.org?format=json");
                const data = await response.json();
                if (data) {
                    setIpAddress(data.ip);
                    const currentDateTime = new Date().toISOString();
                    const pathfinder = "listofappusers.jsx";
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
    }, []);

    useEffect(() => {
        const fetchAllUserData = async () => {
            const rooturi = import.meta.env.VITE_ROOT_URI;
            const apikey = import.meta.env.VITE_API_KEY;

            try {
                const response = await fetch(`${rooturi}/users/getallappuserdata`, {
                    method: "GET",
                    headers: {
                        'Content-Type': 'application/json',
                        'apiauthkey': apikey,
                    },
                });

                const result = await response.json();
                console.log(result)
                const data = Array.isArray(result.userprofile) ? result.userprofile : []; 
                setuserData(data);
                setLoading(false);
            } catch (error) {
                console.error("Error fetching user data:", error);
                toast("Failed to fetch user data");
                setuserData([]);
                setLoading(false);
            }
        };

        fetchAllUserData();
    }, []);

    const handleDelete = async (uid) => {
        const rooturi = import.meta.env.VITE_ROOT_URI;
        const apikey = import.meta.env.VITE_API_KEY;

        try {
            const response = await fetch(`${rooturi}/users/deleteauserdata`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'apiauthkey': apikey,
                },
                body: JSON.stringify({ userid:uid }),
            });

            if (response.ok) {
                toast.success("User deleted successfully");
                // setuserData((prevUsers) => prevUsers.filter(user => user.uid !== uid));
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

    const backtohome = (event) => {
        event.preventDefault();
        navigate("/");
    };
    const handleUidClick = (uid) => {
        navigate(`/appuserdetails/${uid}`);
      };
    
    const handelUpdate=(uid)=>{
        navigate(`/updateuser/${uid}`)
    }
    return (
        <div className="rounded-lg border border-gray-200 p-4 sm:p-6 md:p-8">
            <div className="overflow-x-auto">
                <table className="min-w-full divide-y-2 divide-gray-200 bg-white text-sm">
                    <thead className="ltr:text-left rtl:text-right">
                        <tr>
                            {['Profile Picture', 'UID', 'Username', 'Email', 'Phone Number', 'Actions'].map((heading) => (
                                <th key={heading} className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
                                    {heading}
                                </th>
                            ))}
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                        {loading ? (
                            <tr>
                                <td colSpan="6" className="whitespace-nowrap px-4 py-2 text-center text-gray-700">
                                    Loading...
                                </td>
                            </tr>
                        ) : (
                            currentUsers.length > 0 ? (
                                currentUsers.map((user) => (
                                    <tr key={user.uid}>
                                        <td className="whitespace-nowrap px-4 py-2">
                                            <img
                                                src={user.profilepicture || 'default-profile.png'}
                                                alt="Profile"
                                                className="rounded-full w-10 h-10 object-cover"
                                            />
                                        </td>
                                        <td className="whitespace-nowrap px-4 py-2 text-gray-700">
                                            <button 
                                                className="text-blue-600 hover:underline"
                                                onClick={() => handleUidClick(user.uid)} // Placeholder for handleUidClick
                                            >
                                                {user.uid}
                                            </button>
                                        </td>
                                        <td className="whitespace-nowrap px-4 py-2 text-gray-700">{user.username}</td>
                                        <td className="whitespace-nowrap px-4 py-2 text-gray-700">{user.email}</td>
                                        <td className="whitespace-nowrap px-4 py-2 text-gray-700">{user.phonenumber}</td>
                                        <td className="whitespace-nowrap px-4 py-2">
                                            <button 
                                                className="text-green-600 hover:underline" 
                                                onClick={() => handelUpdate(user.uid)}
                                            >
                                                Update
                                            </button>
                                        </td>
                                        <td className="whitespace-nowrap px-4 py-2">
                                            <button 
                                                className="text-red-600 hover:underline" 
                                                onClick={() => handleDelete(user.uid)}
                                            >
                                                Delete
                                            </button>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="6" className="whitespace-nowrap px-4 py-2 text-center text-gray-700">
                                        No data available
                                    </td>
                                </tr>
                            )
                        )}
                    </tbody>
                </table>
            </div>

            <div className="rounded-b-lg border-t border-gray-200 px-4 py-2 sm:px-6 md:px-8">
                <ol className="flex justify-end gap-1 text-xs font-medium">
                    <li>
                        <button
                            onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                            disabled={currentPage === 1}
                            className="inline-flex items-center justify-center rounded border border-gray-100 bg-white text-gray-900 rtl:rotate-180"
                        >
                            <span className="sr-only">Prev Page</span>
                            <svg xmlns="http://www.w3.org/2000/svg" className="w-3 h-3" viewBox="0 0 20 20" fill="currentColor">
                                <path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd" />
                            </svg>
                        </button>
                    </li>

                    {Array.from({ length: totalPages }, (_, index) => (
                        <li key={index}>
                            <button
                                onClick={() => setCurrentPage(index + 1)}
                                className={`block w-8 rounded text-center leading-8 ${currentPage === index + 1 ? 'bg-blue-600 text-white' : 'border border-gray-100 bg-white text-gray-900'}`}
                            >
                                {index + 1}
                            </button>
                        </li>
                    ))}

                    <li>
                        <button
                            onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                            disabled={currentPage === totalPages}
                            className="inline-flex items-center justify-center rounded border border-gray-100 bg-white text-gray-900 rtl:rotate-180"
                        >
                            <span className="sr-only">Next Page</span>
                            <svg xmlns="http://www.w3.org/2000/svg" className="w-3 h-3" viewBox="0 0 20 20" fill="currentColor">
                                <path fillRule="evenodd" d="M7.293 15.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 111.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                            </svg>
                        </button>
                    </li>
                </ol>
            </div>
        </div>
    );
};

export default ListofAppUser;
