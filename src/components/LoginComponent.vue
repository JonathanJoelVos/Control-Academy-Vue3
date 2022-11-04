<template>
  <section>
    <div>
        <label class="cpfLogin--label" for="cpfLogin">
            usuário
            <input id="cpfLogin" type="text" v-model="cpfLogin" min="11" max="11" required>
        </label>
        <label class="passwordLogin--label" for="passwordLogin">
            senha
            <input id="passwordLogin" type="password" v-model="passwordLogin" required>
        </label>
        <span v-if="senhaInvalida">CPF ou Senha inválidos!</span>
        <button @click="goToHome" type="submit">Entrar</button>
    </div>
  </section>
</template>

<script setup lang="ts">
import { login } from '@/req/api/UserAPI';
import { inject, ref, onBeforeMount, type Ref } from 'vue';
import { useRouter } from 'vue-router';
import localForage from 'localforage'

const estaLogado: Ref<boolean> = inject('estaLogado') as Ref<boolean>

onBeforeMount(() => {
  estaLogado.value = false
})

const router = useRouter()
const cpfLogin = ref('')
const passwordLogin = ref('')
const senhaInvalida = ref(false)

async function goToHome() {
    try {
        const loginReq = await login(cpfLogin.value, passwordLogin.value) 
        if(loginReq.success) {
            const {_id: idUsuarioLogado } = loginReq.data
            localForage.setItem('idUser', idUsuarioLogado)
            estaLogado.value = true
            router.push('/home')
        } 
    } catch (error) {
        console.log(error)
        senhaInvalida.value = true
    }
}


</script>

<style scoped>
span {
    margin-top: 0.5rem;
    color: red;
}

div {
    box-sizing: border-box;
    background-color: #434242;
    height: 28.5rem;
    width: 38.75rem;
    max-width: 800px;
    display: flex;
    gap: 2.5rem;
    flex-direction: column;
    text-align: center;
    border-radius: 10px;
    box-shadow: 0 0 15px -10px #5C5C5C;
    padding: 2.75rem 7.813rem 8.688rem;
}



label {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    gap: 10px;
    font-size: 1.563rem;
    font-family: 'Roboto', sans-serif;
    font-weight: 400;
    color: #F2F2F2;
}


input {
    padding: 0.7rem;
    border: none;
    border-radius: 6px;
    background-color: #272727;
    color: #F2F2F2;
    width: 100%;
    height: 3.875rem;
}

button {
    padding: 1rem ;
    border: none;
    border-radius: 10px; 
    cursor: pointer;
    height: 3.688rem;
    font-size: 1.5rem;
    font-weight: 600;
    color: #F2F2F2;
    background-color: #579859;
    box-shadow: 0px 1px 4px #272727;
}

button:hover{
    background: #4f9652;
}

</style>