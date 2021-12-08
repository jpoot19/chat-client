<template>
    <div class="option-wrapper">
        <div class="chat-option" @click="sendOption(option.tag)"> 
            {{option.label}}
        </div>
    </div>
</template>

<script>
export default{
    props: {
        option:{
            type: Object,
            required: true
        }
    },
    methods: {
        sendOption(tag){
            let selectedOption = {
                tag: tag,
                user_token: this.userToken
            };
            this.$store.dispatch('botModule/selectOption', selectedOption); 
        }
    },
    computed:{
         userToken(){
                return this.$store.getters['botModule/getUserToken'];
            },
    }


        
}
</script>