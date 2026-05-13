import { Router } from 'express';
import { AlertaController } from '../controller/alerta.controller.js';

const routes = Router();
const controller = new AlertaController();

routes.get('/utente/:utenteId', controller.listarPorUtente.bind(controller));
routes.get('/medico/:medicoId', controller.listarPorMedico.bind(controller));
routes.get('/estado/:estado', controller.listarPorEstado.bind(controller));
routes.get('/', controller.listar.bind(controller));
routes.post('/', controller.criar.bind(controller));
routes.get('/:id', controller.obter.bind(controller));
routes.put('/:id', controller.atualizar.bind(controller));
routes.patch('/:id/lido', controller.marcarComoLido.bind(controller));
routes.patch('/:id/resolvido', controller.marcarComoResolvido.bind(controller));
routes.delete('/:id', controller.apagar.bind(controller));

export default routes;
