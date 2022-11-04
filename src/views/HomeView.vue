<template>
  <main>
    <section class="container--select"> 
      <h2></h2>
      <nav>
        <SelectComponent 
        v-for="(objeto) in listaDeObjetosDoComponenteSelect"
        :titulo="objeto.titulo"
        :key="objeto.id"
        :path="objeto.path"
        class="component"
        
        >
          <ph-user v-if="verificaQualIconeUsar(objeto.titulo, 'Usuários')" size="80" ></ph-user>
          <ph-folder-user  v-if="verificaQualIconeUsar(objeto.titulo, 'Matrícula Turma')"  size="80"></ph-folder-user>
          <ph-books v-if="verificaQualIconeUsar(objeto.titulo, 'Disciplinas')"  size="80"></ph-books>
          <ph-users-three  v-if="verificaQualIconeUsar(objeto.titulo, 'Turmas')"  size="80"></ph-users-three>
          <ph-scroll  v-if="verificaQualIconeUsar(objeto.titulo, 'Papeis')"  size="80"></ph-scroll>
          <ph-person-simple-run  v-if="verificaQualIconeUsar(objeto.titulo, 'Ações')"  size="80"></ph-person-simple-run>
        </SelectComponent>
      </nav>
    </section>
  </main>
</template>

<script setup lang="ts">
import SelectComponent from "../components/SelectComponent.vue";
import {PhUser, PhUsersThree, PhScroll, PhBooks, PhPersonSimpleRun } from 'phosphor-vue'
import type { ModalEstaAtivoContainer } from '@/interfaces/modal';
import { inject, onBeforeMount } from 'vue';
import type {EstaLogadoContainer} from '../interfaces/estaLogado'

const {logar}: EstaLogadoContainer = inject('estaLogado')!

const {desativarModal}: ModalEstaAtivoContainer= inject('modalEstaAtivo')!
onBeforeMount(() => {
  desativarModal()
  logar()
})

interface ObjetosSelectComponent{
  titulo: string,
  id: number,
  path: string
}

const listaDeObjetosDoComponenteSelect : ObjetosSelectComponent[]= [
  {titulo: "Usuários", id: 1, path:  '/usuarios'}, 
  {titulo: "Matrícula Turma", id: 2, path:  '/matriculas'}, 
  {titulo: "Turmas", id: 3, path:  '/turmas'}, 
  {titulo: "Disciplinas", id: 4, path:  '/usuarios'}, 
  {titulo: "Papeis",id: 5, path:  '/usuarios'},
  {titulo: "Ações", id: 6, path:  '/usuarios'}
]

function verificaQualIconeUsar(valorComponent: string, tituloDoComponente: string): boolean{
  if(valorComponent == tituloDoComponente) {
    return true
  }
  return false
}
</script>

<style scoped>
h2 {
  margin-bottom: 3rem;

}

.container--select {
  width: 50rem;
  height: 40rem;
}

nav{
  display: grid;
  grid-template-columns: 1fr 1fr 1fr ;
  grid-template-rows: 1fr 1fr;
  justify-content: center;
  align-items: center;
  row-gap: 2rem;
}

</style>>
import  type {PropsSelectComponent} from "../components/SelectComponent.vue";
