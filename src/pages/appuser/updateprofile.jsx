import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const UpdateProfile = () => {
    const [uid, setuid] = useState('');
    const [userprofilepicture, setuserprofilepicture] = useState(null);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

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

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            const apikey = import.meta.env.VITE_API_KEY;
            const rooturi = import.meta.env.VITE_ROOT_URI;

            let imageBase64 = '';
            if (userprofilepicture) {
                const reader = new FileReader();
                reader.readAsDataURL(userprofilepicture);
                
                reader.onload = async () => {
                    imageBase64 = reader.result.split(',')[1]; // Extract base64 string

                    const response = await fetch(`${rooturi}/users/updateprofile`, {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                            'apiauthkey': apikey,
                        },
                        body: JSON.stringify({
                            uid,
                            userprofilepicture: imageBase64 // Use base64 string
                        })
                    });

                    if (response.ok) {
                        toast("Profile updated successfully!");
                        // Optionally reset form
                        setuid('');
                        setuserprofilepicture(null);
                    } else {
                        toast("Failed to update profile");
                    }
                };

                reader.onerror = () => {
                    toast("Error reading file");
                    setLoading(false);
                };
                
            } else {
                // Handle case where no file is selected
                toast("Please select a profile picture");
                setLoading(false);
            }
        } catch (error) {
            console.error("Error during profile update:", error);
            toast("An error occurred while updating your profile");
        } finally {
            setLoading(false);
        }
    };

    const handleFileUpload = (e) => {
        const selectedFile = e.target.files[0];
        if (selectedFile) {
            setuserprofilepicture(selectedFile);
        }
    };

    const [ipAddress, setIpAddress] = useState('');
    //ip tracking facility
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
                const pathfinder = "updateprofile.jsx"
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
  



    return (
        <div>
            <form action="#" onSubmit={handleSubmit}>
                <label htmlFor="uid" className="block text-xs font-medium text-gray-700 dark:text-gray-200">
                    UID
                </label>
                <input
                    type="text"
                    id="uid"
                    name="uid"
                    value={uid}
                    onChange={(e) => setuid(e.target.value)}
                    placeholder="Enter your UID"
                    className="mt-1 w-full rounded-md border-gray-200 shadow-sm sm:text-sm dark:border-gray-700 dark:bg-gray-800 dark:text-white"
                />

                <div>
                    <label htmlFor="userprofilepicture" className="block text-sm font-medium text-gray-700">
                        Profile Picture
                    </label>
                    <input
                        type="file"
                        id="userprofilepicture"
                        name="userprofilepicture"
                        onChange={handleFileUpload}
                        className="mt-1 w-full rounded-md border-gray-200 bg-white text-sm text-gray-700 shadow-sm"
                    />
                </div>
                
                <button
                    type="submit"
                    className={`inline-block shrink-0 rounded-md border px-12 py-3 text-sm font-medium text-white transition focus:outline-none focus:ring active:text-blue-500 ${
                        loading ? 'bg-gray-400 border-gray-400' : 'bg-blue-600 border-blue-600'
                    }`}
                    disabled={loading}
                >
                    {loading ? (
                        <>
                            <svg className="animate-spin h-5 w-5 mr-3 inline" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 0115.9-4.1A8 8 0 014 12z"></path>
                            </svg>
                            Processing...
                        </>
                    ) : (
                        'Save Profile Details'
                    )}
                </button>
            </form>
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
};

export default UpdateProfile;
