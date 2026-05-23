import { Router } from 'express';
import { UtilizadorController } from '../controller/utilizador.controller.js';
import { autenticar, requirePerfil } from '../middleware/auth.middleware.js';
import { PerfilUtilizador } from '../enums/PerfilUtilizador.enum.js';

const routes = Router();
const controller = new UtilizadorController();

routes.use(autenticar);

// RNF001: apenas o Administrador pode gerir a lista global de utilizadores.
routes.get('/', requirePerfil(PerfilUtilizador.ADMINISTRADOR), controller.listar.bind(controller));
routes.post('/', requirePerfil(PerfilUtilizador.ADMINISTRADOR), controller.criar.bind(controller));

// RNF001: o Administrador consulta/altera todos; o proprio utilizador so consulta/altera o seu perfil.
routes.get('/:id', controller.obter.bind(controller));
routes.put('/:id', controller.atualizar.bind(controller));
routes.delete('/:id', requirePerfil(PerfilUtilizador.ADMINISTRADOR), controller.apagar.bind(controller));

export default routes;
