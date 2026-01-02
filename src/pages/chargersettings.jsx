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
//       const data = JSON.parse(event.data);
//       if (data.status === 'Online') {
//         setIsOnline(true);
//         setStatus('Online');
//         fetchChargerParameters(); // Load dropdown data when online
//         fetchChargerStatus();
//       } else if (data.status === 'Offline') {
//         setIsOnline(false);
//         setStatus('Offline');
//       }
//     };

//     ws.onclose = () => {
//       console.log(`WebSocket connection closed for charger ${uid}`);
//       // setIsOnline(false); // Assume offline on disconnect
//       // setStatus('Offline');
//     };

//     ws.onerror = (error) => {
//       console.error('WebSocket error:', error);
//       // setIsOnline(false);
//       // setStatus('Offline');
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
//     const apikey = import.meta.env.VITE_BK_ROOT_API_KEY
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
//         setStatus(data.status);
//         setIsOnline(data.status !== 'Offline');
//         const connectorIDs = Object.keys(data.connectors).filter(connId => connId !== '0');
//         setConnectors(connectorIDs);
//         setConnectorStatus(data.connectors[connectorIDs[0]]?.status || '');
//       } else {
//         toast.error('Failed to fetch status');
//       }
//     } catch (error) {
//       toast.error('Error fetching charger status');
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
//       if (response.ok) {
//         setParameters(data.configuration_key);
//       } else {
//         toast.error('Failed to fetch charger parameters');
//       }
//     } catch (error) {
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
//     } finally {
//       setIsConnectorLoading(false);
//     }
//   };

//   const handleSelectChangeParameter = (e) => {
//     const paramKey = e.target.value;
//     setSelectedChangeParameter(paramKey);
//     const param = parameters.find(p => p.key === paramKey);
//     setCurrentValue(param ? param.value : '');
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

//         const updatedParam = parameters.find(p => p.key === selectedViewParameter);
//         if (updatedParam) {
//           updatedParam.value = newValue;
//           setViewedParameter(updatedParam);
//         }
//       } else {
//         toast.error('Failed to update parameter');
//       }
//     } catch (error) {
//       toast.error('Error updating parameter');
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
//         await fetchChargerStatus(); // Refresh status after the operation
//       } else {
//         toast.error('Operation failed');
//       }
//     } catch (error) {
//       toast.error('Error performing the operation');
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

//   const [ipAddress, setIpAddress] = useState('');
//   //ip tracking facility
//   useEffect(() => {
//     // Fetch the IP address from the API
//     const fetchIpAddress = async () => {
//       const rooturi = import.meta.env.VITE_ROOT_URI;
//       const apikey = import.meta.env.VITE_API_KEY;
//         try {
//             const response = await fetch("https://api.ipify.org?format=json");
//             const data = await response.json();
//             console.log(data)
//             // Set the IP address in state
//             if(data){
//               setIpAddress(data.ip);
//               const currentDateTime = new Date().toISOString();
//               const pathfinder = "chargersettings.jsx"
//               const resp = await fetch(`${rooturi}/admin/getip`,{
//                   method: 'POST',
//               headers: {
//                   'Content-Type': 'application/json',
//                   'apiauthkey': apikey,
//               },
//               body: JSON.stringify({ip:data.ip,datetime:currentDateTime,path:pathfinder})
//               })
//             }


//         } catch (error) {
//             console.error("Error fetching IP address:", error);
//         }
//     };

//     fetchIpAddress();
// }, []); // Empty dependency array means this runs once after the initial render

//   return (
//     <div className="container mx-auto p-6">
//       <h1 className="text-2xl font-bold mb-4">Settings for Charger with ID {uid}</h1>

//       <div className="flex items-center justify-between mb-4">
//         <div className="flex items-center">
//           <div className="relative">
//             <button
//               className="mr-4 px-4 py-2 bg-yellow-500 text-white rounded hover:bg-yellow-600"
//               onClick={handleClearCache}
//               disabled={!isOnline || isClearingCache}
//             >
//               {isClearingCache ? 'Clearing Cache...' : 'Clear Cache'}
//             </button>
//             {!isOnline && (
//               <div className="absolute inset-0 bg-gray-200 bg-opacity-50 w-full h-full rounded-md z-10"></div>
//             )}
//           </div>
//           <div className="relative">
//             <button
//               className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
//               onClick={handleRefreshCharger}
//               disabled={!isOnline || isResetting}
//             >
//               {isResetting ? 'Refreshing...' : 'Refresh Charger'}
//             </button>
//             {!isOnline && (
//               <div className="absolute inset-0 bg-gray-200 bg-opacity-50 w-full h-full rounded-md z-10"></div>
//             )}
//           </div>

