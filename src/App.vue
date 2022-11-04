<script setup lang="ts">
import { computed } from 'vue';
import { provide, ref, type Ref } from 'vue';
import {  RouterView } from 'vue-router'
import HeaderComponent from './components/HeaderComponent.vue'


const estaLogado: Ref<boolean> = ref(true);
provide('estaLogado', {estaLogado, logar, deslogar})
const modalEstaAtivo = ref<boolean>(false)
provide('modalEstaAtivo', {modalEstaAtivo, ativarModal, desativarModal} )

function logar(): void {
  estaLogado.value = true
}

function deslogar(): void {
  estaLogado.value = false
}

function ativarModal (): void {
  modalEstaAtivo.value = true
}

function desativarModal(): void {
  modalEstaAtivo.value = false
}

const modalEnviarOuCriar = ref<'edit' | 'created'>('edit')

function mudarModalParaCreated(): void {
  modalEnviarOuCriar.value = 'created'
}

function mudarModalParaEdit(): void {
  modalEnviarOuCriar.value = 'edit'
}

const tituloModalGenericoComputed = computed(() => {
    if(modalEnviarOuCriar.value == 'edit') {
        return `Editar Usuário`
    } else if (modalEnviarOuCriar.value == 'created') {
        return `Criar Usuário`
    } else {
        return ''
    }
})

provide('modalEnviarOuCriar', {modalEnviarOuCriar, mudarModalParaCreated, mudarModalParaEdit, tituloModalGenericoComputed})
</script>

<template>
  <body>
    <HeaderComponent v-show="estaLogado"/>
    <RouterView class="routerView--app"/>
  </body>
</template>

<style>

  :root{
  --white-300:#fff;
  --white-500: #f0f2f9;
  --white-700: #e2e6f3;

  --gray-300: #293666;
  --gray-400: #232e58;
  --gray-500: #1d2749;
  --gray-600: #171f3a;
  --gray-700: #11172c;
  --gray-800: #1E1E1E;
  --gray-900: #06080f;

  --blue-300: #5067b9;
  --blue-500: #4055a0; 
  --blue-700: #344583;

  --black: #000,
  }

  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

:focus {
    outline: 0;
    box-shadow: 0 0 0 2px gray;
} 

body {
    background-color: var(--gray-800);
    color: var(--white-300);
    -webkit-font-smoothing: antialiased;
    display: flex;
    flex-direction: column;
    height: 100%;
}

.routerView--app {
  align-self: center;
}

body, input, textarea, button {
    font-family: 'Roboto', sans-serif;
    font-weight: 400;
    font-size: 1rem;
}
</style>
