<template>
  <table>
        <thead>
            <tr>
                <th v-for="valoresObjetoInfosHeader in infosHeader" :key="valoresObjetoInfosHeader.value">
                    {{valoresObjetoInfosHeader.label}}
                </th>
                <th>Editar</th>
                <th>Excluir</th>
            </tr>
        </thead>
        <tbody>
            <tr v-for="valoresObjetoBody in infosBody" :key="valoresObjetoBody._id">
                <td v-for="valoresObjetoInfosHeader in infosHeader" :key="valoresObjetoInfosHeader.value">
                    {{valoresObjetoBody[valoresObjetoInfosHeader.value]}}
                </td>
                <td >
                    <button @click="emit('editar', valoresObjetoBody)">
                        Editar
                    </button>
                </td>
                <td v-if="valoresObjetoBody.name != 'admin'">
                    <button @click="emit('excluir', valoresObjetoBody)">
                        Excluir
                    </button>
                </td>
            </tr>
        </tbody>
    </table>
</template>

<script setup lang="ts">
import type { ObjetoUserContainer } from '@/req/api/UserAPI';
import type { ObjetoMatriculasContainer } from '@/interfaces/enrolled';
import type { ObjetoMatriculasContainerTabela } from '@/views/MatriculasView.vue';
import type { ClassGroupContainer } from '@/interfaces/classGroup';
import type {TabelaTurmaContainer} from '../views/TurmasView.vue'
interface valoresObjetoInfosHeaderContainer {
    label: string;
    value: keyof ObjetoUserContainer | keyof ObjetoMatriculasContainer | keyof ClassGroupContainer;
}

interface TableProps {
    infosBody: ObjetoUserContainer[] | ObjetoMatriculasContainerTabela[] | TabelaTurmaContainer[];
    infosHeader: valoresObjetoInfosHeaderContainer[];
}

defineProps<TableProps>()
const emit = defineEmits(['excluir', 'editar'])

</script>

<style scoped>
    table {
        max-height: 80px ;
    }
    td {
        text-align: center;
    }
    thead {
        background-color: black;
    }
</style>>
