<template>
  <div class="email">

    <h1 class="email__title">
        Contact us with email
    </h1>

    <form @submit.prevent="on_mail_send_submit"  class="email__form">

      <div class="email__form__inputs">
        <div class="inp_1">
          <div>
              <label for="name">Full Name</label>
              <input v-model="email_data_form.name" type="text" id="name" required="required">
          </div>
          <div>
              <label for="email">E-Mail</label>
              <input v-model="email_data_form.email" type="email" id="email" required="required">
          </div>
        </div>

        <div class="inp_2">
            <label for="subject">Subject</label>
            <input v-model="email_data_form.subject" type="text" id="subject" required="required">
        </div>

        <div class="inp_2">
            <label for="message">Message</label>
            <textarea v-model="email_data_form.user_message" id="message" cols="30" rows="10" required="required" />
        </div>
      </div>

      <div class="email__form__btn">
        <button type="submit">Send</button>
        <div class="spinner_error">
            <Spinner v-if="show_spinner"/>
            <h3 class="request_response_field" v-else>{{response_from_mail_request}}</h3>
        </div>
      </div>

    </form>

  </div>

</template>

<script>
import Spinner from "../Spinner";
import axios from "axios";
export default {
  name: "EmailForm",

  components:{
    Spinner
  },

  data(){
    return{
      email_data_form:{
        name:'',
        email:'',
        subject:'',
        user_message:''
      },

      show_spinner:false,
      response_from_mail_request:''
    }
  },

  methods:{
    on_mail_send_submit(){
      this.show_spinner = true;
      axios.post(this.$store.state.axios_request_url+'/api/contact/email',this.email_data_form
      ).then((response)=>{
        this.response_from_mail_request = response.data.message;
        this.reset_email_form();

      }).catch((error)=>{
        this.response_from_mail_request = error.message;

      }).finally(()=>{
        this.show_spinner = false;
      });
    },

    reset_email_form(){
      this.email_data_form.name = '';
      this.email_data_form.email = '';
      this.email_data_form.subject = '';
      this.email_data_form.user_message = '';
      setTimeout(()=>{
          this.response_from_mail_request = '';
      },8000);
    }
  }
}
</script>

<style lang="scss" scoped>
@import "../../assets/styles/_app.sass";
  .email{

    &__title{
      background-color:$background_color;
      padding: 5px;
      margin-top: 20px;
    }

    &__form{
      margin:50px 0px;
      height: 440px;
      display: flex;
      flex-direction: column;
      justify-content: center;
      padding-right: 40px;
      padding-left: 5px;
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
          -webkit-text-fill-color: black;
          transition-delay: 9999s;
        }
        height: 400px;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        align-content: center;
        input{
          background-color: transparent;
          outline: none;
          border:none;
          border-bottom: 1px solid black;
        }
        textarea{
          height: 120px;
          background-color: transparent;
          outline: none;
          border:none;
          border-bottom: 1px solid black;
        }

        .inp_1{
          display: flex;
          justify-content: space-between;
          div{
              display: flex;
              flex-direction: column;
          }
        }
        .inp_2{
          display: flex;
          flex-direction: column;
          input{
              width:195px;
          }
        }
      }
      &__btn{
        height: 100px;
        button{
            margin-top: 10px;
            border:none;
            outline: none;
            width: 150px;
            border-radius: 2px;
            background-color:gray;
            color:white;
            font-size: 20px;
        }
        button:hover{
            width: 150px;
            border-radius: 2px;
            font-size: 20px;
            cursor: pointer;
            background-color: transparent;
            outline: 1px solid black;
            color: black;
        }
        .spinner_error{
            height:80px;
          .request_response_field{
            margin-top: 20px;
          }
        }
      }
    }
  }
@media screen and (max-width:700px){
  .email{
    .email__form__inputs{
      .inp_1{
        flex-direction: column;
        align-items: self-start;
        height: 105px;
      }
    }
  }
}
@media screen and (max-width:540px){
  .email{
    .email__title{
        font-size: 15px;
    }
  }
}
</style>
