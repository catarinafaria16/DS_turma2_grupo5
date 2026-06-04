/*
 * ============================================================
 * utente.routes.ts — Rotas da API para gestão de utentes
 * ============================================================
 *
 * Define os "endereços" (URLs) disponíveis para operações sobre utentes.
 * Todas as rotas requerem autenticação (autenticar).
 * Algumas rotas adicionalmente requerem um perfil específico (requirePerfil).
 *
 * URL base: /api/utentes
 *
 * Rotas disponíveis:
 *   GET    /api/utentes                      — listar utentes (filtrado por perfil)
 *   GET    /api/utentes/medico/:medicoId      — listar utentes de um médico
 *   POST   /api/utentes                      — criar novo utente (admin/médico)
 *   GET    /api/utentes/:id                  — obter dados de um utente
 *   GET    /api/utentes/:id/historico        — histórico clínico de um utente
 *   PUT    /api/utentes/:id                  — atualizar dados de um utente
 *   DELETE /api/utentes/:id                  — apagar utente (admin/médico)
 */
import { Router } from 'express';
import { UtenteController } from '../controller/utente.controller.js';
import { autenticar, requirePerfil } from '../middleware/auth.middleware.js';
import { PerfilUtilizador } from '../enums/PerfilUtilizador.enum.js';

// Router do Express — agrupa as rotas desta secção da API
const routes = Router();
const controller = new UtenteController();

// Todas as rotas neste ficheiro requerem autenticação com token JWT
routes.use(autenticar);

// RNF001: Administrador e Medico podem consultar listas de utentes.
routes.get('/medico/:medicoId', requirePerfil(PerfilUtilizador.ADMINISTRADOR, PerfilUtilizador.MEDICO), controller.listarPorMedico.bind(controller));
routes.get('/', requirePerfil(PerfilUtilizador.ADMINISTRADOR, PerfilUtilizador.MEDICO, PerfilUtilizador.UTENTE), controller.listar.bind(controller));

// RNF001/RNF004: criacao de utente validada no servico.
routes.post('/', requirePerfil(PerfilUtilizador.ADMINISTRADOR, PerfilUtilizador.MEDICO), controller.criar.bind(controller));

// RNF001: acesso ao detalhe depende do perfil e da associacao ao utente.
routes.get('/:id', controller.obter.bind(controller));
routes.get('/:id/historico', controller.historicoClinico.bind(controller));
routes.put('/:id', controller.atualizar.bind(controller));
routes.delete('/:id', requirePerfil(PerfilUtilizador.ADMINISTRADOR, PerfilUtilizador.MEDICO), controller.apagar.bind(controller));

export default routes;
