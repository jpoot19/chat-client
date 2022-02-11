// import store from '@/store/index'
import ChatService from '@/services/ChatService.js'
import store from '@/store/index'
export const namespaced = true

export const state = {
    // options:[],
    // video:'',
    userbotToken:'',
    next_tag: '',
    messages:[],
    category: null,
    subcategory:null,
    faq:null,
    require_country:false,
    country_code:null
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
    },

    SET_CATEGORY(state, category){
        state.category = category;
    },
    SET_SUBCATEGORY(state, subcategory){
        state.subcategory = subcategory;
    },
    SET_FAQ(state, faq){
        state.faq = faq;
    },
    SET_COUNTRY(state, country_code){
        state.country_code = country_code;
    },
    SET_REQUIRE_COUNTRY(state, require_country){
        state.require_country = require_country;
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

            // let messageData = {
            //     messages : data.messages,
            //     options: data.options,
            //     video: data.video,
            //     user:store.state.bot

            // };
            // commit("SET_MESSAGES_BOT", messageData);
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
        console.log(res);
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
       
        if(typeof event.message.video !== 'undefined'){
            video = event.video
        }
        if(typeof event.message.next_tag !== 'undefined'){
            commit("SET_NEXT_TAG", event.message.next_tag);
        }
        if(typeof event.message.id_category !== 'undefined'){
            commit("SET_CATEGORY", event.message.id_category);
        }

        if(typeof event.message.messages !== 'undefined'){
            messages.forEach(function(message, index){
            
                setTimeout(()=>{
                    console.log(message.message)
                    let data = {
                        messages:message.message,
                        options: null,
                        video: video,
                        user:store.state.bot
                    };
                    console.log(data);
                    
                    commit("SET_MESSAGES_BOT", data);
                },2000 * index);
            });
        }

        
       

        if(typeof event.message.options !== 'undefined'){
            options = event.message.options;
            setTimeout(()=>{
                
                let data = {
                    messages:null,
                    options: options,
                    video: null,
                    user:store.state.bot
                };
                console.log(data);
                
                commit("SET_MESSAGES_BOT", data);
            },2000 * (event.message.messages.length+1));
           
        }

        // messages.forEach((message) => {
            
            
        // });

       

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

        let option = {};
        
        if(typeof selectedOption.tag !== 'undefined'){
            
            option = {
                message: selectedOption.label,
                tag: selectedOption.tag,
                user_token: store.getters['botModule/getUserToken']
            };
            console.log("Opcion env9iada");
            console.log(option);
        }else if(typeof selectedOption.id_subcategory !== 'undefined'){
            if(store.getters['botModule/getCategory']!= null){
                option = {
                    message: selectedOption.label,
                    id_category: store.getters['botModule/getCategory'],
                    id_subcategory: selectedOption.id_subcategory,
                    user_token: store.getters['botModule/getUserToken']
                }
                commit("SET_SUBCATEGORY", selectedOption.id_subcategory);
            }else{
                console.log("Sin categoria seleccionada");
            }
            
        }else if(typeof selectedOption.id_faq !== 'undefined'){
            commit("SET_FAQ", selectedOption.id_faq);
            if(typeof selectedOption.require_country !== 'undefined'){
                commit("SET_REQUIRE_COUNTRY", selectedOption.require_country);
            }
            if(typeof selectedOption.country_code !== 'undefined'){
                commit("SET_COUNTRY",selectedOption.country_code);
            }
            
            option = {
                message: selectedOption.label,
                id_category:store.getters['botModule/getCategory'],
                id_subcategory:store.getters['botModule/getSubcategory'],
                id_faq: selectedOption.id_faq,
                require_country:selectedOption.require_country,
                country_code:selectedOption.country_code,
                user_token: store.getters['botModule/getUserToken']
            }
        }else if(typeof selectedOption.id_country !== 'undefined'){
            commit("SET_COUNTRY", selectedOption.id_country);
            option = {
                message: selectedOption.label,
                id_category:store.getters['botModule/getCategory'],
                id_subcategory:store.getters['botModule/getSubcategory'],
                id_faq: store.getters['botModule/getFaq'],
                require_country:store.getters['botModule/getRequireCountry'],
                country_code:selectedOption.id_country,
                user_token: store.getters['botModule/getUserToken']
            }
        }

        var response = await ChatService.sendTag(option);
        
        let res = response.data;
        console.log(res);
        if(res.status == "success")
        {
            if(res.data.messages != null){
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
            }else{
                let data = {
                    messages:null,
                    options: res.data.options,
                    video:res.data.video,
                    user:store.state.bot
                };
                console.log(data);
                
                commit("SET_MESSAGES_BOT", data);
            }
            

            if(typeof res.data.id_category !== 'undefined'){
                commit("SET_CATEGORY", res.data.id_category);
            }

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
    },
    getCategory: state => {
        return state.category
    },
    getSubcategory: state => {
        return state.subcategory;
    },
    getFaq: state => {
        return state.faq;
    },
    getRequireCountry: state => {
        return state.require_country;
    },
    getCountry: state => {
        return state.country_code;
    }
}