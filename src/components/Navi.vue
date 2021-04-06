<template>
  <div v-bind:class="{active:nav_active}"  class="navi">

    <aside class="navi__title">
      <div class="logo"></div>
      <h5 class="title">Laravel-Vue</h5>
    </aside>

    <nav class="navi__navbar">
      <router-link to="/" exact>Home</router-link>
      <router-link to="/" exact>Item_1</router-link>
      <router-link to="/" exact>Item_2</router-link>
      <router-link to="/auth" exact>Auth</router-link>
      <router-link to="/contact" exact>Contact</router-link>
      <router-link to="/admin" exact>Admin</router-link>
    </nav>

    <nav v-on:click="nav_active = !nav_active"  class="navi__hamburger">
      <div></div>
      <div></div>
      <div></div>
    </nav>
  </div>
</template>

<script>

export default {
  name: "NaviBar",
  components:{

  },
  data(){
    return{
      nav_active:false
    }
  }

}
</script>

<style lang="scss" scoped>
@import url('https://fonts.googleapis.com/css2?family=New+Tegomin&display=swap');
.navi{
  height: 5vh;
  transition: 1s;
  border: 1px solid red;
  margin: auto;
  padding-top: 10px;
  padding-bottom: 10px;
  background-color: #B2BE97;
  display: flex;
  align-items: flex-start;
  justify-content: space-between;


  &__title{
    display: flex;
    align-items: center;
    justify-content: space-around;
    margin-left: 20px;

    .logo{
      background-image: url("../assets/images/lav_vue_logo.png");
      background-repeat: no-repeat;
      background-size: contain;
      background-position: center;
      width: 40px;
      height: 40px;
    }

    .title{
      width: 150px;
      font-size: 20px;
      white-space: nowrap;
      font-family: 'New Tegomin', serif;
      text-align: center;

    }

  }
  &__navbar{
    flex: 1;
    min-width:400px;
    max-width:900px;
    margin: auto;
    display: flex;
    justify-content: space-evenly;
    a{
      text-decoration: none;
      color: gray;
      font-size: 1rem;
      font-weight: bold;
      border-bottom-width: 0;
      &:after{
        content: '';
        display: block;
        border-bottom: 2px solid black;
        width: 0;
        -webkit-transition: 0.5s ease;
        transition: 0.5s ease;
      }
      &:hover:after { width: 100%; }
    }
    .router-link-active{
      &:after{
        content: '';
        display: block;
        border-bottom: 2px solid black;
        width: 100%;
        -webkit-transition: 0.5s ease;
        transition: 0.5s ease;
      }
    }

  }
  &__hamburger{
    display: none;
  }


}

@media screen and (max-width:900px){
  .navi__navbar{
    display: none;

  }
  .navi__hamburger{
    cursor: pointer;
    height: 40px;
    display: flex;
    flex-direction: column;
    justify-content: space-evenly;
    margin-right: 20px;
    div {
      width: 35px;
      height: 4px;
      border-radius: 10px;
      &:nth-child(1) {
        background: black;
      }
      &:nth-child(2) {
        background: black;
      }
      &:nth-child(3) {
        background: black;
      }
    }
  }
  .active{
    height:60vh;
    align-items: flex-start;
  }

}
</style>
