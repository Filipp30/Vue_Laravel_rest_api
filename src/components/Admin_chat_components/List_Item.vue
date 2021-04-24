<template>
  <div v-on:click="on_chat_session_clicked" class="item">

    <header class="item__userInformation">
      <ul>
        <li>session: {{item.session}}</li>
        <li>created_at: {{item.created_at}}</li>
        <li>username: {{item.user.name}}</li>
        <li>email:{{item.user.email}}</li>
      </ul>
    </header>

    <footer class="item__listener">
        <div class="new_message_active">
          <p v-if="show_new_message_exist">new message</p>
        </div>

        <div class="typing_active">
          <p v-if="show_typing_active">typing...</p>
        </div>
    </footer>

  </div>
</template>

<script>
import Pusher from "pusher-js";
import {debounce} from "lodash";
import {mapState} from "vuex";

export default {
  name: "WaitingList_Item",

  props:['item'],

  data(){
    return{
      show_new_message_exist: false,
      show_typing_active: false,
      reset_show_typing_event:debounce(function () {this.show_typing_active = false}, 1500),
    }
  },

  computed:{
    ...mapState(['contact_chat_channel','channel_connection_status']),
  },

  mounted() {

    if (this.channel_connection_status === 'connected'){
      Pusher.logToConsole =false;
      this.contact_chat_channel.bind('pusher:subscription_succeeded', function() {
      }).bind('App\\Events\\NewMessage',(data)=>{
        if (parseInt(data.session) === this.item.session){
          this.show_new_message_exist = true;
        }
      }).bind('client-user_typing',data=>{
        if (parseInt(data.session) === this.item.session){
          this.show_typing_active = true;
          this.reset_show_typing_event();
        }
      });
    }

  },

  methods:{

    on_chat_session_clicked(){
      this.show_new_message_exist = false;
    }
  }

}
</script>

<style lang="scss" scoped>
  .item{
    background-color: #dddddd;
    width:350px;

    &__userInformation{
      font-size:17px;
      font-weight: bold;
      line-height: 25px;
    }

    &__listener{
      background-color: darkgray;
      display: flex;
      justify-content: space-around;

      div{
        background-color: aliceblue;
        border-radius: 5px;
        width: 100px;
        height: 25px;
        font-size:17px;
        font-weight: bold;
        display: flex;
        justify-content: center;
        align-content: center;
      }

    }
  }
</style>