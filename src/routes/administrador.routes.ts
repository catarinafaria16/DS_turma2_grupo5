import { Router } from 'express';
import { AdministradorController } from '../controller/administrador.controller.js';
import { autenticar, requirePerfil } from '../middleware/auth.middleware.js';
import { PerfilUtilizador } from '../enums/PerfilUtilizador.enum.js';

const routes = Router();
const controller = new AdministradorController();

routes.use(autenticar);
routes.use(requirePerfil(PerfilUtilizador.ADMINISTRADOR));

routes.get('/config/limiares-carat', controller.obterConfigLimiaresCarat.bind(controller));
routes.put('/config/limiares-carat', controller.configurarLimiaresCarat.bind(controller));
routes.post('/dados', controller.gestarDados.bind(controller));
routes.get('/', controller.listar.bind(controller));
routes.post('/', controller.criar.bind(controller));
routes.get('/:id', controller.obter.bind(controller));
routes.put('/:id', controller.atualizar.bind(controller));
routes.delete('/:id', controller.apagar.bind(controller));
routes.put('/:id/perfis-permissoes', controller.gestarPerfisPermissoes.bind(controller));

export default routes;
