/*
 * ============================================================
 * respostaCarat.routes.ts — Rotas da API para respostas ao questionário CARAT
 * ============================================================
 *
 * Define os "endereços" para operações sobre preenchimentos do questionário CARAT.
 * Acessível por utentes (para preencher o seu próprio questionário),
 * médicos (para ver os questionários dos seus utentes) e administradores.
 *
 * URL base: /api/respostas-carat
 *
 * Rotas disponíveis:
 *   GET  /api/respostas-carat                         — listar respostas (filtrado por perfil)
 *   POST /api/respostas-carat                         — submeter novo questionário CARAT
 *   GET  /api/respostas-carat/:id                     — obter uma resposta específica
 *   PUT  /api/respostas-carat/:id                     — atualizar uma resposta
 *   GET  /api/respostas-carat/avaliacao/:avaliacaoId  — respostas por versão de avaliação
 *   GET  /api/respostas-carat/utente/:utenteId        — histórico CARAT de um utente
 */
import { Router } from 'express';
import { RespostaCaratController } from '../controller/respostaCarat.controller.js';
import { autenticar, requirePerfil } from '../middleware/auth.middleware.js';
import { PerfilUtilizador } from '../enums/PerfilUtilizador.enum.js';

const routes = Router();
const controller = new RespostaCaratController();

// Todas as rotas requerem autenticação
routes.use(autenticar);
// Todos os perfis (utente, médico, admin) podem aceder — mas cada um só vê os seus dados
routes.use(requirePerfil(PerfilUtilizador.UTENTE, PerfilUtilizador.MEDICO, PerfilUtilizador.ADMINISTRADOR));

routes.get('/avaliacao/:avaliacaoId', controller.listarPorAvaliacao.bind(controller));
routes.get('/utente/:utenteId', controller.listarPorUtente.bind(controller));
routes.get('/', controller.listar.bind(controller));
routes.post('/', controller.criar.bind(controller));
routes.get('/:id', controller.obter.bind(controller));
routes.put('/:id', controller.atualizar.bind(controller));

export default routes;
