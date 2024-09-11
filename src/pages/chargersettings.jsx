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
  const [isSubmitting, setIsSubmitting] = useState(false); // For "Engage/Disengage" button loading state
  const [isConnectorLoading, setIsConnectorLoading] = useState(false); // Loading state for the connector selection

  const fetchChargerStatus = async () => {
    const rooturi = import.meta.env.VITE_BK_ROOT_URI;
    const apikey = import.meta.env.VITE_BK_API_KEY;
    setLoading(true);
    setIsLoadingConnectors(true);
    setIsConnectorLoading(true); // Add this line to trigger loading state initially
    try {
      const response = await fetch(`${rooturi}/api/status`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-api-key': apikey,
        },
        body: JSON.stringify({ uid }),
      });

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
      setIsConnectorLoading(false); // Stop connector loading after status is fetched
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
    setIsConnectorLoading(true); // Show loading state
    
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
      setIsConnectorLoading(false); // Stop loading state
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

  useEffect(() => {
    setIsConnectorLoading(true); // Trigger loading state on component mount
    fetchChargerStatus();
    fetchChargerParameters();
    const interval = setInterval(fetchChargerStatus, 30000);
    return () => clearInterval(interval);
  }, [uid]);

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">Settings for Charger with ID {uid}</h1>

      <div className="flex items-center mb-4">
        <button
          className="mr-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          onClick={fetchChargerStatus}
        >
          Refresh Status
        </button>
        <p><strong>Status:</strong> {loading ? 'Loading...' : status}</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Engage/Disengage Connector Box */}
        <div className={`relative border border-gray-300 rounded-md p-4 ${!isOnline ? 'opacity-50' : ''}`}>
          <h2 className="text-xl font-semibold mb-4">Engage/Disengage Connectors</h2>

          {/* Full translucent overlay for connectors, but keep the components visible */}
          {isLoadingConnectors && (
            <div className="absolute inset-0 bg-gray-200 bg-opacity-50 flex items-center justify-center text-lg font-semibold text-gray-500 w-full h-full rounded-md z-10">
              Refreshing status...
            </div>
          )}

          {!isOnline && (
            <div className="absolute inset-0 bg-gray-200 bg-opacity-50 flex items-center justify-center text-lg font-semibold text-gray-500 w-full h-full rounded-md z-10">
              Charger is offline
            </div>
          )}

          {/* Form components remain visible but disabled */}
          <div className="relative z-0">
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">Select Connector ID</label>
              <select
                value={selectedConnector}
                onChange={handleConnectorChange}
                className="mt-1 block w-full rounded-md border-gray-200 shadow-sm"
                disabled={!isOnline || isLoadingConnectors} // Disable dropdown during loading
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
                disabled={!isOnline || isSubmitting || isConnectorLoading || isLoadingConnectors} // Disable button during loading
              >
                {isConnectorLoading || isSubmitting ? 'Loading...' : connectorStatus === 'Available' ? 'Disengage' : 'Engage'}
              </button>
            )}
          </div>
        </div>

        <div className={`relative border border-gray-300 rounded-md p-4 ${!isOnline ? 'opacity-50' : ''}`}>
          <h2 className="text-xl font-semibold mb-4">View Charger Parameters</h2>

          {isLoadingParameters && (
            <div className="absolute inset-0 bg-gray-200 bg-opacity-50 flex items-center justify-center text-lg font-semibold text-gray-500 w-full h-full rounded-md">
              Loading...
            </div>
          )}

          {!isOnline && (
            <div className="absolute inset-0 bg-gray-200 bg-opacity-50 flex items-center justify-center text-lg font-semibold text-gray-500 w-full h-full rounded-md">
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

        <div className={`relative border border-gray-300 rounded-md p-4 ${!isOnline ? 'opacity-50' : ''}`}>
          <h2 className="text-xl font-semibold mb-4">Change Charger Parameters</h2>

          {isLoadingParameters && (
            <div className="absolute inset-0 bg-gray-200 bg-opacity-50 flex items-center justify-center text-lg font-semibold text-gray-500 w-full h-full rounded-md">
              Loading...
            </div>
          )}

          {!isOnline && (
            <div className="absolute inset-0 bg-gray-200 bg-opacity-50 flex items-center justify-center text-lg font-semibold text-gray-500 w-full h-full rounded-md">
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

export default ChargerSettings;
