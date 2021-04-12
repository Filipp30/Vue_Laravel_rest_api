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
  mounted() {
    // new Pusher('8a34625906a44e573ba7',{
    //   appId: "1169667",
    //   secret: "f47f12dccf48e6e0286a",
    //   useTLS: true,
    //   cluster: "eu",
    // }).subscribe('my-channel')
    //     .bind('my-event', function(data) {
    //   console.log(data)
    // });
  }
}
</script>

