import { Router } from 'express';
import { UtenteController } from '../controller/utente.controller.js';
import { autenticar, requirePerfil } from '../middleware/auth.middleware.js';
import { PerfilUtilizador } from '../enums/PerfilUtilizador.enum.js';

const routes = Router();
const controller = new UtenteController();

routes.use(autenticar);

// RNF001: Administrador e Medico podem consultar listas de utentes.
routes.get('/medico/:medicoId', requirePerfil(PerfilUtilizador.ADMINISTRADOR, PerfilUtilizador.MEDICO), controller.listarPorMedico.bind(controller));
routes.get('/', requirePerfil(PerfilUtilizador.ADMINISTRADOR, PerfilUtilizador.MEDICO, PerfilUtilizador.UTENTE), controller.listar.bind(controller));

// RNF001/RNF004: criacao de utente validada no servico.
routes.post('/', requirePerfil(PerfilUtilizador.ADMINISTRADOR, PerfilUtilizador.MEDICO), controller.criar.bind(controller));

// RNF001: acesso ao detalhe depende do perfil e da associacao ao utente.
routes.get('/:id', controller.obter.bind(controller));
routes.get('/:id/historico', controller.historicoClinico.bind(controller));
routes.put('/:id', controller.atualizar.bind(controller));
routes.delete('/:id', requirePerfil(PerfilUtilizador.ADMINISTRADOR, PerfilUtilizador.MEDICO), controller.apagar.bind(controller));

export default routes;
