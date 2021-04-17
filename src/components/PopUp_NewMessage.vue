<template>
  <div class="pop_up">
    <div class="img"></div>
  </div>
</template>

<script>
export default {
  name: "PopUp_NewMessage"
}
</script>

<style lang="scss" scoped>
  .pop_up{

    .img{
      width: 70px;
      height: 70px;
      background-image: url("../assets/images/pop_up_new_message_logo.png");
      background-size: contain;
      box-shadow: 0px 0px 5px 1px rgba(0,0,0,0.75);
    }
  }
</style>