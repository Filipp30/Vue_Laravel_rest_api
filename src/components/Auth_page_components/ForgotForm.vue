<template>
  <form @submit.prevent="onSubmit"  autocomplete="off" class="forgot_form">

    <div class="forgot_form__inputs">
      <label for="email">Enter your mail for reset your password</label>
      <input v-model="request_form.email"
             v-bind:style="{'border-bottom': email_input_is_empty===true? error_style_input_border_red:error_style_input_border_black}"
             type="email" id="email" placeholder="email">
    </div>

    <div class="forgot_form__btn">
        <button type="submit">Reset</button>
    </div>

    <div class="forgot_form__error">
        <Spinner v-if="show_spinner"/>
        <div v-if="response_from_axios_request">
            <h4>{{response_from_axios_request}}</h4>
        </div>
    </div>

  </form>
</template>

<script>

import axios from "axios";
import Spinner from "../Spinner";

export default {
  name: "ForgotForm",

  components: {
    Spinner
  },

  data(){
    return{
      request_form:{
          email:'',
      },
      show_spinner:false,
      response_from_axios_request:'',
      email_input_is_empty:false,
      error_style_input_border_black:'1px solid black',
      error_style_input_border_red:'1px solid red'
    }
  },

  methods:{
    onSubmit(){

      if (!this.request_form.email){
        this. email_input_is_empty = true;
        return;
      }
      this.response_from_axios_request = '';
      this.show_spinner = true;
      axios.post('http://stuworld.space/api/password/email',this.request_form).then(response=>{
        this.request_form.email = '';
        this.response_from_axios_request = response.data.message;
      }).catch(error=>{
        this.response_from_axios_request = error.response.data.message;
      }).finally(()=>{
        this.show_spinner = false;
      });

    }
  },

  watch:{
    request_form: {
      deep:true,
      handler(){
        this.email_input_is_empty = false;
      }
    },
  }
}

</script>

<style lang="scss" scoped>
@import "../../assets/styles/_app.sass";
  .forgot_form{
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
      label{
          width: 200px;
      }
      input{
          outline: none;
          width: 200px;
          height: 30px;
          border:none;
          border-bottom: 1px solid black;
          background-color: transparent;
      }
    }

    &__btn{
      width: 300px;
      height:40px;
      display: flex;
      justify-content: space-between;
      align-items: center;

      button{
        border:none;
        outline: none;
        width: 120px;
        border-radius: 2px;
        background-color:gray;
        color:white;
        font-size: 20px;
      }
      button:hover{
        cursor: pointer;
        background-color: transparent;
        border-radius: 2px;
        border: 1px solid black;
        color: black;
      }
    }

    &__error{
      align-items: center;
      width: 300px;
      height:100px;
      display: flex;
      justify-content: center;
    }
  }
</style>
