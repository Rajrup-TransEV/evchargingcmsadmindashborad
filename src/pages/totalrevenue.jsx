import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
const TotalRevenue = () => {
  const navigate = useNavigate();
  const [totalrevenue, settotalrevenue] = useState(); // Initial state is an empty array
  const [loading, setLoading] = useState(false);
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

  useEffect(() => {
    const fetchTotalRevenue = async () => {
      const rooturi = import.meta.env.VITE_ROOT_URI;
      const apikey = import.meta.env.VITE_API_KEY;
      const userId = "yyyy"
      try {
        const response = await fetch(`${rooturi}/admin/totalrevenue`, {
          method: "POST",
          headers: {
            'Content-Type': 'application/json',
            'apiauthkey': apikey,
          },
          body:JSON.stringify({userId})
        });
  
        const result = await response.json();
        const data = result.totalrevenues
        console.log(data)
        settotalrevenue(data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching charger data:", error);
        toast("Failed to fetch charger data");
        settotalrevenue();
        setLoading(false);
      }
    };
  
    fetchTotalRevenue();
  }, []);
  
  return (
    <div>
      <article
  className="flex flex-col gap-4 rounded-lg border border-gray-100 bg-white p-6 dark:border-gray-800 dark:bg-gray-900"
>
  <div
    className="inline-flex gap-2 self-end rounded bg-green-100 p-1 text-green-600 dark:bg-green-700 dark:text-green-50"
  >
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className="size-4"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
    >
      <path
        stroke-linecap="round"
        stroke-linejoin="round"
        stroke-width="2"
        d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"
      />
    </svg>

    <span className="text-xs font-medium"> {totalrevenue}  </span>
  </div>

  <div>
    <strong className="block text-sm font-medium text-gray-500 dark:text-gray-400"> Profit </strong>
    <p>
      <span className="text-xs text-gray-500 dark:text-gray-400"> {totalrevenue} </span>
    </p>
  </div>
</article>
    </div>
  )
}

export default TotalRevenue
