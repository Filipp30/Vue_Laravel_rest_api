<template>
  <div>

    <div>
      <h1>Admin page</h1>
    </div>

    <section v-if="user_authenticated === false"  class="waiting_authentication">
      <Spinner_2 v-if="spinner"/>
      <h3 class="error_auth">{{errors.auth}}</h3>
    </section>

    <section v-if="user_authenticated" class="auth_account">
      <h1>Welcome <span><h3>{{user.name}}</h3></span></h1>
      <h3>This page is under construction !</h3>
      <button v-on:click="log_out">Log Out</button>
      <Spinner_2 v-if="spinner"/>
    </section>

    <section>
      <Chat/>
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
      errors:{
        auth:''
      }
    }
  },
  beforeMount() {
    this.spinner = true;
    this.get_user_authentication();
  },
  methods:{
    get_user_authentication(){
      axios.get(this.$store.state.axios_request_url+'/api/user',
          {headers:{"Authorization" : `Bearer ${localStorage.getItem('jwt_token')}`}
          }).then(response=>{
        if (!response.data['isAdmin']){
          this.$router.push('my_account');
        }
        this.user = response.data;
        this.user_authenticated = true;

      }).catch(err=>{
        console.log(err);
        this.errors.auth = 'Unauthenticated.Please sign in.';
        setTimeout(()=>{
          this.$router.push('Auth');
        },2000);

      }).finally(()=>{
        this.spinner = false;
      });
    },
    log_out(){
      this.spinner = true;
      axios.post('http://127.0.0.1:8000/api/logout',
          {id:this.user.id},
          {headers:{"Authorization" : `Bearer ${localStorage.getItem('jwt_token')}`}

          }).then(response=>{
        console.log(response.data.message)
        localStorage.removeItem('jwt_token');
      }).catch(error=>{
        console.log(error);
      }).finally(()=>{
        this.$router.push('Auth');
      });
    },


  }
}
</script>

<style lang="scss" scoped>
@import "../assets/styles/_app.sass";
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
.auth_account{
  margin: 50px auto;
  border: 1px solid black;
  height: 400px;
  width: 400px;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
}

</style>