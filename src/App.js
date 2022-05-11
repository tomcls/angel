import './App.css';
import {
  Routes,
  Route,
} from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Thank from './pages/Thank';
import ContactUs from "./pages/ContactUs";
import Dashboard from "./pages/Dashboard";
import useMediaQuery from '@mui/material/useMediaQuery';
import Privacy from './pages/Privacy';
import RequestPassword from './pages/RequestPwd';
import ResetPassword from './pages/ResetPwd';

function App() {
  const matches = useMediaQuery('(max-width:970px)');

  return (
    <div className="App" style={{marginBlock:matches?"80px":"0px"}}>
      <Routes>
      <Route path="/" element={<Dashboard />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/register" element={<Register />} />
      <Route path="/thank" element={<Thank />} />
      <Route path="/request-password" element={<RequestPassword />} />
      <Route path="/reset-password" element={<ResetPassword />} />
      <Route path="/contact" element={<ContactUs />} />
      <Route path="/privacy" element={<Privacy />} />
      <Route path="/login" element={<Login />} />
    </Routes>
    </div>
  );
}

export default App;
