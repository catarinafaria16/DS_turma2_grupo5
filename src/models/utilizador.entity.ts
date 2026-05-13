import { PerfilUtilizador } from '../enums/PerfilUtilizador.enum';

export class Utilizador {
    id: number;
    nome: string;
    email: string;
    password: string;
    perfil: PerfilUtilizador;

    constructor(
        id: number,
        nome: string,
        email: string,
        password: string,
        perfil: PerfilUtilizador
    ) {
        this.id = id;
        this.nome = nome;
        this.email = email;
        this.password = password;
        this.perfil = perfil;
    }
}
