import type { ObjetoMatriculasContainer } from "./enrolled";
import type { ObjectSubjectContainer } from "./subjects";

export interface ClassGroupContainer {
    _id: string;
    name: string;
    vacancy: number;
    dateStart: Date;
    dateEnd: Date;
    enrolled: ObjetoMatriculasContainer[];
    subject: ObjectSubjectContainer;
}