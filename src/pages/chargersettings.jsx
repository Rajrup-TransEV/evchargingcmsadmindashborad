// import React, { useState, useEffect } from 'react';
// import { useParams } from 'react-router-dom';
// import { toast } from 'react-toastify';

// const ChargerSettings = () => {
//   const { uid } = useParams();
//   const [status, setStatus] = useState('');
//   const [connectorStatus, setConnectorStatus] = useState('');
//   const [connectors, setConnectors] = useState([]);
//   const [selectedConnector, setSelectedConnector] = useState('');
//   const [loading, setLoading] = useState(false);
//   const [isOnline, setIsOnline] = useState(true); // Use WebSocket to set this
//   const [parameters, setParameters] = useState([]);
//   const [selectedViewParameter, setSelectedViewParameter] = useState('');
//   const [viewedParameter, setViewedParameter] = useState(null);
//   const [selectedChangeParameter, setSelectedChangeParameter] = useState('');
//   const [currentValue, setCurrentValue] = useState('');
//   const [newValue, setNewValue] = useState('');
//   const [isLoadingConnectors, setIsLoadingConnectors] = useState(false);
//   const [isLoadingParameters, setIsLoadingParameters] = useState(false);
//   const [isSubmitting, setIsSubmitting] = useState(false);
//   const [isConnectorLoading, setIsConnectorLoading] = useState(false);
//   const [isResetting, setIsResetting] = useState(false);
//   const [isClearingCache, setIsClearingCache] = useState(false);
//   const [chargerData, setChargerData] = useState(null);
//   const [ipAddress, setIpAddress] = useState('');

//   // Fetch charger inactivity status every minute but not immediately after loading
//   useEffect(() => {
//     const checkChargerInactivity = async () => {
//       const rooturi = import.meta.env.VITE_BK_ROOT_URI;
//       const apikey = import.meta.env.VITE_BK_ROOT_API_KEY;
//       try {
//         await fetch(`${rooturi}/api/check_charger_inactivity`, {
//           method: 'POST',
//           headers: {
//             'Content-Type': 'application/json',
//             'x-api-key': apikey,
//           },
//           body: JSON.stringify({ uid }),
//         });
//       } catch (error) {
//         console.error('Error checking charger inactivity:', error);
//       }
//     };

//     const intervalId = setInterval(() => {
//       checkChargerInactivity();
//     }, 60000);

//     return () => {
//       clearInterval(intervalId);
//     };
//   }, [uid]);

//   useEffect(() => {
//     // WebSocket connection to monitor charger online/offline status
//     const rooturi = import.meta.env.VITE_BK_ROOT_URI;
//     const fewsuri = import.meta.env.VITE_FE_WS_URI;
//     const ws = new WebSocket(`${fewsuri}/frontend/ws/${uid}`);

//     ws.onopen = () => {
//       console.log(`WebSocket connected to ${fewsuri}/frontend/ws/${uid}`);
//     };

//     ws.onmessage = (event) => {
//       try {
//         const data = JSON.parse(event.data);
//         if (data.status === 'Online') {
//           setIsOnline(true);
//           setStatus('Online');
//           fetchChargerParameters(); // Load dropdown data when online
//           fetchChargerStatus();
//         } else if (data.status === 'Offline') {
//           setIsOnline(false);
//           setStatus('Offline');
//         }
//       } catch (error) {
//         console.error('Error parsing WebSocket message:', error);
//       }
//     };

//     ws.onclose = () => {
//       console.log(`WebSocket connection closed for charger ${uid}`);
//     };

//     ws.onerror = (error) => {
//       console.error('WebSocket error:', error);
//     };

//     // Fetch charger status immediately when the component loads
//     fetchChargerStatus();
//     fetchChargerParameters();

//     // Set an interval to fetch charger status every 1 minute
//     const intervalId = setInterval(() => {
//       fetchChargerStatus();
//     }, 60000); // 60000 milliseconds = 1 minute

//     // Cleanup on unmount (close WebSocket and clear interval)
//     return () => {
//       ws.close();
//       clearInterval(intervalId);
//     };
//   }, [uid]);

//   const fetchChargerStatus = async () => {
//     const rooturi = import.meta.env.VITE_BK_ROOT_URI;
//     const apikey = import.meta.env.VITE_BK_ROOT_API_KEY;
//     setLoading(true);
//     setIsLoadingConnectors(true);
//     setIsConnectorLoading(true);

//     try {
//       const response = await fetch(`${rooturi}/api/status`, {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//           'x-api-key': apikey,
//         },
//         body: JSON.stringify({ uid }),
//       });

//       const data = await response.json();
//       if (response.ok) {
//         setChargerData(data);
//         setStatus(data.status); // Inactive / Active
//         setIsOnline(data.online === 'Online');

//         if (data.connectors) {
//           const connectorIDs = Object.keys(data.connectors).filter(connId => connId !== '0');
//           setConnectors(connectorIDs);
//           if (connectorIDs.length > 0) {
//             setConnectorStatus(data.connectors[connectorIDs[0]]?.status || '');
//           }
//         } else {
//           setConnectors([]);
//         }
//       } else {
//         toast.error('Failed to fetch status');
//       }
//     } catch (error) {
//       toast.error('Error fetching charger status');
//       console.error('Error in fetchChargerStatus:', error);
//     } finally {
//       setLoading(false);
//       setIsLoadingConnectors(false);
//       setIsConnectorLoading(false);
//     }
//   };

//   const fetchChargerParameters = async () => {
//     const rooturi = import.meta.env.VITE_BK_ROOT_URI;
//     const apikey = import.meta.env.VITE_BK_ROOT_API_KEY;
//     setIsLoadingParameters(true);
//     try {
//       const response = await fetch(`${rooturi}/api/get_configuration`, {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//           'x-api-key': apikey,
//         },
//         body: JSON.stringify({ uid }),
//       });

//       const data = await response.json();
//       console.log('API Response:', data); // Add this for debugging

