<template>
  <div class="item">

    <header class="item__userInformation">
      <ul>
        <li>session: {{item.session}}</li>
        <li>created_at: {{item.created_at}}</li>
        <li>username: {{item.user.name}}</li>
        <li>email:{{item.user.email}}</li>
      </ul>
    </header>

    <footer class="item__listener">

        <div class="new_message_active">
          <p>new message</p>
        </div>

        <div class="typing_active">
          <p>typing...</p>
        </div>

        <div class="treatment_active">
          <p>in treatment</p>
        </div>

    </footer>

  </div>
</template>

<script>
export default {
  name: "WaitingList_Item",

  props:['item']
}
</script>

<style lang="scss" scoped>
  .item{
    border: 1px solid black;
    border-radius: 5px;
    background-color: #dddddd;
    width: 400px;

    &__userInformation{
      font-size:17px;
      font-weight: bold;
      line-height: 25px;
    }

    &__listener{
      background-color: darkgray;
      display: flex;
      justify-content: space-around;

      div{
        background-color: aliceblue;
        border-radius: 5px;
        width: 100px;
        padding: 2px;
        font-size:17px;
        font-weight: bold;
        display: flex;
        justify-content: center;
      }

    }
  }
</style>