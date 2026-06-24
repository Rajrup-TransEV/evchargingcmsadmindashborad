import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import Sidebar from '../../partials/Sidebar';
import ChargerUnitDetails from '../extracomp/userChargerDetails';
import { 
  FiUser, 
  FiMail, 
  FiPhone, 
  FiMapPin, 
  FiBriefcase, 
  FiShield,
  FiArrowLeft,
  FiZap,
  FiUsers,
  FiCalendar,
  FiClock,
  FiUserCheck,
  FiCpu,
  FiRefreshCw,
  FiTruck,
  FiHome
} from 'react-icons/fi';

const SingleUserDetails = () => {
  const [userData, setUserData] = useState(null);
  const [chargerData, setChargerData] = useState(null);
  const [adminDriverdata, setAdminDriverdata] = useState([]);
  const [loading, setLoading] = useState(true);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { uid } = useParams();
  const navigate = useNavigate();

  // Check authentication
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
            toast.error("You have no authorization to view this page");
            navigate("/signin");
          }
        } else {
          toast.error("Failed to verify user");
          navigate("/signin");
        }
      } catch (error) {
        console.error("Error during authentication check:", error);
        toast.error("An error occurred during authentication");
        navigate("/signin");
      }
    };

    checkAuthentication();
  }, [navigate]);

  // Fetch single user details
  useEffect(() => {
    const fetchsingulardata = async () => {
      const rooturi = import.meta.env.VITE_ROOT_URI;
      const apikey = import.meta.env.VITE_API_KEY;

      try {
        const response = await fetch(`${rooturi}/admin/getadminbyemail`, {
          method: "POST",
          headers: {
            'Content-Type': 'application/json',
            'apiauthkey': apikey,
          },
          body: JSON.stringify({ userid: uid })
        });

        if (response.ok) {
          const result = await response.json();
          setUserData(result.data);
          setChargerData(result.data.chargerUnits);
        } else {
          toast.error("Failed to fetch charger details");
        }
      } catch (error) {
        console.error("Error during data fetch:", error);
        toast.error("An error occurred while fetching data");
      } finally {
        setLoading(false);
      }
    };

    fetchsingulardata();
    const fetchasddata = async () => {
      const rooturi = import.meta.env.VITE_ROOT_URI;
      const apikey = import.meta.env.VITE_API_KEY;
      try {
        const response = await fetch(`${rooturi}/admin/getvobyaid`, {
          method: "POST",
          headers: {
            'Content-Type': 'application/json',
            'apiauthkey': apikey,
          },
          body: JSON.stringify({ adminid: uid })
        });

        if (response.ok) {
          const result = await response.json();
          console.log("driver data is coming ", result);
          setAdminDriverdata(result.data || []);
        } else {
          toast.error("Failed to fetch the details");
        }
      } catch (error) {
        toast.error(`An error occurred while fetching the data ${error}`);
      } finally {
        setLoading(false);
      }
    };
    fetchasddata();
  }, [uid]);

  const [ipAddress, setIpAddress] = useState('');
  
  // IP tracking
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
          const pathfinder = "singleuserdetails.jsx";
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

  const formatDate = (dateString) => {
    if (!dateString) return '—';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      month: 'short', 
      day: 'numeric', 
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  if (loading) {
    return (
      <div className="flex h-screen items-center justify-center bg-gradient-to-br from-blue-50 via-white to-indigo-50">
        <div className="flex items-center gap-3 text-gray-500">
          <svg className="animate-spin h-8 w-8 text-indigo-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
          <span className="text-lg font-medium">Loading user details...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="flex h-screen overflow-hidden bg-gradient-to-br from-blue-50 via-white to-indigo-50">
      {/* Sidebar */}
      <Sidebar 
        sidebarOpen={sidebarOpen} 
        setSidebarOpen={setSidebarOpen} 
        variant="default"
      />

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Mobile Header */}
        <header className="lg:hidden flex items-center justify-between p-4 bg-white/80 backdrop-blur-sm border-b border-gray-200">
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="p-2 rounded-lg text-gray-600 hover:bg-gray-100 transition-colors"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
          <h1 className="text-xl font-bold text-gray-800">User Details</h1>
          <div className="w-10" />
        </header>

        {/* Page Content */}
        <div className="flex-1 overflow-y-auto p-4 md:p-8">
          {/* Header */}
          <div className="hidden lg:flex items-center gap-4 mb-8">
            <button
              onClick={() => navigate('/listofusers')}
              className="p-2.5 rounded-xl bg-white border border-gray-200 text-gray-600 hover:text-indigo-600 hover:border-indigo-300 hover:bg-indigo-50 transition-all duration-200 shadow-sm"
            >
              <FiArrowLeft className="w-5 h-5" />
            </button>
            <div>
              <h1 className="text-3xl font-bold text-gray-800 flex items-center gap-3">
                <span className="bg-gradient-to-r from-indigo-500 to-purple-500 p-2.5 rounded-xl text-white shadow-lg">
                  <FiUser className="w-6 h-6" />
                </span>
                User Details
              </h1>
              <p className="text-gray-500 mt-1">View complete information about this user</p>
            </div>
          </div>

          {/* User UID Badge */}
          <div className="mb-6 inline-flex items-center gap-2 px-4 py-2 bg-white rounded-xl shadow-sm border border-gray-200">
            <FiCpu className="w-4 h-4 text-indigo-500" />
            <span className="text-sm text-gray-600">User UID:</span>
            <span className="text-sm font-mono font-semibold text-gray-800">{uid}</span>
          </div>

          {userData && chargerData && (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Left Column - User Information */}
              <div className="lg:col-span-1">
                <div className="bg-white rounded-2xl shadow-xl border border-gray-200 overflow-hidden">
                  <div className="bg-gradient-to-r from-indigo-500 to-purple-500 px-6 py-4">
                    <h2 className="text-lg font-bold text-white flex items-center gap-2">
                      <FiUser className="w-5 h-5" />
                      User Information
                    </h2>
                  </div>
                  <div className="p-6 space-y-4">
                    <div className="flex items-center gap-3">
                      <div className="w-16 h-16 rounded-full bg-gradient-to-r from-indigo-100 to-purple-100 flex items-center justify-center text-2xl font-bold text-indigo-600">
                        {userData.firstname?.[0]}{userData.lastname?.[0]}
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold text-gray-800">
                          {userData.firstname} {userData.lastname}
                        </h3>
                        <span className="inline-flex items-center gap-1 px-2 py-0.5 bg-indigo-100 text-indigo-700 rounded-full text-xs font-semibold">
                          <FiShield className="w-3 h-3" />
                          {userData.role || 'User'}
                        </span>
                      </div>
                    </div>

                    <div className="space-y-3 pt-4 border-t border-gray-100">
                      <div className="flex items-start gap-3">
                        <FiMail className="w-5 h-5 text-gray-400 mt-0.5" />
                        <div>
                          <p className="text-xs text-gray-500">Email</p>
                          <p className="text-sm text-gray-800">{userData.email}</p>
                        </div>
                      </div>
                      <div className="flex items-start gap-3">
                        <FiPhone className="w-5 h-5 text-gray-400 mt-0.5" />
                        <div>
                          <p className="text-xs text-gray-500">Phone</p>
                          <p className="text-sm text-gray-800">{userData.phonenumber || '—'}</p>
                        </div>
                      </div>
                      <div className="flex items-start gap-3">
                        <FiMapPin className="w-5 h-5 text-gray-400 mt-0.5" />
                        <div>
                          <p className="text-xs text-gray-500">Address</p>
                          <p className="text-sm text-gray-800">{userData.address || '—'}</p>
                        </div>
                      </div>
                      <div className="flex items-start gap-3">
                        <FiBriefcase className="w-5 h-5 text-gray-400 mt-0.5" />
                        <div>
                          <p className="text-xs text-gray-500">Designation</p>
                          <p className="text-sm text-gray-800">{userData.designation || '—'}</p>
                        </div>
                      </div>
                      <div className="flex items-start gap-3">
                        <FiCalendar className="w-5 h-5 text-gray-400 mt-0.5" />
                        <div>
                          <p className="text-xs text-gray-500">Joined</p>
                          <p className="text-sm text-gray-800">{formatDate(userData.createdAt)}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Middle Column - Charger Details */}
              <div className="lg:col-span-1">
                <div className="bg-white rounded-2xl shadow-xl border border-gray-200 overflow-hidden">
                  <div className="bg-gradient-to-r from-emerald-500 to-teal-500 px-6 py-4">
                    <h2 className="text-lg font-bold text-white flex items-center gap-2">
                      <FiZap className="w-5 h-5" />
                      Chargers ({chargerData?.length || 0})
                    </h2>
                  </div>
                  <div className="p-4 max-h-[600px] overflow-y-auto">
                    {chargerData && chargerData.length > 0 ? (
                      chargerData.map((charger, index) => (
                        <div key={index} className="mb-4 last:mb-0">
                          <ChargerUnitDetails chargerData={charger} />
                        </div>
                      ))
                    ) : (
                      <div className="text-center py-8 text-gray-400">
                        <FiZap className="w-12 h-12 mx-auto mb-2 text-gray-300" />
                        <p className="text-sm">No chargers found</p>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Right Column - Drivers */}
              <div className="lg:col-span-1">
                <div className="bg-white rounded-2xl shadow-xl border border-gray-200 overflow-hidden">
                  <div className="bg-gradient-to-r from-purple-500 to-pink-500 px-6 py-4">
                    <h2 className="text-lg font-bold text-white flex items-center gap-2">
                      <FiUsers className="w-5 h-5" />
                      Drivers ({adminDriverdata?.length || 0})
                    </h2>
                  </div>
                  <div className="p-4 max-h-[600px] overflow-y-auto">
                    {adminDriverdata && adminDriverdata.length > 0 ? (
                      adminDriverdata.map((driver) => (
                        <div key={driver.uid} className="mb-4 p-4 bg-gray-50 rounded-xl border border-gray-200 last:mb-0 hover:shadow-md transition-shadow">
                          <div className="flex items-start justify-between mb-3">
                            <div>
                              <p className="font-semibold text-gray-800">
                                {driver.vehicleowenerfirstname} {driver.vehicleowenerlastename}
                              </p>
                              <p className="text-xs text-gray-500 font-mono">{driver.uid}</p>
                            </div>
                            <span className="px-2 py-1 bg-blue-100 text-blue-700 rounded-full text-xs font-semibold">
                              <FiUserCheck className="inline w-3 h-3 mr-1" />
                              Active
                            </span>
                          </div>
                          
                          <div className="space-y-2 text-sm">
                            <div className="flex items-center gap-2 text-gray-600">
                              <FiMail className="w-4 h-4 text-gray-400" />
                              {driver.vehicleoweneremail}
                            </div>
                            <div className="flex items-center gap-2 text-gray-600">
                              <FiPhone className="w-4 h-4 text-gray-400" />
                              {driver.phonenumber}
                            </div>
                          </div>

                          {/* Vehicles */}
                          {driver.vehicles && driver.vehicles.length > 0 && (
                            <div className="mt-3 pt-3 border-t border-gray-200">
                              <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">
                                <FiTruck className="inline w-3 h-3 mr-1" />
                                Vehicles ({driver.vehicles.length})
                              </p>
                              {driver.vehicles.map(vehicle => (
                                <div key={vehicle.id} className="ml-2 p-2 bg-white rounded-lg border border-gray-200 mb-2 last:mb-0">
                                  <div className="flex items-center justify-between">
                                    <div>
                                      <p className="font-medium text-gray-800 text-sm">
                                        {vehicle.vehiclename}
                                      </p>
                                      <p className="text-xs text-gray-500">{vehicle.vehiclemodel}</p>
                                    </div>
                                    <span className="text-xs text-gray-400 font-mono">
                                      {vehicle.uid}
                                    </span>
                                  </div>
                                </div>
                              ))}
                            </div>
                          )}
                        </div>
                      ))
                    ) : (
                      <div className="text-center py-8 text-gray-400">
                        <FiUsers className="w-12 h-12 mx-auto mb-2 text-gray-300" />
                        <p className="text-sm">No drivers found</p>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Footer */}
          <div className="mt-8 text-center text-xs text-gray-400">
            © {new Date().getFullYear()} Admin Panel. All rights reserved.
          </div>
        </div>
      </div>
    </div>
  );
};

export default SingleUserDetails;