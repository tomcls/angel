import React, { useContext } from "react";
import { Routes, Route, useNavigate, useLocation } from "react-router-dom";
import Login from "../pages/Login";
import Register from "../pages/Register";
import Thank from '../pages/Thank';
import ContactUs from "../pages/ContactUs";
import Dashboard from "../pages/Dashboard";
import Privacy from '../pages/Privacy';
import RequestPassword from '../pages/RequestPwd';
import ResetPassword from '../pages/ResetPwd';
import Patients from '../pages/Patients';
import DoctorsPage from '../pages/Doctors';
import NursesPage from '../pages/Nurses';
import ScientistsPage from '../pages/Scientists';
import DrugsPage from '../pages/Drugs';
import HospitalsPage from '../pages/Hospitals';
import LaboratoriesPage from '../pages/Laboratories';
import TreatmentsPage from '../pages/Treatments';
import SideEffectsPage from '../pages/SideEffects';
import MoodsPage from '../pages/Moods';
import SurveysMoodsPage from '../pages/SurveyMoods';
import Settings from '../pages/Settings';
import CoordinatorsPage from '../pages/Coordinators';
import SurveySideEffectsPage from '../pages/SurveySideEffects';
import NotificationsPage from '../pages/Notifications';
import { SnackbarProvider } from 'notistack';
import AppContext from "../contexts/AppContext";
import AngelUser from "../api/angel/user";

export default function Application(props) {
    const appContext = useContext(AppContext);
    const navigate = useNavigate();
    const location = useLocation();
    React.useEffect(() => {
        console.log(location.pathname+ ' == '+'/reset-password');

        if ((appContext.appState.user && appContext.appState.user.id) || location.pathname == '/reset-password' || location.pathname == '/request-password') {
            console.log('aaaaa')
            if(!checkAuth() && ( location.pathname != '/reset-password' || location.pathname != '/request-password')) {
                console.log('bbbbb')
                navigate('/login', { replace: true }); return; 
            }
            console.log('ddddd')
         } else {
            console.log('cccc')
            navigate('/login', { replace: true }); return;
        }
        
    }, [appContext]);
    const checkAuth = async () => {
        try {
            const token = await AngelUser().checkAuth(appContext.appState.token);
            console.log('token',token);
            if(!token) {
                return false;
            } else {
                return true
            }
        } catch (e) {
            console.log('error',e)
            localStorage.removeItem("user");
            localStorage.removeItem("token");
            return false;
        }
    }
    return (
        <div className="App" >
            <Routes>
                <Route path="/" element={<Patients />} />
                <Route path="/notifications" element={<NotificationsPage />} />
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
                <Route path="/survey-effects" element={<SurveySideEffectsPage />} />
                <Route path="/settings" element={<SnackbarProvider maxSnack={3}><Settings /></SnackbarProvider>} />
            </Routes>
        </div>
    )
}