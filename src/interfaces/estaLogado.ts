import type { Ref } from "vue";

export interface EstaLogadoContainer {
    logar(): void;
    deslogar(): void;
    estaLogado: Ref<boolean>
}