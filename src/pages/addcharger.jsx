//add charger details using 
import React, { useState,useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
const AddCharger = () => {
  const [Chargerserialnum,setChargerserialnum]=useState('');
  const [ChargerName,setChargerName]=useState('')
  const [Chargerhost,setChargerhost]=useState('')
  const[Segment,setSegment]=useState('')
  const[Subsegment,setSubsegment]=useState('')
  const [Total_Capacity,setTotal_Capacity]=useState('')
  const[Chargertype,setChargertype]=useState('')
  const [parking,setparking]=useState('')
  const[number_of_connectors,setnumber_of_connectors]=useState('')
  const[Connector_type,setConnector_type]=useState('')
  const [connector_total_capacity,setconnector_total_capacity]=useState('')
  const [lattitude,setlattitude]=useState('')
  const [longitute,setlongitute]=useState('')
  const [full_address,setfull_address]=useState('')
  const[charger_use_type,setcharger_use_type]=useState('')
  const [twenty_four_seven_open_status,settwenty_four_seven_open_status]=useState('')
  const[charger_image,setcharger_image]=useState('')
  const[chargerbuyer,setchargerbuyer]=useState('')
  const [loading, setLoading] = useState(false);
  const [ocppurl, setOcppurl] = useState('');
  const [chargeridentity, setChargerIdentity]=useState('')
  const navigate = useNavigate()
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
//handel charger form data submit
  const handleSubmit=async(e)=>{
    e.preventDefault();
    setLoading(true);
    try {
        //take api key value from env
        const apikey = import.meta.env.VITE_API_KEY;
        const rooturi = import.meta.env.VITE_ROOT_URI;

        const response = await fetch(`${rooturi}/admin/createchargerunit`,{
            method:'POST',
            headers:{
                'Content-Type': 'application/json',
                'apiauthkey': apikey,
            },
            body:JSON.stringify({Chargerserialnum,ChargerName,Chargerhost,Segment,Subsegment,Total_Capacity,Chargertype,parking,number_of_connectors,Connector_type,connector_total_capacity,lattitude,longitute,full_address,charger_use_type,twenty_four_seven_open_status,charger_image,chargerbuyer,chargeridentity})
        })
            const data = await response.json()
            console.log(data)
        if(response.ok){
          setOcppurl(data.ocppurl)
            toast(data.message)
        }else{
            toast.error("Something went wrong please try again")
        }
    } catch (error) {
    console.log(error)  
    toast.error(data.error)
    setError(data.error||'Faliure occurred')      
    }finally{
        setLoading(false)
    }
  }
return (
<section className="bg-white">
  <div className="lg:grid lg:min-h-screen lg:grid-cols-12">
    {/* <aside className="relative block h-16 lg:order-last lg:col-span-5 lg:h-full xl:col-span-6">
      <img
        alt="addchargerimage"
        src={qrCodeUrl}
        className="absolute inset-0 h-full w-full object-cover"
      />
    </aside> */}

    <main
      className="flex items-center justify-center px-8 py-8 sm:px-12 lg:col-span-7 lg:px-16 lg:py-12 xl:col-span-6"
    >
      <div className="max-w-xl lg:max-w-3xl">
        <a className="block text-blue-600" href="#">
          <span className="sr-only">Home</span>
          <svg
            className="h-8 sm:h-10"
            viewBox="0 0 28 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M0.41 10.3847C1.14777 7.4194 2.85643 4.7861 5.2639 2.90424C7.6714 1.02234 10.6393 0 13.695 0C16.7507 0 19.7186 1.02234 22.1261 2.90424C24.5336 4.7861 26.2422 7.4194 26.98 10.3847H25.78C23.7557 10.3549 21.7729 10.9599 20.11 12.1147C20.014 12.1842 19.9138 12.2477 19.81 12.3047H19.67C19.5662 12.2477 19.466 12.1842 19.37 12.1147C17.6924 10.9866 15.7166 10.3841 13.695 10.3841C11.6734 10.3841 9.6976 10.9866 8.02 12.1147C7.924 12.1842 7.8238 12.2477 7.72 12.3047H7.58C7.4762 12.2477 7.376 12.1842 7.28 12.1147C5.6171 10.9599 3.6343 10.3549 1.61 10.3847H0.41ZM23.62 16.6547C24.236 16.175 24.9995 15.924 25.78 15.9447H27.39V12.7347H25.78C24.4052 12.7181 23.0619 13.146 21.95 13.9547C21.3243 14.416 20.5674 14.6649 19.79 14.6649C19.0126 14.6649 18.2557 14.416 17.63 13.9547C16.4899 13.1611 15.1341 12.7356 13.745 12.7356C12.3559 12.7356 11.0001 13.1611 9.86 13.9547C9.2343 14.416 8.4774 14.6649 7.7 14.6649C6.9226 14.6649 6.1657 14.416 5.54 13.9547C4.4144 13.1356 3.0518 12.7072 1.66 12.7347H0V15.9447H1.61C2.39051 15.924 3.154 16.175 3.77 16.6547C4.908 17.4489 6.2623 17.8747 7.65 17.8747C9.0377 17.8747 10.392 17.4489 11.53 16.6547C12.1468 16.1765 12.9097 15.9257 13.69 15.9447C14.4708 15.9223 15.2348 16.1735 15.85 16.6547C16.9901 17.4484 18.3459 17.8738 19.735 17.8738C21.1241 17.8738 22.4799 17.4484 23.62 16.6547ZM23.62 22.3947C24.236 21.915 24.9995 21.664 25.78 21.6847H27.39V18.4747H25.78C24.4052 18.4581 23.0619 18.886 21.95 19.6947C21.3243 20.156 20.5674 20.4049 19.79 20.4049C19.0126 20.4049 18.2557 20.156 17.63 19.6947C16.4899 18.9011 15.1341 18.4757 13.745 18.4757C12.3559 18.4757 11.0001 18.9011 9.86 19.6947C9.2343 20.156 8.4774 20.4049 7.7 20.4049C6.9226 20.4049 6.1657 20.156 5.54 19.6947C4.4144 18.8757 3.0518 18.4472 1.66 18.4747H0V21.6847H1.61C2.39051 21.664 3.154 21.915 3.77 22.3947C4.908 23.1889 6.2623 23.6147 7.65 23.6147C9.0377 23.6147 10.392 23.1889 11.53 22.3947C12.1468 21.9165 12.9097 21.6657 13.69 21.6847C14.4708 21.6623 15.2348 21.9135 15.85 22.3947C16.9901 23.1884 18.3459 23.6138 19.735 23.6138C21.1241 23.6138 22.4799 23.1884 23.62 22.3947Z"
              fill="currentColor"
            />
          </svg>
        </a>

        <h1 className="mt-6 text-2xl font-bold text-gray-900 sm:text-3xl md:text-4xl">
          Welcome to Add charger section 🦑
        </h1>

        <p className="mt-4 leading-relaxed text-gray-500">
       Add charger details using this route access
        </p>

        <form action="#" className="mt-8 grid grid-cols-6 gap-6" onSubmit={handleSubmit}>
          <div className="col-span-6 sm:col-span-3">
            <label htmlFor="Chargerserialnum" className="block text-sm font-medium text-gray-700">
            Charger Serial number
            </label>

            <input
              type="text"
              id="Chargerserialnum"
              name="Chargerserialnum"
              value={Chargerserialnum}
              onChange={(e)=>setChargerserialnum(e.target.value)}
              className="mt-1 w-full rounded-md border-gray-200 bg-white text-sm text-gray-700 shadow-sm"
            />
          </div>

          <div className="col-span-6 sm:col-span-3">
            <label htmlFor="ChargerName" className="block text-sm font-medium text-gray-700">
        Charger Name
            </label>

            <input
              type="text"
              id="ChargerName"
              name="ChargerName"
              value={ChargerName}
              onChange={(e)=>setChargerName(e.target.value)}
              className="mt-1 w-full rounded-md border-gray-200 bg-white text-sm text-gray-700 shadow-sm"
            />
          </div>

          <div className="col-span-6">
            <label htmlFor="Chargerhost" className="block text-sm font-medium text-gray-700"> chargerhost </label>

            <input
              type="text"
              id="Chargerhost"
              name="Chargerhost"
              value={Chargerhost}
              onChange={(e)=>setChargerhost(e.target.value)}
              className="mt-1 w-full rounded-md border-gray-200 bg-white text-sm text-gray-700 shadow-sm"
            />
          </div>

          <div className="col-span-6">
            <label htmlFor="Segment" className="block text-sm font-medium text-gray-700"> Segment </label>

            <input
              type="text"
              id="Segment"
              name="Segment"
              value={Segment}
              onChange={(e)=>setSegment(e.target.value)}
              className="mt-1 w-full rounded-md border-gray-200 bg-white text-sm text-gray-700 shadow-sm"
            />
          </div>
      
          <div className="col-span-6">
            <label htmlFor="Subsegment" className="block text-sm font-medium text-gray-700"> Subsegment </label>

            <input
              type="text"
              id="Subsegment"
              name="Subsegment"
              value={Subsegment}
              onChange={(e)=>setSubsegment(e.target.value)}
              className="mt-1 w-full rounded-md border-gray-200 bg-white text-sm text-gray-700 shadow-sm"
            />
          </div>
      
          <div className="col-span-6">
            <label htmlFor="Total_Capacity" className="block text-sm font-medium text-gray-700"> Total Capacity </label>

            <input
              type="text"
              id="Total_Capacity"
              name="Total_Capacity"
              value={Total_Capacity}
              onChange={(e)=>setTotal_Capacity(e.target.value)}
              className="mt-1 w-full rounded-md border-gray-200 bg-white text-sm text-gray-700 shadow-sm"
            />
          </div>
      
         
          <div className="col-span-6">
            <label htmlFor="Chargertype" className="block text-sm font-medium text-gray-700"> Chargertype </label>

            <input
              type="text"
              id="Chargertype"
              name="Chargertype"
              value={Chargertype}
              onChange={(e)=>setChargertype(e.target.value)}
              className="mt-1 w-full rounded-md border-gray-200 bg-white text-sm text-gray-700 shadow-sm"
            />
          </div>
      
            
         
          <div className="col-span-6">
            <label htmlFor="parking" className="block text-sm font-medium text-gray-700"> Parking </label>

            <input
              type="text"
              id="parking"
              name="parking"
              value={parking}
              onChange={(e)=>setparking(e.target.value)}
              className="mt-1 w-full rounded-md border-gray-200 bg-white text-sm text-gray-700 shadow-sm"
            />
          </div>
      
          <div className="col-span-6">
            <label htmlFor="number_of_connectors" className="block text-sm font-medium text-gray-700"> Number of connectors </label>

            <input
              type="text"
              id="number_of_connectors"
              name="number_of_connectors"
              value={number_of_connectors}
              onChange={(e)=>setnumber_of_connectors(e.target.value)}
              className="mt-1 w-full rounded-md border-gray-200 bg-white text-sm text-gray-700 shadow-sm"
            />
          </div>
  
          <div className="col-span-6">
            <label htmlFor="Connector_type" className="block text-sm font-medium text-gray-700">Connector_type </label>

            <input
              type="text"
              id="Connector_type"
              name="Connector_type"
                value={Connector_type}
                onChange={(e)=>setConnector_type(e.target.value)}
              className="mt-1 w-full rounded-md border-gray-200 bg-white text-sm text-gray-700 shadow-sm"
            />
          </div>
          
          <div className="col-span-6">
            <label htmlFor="connector_total_capacity" className="block text-sm font-medium text-gray-700">   connector_total_capacity </label>

            <input
              type="text"
              id="connector_total_capacity"
              name="connector_total_capacity"
              value={connector_total_capacity}
              onChange={(e)=>setconnector_total_capacity(e.target.value)}
              className="mt-1 w-full rounded-md border-gray-200 bg-white text-sm text-gray-700 shadow-sm"
            />
          </div>
          <div className="col-span-6">
            <label htmlFor="lattitude" className="block text-sm font-medium text-gray-700">   lattitude </label>

            <input
              type="text"
              id="lattitude"
              name="lattitude"
              value={lattitude}
              onChange={(e)=>setlattitude(e.target.value)}
              className="mt-1 w-full rounded-md border-gray-200 bg-white text-sm text-gray-700 shadow-sm"
            />
          </div>
          <div className="col-span-6">
            <label htmlFor="longitute" className="block text-sm font-medium text-gray-700">   longitute </label>

            <input
              type="text"
              id="longitute"
              name="longitute"
              value={longitute}
              onChange={(e)=>setlongitute(e.target.value)}
              className="mt-1 w-full rounded-md border-gray-200 bg-white text-sm text-gray-700 shadow-sm"
            />
          </div>
          <div className="col-span-6">
            <label htmlFor="full_address" className="block text-sm font-medium text-gray-700">   full_address </label>

            <input
              type="text"
              id="full_address"
              name="full_address"
              value={full_address}
              onChange={(e)=>setfull_address(e.target.value)}
              className="mt-1 w-full rounded-md border-gray-200 bg-white text-sm text-gray-700 shadow-sm"
            />
          </div>
          
          <div className="col-span-6">
            <label htmlFor="charger_use_type" className="block text-sm font-medium text-gray-700">   charger_use_type </label>

            <input
              type="text"
              id="charger_use_type"
              name="charger_use_type"
              value={charger_use_type}
              onChange={(e)=>setcharger_use_type(e.target.value)}
              className="mt-1 w-full rounded-md border-gray-200 bg-white text-sm text-gray-700 shadow-sm"
            />
          </div>
               
          <div className="col-span-6">
            <label htmlFor="twenty_four_seven_open_status" className="block text-sm font-medium text-gray-700">   twenty_four_seven_open_status </label>

            <input
              type="text"
              id="twenty_four_seven_open_status"
              name="twenty_four_seven_open_status"
              value={twenty_four_seven_open_status}
              onChange={(e)=>settwenty_four_seven_open_status(e.target.value)}
              className="mt-1 w-full rounded-md border-gray-200 bg-white text-sm text-gray-700 shadow-sm"
            />
          </div>
          <div className="col-span-6">
            <label htmlFor="charger_image" className="block text-sm font-medium text-gray-700">   charger_image </label>

            <input
              type="text"
              id="charger_image"
              name="charger_image"
              value={charger_image}
              onChange={(e)=>setcharger_image(e.target.value)}
              className="mt-1 w-full rounded-md border-gray-200 bg-white text-sm text-gray-700 shadow-sm"
            />
          </div>
          <div className="col-span-6">
            <label htmlFor="chargerbuyer" className="block text-sm font-medium text-gray-700">   chargerbuyer </label>

            <input
              type="text"
              id="chargerbuyer"
              name="chargerbuyer"
              value={chargerbuyer}
              onChange={(e)=>setchargerbuyer(e.target.value)}
              className="mt-1 w-full rounded-md border-gray-200 bg-white text-sm text-gray-700 shadow-sm"
            />
          </div>

          <div className="col-span-6">
            <label htmlFor="chargeridentity" className="block text-sm font-medium text-gray-700">   Charger Serial identity eg . format [dist name, dist code , kvw] "WB24007" </label>

            <input
              type="text"
              id="chargeridentity"
              name="chargeridentity"
              value={chargeridentity}
              onChange={(e)=>setChargerIdentity(e.target.value)}
              className="mt-1 w-full rounded-md border-gray-200 bg-white text-sm text-gray-700 shadow-sm"
            />
          </div>
          
          <div className="col-span-6 sm:flex sm:items-center sm:gap-4">
            <button
              className="inline-block shrink-0 rounded-md border border-blue-600 bg-blue-600 px-12 py-3 text-sm font-medium text-white transition hover:bg-transparent hover:text-blue-600 focus:outline-none focus:ring active:text-blue-500"
            >
                          {loading ? 'Processing...' : 'Save charger details'}
            </button>
          </div>
        </form>
            {/* Display QR Code if it exists */}
            {ocppurl && (
              <div className="mt-6">
                <h2 className="text-xl font-semibold text-gray-900">OCPP URL</h2>
                <input
              type="text"
              id="ocppurl"
              name="ocppurl"
              value={ocppurl}
             
              className="mt-1 w-full rounded-md border-gray-200 bg-white text-sm text-gray-700 shadow-sm"
            />           
              </div>
            )}
      </div>
    </main>
  </div>
</section>

  )
}

export default AddCharger
