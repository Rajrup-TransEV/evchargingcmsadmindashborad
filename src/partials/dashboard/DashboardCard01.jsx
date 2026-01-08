// import { useNavigate } from 'react-router-dom';
// import { toast } from 'react-toastify';
// import React, { useState, useEffect } from 'react';
// import { Link } from 'react-router-dom';
// import LineChart from '../../charts/LineChart01';
// import { chartAreaGradient } from '../../charts/ChartjsConfig';
// import EditMenu from '../../components/DropdownEditMenu';

// // Import utilities
// import { tailwindConfig, hexToRGB } from '../../utils/Utils';

// function DashboardCard01() {
//   const navigate = useNavigate();
//   const [todayrev,settodayrev]=useState()
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const checkAuthentication = async () => {
//       const rooturi = import.meta.env.VITE_ROOT_URI;
//       const apikey = import.meta.env.VITE_API_KEY;

//       try {
//         const gettoken = localStorage.getItem("token");
//         if (!gettoken) {
//           navigate("/signin");
//           return;
//         }

//         const response = await fetch(`${rooturi}/userauth/verifyuser`, {
//           method: 'POST',
//           headers: {
//             'Content-Type': 'application/json',
//             'apiauthkey': apikey,
//           },
//           body: JSON.stringify({ token: gettoken })
//         });

//         const data = await response.json();
//         if (response.ok) {
//           if (data.user.userType !== "superadmin") {
//             toast("You have no authorization to view this page");
//             navigate("/signin");
//           } else {
//             console.log("You are an authorized user");
//             navigate("/")
//           }
//         } else {
//           toast("Failed to verify user");
//           navigate("/signin");
//         }
//       } catch (error) {
//         console.error("Error during authentication check:", error);
//         toast("An error occurred during authentication");
//         navigate("/signin");
//       }
//     };

//     checkAuthentication();
//   }, [navigate]);
  
//   useEffect(() => {
//     const fetchtodayrevData = async () => {
//       const rooturi = import.meta.env.VITE_ROOT_URI;
//       const apikey = import.meta.env.VITE_API_KEY;

//       try {
//         const response = await fetch(`${rooturi}/admin/todayrev`, {
//           method: "GET",
//           headers: {
//             'Content-Type': 'application/json',
//             'apiauthkey': apikey,
//           },
//         });

//         const result = await response.json();
//         const data =result.data
//         settodayrev(data);
//         setLoading(false);
//       } catch (error) {
//         console.error("Error fetching  data:", error);
//         toast("Failed to fetch charger data");
//         // setuserData([]);
//         settodayrev()
//         setLoading(false);
//       }
//     };

//     fetchtodayrevData();
//   }, []);

//   // const chartData = {
//   //   labels: [
//   //     '12-01-2022',
//   //     '01-01-2023',
//   //     '02-01-2023',
//   //     '03-01-2023',
//   //     '04-01-2023',
//   //     '05-01-2023',
//   //     '06-01-2023',
//   //     '07-01-2023',
//   //     '08-01-2023',
//   //     '09-01-2023',
//   //     '10-01-2023',
//   //     '11-01-2023',
//   //     '12-01-2023',
//   //     '01-01-2024',
//   //     '02-01-2024',
//   //     '03-01-2024',
//   //     '04-01-2024',
//   //     '05-01-2024',
//   //     '06-01-2024',
//   //     '07-01-2024',
//   //     '08-01-2024',
//   //     '09-01-2024',
//   //     '10-01-2024',
//   //     '11-01-2024',
//   //     '12-01-2024',
//   //     '01-01-2025',
//   //   ],
//   //   datasets: [
//   //     // Indigo line
//   //     {
//   //       data: [732, 610, 610, 504, 504, 504, 349, 349, 504, 342, 504, 610, 391, 192, 154, 273, 191, 191, 126, 263, 349, 252, 423, 622, 470, 532],
//   //       fill: true,
//   //       backgroundColor: function(context) {
//   //         const chart = context.chart;
//   //         const {ctx, chartArea} = chart;
//   //         return chartAreaGradient(ctx, chartArea, [
//   //           { stop: 0, color: `rgba(${hexToRGB(tailwindConfig().theme.colors.violet[500])}, 0)` },
//   //           { stop: 1, color: `rgba(${hexToRGB(tailwindConfig().theme.colors.violet[500])}, 0.2)` }
//   //         ]);
//   //       },            
//   //       borderColor: tailwindConfig().theme.colors.violet[500],
//   //       borderWidth: 2,
//   //       pointRadius: 0,
//   //       pointHoverRadius: 3,
//   //       pointBackgroundColor: tailwindConfig().theme.colors.violet[500],
//   //       pointHoverBackgroundColor: tailwindConfig().theme.colors.violet[500],
//   //       pointBorderWidth: 0,
//   //       pointHoverBorderWidth: 0,
//   //       clip: 20,
//   //       tension: 0.2,
//   //     },
//   //     // Gray line
//   //     {
//   //       data: [532, 532, 532, 404, 404, 314, 314, 314, 314, 314, 234, 314, 234, 234, 314, 314, 314, 388, 314, 202, 202, 202, 202, 314, 720, 642],
//   //       borderColor: `rgba(${hexToRGB(tailwindConfig().theme.colors.gray[500])}, 0.25)`,
//   //       borderWidth: 2,
//   //       pointRadius: 0,
//   //       pointHoverRadius: 3,
//   //       pointBackgroundColor: `rgba(${hexToRGB(tailwindConfig().theme.colors.gray[500])}, 0.25)`,
//   //       pointHoverBackgroundColor: `rgba(${hexToRGB(tailwindConfig().theme.colors.gray[500])}, 0.25)`,
//   //       pointBorderWidth: 0,
//   //       pointHoverBorderWidth: 0,
//   //       clip: 20,
//   //       tension: 0.2,
//   //     },
//   //   ],
//   // };

//   return (
//     <div className="flex flex-col col-span-full sm:col-span-6 xl:col-span-4 bg-white dark:bg-gray-800 shadow-sm rounded-xl">
//       <div className="px-5 pt-5">
//         <header className="flex justify-between items-start mb-2">
//           <h2 className="text-lg font-semibold text-gray-800 dark:text-gray-100 mb-2"></h2>
//           {/* Menu button */}
//           <EditMenu align="right" className="relative inline-flex">
//             <li>
//               <Link className="font-medium text-sm text-gray-600 dark:text-gray-300 hover:text-gray-800 dark:hover:text-gray-200 flex py-1 px-3" to="#0">
//                 Option 1
//               </Link>
//             </li>
//             <li>
//               <Link className="font-medium text-sm text-gray-600 dark:text-gray-300 hover:text-gray-800 dark:hover:text-gray-200 flex py-1 px-3" to="#0">
//                 Option 2
//               </Link>
//             </li>
//             <li>
//               <Link className="font-medium text-sm text-red-500 hover:text-red-600 flex py-1 px-3" to="#0">
//                 Remove
//               </Link>
//             </li>
//           </EditMenu>
//         </header>
//         <div className="text-xs font-semibold text-gray-400 dark:text-gray-500 uppercase mb-1">Sales</div>
//         <div className="flex items-start">
//           <div className="text-3xl font-bold text-gray-800 dark:text-gray-100 mr-2">RS {todayrev}</div>
//           {/* <div className="text-sm font-medium text-green-700 px-1.5 bg-green-500/20 rounded-full">+49%</div> */}
//         </div>
//       </div>
//       {/* Chart built with Chart.js 3 */}
//       <div className="grow max-sm:max-h-[128px] xl:max-h-[128px]">
//         {/* Change the height attribute to adjust the chart height */}
//         {/* <LineChart data={chartData} width={389} height={128} /> */}
//       </div>
//     </div>
//   );
// }

// export default DashboardCard01;
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import EditMenu from '../../components/DropdownEditMenu';


function DashboardCard01() {
  const navigate = useNavigate();
  const [todayrev, settodayrev] = useState();
  const [loading, setLoading] = useState(true);

  /* ================= AUTH ================= */
  useEffect(() => {
    const checkAuthentication = async () => {
      const rooturi = import.meta.env.VITE_ROOT_URI;
      const apikey = import.meta.env.VITE_API_KEY;

      try {
        const token = localStorage.getItem('token');
        if (!token) return navigate('/signin');

        const response = await fetch(`${rooturi}/userauth/verifyuser`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            apiauthkey: apikey,
          },
          body: JSON.stringify({ token }),
        });

        const data = await response.json();
        if (!response.ok || data.user.userType !== 'superadmin') {
          toast('Unauthorized access');
          navigate('/signin');
        }
      } catch {
        navigate('/signin');
      }
    };

    checkAuthentication();
  }, [navigate]);

  /* ================= DATA ================= */
  useEffect(() => {
    const fetchtodayrevData = async () => {
      const rooturi = import.meta.env.VITE_ROOT_URI;
      const apikey = import.meta.env.VITE_API_KEY;

      try {
        const response = await fetch(`${rooturi}/admin/todayrev`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            apiauthkey: apikey,
          },
        });

        const result = await response.json();
        settodayrev(result.data);
      } catch {
        toast('Failed to fetch revenue');
        settodayrev(0);
      } finally {
        setLoading(false);
      }
    };

    fetchtodayrevData();
  }, []);

  return (
    <div className="relative col-span-full sm:col-span-6 xl:col-span-4 overflow-hidden rounded-2xl bg-gradient-to-br from-indigo-600 via-indigo-500 to-purple-600 shadow-lg">
      {/* Glow */}
      <div className="absolute inset-0 bg-white/10 backdrop-blur-3xl" />

      <div className="relative p-6">
        <header className="flex justify-between items-start mb-6">
          <div>
            <h2 className="text-lg font-semibold text-white">Today Revenue</h2>
            <p className="text-xs text-indigo-100">Live earnings summary</p>
          </div>

          <EditMenu align="right" className="relative inline-flex">
            <li>
              <Link className="text-sm text-gray-700 hover:text-black flex py-1 px-3" to="#0">
                View details
              </Link>
            </li>
            <li>
              <Link className="text-sm text-gray-700 hover:text-black flex py-1 px-3" to="#0">
                Refresh
              </Link>
            </li>
          </EditMenu>
        </header>

        {/* Revenue */}
        <div className="flex items-center gap-4">
          <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-white/20">
            ₹
          </div>

          {loading ? (
            <div className="h-8 w-32 bg-white/20 rounded animate-pulse" />
          ) : (
            <div>
              <p className="text-3xl font-bold text-white">₹ {todayrev}</p>
              <p className="text-xs text-indigo-100">Updated just now</p>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="mt-6 flex justify-between items-center">
          <span className="text-xs text-indigo-100">Today · IST</span>
          <span className="text-xs bg-white/20 text-white px-3 py-1 rounded-full">Revenue</span>
        </div>
      </div>
    </div>
  );
}

export default DashboardCard01;
