import ChatService from '@/services/ChatService.js'
import store from '@/store/index'
export const namespaced = true

export const state = {
    // user:{},
    roomInstance: false,
    receiver:{},
    greetingMessage: 'En un momento uno de nuestros agentes te atenderá',
    channel: '',
    privateInstance: false,
    messages:[],
    enabledChat:false
}

export const mutations = {
    SET_RECEIVER(state, data){
        state.receiver = data.data;
    },
    SET_MESSAGE(state, data){
        // console.log(store.state.user);
        state.messages.push({
            message: data.message,
            user: store.state
        });
    },
    SET_MESSAGES(state, data){
        state.messages = data;
    },
    SET_PUBLIC_INSTANCE(state, instance){
        state.roomInstance = instance;
    },
    SET_CHANNEL(state, data){
        state.channel = data.channel;
  
        state.roomInstance.private(state.channel).listen('ChatEvent', (event) => {
          state.messages.push({
            message:event.message.message,
            user: event.user
          });
          state.receiver = event.user;
          state.enabledChat = true;
        });
        // const audio = new Audio("./assets/media/notification.mp3");                
        // audio.play();
  
      }
}


export const actions = {
    async SendMessage({commit}, message, user){
        let data = {
            message:message,
            user:user
        };
        commit("SET_MESSAGE", data);
        
        await ChatService.sendMessage(message);
       
    },
    async FetchMessages(){
        var res = await ChatService.fetchMessages();
        console.log(res);
        //  commit("SET_MESSAGES", res.data);

    },
    playNotificationAlert(){
        const audio = new Audio("./assets/media/notification.mp3");                
        audio.play();
    }
}