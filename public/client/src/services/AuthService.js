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
    AuthenticateUser(name, surname, email, phone){
        var request = {
            name: name,
            surname: surname,
            email: email,
            phone: phone,
            password:'chat-widget',
            password_confirmation: 'chat-widget',
            
        };
        console.log(request);
        return apiClient.post('auth/register', request);
    }
}