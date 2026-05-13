import { Router } from 'express';
import { AlertaController } from '../controller/alerta.controller';

const routes = Router();
const controller = new AlertaController();

routes.get('/utente/:utenteId', controller.listarPorUtente.bind(controller));
routes.get('/medico/:medicoId', controller.listarPorMedico.bind(controller));
routes.get('/', controller.listar.bind(controller));
routes.post('/', controller.criar.bind(controller));
routes.get('/:id', controller.obter.bind(controller));
routes.patch('/:id/estado', controller.atualizarEstado.bind(controller));
routes.delete('/:id', controller.apagar.bind(controller));

export default routes;
