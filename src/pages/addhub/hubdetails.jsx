import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import Sidebar from '../../partials/Sidebar';
import { 
  FiMapPin, 
  FiZap, 
  FiTag, 
  FiUser, 
  FiArrowLeft,
  FiCalendar,
  FiClock,
  FiUsers,
  FiList,
  FiHome,
  FiInfo,
  FiShare2,
  FiCopy,
  FiAward,
  FiTrendingUp,
  FiNavigation
} from 'react-icons/fi';

const HubDetails = () => {
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { uid } = useParams();
  const [hubData, setHubData] = useState({});
  const [loading, setLoading] = useState(true);
  const [copied, setCopied] = useState(false);

  // Use effect to check if user is logged in
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

  // Fetch hub details
  useEffect(() => {
    const fetchsingulardata = async () => {
      const rooturi = import.meta.env.VITE_ROOT_URI;
      const apikey = import.meta.env.VITE_API_KEY;

      try {
        const response = await fetch(`${rooturi}/admin/hubdetails`, {
          method: "POST",
          headers: {
            'Content-Type': 'application/json',
            'apiauthkey': apikey,
          },
          body: JSON.stringify({ uid: uid })
        });

        if (response.ok) {
          const result = await response.json();
          console.log(result);
          
          if (Array.isArray(result.data) && result.data.length > 0) {
            setHubData(result.data[0]);
          } else {
            toast.error("No hub data found");
          }
        } else {
          toast.error("Failed to fetch hub details");
        }
      } catch (error) {
        console.error("Error during data fetch:", error);
        toast.error("An error occurred while fetching data");
      } finally {
        setLoading(false);
      }
    };

    fetchsingulardata();
  }, [uid]);

  // Go to user details page
  const handleUidClick = (uid) => {
    navigate(`/userdetails/${uid}`);
  };

  // Go to charger details page
  const handleChargerUidClick = (uid) => {
    navigate(`/chargerdetails/${uid}`);
  };

  // Copy UID to clipboard
  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text).then(() => {
      setCopied(true);
      toast.success('UID copied to clipboard!');
      setTimeout(() => setCopied(false), 3000);
    });
  };

  // IP tracking
  useEffect(() => {
    const fetchIpAddress = async () => {
      const rooturi = import.meta.env.VITE_ROOT_URI;
      const apikey = import.meta.env.VITE_API_KEY;
      try {
        const response = await fetch("https://api.ipify.org?format=json");
        const data = await response.json();
        if (data) {
          const currentDateTime = new Date().toISOString();
          const pathfinder = "hubdetails.jsx";
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
    return date.toLocaleDateString('en-IN', { 
      month: 'long', 
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
          <svg className="animate-spin h-8 w-8 text-emerald-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
          <span className="text-lg font-medium">Loading hub details...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="flex h-screen overflow-hidden bg-gradient-to-br from-slate-50 via-white to-emerald-50">
      {/* Sidebar */}
      <Sidebar 
        sidebarOpen={sidebarOpen} 
        setSidebarOpen={setSidebarOpen} 
        variant="default"
      />

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Mobile Header */}
        <header className="lg:hidden flex items-center justify-between p-4 bg-white/90 backdrop-blur-sm border-b border-gray-100">
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="p-2 rounded-lg text-gray-600 hover:bg-gray-100 transition-colors"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
          <h1 className="text-xl font-bold text-gray-800">Hub Details</h1>
          <div className="w-10" />
        </header>

        {/* Page Content */}
        <div className="flex-1 overflow-y-auto p-4 md:p-8">
          {/* Header */}
          <div className="hidden lg:flex items-center gap-4 mb-8">
            <button
              onClick={() => navigate('/listofhubs')}
              className="p-2.5 rounded-xl bg-white border border-gray-200 text-gray-600 hover:text-emerald-600 hover:border-emerald-300 hover:bg-emerald-50 transition-all duration-200 shadow-sm"
            >
              <FiArrowLeft className="w-5 h-5" />
            </button>
            <div>
              <h1 className="text-3xl font-bold text-gray-800 flex items-center gap-3">
                <span className="bg-gradient-to-r from-emerald-500 to-teal-500 p-2.5 rounded-xl text-white shadow-lg">
                  <FiMapPin className="w-6 h-6" />
                </span>
                Hub Details
              </h1>
              <p className="text-gray-500 mt-1">Complete information about this charging hub</p>
            </div>
          </div>

          {/* Hub UID Badge */}
          <div className="mb-8 inline-flex items-center gap-3 px-5 py-2.5 bg-white rounded-xl shadow-sm border border-gray-200 hover:shadow-md transition-shadow">
            <FiMapPin className="w-4 h-4 text-emerald-500" />
            <span className="text-sm text-gray-600">Hub UID:</span>
            <span className="text-sm font-mono font-semibold text-gray-800">{uid}</span>
            <button
              onClick={() => copyToClipboard(uid)}
              className="p-1.5 hover:bg-gray-100 rounded-lg transition-colors"
              title="Copy UID"
            >
              <FiCopy className="w-4 h-4 text-gray-400 hover:text-gray-600" />
            </button>
          </div>

          {hubData && (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Left Column - Hub Information */}
              <div className="lg:col-span-2">
                <div className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-xl border border-gray-100 overflow-hidden hover:shadow-2xl transition-shadow duration-300">
                  <div className="bg-gradient-to-r from-emerald-500 to-teal-500 px-6 py-4">
                    <h2 className="text-lg font-bold text-white flex items-center gap-2">
                      <FiInfo className="w-5 h-5" />
                      Hub Information
                    </h2>
                  </div>
                  <div className="p-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {/* Hub Name */}
                      <div className="bg-gray-50 rounded-xl p-4 border border-gray-100 hover:border-emerald-200 transition-colors">
                        <label className="text-xs font-semibold text-gray-400 uppercase tracking-wider flex items-center gap-1">
                          <FiAward className="w-3 h-3" />
                          Hub Name
                        </label>
                        <div className="mt-1 text-lg font-bold text-gray-800 flex items-center gap-2">
                          <FiMapPin className="w-5 h-5 text-emerald-500" />
                          {hubData.hubname}
                        </div>
                      </div>

                      {/* Hub Tariff */}
                      <div className="bg-gray-50 rounded-xl p-4 border border-gray-100 hover:border-emerald-200 transition-colors">
                        <label className="text-xs font-semibold text-gray-400 uppercase tracking-wider flex items-center gap-1">
                          <FiTrendingUp className="w-3 h-3" />
                          Tariff Rate
                        </label>
                        <div className="mt-1 text-lg font-bold text-emerald-600 flex items-center gap-2">
                          <span className="text-2xl">₹</span>
                          {hubData.hubtariff}
                        </div>
                      </div>

                      {/* Hub Location */}
                      <div className="md:col-span-2 bg-gray-50 rounded-xl p-4 border border-gray-100 hover:border-emerald-200 transition-colors">
                        <label className="text-xs font-semibold text-gray-400 uppercase tracking-wider flex items-center gap-1">
                          <FiNavigation className="w-3 h-3" />
                          Location
                        </label>
                        <div className="mt-1 text-gray-700 flex items-center gap-2">
                          <FiMapPin className="w-5 h-5 text-emerald-500" />
                          {hubData.hublocation}
                        </div>
                      </div>

                      {/* Admin UID */}
                      <div className="md:col-span-2 bg-gradient-to-r from-emerald-50 to-teal-50 rounded-xl p-4 border border-emerald-100">
                        <label className="text-xs font-semibold text-gray-400 uppercase tracking-wider flex items-center gap-1">
                          <FiUser className="w-3 h-3" />
                          Admin
                        </label>
                        <div className="mt-1">
                          <button 
                            className="text-emerald-600 hover:text-emerald-700 font-mono hover:underline flex items-center gap-2 transition-colors"
                            onClick={() => handleUidClick(hubData.adminuid)}
                          >
                            <FiUser className="w-4 h-4" />
                            {hubData.adminuid}
                            <span className="text-xs text-gray-400 ml-2">(Click to view)</span>
                          </button>
                        </div>
                      </div>

                      {/* Created At */}
                      <div className="bg-gray-50 rounded-xl p-4 border border-gray-100">
                        <label className="text-xs font-semibold text-gray-400 uppercase tracking-wider flex items-center gap-1">
                          <FiCalendar className="w-3 h-3" />
                          Created
                        </label>
                        <div className="mt-1 text-gray-700 flex items-center gap-2">
                          <FiCalendar className="w-4 h-4 text-gray-400" />
                          {formatDate(hubData.createdAt)}
                        </div>
                      </div>

                      {/* Updated At */}
                      <div className="bg-gray-50 rounded-xl p-4 border border-gray-100">
                        <label className="text-xs font-semibold text-gray-400 uppercase tracking-wider flex items-center gap-1">
                          <FiClock className="w-3 h-3" />
                          Updated
                        </label>
                        <div className="mt-1 text-gray-700 flex items-center gap-2">
                          <FiClock className="w-4 h-4 text-gray-400" />
                          {formatDate(hubData.updatedAt)}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Right Column - Chargers */}
              <div className="lg:col-span-1">
                <div className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-xl border border-gray-100 overflow-hidden hover:shadow-2xl transition-shadow duration-300 sticky top-0">
                  <div className="bg-gradient-to-r from-blue-500 to-cyan-500 px-6 py-4">
                    <h2 className="text-lg font-bold text-white flex items-center gap-2">
                      <FiZap className="w-5 h-5" />
                      Chargers ({hubData.hubchargers?.length || 0})
                    </h2>
                  </div>
                  <div className="p-4 max-h-[500px] overflow-y-auto custom-scrollbar">
                    {Array.isArray(hubData.hubchargers) && hubData.hubchargers.length > 0 ? (
                      <div className="space-y-3">
                        {hubData.hubchargers.map((chargerId, index) => (
                          <div
                            key={chargerId}
                            className="p-4 bg-gradient-to-r from-gray-50 to-white rounded-xl border border-gray-200 hover:border-emerald-300 hover:shadow-md transition-all duration-300 group cursor-pointer"
                            onClick={() => handleChargerUidClick(chargerId)}
                          >
                            <div className="flex items-center justify-between">
                              <div className="flex items-center gap-3">
                                <div className="w-8 h-8 rounded-full bg-gradient-to-r from-blue-100 to-cyan-100 text-blue-600 flex items-center justify-center text-xs font-bold">
                                  {index + 1}
                                </div>
                                <div className="flex flex-col">
                                  <span className="font-mono text-sm text-gray-700">
                                    {chargerId.substring(0, 12)}...
                                  </span>
                                  <span className="text-xs text-gray-400">Charger {index + 1}</span>
                                </div>
                              </div>
                              <button
                                onClick={(e) => {
                                  e.stopPropagation();
                                  handleChargerUidClick(chargerId);
                                }}
                                className="text-blue-500 hover:text-blue-700 text-sm font-semibold opacity-0 group-hover:opacity-100 transition-all duration-200 flex items-center gap-1"
                              >
                                View <FiArrowLeft className="w-3 h-3 rotate-180" />
                              </button>
                            </div>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <div className="text-center py-12 text-gray-400">
                        <div className="w-20 h-20 mx-auto mb-4 bg-gray-100 rounded-full flex items-center justify-center">
                          <FiZap className="w-10 h-10 text-gray-300" />
                        </div>
                        <p className="text-sm font-medium text-gray-500">No chargers assigned</p>
                        <p className="text-xs text-gray-400 mt-1">This hub has no chargers yet</p>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Footer */}
          <div className="mt-8 text-center text-xs text-gray-400 border-t border-gray-200 pt-4">
            © {new Date().getFullYear()} Admin Panel. All rights reserved.
          </div>
        </div>
      </div>

      {/* Custom Scrollbar Styles */}
      <style jsx>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 4px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: transparent;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: #cbd5e1;
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: #94a3b8;
        }
      `}</style>
    </div>
  );
};

export default HubDetails;