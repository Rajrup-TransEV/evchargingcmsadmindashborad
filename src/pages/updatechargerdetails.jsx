// import React, { useState, useEffect } from 'react';
// import { useParams, useNavigate } from 'react-router-dom';
// import { toast } from 'react-toastify';

// const UpdateChargerdetails = () => {
//   const navigate = useNavigate();
//   const { uid } = useParams();

//   const [Chargerserialnum, setChargerserialnum] = useState('');
//   const [ChargerName, setChargerName] = useState('');
//   const [Chargerhost, setChargerhost] = useState('');
//   const [Segment, setSegment] = useState('');
//   const [Subsegment, setSubsegment] = useState('');
//   const [Total_Capacity, setTotal_Capacity] = useState('');
//   const [Chargertype, setChargertype] = useState('');
//   const [parking, setParking] = useState('');
//   const [number_of_connectors, setNumber_of_connectors] = useState('');
//   const [Connector_type, setConnector_type] = useState('');
//   const [connector_total_capacity, setConnector_total_capacity] = useState('');
//   const [lattitude, setLattitude] = useState('');
//   const [longitute, setLongitute] = useState('');
//   const [full_address, setFull_address] = useState('');
//   const [charger_use_type, setCharger_use_type] = useState('');
//   const [twenty_four_seven_open_status, setTwenty_four_seven_open_status] = useState('');
//   const [chargerbuyer, setChargerbuyer] = useState('');
//   const [chargeridentity, setChargerIdentity] = useState('');
//   const [charger_image, setCharger_image] = useState(null);
//   const [loading, setLoading] = useState(false);

//   useEffect(() => {
//     // Authentication logic unchanged
//   }, [navigate]);

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setLoading(true);
//     // Submission logic unchanged
//   };

//   const handleFileUpload = (e) => {
//     const selectedFile = e.target.files[0];
//     if (selectedFile) setCharger_image(selectedFile);
//   };

//   return (
//     <section className="min-h-screen bg-gradient-to-r from-teal-50 via-white to-blue-50 flex items-center justify-center p-4">
//       <div className="w-full max-w-5xl bg-white/95 backdrop-blur-lg shadow-2xl rounded-3xl p-10 lg:p-14 border border-gray-200">
//         {/* Header */}
// <div className="mb-10 text-center">
//   <a
//     href="/"
//     className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-teal-500 to-blue-600 text-white font-extrabold rounded-full shadow-lg hover:scale-105 transition-transform hover:shadow-xl"
//   >
//     <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//       <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2h-4a2 2 0 0 1-2-2v-4H9v4a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V9z" />
//     </svg>
//     Home
//   </a>

//   <h1 className="mt-4 text-4xl font-extrabold text-gray-800">
//     Update Charger Details
//   </h1>
//   <p className="mt-2 text-gray-600 text-lg sm:text-base">
//     Fill in the form below to update your charger details.
//   </p>
// </div>


//         {/* Form */}
//         <form className="grid grid-cols-1 sm:grid-cols-2 gap-6" onSubmit={handleSubmit}>
//           {/* Serial Number & Name */}
//           <div>
//             <label className="block text-sm font-bold text-gray-700">Charger Serial Number</label>
//             <input
//               type="text"
//               value={Chargerserialnum}
//               onChange={(e) => setChargerserialnum(e.target.value)}
//               className="mt-1 w-full rounded-xl border border-gray-300 bg-white shadow-md px-4 py-2 text-gray-700 font-medium focus:outline-none focus:ring-2 focus:ring-teal-400 transition"
//             />
//           </div>

//           <div>
//             <label className="block text-sm font-bold text-gray-700">Charger Name</label>
//             <input
//               type="text"
//               value={ChargerName}
//               onChange={(e) => setChargerName(e.target.value)}
//               className="mt-1 w-full rounded-xl border border-gray-300 bg-white shadow-md px-4 py-2 text-gray-700 font-medium focus:outline-none focus:ring-2 focus:ring-teal-400 transition"
//             />
//           </div>

//           {/* Host & Segment */}
//           <div>
//             <label className="block text-sm font-bold text-gray-700">Charger Host</label>
//             <input
//               type="text"
//               value={Chargerhost}
//               onChange={(e) => setChargerhost(e.target.value)}
//               className="mt-1 w-full rounded-xl border border-gray-300 bg-white shadow-md px-4 py-2 text-gray-700 font-medium focus:outline-none focus:ring-2 focus:ring-teal-400 transition"
//             />
//           </div>

