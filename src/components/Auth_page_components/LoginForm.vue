<template>
  <form @submit.prevent="onSignSubmit" class="login_form" autocomplete="off">

    <div class="login_form__inputs">
      <div>
          <label for="email">E-Mail</label>
          <input v-model="request_login_form.email"
                 v-bind:style="{'border-bottom':empty_user_input_error.empty_email===true?
                 empty_user_input_error.style_input_border_red:empty_user_input_error.style_input_border_black}"
                 type="email" placeholder="email" id="email" autocomplete="off" >
      </div>

      <div>
          <label for="password">Password</label>
          <input v-model="request_login_form.password"
                 v-bind:style="{'border-bottom':empty_user_input_error.empty_password===true?
                 empty_user_input_error.style_input_border_red:empty_user_input_error.style_input_border_black}"
                 type="password" placeholder="password" id="password" autocomplete="off">
      </div>
    </div>

    <div class="login_form__btn">
        <button>Login</button>
        <a v-on:click="$emit('show_forgot_form')" >I forgot my password</a>
    </div>

    <div class="login_form__error">
        <Spinner v-if="show_spinner"/>
        <div v-if="response_from_axios_login_request">
            <h4>{{response_from_axios_login_request}}</h4>
        </div>

      <div class="social_login">
        <SocialLogin/>
      </div>
    </div>
  </form>
</template>

<script>
import Spinner from "../Spinner";
import axios from "axios";
import SocialLogin from "./SocialLogin";

export default {

  name: "SignForm",

  components:{
    SocialLogin,
    Spinner
  },

  data(){
    return{
      request_login_form:{
        email:'',
        password:''
      },
      show_spinner:false,
      response_from_axios_login_request:'',
      empty_user_input_error:{
        empty_email:false,
        empty_password:false,
        style_input_border_black:'1px solid black',
        style_input_border_red:'1px solid red'
      }
    }
  },

  methods:{
    onSignSubmit(){
      this.validation_login_form_inputs();
      if (this.empty_user_input_error.empty_email || this.empty_user_input_error.empty_password){
          this.response_from_axios_login_request = 'Fields empty';
          return;
      }
      this.response_from_axios_login_request = '';
      this.show_spinner = true;
      axios.post(this.$store.state.axios_request_url+'/api/login', this.request_login_form

      ).then(response=>{
        sessionStorage.setItem('jwt_token',response.data['jwt_token']['plainTextToken']);
        this.request_login_form.email = '';
        this.request_login_form.password = '';
        this.response_from_axios_login_request = 'Login successfully';
        setTimeout(()=>{
          if (response.data['isAdmin']){
            this.$router.push('admin');
          }else{
            this.$router.push('my_account');
          }
        },1000);
      }).catch(error=>{
        this.response_from_axios_login_request = error.response.data.message;

      }).finally(()=>{
        this.show_spinner = false;
      })
    },

    validation_login_form_inputs(){
      if (!this.request_login_form.email){
          this.empty_user_input_error.empty_email = true;
      }
      if (!this.request_login_form.password){
          this.empty_user_input_error.empty_password = true;
      }
    }
  },

  watch:{
    request_login_form: { deep:true, handler(){
        this.empty_user_input_error.empty_email = false;
        this.empty_user_input_error.empty_password = false;
        if (this.response_from_axios_login_request !== 'Login successfully'){
          this.response_from_axios_login_request = '';
        }
      }
    },
  }
}
</script>

<style lang="scss" scoped>
@import "../../assets/styles/_app.sass";
@import "../../assets/styles/_button.scss";
  .login_form{
    margin: auto;
    width: 300px;
    height: 300px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;

    &__inputs{
      input:-webkit-autofill,
      input:-webkit-autofill:hover,
      input:-webkit-autofill:focus,
      input:-webkit-autofill:active,
      input:-webkit-autofill:valid,
      select:-webkit-autofill,
      select:-webkit-autofill:hover,
      select:-webkit-autofill:focus
      {
        -webkit-transition-delay: 99999s;
        -webkit-text-fill-color: $font_color;
        transition-delay: 9999s;
      }
      width: 300px;
      height:150px;
      display: flex;
      flex-direction: column;
      justify-content: space-around;

      div{
      display: flex;
      justify-content: space-between;
      align-items: center;
        input{
          outline: none;
          width: 200px;
          height: 30px;
          border:none;
          border-bottom: 1px solid black;
          background-color: transparent;
        }
      }
    }

    &__btn{
      width: 300px;
      height:40px;
      display: flex;
      justify-content: space-between;
      align-items: center;

      @include btn(120px);

      a{
        color:$font_color;
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
        &:hover:after { width: 100%; }
      }
      a:hover{
        cursor: pointer;
      }
    }

    &__error{
      align-items: center;
      width: 300px;
      height:100px;
      display: flex;
      flex-direction: column;
      justify-content: center;
    }
    .social_login{
      display: flex;
      justify-content: center;

    }
  }
</style>
