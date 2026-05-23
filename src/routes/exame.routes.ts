import { Router } from 'express';
import { ExameController } from '../controller/exame.controller.js';
import { autenticar, requirePerfil } from '../middleware/auth.middleware.js';
import { PerfilUtilizador } from '../enums/PerfilUtilizador.enum.js';

const routes = Router();
const controller = new ExameController();

routes.use(autenticar);
routes.use(requirePerfil(PerfilUtilizador.MEDICO, PerfilUtilizador.ADMINISTRADOR));

routes.get('/prescricao/:prescricaoId', controller.listarPorPrescricao.bind(controller));
routes.get('/', controller.listar.bind(controller));
routes.post('/', controller.criar.bind(controller));
routes.get('/:id', controller.obter.bind(controller));
routes.put('/:id', controller.atualizar.bind(controller));


export default routes;