//       if (response.ok) {
//         // FIXED: Changed configuration_key to configurationKey
//         if (data && data.configurationKey && Array.isArray(data.configurationKey)) {
//           console.log('Parameters loaded:', data.configurationKey.length); // Debug log
//           setParameters(data.configurationKey);
//         } else {
//           console.warn('No configurationKey in response or not an array:', data);
//           setParameters([]);
//           toast.warning('No parameters available');
//         }
//       } else {
//         console.error('Failed to fetch parameters:', data);
//         setParameters([]);
//         toast.error('Failed to fetch charger parameters');
//       }
//     } catch (error) {
//       console.error('Error fetching charger parameters:', error);
//       setParameters([]);
//       toast.error('Error fetching charger parameters');
//     } finally {
//       setIsLoadingParameters(false);
//     }
//   };

//   const handleConnectorChange = async (e) => {
//     const selectedConnectorId = e.target.value;
//     setSelectedConnector(selectedConnectorId);

//     if (!selectedConnectorId) return;

//     setIsConnectorLoading(true);

//     try {
//       const rooturi = import.meta.env.VITE_BK_ROOT_URI;
//       const apikey = import.meta.env.VITE_BK_ROOT_API_KEY;

//       const response = await fetch(`${rooturi}/api/status`, {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//           'x-api-key': apikey,
//         },
//         body: JSON.stringify({ uid }),
//       });

//       if (response.ok) {
//         const data = await response.json();
//         const connector = data.connectors[selectedConnectorId];
//         if (connector) {
//           setConnectorStatus(connector.status);
//         } else {
//           toast.error('Connector not found');
//         }
//       } else {
//         toast.error('Failed to fetch charger status');
//       }
//     } catch (error) {
//       toast.error('Error fetching charger status');
//       console.error('Error in handleConnectorChange:', error);
//     } finally {
//       setIsConnectorLoading(false);
//     }
//   };

//   const handleSelectChangeParameter = (e) => {
//     const paramKey = e.target.value;
//     setSelectedChangeParameter(paramKey);
//     if (parameters && Array.isArray(parameters)) {
//       const param = parameters.find(p => p.key === paramKey);
//       setCurrentValue(param ? param.value : '');
//     } else {
//       setCurrentValue('');
//     }
//   };

//   const handleParameterChange = async () => {
//     const rooturi = import.meta.env.VITE_BK_ROOT_URI;
//     const apikey = import.meta.env.VITE_BK_ROOT_API_KEY;

//     const payload = {
//       uid,
//       key: selectedChangeParameter,
//       value: newValue,
//     };

//     try {
//       const response = await fetch(`${rooturi}/api/change_configuration`, {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//           'x-api-key': apikey,
//         },
//         body: JSON.stringify(payload),
//       });

//       const data = await response.json();
//       if (response.ok) {
//         toast.success('Parameter updated successfully');
//         fetchChargerParameters();
//         setCurrentValue(newValue);

//         // Update the viewed parameter if it matches
//         if (parameters && Array.isArray(parameters)) {
//           const updatedParam = parameters.find(p => p.key === selectedViewParameter);
//           if (updatedParam) {
//             updatedParam.value = newValue;
//             setViewedParameter(updatedParam);
//           }
//         }
//       } else {
//         toast.error('Failed to update parameter');
//       }
//     } catch (error) {
//       toast.error('Error updating parameter');
//       console.error('Error in handleParameterChange:', error);
//     }
//   };

//   const handleSubmit = async () => {
//     if (!selectedConnector) {
//       toast.error('Please select a connector');
//       return;
//     }

//     setIsSubmitting(true);

//     const rooturi = import.meta.env.VITE_BK_ROOT_URI;
//     const apikey = import.meta.env.VITE_BK_ROOT_API_KEY;
//     const payload = {
//       uid,
//       connector_id: selectedConnector,
//       type: connectorStatus === 'Available' ? 'Inoperative' : 'Operative',
//     };

//     try {
//       const response = await fetch(`${rooturi}/api/change_availability`, {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//           'x-api-key': apikey,
//         },
//         body: JSON.stringify(payload),
//       });

//       const data = await response.json();
//       if (response.ok) {
//         toast.success(`Charger successfully ${connectorStatus === 'Available' ? 'disengaged' : 'engaged'}`);
//         await fetchChargerStatus(); //Refresh status after the operation
//       } else {
//         toast.error('Operation failed');
//       }
//     } catch (error) {
//       toast.error('Error performing the operation');
//       console.error('Error in handleSubmit:', error);
//     } finally {
//       setIsSubmitting(false);
//     }
//   };

//   const handleRefreshCharger = async () => {
//     setIsResetting(true);
//     const rooturi = import.meta.env.VITE_BK_ROOT_URI;
//     const apikey = import.meta.env.VITE_BK_ROOT_API_KEY;

//     try {
//       const response = await fetch(`${rooturi}/api/reset`, {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//           'x-api-key': apikey,
//         },
//         body: JSON.stringify({
//           uid,
//           type: 'Soft',
//         }),
//       });

//       const data = await response.json();
//       if (response.ok) {
//         toast.success('Charger refresh successful');
//         fetchChargerStatus(); // Refresh status after refresh
//       } else {
//         toast.error(`Failed to refresh charger: ${data.detail}`);
//       }
//     } catch (error) {
//       toast.error('Error refreshing charger');
//       console.error('Error in handleRefreshCharger:', error);
//     } finally {
//       setIsResetting(false);
//     }
//   };

//   const handleClearCache = async () => {
//     setIsClearingCache(true);
//     const rooturi = import.meta.env.VITE_BK_ROOT_URI;
//     const apikey = import.meta.env.VITE_BK_ROOT_API_KEY;

//     try {
//       const response = await fetch(`${rooturi}/api/clear_cache`, {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//           'x-api-key': apikey,
//         },
//         body: JSON.stringify({
//           uid,
//         }),
//       });

//       const data = await response.json();
//       if (response.ok) {
//         toast.success('Cache cleared successfully');
//       } else {
//         toast.error(`Failed to clear cache: ${data.detail}`);
//       }
//     } catch (error) {
//       toast.error('Error clearing cache');
//       console.error('Error in handleClearCache:', error);
//     } finally {
//       setIsClearingCache(false);
//     }
//   };

//   useEffect(() => {
//     // Load status and parameters when component loads or focus changes
//     fetchChargerStatus();
//     fetchChargerParameters();

//     const handleFocus = () => {
//       fetchChargerStatus();
//       fetchChargerParameters();
//     };

//     window.addEventListener('focus', handleFocus);
//     return () => {
//       window.removeEventListener('focus', handleFocus);
//     };
//   }, [uid]);

