import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
const ChargerUnitDetails = ({ chargerData }) => {
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

    const handleUidClick = (uid) => {
        navigate(`/chargerdetails/${uid}`);
      };
  return (
    <div className="border p-4 rounded-lg">
      <p className="font-bold">Charger UID:</p>
      <button 
        className="text-blue-600 hover:underline" 
        onClick={() => handleUidClick(chargerData.uid)}
    >
        {chargerData.uid}
        </button>
      <p className="font-bold">Charger Serial Number:</p>
      <p className="mb-2">{chargerData.Chargerserialnum}</p>
      <p className="font-bold">Charger Identity:</p>
      <p className="mb-2">{chargerData.chargeridentity}</p>
      <p className="font-bold">ChargerName:</p>
      <p className="mb-2">{chargerData.ChargerName}</p>
      <p className="font-bold">Chargerhost:</p>
      <p className="mb-2">{chargerData.Chargerhost}</p>
    </div>
  );
};

export default ChargerUnitDetails;
