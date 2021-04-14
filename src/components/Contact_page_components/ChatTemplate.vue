<template>
  <div class="chat_template">

    <header class="header">
        <h1>Chat</h1>
        <p class="name_typing"> {{name_typing}}</p>
        <button v-on:click="remove_chat_session">Close</button>
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

</template>

<script>

import {debounce} from "lodash";
import Spinner from "../Spinner";
import axios from "axios";
import Pusher from "pusher-js";

export default {
    name: "ChatTemplate",
    props:['user'],
    components:{
      Spinner,


    },

    data(){
        return{
            messages:[],
            name_typing:'',
            reset_show_typing_event:debounce(function () {this.name_typing =''}, 1300),
            form:{
                input_message:'',
                name: this.user.name,
                chat_session: localStorage.getItem('chat_session')
            },
            spinner:false,
            information_status_field_chat_template:'',
            channel:''
        }
    },
    mounted() {
      this.spinner = true;
      this.get_all_session_chat_messages();

      //Chat Event Listeners / Handlers
      this.channel = new Pusher('8a34625906a44e573ba7',{
        useTLS: true,
        forceTLS: true,
        encrypted: true,
        cluster: "eu",
        authTransport:'ajax',
        authEndpoint: 'http://127.0.0.1:8000/api/pusher/auth',
        auth:{
          headers:{
              Authorization:`Bearer ${localStorage.getItem('jwt_token')}`
          }
        }
      }).subscribe('private-my-channel');

      this.channel.bind('client-user_typing',(data)=>{
        // this.name_typing = data;
        // this.reset_show_typing_event();
        console.log(data);
      })
      .bind('NewMessage',(data)=>{
        console.log(data)
        if (data.session === localStorage.getItem('chat_session')){
          this.addChatMessageFromEventListenerToLocalArray(data);
        }
      });


    },

    methods:{

      get_all_session_chat_messages() {
        localStorage.getItem('chat_session');
        axios.get(this.$store.state.axios_request_url+'/api/chat/get_chat_session_messages',
            {headers:{"Authorization" : `Bearer ${localStorage.getItem('jwt_token')}`},
              params:{chat_session:localStorage.getItem('chat_session')}
        }).then(response=>{
          this.messages = response.data
          console.log(this.messages)
        }).catch(error=>{
          console.log(error)
        }).finally(()=>{
          this.spinner = false
        })
      },

      post_message(){
        this.information_status_field_chat_template = 'shipment...';
        axios.post(this.$store.state.axios_request_url+'/api/chat/add_message',
            this.form,
            {
              headers: {"Authorization": `Bearer ${localStorage.getItem('jwt_token')}`}
        }).then((response)=>{
          this.form.input_message='';
          this.information_status_field_chat_template = response.data.message;
        }).catch((error)=>{
          this.information_status_field_chat_template = error;
        }).finally(()=>{
          setTimeout(()=>{
            this.information_status_field_chat_template = '';
          },1500)
        })
      },

      addChatMessageFromEventListenerToLocalArray(data){
        this.messages.push(data);
      },

      remove_chat_session:function(){
        this.spinner = true;
        axios.post(this.$store.state.axios_request_url+'/api/chat/remove_chat_session',
            {chat_session:localStorage.getItem('chat_session')},
            {headers:{"Authorization" : `Bearer ${localStorage.getItem('jwt_token')}`}
          }).then((response)=>{
            console.log(response)
            localStorage.removeItem('chat_session')
            this.form.chat_session = '';
            this.$router.push({name: 'Home'});
          }).catch((error)=>{
            console.log(error)
          }).finally(()=>{
            this.spinner = false;
        });
      }
    },
    watch:{
      'form.input_message': function(){
        this.channel.trigger('client-user_typing',{name:this.user.name,chat_session:this.chat_session});
      },
    },

}
</script>

<style lang="scss" scoped>
@import "../../assets/styles/_app.sass";
.chat_template{
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
        overflow-y: auto;
        padding: 1px 10px;
    }
    //.messages::-webkit-scrollbar {
    //    width: 6px;
    //}
    //.messages::-webkit-scrollbar-track {
    //    background: #ddd;
    //}
    //.messages::-webkit-scrollbar-thumb {
    //    background: #bdbdbd;
    //}

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
</style>
