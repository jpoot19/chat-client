import axios from 'axios';
// import store from '@/store/index';

const apiClient = axios.create({
    baseURL:process.env.VUE_APP_INTERNAL_API_BASE_URL,
    withCredentials:false,
    headers:{
        Accept: 'application/json',
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + process.env.VUE_APP_BOT_TOKEN
    }
});

export default
{
    InitWindow(){
        return apiClient.get(`bot/${process.env.VUE_APP_BOT_ID}`);
    },
    
}
