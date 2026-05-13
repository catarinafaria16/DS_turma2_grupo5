import { Tabagismo } from '../enums/Tabagismo.enum.js';

export class Anamnese {
    id: number;
    utente_id: number;
    historico_familiar: string;
    tabagismo: Tabagismo;

    constructor(
        id: number,
        utente_id: number,
        historico_familiar: string,
        tabagismo: Tabagismo
    ) {
        this.id = id;
        this.utente_id = utente_id;
        this.historico_familiar = historico_familiar;
        this.tabagismo = tabagismo;
    }
}
