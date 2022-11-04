<template>
  <main>
    <img src="../../public/logo.svg" alt="">
    <h2>Faça seu login UDESC</h2>
    <LoginComponent class="login__component"/> 
    <footer class="footer">
      <span>
        ©Copyright UDESC-LabTIC
      </span>
    </footer>
  </main>
</template>

<script setup lang="ts">
import { inject, onBeforeMount } from 'vue';
import LoginComponent from '../components/LoginComponent.vue'
import type {EstaLogadoContainer} from '../interfaces/estaLogado'

const {deslogar}:EstaLogadoContainer = inject('estaLogado')!

onBeforeMount(() => {
  deslogar()
})
</script>

<style scoped>
 img {
  height: 5.438rem;
 }
  main{
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 2.5rem;
    height: 100%;
    margin-top: 2.5rem;
  }
  .footer {
    display: flex;
    justify-content: center;
    width: 100%;
  }

  h2 {
    font-size: 2.1rem;
    margin-bottom: 0.5rem;
    font-family: 'Poppins', sans-serif;
    font-weight: 400;
    color: #F2F2F2;
}
</style>>
