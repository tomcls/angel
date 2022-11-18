import axios from 'axios';

export default  function AngelUser(config) {
    const accessToken =  localStorage.getItem('token')?JSON.parse(localStorage.getItem('token')):null;
    let apiKey = process.env.REACT_APP_API_KEY;
    return {
        list: async (params) => {
            try {
                const res = await axios.post(process.env.REACT_APP_API_URL+'/users/list', params, {headers: {'Authorization':accessToken}});
                return res.data;
            } catch (error) {
                throw error;
            }
        },
        coordinators: async (params) => {
            try {
                const res = await axios.post(process.env.REACT_APP_API_URL+'/users/coordinators', params, {headers: {'Authorization':accessToken}});
                return res.data;
            } catch (error) {
                throw error;
            }
        },
        update: async (params) => {
            try {
                const res = await axios.post(process.env.REACT_APP_API_URL+'/users/update', params, {headers: {'Authorization':accessToken}});
                return res.data;
            } catch (error) {
                console.log(error)
                throw error;
            }
        },
        delete: async (params) => {
            try {
                const res = await axios.post(process.env.REACT_APP_API_URL+'/users/delete', params, {headers: {'Authorization':accessToken}});
                return res.data;
            } catch (error) {
                console.log(error)
                throw error;
            }
        },
        find: async (params) => {
            try {
                const res = await axios.post(process.env.REACT_APP_API_URL+'/users/get', params, {headers: {'Authorization':accessToken}});
                return res.data;
            } catch (error) {
                throw error;
            }
        },
        add: async (params) => {
            try {
                const res = await axios.post(process.env.REACT_APP_API_URL+'/users/add', params, {headers: {'Authorization':accessToken}});
                return res.data;
            } catch (error) {
                throw error;
            }
        },
        register: async (params) => {
            try {
                const res = await axios.post(process.env.REACT_APP_API_URL+'/users/add', params, {headers: {'apiKey':apiKey}});
                return res.data;
            } catch (error) {
                throw error;
            }
        },
        login: async (params) => {
            try {
                const res = await axios.post(process.env.REACT_APP_API_URL+'/users/login', params, {headers: {'apiKey':apiKey}});
                return res.data;
            } catch (error) {
                throw error;
            }
        },
        requestPwd: async (params) => {
            try {
                const res = await axios.post(process.env.REACT_APP_API_URL+'/users/request-password', params, {headers: {'apiKey':apiKey}});
                return res.data;
            } catch (error) {
                throw error;
            }
        },
        resetPwd: async (params) => {
            try {
                const res = await axios.post(process.env.REACT_APP_API_URL+'/users/reset-password', params, {headers: {'apiKey':apiKey}});
                return res.data;
            } catch (error) {
                throw error;
            }
        },
        checkAuth: async (hash) => {
            try {
                const res = await axios.get(process.env.REACT_APP_API_URL+'/users/check-auth', { headers: { 'Authorization': hash }});
                console.log("zzzzz",res)
                return res;
            } catch (error) {
                throw error;
            }
        },
        upload: async (file,name,userId) => {
            try {
                const formData = new FormData();
                formData.append(name,file);
                formData.append('userId',userId);
                
                const res = await axios.post(process.env.REACT_APP_API_URL+'/users/upload',formData, {headers: {'Authorization':accessToken,'content-type': 'multipart/form-data'}});
                return res.data;
            } catch (error) {
                throw error;
            }
        }
    }
}
