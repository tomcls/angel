import axios from 'axios';

export default  function AngelPosology(config) {
    const accessToken =  window.appStorage.getItem('token')?JSON.parse(window.appStorage.getItem('token')):null;
    return {
        find: async (params) => {
            try {
                const res = await axios.post(process.env.REACT_APP_API_URL+'/posologies/get', params, {headers: {'Authorization':accessToken}});
                return res.data;
            } catch (error) {
                throw new error(error);
            }
        },
        add: async (params) => {
            try {
                const res = await axios.post(process.env.REACT_APP_API_URL+'/posologies/add', params, {headers: {'Authorization':accessToken}});
                return res.data;
            } catch (error) {
                throw new error(error);
            }
        }
    }
}
