<template>
  <div>
    <Navi/>
    <router-view/>
  </div>
</template>

<script>

import Navi from "./components/Navi";
export default {
  name: 'App',
  components: {
    Navi
  },
}
</script>

