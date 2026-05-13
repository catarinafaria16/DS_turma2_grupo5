import { Router } from 'express';
import { MedicoController } from '../controller/medico.controller';

const routes = Router();
const controller = new MedicoController();

routes.get('/', controller.listar.bind(controller));
routes.post('/', controller.criar.bind(controller));
routes.get('/:id', controller.obter.bind(controller));
routes.put('/:id', controller.atualizar.bind(controller));
routes.delete('/:id', controller.apagar.bind(controller));

export default routes;
