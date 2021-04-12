<template>
  <div class="info">

    <h1 class="info__title">
        About us
    </h1>

    <div class="info__content">
        <h5>Content</h5>
    </div>

  </div>
</template>

<script>
export default {
    name: "InfoForm"
}
</script>

<style lang="scss" scoped>
@import "../../assets/styles/_app.sass";
.info{
  &__title{
    background-color:$background_color;
    padding: 5px;
    margin-top: 20px;
  }
}
@media screen and (max-width:540px){
  .info{
    .info__title{
        font-size: 15px;
    }
  }
}
</style>
