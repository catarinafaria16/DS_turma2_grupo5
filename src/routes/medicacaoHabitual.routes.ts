import { Router } from 'express';
import { MedicacaoHabitualController } from '../controller/medicacaoHabitual.controller.js';

const routes = Router();
const controller = new MedicacaoHabitualController();

routes.get('/anamnese/:anamneseId', controller.listarPorAnamnese.bind(controller));
routes.get('/', controller.listar.bind(controller));
routes.post('/', controller.criar.bind(controller));
routes.get('/:id', controller.obter.bind(controller));
routes.put('/:id', controller.atualizar.bind(controller));


export default routes;
