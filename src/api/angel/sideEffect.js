import axios from 'axios';

export default  function AngelSideEffect(config) {
    const accessToken =  window.appStorage.getItem('token')?JSON.parse(window.appStorage.getItem('token')):null;
    return {
        list: async (params) => {
            try {
                const res = await axios.post(process.env.REACT_APP_API_URL+'/side-effects/list', params, {headers: {'Authorization':accessToken}});
                return res.data;
            } catch (error) {
                throw {error:error};
            }
        },
        update: async (params) => {
            try {
                const res = await axios.post(process.env.REACT_APP_API_URL+'/side-effects/update', params, {headers: {'Authorization':accessToken}});
                return res.data;
            } catch (error) {
                console.log(error)
                throw {error:error};
            }
        },
        find: async (params) => {
            try {
                const res = await axios.post(process.env.REACT_APP_API_URL+'/side-effects/get', params, {headers: {'Authorization':accessToken}});
                return res.data;
            } catch (error) {
                throw {error:error};
            }
        },
        search: async (params) => {
            try {
                const res = await axios.post(process.env.REACT_APP_API_URL+'/side-effects/search', params, {headers: {'Authorization':accessToken}});
                return res.data;
            } catch (error) {
                throw {error:error};
            }
        },
        add: async (params) => {
            try {
                const res = await axios.post(process.env.REACT_APP_API_URL+'/side-effects/add', params, {headers: {'Authorization':accessToken}});
                return res.data;
            } catch (error) {
                throw {error:error};
            }
        },
        delete: async (params) => {
            try {
                const res = await axios.post(process.env.REACT_APP_API_URL+'/side-effects/delete', params, {headers: {'Authorization':accessToken}});
                return res.data;
            } catch (error) {
                throw {error:error};
            }
        },
        addDescription: async (params) => {
            try {
                const res = await axios.post(process.env.REACT_APP_API_URL+'/side-effect-descriptions/add', params, {headers: {'Authorization':accessToken}});
                return res.data;
            } catch (error) {
                throw {error:error};
            }
        },
        updateDescription: async (params) => {
            try {
                const res = await axios.post(process.env.REACT_APP_API_URL+'/side-effect-descriptions/update', params, {headers: {'Authorization':accessToken}});
                return res.data;
            } catch (error) {
                throw {error:error};
            }
        }
    }
}
