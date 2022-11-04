import localforage from "localforage";
import {http} from "../options/baseURL";
import type {ClassGroupContainer} from '../../interfaces/classGroup'


export async function listaDeTurmas(): Promise<ClassGroupContainer[]> {
    const path = '/classes'
    const token : string = await localforage.getItem('tokenAuthorization') as string
    const req = await http.get(path, {headers: {'Authorization': token }})
    return req.data.data
}

export async function deletarTurma(id: string): Promise<void> {
    const path = `/classes/delete/${id}`
    const token : string = await localforage.getItem('tokenAuthorization') as string
    await http.delete(path, {headers: {'Authorization': token }})
}