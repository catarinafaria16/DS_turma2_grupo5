import { PerfilUtilizador } from '../../enums/PerfilUtilizador.enum.js';

export interface CreateUtilizadorDto {
    nome: string;
    email: string;
    password: string;
    perfil: PerfilUtilizador;   
}