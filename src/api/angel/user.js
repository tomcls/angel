import axios from 'axios';

export default  function AngelUser(config) {
    const accessToken =  window.appStorage.getItem('token')?JSON.parse(window.appStorage.getItem('token')):null;
    let apiKey = process.env.REACT_APP_API_KEY;
    return {
        list: async (params) => {
            try {
                const res = await axios.post(process.env.REACT_APP_API_URL+'/users/list', params, {headers: {'Authorization':accessToken}});
                return res.data;
            } catch (error) {
                throw {error:error};
            }
        },
        update: async (params) => {
            try {
                const res = await axios.post(process.env.REACT_APP_API_URL+'/users/update', params, {headers: {'Authorization':accessToken}});
                return res.data;
            } catch (error) {
                console.log(error)
                throw {error:error};
            }
        },
        find: async (params) => {
            try {
                const res = await axios.post(process.env.REACT_APP_API_URL+'/users/get', params, {headers: {'Authorization':accessToken}});
                return res.data;
            } catch (error) {
                throw {error:error};
            }
        },
        add: async (params) => {
            try {
                const res = await axios.post(process.env.REACT_APP_API_URL+'/users/add', params, {headers: {'Authorization':accessToken}});
                return res.data;
            } catch (error) {
                throw {error:error};
            }
        },
        register: async (params) => {
            try {
                const res = await axios.post(process.env.REACT_APP_API_URL+'/users/add', params, {headers: {'apiKey':apiKey}});
                return res.data;
            } catch (error) {
                throw {error:error};
            }
        },
        login: async (params) => {
            try {
                const res = await axios.post(process.env.REACT_APP_API_URL+'/users/login', params, {headers: {'apiKey':apiKey}});
                return res.data;
            } catch (error) {
                throw {error:error};
            }
        },
        requestPwd: async (params) => {
            try {
                const res = await axios.post(process.env.REACT_APP_API_URL+'/users/request-password', params, {headers: {'apiKey':apiKey}});
                return res.data;
            } catch (error) {
                throw {error:error};
            }
        },
        resetPwd: async (params) => {
            try {
                const res = await axios.post(process.env.REACT_APP_API_URL+'/users/reset-password', params, {headers: {'apiKey':apiKey}});
                return res.data;
            } catch (error) {
                throw {error:error};
            }
        },
        checkAuth: async (hash) => {
            try {
                const res = await axios.get(process.env.REACT_APP_API_URL+'/users/check-auth', { headers: { 'Authorization': hash }});
                return res.data;
            } catch (error) {
                throw {error:error};
            }
        }
    }
}
