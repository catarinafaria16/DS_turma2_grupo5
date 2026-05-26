import { Router } from 'express';
import { PrescricaoController } from '../controller/prescricao.controller.js';
import { autenticar, requirePerfil } from '../middleware/auth.middleware.js';
import { PerfilUtilizador } from '../enums/PerfilUtilizador.enum.js';

const routes = Router();
const controller = new PrescricaoController();

routes.use(autenticar);

routes.get('/utente/:utenteId', requirePerfil(PerfilUtilizador.UTENTE, PerfilUtilizador.MEDICO, PerfilUtilizador.ADMINISTRADOR), controller.listarPorUtente.bind(controller));
routes.get('/medico/:medicoId', requirePerfil(PerfilUtilizador.MEDICO, PerfilUtilizador.ADMINISTRADOR), controller.listarPorMedico.bind(controller));
routes.get('/', requirePerfil(PerfilUtilizador.UTENTE, PerfilUtilizador.MEDICO, PerfilUtilizador.ADMINISTRADOR), controller.listar.bind(controller));
routes.post('/', requirePerfil(PerfilUtilizador.MEDICO, PerfilUtilizador.ADMINISTRADOR), controller.criar.bind(controller));
routes.get('/:id', requirePerfil(PerfilUtilizador.UTENTE, PerfilUtilizador.MEDICO, PerfilUtilizador.ADMINISTRADOR), controller.obter.bind(controller));
routes.put('/:id', requirePerfil(PerfilUtilizador.MEDICO, PerfilUtilizador.ADMINISTRADOR), controller.atualizar.bind(controller));

export default routes;
