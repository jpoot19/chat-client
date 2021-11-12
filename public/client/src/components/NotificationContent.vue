<template>
    <div class="notification-wrapper animated-notification" :class="notificationCs">
        <div class="icon-area d-flex align-items-center justify-content-center">
            <i></i>
        </div>
        <div class="text-area">
            <button type="button" class="close" @click="dismiss()">
                <span aria-hidden="true">&times;</span>
            </button>
            <p class="notification-title mb-0"> {{notification.title}} </p>
            <p class="notification-message mb-0 mt-1" v-if="notification.message"> 
                {{ notification.message }} 
            </p> 
            <ul 
                class="notification-list mb-0 mt-1" 
                v-for="(noti, index) in notification.list"
                v-bind:key="'notification-error-'+index"> 
                <li> {{ noti }} </li>
      </ul>
        </div>
    </div>
</template>


<script>
 import { mapActions } from 'vuex'

export default {
    props: {
      notification: {
        type: Object,
        required: true
      }
    },
    data() {
      return {
        timeout: null,
        notificationCs: ''
      }
    },
     
    mounted() {
      if(this.notification.timeout)
        this.timeout = setTimeout(() => this.remove(this.notification), 3000);
      this.notificationCs = ` ${this.notification.type}`;
    },
    computed: {
      iconClass(){
        let cs = '';
        switch (this.notification.type) {
          case 'success':
            cs = 'fas fa-check';
            break
          case 'error':
            cs = 'fas fa-times';
            break
          case 'warning':
            cs = 'fas fa-exclamation';
            break
        }
        return cs;
      }
    },

    methods: {
        dismiss(){
        this.notificationCs = `out`;
        this.timeout = setTimeout(() => this.remove(this.notification), 10);
      },
        ...mapActions('notification', ['remove']),
    },
}
</script>



<style scoped>
    .notification-wrapper{
        display: flex;
        /* background-color: #fff; */
        min-width: 15em;
        min-height: 50px;
        box-shadow: 0 2px 5px 0 rgba(0,0,0,.42);
        border-radius: 0.25rem;
        margin-bottom: 1rem;
        }

    .animated-notification{
        animation: moveOpen 0.5s;
        -webkit-animation: moveOpen 0.5s;
    }
    .text-area{
        flex-grow: 1;
        padding: 1rem 1.5rem;
        position: relative;
    }
    .notification-title{
        font-weight: bold;
        /* color: #ffff; */
        font-size: 18px;
    }
    .notification-message{
        /* color: #ffff; */
        font-size: 14px;
    }
    .notification-list{
        padding-inline-start: 20px;
        /* color: #ffff; */
        list-style-type: none;
        margin: 1px;
      padding: 0px;
    }
    .notification-wrapper.success {
      background-color: #a8f0c6;
      border-left: 5px solid #178344;

    }
    .notification-wrapper.error {
        background-color: #f7a7a3;
        border-left: 5px solid #8f130c
    }
    .notification-wrapper.warning {
        background-color: #ffc107;
    }
    button.close{
        position: absolute;
        opacity: 0.5;
        border-width: 1px;
        border-style: solid;
        border-radius: 50%;
        right: 15px;
        top: 5px;
        text-align: center;
        font-size: 1.6em;
        cursor: pointer
        /* right: 0.5rem;
        top: 0.5rem; */
    }

    @keyframes moveOpen 
    {
        0% {
            transform: translateX(-500px);
        }
    100% {
        transform: translateX(0);
    }
    }
    @-webkit-keyframes moveOpen 
    {
    0% {
        -webkit-transform: translateX(-500px);
    }
    100% {
        -webkit-transform: translateX(0);
    }
    }
</style>