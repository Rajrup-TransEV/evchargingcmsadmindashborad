import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const AddWallet = () => {
    const [userid, setuserid] = useState('');
    const [walletid, setwalletid] = useState('');
    const [price, setprice] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

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

        const displayRazorpay = async () => {
            try {
                const rooturi = import.meta.env.VITE_ROOT_URI;
                const apikey = import.meta.env.VITE_API_KEY;

                // Prepare data to send to the API
                const requestData = {
                    userid,
                    walletid,
                    price,
                };

                const result = await fetch(`${rooturi}/admin/initwalletrecharge`, { 
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'apiauthkey': apikey,
                    },
                    body: JSON.stringify(requestData), // Send the data in the request body
                });

                if (!result.ok) throw new Error('Failed to create order');

                const data = await result.json();
                console.log(data)
                const options = {
                    key: "rzp_test_Oxv2YtjPuwWXJL", // Enter the Key ID generated from the Dashboard
                    amount: data.actualprice,
                    currency: "INR",
                    name: "Transev",
                    description: "Test Transaction",
                    image: "https://cdn.statically.io/img/transmogriffy.com/wp-content/uploads/2022/03/TWLD5456.jpg?w=1280&quality=100&f=auto",
                    order_id: data.uid,
                    handler: function (response) {
                        toast.success(`Payment successful! Payment ID: ${response.razorpay_payment_id}`);
                        // Call your backend to verify payment here
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
