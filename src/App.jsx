import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Host from './components/Host/Host'
import Navbar from './components/Navbar/Navbar'
import Home from './pages/Home'
import SingleEvn from "./pages/Single_evn/SingleEvn";
import Allevents from "./pages/Allevents";
import { useState } from "react";
import Login from './pages/Login';
import Profile from './pages/Profile';
import EventMap from './pages/EventMap';
import RefreshHandler from './RefreshHandler';
import LinearProgress from '@mui/material/LinearProgress';
import Box from '@mui/material/Box';
import Viewprofile from "./pages/Single_evn/Viewprofile";
import AboutPage from "./pages/Aboutpage";

function App() {
  const [loading, setLoading] = useState(false);
  const [type, settype] = useState('all');
  const [city, setcity] = useState('all');

  function handlecity(selectedcity) {
    setLoading(true); // Start loading
    setTimeout(() => {
      setLoading(false); // Stop loading
    }, 2000);
    setcity(selectedcity);
  }

  function handletype(selectedtype) {
    setLoading(true); // Start loading
    setTimeout(() => {
      setLoading(false); // Stop loading
    }, 2000);
    settype(selectedtype);
  }

  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const PrivateRoute = ({ element }) => {
    return isAuthenticated ? element : <Navigate to="/Login" />;
  };
  return (
    <Router>
      {isAuthenticated && <Navbar />}
      {loading && (
        <Box sx={{ width: '100%' }}>
          <LinearProgress />
        </Box>
      )}
      <RefreshHandler setIsAuthenticated={setIsAuthenticated} />
      <Routes>
        {/* <Route path='/' element={<Home />} /> */}
        <Route path="/" element={<Navigate to="/Login" />} />
        <Route path="/Login" element={<Login />} />
        <Route path="/Home" element={<PrivateRoute element={<Home />} />} />
        <Route path="/Profile" element={<PrivateRoute element={<Profile />} />} />
        <Route path="/About" element={<PrivateRoute element={<AboutPage />} />} />
        <Route path="/EventMap" element={<PrivateRoute element={<EventMap />} />} />
        <Route path='/host' element={<PrivateRoute element={<Host />} />} />
        <Route path='/events/by_type/:type/:city' element={<PrivateRoute element={<Allevents type = {type} handletype = {handletype} city = {city} handlecity = {handlecity} />} />} />
        <Route path="/view_profile/:username" element={<PrivateRoute element={<Viewprofile />} />} />
        <Route path='/events/by_id/:id' element={<PrivateRoute element={<SingleEvn />} />} />
      </Routes>
    </Router>
  )
}

export default App
