import { AppDataSource } from '../database/data-source.js';
import type { UtilizadorAutenticado } from '../middleware/auth.middleware.js';
import { PerfilUtilizador } from '../enums/PerfilUtilizador.enum.js';
import { Medico } from '../models/medico.entity.js';

export async function obterMedicoIdAutenticado(utilizador: UtilizadorAutenticado): Promise<number> {
    if (utilizador.perfil !== PerfilUtilizador.MEDICO) {
        throw new Error('Perfil autenticado nao e medico');
    }

    const medico = await AppDataSource
        .getRepository(Medico)
        .findOne({ where: { utilizador_id: utilizador.id } });

    if (!medico) {
        throw new Error('Medico autenticado nao encontrado');
    }

    return medico.id;
}
