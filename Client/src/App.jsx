import React from 'react'
import LandingPage from './components/LandingPage/LandingPage'
import { Box, ThemeProvider, createTheme } from '@mui/material';
import { Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar/Navbar';
import Contact from './components/LandingPage/Contact';
import ParentSiginIn from './components/Parent/ParentSiginIn';
import ParentLogin from './components/Parent/ParentLogin';
import ParentForgotPassword from './components/Parent/ParentForgotPassword';
import ParentResetPassword from './components/Parent/ParentResetPassword';
import AdminLogin from './components/Admin/AdminLogin';
import AdminDashboard from './components/Admin/AdminDashboard';
import AdminViewEducator from './components/Admin/AdminViewEducator';
import EducatorRegistration from './components/Educator/EducatorRegistration';
import EducatorLogin from './components/Educator/EducatorLogin';
import EducatorForgotPassword from './components/Educator/EducatorForgotPassword';
import EducatorResetPassword from './components/Educator/EducatorResetPassword';
import EducatorPersonal from './components/Educator/EducatorPersonal';
import TheraphistRegistration from './components/Theraphist/TheraphistRegistration';
import TheraphistLogin from './components/Theraphist/TheraphistLogin';
import TheraphistForgot from './components/Theraphist/TheraphistForgot';
import TheraphistRest from './components/Theraphist/TheraphistRest';
import TheraphistPersonal from './components/Theraphist/TheraphistPersonal';
import AboutUs from './components/LandingPage/AboutUs';
import { ToastContainer } from 'react-toastify';
import ParentHome from './components/Parent/ParentHome';
import ParentProfile from './components/Parent/ParentProfile';
import ParentAboutUs from './components/Parent/ParentAboutUs';
import ParentContactUs from './components/Parent/ParentContactUs';
import EducatorHome from './components/Educator/EducatorHome';
import EducatorProfile from './components/Educator/EducatorProfile';
import EducatorAbout from './components/Educator/EducatorAbout';
import EducatorContact from './components/Educator/EducatorContact';
import TheraphistHome from './components/Theraphist/TheraphistHome';
import TheraphistAbout from './components/Theraphist/TheraphistAbout';
import TheraphistContact from './components/Theraphist/TheraphistContact';
import TheraphistProfile from './components/Theraphist/TheraphistProfile';
import ParentChildProfile from './components/Parent/ParentChildProfile';
import EducatorAllStudents from './components/Educator/EducatorAllStudents';
import EducatorAddLearningPlan from './components/Educator/EducatorAddLearningPlan';
import ParentAllEducator from './components/Parent/ParentAllEducator';
import ParentAllTheraphist from './components/Parent/ParentAllTheraphist';
import AdminViewTheraphist from './components/Admin/AdminViewTheraphist';
import AdminViewParent from './components/Admin/AdminViewParent';
import EducatorParentRequest from './components/Educator/EducatorParentRequest';
import EducatorAcceptedParents from './components/Educator/EducatorAcceptedParents';
import EducatorChat from './components/Educator/EducatorChat';
import ParentLearningPlan from './components/Parent/ParentLearningPlan';
import ParentTheraphistLearning from './components/Parent/ParentTheraphistLearning';
import ParentEducatorLearning from './components/Parent/ParentEducatorLearning';
import ParentMeeting from './components/Parent/ParentMeeting';
import EducatorViewLearningPlan from './components/Educator/EducatorViewLearningPlan';
import EducatorEditLearningPlan from './components/Educator/EducatorEditLearningPlan';
import EducatorMeeting from './components/Educator/EducatorMeeting';
import AddActivity from './components/Admin/AddActivity';
import AdminViewActivityLibrary from './components/Admin/AdminViewActivityLibrary';
import AdminEditActivity from './components/Admin/AdminEditActivity';
import ParentActivities from './components/Parent/ParentActivities';
import ParentChat from './components/Parent/ParentChat';
import EducatorViewActivityLibrary from './components/Educator/EducatorViewActivityLibrary';
import TherapistAllStudents from './components/Theraphist/TherapistAllStudents';
import TherapistAddLearningPlan from './components/Theraphist/TherapistAddLearningPlan';
import TherapistEditLearningPlan from './components/Theraphist/TherapistEditLearningPlan';
import TherapistMeeting from './components/Theraphist/TherapistMeeting';
import TherapistViewLearningPlan from './components/Theraphist/TherapistViewLearningPlan';
import TherapistAcceptedParents from './components/Theraphist/TherapistAcceptedParents';
import TherapistParentRequest from './components/Theraphist/TherapistParentRequest';
import TherapistViewActivityLibrary from './components/Theraphist/TherapistViewActivityLibrary';
import TherapistChat from './components/Theraphist/TherapistChat';

const App = () => {
  const theme = createTheme({
    palette: {
      primary: {
        main: '#384371', // Setrgb(33, 167, 48) as the primary color
      },
      secondary: {
        main: '#1967D2', // Optional: customize secondary color
      },
    },
  });
  return (
    <>
    
    <ToastContainer/>
      <ThemeProvider theme={theme}>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path='/contact' element={<Contact />} />
          <Route path='/aboutus' element={<AboutUs />} />

          {/* parents */}
          <Route path='/parent/siginin' element={<ParentSiginIn />} />
          <Route path='/parent/login' element={<ParentLogin />} />
          <Route path='/parent/forgotpassword' element={<ParentForgotPassword />} />
          <Route path='/parent/resetpassword/:email' element={<ParentResetPassword/>}/>
          <Route path='/parent/home' element={<ParentHome/>}/>
          <Route path='/parent/profile' element={<ParentProfile/>}/>
          <Route path='/parent/about' element={<ParentAboutUs/>}/>
          <Route path='/parent/contact' element={<ParentContactUs/>}/>
          <Route path='/parent/childprofile' element={<ParentChildProfile/>}/>
          <Route path='/parent/viewalleducators' element={<ParentAllEducator/>}/>
          <Route path='/parent/viewalltheraphist' element={<ParentAllTheraphist/>}/>
          <Route path='/parent/learningplan' element={<ParentLearningPlan/>}/>
          <Route path='/parent/therapistlearningplan/:therapistId/:childId' element={<ParentTheraphistLearning/>}/>
          <Route path='/parent/educatorlearningplan/:educatorId/:childId' element={<ParentEducatorLearning/>}/>
          <Route path='/parent/meeting' element={<ParentMeeting/>}/>
          <Route path='/parent/activites' element={<ParentActivities/>}/>
          <Route path='/parent/chat/:id' element={<ParentChat/>}/>
          <Route path="/parent/chat" element={<ParentChat />} />

          {/* admin */}
          <Route path='/admin/login' element={<AdminLogin />} />
          <Route path='/admin/dashboard' element={<AdminDashboard />} />
          <Route path='/admin/viewEducator' element={<AdminViewEducator />} />
          <Route path='/admin/viewtheraphist' element={<AdminViewTheraphist />} />
          <Route path='/admin/viewparent' element={<AdminViewParent />} />
          <Route path='/admin/addactivity' element={<AddActivity />} />
          <Route path='/admin/viewactivitylibrary' element={<AdminViewActivityLibrary/>}/>
<Route path="/admin/editactivity/:id" element={<AdminEditActivity />} />

          {/* educator */}
          <Route path='/educator/registration' element={<EducatorRegistration />} />
          <Route path='/educator/login' element={<EducatorLogin />} />
          <Route path='/educator/forgotpassword' element={<EducatorForgotPassword />} />
          <Route path='/educator/resetpassword/:email' element={<EducatorResetPassword />} />
          <Route path='/educator/personalinfo' element={<EducatorPersonal />} />
          <Route path='/educator/home' element={<EducatorHome />} />
          <Route path='/educator/profile' element={<EducatorProfile/>} />
          <Route path='/educator/about' element={<EducatorAbout/>} />
          <Route path='/educator/contact' element={<EducatorContact/>} />
          <Route path='/educator/allstudents' element={<EducatorAllStudents/>} />
          <Route path='/educator/addlearningplan/:childId' element={<EducatorAddLearningPlan/>} />
          <Route path='/educator/editlearningplan/:childId' element={<EducatorEditLearningPlan/>} />
          <Route path='/educator/parentsrequest' element={<EducatorParentRequest/>} />
          <Route path='/educator/acceptedparents' element={<EducatorAcceptedParents/>} />
      <Route path='/educator/chat' element={<EducatorChat />} />
      <Route path='/educator/chat/:id' element={<EducatorChat />} />
          <Route path='/educator/viewlearningplan/:childId' element={<EducatorViewLearningPlan/>} />
          <Route path='/educator/meeting' element={<EducatorMeeting/>} />
          <Route path='/educator/viewactivitylibrary' element={<EducatorViewActivityLibrary/>}/>



          {/* theraphist */}
          <Route path='/theraphist/registration' element={<TheraphistRegistration />} />
          <Route path='/theraphist/login' element={<TheraphistLogin />} />
          <Route path='/theraphist/forgotpassword' element={<TheraphistForgot />} />
          <Route path='/theraphist/resetpassword/:email' element={<TheraphistRest/>} />
          <Route path='/theraphist/personalinfo' element={<TheraphistPersonal/>} />
          <Route path='/theraphist/home' element={<TheraphistHome />} />
          <Route path='/therapist/profile' element={<TheraphistProfile/>} />
          <Route path='/theraphist/about' element={<TheraphistAbout/>} />
          <Route path='/theraphist/contact' element={<TheraphistContact/>} />
          <Route path='/therapist/allstudents' element={<TherapistAllStudents/>} />
          <Route path='/therapist/meeting' element={<TherapistMeeting/>}/>
          <Route path='/therapist/addlearningplan/:childId' element={<TherapistAddLearningPlan/>} />
          <Route path='/therapist/editlearningplan/:childId' element={<TherapistEditLearningPlan/>} />
          <Route path='/therapist/viewlearningplan/:childId' element={<TherapistViewLearningPlan/>} />
          <Route path='/therapist/acceptedparents' element={<TherapistAcceptedParents/>}/>
          <Route path='/therapist/parentsrequest' element={<TherapistParentRequest/>}/>
          <Route path='/therapist/viewactivitylibrary' element={<TherapistViewActivityLibrary />} />
                    <Route path='/therapist/chat/:id' element={<TherapistChat/>}/>
          <Route path="/therapist/chat" element={<TherapistChat />} />

        </Routes>
      </ThemeProvider>
      
    </>
  )
}

export default App
