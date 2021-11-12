<template>
    <div>
        <chat-button v-on:click="showWidget()" v-if="!showChat" />
        <!-- <button class="chat-support-btn" v-on:click="showWidget()" v-if="!showChat">
            <ChatIcon style="width:24px"></ChatIcon>
        </button> -->
        <div class="widget" v-if="showChat">
            <div class="chat-window">
                <div class="chat-header bar">
                    <div class="bot-name">{{agentName}}</div>
                    <div class="support-available">Disponible ahora</div>
                    <div>
                        <button class="close-button"><TimesIcon width="22" height="22" v-on:click="showWidget()"></TimesIcon></button>                    
                    </div>
                    <whatsapp-button/>
                    <BusinessHours/>
                </div>
                <NotificationContainer/>
                <div v-if="isUserAuth">

                    <div class="middle" ref="formContainer"  v-chat-scroll id="box">
                         <loading v-model:active="isLoading" :is-full-page="false" />

                            <div class="messages " v-for="message in Messages" :key="message.id">     
                                <div class="message sender" v-if="message.user.id != user.id">
                                    {{message.message}}
                                </div>
                                <div class="message receiver" v-if="message.user.id == user.id">
                                    {{message.message}}
                                </div>
                            </div>
                    </div>                    
                </div>
                
                 <div class="messages" v-if="!isUserAuth">
                     
                    <AuthComponent></AuthComponent>
                    
                </div>
                <div class="input-bar">
                    <input @keydown.enter.prevent="sendMessage" v-model="newMessage" placeholder="Type your message here!" type="text" :disabled="!enabledChat">
                    <button class="send-button"><SendIcon width="22" height="22" @click="sendMessage"></SendIcon></button>
                    
                    <!-- <font-awesome-icon icon="fa-paper-plane" /> -->
                </div>
            </div>
        </div>

    </div>
</template>

<script>
    // import ChatIcon from './icons/Comment-alt-regular.vue';
    import SendIcon from './icons/Paper-Plane-Solid.vue';
    import ChatButton from './ChatButton.vue';
    import TimesIcon from './icons/Times-Solid.vue';
    import AuthComponent from './Auth.vue';
    import BusinessHours from './BusinessHoursContainer.vue';
    import WhatsappButton from './WhatsappButton.vue';
    import NotificationContainer from '@/components/NotificationContainer.vue'
    import Loading from 'vue-loading-overlay';
    // import {mapGetters} from 'vuex';
    export default {
        name: 'Chat',
        components:{
            // ChatIcon,
            SendIcon,
            TimesIcon,
            AuthComponent,
            Loading,
            NotificationContainer,
            BusinessHours,
            WhatsappButton,
            ChatButton
        },
        data(){
            return {
                newMessage: '',
                showChat: false,
                errorMsgs: [],
                users:[],
                fullPage: true,
                isLoading: !this.enabledChat,
                agentName: 'Chatea con un Agente'
            }
        },
        created(){
            this.fetchMessages();
            
        },
        mounted() {
        },
        updated() {
            this.isLoading= !this.enabledChat;
            this.updateAgentName();
            this.scroll();
            // this.listenPrivateChannel();
        },
        methods:{
           
            scroll() {
                if(this.isUserAuth){
                    var scrollItem = document.getElementById('box');
                    if(scrollItem != null){
                        document.getElementById('box').scrollTop = scrollItem.scrollHeight;
                    }
                     
                }
                
            },
            showWidget(){
                this.showChat = !this.showChat;
            },
            fetchMessages(){
                if(this.enabledChat){
                    this.$store.dispatch('chat/FetchMessages');
                    // console.log(this.Messages);
                }
                
            //    this.messages = res.data;
            },
            sendMessage(){
                let isValidForm = this.validateForm();
                if(isValidForm){
                    this.$store.dispatch('chat/SendMessage',this.newMessage, this.user);
                    this.newMessage = '';

                }else{
                    console.log('Please check the followig errors');
                }
            },
            validateForm(){
                // this.errorMsgs =[];
                let isValid = true;
                if(this.newMessage === ''){
                     this.errorMsgs.push('Message is empty');
                    isValid = false
                }
                return isValid;
            },
            listenPrivateChannel(){
                if(this.isUserAuth)
                {
                     this.$store.dispatch('chat/JoinToPrivateChannel');
                    // console.log(this.privateInstance);
                }
                
            },
            updateAgentName(){
                if(this.receiver != null){
                    if(this.receiver.name != null){
                        let surname = this.receiver.surname != null ? this.receiver.surname : "";
                        this.agentName = this.receiver.name + " " + surname;
                    }
                    
                }
            },
            //  playSound(){
            //      const audio = new Audio("./assets/media/notification.mp3");                
            //     audio.play();
            //  }
           

            
            
        },
        computed:{
            // ...mapGetters(["getRoomInstance"]),
            user(){
                return this.$store.state.user;
            },
            Echo(){
                return this.$store.state.Echo;
            },
            isUserAuth(){
                return this.$store.state.isUserAuth;
            },
            privateInstance(){
                return this.$store.getters['chat/getRoomInstance'];
            },
            GreetMessage(){
                return this.$store.state.greetingMessage;
            },
            Messages(){
                return this.$store.state.chat.messages;
            },
            enabledChat(){
                return this.$store.state.chat.enabledChat;
            },
            receiver(){
                return this.$store.state.chat.receiver;
            },
            channel(){
                return this.$store.state.chat.channel;
            }
            
        }
    }

