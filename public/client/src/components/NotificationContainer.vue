<template>
    <div class="notification-container">
        <NotificationContent
            v-for="notification in notifications"
            :key="notification.id"
            :notification="notification"
         />
    </div>
</template>

<script>
    import NotificationContent from '@/components/NotificationContent.vue'
    import { mapState } from 'vuex'

    export default {
        components:{
            NotificationContent
        },
        computed: mapState('notification', ['notifications'])
    }

</script>



<style scoped>
.notification-container {
  position: fixed;
  top: 20em;
  left: 95em;
  z-index: 2147483649;
}
</style>