import { Router } from 'express';
import { SintomaController } from '../controller/sintoma.controller.js';
import { autenticar, requirePerfil } from '../middleware/auth.middleware.js';
import { PerfilUtilizador } from '../enums/PerfilUtilizador.enum.js';

const routes = Router();
const controller = new SintomaController();

routes.use(autenticar);
routes.use(requirePerfil(PerfilUtilizador.UTENTE, PerfilUtilizador.MEDICO, PerfilUtilizador.ADMINISTRADOR));

routes.get('/utente/:utenteId', controller.listarPorUtente.bind(controller));
routes.get('/', controller.listar.bind(controller));
routes.post('/', controller.criar.bind(controller));
routes.get('/:id', controller.obter.bind(controller));
routes.put('/:id', controller.atualizar.bind(controller));

export default routes;
