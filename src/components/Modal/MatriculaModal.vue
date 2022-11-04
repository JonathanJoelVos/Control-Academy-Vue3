<template>
    <ModalComponent :tituloModalGenerico="tituloModalGenericoComputed"
        @enviar-modal="emit('enviarModal', objetoQueVaiSerFeitaAReq)">
        <template v-slot:modalGenerico>
            {{ objeto?.idUser.name }}
            <label for="finalGrade">
                Nota Final
                <input id="finalGrade" type="number" v-model="objetoQueVaiSerFeitaAReq.finalGrade">
            </label>
            <label for="">
                Frequencia
                <input type="number" v-model="objetoQueVaiSerFeitaAReq.frequency">
            </label>
            <select name="" id="" v-model="objetoQueVaiSerFeitaAReq.role">
                <option :value="objetoRole._id" v-for="objetoRole in listaDePapeisFeitaDaReq" :key="objetoRole._id">
                    {{ objetoRole.name }}</option>
            </select>
            <select name="" id="" v-model="objetoQueVaiSerFeitaAReq.classGroup">
                <option :value="objetoClassGroup._id" v-for="objetoClassGroup in listaDeClassGroupFeitaDaReq"
                    :key="objetoClassGroup._id">{{ objetoClassGroup.name }}</option>
            </select>
        </template>
    </ModalComponent>

</template>

<script setup lang="ts">
import type { ObjetoMatriculaReq } from '../../interfaces/enrolled.js';
import ModalComponent from '../Modal/ModalComponent.vue'
import type { ObjetoMatriculasContainer } from '@/interfaces/enrolled';
import type { ObjetoMatriculasContainerTabela } from '@/views/MatriculasView.vue';
import { onBeforeMount, ref } from 'vue';
import { inject } from 'vue';
import { listaDePapeis } from '@/req/api/PapelAPI';
import type { RoleContainer } from '../../interfaces/role'
import { listaDeTurmas } from '../../req/api/TurmasAPI'
import type { ClassGroupContainer } from '../../interfaces/classGroup'
import { procurarDisciplinaPorId } from '@/req/api/DisciplinasAPI';

const props = defineProps<MatriculaModalProps>()
onBeforeMount(async () => {
    const disciplinaProcuradaPeloId = await procurarDisciplinaPorId(props.objeto?.classGroup.subject._id)
    listaDePapeisFeitaDaReq.value = await listaDePapeis()
    listaDeClassGroupFeitaDaReq.value = disciplinaProcuradaPeloId.classes
    objetoQueVaiSerFeitaAReq.value._id = props.objeto?._id!
    objetoQueVaiSerFeitaAReq.value.role = props.objeto?.role._id!
    objetoQueVaiSerFeitaAReq.value.classGroup = props.objeto?.classGroup._id!
    objetoQueVaiSerFeitaAReq.value.finalGrade = props.objeto?.finalGrade
    objetoQueVaiSerFeitaAReq.value.frequency = props.objeto?.frequency
})

const { tituloModalGenericoComputed } = inject('modalEnviarOuCriar')!
const emit = defineEmits(['enviarModal', 'cancelarModal'])

const objetoQueVaiSerFeitaAReq = ref<ObjetoMatriculaReq>({
    _id: '',
    idUser: '',
    role: '',
    classGroup: '',
    frequency: 0,
    finalGrade: 0
})

const listaDePapeisFeitaDaReq = ref<RoleContainer[]>([])
const listaDeClassGroupFeitaDaReq = ref<ClassGroupContainer[]>([])

interface MatriculaModalProps {
    objeto: ObjetoMatriculasContainer | undefined
}

</script>

<style>

</style>