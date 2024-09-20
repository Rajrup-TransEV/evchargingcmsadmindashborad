import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const AddWallet = () => {
    const [userid, setuserid] = useState('');
    const [walletid, setwalletid] = useState('');
    const [price, setprice] = useState(''); // Keep price as a string
    const [chargeruid,setchargerid]=useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
 //use effect to directly check for if user logged in or not
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
    const loadScript = (src) => {
        return new Promise((resolve) => {
            const script = document.createElement("script");
            script.src = src;
            script.onload = () => {
                resolve(true);
            };
            script.onerror = () => {
                resolve(false);
            };
            document.body.appendChild(script);
        });
    };

    const PaymentComponent = () => {
        useEffect(() => {
            loadScript("https://checkout.razorpay.com/v1/checkout.js");
        }, []);
        const sendPaymentToApi = async (razorpay_payment_id) => {
            try {
                const rooturi = import.meta.env.VITE_ROOT_URI;
                const apikey = import.meta.env.VITE_API_KEY;
    
                const response = await fetch(`${rooturi}/admin/verifypayment`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'apiauthkey': apikey,
                    },
                    body: JSON.stringify({
                        razorpay_payment_id,
                        userid,
                        walletid,
                        chargeruid,
                        price,
                    }),
                });
    
                if (!response.ok) throw new Error('Payment data submission failed');
    
                const result = await response.json();
                toast.success(`Payment submitted successfully: ${result.message}`);
            } catch (error) {
                toast.error(`Error: ${error.message}`);
            }
        };
    
        const displayRazorpay = async () => {
            try {
                const rooturi = import.meta.env.VITE_ROOT_URI;
                const apikey = import.meta.env.VITE_API_KEY;

                // Prepare data to send to the API
                const requestData = {
                    userid,
                    walletid,
                    price: price, // Keep as string
                };

                const result = await fetch(`${rooturi}/admin/initwalletrecharge`, { 
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'apiauthkey': apikey,
                    },
                    body: JSON.stringify(requestData),
                });

                if (!result.ok) throw new Error('Failed to create order');

                const data = await result.json();
                console.log(data);
                const options = {
                    key: "rzp_test_ySKlMUoDlIHU1z", // Enter the Key ID generated from the Dashboard
                    amount: Number(price) * 100, // Convert string to number and multiply by 100
                    currency: "INR",
                    name: "Transev",
                    description: "Test Transaction",
                    image: "https://cdn.statically.io/img/transmogriffy.com/wp-content/uploads/2022/03/TWLD5456.jpg?w=1280&quality=100&f=auto",
                    order_id: data.uid,
                    handler: function (response) {
                        console.log(response)
                        toast.success(`Payment successful! Payment ID: ${response.razorpay_payment_id}`);
                        // Call your backend to verify payment here
                        sendPaymentToApi(response.razorpay_payment_id);
                       
                    },
                };

                const paymentObject = new window.Razorpay(options);
                paymentObject.open();
            } catch (error) {
                toast.error(`Error: ${error.message}`);
            }
        };


        return (
            <button 
                onClick={displayRazorpay} 
                className="mt-4 px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition duration-200"
            >
                Pay Now
            </button>
        );
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // PaymentComponent will handle payment display
    };


    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
            <h2 className="text-2xl font-bold mb-6">Add Wallet</h2>
            <form onSubmit={handleSubmit} className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 w-full max-w-md">
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="userid">
                        User ID
                    </label>
                    <input 
                        type="text" 
                        id="userid" 
                        value={userid} 
                        onChange={(e) => setuserid(e.target.value)} 
                        required 
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" 
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="walletid">
                        Wallet ID
                    </label>
                    <input 
                        type="text" 
                        id="walletid" 
                        value={walletid} 
                        onChange={(e) => setwalletid(e.target.value)} 
                        required 
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" 
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="chargerid">
                    Chargerid for which you want to init the payment
                    </label>
                    <input 
                        type="text" 
                        id="chargeruid" 
                        value={chargeruid} 
                        onChange={(e) => setchargerid(e.target.value)} 
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" 
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="price">
                        Price
                    </label>
                    <input 
                        type="text" 
                        id="price" 
                        value={price} 
                        onChange={(e) => setprice(e.target.value)} 
                        required 
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" 
                    />
                </div>
                <PaymentComponent />
            </form>
        </div>
    );
};

export default AddWallet;
