/*
 * ============================================================
 * medicacaoHabitual.routes.ts — Rotas da API para medicação habitual
 * ============================================================
 *
 * URL base: /api/medicacoes-habituais
 * Apenas médicos e administradores têm acesso.
 *
 * A medicação habitual é atualizada automaticamente quando se prescrevem
 * medicamentos. Também pode ser gerida manualmente.
 *
 * Rotas disponíveis:
 *   GET  /api/medicacoes-habituais                     — listar medicação habitual
 *   GET  /api/medicacoes-habituais/anamnese/:anamneseId — medicação de uma anamnese
 *   POST /api/medicacoes-habituais                     — adicionar medicação habitual
 *   GET  /api/medicacoes-habituais/:id                 — obter medicação específica
 *   PUT  /api/medicacoes-habituais/:id                 — atualizar medicação habitual
 */
import { Router } from 'express';
import { MedicacaoHabitualController } from '../controller/medicacaoHabitual.controller.js';
import { autenticar, requirePerfil } from '../middleware/auth.middleware.js';
import { PerfilUtilizador } from '../enums/PerfilUtilizador.enum.js';

const routes = Router();
const controller = new MedicacaoHabitualController();

// Requer autenticação
routes.use(autenticar);
// Apenas médicos e administradores têm acesso
routes.use(requirePerfil(PerfilUtilizador.MEDICO, PerfilUtilizador.ADMINISTRADOR));

routes.get('/anamnese/:anamneseId', controller.listarPorAnamnese.bind(controller));
routes.get('/', controller.listar.bind(controller));
routes.post('/', controller.criar.bind(controller));
routes.get('/:id', controller.obter.bind(controller));
routes.put('/:id', controller.atualizar.bind(controller));


export default routes;
