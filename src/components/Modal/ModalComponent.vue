<template>
    <h2>{{tituloModalGenerico}}</h2>
    <form action="" @submit.prevent="emit('enviarModal')">
        <slot name="modalGenerico"></slot>
        <div>
            <slot name="botaoModalGenerico"></slot>
            <button @click.prevent="desativarModal">Cancelar</button>
            <button type="submit">Enviar</button>
        </div>
    </form>
</template>

<script setup lang="ts">
import type { ObjetoUserContainer } from '@/req/api/UserAPI';
import { inject } from 'vue';

export interface ModalComponentProps {
    tituloModalGenerico: string
}

const {desativarModal} = inject('modalEstaAtivo')


defineProps<ModalComponentProps>()
const emit = defineEmits(['enviarModal', 'cancelarModal'])


</script>

<style>

</style>