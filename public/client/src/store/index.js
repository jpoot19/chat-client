
import AuthService from '@/services/AuthService.js'
import WidgetService from '@/services/WidgetService.js'
import * as chat from '@/store/modules/chat.js';
import * as botModule from '@/store/modules/bot.js';
import { createStore } from 'vuex'
import createPersistedState from 'vuex-persistedstate'
import Echo from 'laravel-echo';
window.Pusher = require('pusher-js');
import * as notification from '@/store/modules/notification.js'

const persistent = new createPersistedState({
  paths: ['user','bot', 'channel', 'isUserAuth','authToken', 'chat']
});

export default createStore({
  state: {
    user:{},
    bot:{},
    isUserAuth: false,
    authToken:null,
    isLoading: false,
    channel: '',
    

  },
  mutations: {
    SET_BOT(state, data){
      state.bot = data.data;
    },
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
    async initWidget({commit}){
      var response = await WidgetService.InitWindow();
      var res = response.data;
      commit("SET_BOT", res);

      // console.log(response);
      return true;
    },
    async authUser({ commit, dispatch }, user){
        var response = await AuthService.AuthenticateUser(user.name,user.surname, user.email, user.phone);

        
        var res = response.data;

        if(res.status == "success"){
         
          commit("SET_USER", res);

          const notification = {
            type: 'success',
            title: 'En un momento uno de nuestros asesores te atenderá, por favor espera',
            message: '',
            timeout: true,
          }
          dispatch('notification/add', notification, { root: true });
         
          return true;
        }else{
          const notification = {
            type: 'error',
            title: 'Oops! Ocurrió un error',
            message: response.message,
            timeout: true,
          }
          dispatch('notification/add', notification, { root: true });
          // console.log("usuario NO registrado");
          return false;
        }



    },
    async UpdatePrivateChannel({commit}, channel){
      // console.log(channel);
      commit("SET_CHANNEL", channel);
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
    },
    getUser: state => {
      return state.user;
    },
    getBot: state => {
      return state.bot;
    }
  },
  modules: {
    chat,
    notification,
    botModule
  },
  plugins: [persistent],
})