//   // IP tracking facility
//   useEffect(() => {
//     // Fetch the IP address from the API
//     const fetchIpAddress = async () => {
//       const rooturi = import.meta.env.VITE_ROOT_URI;
//       const apikey = import.meta.env.VITE_API_KEY;
//       try {
//         const response = await fetch("https://api.ipify.org?format=json");
//         const data = await response.json();
//         console.log(data);
//         // Set the IP address in state
//         if (data) {
//           setIpAddress(data.ip);
//           const currentDateTime = new Date().toISOString();
//           const pathfinder = "chargersettings.jsx";
//           const resp = await fetch(`${rooturi}/admin/getip`, {
//             method: 'POST',
//             headers: {
//               'Content-Type': 'application/json',
//               'apiauthkey': apikey,
//             },
//             body: JSON.stringify({ ip: data.ip, datetime: currentDateTime, path: pathfinder })
//           });
//         }
//       } catch (error) {
//         console.error("Error fetching IP address:", error);
//       }
//     };

//     fetchIpAddress();
//   }, []); // Empty dependency array means this runs once after the initial render

//   /* Overlay helper */
//   const overlay = (text) => (
//     <div className="absolute inset-0 bg-white/70 backdrop-blur-sm
//                     flex items-center justify-center rounded-xl z-10
//                     text-gray-600 font-semibold">
//       {text}
//     </div>
//   );

//   return (
//     <div className="min-h-screen bg-gradient-to-r from-blue-50 to-indigo-50 p-6">

//       {/* Header */}
//       <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
//         <div>
//           <h1 className="text-4xl font-bold text-indigo-800">Charger Settings</h1>
//           <p className="text-gray-600 mt-1">
//             Charger ID: <span className="font-semibold">{uid}</span>
//           </p>
//         </div>

//         <span
//           className={`mt-3 md:mt-0 px-4 py-1 rounded-full text-sm font-semibold flex items-center gap-2
//   ${isOnline ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}
//         >
//           {loading
//             ? '⏳ Checking status...'
//             : isOnline
//               ? '🟢 Online'
//               : '🔴 Offline'}
//         </span>
//       </div>

//       {/* Charger Live Status */}
//       {chargerData && (
//         <div className="bg-white rounded-xl shadow-lg p-5 mb-6 border-t-4 border-indigo-500">
//           <h2 className="text-xl font-semibold text-gray-800 mb-4">Charger Live Status</h2>
//           <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-gray-700">
//             <p><b>Charger ID:</b> {chargerData.charger_id}</p>
//             <p><b>Charger Status:</b> <span className="font-semibold">{chargerData.status}</span></p>
//             <p>
//               <b>Connectivity:</b>{" "}
//               <span className={`font-semibold ${isOnline ? "text-green-600" : "text-red-600"}`}>
//                 {isOnline ? 'Online' : 'Offline'}
//               </span>
//             </p>
//             <p><b>Last Message:</b> {new Date(chargerData.latest_message_received_time).toLocaleString()}</p>
//           </div>
//         </div>
//       )}

//       {/* Action Buttons */}
//       <div className="bg-white rounded-xl shadow-lg p-5 mb-6 flex flex-wrap gap-4">
//         <button
//           onClick={handleClearCache}
//           disabled={!isOnline || isClearingCache}
//           className="px-5 py-2 rounded-lg bg-yellow-500 text-white font-medium hover:bg-yellow-600 disabled:opacity-50"
//         >
//           {isClearingCache ? 'Clearing Cache...' : 'Clear Cache'}
//         </button>

//         <button
//           onClick={handleRefreshCharger}
//           disabled={!isOnline || isResetting}
//           className="px-5 py-2 rounded-lg bg-green-600 text-white font-medium hover:bg-green-700 disabled:opacity-50"
//         >
//           {isResetting ? 'Refreshing...' : 'Refresh Charger'}
//         </button>

//         <button
//           onClick={fetchChargerStatus}
//           disabled={loading}
//           className="px-5 py-2 rounded-lg bg-blue-600 text-white font-medium hover:bg-blue-700 disabled:opacity-50"
//         >
//           {loading ? 'Refreshing...' : 'Refresh Status'}
//         </button>
//       </div>

//       {/* Main Grid */}
//       <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

//         {/* Engage / Disengage Connector */}
//         <div className="relative bg-white rounded-xl shadow-lg p-5 border-t-4 border-yellow-400">
//           <h2 className="text-lg font-semibold text-gray-800 mb-4">Engage / Disengage Connector</h2>
//           {!isOnline && overlay("Charger is offline")}
//           {isLoadingConnectors && overlay("Loading connectors...")}

//           <label className="block text-sm font-medium text-gray-600">Connector ID</label>
//           <select
//             value={selectedConnector}
//             onChange={handleConnectorChange}
//             disabled={!isOnline}
//             className="mt-1 w-full rounded-lg border-gray-300 focus:ring-yellow-400 focus:border-yellow-400"
//           >
//             <option value="">Select Connector</option>
//             {connectors && connectors.map(id => <option key={id} value={id}>Connector {id}</option>)}
//           </select>

//           {selectedConnector && (
//             <button
//               onClick={handleSubmit}
//               disabled={isSubmitting || isConnectorLoading}
//               className={`mt-4 w-full py-2 rounded-lg font-semibold text-white
//               ${connectorStatus === 'Available' ? 'bg-red-600 hover:bg-red-700' : 'bg-green-600 hover:bg-green-700'}`}
//             >
//               {isSubmitting || isConnectorLoading
//                 ? 'Processing...'
//                 : connectorStatus === 'Available' ? 'Disengage' : 'Engage'}
//             </button>
//           )}
//         </div>

//         {/* Connector Status */}
//         {chargerData && chargerData.connectors && (
//           <div className="bg-white rounded-xl shadow-lg p-5 border-t-4 border-green-400">
//             <h2 className="text-lg font-semibold text-gray-800 mb-4">Connector Status</h2>
//             <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//               {Object.entries(chargerData.connectors).map(([id, connector]) => (
//                 <div key={id} className="border rounded-lg p-3 flex justify-between items-center">
//                   <span className="font-medium">Connector {id}</span>
//                   <span className={`font-semibold ${connector.status === "Available" ? "text-green-600" : "text-red-600"}`}>
//                     {connector.status}
//                   </span>
//                 </div>
//               ))}
//             </div>
//           </div>
//         )}

