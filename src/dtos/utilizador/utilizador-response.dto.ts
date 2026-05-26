import { PerfilUtilizador } from '../../enums/PerfilUtilizador.enum.js';
import { GeneroUtilizador } from '../../enums/GeneroUtilizador.enum.js';

export interface UtilizadorResponseDto {
    id: number;
    nome: string;
    email: string;
    perfil: PerfilUtilizador;
    genero: GeneroUtilizador;
    deleted_at?: Date;
}