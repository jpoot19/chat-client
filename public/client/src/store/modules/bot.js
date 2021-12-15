// import store from '@/store/index'
import ChatService from '@/services/ChatService.js'
import store from '@/store/index'
export const namespaced = true

export const state = {
    // options:[],
    // video:'',
    userbotToken: '',
    next_tag: '',
    messages:[]
}

export const mutations = {
    // SET_OPTIONS(state, data){
    //     state.options = data;
    // },
    // SET_VIDEO(state, data){
    //     state.video = data.video;
    // },
    SET_MESSAGES_BOT(state, data){
        state.messages.push({
            message: data.messages,
            options:data.options,
            video: data.video,
            user:data.user
        });
    },
    SET_USERTOKEN(state,data){
        state.userbotToken = data;
    },
    SET_NEXT_TAG(state, data){
        state.next_tag = data;
    }
    

}

export const actions = {
    async establishCommunication ({commit, dispatch}){
        var response = await ChatService.startConversation();
        var res = response.data;
        // console.log("Establkeciendo comunicacion con el bot ...");
        // console.log(res);
        if(res.status == "success"){
            let data = res.data;

            let messageData = {
                messages : data.messages,
                options: data.options,
                video: data.video,
                user:store.state.bot

            };
            commit("SET_MESSAGES_BOT", messageData);
            commit("SET_USERTOKEN", data.token);
            dispatch("chat/enabledChat", true,{ root: true });
        }else{
            return false;
        }
    },
    initOptions({commit}, options ){
        console.log(options);
        commit("SET_OPTIONS", options);
    },
    addUserBotToken({commit}, token){
        console.log(token);
        commit("SET_USERTOKEN", token);
    },
    addBotVideo({commit}, video){
        console.log(video);
        commit("SET_VIDEO", video);
    },
    async sendMessage({commit, dispatch}, message){


        // //validar en el chatservice para hcerlo solo una vez inluir param,eteros individuales
        // if(message.next_tag != '' || message.next_tag != null){
        //     let request = {
        //         tag: message.next_tag,
        //         user_input: message.user_input,

        //     }
        // }
        let data = {
            messages:message.user_input,
            options:null,
            video: null,
            user:store.state.user
        };
 
       commit("SET_MESSAGES_BOT", data);
       let userToken = store.state.botModule.userbotToken;
      
        
        let response = await ChatService.sendBotMessage(userToken, message.tag, message.user_input);
        let res = response.data;
        if(res.status === 'success'){
            // if(res.data.next_tag != null || res.data.next_tag == ''){
            //     commit("SET_NEXT_TAG", res.data.next_tag);
            // }
            return true;
        }else{
            const notification = {
                type: 'error',
                title: 'Oops! Ocurrió un error',
                message: res.message,
                timeout: true,
              }
              dispatch('notification/add', notification, { root: true });
              console.log("Hubo un error");
              return false;
        }
    },
    async fetchMessages({commit}){
        var res = await ChatService.fetchMessages();
        console.log(res);
        let messages = res.data;
        console.log(messages);

        messages.forEach(message => {
            let data = {
                messages:message.message,
                options: null,
                video: null,
                user:message.senderable
            };
            commit("SET_MESSAGES_BOT",data);
        });
       
    },


    botMessages({commit}, event){

        //Validar evento
        let messages = [];
        let options = null;
        let video = '';

        messages = event.message.messages;
        console.log(event.message.options);
        if(typeof event.message.options !== 'undefined'){
            options = event.message.options;
        }
        if(typeof event.message.video !== 'undefined'){
            video = event.video
        }
        if(typeof event.message.next_tag !== 'undefined'){
            commit("SET_NEXT_TAG", event.message.next_tag);
        }

        

        messages.forEach((message) => {
            console.log(message.message)
            let data = {
                messages:message.message,
                options: options,
                video: video,
                user:store.state.bot
            };
            console.log(data);
            
            commit("SET_MESSAGES_BOT", data);
        });

        // let data = {
        //     messages:message,
        //     options: options,
        //     video:video,
        //     user:store.state.bot
        // };

        // console.log(data);
        // commit("SET_MESSAGES_BOT", data);
        // commit("SET_RECEIVER", message.user);
        // dispatch("playNotificationAlert",{ root: true });

    },
    async selectOption({commit, dispatch}, selectedOption){
        // console.log(selectedOption);
        var response = await ChatService.sendTag(selectedOption);
        
        let res = response.data;
        console.log(res);
        if(res.status == "success")
        {
            let messages = res.data.messages;
            console.log(messages),
            messages.forEach((message) => {
                console.log(message.message)
                let data = {
                    messages:message.message,
                    options: res.data.options,
                    video:res.data.video,
                    user:store.state.bot
                };
                console.log(data);
                
                commit("SET_MESSAGES_BOT", data);
            });

            commit("SET_NEXT_TAG", res.data.next_tag);
            
            // console.log(res);
            return true;
        }else{
            const notification = {
                type: 'error',
                title: 'Oops! Ocurrió un error',
                message: res.message,
                timeout: true,
              }
              dispatch('notification/add', notification, { root: true });
              console.log("Hubo un error");
              return false;
        }
        
    }

}

export const getters ={
    getUserToken: state => {
        return state.userbotToken;
      },
    getNextToken: state => {
        return state.next_tag;
    }
}