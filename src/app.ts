import express from 'express';
import jwt from 'jsonwebtoken';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import 'reflect-metadata';
import { AppDataSource } from './database/data-source.js';

import utilizadorRoutes from './routes/utilizador.routes.js';
import utenteRoutes from './routes/utente.routes.js';
import medicoRoutes from './routes/medico.routes.js';
import administradorRoutes from './routes/administrador.routes.js';
import alertaRoutes from './routes/alerta.routes.js';
import anamneseRoutes from './routes/anamnese.routes.js';
import avaliacaoCaratRoutes from './routes/avaliacaoCarat.routes.js';
import exameRoutes from './routes/exame.routes.js';
import medicacaoRoutes from './routes/medicacao.routes.js';
import medicacaoHabitualRoutes from './routes/medicacaoHabitual.routes.js';
import planoAcompanhamentoRoutes from './routes/planoAcompanhamento.routes.js';
import prescricaoRoutes from './routes/prescricao.routes.js';
import regraAlertaRoutes from './routes/regraAlerta.routes.js';
import respostaCaratRoutes from './routes/respostaCarat.routes.js';
import sintomaRoutes from './routes/sintoma.routes.js';
import alergiaRoutes from './routes/alergia.routes.js';
import comorbidadeRoutes from './routes/comorbidade.routes.js';
import auditoriaRoutes from './routes/auditoria.routes.js';
import dashboardRoutes from './routes/dashboard.routes.js';
import fhirRoutes from './routes/fhir.routes.js';
import { Utilizador } from './models/utilizador.entity.js';
import { Medico } from './models/medico.entity.js';
import { Utente } from './models/utente.entity.js';
import { Administrador } from './models/administrador.entity.js';
import { AvaliacaoCarat } from './models/avaliacaoCarat.entity.js';
import { Anamnese } from './models/anamnese.entity.js';
import { Alergia } from './models/alergia.entity.js';
import { Alerta } from './models/alerta.entity.js';
import { Comorbidade } from './models/comorbidade.entity.js';
import { Prescricao } from './models/prescricao.entity.js';
import { Medicacao } from './models/medicacao.entity.js';
import { MedicacaoHabitual } from './models/medicacaoHabitual.entity.js';
import { Exame } from './models/exame.entity.js';
import { Sintoma } from './models/sintoma.entity.js';
import { PlanoAcompanhamento } from './models/planoAcompanhamento.entity.js';
import { RespostaCarat } from './models/respostaCarat.entity.js';
import { Auditoria } from './models/auditoria.entity.js';
import { PerfilUtilizador } from './enums/PerfilUtilizador.enum.js';
import { testeUtilizadores, testeAdministradores, testeMedicos, testeUtentes, testePrescricoes, testeMedicacoes, testeExames, testeSintomas, testeAnamneses, testeAlergias, testeComorbidades, testeMedicacoesHabituais, testeAlertas, testePlanosAcompanhamento, testeRespostasCarat, testeAuditorias } from './data/dadosTeste.js';

const OPTS_1_9 = { 0: 'Nunca', 1: 'Até 2 dias por semana', 2: 'Mais de 2 dias por semana', 3: 'Quase todos os dias' };
const OPTS_10  = { 0: 'Não estou a tomar medicamentos', 1: 'Nunca', 2: 'Menos de 7 dias', 3: '7 ou mais dias' };
const AVALIACAO_CARAT_V1 = {
    versao: 1,
    q1: 'Nariz entupido?', q2: 'Espirros?', q3: 'Comichão no nariz?', q4: 'Corrimento/pingo do nariz?',
    q5: 'Falta de ar/dispneia?', q6: 'Chiadeira no peito/pieira?', q7: 'Aperto no peito com esforço físico?',
    q8: 'Cansaço/dificuldade em fazer as suas actividades ou tarefas do dia-a-dia?',
    q9: 'Acordou durante a noite por causa das suas doenças alérgicas respiratórias?',
    q10: 'Aumentar a utilização dos seus medicamentos por causa das suas doenças alérgicas respiratórias (asma/rinite/alergia)?',
    r1: OPTS_1_9, r2: OPTS_1_9, r3: OPTS_1_9, r4: OPTS_1_9, r5: OPTS_1_9,
    r6: OPTS_1_9, r7: OPTS_1_9, r8: OPTS_1_9, r9: OPTS_1_9, r10: OPTS_10,
};

const __dirname = dirname(fileURLToPath(import.meta.url));

const app = express();
const PORT = process.env['PORT'] ?? 3000;
const JWT_SECRET = process.env['JWT_SECRET'] ?? 'carat-dev-secret-change-me';

