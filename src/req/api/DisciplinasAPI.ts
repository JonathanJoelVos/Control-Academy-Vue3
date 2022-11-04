import type { ObjectSubjectContainer } from "@/interfaces/subjects";
import localforage from "localforage";
import {http} from "../options/baseURL";


export async function procurarDisciplinaPorId(id: any): Promise<ObjectSubjectContainer> {
    const path = `/subjects/${id}`
    const token : string = await localforage.getItem('tokenAuthorization') as string
    const req = await http.get(path, {headers: {'Authorization': token }})
    return req.data.data
}

export async function listaDeDisciplinas (): Promise<ObjectSubjectContainer[]> {
    const path = '/subjects'
    const token : string = await localforage.getItem('tokenAuthorization') as string
    const req = await http.get(path, {headers: {'Authorization': token }})
    return req.data.data
}