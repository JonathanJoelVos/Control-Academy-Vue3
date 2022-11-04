<template>
    <TableComponent
      :infosBody="arrayObjetosTabelaTurmaReq"
      :infosHeader="arrayObjetosTabelaTurmas"
      @excluir="excluirTurmaTabela"
      @editar="editarTurmaTabela"
    />
</template>

<script setup lang="ts">
import type { ClassGroupContainer } from "@/interfaces/classGroup";
import type { LabelValuesInterface } from "@/interfaces/labelValues";
import type { ModalEnviarOuCriarContainer, ModalEstaAtivoContainer } from "@/interfaces/modal";
import type { ObjectSubjectContainer } from "@/interfaces/subjects";
import { listaDeTurmas } from "@/req/api/TurmasAPI";
import { inject, onBeforeMount, ref } from "vue";
import TableComponent from "../components/TableComponent.vue";
import {deletarTurma} from '../req/api/TurmasAPI'

export interface TabelaTurmaContainer {
    _id: string;
    name: string;
    dateStart: string;
    dateEnd: string;
    vacancy: number;
    subject: string;
}

const {ativarModal, modalEstaAtivo, desativarModal}: ModalEstaAtivoContainer  = inject('modalEstaAtivo')!
const {modalEnviarOuCriar, mudarModalParaCreated, mudarModalParaEdit}: ModalEnviarOuCriarContainer = inject('modalEnviarOuCriar')!


const arrayObjetosTabelaTurmas: LabelValuesInterface<ClassGroupContainer>[] = [
  {label: 'Nome', value: "name"},
  {label: 'Inicio das Aulas', value: "dateStart"},
  {label: 'Final das Aulas', value: "dateEnd"},
  {label: 'Vagas', value: "vacancy"},
  {label: 'Disciplina', value: "subject"},
]

const arrayObjetosTabelaReq = ref<ClassGroupContainer[]>([])
const arrayObjetosTabelaTurmaReq = ref<TabelaTurmaContainer[]>([])

onBeforeMount(async  () => {
    arrayObjetosTabelaReq.value = await listaDeTurmas()

    arrayObjetosTabelaTurmaReq.value = arrayObjetosTabelaReq.value.map(element => {
        const novoObjeto = {
            _id: element._id,
            name: element.name,
            dateStart: new Date(element.dateStart).toLocaleDateString('pt-BR', {timeZone: 'UTC'}),
            dateEnd:new Date(element.dateEnd).toLocaleDateString('pt-BR', {timeZone: 'UTC'}),
            vacancy: element.vacancy,
            subject: element.subject.name,
        }
        return novoObjeto
    })

})

async function excluirTurmaTabela(turmas: TabelaTurmaContainer): Promise<void> {
  const indexTurmaExcluida = arrayObjetosTabelaTurmaReq.value.findIndex(element => element._id == turmas._id)
  arrayObjetosTabelaTurmaReq.value.splice(indexTurmaExcluida, 1)
  await deletarTurma(turmas._id)
}

/* function editarTurmaTabela(turmaParaSerEditada: TabelaTurmaContainer) {
  ativarModal()
  mudarModalParaEdit()
  const usuarioASerEditado: ObjetoMatriculasContainer = arrayObjetosTabelaMatriculaReq.value.find(element => element._id == usuarioParaEditarMatricula._id) as ObjetoMatriculasContainer
  matriculaQueEstaAtiva.value = usuarioASerEditado as ObjetoMatriculasContainer
}
 */
</script>

<style>

</style>