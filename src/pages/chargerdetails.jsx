import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';


const ChargerDetails = () => {
  const navigate = useNavigate();
  const { uid } = useParams();
  const [chargerData, setChargerData] = useState(null);
  const[qrCode,setQrcode]=useState(null);
  const [chargerImage,setChargerImage]=useState(null)
  const [loading, setLoading] = useState(true);
  //use ffect to directly check for if user logged in or not
  useEffect(() => {
    const checkAuthentication = async () => {
     
      // Take API key value from env
      const rooturi = import.meta.env.VITE_ROOT_URI;
      const apikey = import.meta.env.VITE_API_KEY;
      
      try {
        const gettoken = localStorage.getItem("token");
        console.log(gettoken)
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
        console.log(data)        
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
  }, [navigate]); // Dependency array includes navigate to avoid stale closure
  // Fetch single charger data
  useEffect(() => {
    const fetchsingulardata = async () => {
      const rooturi = import.meta.env.VITE_ROOT_URI;
      const apikey = import.meta.env.VITE_API_KEY;

      try {
        const response = await fetch(`${rooturi}/admin/getsinglechargerdetails`, {
          method: "POST",
          headers: {
            'Content-Type': 'application/json',
            'apiauthkey': apikey,
          },
          body: JSON.stringify({ chargeruid: uid })
        });

        if (response.ok) {
          const result = await response.json();
          console.log(result)
          setChargerData(result.chargerdata);
          setQrcode(result.qrdata)
          setChargerImage(result.chargerimageurl)
        } else {
          toast("Failed to fetch charger details");
        }
      } catch (error) {
        console.error("Error during data fetch:", error);
        toast("An error occurred while fetching data");
      } finally {
        setLoading(false);
      }
    };

    fetchsingulardata();
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
              const pathfinder = "chargerdetails.jsx"
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

const backtohome = (event) => {
  event.preventDefault(); // Prevent default action
  navigate("/"); // Navigate to home
}

  if (loading) return <div>Loading...</div>;

  return (
    <div className="container mx-auto py-8">
          <div className="py-11">
                <button 
        className="relative inline-block text-white font-bold py-2 px-4 rounded-full overflow-hidden group transition-transform duration-300 transform hover:scale-105"
        onClick={(event) => backtohome(event)}
    >
        <span className="absolute inset-0 bg-gradient-to-r from-teal-400 via-teal-500 to-teal-600 transform scale-110 group-hover:scale-100 transition duration-300"></span>
        <span className="relative z-10">HOME</span>
    </button>
</div>
      <h1 className="text-3xl font-bold mb-4">Charger Details</h1>
      <p className="mb-4">Charger UID: {uid}</p>
      {chargerData && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <p className="font-bold">Charger Name:</p>
            <p className="mb-2">{chargerData.ChargerName}</p>
            <p className="font-bold">Charger Serial Number:</p>
            <p className="mb-2">{chargerData.Chargerserialnum}</p>
            <p className="font-bold">Charger Type:</p>
            <p className="mb-2">{chargerData.Chargertype}</p>
            <p className="font-bold">Connector Type:</p>
            <p className="mb-2">{chargerData.Connector_type}</p>
            <p className="font-bold">Segment:</p>
            <p className="mb-2">{chargerData.Segment}</p>
            <p className="font-bold">Subsegment:</p>
            <p className="mb-2">{chargerData.Subsegment}</p>
            <p className="font-bold">Total Capacity:</p>
            <p className="mb-2">{chargerData.Total_Capacity}</p>
          </div>
          <div>
            <img src={chargerImage} alt="Charger" className="mb-4" />
            <p className="font-bold">Charger Use Type:</p>
            <p className="mb-2">{chargerData.charger_use_type}</p>
            <p className="font-bold">Connector Total Capacity:</p>
            <p className="mb-2">{chargerData.connector_total_capacity}</p>
            <p className="font-bold">Full Address:</p>
            <p className="mb-2">{chargerData.full_address}</p>
            <p className="font-bold">Latitude:</p>
            <p className="mb-2">{chargerData.lattitude}</p>
            <p className="font-bold">Longitude:</p>
            <p className="mb-2">{chargerData.longitute}</p>
            <p className="font-bold">Number of Connectors:</p>
            <p className="mb-2">{chargerData.number_of_connectors}</p>
            <p className="font-bold">Parking:</p>
            <p className="mb-2">{chargerData.parking}</p>
            <p className="font-bold">24/7 Open Status:</p>
            <p className="mb-2">{chargerData.twenty_four_seven_open_status}</p>
            <p className="font-bold">UID:</p>
            <p className="mb-2">{chargerData.uid}</p>
          </div>
        </div>
      )}
         {/* Display the QR code */}
         {qrCode && (
        <div className="mt-8">
          <h2 className="text-2xl font-bold mb-4">QR Code</h2>
          <div className="flex justify-center">
          <img src={qrCode} alt="qrcode"/>
          </div>
        </div>
      )}
    </div>
  );
};

export default ChargerDetails;
