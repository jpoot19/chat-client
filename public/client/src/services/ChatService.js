import axios from 'axios';
import store from '@/store/index';

const apiClient = axios.create({
    baseURL:process.env.VUE_APP_INTERNAL_API_BASE_URL,
    withCredentials:false,
    headers:{
        Accept: 'application/json',
      'Content-Type': 'application/json',
    //   'Authorization': 'Bearer ' + authToken
    }
});

export default{
    fetchMessages(){
        const authToken = store.state.authToken ?? null;
        return apiClient.get(`chat/${store.state.chat.receiver.uuid}/messages`,{
            headers:{
                'Authorization': 'Bearer '+ authToken
            }
        });
    },
    sendMessage(newMessage){

        const authToken = store.state.authToken ?? null;
        let request ={
            message: newMessage
        };
        return apiClient.post(`chat/${store.state.chat.receiver.uuid}/messages`, request,{
            headers:{
                'Authorization': 'Bearer '+ authToken
            }
        });
    }

}