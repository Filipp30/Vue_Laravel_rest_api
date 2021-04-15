<template>
  <section class="list">
    <div v-for="item in chat_session_list" v-bind:key="item.id" class="list__item">
        <List_Item v-bind:item="item" v-on:click="$emit('on_chat_session_clicked',item.session)"/>
    </div>
  </section>
</template>

<script>
import axios from "axios";
import List_Item from "./List_Item";

export default {
  name: "ChatWaitingList",

  components:{
    List_Item
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
  }


}
</script>

<style lang="scss" scoped>
  .list{
    border: 1px solid red;
    width: 350px;
    height: 500px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    overflow-y: scroll;

    &__item{

    }


  }


</style>