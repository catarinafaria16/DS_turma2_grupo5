import { PerfilUtilizador } from '../../enums/PerfilUtilizador.enum.js';

export interface UtilizadorResponseDto {
    id: number;
    nome: string;
    email: string;
    perfil: PerfilUtilizador;
}