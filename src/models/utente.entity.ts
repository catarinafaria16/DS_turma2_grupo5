export class Utente {
    id: number;
    utilizador_id: number;
    medico_id: number;
    nr_utente: number;
    data_nascimento: Date;
    morada: string;
    contacto: string;
    nr_faturacao: number;

    constructor(
        id: number,
        utilizador_id: number,
        medico_id: number,
        nr_utente: number,
        data_nascimento: Date,
        morada: string,
        contacto: string,
        nr_faturacao: number
    ) {
        this.id = id;
        this.utilizador_id = utilizador_id;
        this.medico_id = medico_id;
        this.nr_utente = nr_utente;
        this.data_nascimento = data_nascimento;
        this.morada = morada;
        this.contacto = contacto;
        this.nr_faturacao = nr_faturacao;
    }
}
