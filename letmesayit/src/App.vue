<template>
  <div id="app">
    <textbox></textbox>
    <TheFooter></TheFooter>
  </div>
</template>

<script>
import Textbox from './components/Textbox'
import TheFooter from './components/Footer'

export default {
  name: 'app',
  components: {
    Textbox, TheFooter
  }
}
</script>

<style>
#app {

}
</style>
