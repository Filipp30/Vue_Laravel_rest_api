<template>
  <section class="order">
    <h1>Testing Payment Mollie</h1>
    <h1>Example Order</h1>
    <div class="pay">
      <h5>order nr : <span>{{form.order}}</span></h5>
      <h5>amount : <span>{{form.amount}}</span> euro</h5>
      <button @click="pay">Pay</button>
      <Spinner v-if="show_spinner"/>
      <div><h3>{{info}}</h3></div>
    </div>
  </section>
</template>

<script>

import Spinner from "../Spinner";
import axios from "axios";

export default {
  name: "Order",
  components:{
    Spinner
  },
  data(){
    return{
      form:{
        order:'1458965742',
        amount:'30.00',
        user_id:1
      },

      info:'status',
      show_spinner:false,
    }
  },
  methods:{
    pay(){
      this.show_spinner = true;
      axios.post(this.$store.state.axios_request_url+'/api/create/order', this.form)
      .then(response=>{
        console.log(response);
        this.info = response;
      })
      .catch(error=>{
        console.log(error);
        this.info = error;
      })
      .finally(()=>{
        this.show_spinner = false;
      })
    }
  }
}
</script>

<style lang="scss" scoped>
@import "../../assets/styles/_button.scss";

.order{
  padding: 100px;
  .pay{
    @include btn(120px);
    margin-top: 50px;
    height: 300px;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    align-items: center;
  }
}

</style>