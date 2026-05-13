import { Router } from 'express';
import { AuditoriaController } from '../controller/auditoria.controller.js';

const routes = Router();
const controller = new AuditoriaController();

routes.get('/utilizador/:utilizadorId', controller.listarPorUtilizador.bind(controller));
routes.get('/tabela/:tabela/:tabelaId', controller.listarHistorico.bind(controller));
routes.get('/', controller.listar.bind(controller));
routes.get('/:id', controller.obter.bind(controller));
routes.get('/:id/diferencas', controller.obterDiferencas.bind(controller));

export default routes;
