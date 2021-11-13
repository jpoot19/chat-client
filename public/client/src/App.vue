<template>
  <div>
    <div v-if="$store.state.isUserAuth">
      <div>{{$store.state.user}}</div>
      <div>{{$store.state.authToken}}</div>
       <div>{{$store.state.channel}}</div>
   </div>
  
    <Chat></Chat>
  
  </div>
</template>

<script>
import Chat from './components/Chat.vue'

export default {
  name: 'App',
  components: {
    Chat,
  }
}
</script>



<style>
:root{
        --text-1: #333;
        --text-2: #666;
        --text-3: #999;
        --line: #CCC;
        --time-bg: #EEE;
        --background: #F7F7F7;
         --form-gray-dark: #88898b;
    }
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}
</style>
