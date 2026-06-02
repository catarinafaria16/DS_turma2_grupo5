import 'reflect-metadata';
import { AppDataSource } from './data-source.js';
import { Utilizador } from '../models/utilizador.entity.js';
import { Administrador } from '../models/administrador.entity.js';
import { Medico } from '../models/medico.entity.js';
import { Utente } from '../models/utente.entity.js';
import { AvaliacaoCarat } from '../models/avaliacaoCarat.entity.js';
import { Prescricao } from '../models/prescricao.entity.js';
import { Medicacao } from '../models/medicacao.entity.js';
import { Exame } from '../models/exame.entity.js';
import { Sintoma } from '../models/sintoma.entity.js';
import { Anamnese } from '../models/anamnese.entity.js';
import { Alergia } from '../models/alergia.entity.js';
import { Comorbidade } from '../models/comorbidade.entity.js';
import { MedicacaoHabitual } from '../models/medicacaoHabitual.entity.js';
import { Alerta } from '../models/alerta.entity.js';
import { PlanoAcompanhamento } from '../models/planoAcompanhamento.entity.js';
import { RespostaCarat } from '../models/respostaCarat.entity.js';
import { Auditoria } from '../models/auditoria.entity.js';
import {
    testeUtilizadores, testeAdministradores, testeMedicos, testeUtentes,
    testePrescricoes, testeMedicacoes, testeExames, testeSintomas,
    testeAnamneses, testeAlergias, testeComorbidades, testeMedicacoesHabituais,
    testeAlertas, testePlanosAcompanhamento, testeRespostasCarat, testeAuditorias,
} from '../data/dadosTeste.js';

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

async function seedTable<T extends { id?: any }>(
    repo: any,
    dados: T[],
    label: string,
    idField: string = 'id'
) {
    let count = 0;
    for (const item of dados) {
        const where = { [idField]: (item as any)[idField] };
        const existe = await repo.findOne({ where });
        if (!existe) {
            await repo.save(item);
            count++;
        }
    }
    console.log(`  ${label}: ${count} inseridos`);
}

async function seed() {
    await AppDataSource.initialize();

    const utilizadorRepo        = AppDataSource.getRepository(Utilizador);
    const administradorRepo     = AppDataSource.getRepository(Administrador);
    const medicoRepo            = AppDataSource.getRepository(Medico);
    const utenteRepo            = AppDataSource.getRepository(Utente);
    const avaliacaoCaratRepo    = AppDataSource.getRepository(AvaliacaoCarat);
    const prescricaoRepo        = AppDataSource.getRepository(Prescricao);
    const medicacaoRepo         = AppDataSource.getRepository(Medicacao);
    const exameRepo             = AppDataSource.getRepository(Exame);
    const sintomaRepo           = AppDataSource.getRepository(Sintoma);
    const anamneseRepo          = AppDataSource.getRepository(Anamnese);
    const alergiaRepo           = AppDataSource.getRepository(Alergia);
    const comorbidadeRepo       = AppDataSource.getRepository(Comorbidade);
    const medicacaoHabitualRepo = AppDataSource.getRepository(MedicacaoHabitual);
    const alertaRepo            = AppDataSource.getRepository(Alerta);
    const planoRepo             = AppDataSource.getRepository(PlanoAcompanhamento);
    const respostaCaratRepo     = AppDataSource.getRepository(RespostaCarat);
    const auditoriaRepo         = AppDataSource.getRepository(Auditoria);

    console.log('A inserir dados de teste...');

    await seedTable(utilizadorRepo,        testeUtilizadores,         'Utilizadores');
    await seedTable(administradorRepo,     testeAdministradores,      'Administradores');
    await seedTable(medicoRepo,            testeMedicos,              'Médicos');
    await seedTable(utenteRepo,            testeUtentes,              'Utentes');

    const existeAvaliacao = await avaliacaoCaratRepo.findOne({ where: { versao: 1 } });
    if (!existeAvaliacao) {
        await avaliacaoCaratRepo.save(avaliacaoCaratRepo.create(AVALIACAO_CARAT_V1));
        console.log('  AvaliacaoCarat v1: 1 inserido');
    } else {
        console.log('  AvaliacaoCarat v1: já existe');
    }

    await seedTable(prescricaoRepo,        testePrescricoes,          'Prescrições');
    await seedTable(medicacaoRepo,         testeMedicacoes,           'Medicações');
    await seedTable(exameRepo,             testeExames,               'Exames');
    await seedTable(anamneseRepo,          testeAnamneses,            'Anamneses');
    await seedTable(alergiaRepo,           testeAlergias,             'Alergias');
    await seedTable(comorbidadeRepo,       testeComorbidades,         'Comorbidades');
    await seedTable(medicacaoHabitualRepo, testeMedicacoesHabituais,  'Medicações Habituais');
    await seedTable(sintomaRepo,           testeSintomas,             'Sintomas');
    await seedTable(alertaRepo,            testeAlertas,              'Alertas');
    await seedTable(planoRepo,             testePlanosAcompanhamento, 'Planos de Acompanhamento');
    await seedTable(respostaCaratRepo,     testeRespostasCarat,       'Respostas CARAT');
    await seedTable(auditoriaRepo,         testeAuditorias,           'Auditorias', 'log_id');

    console.log('\n✓ Seed completo!');
    await AppDataSource.destroy();
}

seed().catch(async (error) => {
    console.error('Erro ao inserir dados de teste:', error);
    if (AppDataSource.isInitialized) await AppDataSource.destroy();
    process.exit(1);
});
