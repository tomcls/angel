import axios from 'axios';

export default  function AngelDoctor(config) {
    const accessToken =  localStorage.getItem('token')?JSON.parse(localStorage.getItem('token')):null;
    return {
        list: async (params) => {
            try {
                const res = await axios.post(process.env.REACT_APP_API_URL+'/doctors/list', params, {headers: {'Authorization':accessToken}});
                return res.data;
            } catch (error) {
                throw new Error(error);
            }
        },
        update: async (params) => {
            try {
                const res = await axios.post(process.env.REACT_APP_API_URL+'/doctors/update', params, {headers: {'Authorization':accessToken}});
                return res.data;
            } catch (error) {
                throw new error(error);
            }
        },
        find: async (params) => {
            try {
                const res = await axios.post(process.env.REACT_APP_API_URL+'/doctors/get', params, {headers: {'Authorization':accessToken}});
                return res.data;
            } catch (error) {
                throw new error(error);
            }
        },
        add: async (params) => {
            try {
                const res = await axios.post(process.env.REACT_APP_API_URL+'/doctors/add', params, {headers: {'Authorization':accessToken}});
                return res.data;
            } catch (error) {
                throw new error(error);
            }
        },
        patients: async (params) => {
            try {
                const res = await axios.post(process.env.REACT_APP_API_URL+'/doctors/patients', params, {headers: {'Authorization':accessToken}});
                return res.data;
            } catch (error) {
                throw new error(error);
            }
        },
        delete: async (params) => {
            try { //nurses/unlink-patient
                const res = await axios.post(process.env.REACT_APP_API_URL+'/doctors/delete', params, {headers: {'Authorization':accessToken}});
                return res.data;
            } catch (error) {
                throw new error(error);
            }
        },
        addPatient: async (params) => {
            try {
                const res = await axios.post(process.env.REACT_APP_API_URL+'/doctors/add-patient', params, {headers: {'Authorization':accessToken}});
                return res.data;
            } catch (error) {
                throw new error(error);
            }
        },
        unlinkPatient: async (params) => {
            try { //nurses/unlink-patient
                const res = await axios.post(process.env.REACT_APP_API_URL+'/doctors/unlink-patient', params, {headers: {'Authorization':accessToken}});
                return res.data;
            } catch (error) {
                throw new error(error);
            }
        },
        getDoctors: async (params) => {
            try {
                const res = await axios.post(process.env.REACT_APP_API_URL+'/doctors/doctors', params, {headers: {'Authorization':accessToken}});
                return res.data;
            } catch (error) {
                throw new error(error);
            }
        }
    }
}
