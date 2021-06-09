<template>
  <section class="shop">
    <Order/>
  </section>

</template>

<script>
import Order from "../components/Shop_page_components/Order";
export default {
  name: "Shop",
  components: {Order}
};
</script>

<style lang="scss" scoped>
  .shop{
    display: flex;
    justify-content: center;
    align-content: center;
  }
</style>