//         {/* View Parameters */}
//         <div className="relative bg-white rounded-xl shadow-lg p-5 border-t-4 border-pink-400">
//           <h2 className="text-lg font-semibold text-gray-800 mb-4">View Charger Parameters</h2>
//           {!isOnline && overlay("Charger is offline")}
//           {isLoadingParameters && overlay("Loading parameters...")}

//           <label className="block text-sm font-medium text-gray-600">Parameter</label>
//           <select
//             value={selectedViewParameter}
//             onChange={(e) => {
//               setSelectedViewParameter(e.target.value);
//               if (parameters && Array.isArray(parameters)) {
//                 setViewedParameter(parameters.find(p => p.key === e.target.value));
//               } else {
//                 setViewedParameter(null);
//               }
//             }}
//             className="mt-1 w-full rounded-lg border-gray-300"
//           >
//             <option value="">Select Parameter</option>
//             {parameters && Array.isArray(parameters) && parameters.map(p => (
//               <option key={p.key} value={p.key}>{p.key}</option>
//             ))}
//           </select>

//           <button
//             onClick={fetchChargerParameters}
//             className="mt-3 px-4 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700"
//           >
//             Refresh Parameters
//           </button>

//           {viewedParameter && (
//             <div className="mt-4 bg-pink-50 rounded-lg p-3 text-sm space-y-1">
//               <p><b>Key:</b> {viewedParameter.key}</p>
//               <p><b>Editable:</b> {viewedParameter.readonly ? 'No' : 'Yes'}</p>
//               <p className="break-all"><b>Value:</b> {viewedParameter.value}</p>
//             </div>
//           )}
//         </div>

//         {/* Change Parameters */}
//         <div className="relative bg-white rounded-xl shadow-lg p-5 border-t-4 border-indigo-400">
//           <h2 className="text-lg font-semibold text-gray-800 mb-4">Change Charger Parameter</h2>
//           {!isOnline && overlay("Charger is offline")}

//           <label className="block text-sm font-medium text-gray-600">Parameter</label>
//           <select
//             value={selectedChangeParameter}
//             onChange={handleSelectChangeParameter}
//             className="mt-1 w-full rounded-lg border-gray-300"
//           >
//             <option value="">Select Parameter</option>
//             {parameters && Array.isArray(parameters) && parameters
//               .filter(p => !p.readonly)
//               .map(p => <option key={p.key} value={p.key}>{p.key}</option>)
//             }
//           </select>

//           <div className="mt-3">
//             <label className="text-sm font-medium text-gray-600">Current Value</label>
//             <input
//               value={currentValue}
//               disabled
//               className="mt-1 w-full rounded-lg bg-gray-100 border-gray-300"
//             />
//           </div>

//           <div className="mt-3">
//             <label className="text-sm font-medium text-gray-600">New Value</label>
//             <input
//               value={newValue}
//               onChange={(e) => setNewValue(e.target.value)}
//               className="mt-1 w-full rounded-lg border-gray-300"
//             />
//           </div>

//           <button
//             onClick={handleParameterChange}
//             disabled={!newValue || !selectedChangeParameter}
//             className="mt-4 w-full py-2 rounded-lg bg-green-600 text-white hover:bg-green-700 disabled:opacity-50"
//           >
//             Change Parameter
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default ChargerSettings;

import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { 
  Zap, 
  RefreshCw, 
  Trash2, 
  Settings, 
  Power, 
  PowerOff,
  ChevronDown,
  ChevronRight,
  Activity,
  Clock,
  Server,
  Plug,
  AlertCircle,
  CheckCircle,
  XCircle,
  ArrowLeft
} from 'lucide-react';
import Sidebar from '../partials/Sidebar';

