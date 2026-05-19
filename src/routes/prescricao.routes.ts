import { Router } from 'express';
import { PrescricaoController } from '../controller/prescricao.controller.js';

const routes = Router();
const controller = new PrescricaoController();

routes.get('/utente/:utenteId', controller.listarPorUtente.bind(controller));
routes.get('/medico/:medicoId', controller.listarPorMedico.bind(controller));
routes.get('/', controller.listar.bind(controller));
routes.post('/', controller.criar.bind(controller));
routes.get('/:id', controller.obter.bind(controller));
routes.put('/:id', controller.atualizar.bind(controller));

export default routes;
