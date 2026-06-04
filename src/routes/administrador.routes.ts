/*
 * ============================================================
 * administrador.routes.ts — Rotas da API para administradores
 * ============================================================
 *
 * ACESSO RESTRITO: apenas administradores podem aceder a estas rotas.
 *
 * URL base: /api/administradores
 *
 * Rotas disponíveis:
 *   GET  /api/administradores/config/limiares-carat   — ver limiares CARAT configurados
 *   PUT  /api/administradores/config/limiares-carat   — configurar limiares CARAT
 *   POST /api/administradores/dados                   — operações de manutenção de dados
 *   GET  /api/administradores                         — listar administradores
 *   POST /api/administradores                         — criar administrador
 *   GET  /api/administradores/:id                     — obter administrador específico
 *   PUT  /api/administradores/:id                     — atualizar administrador
 *   DELETE /api/administradores/:id                   — apagar administrador
 *   PUT  /api/administradores/:id/perfis-permissoes   — gerir permissões de um utilizador
 */
import { Router } from 'express';
import { AdministradorController } from '../controller/administrador.controller.js';
import { autenticar, requirePerfil } from '../middleware/auth.middleware.js';
import { PerfilUtilizador } from '../enums/PerfilUtilizador.enum.js';

const routes = Router();
const controller = new AdministradorController();

// Requer autenticação JWT
routes.use(autenticar);
// APENAS administradores têm acesso a estas rotas
routes.use(requirePerfil(PerfilUtilizador.ADMINISTRADOR));

routes.get('/config/limiares-carat', controller.obterConfigLimiaresCarat.bind(controller));
routes.put('/config/limiares-carat', controller.configurarLimiaresCarat.bind(controller));
routes.post('/dados', controller.gestarDados.bind(controller));
routes.get('/', controller.listar.bind(controller));
routes.post('/', controller.criar.bind(controller));
routes.get('/:id', controller.obter.bind(controller));
routes.put('/:id', controller.atualizar.bind(controller));
routes.delete('/:id', controller.apagar.bind(controller));
routes.put('/:id/perfis-permissoes', controller.gestarPerfisPermissoes.bind(controller));

export default routes;
