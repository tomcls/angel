import axios from 'axios';

export default  function AngelMood(config) {
    const accessToken =  localStorage.getItem('token')?JSON.parse(localStorage.getItem('token')):null;
    return {
        list: async (params) => {
            try {
                const res = await axios.post(process.env.REACT_APP_API_URL+'/moods/list', params, {headers: {'Authorization':accessToken}});
                return res.data;
            } catch (error) {
                throw new error(error);
            }
        },
        update: async (params) => {
            console.log('aaaaa',params)
            try {
                const res = await axios.post(process.env.REACT_APP_API_URL+'/moods/update', params, {headers: {'Authorization':accessToken}});
                return res.data;
            } catch (error) {
                console.log(error)
                throw new error(error);
            }
        },
        find: async (params) => {
            try {
                const res = await axios.post(process.env.REACT_APP_API_URL+'/moods/get', params, {headers: {'Authorization':accessToken}});
                return res.data;
            } catch (error) {
                throw new error(error);
            }
        },
        search: async (params) => {
            try {
                const res = await axios.post(process.env.REACT_APP_API_URL+'/moods/search', params, {headers: {'Authorization':accessToken}});
                return res.data;
            } catch (error) {
                throw new error(error);
            }
        },
        delete: async (params) => {
            try {
                const res = await axios.post(process.env.REACT_APP_API_URL+'/moods/delete', params, {headers: {'Authorization':accessToken}});
                return res.data;
            } catch (error) {
                throw new error(error);
            }
        },
        add: async (params) => {
            console.log('aaaaa',params)
            try {
                const res = await axios.post(process.env.REACT_APP_API_URL+'/moods/add', params, {headers: {'Authorization':accessToken}});
                return res.data;
            } catch (error) {
                throw new error(error);
            }
        },
        addDescription: async (params) => {
            try {
                const res = await axios.post(process.env.REACT_APP_API_URL+'/mood-descriptions/add', params, {headers: {'Authorization':accessToken}});
                return res.data;
            } catch (error) {
                throw new error(error);
            }
        },
        updateDescription: async (params) => {
            try {
                const res = await axios.post(process.env.REACT_APP_API_URL+'/mood-descriptions/update', params, {headers: {'Authorization':accessToken}});
                return res.data;
            } catch (error) {
                throw new error(error);
            }
        }
    }
}
