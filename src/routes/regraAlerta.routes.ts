import { Router } from 'express';
import { RegraAlertaController } from '../controller/regraAlerta.controller.js';

const routes = Router();
const controller = new RegraAlertaController();

routes.get('/medico/:medicoId', controller.listarPorMedico.bind(controller));
routes.get('/', controller.listar.bind(controller));
routes.post('/', controller.criar.bind(controller));
routes.get('/:id', controller.obter.bind(controller));
routes.put('/:id', controller.atualizar.bind(controller));
routes.delete('/:id', controller.apagar.bind(controller));

export default routes;
