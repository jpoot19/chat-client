<template>
     <button class="chat-support-btn">
            <ChatIcon style="width:24px"></ChatIcon>
    </button>
</template>

<script>
 import ChatIcon from './icons/Comment-alt-regular.vue';
 export default {
        name: 'ChatButton',
        components:{
            ChatIcon,
        }     
    }
</script>
