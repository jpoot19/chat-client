import axios from 'axios';
const apiClient = axios.create({
    baseURL: process.env.VUE_APP_INTERNAL_API_BASE_URL,
    withCredentials: false,
    headers:{
        Accept: 'application/json',
        'Content-Type': 'application/json'
    }
});

export default{

    // InitWindow(){
    //     console.log(process.env.VUE_APP_BOT_TOKEN);
    //     return apiClient.get(`bot/${process.env.VUE_APP_BOT_TOKEN}`);
    // },

    AuthenticateUser(name, surname, email, phone){
        var request = {
            name: name,
            surname: surname,
            email: email,
            phone: phone,
            password:'chat-widget',
            password_confirmation: 'chat-widget',
            bot_id: process.env.VUE_APP_BOT_ID,
            
        };
        // console.log(request);
        return apiClient.post('auth/register', request);
    },
    InitUser(){
        let request = {
            botId: process.env.VUE_APP_BOT_ID
        }
        return apiClient.post('clients',request,{
            headers:{
                'Authorization': 'Bearer '+ process.env.VUE_APP_BOT_TOKEN
            }
        });
    }

}