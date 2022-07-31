import './App.css';
import {Routes,Route} from "react-router-dom";
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';

import Login from "./pages/Login";
import Register from "./pages/Register";
import Thank from './pages/Thank';
import ContactUs from "./pages/ContactUs";
import Dashboard from "./pages/Dashboard";
import useMediaQuery from '@mui/material/useMediaQuery';
import Privacy from './pages/Privacy';
import RequestPassword from './pages/RequestPwd';
import ResetPassword from './pages/ResetPwd';
import Patients from './pages/Patients';
import DoctorsPage from './pages/Doctors';
import NursesPage from './pages/Nurses';
import ScientistsPage from './pages/Scientists';
import DrugsPage from './pages/Drugs';
import HospitalsPage from './pages/Hospitals';
import LaboratoriesPage from './pages/Laboratories';
import TreatmentsPage from './pages/Treatments';
import SideEffectsPage from './pages/SideEffects';
import MoodsPage from './pages/Moods';
import SurveysMoodsPage from './pages/SurveyMoods';
import Settings from './pages/Settings';
import { SnackbarProvider } from 'notistack';
import CoordinatorsPage from './pages/Coordinators';

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
      <Route path="/patients" element={<Patients />} />
      <Route path="/doctors" element={<DoctorsPage />} />
      <Route path="/nurses" element={<NursesPage />} />
      <Route path="/scientists" element={<ScientistsPage />} />
      <Route path="/coordinators" element={<CoordinatorsPage />} />
      <Route path="/drugs" element={<DrugsPage />} />
      <Route path="/laboratories" element={<LaboratoriesPage />} />
      <Route path="/hospitals" element={<HospitalsPage />} />
      <Route path="/treatments" element={<TreatmentsPage />} />
      <Route path="/side-effects" element={<SideEffectsPage />} />
      <Route path="/moods" element={<MoodsPage />} />
      <Route path="/survey-moods" element={<SurveysMoodsPage />} />
      <Route path="/settings" element={<SnackbarProvider maxSnack={3}><Settings /></SnackbarProvider>} />
    </Routes>
    </div>
  );
}

export default App;