//           <div>
//             <label className="block text-sm font-bold text-gray-700">Segment</label>
//             <input
//               type="text"
//               value={Segment}
//               onChange={(e) => setSegment(e.target.value)}
//               className="mt-1 w-full rounded-xl border border-gray-300 bg-white shadow-md px-4 py-2 text-gray-700 font-medium focus:outline-none focus:ring-2 focus:ring-teal-400 transition"
//             />
//           </div>

//           {/* Subsegment & Total Capacity */}
//           <div>
//             <label className="block text-sm font-bold text-gray-700">Subsegment</label>
//             <input
//               type="text"
//               value={Subsegment}
//               onChange={(e) => setSubsegment(e.target.value)}
//               className="mt-1 w-full rounded-xl border border-gray-300 bg-white shadow-md px-4 py-2 text-gray-700 font-medium focus:outline-none focus:ring-2 focus:ring-teal-400 transition"
//             />
//           </div>

//           <div>
//             <label className="block text-sm font-bold text-gray-700">Total Capacity</label>
//             <input
//               type="text"
//               value={Total_Capacity}
//               onChange={(e) => setTotal_Capacity(e.target.value)}
//               className="mt-1 w-full rounded-xl border border-gray-300 bg-white shadow-md px-4 py-2 text-gray-700 font-medium focus:outline-none focus:ring-2 focus:ring-teal-400 transition"
//             />
//           </div>

//           {/* Charger Type Badge & Parking */}
//           <div>
//             <label className="block text-sm font-bold text-gray-700">Charger Type</label>
//             <select
//               value={Chargertype}
//               onChange={(e) => setChargertype(e.target.value)}
//               className="mt-1 w-full rounded-xl border border-gray-300 bg-white shadow-md px-4 py-2 text-gray-700 font-medium focus:outline-none focus:ring-2 focus:ring-teal-400 transition"
//             >
//               <option value="" disabled>Select Charger Type</option>
//               <option value="AC">AC</option>
//               <option value="DC">DC</option>
//               <option value="HYBRID">HYBRID</option>
//             </select>
//           </div>

//           <div>
//             <label className="block text-sm font-bold text-gray-700">Parking</label>
//             <input
//               type="text"
//               value={parking}
//               onChange={(e) => setParking(e.target.value)}
//               className="mt-1 w-full rounded-xl border border-gray-300 bg-white shadow-md px-4 py-2 text-gray-700 font-medium focus:outline-none focus:ring-2 focus:ring-teal-400 transition"
//             />
//           </div>

//           {/* Remaining Fields */}
//           {[
//             {label: 'Number of Connectors', value: number_of_connectors, setter: setNumber_of_connectors},
//             {label: 'Connector Type', value: Connector_type, setter: setConnector_type},
//             {label: 'Connector Total Capacity', value: connector_total_capacity, setter: setConnector_total_capacity},
//             {label: 'Latitude', value: lattitude, setter: setLattitude},
//             {label: 'Longitude', value: longitute, setter: setLongitute},
//             {label: 'Full Address', value: full_address, setter: setFull_address},
//             {label: 'Charger Use Type', value: charger_use_type, setter: setCharger_use_type},
//             {label: '24/7 Open Status', value: twenty_four_seven_open_status, setter: setTwenty_four_seven_open_status},
//             {label: 'Charger Buyer', value: chargerbuyer, setter: setChargerbuyer},
//             {label: 'Charger Identity', value: chargeridentity, setter: setChargerIdentity},
//           ].map((field, idx) => (
//             <div key={idx}>
//               <label className="block text-sm font-bold text-gray-700">{field.label}</label>
//               <input
//                 type="text"
//                 value={field.value}
//                 onChange={(e) => field.setter(e.target.value)}
//                 className="mt-1 w-full rounded-xl border border-gray-300 bg-white shadow-md px-4 py-2 text-gray-700 font-medium focus:outline-none focus:ring-2 focus:ring-teal-400 transition"
//               />
//             </div>
//           ))}