app.use(express.static(join(__dirname, '..', 'public')));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.post('/api/login', async (req, res) => {
    const { id, password } = req.body;
    const utilizadorId = Number(id);

    if (!utilizadorId || !password) {
        return res.status(400).json({ erro: 'ID e password sao obrigatorios' });
    }

    const utilizadorRepo = AppDataSource.getRepository(Utilizador);
    const utilizador = await utilizadorRepo.findOne({ where: { id: utilizadorId } });

    if (!utilizador || utilizador.password !== password) {
        return res.status(401).json({ erro: 'ID ou password invalidos' });
    }

    const user = {
        id: utilizador.id,
        nome: utilizador.nome,
        email: utilizador.email,
        perfil: utilizador.perfil
    };
    const token = jwt.sign(
        { id: utilizador.id, perfil: utilizador.perfil },
        JWT_SECRET,
        { expiresIn: '8h' }
    );

    return res.status(200).json({ token, user });
});

app.post('/api/registar', async (req, res) => {
    const { nome, email, password, perfil, genero } = req.body;

    if (!nome || !email || !password || !perfil || !genero) {
        return res.status(400).json({ erro: 'Nome, email, password, perfil e genero sao obrigatorios' });
    }

    if (password.length < 6) {
        return res.status(400).json({ erro: 'Password deve ter pelo menos 6 caracteres' });
    }

    if (perfil !== PerfilUtilizador.UTENTE) {
        return res.status(403).json({ erro: 'Registo publico apenas permite criar utilizadores com perfil utente' });
    }

    const { GeneroUtilizador } = await import('./enums/GeneroUtilizador.enum.js');
    if (!Object.values(GeneroUtilizador).includes(genero)) {
        return res.status(400).json({ erro: `Genero invalido. Valores aceites: ${Object.values(GeneroUtilizador).join(', ')}` });
    }

    const utilizadorRepo = AppDataSource.getRepository(Utilizador);
    const existente = await utilizadorRepo.findOne({ where: { email } });

    if (existente) {
        return res.status(400).json({ erro: 'Email ja esta atribuido a outro utilizador' });
    }

    const utilizador = utilizadorRepo.create({ nome, email, password, perfil, genero });
    const saved = await utilizadorRepo.save(utilizador);

    return res.status(201).json({
        mensagem: 'Utilizador criado com sucesso',
        dados: {
            id: saved.id,
            nome: saved.nome,
            email: saved.email,
            perfil: saved.perfil
        }
    });
});

app.use('/api/utilizadores', utilizadorRoutes);
app.use('/api/utentes', utenteRoutes);
app.use('/api/medicos', medicoRoutes);
app.use('/api/administradores', administradorRoutes);
app.use('/api/alertas', alertaRoutes);
app.use('/api/anamneses', anamneseRoutes);
app.use('/api/avaliacoes-carat', avaliacaoCaratRoutes);
app.use('/api/exames', exameRoutes);
app.use('/api/medicacoes', medicacaoRoutes);
app.use('/api/medicacoes-habituais', medicacaoHabitualRoutes);
app.use('/api/planos-acompanhamento', planoAcompanhamentoRoutes);
app.use('/api/prescricoes', prescricaoRoutes);
app.use('/api/regras-alerta', regraAlertaRoutes);
app.use('/api/respostas-carat', respostaCaratRoutes);
app.use('/api/sintomas', sintomaRoutes);
app.use('/api/alergias', alergiaRoutes);
app.use('/api/comorbidades', comorbidadeRoutes);
app.use('/api/auditoria', auditoriaRoutes);
app.use('/api/dashboard', dashboardRoutes);
app.use('/fhir', fhirRoutes);

app.get('/health', (_req, res) => {
    res.json({ status: 'ok', version: 'v2-typeorm', timestamp: new Date().toISOString() });
});

app.use((_req, res) => {
    res.status(404).json({ erro: 'Rota não encontrada' });
});

