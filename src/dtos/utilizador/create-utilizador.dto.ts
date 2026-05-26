import { PerfilUtilizador } from '../../enums/PerfilUtilizador.enum.js';
import { GeneroUtilizador } from '../../enums/GeneroUtilizador.enum.js';

export interface CreateUtilizadorDto {
    nome: string;
    email: string;
    password: string;
    perfil: PerfilUtilizador;
    genero: GeneroUtilizador;
}