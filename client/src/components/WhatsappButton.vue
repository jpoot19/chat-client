<template>
    <div>
        <a :href="whatsappUrl" class="button" target="_blank"><span class="icon"><WhatsappIcon width="22" height="22"/></span> Whatsapp </a>
    </div>
</template>

<script>
    import WhatsappIcon from './icons/Whatsapp-brands.vue';
    // require('./asses')
    export default{
         name: 'WhatsappButton',
         components:{
             WhatsappIcon
         },
         data(){
             return {
                 whatsappUrl: "https://api.whatsapp.com/send?phone=+5219984001812"
             }
         },
         methods: {
            //  playSound(){
            //      const audio = new Audio(require("@/assets/style.css"));                
            //     audio.play();
            //  }
         },
    }
</script>

