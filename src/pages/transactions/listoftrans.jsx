import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const ListOfTrans = () => {
    const navigate = useNavigate();
    const [listoftrans,setListoftrans]=useState([]);
    const[loading,setLoading]=useState(true);
    const [currentPage,setCurrentPage]=useState(1);
    const [itemsPerPage]=useState(50);
    
    
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

    useEffect(()=>{
        const fetchalltransactions = async()=>{
            const rooturi = import.meta.env.VITE_ROOT_URI;
            const apikey = import.meta.env.VITE_API_KEY;
            try {
                const response = await fetch(`${rooturi}/admin/thl`,{
                    method: "GET",
                    headers: {
                        'Content-Type': 'application/json',
                        'apiauthkey': apikey,
                    },
                })
                
                const result = await response.json();
                const data = Array.isArray(result.data) ? result.data : [];
                setListoftrans(data)
                setLoading(false)
            } catch (error) {
                console.log(error)
                toast(error)
                setListoftrans([])
                setLoading(false)
            }
        }
        fetchalltransactions();
    },[])
    
    
    // Calculate the current logs to display
    const indexOfLastLog = currentPage * itemsPerPage;
    const indexOfFirstLog = indexOfLastLog - itemsPerPage;
    const currentLogs = listoftrans.slice(indexOfFirstLog, indexOfLastLog);

    // Calculate total pages
    const totalPages = Math.ceil(listoftrans.length / itemsPerPage);
  //ip tracking facility
  const [ipAddress, setIpAddress] = useState('');
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
              const pathfinder = "listoftrans.jsx"
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
const handleUidClick = (uid) => {
    navigate(`/td/${uid}`);
  };

    return (
        <div className="rounded-lg border border-gray-200 p-4 sm:p-6 md:p-8">
            <div className="overflow-x-auto">
                <table className="min-w-full divide-y-2 divide-gray-200 bg-white text-sm">
                    <thead className="ltr:text-left rtl:text-right">
                        <tr>
                            {['id', 'uid', 'paymentid', 'walletid', 'userid','price','chargeruid','createdAt','updatedAt'].map((heading) => (
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
                            listoftrans.length > 0 ? (
                                listoftrans.map((log) => (
                                    <tr key={log.id}>

                                        <td className="whitespace-nowrap px-4 py-2 text-teal-700">{log.id}</td>
                                        <td className="whitespace-nowrap px-4 py-2 text-lime-500">
                                           
                                        {log.uid}
                                       
                                        </td>
                                        <td className="whitespace-nowrap px-4 py-2 text-green-500">{log.paymentid}</td>
                                        <td className="whitespace-nowrap px-4 text-blue-700">{log.walletid}</td>
                                        <td className="whitespace-nowrap px-4 text-red-700">
                                        <button
                                            className="whitespace-nowrap px-4 py-2 text-red-700"
                                            onClick={() => handleUidClick(log.userid)}
                                            >
                                            {log.userid}
                                            </button>
                                        </td>
                                        <td className="whitespace-nowrap px-4 text-slate-700">{log.price}</td>
                                        <td className="whitespace-nowrap px-4 text-purple-700">{log.chargeruid}</td>
                                        <td className="whitespace-nowrap px-4 text-yellow-700">{log.createdAt}</td>
                                        <td className="whitespace-nowrap px-4 text-orange-700">{log.updatedAt}</td>
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
  )
}

export default ListOfTrans
