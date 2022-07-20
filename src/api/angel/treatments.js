import axios from 'axios';

export default  function AngelTreatment(config) {
    const accessToken =  window.appStorage.getItem('token')?JSON.parse(window.appStorage.getItem('token')):null;
    return {
        list: async (params) => {
            try {
                const res = await axios.post(process.env.REACT_APP_API_URL+'/treatments/list', params, {headers: {'Authorization':accessToken}});
                return res.data;
            } catch (error) {
                throw {error:error};
            }
        },
        update: async (params) => {
            try {
                const res = await axios.post(process.env.REACT_APP_API_URL+'/treatments/update', params, {headers: {'Authorization':accessToken}});
                return res.data;
            } catch (error) {
                console.log(error)
                throw {error:error};
            }
        },
        find: async (params) => {
            try {
                const res = await axios.post(process.env.REACT_APP_API_URL+'/treatments/get', params, {headers: {'Authorization':accessToken}});
                return res.data;
            } catch (error) {
                throw {error:error};
            }
        },
        add: async (params) => {
            try {
                const res = await axios.post(process.env.REACT_APP_API_URL+'/treatments/add', params, {headers: {'Authorization':accessToken}});
                return res.data;
            } catch (error) {
                throw {error:error};
            }
        },
        delete: async (params) => {
            try {
                const res = await axios.post(process.env.REACT_APP_API_URL+'/treatments/delete', params, {headers: {'Authorization':accessToken}});
                return res.data;
            } catch (error) {
                throw {error:error};
            }
        },
        addDescription: async (params) => {
            try {
                const res = await axios.post(process.env.REACT_APP_API_URL+'/treatment-descriptions/add', params, {headers: {'Authorization':accessToken}});
                return res.data;
            } catch (error) {
                throw {error:error};
            }
        },
        updateDescription: async (params) => {
            try {
                const res = await axios.post(process.env.REACT_APP_API_URL+'/treatment-descriptions/update', params, {headers: {'Authorization':accessToken}});
                return res.data;
            } catch (error) {
                throw {error:error};
            }
        },
        drugs: async (params) => {
            try {
                const res = await axios.post(process.env.REACT_APP_API_URL+'/treatments/drugs', params, {headers: {'Authorization':accessToken}});
                return res.data;
            } catch (error) {
                throw {error:error};
            }
        },
        addDrug: async (params) => {
            try {
                const res = await axios.post(process.env.REACT_APP_API_URL+'/treatments/add-drug', params, {headers: {'Authorization':accessToken}});
                return res.data;
            } catch (error) {
                throw {error:error};
            }
        },
        addPatient: async (params) => {
            try {
                const res = await axios.post(process.env.REACT_APP_API_URL+'/treatments/add-patient', params, {headers: {'Authorization':accessToken}});
                return res.data;
            } catch (error) {
                throw {error:error};
            }
        },
        patients: async (params) => {
            try {
                const res = await axios.post(process.env.REACT_APP_API_URL+'/treatments/patients', params, {headers: {'Authorization':accessToken}});
                return res.data;
            } catch (error) {
                throw {error:error};
            }
        }
    }
}
