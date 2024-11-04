import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';

const LogDetails = () => {
    const navigate = useNavigate();
    const { id } = useParams();
    const [logDetail, setLogDetails] = useState(null);

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
        const fetchLogDetails = async () => {
            const rooturi = import.meta.env.VITE_ROOT_URI;
            const apikey = import.meta.env.VITE_API_KEY;

            try {
                const response = await fetch(`${rooturi}/admin/logdetails`, {
                    method: "POST",
                    headers: {
                        'Content-Type': 'application/json',
                        'apiauthkey': apikey,
                    },
                    body: JSON.stringify({ id: id })
                });

                if (response.ok) {
                    const result = await response.json();
                    console.log("details of the log data", result);
                    setLogDetails(result.data);
                } else {
                    toast("Failed to fetch log details");
                }
            } catch (error) {
                toast(`${error}`);
            }
        };

        fetchLogDetails();
    }, [id]);

    const backtohome = (event) => {
        event.preventDefault(); // Prevent default action
        navigate("/"); // Navigate to home
    }

    return (
        <div className="relative min-h-screen bg-cover bg-center" style={{ backgroundImage: "url('https://res.cloudinary.com/djvmehyvd/image/upload/v1730708478/jjb6gtwippzrubjbykda.png')" }}>
            <div className="absolute inset-0 bg-black opacity-80 backdrop-blur-md"></div>
            <div className="relative z-10 py-11">
                <button 
                    className="relative inline-block text-white font-bold py-2 px-4 rounded-full overflow-hidden group transition-transform duration-300 transform hover:scale-105"
                    onClick={(event) => backtohome(event)}
                >
                    <span className="absolute inset-0 bg-gradient-to-r from-teal-400 via-teal-500 to-teal-600 transform scale-110 group-hover:scale-100 transition duration-300"></span>
                    <span className="relative z-10">HOME</span>
                </button>
            </div>
            <article className="relative z-10 hover:animate-background rounded-xl bg-gradient-to-r from-green-300 via-blue-500 to-purple-600 mt-[70px] p-0.5 shadow-xl transition hover:bg-[length:400%_400%] hover:shadow-sm hover:[animation-duration:_4s] dark:shadow-gray-700/25">
                <div className="rounded-[10px] bg-white p-4 !pt-20 sm:p-6 dark:bg-gray-900">
                    <time datetime={logDetail?.createdAt} className="block text-xs text-gray-500 dark:text-gray-400">
                        {new Date(logDetail?.createdAt).toLocaleString()}
                    </time>

                    <h3 className="mt-0.5 text-lg font-medium text-gray-900 dark:text-white">
                        {logDetail ? logDetail.messages : "Loading..."}
                    </h3>
                    
                    <div className="mt-2 text-sm text-gray-600 dark:text-gray-300">
                        <p><strong>ID:</strong> {logDetail?.id}</p>
                        <p><strong>UID:</strong> {logDetail?.uid}</p>
                        <p><strong>Message Type:</strong> {logDetail?.messagetype}</p>
                        <p><strong>File Location:</strong> {logDetail?.filelocation}</p>
                        <p><strong>Created At:</strong> {new Date(logDetail?.createdAt).toLocaleString()}</p>
                        <p><strong>Updated At:</strong> {new Date(logDetail?.updatedAt).toLocaleString()}</p>
                    </div>
                </div>
            </article>
        </div>
    );
};

export default LogDetails;
