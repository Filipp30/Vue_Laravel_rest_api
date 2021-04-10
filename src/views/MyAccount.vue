<template>
<div>
  <section v-if="spinner" class="waiting_authentication">
    <Spinner_2/>
  </section>

  <button v-on:click="log_out">Log Out</button>



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
      spinner:true
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
        this.user = response.data;
        this.spinner = false;
      }).catch(err=>{
        this.$router.push('Auth');
      })
    },
    log_out:async function(){
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
  .waiting_authentication{
    height: 90vh;
    display: flex;
    justify-content: center;
    align-items: center;
  }

</style>