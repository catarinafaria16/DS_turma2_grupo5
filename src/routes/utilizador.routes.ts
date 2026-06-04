/*
 * ============================================================
 * utilizador.routes.ts — Rotas da API para utilizadores
 * ============================================================
 *
 * URL base: /api/utilizadores
 *
 * Nota: O registo público (criar conta de utente sem autenticação) está
 * definido diretamente em app.ts como POST /api/registar.
 *
 * Rotas disponíveis:
 *   GET    /api/utilizadores       — listar todos (apenas admin)
 *   POST   /api/utilizadores       — criar utilizador (apenas admin)
 *   GET    /api/utilizadores/:id   — obter dados (admin vê todos, outros só si próprios)
 *   PUT    /api/utilizadores/:id   — atualizar (admin: tudo; outros: só email/password)
 *   DELETE /api/utilizadores/:id   — apagar (apenas admin)
 */
import { Router } from 'express';
import { UtilizadorController } from '../controller/utilizador.controller.js';
import { autenticar, requirePerfil } from '../middleware/auth.middleware.js';
import { PerfilUtilizador } from '../enums/PerfilUtilizador.enum.js';

const routes = Router();
const controller = new UtilizadorController();

// Todas as rotas requerem autenticação JWT
routes.use(autenticar);

// RNF001: apenas o Administrador pode gerir a lista global de utilizadores.
routes.get('/', requirePerfil(PerfilUtilizador.ADMINISTRADOR), controller.listar.bind(controller));
routes.post('/', requirePerfil(PerfilUtilizador.ADMINISTRADOR), controller.criar.bind(controller));

// RNF001: o Administrador consulta/altera todos; o proprio utilizador so consulta/altera o seu perfil.
routes.get('/:id', controller.obter.bind(controller));
routes.put('/:id', controller.atualizar.bind(controller));
routes.delete('/:id', requirePerfil(PerfilUtilizador.ADMINISTRADOR), controller.apagar.bind(controller));

export default routes;
