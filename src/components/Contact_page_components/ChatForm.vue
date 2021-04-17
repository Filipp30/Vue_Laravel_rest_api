<template>
  <div class="chat">

    <h1 class="title">
        You can now Live chat with us ...
    </h1>

    <div class="chat__content">

        <div v-if="user_is_authenticated"   class="authenticated">
          <div v-if="chat_session_exist === false" class="chat_connect">
              <p>Welcome {{user.name}}</p>
              <button v-on:click="create_new_chat_session">Connect to Live-Chat</button>
          </div>

          <div v-if="chat_session_exist" class="chat__template">
              <ChatTemplate/>
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
      user:'',
      unique_chat_session_token:'',
      spinner:false,
      user_is_authenticated:false,
      show_redirect_link_if_unauthenticated:false,
      chat_session_exist:false,
    }
  },

  mounted() {
    this.get_user_authentication();
  },
  methods:{

    get_user_authentication(){
      this.spinner = true;
      axios.get(this.$store.state.axios_request_url+'/api/user',
          {headers:{"Authorization" : `Bearer ${localStorage.getItem('jwt_token')}`}
      }).then(response=>{
        sessionStorage.setItem("user_name",response.data.name)
        this.user = response.data;
        this.user_is_authenticated = true;
        if (localStorage.getItem('chat_session')){
          this.chat_session_exist = true
        }
      }).catch(err=>{
        console.log(err);
        this.show_redirect_link_if_unauthenticated = true;

      }).finally(()=>{
        this.spinner = false;
      });
    },

    create_new_chat_session() {
      this.spinner = true;
      axios.get(this.$store.state.axios_request_url+'/api/chat/create_new_chat_session',
        {headers: {"Authorization": `Bearer ${localStorage.getItem('jwt_token')}`}
        }).then(response=>{
          localStorage.setItem('chat_session',response.data);
          this.chat_session_exist = true;
        }).catch(error=>{
          console.log(error)
        }).finally(()=>{
          this.spinner = false
      });
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
     margin-top: 20px;
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
