import { Router } from 'express';
import { UtenteController } from '../controller/utente.controller.js';

const routes = Router();
const controller = new UtenteController();

routes.get('/medico/:medicoId', controller.listarPorMedico.bind(controller));
routes.get('/', controller.listar.bind(controller));
routes.post('/', controller.criar.bind(controller));
routes.get('/:id', controller.obter.bind(controller));
routes.get('/:id/historico', controller.historicoClinico.bind(controller)); // RF031
routes.put('/:id', controller.atualizar.bind(controller));
routes.delete('/:id', controller.apagar.bind(controller));

export default routes;
