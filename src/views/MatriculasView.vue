<template>
    <article>
    <h2>Matriculas</h2>
    <TableComponent
      :infosBody="arrayObjetosTabelaMatriculaReqTabela"
      :infosHeader="arrayObjetosTabelaMatricula"
      @excluir="excluirMatriculaTabela"
      @editar="editarMatriculaTabela"
    />
    <MatriculaModal 
      v-if="modalEstaAtivo"
      @enviarModal="fazerMatricula"
      :objeto="matriculaQueEstaAtiva"
    /> 
  </article>
</template>

<script setup lang="ts">
import TableComponent from "../components/TableComponent.vue";
import type { ObjetoMatriculaReq, ObjetoMatriculasContainer } from "@/interfaces/enrolled";
import type { LabelValuesInterface } from "@/interfaces/labelValues";
import { inject, onBeforeMount, ref } from "vue";
import {listaDeMatriculados, deletarMatricula} from '../req/api/MatriculasAPI'
import type { ModalEnviarOuCriarContainer, ModalEstaAtivoContainer } from "@/interfaces/modal";
import MatriculaModal from "@/components/Modal/MatriculaModal.vue";
import {updateMatricula} from '../req/api/MatriculasAPI'
import type { ObjectSubjectContainer } from "@/interfaces/subjects";

export interface ObjetoMatriculasContainerTabela {
  _id: string;
  idUser: string;
  role: string;
  classGroup: string;
  finalGrade: number;
  frequency: number;
}

export interface ObjetoMatriculasContainerTabelaLabel extends ObjetoMatriculasContainer {
  subject: ObjectSubjectContainer 
}

export interface ObjetoMatriculaReqUpdate extends ObjetoMatriculaReq{
  _id: string
}

const {ativarModal, modalEstaAtivo, desativarModal}: ModalEstaAtivoContainer  = inject('modalEstaAtivo')!
const {modalEnviarOuCriar, mudarModalParaCreated, mudarModalParaEdit}: ModalEnviarOuCriarContainer = inject('modalEnviarOuCriar')!

const matriculaQueEstaAtiva = ref<ObjetoMatriculasContainer>()

const arrayObjetosTabelaMatricula: LabelValuesInterface<ObjetoMatriculasContainerTabelaLabel>[] = [
  {label: 'Usuário', value: "idUser"},
  {label: 'Papel', value: "role"},
  {label: 'Turma', value: "classGroup"},
  {label: 'Disciplina', value: "subject"},
  {label: 'Frequencia', value: "frequency"},
  {label: 'Nota Final', value: "finalGrade"},
]

const arrayObjetosTabelaMatriculaReq = ref<ObjetoMatriculasContainer[] >([])
const arrayObjetosTabelaMatriculaReqTabela = ref<ObjetoMatriculasContainerTabela[]>([])

onBeforeMount(async () => {
arrayObjetosTabelaMatriculaReq.value = await listaDeMatriculados()

arrayObjetosTabelaMatriculaReqTabela.value =  arrayObjetosTabelaMatriculaReq.value.map(objeto => {
  const novoObjetoTabela = {
    _id: objeto._id,
    idUser: objeto.idUser.name,
    role: objeto.role.name,
    classGroup: objeto.classGroup.name,
    finalGrade: objeto.finalGrade,
    frequency: objeto.frequency,
    subject: objeto.classGroup.subject.name
  }
  return novoObjetoTabela
})
})

async function excluirMatriculaTabela(matriculas: ObjetoMatriculasContainerTabela): Promise<void> {
  const indexUsuarioExcluido = arrayObjetosTabelaMatriculaReqTabela.value.findIndex(element => element._id == matriculas._id)
  arrayObjetosTabelaMatriculaReqTabela.value.splice(indexUsuarioExcluido, 1)
  await deletarMatricula(matriculas._id)
}

function editarMatriculaTabela(usuarioParaEditarMatricula: ObjetoMatriculasContainerTabela) {
  ativarModal()
  mudarModalParaEdit()
  const usuarioASerEditado: ObjetoMatriculasContainer = arrayObjetosTabelaMatriculaReq.value.find(element => element._id == usuarioParaEditarMatricula._id) as ObjetoMatriculasContainer
  matriculaQueEstaAtiva.value = usuarioASerEditado as ObjetoMatriculasContainer
}

async function fazerMatricula(usuarioParaEditarMatricula: ObjetoMatriculaReqUpdate) {
  await updateMatricula(usuarioParaEditarMatricula._id, usuarioParaEditarMatricula)
  desativarModal()
  location.reload()
}

</script>

<style>

</style>