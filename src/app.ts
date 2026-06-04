/*
 * ============================================================
 * app.ts — Ficheiro principal do servidor (ponto de entrada)
 * ============================================================
 *
 * Este é o ficheiro mais importante do backend. É aqui que o servidor
 * é criado, configurado e iniciado. Pensa nisto como o "motor" da
 * aplicação — é o primeiro ficheiro a ser executado quando o sistema arranca.
 *
 * O que acontece aqui, por ordem:
 *   1. São importadas todas as ferramentas e módulos necessários
 *   2. O servidor Express é criado e configurado
 *   3. São definidos os endpoints de login e registo (públicos, sem autenticação)
 *   4. São registadas todas as rotas da API (cada grupo tem o seu prefixo)
 *   5. A base de dados é ligada
 *   6. São inseridos dados de teste (se ainda não existirem)
 *   7. O servidor começa a ouvir pedidos na porta configurada
 */

// Importação das ferramentas principais do servidor
import express from 'express';   // Express: framework que facilita criar servidores web em Node.js
import jwt from 'jsonwebtoken';   // JWT: usado para criar tokens de autenticação (como um "crachá digital")
import { fileURLToPath } from 'url';  // Utilitário para obter o caminho do ficheiro atual
import { dirname, join } from 'path'; // Utilitários para trabalhar com caminhos de ficheiros
import 'reflect-metadata';            // Necessário para o TypeORM funcionar com decoradores TypeScript
import { AppDataSource } from './database/data-source.js'; // Configuração da ligação à base de dados

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

// Opções de resposta para as perguntas 1 a 9 do questionário CARAT
// (frequência dos sintomas durante a semana anterior)
const OPTS_1_9 = { 0: 'Nunca', 1: 'Até 2 dias por semana', 2: 'Mais de 2 dias por semana', 3: 'Quase todos os dias' };

// Opções de resposta para a pergunta 10 do questionário CARAT
// (frequência de utilização de medicamentos de resgate)
const OPTS_10  = { 0: 'Não estou a tomar medicamentos', 1: 'Nunca', 2: 'Menos de 7 dias', 3: '7 ou mais dias' };

/*
 * Questionário CARAT versão 1
 * O CARAT (Control of Allergic Rhinitis and Asthma Test) é um questionário
 * validado clinicamente que avalia o controlo de rinite alérgica e asma.
 * Tem 10 perguntas: as 4 primeiras sobre sintomas nasais, as seguintes sobre
 * sintomas de asma, e a última sobre uso de medicamentos de resgate.
 * A pontuação total indica o nível de controlo da doença.
 */
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

// Obtém o caminho absoluto da pasta onde este ficheiro está (necessário para servir ficheiros estáticos)
const __dirname = dirname(fileURLToPath(import.meta.url));

// Cria a aplicação Express (o servidor HTTP)
const app = express();
// Porta onde o servidor vai ouvir — usa a variável de ambiente PORT, ou 3000 por defeito
const PORT = process.env['PORT'] ?? 3000;
// Chave secreta para assinar tokens JWT — deve estar definida no ficheiro .env
const JWT_SECRET = process.env['JWT_SECRET'] ?? 'carat-dev-secret-change-me';

// Serve os ficheiros estáticos da pasta "public" (HTML, CSS, imagens do frontend)
app.use(express.static(join(__dirname, '..', 'public')));
// Permite que o servidor receba dados em formato JSON nos pedidos POST/PUT
app.use(express.json());
// Permite receber dados de formulários HTML tradicionais
app.use(express.urlencoded({ extended: true }));

/*
 * ENDPOINT DE LOGIN — POST /api/login
 *
 * Este é o ponto de entrada do sistema. O utilizador envia o seu ID e password,
 * e o servidor verifica se são válidos. Se sim, devolve um token JWT que o
 * utilizador deve incluir em todos os pedidos seguintes para provar a sua identidade.
 *
 * Nota especial: os médicos fazem login com o número de cédula médica (não o ID interno).
 */
