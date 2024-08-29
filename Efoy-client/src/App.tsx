import Layout from "./components/Layout/Layout"
import Home from "./pages/Home"
import { Route, BrowserRouter as Router, Routes } from "react-router-dom"
import SignupPage from "./pages/Signup"
import SigninPage from "./pages/Signin"
import DashboardPage from "./pages/Dashboard"
import DoctorDashboard from "./components/dashboard/Doctor"

function App() {

  return (
    <>
    <Router>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<Home />} />
          <Route path="/dashboard" element={<DashboardPage />} />
          <Route path="/doc-dashboard" element={<DoctorDashboard />} />


  
        </Route>
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/signin" element={<SigninPage />} />
      </Routes>
      

    </Router>

    {/* <Layout >
      <Home />
    </Layout> */}
    </>
  )
}

export default App
