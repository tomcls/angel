import axios from 'axios';

export default  function AngelDashboard(config) {
    const accessToken =  window.appStorage.getItem('token')?JSON.parse(window.appStorage.getItem('token')):null;
    return {
        moods: async (params) => {
            try {
                const res = await axios.post(process.env.REACT_APP_API_URL+'/dashboard/moods', params, {headers: {'Authorization':accessToken}});
                return res.data;
            } catch (error) {
                throw new error(error);
            }
        }
    }
}
