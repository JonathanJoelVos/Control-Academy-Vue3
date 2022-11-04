<template>
    <section>
        <h1>Bem vindo {{usuarioParaFazerAMatricula.nomeUsuario}}!</h1>
        <form action="" @submit.prevent="fazerMatriculaNova">
            Papel: 
            <select name="" id="" v-model="objetoQueVaiSerFeitaAReqMatricula.role" required>
                    <option :value="objetoRole._id" v-for="objetoRole in listaDePapeisEditarMatricula" :key="objetoRole._id" >{{objetoRole.name}}</option>
            </select>
            
            Disciplina:
            <select name="" id="" v-model="disciplinaSelecionada" required>
                <option :value="objetoSubject._id" v-for="objetoSubject in listaDeDisciplinasEditarMatricula" :key="objetoSubject._id" >{{objetoSubject.name}}</option>
            </select>
            Turma: 
            <select name="" id="" v-model="objetoQueVaiSerFeitaAReqMatricula.classGroup" required>
                <option :value="objetoClassGroup._id" v-for="objetoClassGroup in listaDeTurmasEditarMatricula" :key="objetoClassGroup._id" >{{objetoClassGroup.name}}</option>
            </select>
            <button type="submit" >Enviar</button>
        </form>
        <p v-if="cpfJaExiste">CPF já existe nessa Turma!</p>
        <p v-if="reqFeitaComSucesso">Matricula feita com sucesso</p>
    </section>   
</template>

<script setup lang="ts">
import type { ClassGroupContainer } from '@/interfaces/classGroup';
import type { ObjetoMatriculaReq } from '@/interfaces/enrolled';
import type { RoleContainer } from '@/interfaces/role';
import { procurarDisciplinaPorId, listaDeDisciplinas } from '@/req/api/DisciplinasAPI';
import { listaDeMatriculados, criarMatricula } from '@/req/api/MatriculasAPI';
import { listaDePapeis } from '@/req/api/PapelAPI';
import { listaDeTurmas } from '@/req/api/TurmasAPI';
import { computed, onBeforeMount, ref, watch} from 'vue';
import { useRoute, type LocationQueryValue } from 'vue-router';
import type {ObjectSubjectContainer} from '../interfaces/subjects'

export interface UsuarioQueryMatriculaContainer {
    nomeUsuario: string;
    idUsuario:  string;
}

onBeforeMount(async () => {
    listaDeDisciplinasEditarMatricula.value = await listaDeDisciplinas()
    listaDePapeisEditarMatricula.value = await listaDePapeis()
    objetoQueVaiSerFeitaAReqMatricula.value.idUser = usuarioParaFazerAMatricula.value.idUsuario

})
const router = useRoute();
const listaDePapeisEditarMatricula = ref<RoleContainer[]>([])
const listaDeDisciplinasEditarMatricula = ref<ObjectSubjectContainer[]>([])
const listaDeTurmasEditarMatricula = ref<ClassGroupContainer[]>([])
const objetoQueVaiSerFeitaAReqMatricula = ref<ObjetoMatriculaReq>({
    idUser: '',
    role: '',
    classGroup:''
})
const disciplinaSelecionada = ref('')
const cpfJaExiste = ref(false)
const reqFeitaComSucesso = ref(false)

const usuarioParaFazerAMatricula = computed((): UsuarioQueryMatriculaContainer => {
    return {
        idUsuario: router.query.idUsuario as string,
        nomeUsuario: router.query.nomeUsuario as string,
    }
})

watch(disciplinaSelecionada, async () => {
    const disciplinaProcuradaPeloId = await procurarDisciplinaPorId(disciplinaSelecionada.value) 
    listaDeTurmasEditarMatricula.value = disciplinaProcuradaPeloId.classes
})

async function fazerMatriculaNova() {
    const resposta = await criarMatricula(objetoQueVaiSerFeitaAReqMatricula.value)
    if(!resposta) {
        cpfJaExiste.value = false
        reqFeitaComSucesso.value = true
    }else{
        cpfJaExiste.value = true
        reqFeitaComSucesso.value = false
    }

}

</script>