import { useDispatch, useSelector } from "react-redux"
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import { authSelector, getAuth } from "./redux/slices/authSlice"
import { useEffect } from "react"

import Layout from "./components/Layout/Layout"
import Home from "./pages/Home"
import SignupPage from "./pages/Signup"
import SigninPage from "./pages/Signin"
import DashboardPage from "./pages/Dashboard"
import NotFound from "./components/utils/NotFound"
import Settings from "./pages/Settings"
import Doctors from "./pages/Doctors"
import BookingPage from "./pages/Book"
import Appointments from "./pages/Appointments"
import BookingDetails from "./components/appointments/BookingDetails"
import DoctorDetails from "./components/doctors/DoctorDetails"
import ContactPage from "./pages/Contact"
import AboutPage from "./pages/About"
import GoogleAuth from "./pages/GoogleAuth"
import AuthSetup from "./components/auth/AuthSetup"

const AppRoutes = () => {
    const dispatch = useDispatch()
    const authState = useSelector(authSelector)
  
    useEffect(() => {
      if(!authState.username)
        dispatch(getAuth())  
  
    }, [getAuth, authState])


 
    
    return (
      <>
      <Router>
          <Routes>
            
           {/* {authState.username && 
            
           } */}
            <Route path="/signup" element={<SignupPage />} />
            <Route path="/signin" element={<SigninPage />} />

            <Route element={<Layout />}>
                <Route path="/" element={<Home />} />
                <Route path="/about" element={<AboutPage />} />
                <Route path="/contact" element={<ContactPage />} />
                <Route path="/google-auth" element={<GoogleAuth />} />

                <Route element={<AuthSetup />}>
                    <Route path="/dashboard" element={<DashboardPage />} />
                    <Route path="/settings" element={<Settings />} />
                    <Route path="/doctors" element={<Doctors />} />
                    <Route path="/doctors/:id" element={<DoctorDetails />} />

                    <Route path="/book/:id" element={<BookingPage />} />
                    <Route path="/appointments" element={<Appointments />} />
                    <Route path="/appointments/:id" element={<Appointments />} />

                </Route>




            </Route>

            <Route path="*" element={<NotFound />} />
          </Routes>
          
        </Router>
      </>
    )
  }

  export default AppRoutes;