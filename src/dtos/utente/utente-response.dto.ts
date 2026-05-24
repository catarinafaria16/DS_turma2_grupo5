import { GeneroUtilizador } from '../../enums/GeneroUtilizador.enum.js';

export interface UtenteResponseDto {
    id: number;
    utilizador_id: number;
    medico_id: number;
    nr_utente: number;
    data_nascimento: Date;
    morada: string;
    contacto: string;
    nr_faturacao: number;
    genero?: GeneroUtilizador;
    deleted_at?: Date;
}