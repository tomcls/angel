import axios from 'axios';

export default  function AngelDrug(config) {
    const accessToken =  window.appStorage.getItem('token')?JSON.parse(window.appStorage.getItem('token')):null;
    return {
        list: async (params) => {
            try {
                const res = await axios.post(process.env.REACT_APP_API_URL+'/drugs/list', params, {headers: {'Authorization':accessToken}});
                return res.data;
            } catch (error) {
                throw new error(error);
            }
        },
        update: async (params) => {
            try {
                const res = await axios.post(process.env.REACT_APP_API_URL+'/drugs/update', params, {headers: {'Authorization':accessToken}});
                return res.data;
            } catch (error) {
                console.log(error)
                throw new error(error);
            }
        },
        find: async (params) => {
            try {
                const res = await axios.post(process.env.REACT_APP_API_URL+'/drugs/get', params, {headers: {'Authorization':accessToken}});
                return res.data;
            } catch (error) {
                throw new error(error);
            }
        },
        search: async (params) => {
            try {
                const res = await axios.post(process.env.REACT_APP_API_URL+'/drugs/search', params, {headers: {'Authorization':accessToken}});
                return res.data;
            } catch (error) {
                throw new error(error);
            }
        },
        add: async (params) => {
            try {
                const res = await axios.post(process.env.REACT_APP_API_URL+'/drugs/add', params, {headers: {'Authorization':accessToken}});
                return res.data;
            } catch (error) {
                throw new error(error);
            }
        },
        delete: async (params) => {
            try {
                const res = await axios.post(process.env.REACT_APP_API_URL+'/drugs/delete', params, {headers: {'Authorization':accessToken}});
                return res.data;
            } catch (error) {
                throw new error(error);
            }
        },
        addDescription: async (params) => {
            try {
                const res = await axios.post(process.env.REACT_APP_API_URL+'/drug-descriptions/add', params, {headers: {'Authorization':accessToken}});
                return res.data;
            } catch (error) {
                throw new error(error);
            }
        },
        updateDescription: async (params) => {
            try {
                const res = await axios.post(process.env.REACT_APP_API_URL+'/drug-descriptions/update', params, {headers: {'Authorization':accessToken}});
                return res.data;
            } catch (error) {
                throw new error(error);
            }
        },
        addPatient: async (params) => {
            try {
                const res = await axios.post(process.env.REACT_APP_API_URL+'/drugs/add-patient', params, {headers: {'Authorization':accessToken}});
                return res.data;
            } catch (error) {
                throw new error(error);
            }
        },
        updatePatient: async (params) => {
            try {
                const res = await axios.post(process.env.REACT_APP_API_URL+'/drugs/update-patient', params, {headers: {'Authorization':accessToken}});
                return res.data;
            } catch (error) {
                throw new error(error);
            }
        },
        patients: async (params) => {
            try {
                const res = await axios.post(process.env.REACT_APP_API_URL+'/drugs/patients', params, {headers: {'Authorization':accessToken}});
                return res.data;
            } catch (error) {
                throw new error(error);
            }
        },
        getUserDrugs: async (params) => {
            try {
                const res = await axios.post(process.env.REACT_APP_API_URL+'/drugs/user-drugs', params, {headers: {'Authorization':accessToken}});
                return res.data;
            } catch (error) {
                throw new error(error);
            }
        },
        upload: async (file,name,drugId) => {
            try {
                const formData = new FormData();
                formData.append(name,file);
                formData.append('drugId',drugId);
                
                const res = await axios.post(process.env.REACT_APP_API_URL+'/drugs/upload',formData, {headers: {'Authorization':accessToken,'content-type': 'multipart/form-data'}});
                return res.data;
            } catch (error) {
                throw new error(error);
            }
        },
        notice: async (file,name,id) => {
            try {
                const formData = new FormData();
                formData.append(name,file);
                formData.append('descriptionId',id);
                
                const res = await axios.post(process.env.REACT_APP_API_URL+'/drugs/notice',formData, {headers: {'Authorization':accessToken,'content-type': 'multipart/form-data'}});
                return res.data;
            } catch (error) {
                throw new error(error);
            }
        }
    }
}
