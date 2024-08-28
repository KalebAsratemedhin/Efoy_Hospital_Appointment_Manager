import Layout from "./components/Layout/Layout"
import Home from "./pages/Home"
import { Route, BrowserRouter as Router, Routes } from "react-router-dom"
import SignupPage from "./pages/Signup"
import SigninPage from "./pages/Signin"

function App() {

  return (
    <>
    <Router>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<Home />} />
          
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
