<template>
  <div>
    <section v-if="auth === false"  class="waiting_authentication">
      <Spinner_2 v-if="spinner"/>
      <h3 class="error_auth">{{errors.auth}}</h3>
    </section>

    <section v-if="auth" class="auth_account">
      <h1>Welcome <span><h3>{{user.name}}</h3></span></h1>
      <h3>This page is under construction !</h3>
      <button v-on:click="log_out">Log Out</button>
      <Spinner_2 v-if="spinner"/>
    </section>
  </div>
</template>

<script>
import axios from "axios";
import Spinner from "../components/Spinner";
import Spinner_2 from "../components/Spinner_2";
export default {
name: "MyAccount",
  components:{Spinner,Spinner_2},
  data(){
    return{
      user:{},
      auth:false,
      spinner:true,
      errors:{
        auth:''
      }
    }
  },
  beforeMount() {
    this.spinner = true;
    this.get_user();
  },
  methods:{
    get_user:async function(){
      await axios.get('http://127.0.0.1:8000/api/user',
      {headers:{"Authorization" : `Bearer ${localStorage.getItem('jwt_token')}`}})
      .then(response=>{
        this.spinner = false;
        this.user = response.data;
        this.auth = true;
      }).catch(err=>{
        this.spinner = false;
        this.errors.auth = 'Unauthenticated.Please sign in.';
        setTimeout(()=>{
          this.$router.push('Auth');
        },3000);
      })
    },
    log_out:async function(){
       this.spinner = true;
       await axios.post('http://127.0.0.1:8000/api/logout',
      {id:this.user.id},
     {headers:{"Authorization" : `Bearer ${localStorage.getItem('jwt_token')}`}
      }).then(response=>{
         console.log(response.data.message)
         localStorage.removeItem('jwt_token');
         this.$router.push('Auth');
      }).catch(error=>{
         this.$router.push('Auth');
      })
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