//           {/* File Upload */}
//           <div className="col-span-full">
//             <label className="block text-sm font-bold text-gray-700">Charger Image</label>
//             <input
//               type="file"
//               onChange={handleFileUpload}
//               className="mt-1 w-full rounded-xl border border-gray-300 bg-white shadow-md px-4 py-2 text-gray-700 font-medium focus:outline-none focus:ring-2 focus:ring-teal-400 transition"
//             />
//           </div>

//           {/* Bold Gradient Submit Button */}
//           <div className="col-span-full flex justify-center mt-6">
//             <button
//               type="submit"
//               disabled={loading}
//               className={`flex items-center justify-center gap-3 px-12 py-3 rounded-2xl font-extrabold text-white transition-transform ${
//                 loading
//                   ? 'bg-gray-400 cursor-not-allowed'
//                   : 'bg-gradient-to-r from-teal-500 to-blue-600 hover:scale-105 shadow-lg'
//               }`}
//             >
//               {loading && (
//                 <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
//                   <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
//                   <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 0115.9-4.1A8 8 0 014 12z"></path>
//                 </svg>
//               )}
//               {loading ? 'Processing...' : 'Save Charger Details'}
//             </button>
//           </div>
//         </form>
//       </div>
//     </section>
//   );
// };

// export default UpdateChargerdetails;