async function seedTestData() {
    const utilizadorRepo = AppDataSource.getRepository(Utilizador);
    const administradorRepo = AppDataSource.getRepository(Administrador);
    const medicoRepo = AppDataSource.getRepository(Medico);
    const utenteRepo = AppDataSource.getRepository(Utente);
    const avaliacaoCaratRepo = AppDataSource.getRepository(AvaliacaoCarat);
    const anamneseRepo = AppDataSource.getRepository(Anamnese);
    const alergiaRepo = AppDataSource.getRepository(Alergia);
    const alertaRepo = AppDataSource.getRepository(Alerta);
    const comorbidadeRepo = AppDataSource.getRepository(Comorbidade);
    const prescricaoRepo = AppDataSource.getRepository(Prescricao);
    const medicacaoRepo = AppDataSource.getRepository(Medicacao);
    const medicacaoHabitualRepo = AppDataSource.getRepository(MedicacaoHabitual);
    const exameRepo = AppDataSource.getRepository(Exame);
    const sintomaRepo = AppDataSource.getRepository(Sintoma);
    const planoAcompanhamentoRepo = AppDataSource.getRepository(PlanoAcompanhamento);
    const respostaCaratRepo = AppDataSource.getRepository(RespostaCarat);
    const auditoriaRepo = AppDataSource.getRepository(Auditoria);

    for (const utilizador of testeUtilizadores) {
        const existente = await utilizadorRepo.findOneBy({ id: utilizador.id });
        if (!existente) {
            await utilizadorRepo.save(utilizador);
        }
    }

    for (const administrador of testeAdministradores) {
        const existente = await administradorRepo.findOneBy({ id: administrador.id });
        if (!existente) {
            await administradorRepo.save(administrador);
        }
    }

    for (const medico of testeMedicos) {
        const existente = await medicoRepo.findOneBy({ id: medico.id });
        if (!existente) {
            await medicoRepo.save(medico);
        }
    }

    for (const utente of testeUtentes) {
        const existente = await utenteRepo.findOneBy({ id: utente.id });
        if (!existente) {
            await utenteRepo.save(utente);
        }
    }

    for (const anamnese of testeAnamneses) {
        const existente = await anamneseRepo.findOneBy({ id: anamnese.id });
        if (!existente) {
            await anamneseRepo.save(anamnese);
        }
    }

    for (const alergia of testeAlergias) {
        const existente = await alergiaRepo.findOneBy({ id: alergia.id });
        if (!existente) {
            await alergiaRepo.save(alergia);
        }
    }

    for (const comorbidade of testeComorbidades) {
        const existente = await comorbidadeRepo.findOneBy({ id: comorbidade.id });
        if (!existente) {
            await comorbidadeRepo.save(comorbidade);
        }
    }

    for (const alerta of testeAlertas) {
        const existente = await alertaRepo.findOneBy({ id: alerta.id });
        if (!existente) {
            await alertaRepo.save(alerta);
        }
    }

    for (const prescricao of testePrescricoes) {
        const existente = await prescricaoRepo.findOneBy({ id: prescricao.id });
        if (!existente) {
            await prescricaoRepo.save(prescricao);
        }
    }

    for (const medicacao of testeMedicacoes) {
        const existente = await medicacaoRepo.findOneBy({ id: medicacao.id });
        if (!existente) {
            await medicacaoRepo.save(medicacao);
        }
    }

    for (const medicacaoHabitual of testeMedicacoesHabituais) {
        const existente = await medicacaoHabitualRepo.findOneBy({ id: medicacaoHabitual.id });
        if (!existente) {
            await medicacaoHabitualRepo.save(medicacaoHabitual);
        }
    }

    for (const exame of testeExames) {
        const existente = await exameRepo.findOneBy({ id: exame.id });
        if (!existente) {
            await exameRepo.save(exame);
        }
    }

    for (const sintoma of testeSintomas) {
        const existente = await sintomaRepo.findOneBy({ id: sintoma.id });
        if (!existente) {
            await sintomaRepo.save(sintoma);
        }
    }

    for (const plano of testePlanosAcompanhamento) {
        const existente = await planoAcompanhamentoRepo.findOneBy({ id: plano.id });
        if (!existente) {
            await planoAcompanhamentoRepo.save(plano);
        }
    }

    const existeAvaliacaoV1 = await avaliacaoCaratRepo.findOneBy({ versao: 1 });
    if (!existeAvaliacaoV1) {
        await avaliacaoCaratRepo.save(avaliacaoCaratRepo.create(AVALIACAO_CARAT_V1));
        console.log('AvaliacaoCarat v1 inserida');
    }

    for (const resposta of testeRespostasCarat) {
        const existente = await respostaCaratRepo.findOneBy({ id: resposta.id });
        if (!existente) {
            await respostaCaratRepo.save(resposta);
        }
    }

    for (const auditoria of testeAuditorias) {
        const existente = await auditoriaRepo.findOneBy({ log_id: auditoria.log_id });
        if (!existente) {
            await auditoriaRepo.save(auditoria);
        }
    }
}

AppDataSource.initialize()
    .then(async () => {
        console.log('Database connected successfully');
        await seedTestData();
        app.listen(PORT, () => {
            console.log(`Servidor a correr na porta ${PORT}`);
        });
    })
    .catch((error) => {
        console.error('Error during database initialization:', error);
        process.exit(1);
    });

export default app;
