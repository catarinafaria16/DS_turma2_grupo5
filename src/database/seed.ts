import 'reflect-metadata';
import { AppDataSource } from './data-source.js';
import { Utilizador } from '../models/utilizador.entity.js';
import { Administrador } from '../models/administrador.entity.js';
import { Medico } from '../models/medico.entity.js';
import { Utente } from '../models/utente.entity.js';
import { AvaliacaoCarat } from '../models/avaliacaoCarat.entity.js';
import { testeUtilizadores, testeAdministradores, testeMedicos, testeUtentes } from '../data/dadosTeste.js';

const OPTS_1_9 = { 0: 'Nunca', 1: 'Até 2 dias por semana', 2: 'Mais de 2 dias por semana', 3: 'Quase todos os dias' };
const OPTS_10  = { 0: 'Não estou a tomar medicamentos', 1: 'Nunca', 2: 'Menos de 7 dias', 3: '7 ou mais dias' };

const AVALIACAO_CARAT_V1 = {
    versao: 1,
    q1:  'Nariz entupido?',
    q2:  'Espirros?',
    q3:  'Comichão no nariz?',
    q4:  'Corrimento/pingo do nariz?',
    q5:  'Falta de ar/dispneia?',
    q6:  'Chiadeira no peito/pieira?',
    q7:  'Aperto no peito com esforço físico?',
    q8:  'Cansaço/dificuldade em fazer as suas actividades ou tarefas do dia-a-dia?',
    q9:  'Acordou durante a noite por causa das suas doenças alérgicas respiratórias?',
    q10: 'Aumentar a utilização dos seus medicamentos por causa das suas doenças alérgicas respiratórias (asma/rinite/alergia)?',
    r1: OPTS_1_9, r2: OPTS_1_9, r3: OPTS_1_9, r4: OPTS_1_9,
    r5: OPTS_1_9, r6: OPTS_1_9, r7: OPTS_1_9, r8: OPTS_1_9,
    r9: OPTS_1_9, r10: OPTS_10,
};

async function seed() {
    await AppDataSource.initialize();

    const utilizadorRepo = AppDataSource.getRepository(Utilizador);
    const administradorRepo = AppDataSource.getRepository(Administrador);
    const medicoRepo = AppDataSource.getRepository(Medico);
    const utenteRepo = AppDataSource.getRepository(Utente);
    const avaliacaoCaratRepo = AppDataSource.getRepository(AvaliacaoCarat);

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

    const existeAvaliacao = await avaliacaoCaratRepo.findOne({ where: { versao: 1 } });
    if (!existeAvaliacao) {
        await avaliacaoCaratRepo.save(avaliacaoCaratRepo.create(AVALIACAO_CARAT_V1));
        console.log('AvaliacaoCarat v1 (questionário CARAT oficial) inserida');
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
