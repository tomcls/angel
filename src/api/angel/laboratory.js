import axios from 'axios';

export default  function AngelLaboratory(config) {
    const accessToken =  window.appStorage.getItem('token')?JSON.parse(window.appStorage.getItem('token')):null;
    let apiKey = process.env.REACT_APP_API_KEY;
    return {
        list: async (params) => {
            try {
                const res = await axios.post(process.env.REACT_APP_API_URL+'/laboratories/list', params, {headers: {'Authorization':accessToken}});
                return res.data;
            } catch (error) {
                throw {error:error};
            }
        },
        update: async (params) => {
            try {
                const res = await axios.post(process.env.REACT_APP_API_URL+'/laboratories/update', params, {headers: {'Authorization':accessToken}});
                return res.data;
            } catch (error) {
                console.log(error)
                throw {error:error};
            }
        },
        find: async (params) => {
            try {
                const res = await axios.post(process.env.REACT_APP_API_URL+'/laboratories/get', params, {headers: {'Authorization':accessToken}});
                return res.data;
            } catch (error) {
                throw {error:error};
            }
        },
        add: async (params) => {
            try {
                const res = await axios.post(process.env.REACT_APP_API_URL+'/laboratories/add', params, {headers: {'Authorization':accessToken}});
                return res.data;
            } catch (error) {
                throw {error:error};
            }
        },
        delete: async (params) => {
            try {
                const res = await axios.post(process.env.REACT_APP_API_URL+'/laboratories/delete', params, {headers: {'Authorization':accessToken}});
                return res.data;
            } catch (error) {
                throw {error:error};
            }
        }
    }
}
