<template>
  <div id="app">
    <div class="app-container">
      <Header/>
      <router-view/>
    </div>
  </div>
</template>

<script>
import { defineComponent } from '@vue/composition-api'
import DtacHeader from './components/layout/DtacHeader.vue'
import Header from './components/layout/Header.vue'

export default defineComponent({
  setup() {
    
  },
  components: {
    DtacHeader,
    Header
  }
})
</script>

<style lang="less">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  height: 100%;
  .app-container{
    width: 100vw;
    // background-color: rgba(228, 215, 173, 0.14);
  }
}
nav {
  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>
