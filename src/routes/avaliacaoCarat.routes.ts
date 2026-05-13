import { Router } from 'express';
import { AvaliacaoCaratController } from '../controller/avaliacaoCarat.controller.js';

const routes = Router();
const controller = new AvaliacaoCaratController();

routes.get('/', controller.listar.bind(controller));
routes.post('/', controller.criar.bind(controller));
routes.get('/:id', controller.obter.bind(controller));
routes.put('/:id', controller.atualizar.bind(controller));
routes.delete('/:id', controller.apagar.bind(controller));

export default routes;