//           {/* New button to manually refresh online/offline status */}
//           <button
//             className="ml-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
//             onClick={fetchChargerStatus}
//             disabled={!isOnline || loading}
//           >
//             {loading ? 'Refreshing...' : 'Refresh Status'}
//           </button>
//         </div>

//         <p className="text-right font-semibold text-gray-600">
//           Status: {loading ? 'Loading...' : status}
//         </p>
//       </div>

//       <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
//         {/* Engage/Disengage Connector Box */}
//         <div className={`relative border border-gray-300 rounded-md p-4 ${!isOnline ? 'opacity-50' : ''}`}>
//           <h2 className="text-xl font-semibold mb-4">Engage/Disengage Connectors</h2>

//           {isLoadingConnectors && (
//             <div className="absolute inset-0 bg-gray-200 bg-opacity-50 w-full h-full rounded-md z-10 flex items-center justify-center text-center text-lg font-semibold text-gray-500">
//               Loading...
//             </div>
//           )}

//           {!isOnline && (
//             <div className="absolute inset-0 bg-gray-200 bg-opacity-50 w-full h-full rounded-md z-10 flex items-center justify-center text-center text-lg font-semibold text-gray-500">
//               Charger is offline
//             </div>
//           )}

//           <div className="relative z-0">
//             <div className="mb-4">
//               <label className="block text-sm font-medium text-gray-700">Select Connector ID</label>
//               <select
//                 value={selectedConnector}
//                 onChange={handleConnectorChange}
//                 className="mt-1 block w-full rounded-md border-gray-200 shadow-sm"
//                 disabled={!isOnline || isLoadingConnectors}
//               >
//                 <option value="">Select a connector</option>
//                 {connectors.map((connId) => (
//                   <option key={connId} value={connId}>Connector {connId}</option>
//                 ))}
//               </select>
//             </div>

//             {selectedConnector && (
//               <button
//                 className={`px-4 py-2 text-white rounded ${connectorStatus === 'Available' ? 'bg-red-500 hover:bg-red-600' : 'bg-green-500 hover:bg-green-600'}`}
//                 onClick={handleSubmit}
//                 disabled={!isOnline || isSubmitting || isConnectorLoading || isLoadingConnectors}
//               >
//                 {isConnectorLoading || isSubmitting ? 'Loading...' : connectorStatus === 'Available' ? 'Disengage' : 'Engage'}
//               </button>
//             )}
//           </div>
//         </div>

//         {/* View Charger Parameters Box */}
//         <div className={`relative border border-gray-300 rounded-md p-4 ${!isOnline ? 'opacity-50' : ''}`}>
//           <h2 className="text-xl font-semibold mb-4">View Charger Parameters</h2>

//           {isLoadingParameters && (
//             <div className="absolute inset-0 bg-gray-200 bg-opacity-50 w-full h-full rounded-md z-10 flex items-center justify-center text-center text-lg font-semibold text-gray-500">
//               Loading...
//             </div>
//           )}

//           {!isOnline && (
//             <div className="absolute inset-0 bg-gray-200 bg-opacity-50 w-full h-full rounded-md z-10 flex items-center justify-center text-center text-lg font-semibold text-gray-500">
//               Charger is offline
//             </div>
//           )}

//           <div className="mb-4">
//             <label className="block text-sm font-medium text-gray-700">Select Parameter</label>
//             <select
//               value={selectedViewParameter}
//               onChange={(e) => {
//                 setSelectedViewParameter(e.target.value);
//                 const param = parameters.find(p => p.key === e.target.value);
//                 setViewedParameter(param);
//               }}
//               className="mt-1 block w-full rounded-md border-gray-200 shadow-sm"
//               disabled={!isOnline}
//             >
//               <option value="">Select a parameter</option>
//               {parameters.map((param) => (
//                 <option key={param.key} value={param.key}>{param.key}</option>
//               ))}
//             </select>

