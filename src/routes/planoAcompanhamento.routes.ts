import { Router } from 'express';
import { PlanoAcompanhamentoController } from '../controller/planoAcompanhamento.controller.js';

const routes = Router();
const controller = new PlanoAcompanhamentoController();

routes.get('/utente/:utenteId', controller.listarPorUtente.bind(controller));
routes.get('/medico/:medicoId', controller.listarPorMedico.bind(controller));
routes.get('/', controller.listar.bind(controller));
routes.post('/', controller.criar.bind(controller));
routes.get('/:id', controller.obter.bind(controller));
routes.put('/:id', controller.atualizar.bind(controller));
routes.patch('/:id/estado', controller.atualizarEstado.bind(controller));
routes.delete('/:id', controller.apagar.bind(controller));

export default routes;
