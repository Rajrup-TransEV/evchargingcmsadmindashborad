import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
const ShpwDataByID = () => {
    const navigate = useNavigate();
    const { uid } = useParams();
    const [driverData, setdriverData] = useState(null);
    const[vehicledata,setvehicledata]=useState(null);
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
  useEffect(() => {
    const fetchsingulardata = async () => {
      const rooturi = import.meta.env.VITE_ROOT_URI;
      const apikey = import.meta.env.VITE_API_KEY;

      try {
        const response = await fetch(`${rooturi}/admin/getvobye`, {
          method: "POST",
          headers: {
            'Content-Type': 'application/json',
            'apiauthkey': apikey,
          },
          body: JSON.stringify({ uid: uid })
        });

        if (response.ok) {
          const result = await response.json();
          console.log(result)
          setdriverData(result.chargerdata);
        //   setQrcode(result.qrdata)
        //   setChargerImage(result.chargerimageurl)
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

  if (loading) return <div>Loading...</div>;
  return (
    <div className="container mx-auto py-8">
    <h1 className="text-3xl font-bold mb-4">Charger Details</h1>
    <p className="mb-4">Charger UID: {uid}</p>
    {driverData && (
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div>
          <p className="font-bold">Vehicle Owener firstname:</p>
          <p className="mb-2">{driverData.vehicleowenerfirstname}</p>
          <p className="font-bold">vehicle Owener lastname:</p>
          <p className="mb-2">{driverData.vehicleowenerlastename}</p>
          <p className="font-bold">vehicle owener email:</p>
          <p className="mb-2">{driverData.vehicleoweneremail}</p>
          <p className="font-bold">vehicleoweneraddress:</p>
          <p className="mb-2">{driverData.vehicleoweneraddress}</p>
          <p className="font-bold">vehicleowenergovdocs:</p>
          <p className="mb-2">{driverData.vehicleowenergovdocs}</p>
          <p className="font-bold">adminid:</p>
          <p className="mb-2">{driverData.adminid}</p>
          <p className="font-bold">vehicleowenerlicense:</p>
          <p className="mb-2">{driverData.vehicleowenerlicense}</p>
          <p className="font-bold">vehicleowenernationality:</p>
          <p className="mb-2">{driverData.vehicleowenernationality}</p>
          <p className="font-bold">vehicleowenerrole:</p>
          <p className="mb-2">{driverData.vehicleowenerrole}</p>
        </div>
        <div>
          {/* <img src={chargerImage} alt="Charger" className="mb-4" /> */}
          {/* <p className="font-bold">Charger Use Type:</p>
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
          <p className="mb-2">{chargerData.uid}</p> */}
        </div>
      </div>
    )}
  </div>
  )
}

export default ShpwDataByID
