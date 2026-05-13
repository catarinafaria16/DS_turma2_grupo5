import { Router } from 'express';
import { RespostaCaratController } from '../controller/respostaCarat.controller.js';

const routes = Router();
const controller = new RespostaCaratController();

routes.get('/avaliacao/:avaliacaoId', controller.listarPorAvaliacao.bind(controller));
routes.get('/utente/:utenteId', controller.listarPorUtente.bind(controller));
routes.get('/', controller.listar.bind(controller));
routes.post('/', controller.criar.bind(controller));
routes.get('/:id', controller.obter.bind(controller));
routes.put('/:id', controller.atualizar.bind(controller));
routes.delete('/:id', controller.apagar.bind(controller));

export default routes;
