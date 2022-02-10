<template>
    <div class="option-wrapper">
        <div class="chat-option" @click="sendOption(option)"> 
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
        },
    },
    methods: {
        sendOption(selectedOption){  
            this.$store.dispatch('botModule/selectOption', selectedOption); 
        },
    },
    computed:{
         userToken(){
            return this.$store.getters['botModule/getUserToken'];
        },
        category(){
            return this.$store.getters['botModule/getCategory'];
        }
    }


        
}
</script>