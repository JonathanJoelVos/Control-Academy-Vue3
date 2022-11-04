import type { Ref } from "vue";

export interface ModalEstaAtivoContainer {
    modalEstaAtivo: boolean;
    ativarModal(): void;
    desativarModal(): void;
  }
  
  export type ModalEnviarOuCriarType = Ref<'edit' | 'created'>
  
  export interface ModalEnviarOuCriarContainer {
    modalEnviarOuCriar: ModalEnviarOuCriarType;
    mudarModalParaCreated(): void;
    mudarModalParaEdit(): void;
  }