import axios from 'axios';

export default  function AngelNurse(config) {
    const accessToken =  window.appStorage.getItem('token')?JSON.parse(window.appStorage.getItem('token')):null;
    return {
        countTransfers: async (params) => {
            try {
                const res = await axios.post(process.env.REACT_APP_API_URL+'/nurses/count-transfers', params, {headers: {'Authorization':accessToken}});
                return res.data;
            } catch (error) {
                throw new error(error);
            }
        },
        list: async (params) => {
            try {
                const res = await axios.post(process.env.REACT_APP_API_URL+'/nurses/list', params, {headers: {'Authorization':accessToken}});
                return res.data;
            } catch (error) {
                throw new error(error);
            }
        },
        update: async (params) => {
            try {
                const res = await axios.post(process.env.REACT_APP_API_URL+'/nurses/update', params, {headers: {'Authorization':accessToken}});
                return res.data;
            } catch (error) {
                console.log(error)
                throw new error(error);
            }
        },
        find: async (params) => {
            try {
                const res = await axios.post(process.env.REACT_APP_API_URL+'/nurses/get', params, {headers: {'Authorization':accessToken}});
                return res.data;
            } catch (error) {
                throw new error(error);
            }
        },
        add: async (params) => {
            try {
                const res = await axios.post(process.env.REACT_APP_API_URL+'/nurses/add', params, {headers: {'Authorization':accessToken}});
                return res.data;
            } catch (error) {
                throw new error(error);
            }
        },
        patients: async (params) => {
            try {
                const res = await axios.post(process.env.REACT_APP_API_URL+'/nurses/patients', params, {headers: {'Authorization':accessToken}});
                return res.data;
            } catch (error) {
                throw new error(error);
            }
        },
        addPatient: async (params) => {
            try {
                const res = await axios.post(process.env.REACT_APP_API_URL+'/nurses/add-patient', params, {headers: {'Authorization':accessToken}});
                return res.data;
            } catch (error) {
                throw new error(error);
            }
        },
        getNurses: async (params) => {
            try {
                const res = await axios.post(process.env.REACT_APP_API_URL+'/nurses/nurses', params, {headers: {'Authorization':accessToken}});
                return res.data;
            } catch (error) {
                throw new error(error);
            }
        },
        transfers: async (params) => {
            try {
                const res = await axios.post(process.env.REACT_APP_API_URL+'/nurses/transfers', params, {headers: {'Authorization':accessToken}});
                return res.data;
            } catch (error) {
                throw new error(error);
            }
        },
        addTransfers: async (params) => {
            try {
                const res = await axios.post(process.env.REACT_APP_API_URL+'/nurses/add-transfers', params, {headers: {'Authorization':accessToken}});
                return res.data;
            } catch (error) {
                throw new error(error);
            }
        },
        recoverTransfer: async (params) => {
            try {
                const res = await axios.post(process.env.REACT_APP_API_URL+'/nurses/recover-transfer', params, {headers: {'Authorization':accessToken}});
                return res.data;
            } catch (error) {
                throw new error(error);
            }
        }
    }
}
