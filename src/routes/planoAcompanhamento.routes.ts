import { Router } from 'express';
import { PlanoAcompanhamentoController } from '../controller/planoAcompanhamento.controller.js';
import { autenticar, requirePerfil } from '../middleware/auth.middleware.js';
import { PerfilUtilizador } from '../enums/PerfilUtilizador.enum.js';

const routes = Router();
const controller = new PlanoAcompanhamentoController();

routes.use(autenticar);
routes.use(requirePerfil(PerfilUtilizador.MEDICO, PerfilUtilizador.ADMINISTRADOR));

routes.get('/utente/:utenteId', controller.listarPorUtente.bind(controller));
routes.get('/medico/:medicoId', controller.listarPorMedico.bind(controller));
routes.get('/', controller.listar.bind(controller));
routes.post('/', controller.criar.bind(controller));
routes.get('/:id', controller.obter.bind(controller));
routes.put('/:id', controller.atualizar.bind(controller));
routes.patch('/:id/estado', controller.atualizarEstado.bind(controller));


export default routes;
