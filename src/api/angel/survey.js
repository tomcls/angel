import axios from 'axios';

export default  function AngelSurvey(config) {
    const accessToken =  localStorage.getItem('token')?JSON.parse(localStorage.getItem('token')):null;
    return {
        moods: async (params) => {
            try {
                const res = await axios.post(process.env.REACT_APP_API_URL+'/surveys/moods', params, {headers: {'Authorization':accessToken}});
                return res.data;
            } catch (error) {
                throw new error(error);
            }
        },
        sideEffects: async (params) => {
            try {
                const res = await axios.post(process.env.REACT_APP_API_URL+'/surveys/effects', params, {headers: {'Authorization':accessToken}});
                return res.data;
            } catch (error) {
                throw new error(error);
            }
        },
        groupEffects: async (params) => {
            try {
                const res = await axios.post(process.env.REACT_APP_API_URL+'/surveys/group-effects', params, {headers: {'Authorization':accessToken}});
                return res.data;
            } catch (error) {
                throw new error(error);
            }
        },
        concatEffects: async (params) => {
            try {
                const res = await axios.post(process.env.REACT_APP_API_URL+'/surveys/concat-effects', params, {headers: {'Authorization':accessToken}});
                return res.data;
            } catch (error) {
                throw new error(error);
            }
        },
        groupMoods: async (params) => {
            try {
                const res = await axios.post(process.env.REACT_APP_API_URL+'/surveys/group-moods', params, {headers: {'Authorization':accessToken}});
                return res.data;
            } catch (error) {
                throw new error(error);
            }
        },
        concatMoods: async (params) => {
            try {
                const res = await axios.post(process.env.REACT_APP_API_URL+'/surveys/concat-moods', params, {headers: {'Authorization':accessToken}});
                return res.data;
            } catch (error) {
                throw new error(error);
            }
        }
    }
}