//             {/* Refresh Button beside dropdown */}
//             <button
//               className="mt-2 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
//               onClick={fetchChargerParameters}
//               disabled={!isOnline || isLoadingParameters}
//             >
//               {isLoadingParameters ? 'Refreshing...' : 'Refresh Parameters'}
//             </button>
//           </div>

//           {viewedParameter && (
//             <div className="mt-4 max-h-32 overflow-y-auto break-words overflow-wrap overflow-hidden">
//               <p><strong>Parameter:</strong> {viewedParameter.key}</p>
//               <p><strong>Can be modified:</strong> {viewedParameter.readonly ? 'No' : 'Yes'}</p>
//               <p><strong>Value:</strong> {viewedParameter.value}</p>
//             </div>
//           )}
//         </div>

//         {/* Change Charger Parameters Box */}
//         <div className={`relative border border-gray-300 rounded-md p-4 ${!isOnline ? 'opacity-50' : ''}`}>
//           <h2 className="text-xl font-semibold mb-4">Change Charger Parameters</h2>

//           {isLoadingParameters && (
//             <div className="absolute inset-0 bg-gray-200 bg-opacity-50 w-full h-full rounded-md z-10 flex items-center justify-center text-center text-lg font-semibold text-gray-500">
//               Loading...
//             </div>
//           )}

//           {!isOnline && (
//             <div className="absolute inset-0 bg-gray-200 bg-opacity-50 w-full h-full rounded-md z-10 flex items-center justify-center text-center text-lg font-semibold text-gray-500">
//               Charger is offline
//             </div>
//           )}

//           <div className="mb-4">
//             <label className="block text-sm font-medium text-gray-700">Select Parameter</label>
//             <select
//               value={selectedChangeParameter}
//               onChange={handleSelectChangeParameter}
//               className="mt-1 block w-full rounded-md border-gray-200 shadow-sm"
//               disabled={!isOnline}
//             >
//               <option value="">Select a parameter</option>
//               {parameters.filter(param => !param.readonly).map((param) => (
//                 <option key={param.key} value={param.key}>{param.key}</option>
//               ))}
//             </select>

//             {/* Refresh Button beside dropdown */}
//             <button
//               className="mt-2 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
//               onClick={fetchChargerParameters}
//               disabled={!isOnline || isLoadingParameters}
//             >
//               {isLoadingParameters ? 'Refreshing...' : 'Refresh Parameters'}
//             </button>
//           </div>

//           <div className="mb-4">
//             <label className="block text-sm font-medium text-gray-700">Current Value</label>
//             <input
//               type="text"
//               value={currentValue}
//               className="mt-1 block w-full rounded-md border-gray-200 shadow-sm"
//               disabled
//             />
//           </div>

//           <div className="mb-4">
//             <label className="block text-sm font-medium text-gray-700">New Value</label>
//             <input
//               type="text"
//               value={newValue}
//               onChange={(e) => setNewValue(e.target.value)}
//               className="mt-1 block w-full rounded-md border-gray-200 shadow-sm"
//               disabled={!isOnline}
//             />
//           </div>

//           <button
//             className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
//             onClick={handleParameterChange}
//             disabled={!isOnline || !selectedChangeParameter || !newValue}
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
import { useParams } from 'react-router-dom';
import { toast } from 'react-toastify';

