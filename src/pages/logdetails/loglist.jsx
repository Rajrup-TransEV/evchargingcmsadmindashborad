import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const LogRetentionlist = () => {
    const navigate = useNavigate();
    const [logData, setLogData] = useState([]); // Initial state is an empty array
    const [loading, setLoading] = useState(true); // State to handle loading status
    const [currentPage, setCurrentPage] = useState(1); // Current page state
    const [itemsPerPage] = useState(50); // Number of items to display per page

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

    // Fetch all log data
    useEffect(() => {
        const fetchAllLogData = async () => {
            const rooturi = import.meta.env.VITE_ROOT_URI;
            const apikey = import.meta.env.VITE_API_KEY;

            try {
                const response = await fetch(`${rooturi}/admin/getalllogs`, {
                    method: "GET",
                    headers: {
                        'Content-Type': 'application/json',
                        'apiauthkey': apikey,
                    },
                });

                const result = await response.json();
                const data = Array.isArray(result.data) ? result.data : [];
                setLogData(data);
                setLoading(false);
            } catch (error) {
                console.error("Error fetching log data:", error);
                toast("Failed to fetch log data");
                setLogData([]);
                setLoading(false);
            }
        };

        fetchAllLogData();
    }, []);

    // Function to truncate messages
    const truncateMessage = (message, length = 80) => {
        return message.length > length ? `${message.substring(0, length)}...` : message;
    };

    // Calculate the current logs to display
    const indexOfLastLog = currentPage * itemsPerPage;
    const indexOfFirstLog = indexOfLastLog - itemsPerPage;
    const currentLogs = logData.slice(indexOfFirstLog, indexOfLastLog);

    // Calculate total pages
    const totalPages = Math.ceil(logData.length / itemsPerPage);

    // Function to determine the class based on message type
    const getMessageTypeClass = (type) => {
        switch (type) {
            case 'info':
                return 'bg-gradient-to-r from-teal-300 to-sky-600 bg-clip-text text-transparent'
            case 'error':
                return 'bg-gradient-to-r from-fuchsia-300 to-pink-600 bg-clip-text text-transparent'; // Red for error
            case 'success':
                return 'bg-gradient-to-r from-green-300 to-teal-700 bg-clip-text text-transparent'; // Green for success
            case 'update':
                return 'bg-gradient-to-r from-orange-300 to-red-600 bg-clip-text text-transparent0'; // Orange for update
            case 'processing':
                return 'bg-gradient-to-r from-yellow-300 to-emerald-400 bg-clip-text text-transparent'; // Yellow for processing
            default:
                return 'bg-gradient-to-r from-indigo-500 to-sky-500 bg-clip-text text-transparent'; // Default color
        }
    };

    return (
        <div className="rounded-lg border border-gray-200 p-4 sm:p-6 md:p-8">
            <div className="overflow-x-auto">
                <table className="min-w-full divide-y-2 divide-gray-200 bg-white text-sm">
                    <thead className="ltr:text-left rtl:text-right">
                        <tr>
                            {['id', 'uid', 'messagetype', 'messages', 'filelocation'].map((heading) => (
                                <th key={heading} className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
                                    {heading}
                                </th>
                            ))}
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                        {loading ? (
                            <tr>
                                <td colSpan="5" className="whitespace-nowrap px-4 py-2 text-center text-gray-700">
                                    Loading...
                                </td>
                            </tr>
                        ) : (
                            currentLogs.length > 0 ? (
                                currentLogs.map((log) => (
                                    <tr key={log.id}>
                                        <td className="whitespace-nowrap px-4 py-2 text-teal-700">{log.id}</td>
                                        <td className="whitespace-nowrap px-4 py-2 text-lime-500">{log.uid}</td>
                                        <td className="whitespace-nowrap px-4 py-2 ">
                                            <span className={getMessageTypeClass(log.messagetype)}>
                                                {log.messagetype}
                                            </span>
                                        </td>
                                        <td className="whitespace-nowrap px-4 py-2 text-indigo-900">
                                            {truncateMessage(log.messages)}
                                        </td>
                                        <td className="whitespace-nowrap px-4 py-2 text-pink-800">{log.filelocation}</td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="5" className="whitespace-nowrap px-4 py-2 text-center text-gray-700">
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
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-3 h-3"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                >
                    <path
                        fillRule="evenodd"
                        d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
                        clipRule="evenodd"
                    />
                </svg>
            </button>
        </li>

        {/* Previous 10 Button */}
        {currentPage > 10 && (
            <li>
                <button
                    onClick={() => setCurrentPage(prev => Math.max(prev - 10, 1))}
                    className="inline-flex items-center justify-center rounded border border-gray-100 bg-white text-gray-900"
                >
                    <span className="sr-only">Previous 10 Pages</span>
                    Previous 10
                </button>
            </li>
        )}

        {/* Page Numbers */}
        {Array.from({ length: Math.min(totalPages, 10) }, (_, index) => {
            const pageNumber = index + 1 + (Math.floor((currentPage - 1) / 10) * 10);
            if (pageNumber > totalPages) return null; // Skip if page number exceeds total pages
            return (
                <li key={pageNumber}>
                    <button
                        onClick={() => setCurrentPage(pageNumber)}
                        className={`block w-8 rounded text-center leading-8 ${currentPage === pageNumber ? 'bg-blue-600 text-white' : 'border border-gray-100 bg-white text-gray-900'}`}
                    >
                        {pageNumber}
                    </button>
                </li>
            );
        })}

        {/* Next 10 Button */}
        {totalPages > 10 && currentPage <= totalPages - 10 && (
            <li>
                <button
                    onClick={() => setCurrentPage(prev => Math.min(prev + 10, totalPages))}
                    className="inline-flex items-center justify-center rounded border border-gray-100 bg-white text-gray-900"
                >
                    <span className="sr-only">Next 10 Pages</span>
                    Next 10
                </button>
            </li>
        )}

        <li>
            <button
                onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                disabled={currentPage === totalPages}
                className="inline-flex items-center justify-center rounded border border-gray-100 bg-white text-gray-900 rtl:rotate-180"
            >
                <span className="sr-only">Next Page</span>
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-3 h-3"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                >
                    <path
                        fillRule="evenodd"
                        d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                        clipRule="evenodd"
                    />
                </svg>
            </button>
        </li>
    </ol>
</div>


        </div>
    );
};

export default LogRetentionlist;