import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const UpdateChargerdetails = () => {
  const navigate = useNavigate();
  const { uid } = useParams();

  const [Chargerserialnum, setChargerserialnum] = useState('');
  const [ChargerName, setChargerName] = useState('');
  const [Chargerhost, setChargerhost] = useState('');
  const [Segment, setSegment] = useState('');
  const [Subsegment, setSubsegment] = useState('');
  const [Total_Capacity, setTotal_Capacity] = useState('');
  const [Chargertype, setChargertype] = useState('');
  const [parking, setParking] = useState('');
  const [number_of_connectors, setNumber_of_connectors] = useState('');
  const [Connector_type, setConnector_type] = useState('');
  const [connector_total_capacity, setConnector_total_capacity] = useState('');
  const [lattitude, setLattitude] = useState('');
  const [longitute, setLongitute] = useState('');
  const [full_address, setFull_address] = useState('');
  const [charger_use_type, setCharger_use_type] = useState('');
  const [twenty_four_seven_open_status, setTwenty_four_seven_open_status] = useState('');
  const [chargerbuyer, setChargerbuyer] = useState('');
  const [chargeridentity, setChargerIdentity] = useState('');
  const [charger_image, setCharger_image] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // Authentication logic unchanged
  }, [navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    // Submission logic unchanged
  };

  const handleFileUpload = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) setCharger_image(selectedFile);
  };

  const inputBase =
    'mt-1 w-full rounded-2xl border border-gray-200 bg-white/80 px-4 py-2.5 text-gray-700 font-medium shadow-sm focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all duration-200 placeholder:text-gray-400';

  const labelBase = 'block text-sm font-semibold text-gray-600 tracking-wide';

  return (
    <section className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-sky-50 flex items-center justify-center px-4 py-10">
      <div className="w-full max-w-6xl rounded-3xl bg-white/90 backdrop-blur-xl border border-gray-100 shadow-[0_20px_60px_-15px_rgba(0,0,0,0.15)] p-8 sm:p-10 lg:p-14">
        {/* Header */}
        <div className="mb-12 text-center">
          <a
            href="/"
            className="inline-flex items-center gap-2 px-6 py-2.5 bg-gradient-to-r from-teal-500 to-blue-600 text-white text-sm font-bold rounded-full shadow-md hover:shadow-lg hover:scale-[1.03] transition-all"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2h-4a2 2 0 0 1-2-2v-4H9v4a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V9z" />
            </svg>
            Home
          </a>

          <h1 className="mt-6 text-3xl sm:text-4xl font-extrabold text-gray-800 tracking-tight">
            Update Charger Details
          </h1>
          <p className="mt-3 text-gray-500 text-sm sm:text-base max-w-2xl mx-auto">
            Update and manage charger configuration details. All fields are designed for quick and clear data entry.
          </p>
        </div>

        {/* Form */}
        <form
          className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-6"
          onSubmit={handleSubmit}
        >
          <div>
            <label className={labelBase}>Charger Serial Number</label>
            <input
              required
              type="text"
              value={Chargerserialnum}
              onChange={(e) => setChargerserialnum(e.target.value)}
              className={inputBase}
              placeholder="Enter serial number"
            />
          </div>

          <div>
            <label className={labelBase}>Charger Name</label>
            <input
              required
              type="text"
              value={ChargerName}
              onChange={(e) => setChargerName(e.target.value)}
              className={inputBase}
              placeholder="Enter charger name"
            />
          </div>

          <div>
            <label className={labelBase}>Charger Host</label>
            <input
              required
              type="text"
              value={Chargerhost}
              onChange={(e) => setChargerhost(e.target.value)}
              className={inputBase}
              placeholder="Host / Owner"
            />
          </div>

          <div>
            <label className={labelBase}>Segment</label>
            <input
              required
              type="text"
              value={Segment}
              onChange={(e) => setSegment(e.target.value)}
              className={inputBase}
              placeholder="Segment"
            />
          </div>

          <div>
            <label className={labelBase}>Subsegment</label>
            <input
              required
              type="text"
              value={Subsegment}
              onChange={(e) => setSubsegment(e.target.value)}
              className={inputBase}
              placeholder="Subsegment"
            />
          </div>

          <div>
            <label className={labelBase}>Total Capacity</label>
            <input
              required
              type="text"
              value={Total_Capacity}
              onChange={(e) => setTotal_Capacity(e.target.value)}
              className={inputBase}
              placeholder="kW"
            />
          </div>

          <div>
            <label className={labelBase}>Charger Type</label>
            <select
              required
              value={Chargertype}
              onChange={(e) => setChargertype(e.target.value)}
              className={inputBase}
            >
              <option value="" disabled>
                Select charger type
              </option>
              <option value="AC">AC</option>
              <option value="DC">DC</option>
              <option value="HYBRID">HYBRID</option>
            </select>
          </div>

          <div>
            <label className={labelBase}>Parking</label>
            <input
              required
              type="text"
              value={parking}
              onChange={(e) => setParking(e.target.value)}
              className={inputBase}
              placeholder="Parking availability"
            />
          </div>

          {[{ label: 'Number of Connectors', value: number_of_connectors, setter: setNumber_of_connectors }, { label: 'Connector Type', value: Connector_type, setter: setConnector_type }, { label: 'Connector Total Capacity', value: connector_total_capacity, setter: setConnector_total_capacity }, { label: 'Latitude', value: lattitude, setter: setLattitude }, { label: 'Longitude', value: longitute, setter: setLongitute }, { label: 'Full Address', value: full_address, setter: setFull_address }, { label: 'Charger Use Type', value: charger_use_type, setter: setCharger_use_type }, { label: '24/7 Open Status', value: twenty_four_seven_open_status, setter: setTwenty_four_seven_open_status }, { label: 'Charger Buyer', value: chargerbuyer, setter: setChargerbuyer }, { label: 'Charger Identity', value: chargeridentity, setter: setChargerIdentity }].map((field, idx) => (
            <div key={idx}>
              <label className={labelBase}>{field.label}</label>
              <input
              required
              type="text"
                value={field.value}
                onChange={(e) => field.setter(e.target.value)}
                className={inputBase}
              />
            </div>
          ))}

          <div className="col-span-full">
            <label className={labelBase}>Charger Image</label>
            <input
              required
              type="file"
              onChange={handleFileUpload}
              className="mt-1 w-full text-sm text-gray-600 file:mr-4 file:rounded-xl file:border-0 file:bg-gradient-to-r file:from-teal-500 file:to-blue-600 file:px-5 file:py-2 file:text-white file:font-semibold hover:file:opacity-90 transition"
            />
          </div>

          <div className="col-span-full flex justify-center pt-8">
            <button
              type="submit"
              disabled={loading}
              className={`inline-flex items-center gap-3 px-14 py-3.5 rounded-2xl text-base font-extrabold text-white transition-all duration-200 ${
                loading
                  ? 'bg-gray-400 cursor-not-allowed'
                  : 'bg-gradient-to-r from-teal-500 to-blue-600 hover:scale-[1.04] hover:shadow-xl'
              }`}
            >
              {loading && (
                <svg
                  className="animate-spin h-5 w-5 text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 0115.9-4.1A8 8 0 014 12z"
                  />
                </svg>
              )}
              {loading ? 'Processing…' : 'Save Charger Details'}
            </button>
          </div>
        </form>
      </div>
    </section>
  );
};

export default UpdateChargerdetails;
