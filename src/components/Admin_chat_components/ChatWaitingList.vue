<template>
  <section class="list">
    <div v-for="item in chat_session_list" v-bind:key="item.id" class="list__item">
        <WaitingList_Item v-bind:item="item" v-on:on_chat_session_clicked="on_chat_session_clicked"/>
    </div>
  </section>
</template>

<script>
import axios from "axios";
import WaitingList_Item from "./WaitingList_Item";
export default {
  name: "ChatWaitingList",

  components:{
    WaitingList_Item
  },

  data(){
    return{

      chat_session_list:[]

    }
  },

  beforeMount() {
    this.get_chat_session_waiting_list();
  },

  methods:{
    get_chat_session_waiting_list(){
      axios.get(this.$store.state.axios_request_url+'/api/admin/contact/chat/chat_session_waiting_list',
          {headers: {"Authorization": `Bearer ${localStorage.getItem('jwt_token')}`}
      }).then(response=>{
          this.chat_session_list = response.data;
      }).catch(error=>{
        console.log(error)
      }).finally(()=>{
        console.log('fimnish');
      });
    },

    on_chat_session_clicked(session){
      console.log(session+' From List ');
    }
  }


}
</script>

<style lang="scss" scoped>
  .list{
    margin: auto;
    border: 1px solid red;
    background-color: #bdbdbd;
    width: 500px;
    height: 500px;
  }


</style>