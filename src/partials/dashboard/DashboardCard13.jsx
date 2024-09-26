import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

function DashboardCard13() {
    const navigate = useNavigate();
    const [expenses, setExpenses] = useState([]);

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
                        navigate("/");
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
        const fetchExpenses = async () => {
            const rooturi = import.meta.env.VITE_ROOT_URI;
            const apikey = import.meta.env.VITE_API_KEY;

            try {
                const response = await fetch(`${rooturi}/admin/expenses`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        'apiauthkey': apikey,
                    }
                });

                const data = await response.json();
                if (response.ok) {
                    setExpenses(data.transactions); // Set transactions data
                } else {
                    toast("Failed to fetch expenses");
                }
            } catch (error) {
                console.error("Error fetching expenses:", error);
                toast("An error occurred while fetching expenses");
            }
        };

        fetchExpenses();
    }, []);

    return (
        <div className="col-span-full xl:col-span-6 bg-white dark:bg-gray-800 shadow-sm rounded-xl">
            <header className="px-5 py-4 border-b border-gray-100 dark:border-gray-700/60">
                <h2 className="font-semibold text-gray-800 dark:text-gray-100">Transactions</h2>
            </header>
            <div className="p-3" style={{ maxHeight: '400px', overflowY: 'auto' }}>
                {/* Card content */}
                {/* "Today" group */}
                <div>
                    <header className="text-xs uppercase text-gray-400 dark:text-gray-500 bg-gray-50 dark:bg-gray-700 dark:bg-opacity-50 rounded-sm font-semibold p-2">All Transactions</header>
                    <ul className="my-1">
                        {expenses.map((transaction, index) => (
                            <li key={index} className="flex px-2">
                                <div className={`w-9 h-9 rounded-full shrink-0 ${transaction.firstname === null ? 'bg-gradient-to-r from-orange-400 to-orange-600' : 'bg-red-500'} my-2 mr-3`}>
                                    <svg className="w-9 h-9 fill-current text-white" viewBox="0 0 36 36">
                                        <path d="M17.7 24.7l1.4-1.4-4.3-4.3H25v-2H14.8l4.3-4.3-1.4-1.4L11 18z" />
                                    </svg>
                                </div>
                                <div className="grow flex items-center border-b border-gray-100 dark:border-gray-700/60 text-sm py-2">
                                    <div className="grow flex justify-between">
                                        <div className="self-center">
                                            {/* Show firstname if available, otherwise show username */}
                                            <span className={`font-medium ${transaction.username === null ? 'text-blue-600' : 'text-gray-800'} hover:text-gray-900 dark:text-gray-100 dark:hover:text-white`}>
                                                {transaction.firstname || transaction.username}
                                            </span> billing
                                        </div>
                                        <div className="shrink-0 self-start ml-2">
                                            <span className={`font-medium ${transaction.firstname === null ? 'text-orange-600' : 'text-gray-800'} dark:text-gray-100`}>
                                                -RS{transaction.price}
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </div>
    );
}

export default DashboardCard13;
