<template>
  <div class="chat_template">

    <header class="header">
        <h1>Chat</h1>
        <p class="name_typing"> {{name_typing}}</p>
        <button v-on:click="remove_chat_session">Close</button>
    </header>

    <Spinner v-if="spinner"/>

    <section  class="messages" id="mess">
      <div  v-for="item in messages" v-bind:key="item.name"  >
        <p>{{item.time}} - {{item.name}} :</p>
        <p>{{item.message}}</p>
        <hr>
      </div>
    </section>

    <form @submit.prevent="post_message" class="inp_form">
        <input v-model="form.input_message" type="text" class="input" placeholder="Enter your message...">
        <button type="submit" class="btn">Send</button>
    </form>

    <p class="info_bottom">information</p>

  </div>
</template>

<script>
import {debounce} from "lodash";
import Spinner from "../Spinner";


export default {
    name: "ChatTemplate",
    props:['user'],
    components:{
      Spinner,
    },

    data(){
        return{
            messages:[],
            chat_session: localStorage.getItem('chat_session'),

            name_typing:'',
            reset_show_typing_event:debounce(function () {this.name_typing =''}, 1300),
            form:{
                input_message:'',
                name: this.user.name,
            },
            spinner:false,

        }
    },
    mounted() {
      this.spinner = true;
      this.get_all_session_chat_messages();


      //Chat Event Listeners / Handlers
      this.$store.state.my_channel
      .bind('user_typing',(data)=>{
        this.name_typing = data;
        this.reset_show_typing_event();
        console.log(data);
      })
      .bind('NewMessage',(data)=>{
        console.log(data);
      });




    },
    methods:{

        get_all_session_chat_messages(){
          localStorage.getItem('chat_session');
          //fetch from backend
          setTimeout(()=>{
            this.messages = [
              {name:'Filipp',time:'12:56:12',message:'Hello'},
              {name:'User',time:'13:59:55',message:'Hey hoeist'},
              {name:'Filipp',time:'14:12:12',message:'jaj goed en met u'},
              {name:'User',time:'14:56:44',message:'Ja heel goed wat doe je '},
              {name:'Filipp',time:'14:56:66',message:'ik programeer nu en je'},
              {name:'User',time:'14:56:77',message:'ook ik schrijf eindwekr'},
              {name:'Filipp',time:'15:56:33',message:'JaJa  nice '},
              {name:'User',time:'15:56:03',message:'heb je al wekr'},
              {name:'Filipp',time:'15:56:04',message:'Neen nog niet en je ?'},
              {name:'User',time:'15:56:77',message:'Nee ik moet nog studeren'},
              {name:'Filipp',time:'16:56:44',message:'Aa oke '},
              {name:'User',time:'16:56:66',message:'Jaja  oke !!!'}];
            this.spinner = false;

          },3000)
        },

        post_message:function(){

        },

        remove_chat_session:function(){

        }
    },
    watch:{
        'form.input_message': function(){
            console.log(this.user.name+"---"+this.chat_session+'--is typing')
          this.$store.state.my_channel.trigger('client-user_typing',{name:this.user.name,chat_session:this.chat_session});
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
    #mess{
        height: 400px;
        overflow-y: scroll;
        padding: 1px 10px;
    }
    .messages::-webkit-scrollbar {
        width: 6px;
    }
    .messages::-webkit-scrollbar-track {
        background: #ddd;
    }
    .messages::-webkit-scrollbar-thumb {
        background: #bdbdbd;
    }

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