const ChargerSettings = () => {
  const { uid } = useParams();
  const [status, setStatus] = useState('');
  const [connectorStatus, setConnectorStatus] = useState('');
  const [connectors, setConnectors] = useState([]);
  const [selectedConnector, setSelectedConnector] = useState('');
  const [loading, setLoading] = useState(false);
  const [isOnline, setIsOnline] = useState(true); // Use WebSocket to set this
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


  // Fetch charger inactivity status every minute but not immediately after loading
  useEffect(() => {
    const checkChargerInactivity = async () => {
      const rooturi = import.meta.env.VITE_BK_ROOT_URI;
      const apikey = import.meta.env.VITE_BK_ROOT_API_KEY;
      try {
        await fetch(`${rooturi}/api/check_charger_inactivity`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'x-api-key': apikey,
          },
          body: JSON.stringify({ uid }),
        });
      } catch (error) {
        console.error('Error checking charger inactivity:', error);
      }
    };

    const intervalId = setInterval(() => {
      checkChargerInactivity();
    }, 60000);

    return () => {
      clearInterval(intervalId);
    };
  }, [uid]);

  useEffect(() => {
    // WebSocket connection to monitor charger online/offline status
    const rooturi = import.meta.env.VITE_BK_ROOT_URI;
    const fewsuri = import.meta.env.VITE_FE_WS_URI;
    const ws = new WebSocket(`${fewsuri}/frontend/ws/${uid}`);

    ws.onopen = () => {
      console.log(`WebSocket connected to ${fewsuri}/frontend/ws/${uid}`);
    };

    ws.onmessage = (event) => {
      const data = JSON.parse(event.data);
      if (data.status === 'Online') {
        setIsOnline(true);
        setStatus('Online');
        fetchChargerParameters(); // Load dropdown data when online
        fetchChargerStatus();
      } else if (data.status === 'Offline') {
        setIsOnline(false);
        setStatus('Offline');
      }
    };

    ws.onclose = () => {
      console.log(`WebSocket connection closed for charger ${uid}`);
      // setIsOnline(false); // Assume offline on disconnect
      // setStatus('Offline');
    };

    ws.onerror = (error) => {
      console.error('WebSocket error:', error);
      // setIsOnline(false);
      // setStatus('Offline');
    };

    // Fetch charger status immediately when the component loads
    fetchChargerStatus();
    fetchChargerParameters();

    // Set an interval to fetch charger status every 1 minute
    const intervalId = setInterval(() => {
      fetchChargerStatus();
    }, 60000); // 60000 milliseconds = 1 minute

    // Cleanup on unmount (close WebSocket and clear interval)
    return () => {
      ws.close();
      clearInterval(intervalId);
    };
  }, [uid]);

  const fetchChargerStatus = async () => {
    const rooturi = import.meta.env.VITE_BK_ROOT_URI;
    const apikey = import.meta.env.VITE_BK_ROOT_API_KEY
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
        setChargerData(data);
        setStatus(data.status); // Inactive / Active
        setIsOnline(data.online === 'Online');

        const connectorIDs = Object.keys(data.connectors).filter(connId => connId !== '0');
        setConnectors(connectorIDs);
        setConnectorStatus(data.connectors[connectorIDs[0]]?.status || '');
      } else {
        toast.error('Failed to fetch status');
      }
    } catch (error) {
      toast.error('Error fetching charger status');
    } finally {
      setLoading(false);
      setIsLoadingConnectors(false);
      setIsConnectorLoading(false);
    }
  };

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
      if (response.ok) {
        setParameters(data.configuration_key);
      } else {
        toast.error('Failed to fetch charger parameters');
      }
    } catch (error) {
      toast.error('Error fetching charger parameters');
    } finally {
      setIsLoadingParameters(false);
    }
  };

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
    } finally {
      setIsConnectorLoading(false);
    }
  };

  const handleSelectChangeParameter = (e) => {
    const paramKey = e.target.value;
    setSelectedChangeParameter(paramKey);
    const param = parameters.find(p => p.key === paramKey);
    setCurrentValue(param ? param.value : '');
  };

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

        const updatedParam = parameters.find(p => p.key === selectedViewParameter);
        if (updatedParam) {
          updatedParam.value = newValue;
          setViewedParameter(updatedParam);
        }
      } else {
        toast.error('Failed to update parameter');
      }
    } catch (error) {
      toast.error('Error updating parameter');
    }
  };

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
        await fetchChargerStatus(); // Refresh status after the operation
      } else {
        toast.error('Operation failed');
      }
    } catch (error) {
      toast.error('Error performing the operation');
    } finally {
      setIsSubmitting(false);
    }
  };

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
        fetchChargerStatus(); // Refresh status after refresh
      } else {
        toast.error(`Failed to refresh charger: ${data.detail}`);
      }
    } catch (error) {
      toast.error('Error refreshing charger');
    } finally {
      setIsResetting(false);
    }
  };

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
    } finally {
      setIsClearingCache(false);
    }
  };

  useEffect(() => {
    // Load status and parameters when component loads or focus changes
    fetchChargerStatus();
    fetchChargerParameters();

    const handleFocus = () => {
      fetchChargerStatus();
      fetchChargerParameters();
    };

    window.addEventListener('focus', handleFocus);
    return () => {
      window.removeEventListener('focus', handleFocus);
    };
  }, [uid]);

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
        if (data) {
          setIpAddress(data.ip);
          const currentDateTime = new Date().toISOString();
          const pathfinder = "chargersettings.jsx"
          const resp = await fetch(`${rooturi}/admin/getip`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'apiauthkey': apikey,
            },
            body: JSON.stringify({ ip: data.ip, datetime: currentDateTime, path: pathfinder })
          })
        }


      } catch (error) {
        console.error("Error fetching IP address:", error);
      }
    };

    fetchIpAddress();
  }, []); // Empty dependency array means this runs once after the initial render

  /* Overlay helper */
  const overlay = (text) => (
    <div className="absolute inset-0 bg-white/70 backdrop-blur-sm
                    flex items-center justify-center rounded-xl z-10
                    text-gray-600 font-semibold">
      {text}
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-50 to-indigo-50 p-6">

      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
        <div>
          <h1 className="text-4xl font-bold text-indigo-800">Charger Settings</h1>
          <p className="text-gray-600 mt-1">
            Charger ID: <span className="font-semibold">{uid}</span>
          </p>
        </div>

        <span
          className={`mt-3 md:mt-0 px-4 py-1 rounded-full text-sm font-semibold flex items-center gap-2
  ${isOnline ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}
        >
          {loading
            ? '⏳ Checking status...'
            : isOnline
              ? '🟢 Online'
              : '🔴 Offline'}
        </span>
      </div>

      {/* Charger Live Status */}
      {chargerData && (
        <div className="bg-white rounded-xl shadow-lg p-5 mb-6 border-t-4 border-indigo-500">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">Charger Live Status</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-gray-700">
            <p><b>Charger ID:</b> {chargerData.charger_id}</p>
            <p><b>Charger Status:</b> <span className="font-semibold">{chargerData.status}</span></p>
            <p>
              <b>Connectivity:</b>{" "}
              <span className={`font-semibold ${isOnline ? "text-green-600" : "text-red-600"}`}>
                {isOnline ? 'Online' : 'Offline'}
              </span>
            </p>
            <p><b>Last Message:</b> {new Date(chargerData.latest_message_received_time).toLocaleString()}</p>
          </div>
        </div>
      )}

      {/* Action Buttons */}
      <div className="bg-white rounded-xl shadow-lg p-5 mb-6 flex flex-wrap gap-4">
        <button
          onClick={handleClearCache}
          disabled={!isOnline || isClearingCache}
          className="px-5 py-2 rounded-lg bg-yellow-500 text-white font-medium hover:bg-yellow-600 disabled:opacity-50"
        >
          {isClearingCache ? 'Clearing Cache...' : 'Clear Cache'}
        </button>

        <button
          onClick={handleRefreshCharger}
          disabled={!isOnline || isResetting}
          className="px-5 py-2 rounded-lg bg-green-600 text-white font-medium hover:bg-green-700 disabled:opacity-50"
        >
          {isResetting ? 'Refreshing...' : 'Refresh Charger'}
        </button>

        <button
          onClick={fetchChargerStatus}
          disabled={loading}
          className="px-5 py-2 rounded-lg bg-blue-600 text-white font-medium hover:bg-blue-700 disabled:opacity-50"
        >
          {loading ? 'Refreshing...' : 'Refresh Status'}
        </button>
      </div>

      {/* Main Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

        {/* Engage / Disengage Connector */}
        <div className="relative bg-white rounded-xl shadow-lg p-5 border-t-4 border-yellow-400">
          <h2 className="text-lg font-semibold text-gray-800 mb-4">Engage / Disengage Connector</h2>
          {!isOnline && overlay("Charger is offline")}
          {isLoadingConnectors && overlay("Loading connectors...")}

          <label className="block text-sm font-medium text-gray-600">Connector ID</label>
          <select
            value={selectedConnector}
            onChange={handleConnectorChange}
            disabled={!isOnline}
            className="mt-1 w-full rounded-lg border-gray-300 focus:ring-yellow-400 focus:border-yellow-400"
          >
            <option value="">Select Connector</option>
            {connectors.map(id => <option key={id} value={id}>Connector {id}</option>)}
          </select>

          {selectedConnector && (
            <button
              onClick={handleSubmit}
              disabled={isSubmitting || isConnectorLoading}
              className={`mt-4 w-full py-2 rounded-lg font-semibold text-white
              ${connectorStatus === 'Available' ? 'bg-red-600 hover:bg-red-700' : 'bg-green-600 hover:bg-green-700'}`}
            >
              {isSubmitting || isConnectorLoading
                ? 'Processing...'
                : connectorStatus === 'Available' ? 'Disengage' : 'Engage'}
            </button>
          )}
        </div>

        {/* Connector Status */}
        {chargerData && (
          <div className="bg-white rounded-xl shadow-lg p-5 mb-6 border-t-4 border-green-400">
            <h2 className="text-lg font-semibold text-gray-800 mb-4">Connector Status</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {Object.entries(chargerData.connectors).map(([id, connector]) => (
                <div key={id} className="border rounded-lg p-3 flex justify-between items-center">
                  <span className="font-medium">Connector {id}</span>
                  <span className={`font-semibold ${connector.status === "Available" ? "text-green-600" : "text-red-600"}`}>
                    {connector.status}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* View Parameters */}
        <div className="relative bg-white rounded-xl shadow-lg p-5 border-t-4 border-pink-400">
          <h2 className="text-lg font-semibold text-gray-800 mb-4">View Charger Parameters</h2>
          {!isOnline && overlay("Charger is offline")}
          {isLoadingParameters && overlay("Loading parameters...")}

          <label className="block text-sm font-medium text-gray-600">Parameter</label>
          <select
            value={selectedViewParameter}
            onChange={(e) => {
              setSelectedViewParameter(e.target.value);
              setViewedParameter(parameters.find(p => p.key === e.target.value));
            }}
            className="mt-1 w-full rounded-lg border-gray-300"
          >
            <option value="">Select Parameter</option>
            {parameters.map(p => <option key={p.key} value={p.key}>{p.key}</option>)}
          </select>

          <button
            onClick={fetchChargerParameters}
            className="mt-3 px-4 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700"
          >
            Refresh Parameters
          </button>

          {viewedParameter && (
            <div className="mt-4 bg-pink-50 rounded-lg p-3 text-sm space-y-1">
              <p><b>Key:</b> {viewedParameter.key}</p>
              <p><b>Editable:</b> {viewedParameter.readonly ? 'No' : 'Yes'}</p>
              <p className="break-all"><b>Value:</b> {viewedParameter.value}</p>
            </div>
          )}
        </div>

        {/* Change Parameters */}
        <div className="relative bg-white rounded-xl shadow-lg p-5 border-t-4 border-indigo-400">
          <h2 className="text-lg font-semibold text-gray-800 mb-4">Change Charger Parameter</h2>
          {!isOnline && overlay("Charger is offline")}

          <label className="block text-sm font-medium text-gray-600">Parameter</label>
          <select
            value={selectedChangeParameter}
            onChange={handleSelectChangeParameter}
            className="mt-1 w-full rounded-lg border-gray-300"
          >
            <option value="">Select Parameter</option>
            {parameters.filter(p => !p.readonly).map(p => <option key={p.key} value={p.key}>{p.key}</option>)}
          </select>

          <div className="mt-3">
            <label className="text-sm font-medium text-gray-600">Current Value</label>
            <input value={currentValue} disabled className="mt-1 w-full rounded-lg bg-gray-100 border-gray-300" />
          </div>

          <div className="mt-3">
            <label className="text-sm font-medium text-gray-600">New Value</label>
            <input value={newValue} onChange={(e) => setNewValue(e.target.value)} className="mt-1 w-full rounded-lg border-gray-300" />
          </div>

          <button
            onClick={handleParameterChange}
            disabled={!newValue || !selectedChangeParameter}
            className="mt-4 w-full py-2 rounded-lg bg-green-600 text-white hover:bg-green-700 disabled:opacity-50"
          >
            Change Parameter
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChargerSettings;