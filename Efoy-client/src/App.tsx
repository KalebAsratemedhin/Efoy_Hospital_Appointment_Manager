import Layout from "./components/Layout/Layout"
import Home from "./pages/Home"
import { Route, BrowserRouter as Router, Routes } from "react-router-dom"

function App() {

  return (
    <>
    <Router>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<Home />} />
          <Route path="/signup" element={<Home />} />
          <Route path="/signin" element={<Home />} />
 
        </Route>
      </Routes>
      

    </Router>

    {/* <Layout >
      <Home />
    </Layout> */}
    </>
  )
}

export default App
