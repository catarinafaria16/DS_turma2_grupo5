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
import { PerfilUtilizador } from './enums/PerfilUtilizador.enum.js';
import { testeUtilizadores, testeAdministradores, testeMedicos, testeUtentes } from './data/dadosTeste.js';

const __dirname = dirname(fileURLToPath(import.meta.url));

const app = express();
const PORT = process.env['PORT'] ?? 80;
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
        { id: utilizador.id, email: utilizador.email, perfil: utilizador.perfil },
        JWT_SECRET,
        { expiresIn: '8h' }
    );

    return res.status(200).json({ token, user });
});

app.post('/api/registar', async (req, res) => {
    const { nome, email, password, perfil } = req.body;

    if (!nome || !email || !password || !perfil) {
        return res.status(400).json({ erro: 'Nome, email, password e perfil sao obrigatorios' });
    }

    if (password.length < 6) {
        return res.status(400).json({ erro: 'Password deve ter pelo menos 6 caracteres' });
    }

    if (perfil !== PerfilUtilizador.UTENTE) {
        return res.status(403).json({ erro: 'Registo publico apenas permite criar utilizadores com perfil UTENTE' });
    }

    const utilizadorRepo = AppDataSource.getRepository(Utilizador);
    const existente = await utilizadorRepo.findOne({ where: { email } });

    if (existente) {
        return res.status(400).json({ erro: 'Email ja esta atribuido a outro utilizador' });
    }

    const utilizador = utilizadorRepo.create({ nome, email, password, perfil });
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
