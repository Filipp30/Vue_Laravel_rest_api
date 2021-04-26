<template>
  <div>

    <section v-if="user_authenticated === false"  class="waiting_authentication">
      <Spinner_2 v-if="spinner"/>
      <h3 class="error_auth">{{errors.auth}}</h3>
    </section>

    <section v-if="user_authenticated" class="main">
        <header  class="main__header">
          <h3>Welcome {{user.name}}</h3>
          <nav class="navigation">
            <button v-on:click="show_chat_room = !show_chat_room">Chat Room</button>
            <button>Edit Shop</button>
            <button>Edit Forum</button>
            <button>Orders</button>
            <button v-on:click="log_out">Log Out</button>
          </nav>
        </header>

        <section>
          <Chat v-if="show_chat_room" v-bind:user="user" />
        </section>
    </section>

  </div>
</template>

<script>
import axios from "axios";
import Spinner_2 from "../components/Spinner_2";
import Chat from "../components/Admin_chat_components/Chat";


export default {
  name: "Admin",
  components:{
    Spinner_2,
    Chat
  },

  data(){
    return{
      user:{},
      user_authenticated:false,
      spinner:false,
      show_chat_room:false,

      errors:{
        auth:''
      }
    }
  },
  mounted() {
    this.get_user_authentication();
  },
  methods:{

    get_user_authentication(){
      this.spinner = true;
      axios.get(this.$store.state.axios_request_url+'/api/user',
          {headers:{"Authorization" : `Bearer ${sessionStorage.getItem('jwt_token')}`}
          }).then(response=>{
        if (!response.data['isAdmin']){
          this.$router.push('my_account');
        }
        this.user = response.data;
        this.user_authenticated = true;

      }).catch(err=>{
        this.errors.auth = 'Unauthenticated.Please sign in.'+err.error;
        setTimeout(()=>{
          this.$router.push('Auth');
        },1500);

      }).finally(()=>{
        this.spinner = false;
      });
    },

    log_out(){
      this.spinner = true;
      axios.post(this.$store.state.axios_request_url+'/api/logout',
          {id:this.user.id},
          {headers:{"Authorization" : `Bearer ${sessionStorage.getItem('jwt_token')}`}

      }).then(response=>{
        this.errors.auth = response.data.message;
        sessionStorage.removeItem('jwt_token');
      }).catch(error=>{
        this.errors.auth = error;
      }).finally(()=>{
        this.spinner = false;
        this.$router.push('Auth');
      });
    },

  }
}
</script>

<style lang="scss" scoped>
@import "../assets/styles/_app.sass";
@import "../assets/styles/_button.scss";
.waiting_authentication{
  height: 90vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  .error_auth{
    color: $font_color;
  }
}

.main{

  &__header{
    height: 100px;
    border: 1px solid black;
    display: flex;
    align-items: center;
    justify-content: space-around;

    .navigation{
      width: 550px;
      display: flex;
      justify-content: space-around;
      align-items: center;
      @include btn(110px);
    }
  }


}


</style>