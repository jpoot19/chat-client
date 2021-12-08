<template>
     <div class="incomming-msg-notification" v-if="incomingMessages.length > 0 ">{{incomingMessages.length}}</div>
</template>

<script>

 export default {
        name: 'IncommingMsgNotification',
        data(){
            return{
                incomingMessages: []
            }
        },
        created() {
            this.listenIncommingMsgs();
        },
        methods: {
            listenIncommingMsgs(){
         
                if(this.isUserAuth && (this.privateChannel != null && this.privateChannel != "")){
                    this.connectionInstance.private(this.privateChannel).listen('ChatEvent', (event) => {
                        console.log("Estoy esoperando el evento");
                        this.incomingMessages.push({
                            message: event.message.id
                        });
                    });
                }
            }
        },
        computed:{
            connectionInstance(){
                return this.$store.getters['connectToChatRoom'];
            },
            privateChannel(){
                return this.$store.getters['privateChannel'];
            },
             isUserAuth(){
                return this.$store.state.isUserAuth;
            },
        }

    }
</script>

