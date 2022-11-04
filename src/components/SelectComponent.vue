<template>
  <section>
    <RouterLink :to="props.path">
        <slot></slot>
    </RouterLink>
    <h2>{{props.titulo}}</h2>
  </section>
</template>

<script setup lang="ts">
import {RouterLink} from 'vue-router'

export interface PropsSelectComponent{
  titulo: string,
  path: string
}

const props = defineProps<PropsSelectComponent>()

</script>

<style scoped>

h2 {
    font-size: 1.5rem;
    text-align: center;
}

section {
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 12rem;
    gap: 1rem;
}

a {
    background-color: black;
    height: 12rem;
    width: 12rem;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 10px;
    text-decoration: none;
    color: white;
}

section:hover>a{
    background-color: var(--gray-700);
    cursor: pointer;
}

h2:hover{
    cursor: pointer;
}

</style>