</script>

<style scoped>
@import url('https://fonts.googleapis.com/css?family=Red+Hat+Display:400,500,900&display=swap');
    
    .chat-window{
        position: fixed;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        width: 24rem;
        height: 38rem;
        z-index: 2;
        right: 1.5em;
        box-sizing: border-box;
        border-radius: 1rem;
        box-shadow: 0 3px 6px rgba(0, 0, 0, 0.16), 0 3px 6px rgba(0, 0, 0, 0.23);
        background: #FFF;
        bottom: 5em;
    }
    
    .middle{
        position: absolute;
        width: 100%;
        top:60px;
        height: 80%;
        background: var(--background);
        overflow-y: auto;
    }
    .chat-window .messages{
        /* padding: 1rem; */
		background: var(--background);
		flex-shrink: 2;
		/* overflow-y: hidden; */
		
		box-shadow: inset 0 2rem 2rem -2rem rgb(0 0 0 / 5%), inset 0 -2rem 2rem -2rem rgb(0 0 0 / 5%);
    }
    .chat-window .messages .message{
        box-sizing: border-box;
		padding: 0.5rem 1rem;
		margin: 1rem;
		background: #FFF;
		border-radius: 1.125rem 1.125rem 1.125rem 0;
		min-height: 2.25rem;
		width: fit-content;
		max-width: 66%;
			
		box-shadow: 0 0 2rem rgb(0 0 0 / 8%), 0rem 1rem 1rem -1rem rgb(0 0 0 / 10%);
    }
    .chat-window .messages .message.receiver{
        margin: 1rem 1rem 1rem auto ;
		border-radius: 1.125rem 1.125rem 0 1.125rem;
		background: var(--text-1);
		color: white;
    }
    .chat-header{
        position: relative;
        margin-bottom: 1rem;
        /* padding-left: 5rem; */
        /* height: 4.5rem; */
        display: flex;
        flex-direction: column;
        /* justify-content: ; */
    }
    .chat-window .input-bar svg {
        font-size: 1.5rem;
        margin-right: 1rem;
        color: #666;
        cursor: pointer;
        transition: color 200ms;
    }
    .chat-window .chat-header.bar{
        flex-basis: 2.5rem;
		flex-shrink: 0;
		margin: 1rem;
		box-sizing: border-box;
    }
    .chat-header .bot-name{
        /* font-weight: 500; */
        /* margin-bottom: 0.125rem; */
        font-size: 16px;
        font-weight: 700;
        color: #515151;
        text-align: left !important;
        
    }
    .chat-header .message, .chat-header .support-available{
        font-size: 0.9rem;
        color: #999;
        text-align: left;
    }
    .input-bar{
        box-sizing: border-box;
		flex-basis: 4rem;
		flex-shrink: 0;
		display: flex;
		align-items: center;
		padding: 0 0.5rem 0 1.5rem;
    }
    .input-bar input{
        border:none;
		background-image:none;
		background-color: #FFF;
		padding: 0.5rem 1rem;
		margin-right: 1rem;
		border-radius: 1.125rem;
		flex-grow: 2;
		box-shadow: 0 0 1rem rgb(0 0 0 / 10%), 0rem 1rem 1rem -1rem rgb(0 0 0 / 20%);
			
		font-family: Red hat Display, sans-serif;
		font-weight: 400;
		letter-spacing: 0.025em;
    }
    .send-button, .close-button{
        background: none;
        border: none;
    }
    .close-button{
        float: right;
        margin:-2.5em .5em;
    }
    
    .chat-support-btn {
        background-color: #0288F9;
        width: 60px;
        height: 60px;
        border-radius: 100%;
        background: #0288F9;
        border: none;
        outline: none;
        color: #FFF;
        font-size: 36px;
        box-shadow: 0 3px 6px rgba(0, 0, 0, 0.16), 0 3px 6px rgba(0, 0, 0, 0.23);
        transition: .3s;
        -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
        position: fixed;
        z-index: 1000;
        right: 1em;
        bottom: 1.3em;
    }
    .chat-support-btn:focus {
        transform: scale(1.1);
        transform: rotate(45deg);
        -ms-transform: rotate(45deg);
        -webkit-transform: rotate(45deg);
    }
</style>