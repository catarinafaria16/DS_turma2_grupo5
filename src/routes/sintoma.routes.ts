import { Router } from 'express';
import { SintomaController } from '../controller/sintoma.controller.js';

const routes = Router();
const controller = new SintomaController();

routes.get('/utente/:utenteId', controller.listarPorUtente.bind(controller));
routes.get('/', controller.listar.bind(controller));
routes.post('/', controller.criar.bind(controller));
routes.get('/:id', controller.obter.bind(controller));
routes.put('/:id', controller.atualizar.bind(controller));
routes.delete('/:id', controller.apagar.bind(controller));

export default routes;
