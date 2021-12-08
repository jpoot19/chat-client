import ChatService from '@/services/ChatService.js'

import store from '@/store/index'
export const namespaced = true
export const notificationSound = require("@/assets/notification.mp3");
export const state = {
    // user:{},
    // roomInstance: false,
    receiver:{},
    // greetingMessage: 'En un momento uno de nuestros agentes te atenderá',
   
    // privateInstance: false,
    messages:[],
    enabledChat:false
}

export const mutations = {
    SET_RECEIVER(state, data){
        state.receiver = data;
        state.enabledChat = true;
    },
    SET_MESSAGE(state, data){

        // var index = state.messages.findIndex( x => x.message.id ==)
        state.messages.push({
            message: data.message,
            user: data.user
        });
    },
    SET_MESSAGES(state, data){
        state.messages = data;
    },
    SET_PUBLIC_INSTANCE(state, instance){
        state.roomInstance = instance;
    },
    SET_ENABLED_CHAT(state, data){
        state.enabledChat = data;
    }
}


export const actions = {
    async SendMessage({commit}, message){
        let data = {
            message:message,
            user:store.state.user
        };
 
       commit("SET_MESSAGE", data);
       
        
        await ChatService.sendBotMessage(message);
       
    },
    async FetchMessages({commit}){
        var res = await ChatService.fetchMessages();
        commit("SET_MESSAGES",res.data);
       

    },
    
    playNotificationAlert(){
        const audio = new Audio(notificationSound);
        // console.log(audio);                
        audio.play();
    },
    incommingMessages({commit, dispatch}, message){
        let data = {
            message:message.message.message,
            user:message.user
        };

        commit("SET_MESSAGE", data);
        commit("SET_RECEIVER", message.user);
        dispatch("playNotificationAlert",{ root: true });

    },
    enabledChat({commit}, data){
        // console.log("se habilita el chat");
        commit("SET_ENABLED_CHAT",data);
    },
    
}


export const getters = {
    
}