const ChargerSettings = () => {
  const { uid } = useParams();
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [status, setStatus] = useState('');
  const [connectorStatus, setConnectorStatus] = useState('');
  const [connectors, setConnectors] = useState([]);
  const [selectedConnector, setSelectedConnector] = useState('');
  const [loading, setLoading] = useState(false);
  // Initialize as false - don't assume online
  const [isOnline, setIsOnline] = useState(false);
  const [parameters, setParameters] = useState([]);
  const [selectedViewParameter, setSelectedViewParameter] = useState('');
  const [viewedParameter, setViewedParameter] = useState(null);
  const [selectedChangeParameter, setSelectedChangeParameter] = useState('');
  const [currentValue, setCurrentValue] = useState('');
  const [newValue, setNewValue] = useState('');
  const [isLoadingConnectors, setIsLoadingConnectors] = useState(false);
  const [isLoadingParameters, setIsLoadingParameters] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isConnectorLoading, setIsConnectorLoading] = useState(false);
  const [isResetting, setIsResetting] = useState(false);
  const [isClearingCache, setIsClearingCache] = useState(false);
  const [chargerData, setChargerData] = useState(null);
  const [ipAddress, setIpAddress] = useState('');
  const [expandedSections, setExpandedSections] = useState({
    connectors: true,
    parameters: false,
    advanced: false
  });

  // Toggle section expansion
  const toggleSection = (section) => {
    setExpandedSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }));
  };

  // Fetch charger status
  const fetchChargerStatus = async () => {
    const rooturi = import.meta.env.VITE_BK_ROOT_URI;
    const apikey = import.meta.env.VITE_BK_ROOT_API_KEY;
    setLoading(true);
    setIsLoadingConnectors(true);
    setIsConnectorLoading(true);

    try {
      const response = await fetch(`${rooturi}/api/status`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-api-key': apikey,
        },
        body: JSON.stringify({ uid }),
      });

      const data = await response.json();
      if (response.ok) {
        applyStatusPayload(data);
      } else {
        toast.error('Failed to fetch status');
      }
    } catch (error) {
      toast.error('Error fetching charger status');
      console.error('Error in fetchChargerStatus:', error);
    } finally {
      setLoading(false);
      setIsLoadingConnectors(false);
      setIsConnectorLoading(false);
    }
  };

  // Apply status payload - shared between fetch and WebSocket
  const applyStatusPayload = (data) => {
    if (!data || typeof data !== 'object') return;
    
    setChargerData(data);
    // Set status to show the online field instead of status field
    setStatus(data.online || 'Unknown');
    // Check online field correctly - it should be 'Online' or 'Offline'
    setIsOnline(String(data.online || '').startsWith('Online'));
    
    const connectorIDs = Object.keys(data.connectors || {})
      .filter(connectorID => connectorID !== '0' && connectorID !== 0);
    setConnectors(connectorIDs);
    
    if (connectorIDs.length > 0) {
      setConnectorStatus(
        data.connectors[connectorIDs[0]]?.status || ''
      );
    } else {
      setConnectorStatus('');
    }
  };

  // Fetch charger parameters - ONLY ONCE on mount, not in polling
  const fetchChargerParameters = async () => {
    const rooturi = import.meta.env.VITE_BK_ROOT_URI;
    const apikey = import.meta.env.VITE_BK_ROOT_API_KEY;
    setIsLoadingParameters(true);
    try {
      const response = await fetch(`${rooturi}/api/get_configuration`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-api-key': apikey,
        },
        body: JSON.stringify({ uid }),
      });

      const data = await response.json();
      console.log('API Response:', data);

      if (response.ok) {
        if (data && data.configurationKey && Array.isArray(data.configurationKey)) {
          console.log('Parameters loaded:', data.configurationKey.length);
          setParameters(data.configurationKey);
        } else {
          console.warn('No configurationKey in response or not an array:', data);
          setParameters([]);
          toast.warning('No parameters available');
        }
      } else {
        console.error('Failed to fetch parameters:', data);
        setParameters([]);
        toast.error('Failed to fetch charger parameters');
      }
    } catch (error) {
      console.error('Error fetching charger parameters:', error);
      setParameters([]);
      toast.error('Error fetching charger parameters');
    } finally {
      setIsLoadingParameters(false);
    }
  };

  // Handle connector change
  const handleConnectorChange = async (e) => {
    const selectedConnectorId = e.target.value;
    setSelectedConnector(selectedConnectorId);

    if (!selectedConnectorId) return;

    setIsConnectorLoading(true);

    try {
      const rooturi = import.meta.env.VITE_BK_ROOT_URI;
      const apikey = import.meta.env.VITE_BK_ROOT_API_KEY;

      const response = await fetch(`${rooturi}/api/status`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-api-key': apikey,
        },
        body: JSON.stringify({ uid }),
      });

      if (response.ok) {
        const data = await response.json();
        const connector = data.connectors[selectedConnectorId];
        if (connector) {
          setConnectorStatus(connector.status);
        } else {
          toast.error('Connector not found');
        }
      } else {
        toast.error('Failed to fetch charger status');
      }
    } catch (error) {
      toast.error('Error fetching charger status');
      console.error('Error in handleConnectorChange:', error);
    } finally {
      setIsConnectorLoading(false);
    }
  };

  // Handle select change parameter
  const handleSelectChangeParameter = (e) => {
    const paramKey = e.target.value;
    setSelectedChangeParameter(paramKey);
    if (parameters && Array.isArray(parameters)) {
      const param = parameters.find(p => p.key === paramKey);
      setCurrentValue(param ? param.value : '');
    } else {
      setCurrentValue('');
    }
  };

  // Handle parameter change
  const handleParameterChange = async () => {
    const rooturi = import.meta.env.VITE_BK_ROOT_URI;
    const apikey = import.meta.env.VITE_BK_ROOT_API_KEY;

    const payload = {
      uid,
      key: selectedChangeParameter,
      value: newValue,
    };

    try {
      const response = await fetch(`${rooturi}/api/change_configuration`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-api-key': apikey,
        },
        body: JSON.stringify(payload),
      });

      const data = await response.json();
      if (response.ok) {
        toast.success('Parameter updated successfully');
        fetchChargerParameters();
        setCurrentValue(newValue);

        if (parameters && Array.isArray(parameters)) {
          const updatedParam = parameters.find(p => p.key === selectedViewParameter);
          if (updatedParam) {
            updatedParam.value = newValue;
            setViewedParameter(updatedParam);
          }
        }
      } else {
        toast.error('Failed to update parameter');
      }
    } catch (error) {
      toast.error('Error updating parameter');
      console.error('Error in handleParameterChange:', error);
    }
  };

  // Handle submit (engage/disengage)
  const handleSubmit = async () => {
    if (!selectedConnector) {
      toast.error('Please select a connector');
      return;
    }

    setIsSubmitting(true);

    const rooturi = import.meta.env.VITE_BK_ROOT_URI;
    const apikey = import.meta.env.VITE_BK_ROOT_API_KEY;
    const payload = {
      uid,
      connector_id: selectedConnector,
      type: connectorStatus === 'Available' ? 'Inoperative' : 'Operative',
    };

    try {
      const response = await fetch(`${rooturi}/api/change_availability`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-api-key': apikey,
        },
        body: JSON.stringify(payload),
      });

      const data = await response.json();
      if (response.ok) {
        toast.success(`Charger successfully ${connectorStatus === 'Available' ? 'disengaged' : 'engaged'}`);
        await fetchChargerStatus();
      } else {
        toast.error('Operation failed');
      }
    } catch (error) {
      toast.error('Error performing the operation');
      console.error('Error in handleSubmit:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  // Handle refresh charger
  const handleRefreshCharger = async () => {
    setIsResetting(true);
    const rooturi = import.meta.env.VITE_BK_ROOT_URI;
    const apikey = import.meta.env.VITE_BK_ROOT_API_KEY;

    try {
      const response = await fetch(`${rooturi}/api/reset`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-api-key': apikey,
        },
        body: JSON.stringify({
          uid,
          type: 'Soft',
        }),
      });

      const data = await response.json();
      if (response.ok) {
        toast.success('Charger refresh successful');
        fetchChargerStatus();
      } else {
        toast.error(`Failed to refresh charger: ${data.detail}`);
      }
    } catch (error) {
      toast.error('Error refreshing charger');
      console.error('Error in handleRefreshCharger:', error);
    } finally {
      setIsResetting(false);
    }
  };

  // Handle clear cache
  const handleClearCache = async () => {
    setIsClearingCache(true);
    const rooturi = import.meta.env.VITE_BK_ROOT_URI;
    const apikey = import.meta.env.VITE_BK_ROOT_API_KEY;

    try {
      const response = await fetch(`${rooturi}/api/clear_cache`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-api-key': apikey,
        },
        body: JSON.stringify({
          uid,
        }),
      });

      const data = await response.json();
      if (response.ok) {
        toast.success('Cache cleared successfully');
      } else {
        toast.error(`Failed to clear cache: ${data.detail}`);
      }
    } catch (error) {
      toast.error('Error clearing cache');
      console.error('Error in handleClearCache:', error);
    } finally {
      setIsClearingCache(false);
    }
  };

  // Handle back navigation
  const handleGoBack = () => {
    navigate(-1);
  };

  // REMOVED: check_charger_inactivity effect - HAL owns liveness

  // Main effect: WebSocket + polling fallback with proper cleanup
  useEffect(() => {
    const wsBase = String(import.meta.env.VITE_FE_WS_URI || '')
      .replace(/\/+$/, '');
    let disposed = false;
    let ws = null;
    let pollingTimer = null;
    let reconnectTimer = null;
    let connectionTimer = null;

    const stopPolling = () => {
      if (pollingTimer) {
        clearInterval(pollingTimer);
        pollingTimer = null;
      }
    };

    const startPolling = () => {
      if (disposed || pollingTimer) return;
      // Poll only status. Never poll GetConfiguration.
      void fetchChargerStatus();
      pollingTimer = setInterval(() => {
        if (!disposed) {
          void fetchChargerStatus();
        }
      }, 15000);
    };

    const connect = () => {
      if (disposed) return;
      const wsUrl = `${wsBase}/frontend/ws/${encodeURIComponent(uid)}`;
      ws = new WebSocket(wsUrl);
      
      connectionTimer = setTimeout(() => {
        if (ws && ws.readyState === WebSocket.CONNECTING) {
          ws.close();
        }
      }, 5000);

      ws.onopen = () => {
        clearTimeout(connectionTimer);
        connectionTimer = null;
        stopPolling();
      };

      ws.onmessage = (event) => {
        try {
          applyStatusPayload(JSON.parse(event.data));
        } catch (error) {
          console.error('Invalid charger WebSocket payload:', error);
        }
      };

      ws.onerror = (error) => {
        console.error('Charger WebSocket error:', error);
      };

      ws.onclose = () => {
        clearTimeout(connectionTimer);
        connectionTimer = null;
        if (disposed) return;
        startPolling();
        reconnectTimer = setTimeout(() => {
          stopPolling();
          connect();
        }, 5000);
      };
    };

    // Exactly one initial status/configuration request.
    void fetchChargerStatus();
    void fetchChargerParameters();
    
    connect();

    return () => {
      disposed = true;
      clearTimeout(connectionTimer);
      clearTimeout(reconnectTimer);
      stopPolling();
      if (ws) {
        // Prevent onclose from starting polling after unmount.
        ws.onclose = null;
        ws.onmessage = null;
        ws.onerror = null;
        if (ws.readyState === WebSocket.OPEN) {
          ws.close(1000, 'Component unmounted');
        }
      }
    };
  }, [uid]);

  // Refresh status on focus, but do not send GetConfiguration again
  useEffect(() => {
    const handleFocus = () => {
      void fetchChargerStatus();
    };
    window.addEventListener('focus', handleFocus);
    return () => {
      window.removeEventListener('focus', handleFocus);
    };
  }, []);

  // IP tracking
  useEffect(() => {
    const fetchIpAddress = async () => {
      const rooturi = import.meta.env.VITE_ROOT_URI;
      const apikey = import.meta.env.VITE_API_KEY;
      try {
        const response = await fetch("https://api.ipify.org?format=json");
        const data = await response.json();
        console.log(data);
        if (data) {
          setIpAddress(data.ip);
          const currentDateTime = new Date().toISOString();
          const pathfinder = "chargersettings.jsx";
          const resp = await fetch(`${rooturi}/admin/getip`, {
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

  // Overlay helper
  const overlay = (text) => (
    <div className="absolute inset-0 bg-white/80 backdrop-blur-sm
                    flex items-center justify-center rounded-xl z-10
                    text-gray-600 font-semibold">
      {text}
    </div>
  );

  // Status badge component
  const StatusBadge = ({ status, size = 'md', isConnector0 = false }) => {
    // If it's connector 0, always show as Unavailable
    const displayStatus = isConnector0 ? 'Unavailable' : status;
    
    const statusConfig = {
      'Available': { color: 'bg-green-100 text-green-700', icon: CheckCircle },
      'Charging': { color: 'bg-blue-100 text-blue-700', icon: Zap },
      'Preparing': { color: 'bg-yellow-100 text-yellow-700', icon: Activity },
      'Inoperative': { color: 'bg-red-100 text-red-700', icon: XCircle },
      'Faulted': { color: 'bg-red-100 text-red-700', icon: AlertCircle },
      'Unavailable': { color: 'bg-gray-200 text-gray-500', icon: PowerOff },
      'Online': { color: 'bg-green-100 text-green-700', icon: CheckCircle },
      'Offline': { color: 'bg-red-100 text-red-700', icon: XCircle }
    };

    const config = statusConfig[displayStatus] || { color: 'bg-gray-100 text-gray-700', icon: Activity };
    const Icon = config.icon;
    const sizeClasses = size === 'sm' ? 'px-2 py-1 text-xs' : 'px-3 py-1.5 text-sm';

    return (
      <span className={`inline-flex items-center gap-1.5 rounded-full font-medium ${config.color} ${sizeClasses}`}>
        <Icon className="w-3.5 h-3.5" />
        {displayStatus}
      </span>
    );
  };

  return (
    <div className="flex h-screen bg-gray-50 overflow-hidden">
      {/* Sidebar - Using the existing Sidebar component */}
      <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        {/* Top Navigation Bar */}
        <header className="bg-white border-b border-gray-200 sticky top-0 z-20">
          <div className="flex items-center justify-between px-4 sm:px-6 lg:px-8 h-16">
            <div className="flex items-center gap-3">
              <button 
                onClick={() => setSidebarOpen(true)} 
                className="p-2 rounded-lg hover:bg-gray-100 md:hidden"
              >
                <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              </button>
              <div className="flex items-center gap-2">
                <button 
                  onClick={handleGoBack}
                  className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
                  title="Go back"
                >
                  <ArrowLeft className="w-5 h-5 text-gray-600" />
                </button>
                <div>
                  <h1 className="text-xl font-bold text-gray-900">{uid}</h1>
                  <p className="text-xs text-gray-500 hidden sm:block">Charger Settings</p>
                </div>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-2">
                <div className={`w-2.5 h-2.5 rounded-full ${isOnline ? 'bg-green-500 animate-pulse' : 'bg-red-500'}`} />
                <span className={`text-sm font-medium ${isOnline ? 'text-green-600' : 'text-red-600'}`}>
                  {isOnline ? 'Online' : 'Offline'}
                </span>
              </div>
              <button
                onClick={fetchChargerStatus}
                disabled={loading}
                className="p-2 rounded-lg hover:bg-gray-100 transition-colors disabled:opacity-50"
              >
                <RefreshCw className={`w-4 h-4 text-gray-600 ${loading ? 'animate-spin' : ''}`} />
              </button>
            </div>
          </div>
        </header>

        {/* Scrollable Content */}
        <div className="flex-1 overflow-y-auto">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
            {/* Quick Stats */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
              <div className="bg-white rounded-xl shadow-sm p-4 border border-gray-200">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-500">Charger ID</p>
                    <p className="text-lg font-semibold text-gray-900 truncate">{uid}</p>
                  </div>
                  <Server className="w-8 h-8 text-blue-500 opacity-50" />
                </div>
              </div>
              <div className="bg-white rounded-xl shadow-sm p-4 border border-gray-200">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-500">Status</p>
                    <p className="text-lg font-semibold text-gray-900">{status || 'Unknown'}</p>
                  </div>
                  <Activity className="w-8 h-8 text-green-500 opacity-50" />
                </div>
              </div>
              <div className="bg-white rounded-xl shadow-sm p-4 border border-gray-200">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-500">Connectors</p>
                    <p className="text-lg font-semibold text-gray-900">{connectors.length}</p>
                  </div>
                  <Plug className="w-8 h-8 text-purple-500 opacity-50" />
                </div>
              </div>
              <div className="bg-white rounded-xl shadow-sm p-4 border border-gray-200">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-500">Last Message</p>
                    <p className="text-sm font-medium text-gray-900 truncate">
                      {chargerData?.latest_message_received_time ? 
                        new Date(chargerData.latest_message_received_time).toLocaleString() : 
                        'Never'}
                    </p>
                  </div>
                  <Clock className="w-8 h-8 text-gray-400 opacity-50" />
                </div>
              </div>
            </div>

            {/* Main Grid - 2 columns on large screens */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Left Column */}
              <div className="space-y-6">
                {/* Connectors Section */}
                <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                  <button
                    onClick={() => toggleSection('connectors')}
                    className="w-full px-6 py-4 flex items-center justify-between hover:bg-gray-50 transition-colors"
                  >
                    <div className="flex items-center space-x-3">
                      <Plug className="w-5 h-5 text-blue-600" />
                      <h2 className="text-lg font-semibold text-gray-900">Connectors</h2>
                      {!isOnline && (
                        <span className="text-xs text-red-500 font-medium">(Offline)</span>
                      )}
                    </div>
                    <div className="flex items-center space-x-2">
                      <span className="text-sm text-gray-500">{connectors.length} available</span>
                      {expandedSections.connectors ? 
                        <ChevronDown className="w-5 h-5 text-gray-400" /> : 
                        <ChevronRight className="w-5 h-5 text-gray-400" />
                      }
                    </div>
                  </button>
                  
                  {expandedSections.connectors && (
                    <div className="px-6 pb-6 space-y-4">
                      <div className="relative">
                        {!isOnline && overlay("Charger is offline")}
                        {isLoadingConnectors && overlay("Loading connectors...")}
                        
                        <label className="block text-sm font-medium text-gray-700 mb-1.5">
                          Select Connector
                        </label>
                        <select
                          value={selectedConnector}
                          onChange={handleConnectorChange}
                          disabled={!isOnline}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:bg-gray-100 disabled:cursor-not-allowed"
                        >
                          <option value="">Choose a connector</option>
                          {connectors && connectors.map(id => (
                            <option key={id} value={id}>Connector {id}</option>
                          ))}
                        </select>
                      </div>

                      {selectedConnector && (
                        <div className="bg-gray-50 rounded-lg p-4">
                          <div className="flex items-center justify-between mb-3">
                            <span className="text-sm font-medium text-gray-700">
                              Connector {selectedConnector}
                            </span>
                            <StatusBadge status={connectorStatus} />
                          </div>
                          <button
                            onClick={handleSubmit}
                            disabled={isSubmitting || isConnectorLoading || !isOnline}
                            className={`w-full py-2.5 rounded-lg font-medium text-white transition-all duration-200
                              ${connectorStatus === 'Available' 
                                ? 'bg-red-600 hover:bg-red-700' 
                                : 'bg-green-600 hover:bg-green-700'
                              } disabled:opacity-50 disabled:cursor-not-allowed`}
                          >
                            {isSubmitting || isConnectorLoading ? (
                              <div className="flex items-center justify-center space-x-2">
                                <RefreshCw className="w-4 h-4 animate-spin" />
                                <span>Processing...</span>
                              </div>
                            ) : connectorStatus === 'Available' ? (
                              <div className="flex items-center justify-center space-x-2">
                                <PowerOff className="w-4 h-4" />
                                <span>Disengage Connector</span>
                              </div>
                            ) : (
                              <div className="flex items-center justify-center space-x-2">
                                <Power className="w-4 h-4" />
                                <span>Engage Connector</span>
                              </div>
                            )}
                          </button>
                        </div>
                      )}

                      {/* Connector Status Grid */}
                      {chargerData?.connectors && (
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-4">
                          {Object.entries(chargerData.connectors).map(([id, connector]) => {
                            // Check if it's connector 0
                            const isConnector0 = id === '0' || id === 0;
                            return (
                              <div 
                                key={id} 
                                className={`bg-gray-50 rounded-lg p-3 flex items-center justify-between 
                                  ${isConnector0 ? 'opacity-60 cursor-not-allowed' : ''}`}
                              >
                                <span className={`font-medium ${isConnector0 ? 'text-gray-400' : 'text-gray-700'}`}>
                                  Connector {id}
                                </span>
                                <StatusBadge 
                                  status={connector.status} 
                                  size="sm" 
                                  isConnector0={isConnector0}
                                />
                              </div>
                            );
                          })}
                        </div>
                      )}
                    </div>
                  )}
                </div>

                {/* Quick Actions */}
                <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                  <h2 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h2>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <button
                      onClick={handleRefreshCharger}
                      disabled={!isOnline || isResetting}
                      className="flex items-center justify-center space-x-2 px-4 py-2.5 bg-blue-50 text-blue-700 rounded-lg hover:bg-blue-100 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      <RefreshCw className={`w-4 h-4 ${isResetting ? 'animate-spin' : ''}`} />
                      <span>{isResetting ? 'Refreshing...' : 'Refresh Charger'}</span>
                    </button>
                    <button
                      onClick={handleClearCache}
                      disabled={!isOnline || isClearingCache}
                      className="flex items-center justify-center space-x-2 px-4 py-2.5 bg-yellow-50 text-yellow-700 rounded-lg hover:bg-yellow-100 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      <Trash2 className="w-4 h-4" />
                      <span>{isClearingCache ? 'Clearing...' : 'Clear Cache'}</span>
                    </button>
                  </div>
                </div>
              </div>

              {/* Right Column */}
              <div className="space-y-6">
                {/* Parameters Section */}
                <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                  <button
                    onClick={() => toggleSection('parameters')}
                    className="w-full px-6 py-4 flex items-center justify-between hover:bg-gray-50 transition-colors"
                  >
                    <div className="flex items-center space-x-3">
                      <Settings className="w-5 h-5 text-purple-600" />
                      <h2 className="text-lg font-semibold text-gray-900">Parameters</h2>
                      {isLoadingParameters && (
                        <RefreshCw className="w-4 h-4 animate-spin text-gray-400" />
                      )}
                    </div>
                    <div className="flex items-center space-x-2">
                      <span className="text-sm text-gray-500">{parameters.length} parameters</span>
                      {expandedSections.parameters ? 
                        <ChevronDown className="w-5 h-5 text-gray-400" /> : 
                        <ChevronRight className="w-5 h-5 text-gray-400" />
                      }
                    </div>
                  </button>

                  {expandedSections.parameters && (
                    <div className="px-6 pb-6 space-y-4">
                      {!isOnline && overlay("Charger is offline")}
                      
                      {/* View Parameter */}
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1.5">
                          View Parameter
                        </label>
                        <select
                          value={selectedViewParameter}
                          onChange={(e) => {
                            setSelectedViewParameter(e.target.value);
                            if (parameters && Array.isArray(parameters)) {
                              setViewedParameter(parameters.find(p => p.key === e.target.value));
                            } else {
                              setViewedParameter(null);
                            }
                          }}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        >
                          <option value="">Select a parameter</option>
                          {parameters && Array.isArray(parameters) && parameters.map(p => (
                            <option key={p.key} value={p.key}>{p.key}</option>
                          ))}
                        </select>
                      </div>

                      {viewedParameter && (
                        <div className="bg-purple-50 rounded-lg p-4 border border-purple-100">
                          <div className="space-y-2">
                            <div className="flex items-start justify-between">
                              <span className="text-sm font-medium text-gray-700">Key</span>
                              <span className="text-sm text-gray-900">{viewedParameter.key}</span>
                            </div>
                            <div className="flex items-start justify-between">
                              <span className="text-sm font-medium text-gray-700">Editable</span>
                              <span className={`text-sm font-medium ${viewedParameter.readonly ? 'text-red-600' : 'text-green-600'}`}>
                                {viewedParameter.readonly ? 'No' : 'Yes'}
                              </span>
                            </div>
                            <div className="flex items-start justify-between">
                              <span className="text-sm font-medium text-gray-700">Value</span>
                              <span className="text-sm text-gray-900 break-all max-w-[60%] text-right">
                                {viewedParameter.value}
                              </span>
                            </div>
                          </div>
                        </div>
                      )}

                      <button
                        onClick={fetchChargerParameters}
                        className="w-full py-2.5 rounded-lg bg-gray-100 text-gray-700 hover:bg-gray-200 transition-colors font-medium"
                      >
                        Refresh Parameters
                      </button>

                      {/* Change Parameter */}
                      <div className="pt-4 border-t border-gray-200">
                        <h3 className="text-md font-medium text-gray-800 mb-3">Change Parameter</h3>
                        <div className="space-y-3">
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1.5">
                              Parameter
                            </label>
                            <select
                              value={selectedChangeParameter}
                              onChange={handleSelectChangeParameter}
                              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            >
                              <option value="">Select editable parameter</option>
                              {parameters && Array.isArray(parameters) && parameters
                                .filter(p => !p.readonly)
                                .map(p => <option key={p.key} value={p.key}>{p.key}</option>)
                              }
                            </select>
                          </div>

                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1.5">
                              Current Value
                            </label>
                            <input
                              value={currentValue}
                              disabled
                              className="w-full px-3 py-2 bg-gray-50 border border-gray-300 rounded-lg cursor-not-allowed"
                            />
                          </div>

                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1.5">
                              New Value
                            </label>
                            <input
                              value={newValue}
                              onChange={(e) => setNewValue(e.target.value)}
                              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                              placeholder="Enter new value"
                            />
                          </div>

                          <button
                            onClick={handleParameterChange}
                            disabled={!newValue || !selectedChangeParameter || !isOnline}
                            className="w-full py-2.5 rounded-lg bg-blue-600 text-white hover:bg-blue-700 transition-colors font-medium disabled:opacity-50 disabled:cursor-not-allowed"
                          >
                            Update Parameter
                          </button>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Footer */}
            <div className="mt-8 pt-6 border-t border-gray-200">
              <div className="flex flex-col sm:flex-row items-center justify-between text-sm text-gray-500">
                <div className="flex items-center space-x-4">
                  <span>OCPP Compliant</span>
                  <span className="w-px h-4 bg-gray-300" />
                  <span>v1.6 / v2.0.1</span>
                </div>
                <div className="flex items-center space-x-2">
                  <span>Last updated:</span>
                  <span>{new Date().toLocaleString()}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChargerSettings;