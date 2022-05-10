import axios from 'axios';

export default  function AngelUser() {
    let apiKey = process.env.REACT_APP_API_KEY;
    return {
        find: async (params) => {
            console.log('get user',params);
            try {
                const res = await axios.post(process.env.REACT_APP_API_URL+'/users/get', params, {headers: {'apiKey':apiKey}});
                return res.data;
            } catch (error) {
                return {error:error};
            }
        },
        register: async (params) => {
            console.log('====>register',params,process.env.REACT_APP_API_URL+'/users/add');
            try {
                const res = await axios.post(process.env.REACT_APP_API_URL+'/users/add', params, {headers: {'apiKey':apiKey}});
                return res.data;
            } catch (error) {
                return {error:error};
            }
        },
        login: async (params) => {
            console.log('====>login',params,process.env.REACT_APP_API_URL+'/users/login');
            try {
                const res = await axios.post(process.env.REACT_APP_API_URL+'/users/login', params, {headers: {'apiKey':apiKey}});
                return res.data;
            } catch (error) {
                return {error:error};
            }
        },
        requestPwd: async (params) => {
            console.log('requestPwd',params);
            try {
                const res = await axios.post(process.env.REACT_APP_API_URL+'/users/request-password', params, {headers: {'apiKey':apiKey}});
                return res.data;
            } catch (error) {
                return {error:error};
            }
        },
        resetPwd: async (params) => {
            console.log('resetPwd',params);
            try {
                const res = await axios.post(process.env.REACT_APP_API_URL+'/users/reset-password', params, {headers: {'apiKey':apiKey}});
                return res.data;
            } catch (error) {
                return {error:error};
            }
        }
    }
}
