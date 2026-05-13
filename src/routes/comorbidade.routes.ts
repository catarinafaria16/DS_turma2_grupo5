import { Router } from 'express';
import { ComorbidadeController } from '../controller/comorbidade.controller';

const routes = Router();
const controller = new ComorbidadeController();

routes.get('/anamnese/:anamneseId', controller.listarPorAnamnese.bind(controller));
routes.get('/', controller.listar.bind(controller));
routes.post('/', controller.criar.bind(controller));
routes.get('/:id', controller.obter.bind(controller));
routes.put('/:id', controller.atualizar.bind(controller));
routes.delete('/:id', controller.apagar.bind(controller));

export default routes;
