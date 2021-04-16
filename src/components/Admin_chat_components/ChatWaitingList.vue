<template>
  <section class="list">
    <Spinner_2 v-if="spinner" />
    <div  v-for="item in chat_session_list" v-bind:key="item.id" class="list__item">
        <List_Item  v-bind:item="item" v-on:click="$emit('on_chat_session_clicked',item.session)"/>
    </div>
  </section>
</template>

<script>
import axios from "axios";
import List_Item from "./List_Item";
import Spinner_2 from "../Spinner_2";

export default {
  name: "ChatWaitingList",

  components:{
    List_Item,
    Spinner_2
  },

  data(){
    return{
      chat_session_list:[],
      spinner:false,
      channel:this.$store.state.contact_chat_channel,
    }
  },

  beforeMount() {
    this.get_chat_session_waiting_list();
  },
  mounted() {

    this.channel.bind('App\\Events\\NewChatSessionCreated',data=>{
      this.add_session_to_local_wait_list(data);
    });
    this.channel.bind('App\\Events\\ChatSessionRemoved',data=>{
      this.remove_session_from_local_wait_list(data)
    });

  },

  methods:{
    get_chat_session_waiting_list(){
      this.spinner = true;
      axios.get(this.$store.state.axios_request_url+'/api/admin/contact/chat/chat_session_waiting_list',
          {headers: {"Authorization": `Bearer ${localStorage.getItem('jwt_token')}`}
      }).then(response=>{
          this.chat_session_list = response.data;
          console.log(response.data)
      }).catch(error=>{
        console.log(error)
      }).finally(()=>{
        this.spinner = false;
      });
    },

    add_session_to_local_wait_list(data){
      this.chat_session_list.push(data.session);
    },

    remove_session_from_local_wait_list:function(data){
      for( let i = 0; i < this.chat_session_list.length; i++){
        if ( parseInt(this.chat_session_list[i].session) === parseInt(data.session)) {
          this.chat_session_list.splice(i, 1);
        }
      }
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
    align-items: center;
    overflow-y: scroll;

    &__item{

    }


  }


</style>