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
    // fetchMessages(){
    //     const authToken = store.state.authToken ?? null;
    //     // console.log(store.state.chat.receiver.uuid);
    //     return apiClient.get(`chat/${store.state.chat.receiver.uuid}/messages`,{
    //         headers:{
    //             'Authorization': 'Bearer '+ authToken
    //         }
    //     });
    // },

     fetchMessages(){
        const authToken = store.state.authToken ?? null;
        return apiClient.get(`bot/${process.env.VUE_APP_BOT_ID}/messages`,{
            headers:{
                'Authorization': 'Bearer '+ authToken
            }
        })
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
    },
    sendBotMessage(userToken,tag, userInput, category, subcategory){
        const authToken = store.state.authToken ?? null;
       
        let request = {}
        if(typeof userInput !== 'undefined'){
            request ={
                tag: tag,
                user_input: userInput,
                user_token: userToken
            }
        }
        else if(typeof category !== 'undefined'){
            request ={
                category: category,
                subcategory: subcategory,
                user_token: userToken
            }
        }
        else{
            request = {
                tag: tag,
                user_token: userToken
            }
        }

         
        return apiClient.post(`bot/${process.env.VUE_APP_BOT_ID}/messages`, request,{
            headers:{
                'Authorization': 'Bearer '+ authToken
            }
        });
    },
    sendTag(data){
        const authToken = store.state.authToken ?? null;
        // console.log(data);
        // let request ={
        //     tag: data.tag,
        //     user_token: data.user_token
        // };
        return apiClient.post(`bot/${process.env.VUE_APP_BOT_ID}/options`,data,{
            headers:{
                'Authorization': 'Bearer '+ authToken
            }
        });
    },
    startConversation(){
        const authToken = store.state.authToken ?? null;
        let request = {
            botId:process.env.VUE_APP_BOT_ID
        }
        return apiClient.post(`bot/${store.state.user.uuid}/chatbot`,request,{
            headers:{
                'Authorization': 'Bearer '+ authToken
            }
        });

    }


}