<template>

  <header class="navi">
      <aside class="navi__title">
        <div class="logo"></div>
        <h5 class="title">Laravel-Vue</h5>
      </aside>

      <nav class="navi__navbar">
        <router-link to="/" exact>Home</router-link>
        <router-link to="/shop" exact>Shop</router-link>
        <router-link to="/forum" exact>Forum</router-link>
        <router-link to="/contact" exact>Contact</router-link>
        <router-link to="/auth" exact>Auth</router-link>
        <router-link to="/admin" exact>Admin</router-link>
      </nav>

      <nav class="navi__hamburger" v-on:click="nav_active = !nav_active"  >
        <div></div>
        <div></div>
        <div></div>
      </nav>
  </header>

  <footer class="phone" v-bind:class="{active:nav_active}" >
    <nav class="phone__navi" v-on:click="nav_active = !nav_active">
      <router-link to="/" exact>Home</router-link>
      <router-link to="/shop" exact>Shop</router-link>
      <router-link to="/forum" exact>Forum</router-link>
      <router-link to="/contact" exact>Contact</router-link>
      <router-link to="/auth" exact>Auth</router-link>
      <router-link to="/admin" exact>Admin</router-link>
    </nav>
  </footer>

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
  @import "../assets/styles/navi";
  .navi{
    height: 6vh;
    transition: 1s;
    margin: auto;
    padding-top: 10px;
    padding-bottom: 10px;
    background-color: $background_color;
    display: flex;
    align-items: center;
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
        color: $link_font_color;
        font-size: $btn_font_size;
        font-weight: bold;
        font-family: $btn_font_family;
        border-bottom-width: 0;
        &:after{
          content: '';
          display: block;
          border-bottom: 2px solid $btn_line_color;
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
          border-bottom: 2px solid $btn_line_color;
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

  .phone{
    height: 0vh;
    background-color: $background_color;
    transition: 1s;
    overflow: hidden;
    &__navi{
      height: 100%;
      margin-left: 20px;
      display: flex;
      flex-direction: column;
      justify-content: space-around;
      a{
        margin: 5px 0 5px;
        text-decoration: none;
        color: $link_font_color;
        font-size: $hamburger_font_size;
        font-weight: bold;
        font-family: $btn_font_family;
      }
    }
  }
  .active{
    height:50vh;
  }

  @media screen and (max-width:800px){
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
        background: $hamburger_color;
      }
      &:nth-child(2) {
        background: $hamburger_color;
      }
      &:nth-child(3) {
        background: $hamburger_color;
      }
    }
  }

}
</style>
