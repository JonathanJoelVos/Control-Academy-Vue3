import type { ObjetoMatriculaReq, ObjetoMatriculasContainer } from "@/interfaces/enrolled";
import localforage from "localforage";
import type { Ref } from "vue";
import {http} from "../options/baseURL";


export async function listaDeMatriculados(): Promise<ObjetoMatriculasContainer[]> {
    const path = '/enrolled'
    const token : string = await localforage.getItem('tokenAuthorization') as string
    const req = await http.get(path, {headers: {'Authorization': token }})
    return req.data.data
}

export async function deletarMatricula(id: string): Promise<void> {
    const path = `/enrolled/delete/${id}`
    const token : string = await localforage.getItem('tokenAuthorization') as string
    await http.delete(path, {headers: {'Authorization': token }})
}

export async function updateMatricula(id: string, objeto: ObjetoMatriculaReq): Promise<void> {
    const path = `/enrolled/update/${id}`
    const token : string = await localforage.getItem('tokenAuthorization') as string
    await http.put(path, objeto , {headers: {'Authorization': token }})
}

export async function criarMatricula(objeto: ObjetoMatriculaReq | Ref<ObjetoMatriculaReq>): Promise<any> {
    try {
        const path = `/enrolled/create`
        const token : string = await localforage.getItem('tokenAuthorization') as string
        await http.post(path, objeto, {headers: {'Authorization': token }})
    } catch (error) {
        return error
    }
}

