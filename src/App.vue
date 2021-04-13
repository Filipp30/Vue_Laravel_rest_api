<template>
  <div>
    <Navi/>
    <router-view/>
  </div>
</template>

<script>

import Navi from "./components/Navi";
import Pusher from "pusher-js";

Pusher.logToConsole = true;
export default {
  name: 'App',
  components: {
    Navi
  },

}
</script>

