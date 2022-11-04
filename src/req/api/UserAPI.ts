import localforage from "localforage";
import {http} from "../options/baseURL";

export interface ObjetoUserContainer {
    _id: string,
    cpf: string,
    email: string,
    name: string,
    surname: string,
    password: string,
    telephone: string,
    address: string,
    register: [],
}

export interface ObjetoUserContainerCreated {
    cpf: string,
    email: string,
    name: string,
    surname: string,
    password: string,
    telephone: string,
    address: string,
    register: [],
}


export interface LoginContainer {
    success: boolean,
    data: ObjetoUserContainer
        
}

export async function login(cpf: string, password: string): Promise<LoginContainer>{
    const path = '/login'
    const req = await http.post(path, {cpf: cpf, password: password}, {headers: {'Content-Type':'application/json'}})
    const token = req.headers.authorization
    if(token) {
        localforage.setItem('tokenAuthorization', token)
        return req.data
    }
    return req.data
}

export async function listaDeUsuarios (): Promise<ObjetoUserContainer[]> {
        const path = '/users'
        const token : string = await localforage.getItem('tokenAuthorization') as string
        const req = await http.get(path, {headers: {'Authorization': token }})
        return req.data.data
}

export async function updateUsuarios(id: string, objeto: ObjetoUserContainer): Promise<void> {
    const path = `/users/update/${id}`
    const token : string = await localforage.getItem('tokenAuthorization') as string
    await http.put(path, objeto , {headers: {'Authorization': token }})
}

export async function deletarUsuarios(id: string): Promise<void> {
    const path = `/users/delete/${id}`
    const token : string = await localforage.getItem('tokenAuthorization') as string
    await http.delete(path, {headers: {'Authorization': token }})
}

export async function criarUsuarios(objeto: ObjetoUserContainerCreated): Promise<void> {
    try {
        const path = `/users/create`
        const token : string = await localforage.getItem('tokenAuthorization') as string
        await http.post(path, objeto, {headers: {'Authorization': token }})
    } catch (error) {
        console.log(error)
    }
}