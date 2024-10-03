import React, { useEffect } from 'react';
import {
  Routes,
  Route,
  useLocation
} from 'react-router-dom';

import './css/style.css';

import './charts/ChartjsConfig';

// Import pages
import Dashboard from './pages/Dashboard';
import Login from './pages/login';
import OTPVerify from './pages/otpverification';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import AddCharger from './pages/addcharger';
import ChargerOperationsView from './pages/chargerops';
import ChargerDetails from './pages/chargerdetails';
import ChargerSettings from './pages/chargersettings';
import ListofUsers from './pages/admincrud/listofusers';
import SingleUserDetails from './pages/admincrud/singleuserdetails';
import LogRetentionlist from './pages/logdetails/loglist';
import AddVehicle from './pages/vehiclecrud/addvehicle';
import AddNewuser from './pages/admincrud/addnewuser';
import ListofVehicles from './pages/vehiclecrud/listofvehicle';
import ListOfDrivres from './pages/drivercrud/listofdrivers';
import ShowDataByID from './pages/drivercrud/showdatabydid';
import AddHub from './pages/addhub/addhub';
import ListofHubData from './pages/addhub/listofhubdata';
import HubDetails from './pages/addhub/hubdetails';
import AddWallet from './pages/walletcrud/addwalletdata';
import TotalRevenue from './pages/totalrevenue';
import UpdateProfile from './pages/appuser/updateprofile';

function App() {

  const location = useLocation();

  useEffect(() => {
    document.querySelector('html').style.scrollBehavior = 'auto'
    window.scroll({ top: 0 })
    document.querySelector('html').style.scrollBehavior = ''
  }, [location.pathname]); // triggered on route change

  return (
    <>
    <ToastContainer/>
      <Routes>
        <Route exact path="/" element={<Dashboard />} />
        <Route exact path='/signin' element={<Login/>}/>
        <Route exact path='/otpverify' element={<OTPVerify/>}/>
        <Route exact path="/addcharger" element={<AddCharger/>}/>
        <Route exact path='/listofcharger' element={<ChargerOperationsView/>}/>
        <Route exact path="/chargerdetails/:uid" element={<ChargerDetails/>}/>
        <Route exact path="/settings/:uid" element={<ChargerSettings/>}/>
        <Route exact path="/createnewuser" element={<AddNewuser/>}/>
        <Route exact path='/listofusers' element={<ListofUsers/>}/>
        <Route exact path="/userdetails/:uid" element={<SingleUserDetails/>}/>
        <Route exact path="/logretentionlist" element={<LogRetentionlist/>}/>
        <Route exact path="/addvehicle" element={<AddVehicle/>}/>
        <Route exact path='/listofvehicles' element={<ListofVehicles/>}/>
        <Route exact path="/listofdrivers" element={<ListOfDrivres/>}/>
        <Route exact path="/vehicleowenerdetails/:uid" element={<ShowDataByID/>} />
        <Route exact path='/addhub' element={<AddHub/>} />
        <Route exact path="/listofhubs" element={<ListofHubData/>}/>
        <Route exact path="/hubdetails/:uid" element={<HubDetails/>}/>
        <Route exact path='/addwallet'element={<AddWallet/>}/>
        <Route exact path='/totalrevenue' element={<TotalRevenue/>}/>
        <Route exact path='/updateprofiles' element={<UpdateProfile/>} />
      </Routes>
    </>
  );
}

export default App;
