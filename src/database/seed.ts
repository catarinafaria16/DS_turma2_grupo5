import 'reflect-metadata';
import { AppDataSource } from './data-source.js';
import { Utilizador } from '../models/utilizador.entity.js';
import { Administrador } from '../models/administrador.entity.js';
import { Medico } from '../models/medico.entity.js';
import { Utente } from '../models/utente.entity.js';
import { testeUtilizadores, testeAdministradores, testeMedicos, testeUtentes } from '../data/dadosTeste.js';

async function seed() {
    await AppDataSource.initialize();

    const utilizadorRepo = AppDataSource.getRepository(Utilizador);
    const administradorRepo = AppDataSource.getRepository(Administrador);
    const medicoRepo = AppDataSource.getRepository(Medico);
    const utenteRepo = AppDataSource.getRepository(Utente);

    for (const user of testeUtilizadores) {
        const existe = await utilizadorRepo.findOne({ where: { id: user.id } });
        if (!existe) {
            await utilizadorRepo.save(user);
            console.log(`Utilizador ${user.nome} inserido`);
        }
    }

    for (const administrador of testeAdministradores) {
        const existe = await administradorRepo.findOne({ where: { id: administrador.id } });
        if (!existe) {
            await administradorRepo.save(administrador);
            console.log(`Administrador ${administrador.id} inserido`);
        }
    }

    for (const medico of testeMedicos) {
        const existe = await medicoRepo.findOne({ where: { id: medico.id } });
        if (!existe) {
            await medicoRepo.save(medico);
            console.log(`Medico ${medico.id} inserido`);
        }
    }

    for (const utente of testeUtentes) {
        const existe = await utenteRepo.findOne({ where: { id: utente.id } });
        if (!existe) {
            await utenteRepo.save(utente);
            console.log(`Utente ${utente.id} inserido`);
        }
    }

    await AppDataSource.destroy();
}

seed().catch(async (error) => {
    console.error('Erro ao inserir dados de teste:', error);

    if (AppDataSource.isInitialized) {
        await AppDataSource.destroy();
    }

    process.exit(1);
});
