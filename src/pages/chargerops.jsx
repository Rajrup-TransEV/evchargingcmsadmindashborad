import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const ChargerOperationsView = () => {
  const navigate = useNavigate();
  const [chargerData, setChargerData] = useState([]); // Initial state is an empty array
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

  // Calculate the current chargers to display
  const indexOfLastCharger = currentPage * itemsPerPage;
  const indexOfFirstCharger = indexOfLastCharger - itemsPerPage;
  const currentChargers = chargerData.slice(indexOfFirstCharger, indexOfLastCharger);

  // Calculate total pages
  const totalPages = Math.ceil(chargerData.length / itemsPerPage);

  // Handle "Manipulate" click (go to settings page for charger)
  const handleManipulateClick = (uid) => {
    navigate(`/settings/${uid}`);
  };

  //charger details
  const handleUidClick = (uid) => {
    navigate(`/chargerdetails/${uid}`);
  };

  return (
    <div className="rounded-lg border border-gray-200 p-4 sm:p-6 md:p-8">
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y-2 divide-gray-200 bg-white text-sm">
          <thead className="ltr:text-left rtl:text-right">
            <tr>
              {[
                'id', 'uid', 'chargeridentity', 'Chargerserialnum', 'ChargerName', 
                'Chargerhost', 'Segment', 'Subsegment', 'Total_Capacity', 'Chargertype', 
                'parking', 'number_of_connectors', 'Connector_type', 'connector_total_capacity', 
                'lattitude', 'longitute', 'full_address', 'charger_use_type', 
                'twenty_four_seven_open_status', 'charger_image', 'chargerbuyer', 'Created at', 'Manipulate' // Added Manipulate header
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
                <td colSpan="21" className="whitespace-nowrap px-4 py-2 text-center text-gray-700">
                  Loading...
                </td>
              </tr>
            ) : (
              currentChargers.length > 0 ? (
                currentChargers.map((charger) => (
                  <tr key={charger.id}>
                    {[
                      charger.id,  
                      <button 
                        className="text-blue-600 hover:underline" 
                        onClick={() => handleUidClick(charger.uid)}
                      >
                        {charger.uid}
                      </button>, charger.chargeridentity, charger.Chargerserialnum,
                      charger.ChargerName, charger.Chargerhost, charger.Segment, charger.Subsegment,
                      charger.Total_Capacity, charger.Chargertype, charger.parking,
                      charger.number_of_connectors, charger.Connector_type, charger.connector_total_capacity,
                      charger.lattitude, charger.longitute, charger.full_address,
                      charger.charger_use_type, charger.twenty_four_seven_open_status,
                      <img src={charger.charger_image} alt="Charger" className="w-16 h-16 object-cover" />,
                      charger.chargerbuyer, charger.created_at,
                      <button 
                        className="text-green-600 hover:underline"
                        onClick={() => handleManipulateClick(charger.uid)}
                      >
                        Manipulate
                      </button> // Added Manipulate button here
                    ].map((cell, index) => (
                      <td key={index} className="whitespace-nowrap px-4 py-2 text-gray-700">
                        {cell}
                      </td>
                    ))}
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="21" className="whitespace-nowrap px-4 py-2 text-center text-gray-700">
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
                  d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
                  clipRule="evenodd"
                />
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

export default ChargerOperationsView;
