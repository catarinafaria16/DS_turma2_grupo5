/*
 * ============================================================
 * medicacao.routes.ts — Rotas da API para medicamentos prescritos
 * ============================================================
 *
 * URL base: /api/medicacoes
 *
 * Os medicamentos estão sempre associados a uma prescrição.
 * Criar/atualizar medicamentos é restrito a médicos e admins.
 * Utentes podem consultar os seus próprios medicamentos.
 *
 * Rotas disponíveis:
 *   GET  /api/medicacoes                             — listar medicamentos
 *   GET  /api/medicacoes/prescricao/:prescricaoId    — medicamentos de uma prescrição
 *   POST /api/medicacoes                             — adicionar medicamento (médico/admin)
 *   GET  /api/medicacoes/:id                         — obter medicamento específico
 *   PUT  /api/medicacoes/:id                         — atualizar medicamento (médico/admin)
 */
import { Router } from 'express';
import { MedicacaoController } from '../controller/medicacao.controller.js';
import { autenticar, requirePerfil } from '../middleware/auth.middleware.js';
import { PerfilUtilizador } from '../enums/PerfilUtilizador.enum.js';

const routes = Router();
const controller = new MedicacaoController();

// Todas as rotas requerem autenticação JWT
routes.use(autenticar);

// RNF001: o Utente pode consultar a propria medicacao; criacao e alteracao ficam reservadas ao Medico e ao Administrador.
routes.get(
    '/prescricao/:prescricaoId',
    requirePerfil(PerfilUtilizador.UTENTE, PerfilUtilizador.MEDICO, PerfilUtilizador.ADMINISTRADOR),
    controller.listarPorPrescricao.bind(controller)
);
routes.get('/', requirePerfil(PerfilUtilizador.UTENTE, PerfilUtilizador.MEDICO, PerfilUtilizador.ADMINISTRADOR), controller.listar.bind(controller));
routes.post('/', requirePerfil(PerfilUtilizador.MEDICO, PerfilUtilizador.ADMINISTRADOR), controller.criar.bind(controller));
routes.get('/:id', requirePerfil(PerfilUtilizador.UTENTE, PerfilUtilizador.MEDICO, PerfilUtilizador.ADMINISTRADOR), controller.obter.bind(controller));
routes.put('/:id', requirePerfil(PerfilUtilizador.MEDICO, PerfilUtilizador.ADMINISTRADOR), controller.atualizar.bind(controller));


export default routes;
