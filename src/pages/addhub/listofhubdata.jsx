import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const ListofHubData = () => {
  const navigate = useNavigate();
  const [userData, setUserData] = useState([]); // Initial state is an empty array
  const [loading, setLoading] = useState(true); // State to handle loading status
  const [currentPage, setCurrentPage] = useState(1); // Current page state
  const [itemsPerPage] = useState(10); // Number of items to display per page

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

  useEffect(() => {
    const fetchAllHubData = async () => {
      const rooturi = import.meta.env.VITE_ROOT_URI;
      const apikey = import.meta.env.VITE_API_KEY;

      try {
        const response = await fetch(`${rooturi}/admin/allhubs`, {
          method: "GET",
          headers: {
            'Content-Type': 'application/json',
            'apiauthkey': apikey,
          },
        });

        const result = await response.json();
        const data = Array.isArray(result.data) ? result.data : [];
        setUserData(data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching hub data:", error);
        toast("Failed to fetch hub data");
        setUserData([]);
        setLoading(false);
      }
    };

    fetchAllHubData();
  }, []);

  // Calculate the current hubs to display
  const indexOfLastUser = currentPage * itemsPerPage;
  const indexOfFirstUser = indexOfLastUser - itemsPerPage;
  const currentUsers = userData.slice(indexOfFirstUser, indexOfLastUser);

  // Calculate total pages
  const totalPages = Math.ceil(userData.length / itemsPerPage);

  // Handle UID click for hub details
  const handleUidClick = (uid) => {
    navigate(`/hubdetails/${uid}`);
  };

  // Delete function
  const handleDelete = async (uid) => {
    // Display confirmation dialog
    const userConfirmed = window.confirm("Are you sure you want to delete this hub?");
    
    if (userConfirmed) {
      const rooturi = import.meta.env.VITE_ROOT_URI;
      const apikey = import.meta.env.VITE_API_KEY;

      try {
        const response = await fetch(`${rooturi}/admin/deletehubdata`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'apiauthkey': apikey,
          },
          body: JSON.stringify({ uid }), // Pass uid in request body
        });

        if (response.ok) {
          toast.success("Hub deleted successfully");
          // Remove deleted hub from state
          setUserData((prevHubs) => prevHubs.filter(hub => hub.uid !== uid));
        } else {
          toast.error("Failed to delete hub");
        }
      } catch (error) {
        console.error("Error deleting hub:", error);
        toast.error("An error occurred while deleting the hub");
      }
    } else {
      toast.info("Delete operation canceled");
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
              const pathfinder = "listofhubdata.jsx"
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
    <div className="rounded-lg border border-gray-200 p-4 sm:p-6 md:p-8">
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y-2 divide-gray-200 bg-white text-sm">
          <thead className="ltr:text-left rtl:text-right">
            <tr>
              {[
                'id', 'uid', 'hubname', 'hubchargers', 'hubtariff in (Rs)', 
                'hublocation', 'adminuid', 'createdAt', 'updatedAt', 'Delete'
              ].map((heading) => (
                <th key={heading} className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
                  {heading}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {loading ? (
              <tr>
                <td colSpan="20" className="whitespace-nowrap px-4 py-2 text-center text-gray-700">
                  Loading...
                </td>
              </tr>
            ) : (
              currentUsers.length > 0 ? (
                currentUsers.map((user) => (
                  <tr key={user.id}>
                    {[
                      user.id,
                      <button 
                        className="text-blue-600 hover:underline" 
                        onClick={() => handleUidClick(user.uid)}
                      >
                        {user.uid}
                      </button>,
                      user.hubname,
                      user.hubchargers.join(', '), // Convert hubchargers array to a comma-separated string
                      user.hubtariff,
                      user.hublocation,
                      user.adminuid,
                      user.createdAt,
                      user.updatedAt,
                      <button 
                        className="text-red-600 hover:underline"
                        onClick={() => handleDelete(user.uid)}
                      >
                        Delete
                      </button> // Added Delete button here
                    ].map((cell, index) => (
                      <td key={index} className="whitespace-nowrap px-4 py-2 text-gray-700">
                        {cell}
                      </td>
                    ))}
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="20" className="whitespace-nowrap px-4 py-2 text-center text-gray-700">
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
                <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10l-3.293-3.293a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
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
   );
};

export default ListofHubData;
