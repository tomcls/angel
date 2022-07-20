import axios from 'axios';

export default  function AngelHospital(config) {
    const accessToken =  window.appStorage.getItem('token')?JSON.parse(window.appStorage.getItem('token')):null;
    let apiKey = process.env.REACT_APP_API_KEY;
    return {
        list: async (params) => {
            try {
                const res = await axios.post(process.env.REACT_APP_API_URL+'/hospitals/list', params, {headers: {'Authorization':accessToken}});
                return res.data;
            } catch (error) {
                throw {error:error};
            }
        },
        update: async (params) => {
            try {
                const res = await axios.post(process.env.REACT_APP_API_URL+'/hospitals/update', params, {headers: {'Authorization':accessToken}});
                return res.data;
            } catch (error) {
                console.log(error)
                throw {error:error};
            }
        },
        find: async (params) => {
            try {
                const res = await axios.post(process.env.REACT_APP_API_URL+'/hospitals/get', params, {headers: {'Authorization':accessToken}});
                return res.data;
            } catch (error) {
                throw {error:error};
            }
        },
        add: async (params) => {
            try {
                const res = await axios.post(process.env.REACT_APP_API_URL+'/hospitals/add', params, {headers: {'Authorization':accessToken}});
                return res.data;
            } catch (error) {
                throw {error:error};
            }
        },
        delete: async (params) => {
            try {
                const res = await axios.post(process.env.REACT_APP_API_URL+'/hospitals/delete', params, {headers: {'Authorization':accessToken}});
                return res.data;
            } catch (error) {
                throw {error:error};
            }
        }
    }
}
