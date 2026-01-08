// import React, { useState, useEffect } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { toast } from 'react-toastify';

// function DashboardCard13() {
//     const navigate = useNavigate();
//     const [expenses, setExpenses] = useState([]);

//     useEffect(() => {
//         const checkAuthentication = async () => {
//             const rooturi = import.meta.env.VITE_ROOT_URI;
//             const apikey = import.meta.env.VITE_API_KEY;

//             try {
//                 const gettoken = localStorage.getItem("token");
//                 if (!gettoken) {
//                     navigate("/signin");
//                     return;
//                 }

//                 const response = await fetch(`${rooturi}/userauth/verifyuser`, {
//                     method: 'POST',
//                     headers: {
//                         'Content-Type': 'application/json',
//                         'apiauthkey': apikey,
//                     },
//                     body: JSON.stringify({ token: gettoken })
//                 });

//                 const data = await response.json();
//                 if (response.ok) {
//                     if (data.user.userType !== "superadmin") {
//                         toast("You have no authorization to view this page");
//                         navigate("/signin");
//                     } else {
//                         console.log("You are an authorized user");
//                         navigate("/");
//                     }
//                 } else {
//                     toast("Failed to verify user");
//                     navigate("/signin");
//                 }
//             } catch (error) {
//                 console.error("Error during authentication check:", error);
//                 toast("An error occurred during authentication");
//                 navigate("/signin");
//             }
//         };

//         checkAuthentication();
//     }, [navigate]);

//     useEffect(() => {
//         const fetchExpenses = async () => {
//             const rooturi = import.meta.env.VITE_ROOT_URI;
//             const apikey = import.meta.env.VITE_API_KEY;

//             try {
//                 const response = await fetch(`${rooturi}/admin/expenses`, {
//                     method: 'GET',
//                     headers: {
//                         'Content-Type': 'application/json',
//                         'apiauthkey': apikey,
//                     }
//                 });

//                 const data = await response.json();
//                 if (response.ok) {
//                     setExpenses(data.transactions); // Set transactions data
//                 } else {
//                     toast("Failed to fetch expenses");
//                 }
//             } catch (error) {
//                 console.error("Error fetching expenses:", error);
//                 toast("An error occurred while fetching expenses");
//             }
//         };

//         fetchExpenses();
//     }, []);

//     return (
//         <div className="col-span-full xl:col-span-6 bg-white dark:bg-gray-800 shadow-sm rounded-xl">
//             <header className="px-5 py-4 border-b border-gray-100 dark:border-gray-700/60">
//                 <h2 className="font-semibold text-gray-800 dark:text-gray-100">Transactions</h2>
//             </header>
//             <div className="p-3" style={{ maxHeight: '400px', overflowY: 'auto' }}>
//                 {/* Card content */}
//                 {/* "Today" group */}
//                 <div>
//                     <header className="text-xs uppercase text-gray-400 dark:text-gray-500 bg-gray-50 dark:bg-gray-700 dark:bg-opacity-50 rounded-sm font-semibold p-2">All Transactions</header>
//                     <ul className="my-1">
//                         {expenses.map((transaction, index) => (
//                             <li key={index} className="flex px-2">
//                                 <div className={`w-9 h-9 rounded-full shrink-0 ${transaction.firstname === null ? 'bg-gradient-to-r from-orange-400 to-orange-600' : 'bg-red-500'} my-2 mr-3`}>
//                                     <svg className="w-9 h-9 fill-current text-white" viewBox="0 0 36 36">
//                                         <path d="M17.7 24.7l1.4-1.4-4.3-4.3H25v-2H14.8l4.3-4.3-1.4-1.4L11 18z" />
//                                     </svg>
//                                 </div>
//                                 <div className="grow flex items-center border-b border-gray-100 dark:border-gray-700/60 text-sm py-2">
//                                     <div className="grow flex justify-between">
//                                         <div className="self-center">
//                                             {/* Show firstname if available, otherwise show username */}
//                                             <span className={`font-medium ${transaction.username === null ? 'text-blue-600' : 'text-gray-800'} hover:text-gray-900 dark:text-gray-100 dark:hover:text-white`}>
//                                                 {transaction.firstname || transaction.username}
//                                             </span> billing
//                                         </div>
//                                         <div className="shrink-0 self-start ml-2">
//                                             <span className={`font-medium ${transaction.firstname === null ? 'text-orange-600' : 'text-gray-800'} dark:text-gray-100`}>
//                                                 -RS{transaction.price}
//                                             </span>
//                                         </div>
//                                     </div>
//                                 </div>
//                             </li>
//                         ))}
//                     </ul>
//                 </div>
//             </div>
//         </div>
//     );
// }

