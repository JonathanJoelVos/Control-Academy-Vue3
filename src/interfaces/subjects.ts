import type { ClassGroupContainer } from "./classGroup";

export interface ObjectSubjectContainer {
    _id: string;
    name: string;
    workLoad: number;
    menu: string;
    classes: Array<ClassGroupContainer>
}