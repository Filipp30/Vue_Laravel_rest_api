<template>
  <form @submit.prevent="onSubmit" class="reg_form" autocomplete="off">
    <div class="reg_form__inputs">

      <div>
          <label for="username">Username</label>
          <input v-model="registration_form.name"
                 v-bind:style="{'border-bottom':input_error.empty_username===true?
                 input_error.style_input_border_red:input_error.style_input_border_black}"
                 type="text" placeholder="username" id="username">
      </div>

      <div>
          <label for="email">E-Mail</label>
          <input v-model="registration_form.email"
                 v-bind:style="{'border-bottom':input_error.empty_email===true?
                 input_error.style_input_border_red:input_error.style_input_border_black}"
                 type="email" placeholder="email" id="email">
      </div>

      <div>
          <label for="password">Password</label>
          <input v-model="registration_form.password"
                 v-bind:style="{'border-bottom':input_error.empty_password===true?
                 input_error.style_input_border_red:input_error.style_input_border_black}"
                 type="password" placeholder="password" id="password">
      </div>

    </div>

    <div class="reg_form__btn">
        <button type="submit" >Register</button>
    </div>

    <div class="reg_form__error">
        <Spinner v-if="spinner"/>
        <div v-if="response_from_axios_request">
            <h4>{{response_from_axios_request}}</h4>
        </div>
    </div>

  </form>
</template>

<script>
import Spinner from "../Spinner";
import axios from "axios";
export default {
  name: "RegForm",

  components:{
    Spinner
  },

  data(){
    return{
      spinner:false,
      response_from_axios_request:'',

      registration_form:{
        name:'',
        email:'',
        password:'',
        password_confirmation:''
      },

      input_error:{
        empty_username:false,
        empty_email:false,
        empty_password:false,
        style_input_border_black:'1px solid black',
        style_input_border_red:'1px solid red'
      }
    }
  },

  methods:{
    onSubmit(){
      this.validation_form_inputs();
      if (this.input_error.empty_username || this.input_error.empty_email || this.input_error.empty_password){
          this.response_from_axios_request = 'Fields empty';
          return;
      }

      this.registration_form.password_confirmation = this.registration_form.password;
      this.response_from_axios_request = '';
      this.spinner = true;

      axios.post('http://127.0.0.1:8000/api/registration',this.registration_form)
      .then(response=>{
        localStorage.setItem('jwt_token',response.data.token);
        this.response_from_axios_request = 'Registration successfully';
        this.registration_form.name = '';
        this.registration_form.email = '';
        this.registration_form.password = '';
        setTimeout(()=>{
          this.$router.push('my_account');
        },2000);
      })
      .catch(error=>{
        let error_res = '';
        for (const [key, value] of Object.entries(error.response.data.errors)) {
          // console.log(`${key}: ${value}`);
          error_res += value;
        }
        this.response_from_axios_request = error.response.data.message+" "+error_res;
      })
      .finally(()=>{
        this.spinner = false;
      });
    },

    validation_form_inputs(){
      if (!this.registration_form.name){
          this.input_error.empty_username = true;
      }
      if (!this.registration_form.email){
          this.input_error.empty_email = true;
      }
      if (!this.registration_form.password){
          this.input_error.empty_password = true;
      }
    }
  },

  watch:{
    registration_form: { deep:true, handler(){
        this.input_error.empty_username=false;
        this.input_error.empty_email = false;
        this.input_error.empty_password = false;
        if (this.response_from_axios_request !== 'Registration successfully'){
          this.response_from_axios_request = '';
        }
      }
    },
  },
}
</script>

<style lang="scss" scoped>
@import "../../assets/styles/_app.sass";
  .reg_form{
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
      input{
        outline: none;
        width: 200px;
        height: 30px;
        border:none;
        border-bottom: 1px solid black;
        background-color: transparent;
      }
      div{
        display: flex;
        justify-content: space-between;
        align-items: center;
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
