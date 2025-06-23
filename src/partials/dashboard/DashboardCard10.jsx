import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import React, { useState, useEffect } from 'react';

function DashboardCard10() {
  const navigate = useNavigate();
  const [userData, setuserData] = useState([]); // Initial state is an empty array
  const [loading, setLoading] = useState(true); // State to handle loading status
  const [currentPage, setCurrentPage] = useState(1); // Current page state
  const [itemsPerPage] = useState(10); // Number of items per page

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
            navigate("/")
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
      const rooturi = import.meta.env.VITE_ROOT_URI;
      const apikey = import.meta.env.VITE_API_KEY;

      try {
        const response = await fetch(`${rooturi}/admin/getalladmindata`, {
          method: "GET",
          headers: {
            'Content-Type': 'application/json',
            'apiauthkey': apikey,
          },
        });

        const result = await response.json();
        const data = Array.isArray(result.data) ? result.data : [];
        setuserData(data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching charger data:", error);
        toast("Failed to fetch charger data");
        setuserData([]);
        setLoading(false);
      }
    };

    fetchAllChargerData();
  }, []);

  return (
    <div className="col-span-full xl:col-span-6 bg-white dark:bg-gray-800 shadow-sm rounded-xl">
      <header className="px-5 py-4 border-b border-gray-100 dark:border-gray-700/60">
        <h2 className="font-semibold text-gray-800 dark:text-gray-100">Customers</h2>
      </header>      
      <div className="p-3">

        {/* Scrollable Table */}
        <div className="overflow-x-auto">
          <table className="table-auto w-full min-w-max">
            {/* Table header */}
            <thead className="text-xs font-semibold uppercase text-gray-400 dark:text-gray-500 bg-gray-50 dark:bg-gray-700 dark:bg-opacity-50">
              <tr>
                <th className="p-2 whitespace-nowrap">
                  <div className="font-semibold text-left">Name</div>
                </th>
                <th className="p-2 whitespace-nowrap">
                  <div className="font-semibold text-left">Email</div>
                </th>
                <th className="p-2 whitespace-nowrap">
                  <div className="font-semibold text-left">Role</div>
                </th>
                <th className="p-2 whitespace-nowrap">
                  <div className="font-semibold text-center">Phonenumber</div>
                </th>
              </tr>
            </thead>
            {/* Table body */}
            <tbody className="text-sm divide-y divide-gray-100 dark:divide-gray-700/60">
              {
                userData.map(customer => (
                  <tr key={customer.id}>
                    <td className="p-2 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="w-10 h-10 shrink-0 mr-2 sm:mr-3">
                          {/* Placeholder for customer image */}
                         {/* <div className="font-medium text-gray-800 dark:text-gray-100">{customer.id}</div> */}
                        </div>
                        <div className="font-medium text-gray-800 dark:text-gray-100">{customer.firstname}</div>
                      </div>
                    </td>
                    <td className="p-2 whitespace-nowrap">
                      <div className="text-left">{customer.email}</div>
                    </td>
                    <td className="p-2 whitespace-nowrap">
                      <div className="text-left font-medium text-green-500">{customer.role}</div>
                    </td>
                    <td className="p-2 whitespace-nowrap">
                      <div className="text-lg text-center">{customer.phonenumber}</div>
                    </td>
                  </tr>
                ))
              }
            </tbody>
          </table>

        </div>

      </div>
    </div>
  );
}

export default DashboardCard10;
