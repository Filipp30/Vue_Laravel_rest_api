<template>
  <section class="logout">

    <h1>Welcome</h1>
    <p>{{user.name}}</p>
    <button>My Account</button>
    <button v-on:click="log_out">Log Out</button>
    <p>This page is under construction</p>

  </section>
</template>

<script>
import axios from "axios";

export default {
  name: "Logout",
  props:['user'],
  data(){
    return{

    }
  },
  methods:{
    log_out:function (){
      let _this = this;
      axios.post('http://127.0.0.1:8000/api/logout',
          {id:this.user.id},
          {headers:{"Authorization" : `Bearer ${this.$session.get('jwt_token')}`}
          }).then(function(response){
            console.log(response.data.message)
            _this.$router.push('Home');
      }).catch(function(error){
        console.log(error)
      })
    }
  }


}
</script>

<style lang="scss" scoped>
.logout{
  margin: auto;
  width: 300px;
}
</style>