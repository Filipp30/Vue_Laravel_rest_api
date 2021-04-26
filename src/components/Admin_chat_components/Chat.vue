<template>
  <section class="chat">

      <div class="chat__list">
        <Spinner_2 v-if="pusher_connected !==true" />
        <ChatWaitingList v-if="pusher_connected"  v-on:on_chat_session_clicked="on_chat_session_clicked"/>
      </div>

      <div class="chat__module">
        <header class="header">
          <h1>Chat</h1>
          <p class="name_typing"> {{name_typing}}</p>
          <button v-on:click="remove_this_chat_session">Remove</button>
        </header>

        <Spinner v-if="spinner"/>

        <section class="messages">
          <div  v-for="item in messages" v-bind:key="item.id" >
            <p>{{item.created_at}} - {{item.user.name}} :</p>
            <p>{{item.message}}</p>
            <hr>
          </div>
        </section>

        <form @submit.prevent="post_message" class="inp_form">
          <input v-model="form.input_message" type="text" class="input" placeholder="Enter your message...">
          <button type="submit" class="btn">Send</button>
        </form>

        <p class="info_bottom">{{information_status_field_chat_template}}</p>
      </div>

  </section>
</template>

<script>


import ChatWaitingList from "./ChatWaitingList";
import {debounce} from "lodash";
import Spinner from "../Spinner";
import Spinner_2 from "../Spinner_2";
import axios from "axios";
import Pusher from "pusher-js";
import {mapState} from "vuex";

export default {
  name: "Chat",

  props:['user'],

  components:{
    Spinner_2,
    ChatWaitingList,
    Spinner,
  },

  data(){
    return{
      messages:[],
      name_typing:'',
      information_status_field_chat_template:'',

      reset_show_typing_event:debounce(function () {this.name_typing =''}, 1300),
      spinner:false,
      pusher_connected:false,

      form:{
        input_message:'',
        name: '',
        chat_session:''
      },
    }
  },

  computed:{
    ...mapState(['contact_chat_channel','channel_connection_status']),
  },

  watch:{

    'form.input_message': function(){
      this.contact_chat_channel.trigger('client-user_typing',{name:this.user.name,session:this.form.chat_session});
    },

    channel_connection_status(){
      if (this.channel_connection_status === 'connected'){
        this.pusher_connected = true;
        this.chat_event_listener();
      }else{
        this.pusher_connected = false;
        this.get_pusher_connection();
      }
    }
  },

  mounted() {
    this.get_pusher_connection();
  },

  methods:{
    get_pusher_connection(){
      if (this.channel_connection_status !=='connected'){
        this.pusher_connected = false;
        this.$store.dispatch('set_channel');
      }else if (this.channel_connection_status === 'connected'){
        this.pusher_connected = true;
      }
    },

    chat_event_listener(){
      Pusher.logToConsole = false;
      this.contact_chat_channel.bind('pusher:subscription_succeeded', function() {
      }).bind('App\\Events\\NewMessage',(data)=>{
        if (parseInt(data.session) === parseInt(this.form.chat_session)){
          this.addChatMessageFromEventListenerToLocalArray(data);
        }
      }).bind('client-user_typing',(data)=>{
        if (parseInt(data.session) === this.form.chat_session){
          this.name_typing = data.name+' typing...';
          this.reset_show_typing_event();
        }
      });
    },

    on_chat_session_clicked(session){
      this.spinner = true;
      this.form.chat_session = session;
      axios.get(this.$store.state.axios_request_url+'/api/chat/get_chat_session_messages',
          {headers:{"Authorization" : `Bearer ${sessionStorage.getItem('jwt_token')}`},
            params:{chat_session:session}
          }).then(response=>{
          this.messages = response.data;

      }).catch(error=>{
        this.use_chat_area_for_show_error_messages(error.status)

      }).finally(()=>{
        this.spinner = false;
      })
    },

    post_message() {
      this.information_status_field_chat_template = 'shipment...';
      axios.post(this.$store.state.axios_request_url + '/api/chat/add_message',
          this.form, {
            headers: {"Authorization": `Bearer ${sessionStorage.getItem('jwt_token')}`}
          }).then((response) => {
          this.form.input_message = '';
          this.information_status_field_chat_template = response.data.message;
      }).catch((error) => {
          this.information_status_field_chat_template = error;
      }).finally(() => {
          setTimeout(() => {
          this.information_status_field_chat_template = '';
        }, 1500)
      })
    },

    addChatMessageFromEventListenerToLocalArray(data){
      this.messages.push(data);
    },

    remove_this_chat_session(){
      if (!this.form.chat_session){
        this.use_chat_area_for_show_error_messages('Select first a session');
        return;
      }
      this.spinner = true;
      axios.post(this.$store.state.axios_request_url+'/api/chat/remove_chat_session',
          {chat_session:this.form.chat_session},
          {headers:{"Authorization" : `Bearer ${sessionStorage.getItem('jwt_token')}`}
          }).then(()=>{
          this.use_chat_area_for_show_error_messages('Chat Session: '+this.form.chat_session+' was removed.');
          this.form.chat_session = '';
      }).catch((error)=>{
          this.use_chat_area_for_show_error_messages(error);
      }).finally(()=>{
          this.spinner = false;
      });
    },

    use_chat_area_for_show_error_messages(error_message){
        this.messages = '';
        this.messages = [{created_at:'--->',user:{name:'Error : '},
        message:error_message}];
    }

  },
}
</script>

<style lang="scss" scoped>
@import "../../assets/styles/_app.sass";
@import "../../assets/styles/_scrollbar";
  .chat{
    margin: auto;
    width: 700px;
    display: flex;
    justify-content: space-between;
    &__list{

    }
    &__module{

      box-shadow: 0px 1px 18px -3px rgba(0,0,0,0.75);
      height: 500px;
      max-width: 450px;
      display: flex;
      flex-direction: column;
      justify-content: space-between;

      .header{
        flex: 1;
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding:0 10px 0 10px;
        border-bottom: 1px solid #1a202c;
        button{
          outline: none;
          border: 1px solid white;
          border-radius: 2px;
          background-color:gray;
          color:white;
          font-size: 20px;
        }
        button:hover{
          cursor: pointer;
          background-color: transparent;
          border-radius: 2px;
          border: 1px solid black;
          color: black;
        }
        .name_typing{
          height: 20px;
        }
      }
      .messages{
        height: 400px;
        overflow-y: scroll;
        padding: 1px 10px;
      }
      @include scrollbar('.messages');

      .inp_form {
        border-top: 1px solid #1a202c;
        margin-bottom: 0;
        flex: 1;
        display: flex;
        padding: 10px;

        .input {
          border-radius: 3px;
          font-size: 17px;
          flex:8;
          background: #ddd;
          height: 40px;
        }
        .btn {
          border-radius: 3px;
          flex:1;
          margin-left: 10px;
          background: $btn_under_line_color;
          color: #fff;
          font-weight: bold;
          cursor: pointer;
          transition: background 0.23s;
        }
        .btn:hover {
          background: $btn_under_line_color;
        }
      }
      .info_bottom{
        margin:0 110px;
        font-size: 15px;
        height: 0px;
      }
    }

  }
</style>