import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const AddCharger = () => {
  const [Chargerserialnum, setChargerserialnum] = useState('');
  const [ChargerName, setChargerName] = useState('');
  const [Chargerhost, setChargerhost] = useState('');
  const [Segment, setSegment] = useState('');
  const [Subsegment, setSubsegment] = useState('');
  const [Total_Capacity, setTotal_Capacity] = useState('');
  const [Chargertype, setChargertype] = useState('');
  const [parking, setParking] = useState('');
  const [number_of_connectors, setNumber_of_connectors] = useState('');
  const [Connector_type, setConnector_type] = useState('');
  const [connector_total_capacity, setConnector_total_capacity] = useState('');
  const [lattitude, setLattitude] = useState('');
  const [longitute, setLongitute] = useState('');
  const [full_address, setFull_address] = useState('');
  const [charger_use_type, setCharger_use_type] = useState('');
  const [twenty_four_seven_open_status, setTwenty_four_seven_open_status] = useState('');
  const [charger_image, setCharger_image] = useState(null);
  const [chargerbuyer, setChargerbuyer] = useState('');
  const [loading, setLoading] = useState(false);
  const [ocppurl, setOcppurl] = useState('');
  const [chargeridentity, setChargerIdentity] = useState('');
  const navigate = useNavigate();


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

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const apikey = import.meta.env.VITE_API_KEY;
      const rooturi = import.meta.env.VITE_ROOT_URI;

      let imageBase64 = '';
      if (charger_image) {
        const reader = new FileReader();
        reader.readAsDataURL(charger_image);
        reader.onloadend = async () => {
          imageBase64 = reader.result.split(',')[1]; // Extract base64 string

          // Send the data with the base64 string
          const response = await fetch(`${rooturi}/admin/createchargerunit`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'apiauthkey': apikey,
            },
            body: JSON.stringify({
              Chargerserialnum,
              ChargerName,
              Chargerhost,
              Segment,
              Subsegment,
              Total_Capacity,
              Chargertype,
              parking,
              number_of_connectors,
              Connector_type,
              connector_total_capacity,
              lattitude,
              longitute,
              full_address,
              charger_use_type,
              twenty_four_seven_open_status,
              charger_image: imageBase64, // Include base64 string in payload
              chargerbuyer,
              chargeridentity,
            })
          });

          const data = await response.json();
          if (response.ok) {
            setOcppurl(data.ocppurl);
            toast(data.message);
          } else {
            toast.error('Something went wrong, please try again');
            setLoading(false);
          }
        };
        reader.onerror = () => {
          toast.error('Failed to read image file');
          setLoading(false);
        };
      } else {
        // Handle case when no image is uploaded
        const response = await fetch(`${rooturi}/admin/createchargerunit`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'apiauthkey': apikey,
          },
          body: JSON.stringify({
            Chargerserialnum,
            ChargerName,
            Chargerhost,
            Segment,
            Subsegment,
            Total_Capacity,
            Chargertype,
            parking,
            number_of_connectors,
            Connector_type,
            connector_total_capacity,
            lattitude,
            longitute,
            full_address,
            charger_use_type,
            twenty_four_seven_open_status,
            charger_image: '', // No image
            chargerbuyer,
            chargeridentity,
          })
        });

        const data = await response.json();
        if (response.ok) {
          setOcppurl(data.ocppurl);
          toast(data.message);
        } else {
          toast.error('Something went wrong, please try again');
          setLoading(false);
        }
      }
    } catch (error) {
      console.error(error);
      toast.error('Failure occurred');
    } finally {
      setLoading(false);
    }
  };

  const handleFileUpload = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      setCharger_image(selectedFile);
    }
  };

  return (
    <section className="bg-white">
      <div className="lg:grid lg:min-h-screen lg:grid-cols-12">
        <main className="flex items-center justify-center px-8 py-8 sm:px-12 lg:col-span-7 lg:px-16 lg:py-12 xl:col-span-6">
          <div className="max-w-xl lg:max-w-3xl">
            <a className="block text-blue-600" href="/">
              <span className="sr-only">Home</span>
             Home
            </a>

            <h1 className="mt-6 text-2xl font-bold text-gray-900 sm:text-3xl md:text-4xl">
              Add Charger Details
            </h1>

            <p className="mt-4 leading-relaxed text-gray-500">
              Please fill in the details below to add a new charger.
            </p>

            <form action="#" className="mt-8 grid grid-cols-6 gap-6" onSubmit={handleSubmit}>
              <div className="col-span-6">
                <label htmlFor="Chargerserialnum" className="block text-sm font-medium text-gray-700">
                  Charger Serial Number
                </label>
                <input
                  type="text"
                  id="Chargerserialnum"
                  name="Chargerserialnum"
                  value={Chargerserialnum}
                  onChange={(e) => setChargerserialnum(e.target.value)}
                  className="mt-1 w-full rounded-md border-gray-200 bg-white text-sm text-gray-700 shadow-sm"
                />
              </div>

              <div className="col-span-6">
                <label htmlFor="ChargerName" className="block text-sm font-medium text-gray-700">
                  Charger Name
                </label>
                <input
                  type="text"
                  id="ChargerName"
                  name="ChargerName"
                  value={ChargerName}
                  onChange={(e) => setChargerName(e.target.value)}
                  className="mt-1 w-full rounded-md border-gray-200 bg-white text-sm text-gray-700 shadow-sm"
                />
              </div>

              <div className="col-span-6">
                <label htmlFor="Chargerhost" className="block text-sm font-medium text-gray-700">
                  Charger Host
                </label>
                <input
                  type="text"
                  id="Chargerhost"
                  name="Chargerhost"
                  value={Chargerhost}
                  onChange={(e) => setChargerhost(e.target.value)}
                  className="mt-1 w-full rounded-md border-gray-200 bg-white text-sm text-gray-700 shadow-sm"
                />
              </div>

              <div className="col-span-6">
                <label htmlFor="Segment" className="block text-sm font-medium text-gray-700">
                  Segment
                </label>
                <input
                  type="text"
                  id="Segment"
                  name="Segment"
                  value={Segment}
                  onChange={(e) => setSegment(e.target.value)}
                  className="mt-1 w-full rounded-md border-gray-200 bg-white text-sm text-gray-700 shadow-sm"
                />
              </div>

              <div className="col-span-6">
                <label htmlFor="Subsegment" className="block text-sm font-medium text-gray-700">
                  Subsegment
                </label>
                <input
                  type="text"
                  id="Subsegment"
                  name="Subsegment"
                  value={Subsegment}
                  onChange={(e) => setSubsegment(e.target.value)}
                  className="mt-1 w-full rounded-md border-gray-200 bg-white text-sm text-gray-700 shadow-sm"
                />
              </div>

              <div className="col-span-6">
                <label htmlFor="Total_Capacity" className="block text-sm font-medium text-gray-700">
                  Total Capacity
                </label>
                <input
                  type="text"
                  id="Total_Capacity"
                  name="Total_Capacity"
                  value={Total_Capacity}
                  onChange={(e) => setTotal_Capacity(e.target.value)}
                  className="mt-1 w-full rounded-md border-gray-200 bg-white text-sm text-gray-700 shadow-sm"
                />
              </div>

                    <div className="col-span-6">
                    <label htmlFor="Chargertype" className="block text-sm font-medium text-gray-700">
                      Charger Type
                    </label>
                    <select
                      id="Chargertype"
                      name="Chargertype"
                      value={Chargertype}
                      onChange={(e) => setChargertype(e.target.value)}
                      className="mt-1 w-full rounded-md border-gray-200 bg-white text-sm text-gray-700 shadow-sm"
                    >
                      <option value="" disabled>Select Charger Type</option>
                      <option value="AC">AC</option>
                      <option value="DC">DC</option>
                      <option value="HYBRID">HYBRID</option>
                    </select>
                  </div>
              <div className="col-span-6">
                <label htmlFor="parking" className="block text-sm font-medium text-gray-700">
                  Parking
                </label>
                <input
                  type="text"
                  id="parking"
                  name="parking"
                  value={parking}
                  onChange={(e) => setParking(e.target.value)}
                  className="mt-1 w-full rounded-md border-gray-200 bg-white text-sm text-gray-700 shadow-sm"
                />
              </div>

              <div className="col-span-6">
                <label htmlFor="number_of_connectors" className="block text-sm font-medium text-gray-700">
                  Number of Connectors
                </label>
                <input
                  type="text"
                  id="number_of_connectors"
                  name="number_of_connectors"
                  value={number_of_connectors}
                  onChange={(e) => setNumber_of_connectors(e.target.value)}
                  className="mt-1 w-full rounded-md border-gray-200 bg-white text-sm text-gray-700 shadow-sm"
                />
              </div>

              <div className="col-span-6">
                <label htmlFor="Connector_type" className="block text-sm font-medium text-gray-700">
                  Connector Type
                </label>
                <input
                  type="text"
                  id="Connector_type"
                  name="Connector_type"
                  value={Connector_type}
                  onChange={(e) => setConnector_type(e.target.value)}
                  className="mt-1 w-full rounded-md border-gray-200 bg-white text-sm text-gray-700 shadow-sm"
                />
              </div>

              <div className="col-span-6">
                <label htmlFor="connector_total_capacity" className="block text-sm font-medium text-gray-700">
                  Connector Total Capacity
                </label>
                <input
                  type="text"
                  id="connector_total_capacity"
                  name="connector_total_capacity"
                  value={connector_total_capacity}
                  onChange={(e) => setConnector_total_capacity(e.target.value)}
                  className="mt-1 w-full rounded-md border-gray-200 bg-white text-sm text-gray-700 shadow-sm"
                />
              </div>

              <div className="col-span-6">
                <label htmlFor="lattitude" className="block text-sm font-medium text-gray-700">
                  Latitude
                </label>
                <input
                  type="text"
                  id="lattitude"
                  name="lattitude"
                  value={lattitude}
                  onChange={(e) => setLattitude(e.target.value)}
                  className="mt-1 w-full rounded-md border-gray-200 bg-white text-sm text-gray-700 shadow-sm"
                />
              </div>

              <div className="col-span-6">
                <label htmlFor="longitute" className="block text-sm font-medium text-gray-700">
                  Longitude
                </label>
                <input
                  type="text"
                  id="longitute"
                  name="longitute"
                  value={longitute}
                  onChange={(e) => setLongitute(e.target.value)}
                  className="mt-1 w-full rounded-md border-gray-200 bg-white text-sm text-gray-700 shadow-sm"
                />
              </div>

              <div className="col-span-6">
                <label htmlFor="full_address" className="block text-sm font-medium text-gray-700">
                  Full Address
                </label>
                <input
                  type="text"
                  id="full_address"
                  name="full_address"
                  value={full_address}
                  onChange={(e) => setFull_address(e.target.value)}
                  className="mt-1 w-full rounded-md border-gray-200 bg-white text-sm text-gray-700 shadow-sm"
                />
              </div>

              <div className="col-span-6">
                <label htmlFor="charger_use_type" className="block text-sm font-medium text-gray-700">
                  Charger Use Type
                </label>
                <input
                  type="text"
                  id="charger_use_type"
                  name="charger_use_type"
                  value={charger_use_type}
                  onChange={(e) => setCharger_use_type(e.target.value)}
                  className="mt-1 w-full rounded-md border-gray-200 bg-white text-sm text-gray-700 shadow-sm"
                />
              </div>

              <div className="col-span-6">
                <label htmlFor="twenty_four_seven_open_status" className="block text-sm font-medium text-gray-700">
                  24/7 Open Status
                </label>
                <input
                  type="text"
                  id="twenty_four_seven_open_status"
                  name="twenty_four_seven_open_status"
                  value={twenty_four_seven_open_status}
                  onChange={(e) => setTwenty_four_seven_open_status(e.target.value)}
                  className="mt-1 w-full rounded-md border-gray-200 bg-white text-sm text-gray-700 shadow-sm"
                />
              </div>

              <div className="col-span-6">
                <label htmlFor="charger_image" className="block text-sm font-medium text-gray-700">
                  Charger Image
                </label>
                <input
                  type="file"
                  id="charger_image"
                  name="charger_image"
                  onChange={handleFileUpload}
                  className="mt-1 w-full rounded-md border-gray-200 bg-white text-sm text-gray-700 shadow-sm"
                />
              </div>

              <div className="col-span-6">
                <label htmlFor="chargerbuyer" className="block text-sm font-medium text-gray-700">
                  Charger Buyer
                </label>
                <input
                  type="text"
                  id="chargerbuyer"
                  name="chargerbuyer"
                  value={chargerbuyer}
                  onChange={(e) => setChargerbuyer(e.target.value)}
                  className="mt-1 w-full rounded-md border-gray-200 bg-white text-sm text-gray-700 shadow-sm"
                />
              </div>

              <div className="col-span-6">
                <label htmlFor="chargeridentity" className="block text-sm font-medium text-gray-700">
                  Charger Identity
                </label>
                <input
                  type="text"
                  id="chargeridentity"
                  name="chargeridentity"
                  value={chargeridentity}
                  onChange={(e) => setChargerIdentity(e.target.value)}
                  className="mt-1 w-full rounded-md border-gray-200 bg-white text-sm text-gray-700 shadow-sm"
                />
              </div>

              <div className="col-span-6 sm:flex sm:items-center sm:gap-4">
              <button
                  type="submit"
                  className={`inline-block shrink-0 rounded-md border px-12 py-3 text-sm font-medium text-white transition focus:outline-none focus:ring active:text-blue-500 ${
                    loading ? 'bg-gray-400 border-gray-400' : 'bg-blue-600 border-blue-600'
                  }`}
                  disabled={loading}
                >
                  {loading ? (
                    <>
                      <svg className="animate-spin h-5 w-5 mr-3 inline" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 0115.9-4.1A8 8 0 014 12z"></path>
                      </svg>
                      Processing...
                    </>
                  ) : (
                    'Save Charger Details'
                  )}
                </button>
              </div>
            </form>

            {ocppurl && (
              <div className="mt-6">
                <h2 className="text-xl font-semibold text-gray-900">OCPP URL</h2>
                <input
                  type="text"
                  id="ocppurl"
                  name="ocppurl"
                  value={ocppurl}
                  className="mt-1 w-full rounded-md border-gray-200 bg-white text-sm text-gray-700 shadow-sm"
                  readOnly
                />
              </div>
            )}
          </div>
        </main>
      </div>
    </section>
  );
};

export default AddCharger;