app.post('/api/login', async (req, res) => {
    // Extrai o ID e a password do corpo do pedido
    const { id, password } = req.body;
    const utilizadorId = Number(id);

    if (!utilizadorId || !password) {
        return res.status(400).json({ erro: 'ID e password sao obrigatorios' });
    }

    const utilizadorRepo = AppDataSource.getRepository(Utilizador);
    const medicoRepo = AppDataSource.getRepository(Medico);
    const medico = await medicoRepo.findOne({ where: { numero_cedula_medica: utilizadorId } });
    let utilizador = medico
        ? await utilizadorRepo.findOne({ where: { id: medico.utilizador_id } })
        : await utilizadorRepo.findOne({ where: { id: utilizadorId } });

    if (utilizador?.perfil === PerfilUtilizador.MEDICO && !medico) {
        return res.status(401).json({ erro: 'ID ou password invalidos' });
    }

    if (!utilizador || utilizador.password !== password) {
        return res.status(401).json({ erro: 'ID ou password invalidos' });
    }

    const user = {
        id: utilizador.id,
        nome: utilizador.nome,
        email: utilizador.email,
        perfil: utilizador.perfil
    };
    // Cria o token JWT com os dados do utilizador (ID e perfil)
    // Este token é válido por 8 horas — depois o utilizador terá de fazer login novamente
    const token = jwt.sign(
        { id: utilizador.id, perfil: utilizador.perfil },
        JWT_SECRET,
        { expiresIn: '8h' }
    );

    // Devolve o token e os dados básicos do utilizador para o frontend guardar
    return res.status(200).json({ token, user });
});

/*
 * ENDPOINT DE REGISTO PÚBLICO — POST /api/registar
 *
 * Permite criar uma nova conta de utilizador sem necessitar de autenticação.
 * Por segurança, só é possível criar contas com perfil "UTENTE" (paciente).
 * A criação de médicos e administradores é feita por um administrador autenticado.
 */
app.post('/api/registar', async (req, res) => {
    // Extrai os dados do novo utilizador do corpo do pedido
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

/*
 * REGISTO DE ROTAS DA API
 *
 * Aqui são registadas todas as "estradas" da API. Cada linha associa
 * um prefixo de URL a um conjunto de rotas específicas.
 * Por exemplo: qualquer pedido a "/api/utentes/..." é encaminhado
 * para o ficheiro de rotas de utentes.
 *
 * Todas estas rotas estão protegidas por autenticação (exceto /api/login e /api/registar).
 */
app.use('/api/utilizadores', utilizadorRoutes);   // Gestão de utilizadores (admins, médicos, utentes)
app.use('/api/utentes', utenteRoutes);             // Gestão de pacientes (utentes)
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

// Rota de verificação de saúde do servidor — útil para monitorização
// Qualquer sistema externo pode chamar GET /health para saber se o servidor está operacional
app.get('/health', (_req, res) => {
    res.json({ status: 'ok', version: 'v2-typeorm', timestamp: new Date().toISOString() });
});

// Rota de fallback para URLs não reconhecidos — devolve erro 404 (Não encontrado)
// Esta é a última rota registada, por isso só é ativada se nenhuma anterior corresponder
app.use((_req, res) => {
    res.status(404).json({ erro: 'Rota não encontrada' });
});

/*
 * seedTestData — Função de inicialização de dados de teste
 *
 * Esta função verifica se já existem dados na base de dados e, caso não existam,
 * insere dados de exemplo (utilizadores, médicos, utentes, prescrições, etc.).
 *
 * É chamada uma única vez, quando o servidor arranca pela primeira vez.
 * A verificação "se já existe, não insere de novo" evita duplicados em
 * cada reinício do servidor.
 *
 * "Seed" é um termo técnico para "semear" a base de dados com dados iniciais,
 * tal como se semeia um campo antes de começar a colheita.
 */
async function seedTestData() {
    // Cria referências ("repositórios") para cada tabela da base de dados
    // Um repositório é como um "gestor" que sabe como ler e escrever numa tabela específica
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

/*
 * ARRANQUE DO SERVIDOR
 *
 * Aqui começa tudo:
 *   1. Inicializa a ligação à base de dados (AppDataSource.initialize)
 *   2. Se bem-sucedido, insere dados de teste (seedTestData)
 *   3. Inicia o servidor HTTP na porta configurada
 *   4. Se falhar (ex: base de dados corrompida), escreve o erro e encerra o processo
 */
AppDataSource.initialize()
    .then(async () => {
        console.log('Database connected successfully');
        // Insere dados de teste na base de dados (apenas se ainda não existirem)
        await seedTestData();
        // Começa a ouvir pedidos HTTP na porta definida
        app.listen(PORT, () => {
            console.log(`Servidor a correr na porta ${PORT}`);
        });
    })
    .catch((error) => {
        // Se ocorrer um erro ao ligar à base de dados, escreve o erro e encerra o processo
        console.error('Error during database initialization:', error);
        process.exit(1); // Código 1 indica saída com erro
    });

export default app;
