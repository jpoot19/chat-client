<template>
     <button class="chat-support-btn">
            <ChatIcon style="width:24px"></ChatIcon>
            <incomming-msg-notification/>
            <!-- <div class="">1</div> -->
    </button>

</template>

<script>
 import ChatIcon from '@/components/icons/Comment-alt-regular.vue';
 import IncommingMsgNotification from '@/components/buttons/IncomingMessagesNotification.vue';
 export default {
        name: 'ChatButton',
        components:{
            ChatIcon,
            IncommingMsgNotification
        }     
    }
</script>
