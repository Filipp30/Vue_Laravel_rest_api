<template>
  <div class="contact_page">
    <section class="contact">

      <div class="contact__menu">
          <nav>
              <a v-on:click="show_info_form= true;
                 show_email_form = false;
                 show_chat_form = false;"
                 v-bind:class="{active: show_info_form}">Info
              </a>
              <a v-on:click="show_email_form = true;
                 show_info_form = false;
                 show_chat_form = false;"
                 v-bind:class="{active: show_email_form}">Send Mail
              </a>
              <a v-on:click="show_chat_form = true;
                 show_email_form = false;
                 show_info_form = false;"
                 v-bind:class="{active: show_chat_form}">Chat
              </a>
          </nav>
      </div>

      <div class="contact__content">
          <InfoForm v-if="show_info_form"/>
          <EmailForm v-if="show_email_form"/>
          <ChatForm v-if="show_chat_form" />
      </div>

    </section>
  </div>
</template>

<script>
import InfoForm from "../components/Contact_page_components/InfoForm";
import EmailForm from "../components/Contact_page_components/EmailForm";
import ChatForm from "../components/Contact_page_components/ChatForm";
export default {
  name: "Contact",

  components:{
    InfoForm,
    EmailForm,
    ChatForm
  },

  data(){
    return{
        show_info_form:true,
        show_email_form:false,
        show_chat_form:false
    }
  }
}
</script>

<style lang="scss" scoped>
@import "../assets/styles/_app.sass";

.contact_page{
  height: 80vh;
  display: flex;
  justify-content: center;
  align-items: center;

  .contact{
    background-image: url("../assets/images/contact_page.jpg");
    background-position: top;
    background-size:cover;
    background-repeat: no-repeat;
    box-shadow: 0px 1px 18px -3px rgba(0,0,0,0.75);
    width: 1000px;
    display: flex;
    justify-content: space-between;
    margin-top: 80px;

    &__menu{
      flex: 1;
      min-width: 50px;
      max-width: 150px;

      nav{
        background-color:$background_color;
        opacity: 0.9;
        width: 130px;
        height: 600px;
        display: flex;
        flex-direction: column;
        justify-content: space-around;

        a{
          color: gray;
          font-size: 1.5rem;
          font-weight: bold;
          padding: 5px;
          &:after{
              content: '';
              display: block;
              border-bottom: 2px solid $btn_under_line_color;
              width: 0;
              -webkit-transition: 0.5s ease;
              transition: 0.5s ease;
          }

          &:hover:after{
            width: 100%;
          }
        }

        a:hover{
          cursor: pointer;
        }
      }

      .active{
        &:after{
            content: '';
            display: block;
            border-bottom: 2px solid $btn_under_line_color;
            width: 100%;
            -webkit-transition: 0.5s ease;
            transition: 0.5s ease;
        }
      }
    }
    &__content{
        flex: 1;
        min-width: 300px;
        max-width: 600px;
    }
  }
}
@media screen and (max-width:450px){
  .contact{
    .contact__menu{
      nav{
        width: 60px;
        a{
            font-size: 1rem;
        }
      }
    }
  }
}

</style>
