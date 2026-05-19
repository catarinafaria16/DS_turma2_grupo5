import express from 'express';
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

const __dirname = dirname(fileURLToPath(import.meta.url));

const app = express();
const PORT = process.env['PORT'] ?? 3001;

app.use(express.static(join(__dirname, '..', 'public')));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

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

app.get('/health', (_req, res) => {
    res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

app.use((_req, res) => {
    res.status(404).json({ erro: 'Rota não encontrada' });
});

AppDataSource.initialize()
    .then(() => {
        console.log('Database connected successfully');
        app.listen(PORT, () => {
            console.log(`Servidor a correr na porta ${PORT}`);
        });
    })
    .catch((error) => {
        console.error('Error during database initialization:', error);
        process.exit(1);
    });

export default app;
