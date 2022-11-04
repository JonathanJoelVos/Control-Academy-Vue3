import type { RoleContainer } from "@/interfaces/role";
import localforage from "localforage";
import {http} from "../options/baseURL";


export async function listaDePapeis (): Promise<RoleContainer[]> {
    const path = '/roles'
    const token : string = await localforage.getItem('tokenAuthorization') as string
    const req = await http.get(path, {headers: {'Authorization': token }})
    return req.data.data
}