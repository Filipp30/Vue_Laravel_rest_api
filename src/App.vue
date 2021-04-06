<template>
  <Navi/>
  <router-view/>
</template>

<script>

import Navi from "./components/Navi";
export default {
  name: 'App',
  components: {
    Navi
  }

}
</script>

<style>


</style>
