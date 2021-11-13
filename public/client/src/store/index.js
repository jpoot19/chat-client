
import AuthService from '@/services/AuthService.js'
import * as chat from '@/store/modules/chat.js';
import { createStore } from 'vuex'
// import createPersistedState from 'vuex-persistedstate'
import Echo from 'laravel-echo';
window.Pusher = require('pusher-js');
import * as notification from '@/store/modules/notification.js'

// const persistent = new createPersistedState({
//   paths: ['user', 'chat', 'isUserAuth','authToken']
// });

export default createStore({
  state: {
    user:{},
    isUserAuth: false,
    authToken:null,
    isLoading: false,
    channel: '',
  },
  mutations: {
    SET_USER(state, data){
      state.user = data.data;
      state.authToken = data.token;
      state.isUserAuth = true;
    },
    LOADING(state){
      state.isLoading = true;
    },
    STOP_LOADING(state){
      state.isLoading = false;
    },
    SET_CHANNEL(state, data){
      state.channel = data.channel;
    }

  },
  actions: {
    async authUser({ commit, dispatch }, user){
        var response = await AuthService.AuthenticateUser(user.name,user.surname, user.email, user.phone);

        
        var res = response.data;

        if(res.status == "success"){
         
          commit("SET_USER", res);
          // const instance = new Echo({
          //   authEndpoint: process.env.VUE_APP_INTERNAL_API_BASE_URL+'broadcasting/auth',
          //   broadcaster: 'pusher',
          //   key: process.env.VUE_APP_PUSHER_KEY,
          //   wsHost: process.env.VUE_APP_NAME_BACK,
          //   cluster:'mt1',
          //   wsPort: process.env.VUE_APP_PUSHER_PORT,
          //   forceTLS: false,
          //   disableStats: true,
          //   enabledTransports: ['ws', 'wss'],
          //   auth:{
          //       headers:{
          //           Authorization: 'Bearer ' + res.token
          //       }
          //     }
          // });
          // commit("chat/SET_PUBLIC_INSTANCE", instance);

          // instance.join('chat').here(user => {
          //   console.log('Here...');
          //   console.log(user);
          // }).joining(user => {
          //   console.log('Joining...');
          //   console.log(user);
          // });

          // instance.private(`chat.greet.${res.data.uuid}`).listen('GreetEvent', (event) => {
          //   commit("chat/SET_CHANNEL", event);
           
            
          // });

          const notification = {
            type: 'success',
            title: 'En un momento uno de nuestros asesores te atenderá, por favor espera',
            message: '',
            timeout: true,
          }
          dispatch('notification/add', notification, { root: true });
          // dispatch('playNotificationAlert', chat, {root:true});
          return true;
        }else{
          const notification = {
            type: 'error',
            title: 'Oops! Ocurrió un error',
            message: response.message,
            timeout: true,
          }
          dispatch('notification/add', notification, { root: true });
          console.log("usuario NO registrado");
          return false;
        }



    },
    async UpdatePrivateChannel({commit}, channel){
      console.log(channel);
      commit("SET_CHANNEL", channel);
      commit('chat/SET_ENABLED_CHAT',true);
    },
    activateLoading({ commit }){
      commit('LOADING');
    },
    deactivateLoading({commit}){
      commit('STOP_LOADING');
    }

    
  },
  getters: {
    connectToChatRoom: state => {
      if(state.isUserAuth){
          let instance = new Echo({
              authEndpoint: process.env.VUE_APP_INTERNAL_API_BASE_URL+'broadcasting/auth',
              broadcaster: 'pusher',
              key: process.env.VUE_APP_PUSHER_KEY,
              wsHost: process.env.VUE_APP_NAME_BACK,
              cluster:'mt1',
              wsPort: process.env.VUE_APP_PUSHER_PORT,
              forceTLS: false,
              disableStats: true,
              enabledTransports: ['ws', 'wss'],
              auth:{
                  headers:{
                      Authorization: 'Bearer ' + state.authToken
                  }
                }
            });
            return instance;
      }
      return 
    },
    privateChannel: state => {
          let privateChannel = state.channel;
        return privateChannel;
    }
  },
  modules: {
    chat,
    notification
  },
  // plugins: [persistent],
})
