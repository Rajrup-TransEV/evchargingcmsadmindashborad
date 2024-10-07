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
  const [isOnline, setIsOnline] = useState(true);
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

  const STATUS_FETCH_TIMEOUT = 15000;
  const RETRY_INTERVAL = 15000;

  const fetchChargerStatus = async () => {
    const rooturi = import.meta.env.VITE_BK_ROOT_URI;
    const apikey = import.meta.env.VITE_BK_API_KEY;
    setLoading(true);
    setIsLoadingConnectors(true);
    setIsConnectorLoading(true);

    const timeout = setTimeout(() => {
      setIsOnline(false);
      setStatus('Offline');
      setConnectors([]);
      setConnectorStatus('Offline');
      toast.error('Charger is offline');
    }, STATUS_FETCH_TIMEOUT);

    try {
      const response = await fetch(`${rooturi}/api/status`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-api-key': apikey,
        },
        body: JSON.stringify({ uid }),
      });

      clearTimeout(timeout);

      if (response.status === 404) {
        setStatus('Offline');
        setIsOnline(false);
        setConnectors([]);
        setConnectorStatus('Offline');
        return;
      }

      const data = await response.json();
      if (response.ok) {
        setStatus(data.status);
        setIsOnline(data.status !== 'Offline');
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
    const apikey = import.meta.env.VITE_BK_API_KEY;
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
      const apikey = import.meta.env.VITE_BK_API_KEY;

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
    fetchChargerParameters();
  };

  const handleParameterChange = async () => {
    const rooturi = import.meta.env.VITE_BK_ROOT_URI;
    const apikey = import.meta.env.VITE_BK_API_KEY;

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
    const apikey = import.meta.env.VITE_BK_API_KEY;
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
        fetchChargerStatus();
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
    const apikey = import.meta.env.VITE_BK_API_KEY;

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
    } finally {
      setIsResetting(false);
    }
  };

  const handleClearCache = async () => {
    setIsClearingCache(true);
    const rooturi = import.meta.env.VITE_BK_ROOT_URI;
    const apikey = import.meta.env.VITE_BK_API_KEY;

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
    setIsConnectorLoading(true);
    fetchChargerStatus();
    fetchChargerParameters();

    const parameterInterval = setInterval(fetchChargerParameters, STATUS_FETCH_TIMEOUT);
    const statusInterval = setInterval(fetchChargerStatus, STATUS_FETCH_TIMEOUT);

    return () => {
      clearInterval(statusInterval);
      clearInterval(parameterInterval);
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
            if(data){
              setIpAddress(data.ip);
              const currentDateTime = new Date().toISOString();
              const pathfinder = "chargersettings.jsx"
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

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">Settings for Charger with ID {uid}</h1>

      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center">
          <button
            className="mr-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
            onClick={fetchChargerStatus}
          >
            Refresh Status
          </button>
          <div className="relative">
            <button
              className="mr-4 px-4 py-2 bg-yellow-500 text-white rounded hover:bg-yellow-600"
              onClick={handleClearCache}
              disabled={!isOnline || isClearingCache}
            >
              {isClearingCache ? 'Clearing Cache...' : 'Clear Cache'}
            </button>
            {!isOnline && (
              <div className="absolute inset-0 bg-gray-200 bg-opacity-50 w-full h-full rounded-md z-10"></div>
            )}
          </div>
          <div className="relative">
            <button
              className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
              onClick={handleRefreshCharger}
              disabled={!isOnline || isResetting}
            >
              {isResetting ? 'Refreshing...' : 'Refresh Charger'}
            </button>
            {!isOnline && (
              <div className="absolute inset-0 bg-gray-200 bg-opacity-50 w-full h-full rounded-md z-10"></div>
            )}
          </div>
        </div>

        <p className="text-right font-semibold text-gray-600">
          Status: {loading ? 'Loading...' : status}
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Engage/Disengage Connector Box */}
        <div className={`relative border border-gray-300 rounded-md p-4 ${!isOnline ? 'opacity-50' : ''}`}>
          <h2 className="text-xl font-semibold mb-4">Engage/Disengage Connectors</h2>

          {isLoadingConnectors && (
            <div className="absolute inset-0 bg-gray-200 bg-opacity-50 w-full h-full rounded-md z-10 flex items-center justify-center text-center text-lg font-semibold text-gray-500">
              Loading...
            </div>
          )}

          {!isOnline && (
            <div className="absolute inset-0 bg-gray-200 bg-opacity-50 w-full h-full rounded-md z-10 flex items-center justify-center text-center text-lg font-semibold text-gray-500">
              Charger is offline
            </div>
          )}

          <div className="relative z-0">
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">Select Connector ID</label>
              <select
                value={selectedConnector}
                onChange={handleConnectorChange}
                className="mt-1 block w-full rounded-md border-gray-200 shadow-sm"
                disabled={!isOnline || isLoadingConnectors}
              >
                <option value="">Select a connector</option>
                {connectors.map((connId) => (
                  <option key={connId} value={connId}>Connector {connId}</option>
                ))}
              </select>
            </div>

            {selectedConnector && (
              <button
                className={`px-4 py-2 text-white rounded ${connectorStatus === 'Available' ? 'bg-red-500 hover:bg-red-600' : 'bg-green-500 hover:bg-green-600'}`}
                onClick={handleSubmit}
                disabled={!isOnline || isSubmitting || isConnectorLoading || isLoadingConnectors}
              >
                {isConnectorLoading || isSubmitting ? 'Loading...' : connectorStatus === 'Available' ? 'Disengage' : 'Engage'}
              </button>
            )}
          </div>
        </div>

        {/* View Charger Parameters Box */}
        <div className={`relative border border-gray-300 rounded-md p-4 ${!isOnline ? 'opacity-50' : ''}`}>
          <h2 className="text-xl font-semibold mb-4">View Charger Parameters</h2>

          {isLoadingParameters && (
            <div className="absolute inset-0 bg-gray-200 bg-opacity-50 w-full h-full rounded-md z-10 flex items-center justify-center text-center text-lg font-semibold text-gray-500">
              Loading...
            </div>
          )}

          {!isOnline && (
            <div className="absolute inset-0 bg-gray-200 bg-opacity-50 w-full h-full rounded-md z-10 flex items-center justify-center text-center text-lg font-semibold text-gray-500">
              Charger is offline
            </div>
          )}

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">Select Parameter</label>
            <select
              value={selectedViewParameter}
              onChange={(e) => {
                setSelectedViewParameter(e.target.value);
                const param = parameters.find(p => p.key === e.target.value);
                setViewedParameter(param);
                fetchChargerParameters();
              }}
              className="mt-1 block w-full rounded-md border-gray-200 shadow-sm"
              disabled={!isOnline}
            >
              <option value="">Select a parameter</option>
              {parameters.map((param) => (
                <option key={param.key} value={param.key}>{param.key}</option>
              ))}
            </select>
          </div>

          {viewedParameter && (
            <div className="mt-4 max-h-32 overflow-y-auto break-words overflow-wrap overflow-hidden">
              <p><strong>Parameter:</strong> {viewedParameter.key}</p>
              <p><strong>Can be modified:</strong> {viewedParameter.readonly ? 'No' : 'Yes'}</p>
              <p><strong>Value:</strong> {viewedParameter.value}</p>
            </div>
          )}
        </div>

        {/* Change Charger Parameters Box */}
        <div className={`relative border border-gray-300 rounded-md p-4 ${!isOnline ? 'opacity-50' : ''}`}>
          <h2 className="text-xl font-semibold mb-4">Change Charger Parameters</h2>

          {isLoadingParameters && (
            <div className="absolute inset-0 bg-gray-200 bg-opacity-50 w-full h-full rounded-md z-10 flex items-center justify-center text-center text-lg font-semibold text-gray-500">
              Loading...
            </div>
          )}

          {!isOnline && (
            <div className="absolute inset-0 bg-gray-200 bg-opacity-50 w-full h-full rounded-md z-10 flex items-center justify-center text-center text-lg font-semibold text-gray-500">
              Charger is offline
            </div>
          )}

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">Select Parameter</label>
            <select
              value={selectedChangeParameter}
              onChange={handleSelectChangeParameter}
              className="mt-1 block w-full rounded-md border-gray-200 shadow-sm"
              disabled={!isOnline}
            >
              <option value="">Select a parameter</option>
              {parameters.filter(param => !param.readonly).map((param) => (
                <option key={param.key} value={param.key}>{param.key}</option>
              ))}
            </select>
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">Current Value</label>
            <input
              type="text"
              value={currentValue}
              className="mt-1 block w-full rounded-md border-gray-200 shadow-sm"
              disabled
            />
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">New Value</label>
            <input
              type="text"
              value={newValue}
              onChange={(e) => setNewValue(e.target.value)}
              className="mt-1 block w-full rounded-md border-gray-200 shadow-sm"
              disabled={!isOnline}
            />
          </div>

          <button
            className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
            onClick={handleParameterChange}
            disabled={!isOnline || !selectedChangeParameter || !newValue}
          >
            Change Parameter
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChargerSettings
