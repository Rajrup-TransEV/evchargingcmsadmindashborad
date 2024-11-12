import React, { useEffect } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './css/style.css';

import './charts/ChartjsConfig';

// Import pages
import Dashboard from './pages/Dashboard';
import Login from './pages/login';
import OTPVerify from './pages/otpverification';
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
import AddMinimumBalance from './pages/appuser/addminimumbalance';
import ListOfTrans from './pages/transactions/listoftrans';
import TD from './pages/transactions/td';
import ForgotPassword from './pages/forgotpassword';
import ListofAppUser from './pages/appuser/appusercreate.jsx/listofappusers';
import DetailsAppUser from './pages/appuser/appusercreate.jsx/detailappusers';
import LogDetails from './pages/logdetails/logdetails';
import ResetPassword from './pages/appuser/resetpassword';
import DisputeformList from './pages/disputeformcrud/disputeformlist';
import DispuetformDetails from './pages/disputeformcrud/disputeformdetails';
import HelpandSupport from './pages/helpandsupport/helpandsupport';
import HelpandSupportd from './pages/helpandsupport/helpandsupportdetails';
import UpdateAppUser from './pages/appuser/appusercreate.jsx/updateappuser';
import UpdateChargerdetails from './pages/updatechargerdetails';
import Feedbackfromlist from './pages/feedbackform/feedbackfromlist';
import Feedbackdetail from './pages/feedbackform/feedbackformdetail';
import Faqcreate from './pages/faqops/faqcreate';
import Faqlist from './pages/faqops/faqlist';
import Faqdetails from './pages/faqops/faqdetails';
import Faqupdate from './pages/faqops/faqupdate';
import Contactlist from './pages/contactops/contactlist';
import Contactdetails from './pages/contactops/contactdetails';

function App() {
  const location = useLocation();

  useEffect(() => {
    document.querySelector('html').style.scrollBehavior = 'auto'
    window.scroll({ top: 0 });
    document.querySelector('html').style.scrollBehavior = '';
  }, [location.pathname]); // Triggered on route change

  return (
    <>
      <ToastContainer />
      <Routes>
        <Route exact path="/" element={<Dashboard />} />
        <Route exact path='/signin' element={<Login />} />
        <Route exact path='/otpverify' element={<OTPVerify />} />
        <Route exact path="/addcharger" element={<AddCharger />} />
        <Route exact path='/listofcharger' element={<ChargerOperationsView />} />
        <Route exact path="/chargerdetails/:uid" element={<ChargerDetails />} />
        <Route exact path="/settings/:uid" element={<ChargerSettings />} />
        <Route exact path="/createnewuser" element={<AddNewuser />} />
        <Route exact path='/listofusers' element={<ListofUsers />} />
        <Route exact path="/userdetails/:uid" element={<SingleUserDetails />} />
        <Route exact path="/logretentionlist" element={<LogRetentionlist />} />
        <Route exact path="/addvehicle" element={<AddVehicle />} />
        <Route exact path='/listofvehicles' element={<ListofVehicles />} />
        <Route exact path="/listofdrivers" element={<ListOfDrivres />} />
        <Route exact path="/vehicleowenerdetails/:uid" element={<ShowDataByID />} />
        <Route exact path='/addhub' element={<AddHub />} />
        <Route exact path="/listofhubs" element={<ListofHubData />} />
        <Route exact path="/hubdetails/:uid" element={<HubDetails />} />
        <Route exact path='/addwallet' element={<AddWallet />} />
        <Route exact path='/totalrevenue' element={<TotalRevenue />} />
        <Route exact path='/updateprofiles' element={<UpdateProfile />} />
        <Route exact path='/addminbal' element={<AddMinimumBalance />} />
        <Route exact path="/liot" element={<ListOfTrans />} />
        <Route exact path="/td/:uid" element={<TD />} />
        <Route exact path='/forgotpassword' element={<ForgotPassword />} />
        <Route exact path='/listofappuser' element={<ListofAppUser />} />
        <Route exact path="/appuserdetails/:uid" element={<DetailsAppUser />} />
        <Route exact path='/logdetails/:id' element={<LogDetails />} />
        <Route exact path='/resetpassword' element={<ResetPassword />} />
        <Route exact path='/listofforms' element={<DisputeformList />} />
        <Route exact path='/disputeformdetails/:id' element={<DispuetformDetails />} />
        <Route exact path='/helpandsupport' element={<HelpandSupport />} />
        <Route exact path="/supportdetails/:uid" element={<HelpandSupportd/>}/>
        <Route exact path='/updateuser/:uid' element={<UpdateAppUser/>}/>
        <Route exact path='/updatechargerdetails/:uid' element={<UpdateChargerdetails/>} />
        <Route exact path="/listoffeedback" element={<Feedbackfromlist/>}/>
        <Route exact path='/feedbackdetails/:uid' element={<Feedbackdetail/>}/>
        <Route exact path='/faqcreate' element={<Faqcreate/>}/>
        <Route exact path="/faqlist" element={<Faqlist/>}/>
        <Route exact path='/faqdetails/:uid' element={<Faqdetails/>}/>
        <Route exact path='/faqupdate/:uid' element={<Faqupdate/>}/>
        <Route exact path='/contactlist' element={<Contactlist/>}/>
        <Route exact path='/contactdetails/:uid' element={<Contactdetails/>}/>
      </Routes>
    </>
  );
}

export default App;