// export default DashboardCard13;
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
        const token = localStorage.getItem("token");
        if (!token) return navigate("/signin");

        const res = await fetch(`${rooturi}/userauth/verifyuser`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            apiauthkey: apikey,
          },
          body: JSON.stringify({ token }),
        });

        const data = await res.json();
        if (!res.ok || data.user.userType !== "superadmin") {
          toast("Unauthorized access");
          navigate("/signin");
        }
      } catch {
        toast("Authentication error");
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
        const res = await fetch(`${rooturi}/admin/expenses`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            apiauthkey: apikey,
          },
        });

        const data = await res.json();
        if (res.ok) setExpenses(data.transactions || []);
        else toast("Failed to fetch expenses");
      } catch {
        toast("Error loading transactions");
      }
    };

    fetchExpenses();
  }, []);

  return (
    <section className="col-span-full xl:col-span-6">
      <div className="relative rounded-2xl border border-gray-700/60
        bg-gradient-to-br from-gray-900 via-gray-900/90 to-gray-800
        shadow-[0_0_0_1px_rgba(239,68,68,0.15)]
        hover:shadow-[0_0_25px_rgba(239,68,68,0.25)]
        transition-all duration-300">

        {/* Glow */}
        <div className="absolute -top-24 -right-24 w-56 h-56 bg-red-500/20 rounded-full blur-3xl"></div>

        {/* Header */}
        <div className="relative px-6 py-5 border-b border-gray-700">
          <h2 className="text-xl font-semibold text-white tracking-wide">
            Transactions
          </h2>
          <p className="text-sm text-gray-400 mt-1">
            Expense & billing activity
          </p>
          <div className="mt-3 h-[2px] w-24 bg-gradient-to-r from-red-500 to-orange-500 rounded-full"></div>
        </div>

        {/* Transaction List */}
        <div className="relative max-h-[420px] overflow-y-auto px-4 py-3 space-y-2">
          {expenses.length === 0 ? (
            <div className="text-center text-gray-500 py-10">
              No transactions found
            </div>
          ) : (
            expenses.map((tx, index) => (
              <div
                key={index}
                className="group flex items-center justify-between
                bg-gray-900/60 border border-gray-700/60
                rounded-xl px-4 py-3
                hover:bg-gray-800/70 transition"
              >
                {/* Left */}
                <div className="flex items-center gap-4">
                  <div
                    className={`w-10 h-10 rounded-full flex items-center justify-center text-white font-semibold
                    ${tx.firstname === null
                      ? "bg-gradient-to-br from-orange-500 to-red-500"
                      : "bg-gradient-to-br from-red-500 to-pink-500"
                    }`}
                  >
                    ↓
                  </div>

                  <div>
                    <p className="text-white font-medium">
                      {tx.firstname || tx.username}
                    </p>
                    <p className="text-xs text-gray-400">
                      Billing transaction
                    </p>
                  </div>
                </div>

                {/* Amount */}
                <div className="text-right">
                  <span className="inline-flex px-3 py-1 rounded-full text-sm font-semibold
  bg-red-500/15 text-red-400 ring-1 ring-red-500/40">
  ₹{tx.price}
</span>

                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </section>
  );
}

export default DashboardCard13;
