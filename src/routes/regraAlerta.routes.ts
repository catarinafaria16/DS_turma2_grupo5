/*
 * ============================================================
 * regraAlerta.routes.ts — Rotas da API para regras de alertas automáticos
 * ============================================================
 *
 * URL base: /api/regras-alerta
 * Apenas médicos e administradores podem gerir regras de alerta.
 *
 * Os administradores definem limiares globais do sistema.
 * Os médicos definem regras personalizadas para os seus utentes.
 *
 * Rotas disponíveis:
 *   GET    /api/regras-alerta                   — listar regras
 *   GET    /api/regras-alerta/medico/:medicoId  — regras de um médico
 *   POST   /api/regras-alerta                   — criar regra
 *   GET    /api/regras-alerta/:id               — obter regra específica
 *   PUT    /api/regras-alerta/:id               — atualizar regra
 *   DELETE /api/regras-alerta/:id               — apagar regra
 */
import { Router } from 'express';
import { RegraAlertaController } from '../controller/regraAlerta.controller.js';
import { autenticar, requirePerfil } from '../middleware/auth.middleware.js';
import { PerfilUtilizador } from '../enums/PerfilUtilizador.enum.js';

const routes = Router();
const controller = new RegraAlertaController();

// Requer autenticação
routes.use(autenticar);
// Apenas médicos e administradores têm acesso
routes.use(requirePerfil(PerfilUtilizador.MEDICO, PerfilUtilizador.ADMINISTRADOR));

// O Administrador gere os limiares globais; o Médico ajusta apenas as regras dos seus utentes
// (por exemplo, thresholds clinicos como bpm, score ou deterioracao).
// O Medico pode consultar e ajustar esses valores apenas nas regras associadas aos seus doentes.
routes.get('/medico/:medicoId', controller.listarPorMedico.bind(controller));
routes.get('/', controller.listar.bind(controller));
routes.post('/', controller.criar.bind(controller));
routes.get('/:id', controller.obter.bind(controller));
routes.put('/:id', controller.atualizar.bind(controller));
routes.delete('/:id', controller.apagar.bind(controller));

export default routes;
