import { PerfilUtilizador } from '../../enums/PerfilUtilizador.enum.js';
import { GeneroUtilizador } from '../../enums/GeneroUtilizador.enum.js';

export interface CreateUtilizadorDto {
    id?: number;
    nome: string;
    email: string;
    password: string;
    perfil: PerfilUtilizador;
    genero: GeneroUtilizador;
}
