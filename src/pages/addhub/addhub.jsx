import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const AddHub = () => {
    const [hubname, sethubname] = useState('');
    const [hubchargers, sethubcharges] = useState([]);
    const [hubtariff, sethubtariff] = useState('');
    const [hublocation, sethublocation] = useState('');
    const [adminid, setadminid] = useState('');
    const [chargerids, setchargerids] = useState([]);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    // Use effect to check for user authentication
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

    // Fetch all charger data
    useEffect(() => {
        const fetchAllChargerData = async () => {
            const rooturi = import.meta.env.VITE_ROOT_URI;
            const apikey = import.meta.env.VITE_API_KEY;

            try {
                const response = await fetch(`${rooturi}/admin/listofcharges`, {
                    method: "GET",
                    headers: {
                        'Content-Type': 'application/json',
                        'apiauthkey': apikey,
                    },
                });

                const result = await response.json();
                const data = Array.isArray(result.data) ? result.data : [];
                setchargerids(data.map(item => item.uid));
                setLoading(false);
            } catch (error) {
                console.error("Error fetching charger data:", error);
                toast("Failed to fetch charger data");
                setchargerids([]);
                setLoading(false);
            }
        };

        fetchAllChargerData();
    }, []);

    
   // Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();

        const dataToSubmit = {
            hubname,
            hubchargers,
            hubtariff,
            hublocation,
            adminid,
        };

        const rooturi = import.meta.env.VITE_ROOT_URI;
        const apikey = import.meta.env.VITE_API_KEY;

        try {
            const response = await fetch(`${rooturi}/admin/addhubs`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'apiauthkey': apikey,
                },
                body: JSON.stringify(dataToSubmit),
            });

            if (response.ok) {
                toast("Hub added successfully!");
            } else {
                toast("Failed to add hub");
            }
        } catch (error) {
            console.error("Error during hub submission:", error);
            toast("An error occurred while adding the hub");
        }
    };
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
                const pathfinder = "addhub.jsx"
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
  
    return (
        <section className="bg-white dark:bg-gray-900">
            <div className="lg:grid lg:min-h-screen lg:grid-cols-12">
                <aside className="relative block h-16 lg:order-last lg:col-span-5 lg:h-full xl:col-span-6">
                    <img
                        alt=""
                        src="https://images.unsplash.com/photo-1605106702734-205df224ecce?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80"
                        className="absolute inset-0 h-full w-full object-cover"
                    />
                </aside>

                <main className="flex items-center justify-center px-8 py-8 sm:px-12 lg:col-span-7 lg:px-16 lg:py-12 xl:col-span-6">
                    <div className="max-w-xl lg:max-w-3xl">
                        <a className="block text-blue-600" href="/">
                            <span className="sr-only">Home</span>
                            {/* SVG icon omitted for brevity */}
                        </a>

                        <h1 className="mt-6 text-2xl font-bold text-gray-900 sm:text-3xl md:text-4xl dark:text-white">
                            Welcome to Add hub section 🦑
                        </h1>

                        <p className="mt-4 leading-relaxed text-gray-500 dark:text-gray-400">
                            Through this section you can add data for hubs.
                        </p>

                        <form onSubmit={handleSubmit} className="mt-8 grid grid-cols-6 gap-6">
                            <div className="col-span-6 sm:col-span-3">
                                <label
                                    htmlFor="hubname"
                                    className="block text-sm font-medium text-gray-700 dark:text-gray-200"
                                >
                                    hubname
                                </label>

                                <input
                                    type="text"
                                    id="hubname"
                                    name="hubname"
                                    value={hubname}
                                    onChange={(e) => sethubname(e.target.value)}
                                    className="mt-1 w-full rounded-md border-gray-200 bg-white text-sm text-gray-700 shadow-sm dark:border-gray-700 dark:bg-gray-800 dark:text-gray-200"
                                />
                            </div>

                            <div className="col-span-6 sm:col-span-3">
                                <label
                                    htmlFor="hubchargers"
                                    className="block text-sm font-medium text-gray-700 dark:text-gray-200"
                                >
                                    hubchargers
                                </label>

                                <select
                                    id="hubchargers"
                                    name="hubchargers"
                                    multiple
                                    value={hubchargers}
                                    onChange={(e) => {
                                        const options = Array.from(e.target.options);
                                        const selectedValues = options
                                            .filter(option => option.selected)
                                            .map(option => option.value);
                                        sethubcharges(selectedValues);
                                    }}
                                    className="mt-1 w-full rounded-md border-gray-200 bg-white text-sm text-gray-700 shadow-sm dark:border-gray-700 dark:bg-gray-800 dark:text-gray-200"
                                >
                                    {chargerids.map(chargerId => (
                                        <option key={chargerId} value={chargerId}>
                                            {chargerId}
                                        </option>
                                    ))}
                                </select>
                            </div>

                            <div className="col-span-6">
                                <label htmlFor="hubtariff" className="block text-sm font-medium text-gray-700 dark:text-gray-200">
                                    hubtariff
                                </label>

                                <input
                                    type="text"
                                    id="hubtariff"
                                    name="hubtariff"
                                    value={hubtariff}
                                    onChange={(e) => sethubtariff(e.target.value)}
                                    className="mt-1 w-full rounded-md border-gray-200 bg-white text-sm text-gray-700 shadow-sm dark:border-gray-700 dark:bg-gray-800 dark:text-gray-200"
                                />
                            </div>

                            <div className="col-span-6 sm:col-span-3">
                                <label
                                    htmlFor="hublocation"
                                    className="block text-sm font-medium text-gray-700 dark:text-gray-200"
                                >
                                    hublocation
                                </label>

                                <input
                                    type="text"
                                    id="hublocation"
                                    name="hublocation"
                                    value={hublocation}
                                    onChange={(e) => sethublocation(e.target.value)}
                                    className="mt-1 w-full rounded-md border-gray-200 bg-white text-sm text-gray-700 shadow-sm dark:border-gray-700 dark:bg-gray-800 dark:text-gray-200"
                                />
                            </div>

                            <div className="col-span-6 sm:col-span-3">
                                <label
                                    htmlFor="adminid"
                                    className="block text-sm font-medium text-gray-700 dark:text-gray-200"
                                >
                                    adminid
                                </label>

                                <input
                                    type="text"
                                    id="adminid"
                                    name="adminid"
                                    value={adminid}
                                    onChange={(e) => setadminid(e.target.value)}
                                    className="mt-1 w-full rounded-md border-gray-200 bg-white text-sm text-gray-700 shadow-sm dark:border-gray-700 dark:bg-gray-800 dark:text-gray-200"
                                />
                            </div>

                            <div className="col-span-6">
                                <button
                                    type="submit"
                                    className="inline-block w-full rounded-md bg-blue-600 px-5 py-3 text-sm font-medium text-white shadow hover:bg-blue-700 focus:outline-none focus:ring active:bg-blue-500"
                                >
                                    Add Hub
                                </button>
                            </div>
                        </form>
                    </div>
                </main>
            </div>
        </section>
    );
};

export default AddHub;
