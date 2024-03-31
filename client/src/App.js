import React  from 'react';
import {  Route, Routes } from 'react-router-dom';
import './App.css';
import Login from './Pages/Login';
import ForgetPassword from './Pages/ForgetPassword';
import ChangePw from './Pages/ChangePw';


import axios from 'axios';



import NewCandidateCreateAccount from './Pages/NewCandidateCreateAccount';
import {Toaster} from 'react-hot-toast'

import Admindash from './Pages/admin/Admindash';
import RecruiterDash from './Pages/recruiter/RecruiterDash';
import Interviewerdash from './Pages/interviewer/Interviewerdash';
import Hiringmanagerdash from './Pages/hiring manager/Hiringmanagerdash';
import Candidatedash from './Pages/candidate/Candidatedash';
import Register from './Pages/Register';
import UserContextProvider from './Context/UserContext';
import CreateNewUser from './Pages/admin/CreateNewUser'
import ModifyUserAccount from './Pages/admin/ModifyUserAccount';

import RoleAssignment from './Pages/admin/RoleAssignment';
import AccessControl from './Pages/admin/AccessControl';
import SystemSettings from './Pages/admin/SystemSettings';
import DeleteUserAccount from './Pages/admin/DeleteUserAccount';

import RecruiterLayout from './Components/recruitercomp/RecruiterLayout';
import JobPosting from './Pages/recruiter/JobPosting';
import CandidateCommunication from './Pages/recruiter/CandidateCommunication';
import ApplicationManagement from './Pages/recruiter/ApplicationManagement';
import CandidateAssessment from './Pages/recruiter/CandidateAssessment';
import Message from './Pages/recruiter/Message';

axios.defaults.baseURL = 'http://localhost:8000';
axios.defaults.withCredentials = true



function App() {

  
  return (
    <div className="App">

      <UserContextProvider>
      <Toaster position='bottom-right' toastOptions={{duration: 3000}}></Toaster>
      
        <Routes>
          
          <Route  path='/'element={<Login/>}> </Route>
          <Route  path='/forget'element={<ForgetPassword/>}> </Route>
          <Route  path='/changepassword'element={<ChangePw/>}> </Route>
          <Route  path='/createNewAccount'element={<NewCandidateCreateAccount/>}> </Route>
          <Route  path='/register'element={ <Register/>}> </Route>
          
          <Route path='/admindash' element={<Admindash/> }></Route>
         
          <Route path='/recruiterdash' element={<RecruiterLayout />}>
            <Route index element={<RecruiterDash />} />
            <Route path="JobPosting" element={<JobPosting />} />
            <Route path="CandidateCommunication" element={<CandidateCommunication />} />
            <Route path="ApplicationManagement" element={<ApplicationManagement />} />
            <Route path="CandidateAssessment" element={<CandidateAssessment />} />
            <Route path="Message" element={<Message />} />
          </Route>
          <Route path='/interviewerdash' element={<Interviewerdash/>}></Route>
          <Route path='/hiringmanagerdash'element={<Hiringmanagerdash/>}></Route>
          <Route path='/candidatedash' element={<Candidatedash/>}></Route>

          <Route path='/admincreateuser' element={<CreateNewUser/>}/>
          <Route path='/adminmodifyuser' element={<ModifyUserAccount/>}/>
          <Route path='/admindeleteuser' element={<DeleteUserAccount/>}/>
          <Route path='/adminroleassignment' element={<RoleAssignment/>}/>
          <Route path='/adminaccesscontrol' element={<AccessControl/>}/>
          <Route path='/adminsystemsettings' element={<SystemSettings/>}/>
  
        </Routes>

        </UserContextProvider>
      

      
    </div>
  );
}

export default App;




