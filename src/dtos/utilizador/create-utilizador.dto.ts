import { PerfilUtilizador } from '../../enums/PerfilUtilizador.enum';

export interface CreateUtilizadorDto {
    nome: string;
    email: string;
    password: string;
    perfil: PerfilUtilizador;   
}