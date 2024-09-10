import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import ChargerUnitDetails from '../extracomp/userChargerDetails';

const SingleUserDetails = () => {
    const [userData, setUserData] = useState(null);
    const[chargerData,setChargerData]=useState(null);
    const [loading, setLoading] = useState(true);
    const { uid } = useParams();
    const navigate = useNavigate();
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
  //fetch single user details
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
          console.log(result.data)
          setUserData(result.data);
          setChargerData(result.data.chargerUnits)

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
      <h1 className="text-3xl font-bold mb-4">User details Details</h1>
      <p className="mb-4">User UID: {uid}</p>
      {userData && chargerData && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <p className="font-bold">First Name:</p>
            <p className="mb-2">{userData.firstname}</p>
            <p className="font-bold">Last Name:</p>
            <p className="mb-2">{userData.lastname}</p>
            <p className="font-bold">Phone number:</p>
            <p className="mb-2">{userData.phonenumber}</p>
            <p className="font-bold">Role:</p>
            <p className="mb-2">{userData.role}</p>
            <p className="font-bold">Address:</p>
            <p className="mb-2">{userData.address}</p>
            <p className="font-bold">Designation</p>
            <p className="mb-2">{userData.designation}</p>
          </div>
            <div>
            <h1 className="text-3xl font-bold mb-4">User Bought Charger details</h1>
            {chargerData.map((charger, index) => (
              <ChargerUnitDetails key={index} chargerData={charger} />
            ))}
            </div>
        </div>
      )}
    </div>
  )
}

export default SingleUserDetails
