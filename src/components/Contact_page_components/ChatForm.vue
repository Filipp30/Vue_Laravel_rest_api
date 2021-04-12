<template>
  <div class="chat">

    <h1 class="title">
        You can now Live chat with us ...
    </h1>

    <div class="chat__content">

        <div v-if="user_is_authenticated"   class="authenticated">
          <div v-if="chat_is_connected === false" class="chat_connect">
              <p>Welcome {{user_information.name}}</p>
              <button v-on:click="get_chat_connection">Connect to Live-Chat</button>
          </div>

          <div v-if="chat_is_connected" class="chat__template">
              <ChatTemplate
                  v-bind:user="user_information"/>
          </div>
        </div>

        <div v-if="show_redirect_link_if_unauthenticated" class="unauthenticated">
            <p>You are unauthenticated ! Pleas first log in...</p>
            <RouterLink to="/auth">Go to Auth page</RouterLink>
        </div>

        <Spinner v-if="spinner"/>

    </div>
  </div>
</template>

<script>
import Spinner from "../Spinner";
import ChatTemplate from "./ChatTemplate";
import axios from "axios";

export default {
  name: "ChatForm",

  components:{
    Spinner,
    ChatTemplate
  },

  data(){
    return{
      user_information:'',
      unique_chat_session_token:'',
      spinner:false,
      user_is_authenticated:false,
      chat_is_connected:false,
      show_redirect_link_if_unauthenticated:false
    }
  },

  mounted() {
    this.get_user_authentication();
  },
  methods:{

    get_user_authentication(){
      this.spinner = true;
      axios.get('http://127.0.0.1:8000/api/user',
          {headers:{"Authorization" : `Bearer ${localStorage.getItem('jwt_token')}`}
          }).then(response=>{
        this.user_information = response.data;
        this.user_is_authenticated = true;

      }).catch(err=>{
        console.log(err);
        this.show_redirect_link_if_unauthenticated = true;

      }).finally(()=>{
        this.spinner = false;
      });
    },

    get_chat_connection() {
      this.spinner = true;
      setTimeout(()=>{
        this.chat_is_connected = true;
        this.spinner = false;
      },5000);
    }
  },
}
</script>

<style lang="scss" scoped>
@import "../../assets/styles/_app.sass";

@mixin a_link{
  a{
    text-decoration: none;
    color: gray;
    font-size: 1rem;
    font-weight: bold;
    &:after{
      content: '';
      display: block;
      border-bottom: 2px solid $btn_under_line_color;
      width: 0;
      -webkit-transition: 0.5s ease;
      transition: 0.5s ease;
    }
    &:hover:after { width: 30%; }
  }
  a:hover{
    cursor: pointer;
  }
}
.chat{

  .title{
    background-color:$background_color;
    padding: 5px;
    margin-top: 20px;
  }

  &__content{
    .authenticated{
      .chat_connect{
          @include a_link;
      }
    }
    .unauthenticated{
      @include a_link;
    }
  }
}
@media screen and (max-width:540px){
  .chat{
    .title{
        font-size: 15px;
    }
  }
}
</style>
