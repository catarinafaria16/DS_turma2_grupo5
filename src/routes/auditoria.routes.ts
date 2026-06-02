import { Router } from 'express';
import { AuditoriaController } from '../controller/auditoria.controller.js';
import { autenticar, requirePerfil } from '../middleware/auth.middleware.js';
import { PerfilUtilizador } from '../enums/PerfilUtilizador.enum.js';

const routes = Router();
const controller = new AuditoriaController();

routes.use(autenticar);
routes.use(requirePerfil(PerfilUtilizador.ADMINISTRADOR));

routes.get('/utilizador/:utilizadorId', controller.listarPorUtilizador.bind(controller));
routes.get('/tabela/:tabela/:tabelaId', controller.listarHistorico.bind(controller));
routes.get('/', controller.listar.bind(controller));
routes.get('/:id', controller.obter.bind(controller));
routes.get('/:id/diferencas', controller.obterDiferencas.bind(controller));
routes.delete('/:id', controller.apagar.bind(controller));

export default routes;
