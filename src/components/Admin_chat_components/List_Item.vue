<template>
  <div v-on:click="on_chat_session_clicked" class="item">

    <header class="item__userInformation">
      <ul>
        <li>session: <span>{{item.session}}</span></li>
        <li>created_at: <span>{{item.created_at}}</span></li>
        <li>username: <span>{{item.user.name}}</span></li>
        <li>email: <span>{{item.user.email}}</span></li>
      </ul>
    </header>

    <footer class="item__listener">
        <div class="new_message_active" v-bind:class="{'new_message_style': show_new_message_exist}">
          <p v-if="show_new_message_exist">new message</p>
        </div>

        <div class="typing_active" v-bind:class="{'typing_active_style': show_typing_active}">
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
    height: 140px;
    border: 2px solid gray ;
    border-top-right-radius: 150px;
    border-bottom-left-radius: 50px;

    &__userInformation{
      font-size:17px;
      font-weight: bold;
      line-height: 25px;

      ul{
        li{
          span{
            color: #6b6060;
          }
        }
      }
    }

    &__listener{
      width: 300px;
      height: 25px;
      margin:5px auto;
      display: flex;
      justify-content: space-between;

      div{
        background-color: aliceblue;
        width: 120px;
        height: 25px;
        font-size:17px;
        font-weight: bold;
        display: flex;
        justify-content: center;
        align-content: center;
        border-top-right-radius: 150px;
        border-bottom-left-radius: 150px;
      }
      .new_message_style{
        box-shadow: 0px 1px 18px -3px red;
      }
      .typing_active_style{
        box-shadow: 0px 1px 18px -3px blue;
      }
    }
  }

  .item:hover{
    box-shadow: 0px 1px 18px -3px gray;
  }
</style>