<template>
  <header>
    <RouterLink to="/home" class="dale">
      <img src="../../public/vertical_rgb.jpg" alt="">
    </RouterLink>
    <RouterLink to="/">
      Sair
    </RouterLink>
  </header>
</template>

<script setup lang="ts">

</script>

<style>
  header {
    background-color: black;
    padding: 0.2rem 10rem;
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
  img {
    width: 100px;
  }

  a

  .dale:focus{
    outline: none;
    box-shadow: none;
  }
</style>