import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import React, { useState, useEffect } from 'react';

function DashboardCard07() {
  const navigate = useNavigate();
  const [chargerData, setChargerData] = useState([]); // Initial state is an empty array
  const [loading, setLoading] = useState(true); // State to handle loading status

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
        const response = await fetch(`${rooturi}/admin/listofcharges`, {
          method: "GET",
          headers: {
            'Content-Type': 'application/json',
            'apiauthkey': apikey,
          },
        });

        const result = await response.json();
        const data = Array.isArray(result.data) ? result.data : [];
        console.log("list of incoming data", data);
        setChargerData(data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching charger data:", error);
        toast("Failed to fetch charger data");
        setChargerData([]);
        setLoading(false);
      }
    };

    fetchAllChargerData();
  }, []);

  return (
    <div className="col-span-full xl:col-span-8 bg-white dark:bg-gray-800 shadow-sm rounded-xl">
      <header className="px-5 py-4 border-b border-gray-100 dark:border-gray-700/60">
        <h2 className="font-semibold text-gray-800 dark:text-gray-100">Charger Data</h2>
      </header>
      <div className="p-3">
        {/* Scrollable Table Container */}
        <div className="overflow-x-auto" style={{ maxHeight: '400px', overflowY: 'auto' }}>
          <table className="table-auto w-full dark:text-gray-300">
            {/* Table header */}
            <thead className="text-xs uppercase text-gray-400 dark:text-gray-500 bg-gray-50 dark:bg-gray-700 dark:bg-opacity-50 rounded-sm">
              <tr>
                <th className="p-2"><div className="font-semibold text-left">Charger Name</div></th>
                <th className="p-2"><div className="font-semibold text-center">Charger Serial Number</div></th>
                <th className="p-2"><div className="font-semibold text-center">Total Capacity</div></th>
                <th className="p-2"><div className="font-semibold text-center">Connector Type</div></th>
                <th className="p-2"><div className="font-semibold text-center">Open Status</div></th>
              </tr>
            </thead>
            {/* Table body */}
            <tbody className="text-sm font-medium divide-y divide-gray-100 dark:divide-gray-700/60">
              {loading ? (
                <tr>
                  <td colSpan={5} className="text-center p-4">Loading...</td>
                </tr>
              ) : (
                chargerData.map((charger) => (
                  <tr key={charger.id}>
                    <td className="p-2">{charger.ChargerName}</td>
                    <td className="p-2">{charger.Chargerserialnum}</td>
                    <td className="p-2">{charger.Total_Capacity}</td>
                    <td className="p-2">{charger.Connector_type}</td>
                    <td className="p-2">{charger.twenty_four_seven_open_status}</td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default DashboardCard07;
