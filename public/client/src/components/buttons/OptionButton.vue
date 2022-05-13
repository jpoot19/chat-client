<template>
    <div class="option-wrapper">
        <v-button class="chat-option" @click.once="sendOption(option)" :disabled="true"> 
            {{option.label}}
        </v-button>
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
        },
       
    }


        
}
</script>