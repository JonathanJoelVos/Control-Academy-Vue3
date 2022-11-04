<template>
    <ModalComponent
     :tituloModalGenerico="tituloModalGenericoComputed"
      @enviar-modal="emit('enviarModal', objetoModal)"
       >
        <template v-slot:modalGenerico>
            <label for="" v-for="objetoComLabelEValue in arrayObjetosModal" :key="objetoComLabelEValue.value">
                {{objetoComLabelEValue.label}}
                <input type="text" v-model="objetoModal[objetoComLabelEValue.value]" required>
            </label>
        </template>
        <template v-slot:botaoModalGenerico >
            <button >
                <RouterLink 
                    :to="{name: 'criarMatricula', 
                    query: { 
                        idUsuario: objetoModal._id,
                        nomeUsuario: objetoModal.name,
                        registerUsuario: objeto.register
                    }}" 
                >
                    Matricular
                </RouterLink>
            </button>
        </template>
    </ModalComponent> 
</template>

<script setup lang="ts">
import ModalComponent from '../Modal/ModalComponent.vue';
import type { ObjetoUserContainer, ObjetoUserContainerCreated } from '@/req/api/UserAPI';
import { computed, inject } from 'vue';
import { ref } from 'vue';
import type { LabelValuesInterface } from '@/interfaces/labelValues';

interface ModalProps {
    objeto: ObjetoUserContainer | ObjetoUserContainerCreated;
}

const props = defineProps<ModalProps>()
const objetoVModelModal = ref({})
const objetoModal = computed((): ObjetoUserContainer => {
    let watchObjeto = objetoVModelModal.value
    watchObjeto = {...props.objeto}
    return watchObjeto as ObjetoUserContainer
})

const {tituloModalGenericoComputed}: string  = inject('modalEnviarOuCriar')!



const arrayObjetosModal: LabelValuesInterface<ObjetoUserContainer>[] = [
  {label: 'Nome', value: "name"},
  {label: 'Senha', value: "password"},
  {label: 'Sobrenome', value: 'surname'},
  {label: 'CPF', value: 'cpf'},
  {label: 'Email', value: 'email'},
  {label: 'Telefone', value: 'telephone'},
  {label: 'Endereço', value: 'address'}
]

const emit = defineEmits(['enviarModal', 'cancelarModal'])

</script>

<style>

</style>