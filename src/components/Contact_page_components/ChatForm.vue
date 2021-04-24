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
            <p>{{show_error_info}}</p>
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
import {mapGetters, mapState} from "vuex";
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
      show_error_info:'',

      spinner:false,

      user_is_authenticated:false,
      show_redirect_link_if_unauthenticated:false,
      chat_session_exist:false,
    }
  },
  computed:{
    ...mapGetters(['exitChat']),
    ...mapState(['channel_connection_status'])
  },

  watch:{
    exitChat(){
      this.chat_session_exist = false;
    },

    channel_connection_status(){
      if (this.channel_connection_status === 'connected'){
        this.user_is_authenticated = true;
        this.spinner = false;
      }
    }
  },

  mounted() {
    //if authenticated  --> get_pusher_connection --> get_chat_session --> redirect to chat-template
    this.get_user_authentication();
  },

  methods:{

    //get user authentication and private-pusher-channel authentication -->
    // if all true --> create new chat session if not exist
    get_user_authentication(){
      if (!sessionStorage.getItem('jwt_token')){
        this.show_redirect_link_if_unauthenticated = true;
        return;
      }

      this.spinner = true;
      axios.get(this.$store.state.axios_request_url+'/api/user',
          {headers:{"Authorization" : `Bearer ${sessionStorage.getItem('jwt_token')}`}

      }).then(response=>{
        sessionStorage.setItem("user_name",response.data.name)
        this.user = response.data;
        this.check_pusher_connection();
        //if pusher is connected --->this.user_is_authenticated = true;

        if (sessionStorage.getItem('chat_session')){
          this.chat_session_exist = true;
        }
        if (this.channel_connection_status === 'connected'){
          this.spinner = false;
        }

      }).catch(err=>{
        this.show_redirect_link_if_unauthenticated = true;
        this.show_error_info = err.message;
        this.spinner = false;
      })
    },

    create_new_chat_session() {
      this.spinner = true;

      axios.get(this.$store.state.axios_request_url+'/api/chat/create_new_chat_session',
        {headers: {"Authorization": `Bearer ${sessionStorage.getItem('jwt_token')}`}
        }).then(response=>{
          sessionStorage.setItem('chat_session',response.data.chat_session);
          this.chat_session_exist = true;
        if (this.channel_connection_status === 'connected'){
          this.spinner = false;
        }
        }).catch(error=>{
          this.spinner = false;
          this.show_error_info = error.message;
        });
    },

    check_pusher_connection(){
      if (this.channel_connection_status === 'connected'){
        this.user_is_authenticated = true;
        this.spinner = false;
      }else{
        this.show_error_info = 'making connection please wait ...'
        this.$store.dispatch('set_channel');
      }
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
