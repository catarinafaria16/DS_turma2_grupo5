/*
 * ============================================================
 * alerta.routes.ts — Rotas da API para gestão de alertas clínicos
 * ============================================================
 *
 * Define os "endereços" para operações sobre alertas clínicos.
 * Alertas são gerados automaticamente quando um score CARAT é preocupante,
 * ou podem ser criados manualmente pelo médico.
 *
 * URL base: /api/alertas
 *
 * Rotas disponíveis:
 *   GET   /api/alertas                     — listar alertas (filtrado por perfil)
 *   GET   /api/alertas/resumo              — resumo estatístico dos alertas
 *   GET   /api/alertas/utente/:utenteId    — alertas de um utente específico
 *   GET   /api/alertas/medico/:medicoId    — alertas de um médico específico
 *   GET   /api/alertas/estado/:estado      — alertas filtrados por estado
 *   POST  /api/alertas                     — criar alerta manualmente
 *   GET   /api/alertas/:id                 — obter um alerta específico
 *   PUT   /api/alertas/:id                 — atualizar estado do alerta
 *   PATCH /api/alertas/:id/lido            — marcar alerta como "visto"
 *   PATCH /api/alertas/:id/resolvido       — marcar alerta como "fechado/resolvido"
 *   PATCH /api/alertas/:id/nota            — adicionar nota clínica ao alerta
 */
import { Router } from 'express';
import { AlertaController } from '../controller/alerta.controller.js';
import { autenticar, requirePerfil } from '../middleware/auth.middleware.js';
import { PerfilUtilizador } from '../enums/PerfilUtilizador.enum.js';

const routes = Router();
const controller = new AlertaController();

// Todas as rotas requerem autenticação
routes.use(autenticar);
// Todos os perfis podem aceder (mas cada um só vê os seus alertas)
routes.use(requirePerfil(PerfilUtilizador.UTENTE, PerfilUtilizador.MEDICO, PerfilUtilizador.ADMINISTRADOR));

routes.get('/resumo', controller.resumo.bind(controller));               // Resumo estatístico de alertas
routes.get('/utente/:utenteId', controller.listarPorUtente.bind(controller));   // Alertas de um utente
routes.get('/medico/:medicoId', controller.listarPorMedico.bind(controller));   // Alertas de um médico
routes.get('/estado/:estado', controller.listarPorEstado.bind(controller));     // Filtrar por estado
routes.get('/', controller.listar.bind(controller));
routes.post('/', controller.criar.bind(controller));
routes.get('/:id', controller.obter.bind(controller));
routes.put('/:id', controller.atualizar.bind(controller));
routes.patch('/:id/lido', controller.marcarComoLido.bind(controller));          // Marcar como VISTO
routes.patch('/:id/resolvido', controller.marcarComoResolvido.bind(controller)); // Marcar como FECHADO
routes.patch('/:id/nota', controller.adicionarNota.bind(controller));           // Adicionar nota clínica


export default routes;
