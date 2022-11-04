import type { ObjetoUserContainer } from "@/req/api/UserAPI";
import type { ClassGroupContainer } from "./classGroup";
import type { RoleContainer } from "./role";

export interface ObjetoMatriculasContainer {
    _id: string;
    idUser: ObjetoUserContainer;
    role: RoleContainer;
    classGroup: ClassGroupContainer;
    frequency: number;
    finalGrade: number;
}

export interface ObjetoMatriculaReq {
    _id?: string;
    idUser: string;
    role: string;
    classGroup: string;
    frequency?: number;
    finalGrade?: number;
}
