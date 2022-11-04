<template>
  <article>
    <h2>Usuários</h2>
    <button @click="criarUsuario">Criar</button>
    <TableComponent
      :infosBody="arrayObjetosTabelaUsersReq"
      :infosHeader="arrayObjetosTabelaUser"
      @excluir="excluirUsuarioTabela"
      @editar="editarUsuarioTabela"
    />
    <UserModalComponent
     v-if="modalEstaAtivo" 
     :objeto="usuario" 
     @enviarModal="enviarModalFunction"
     />
  </article>
</template>

<script setup lang="ts">
import TableComponent from "../components/TableComponent.vue";
import UserModalComponent from "@/components/Modal/UserModalComponent.vue";
import { deletarUsuarios, updateUsuarios, criarUsuarios,} from "@/req/api/UserAPI";
import type { ObjetoUserContainer, ObjetoUserContainerCreated } from "@/req/api/UserAPI";
import { inject, onBeforeMount, ref } from "vue";
import {listaDeUsuarios} from '@/req/api/UserAPI'
import type { LabelValuesInterface } from "@/interfaces/labelValues";
import type { ModalEnviarOuCriarContainer, ModalEstaAtivoContainer } from "@/interfaces/modal";



const arrayObjetosTabelaUser: LabelValuesInterface<ObjetoUserContainer>[] = [
  {label: 'Nome', value: "name"},
  {label: 'Sobrenome', value: 'surname'},
  {label: 'CPF', value: 'cpf'},
  {label: 'Email', value: 'email'},
  {label: 'Telefone', value: 'telephone'},
  {label: 'Endereço', value: 'address'}
]

const arrayObjetosTabelaUsersReq = ref<ObjetoUserContainer[]>([])
onBeforeMount(async () => {
  arrayObjetosTabelaUsersReq.value = await listaDeUsuarios()
})

const idUser = ref('')
const usuario = ref<ObjetoUserContainer | ObjetoUserContainerCreated>({
  _id: '',
  cpf: '',
  email: '',
  name: '',
  surname: '',
  password: '',
  telephone: '',
  address: '',
  register: []
})

const {ativarModal, modalEstaAtivo, desativarModal}: ModalEstaAtivoContainer  = inject('modalEstaAtivo')!
const {modalEnviarOuCriar, mudarModalParaCreated, mudarModalParaEdit}: ModalEnviarOuCriarContainer = inject('modalEnviarOuCriar')!

function criarUsuario() {
    ativarModal()
    mudarModalParaCreated()
    usuario.value = {
    cpf: '',
    email: '',
    name: '',
    surname: '',
    password: '',
    telephone: '',
    address: '',
    register: []
    }
}

async function atualizarUsuarioTabela(user: ObjetoUserContainer): Promise<void>  {
  desativarModal()
  const indexUserASerAtuaizado = arrayObjetosTabelaUsersReq.value.findIndex(elemen => elemen._id == user._id)
  arrayObjetosTabelaUsersReq.value.splice(indexUserASerAtuaizado, 1, user)
  await updateUsuarios(user._id, user)
}

function editarUsuarioTabela(user: ObjetoUserContainer): void {
  ativarModal()
  mudarModalParaEdit()
  idUser.value = user._id
  const usuarioProcurado: ObjetoUserContainer = arrayObjetosTabelaUsersReq.value.find(user => user._id == idUser.value) as ObjetoUserContainer
  usuario.value = usuarioProcurado
}

async function excluirUsuarioTabela(user: ObjetoUserContainer): Promise<void> {
  const indexUsuarioExcluido = arrayObjetosTabelaUsersReq.value.findIndex(element => element._id == user._id)
  arrayObjetosTabelaUsersReq.value.splice(indexUsuarioExcluido, 1)
  await deletarUsuarios(user._id)
}

async function criarUsuarioModal(user: ObjetoUserContainer){
  idUser.value = user._id
  const usuarioProcurado: ObjetoUserContainer = arrayObjetosTabelaUsersReq.value.find(user => user._id == idUser.value) as ObjetoUserContainer
  usuario.value = usuarioProcurado
  await criarUsuarios(user)
  arrayObjetosTabelaUsersReq.value.push(user)
  desativarModal()
} 
 
async function enviarModalFunction(user: ObjetoUserContainer) {
  if(modalEnviarOuCriar.value == 'edit') {
    await atualizarUsuarioTabela(user)
  } else if(modalEnviarOuCriar.value == 'created'){
    await criarUsuarioModal(user)
  }
}

</script>

<style scoped>
article {
    width: 80%;
}

table {
    width: 100%;
}

thead {
    background: black;
}

</style>>

