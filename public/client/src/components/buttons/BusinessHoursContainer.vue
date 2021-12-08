<template>
    <div>
        <div class="button" @click="toggleButton">
            <span class="icon"><headset-icon width="21" height="21"/></span> Horarios de atención   
        </div>
        <transition name="fade">
            <div class="modal" v-if="showModal">
                <!-- <button class="close" @click="showModal = false">x</button> -->
                <div class="modal-content">
                    <span class="support-available">Lunes a Viernes de 9:00 hrs a 18:00 hrs</span>
                </div>
                
            </div>
        </transition>
        
    </div>
    

    
</template>

<script>
    import HeadsetIcon from '@/components/icons/Headset-solid.vue';
    export default {
        name: 'BusinessHours',
        components:{
            HeadsetIcon
        },
        data(){
            return {
                showModal: false
            }
        },
        methods: {

                toggleButton(){
                    this.showModal = !this.showModal;
                }
            
        },
        
    }
</script>

<style scoped>
    .modal-overlay{
        position: absolute;
        z-index: 100;
        background: rgba(0, 0,0, 0.4);
    }
    .modal{
        position: relative;
        display: flex;
        flex-direction: column;
        width: 100%;
        pointer-events: auto;
        background-color: #fff;
        background-clip: padding-box;
        border: 1px solid rgba(0,0,0,.2);       
        border-radius: 0.3rem;
        outline: 0

    }
    .modal-content{
        display: flex;
        align-items: flex-start;
        justify-content: space-between;
        padding: 1rem 1rem;
        border-bottom: 1px solid #dee2e6;
        border-top-left-radius: calc(.3rem - 1px);
        border-top-right-radius: calc(.3rem - 1px);
    }
    .close{
        float: right;
        font-size: 1.5rem;
        font-weight: 700;
        line-height: 1;
        color: #000;
        text-shadow: 0 1px 0 #fff;
        opacity: .5;
    }
</style>


