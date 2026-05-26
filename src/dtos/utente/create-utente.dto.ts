export interface CreateUtenteDto {
    utilizador_id: number;
    medico_id: number;
    nr_utente: number;
    data_nascimento: Date;
    morada: string;
    contacto: string;
    nr_faturacao: number;
}