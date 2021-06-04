<template>
  <div class="login_social">
    <div v-on:click="fb_login" class="loginBtn loginBtn--facebook">
      Login with Facebook
    </div>

    <div v-on:click="google_login" class="loginBtn loginBtn--google">
      Login with Google
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "SocialLogin",
  data(){
    return{

    }
  },
  methods:{
    fb_login(){
      axios.get(this.$store.state.axios_request_url+'/api/auth/redirect/fb')
      .then(response => {
        window.location.href = response.data.auth;
      })
      .catch(error =>{
        console.log(error)
      })
    },
    google_login(){
      axios.get(this.$store.state.axios_request_url+'/api/auth/redirect/google')
        .then(response => {
          console.log(response)
          window.location.href = response.data.auth;
        })
        .catch(error =>{
          console.log(error)
        })
    }
  }
}
</script>

<style lang="scss" scoped>
.login_social{
  width: 200px;
  height: 80px;
  display: flex;
  flex-direction: column;

  .loginBtn {
    box-sizing: border-box;
    position: relative;
    /* width: 13em;  - apply for fixed size */
    margin: 0.2em;
    padding: 0 15px 0 46px;
    border: none;
    text-align: left;
    line-height: 34px;
    white-space: nowrap;
    border-radius: 0.2em;
    font-size: 16px;
    color: #FFF;
  }
  .loginBtn:before {
    content: "";
    box-sizing: border-box;
    position: absolute;
    top: 0;
    left: 0;
    width: 34px;
    height: 100%;
  }
  .loginBtn:focus {
    outline: none;
  }
  .loginBtn:active {
    box-shadow: inset 0 0 0 32px rgba(0,0,0,0.1);
  }

  /* Facebook */
  .loginBtn--facebook {
    background-color: #4C69BA;
    background-image: linear-gradient(#4C69BA, #3B55A0);
    /*font-family: "Helvetica neue", Helvetica Neue, Helvetica, Arial, sans-serif;*/
    text-shadow: 0 -1px 0 #354C8C;
  }
  .loginBtn--facebook:before {
    border-right: #364e92 1px solid;
    background: url('https://s3-us-west-2.amazonaws.com/s.cdpn.io/14082/icon_facebook.png') 6px 6px no-repeat;
  }
  .loginBtn--facebook:hover,
  .loginBtn--facebook:focus {
    background-color: #5B7BD5;
    background-image: linear-gradient(#5B7BD5, #4864B1);
    cursor: pointer;
  }
  .loginBtn--google {
    /*font-family: "Roboto", Roboto, arial, sans-serif;*/
    background: #DD4B39;
  }
  .loginBtn--google:before {
    border-right: #BB3F30 1px solid;
    background: url('https://s3-us-west-2.amazonaws.com/s.cdpn.io/14082/icon_google.png') 6px 6px no-repeat;
  }
  .loginBtn--google:hover,
  .loginBtn--google:focus {
    background: #E74B37;
    cursor: pointer;
  }
}
</style>