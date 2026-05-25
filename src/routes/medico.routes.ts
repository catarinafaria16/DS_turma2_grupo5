import { Router } from 'express';
import { MedicoController } from '../controller/medico.controller.js';
import { autenticar, requirePerfil } from '../middleware/auth.middleware.js';
import { PerfilUtilizador } from '../enums/PerfilUtilizador.enum.js';

const routes = Router();
const controller = new MedicoController();

routes.use(autenticar);

// RNF001: Administrador pode listar todos os medicos. Medico ve apenas o proprio perfil.
routes.get('/', requirePerfil(PerfilUtilizador.ADMINISTRADOR, PerfilUtilizador.MEDICO), controller.listar.bind(controller));

// RNF001: pesquisa por especialidade permitida a administrador e devolve apenas o proprio medico quando o perfil e MEDICO.
routes.get(
    '/especialidade/:especialidade',
    requirePerfil(PerfilUtilizador.ADMINISTRADOR, PerfilUtilizador.MEDICO),
    controller.listarPorEspecialidade.bind(controller)
);

// RNF001/RNF004: criacao e eliminacao do perfil medico ficam reservadas ao administrador.
routes.post('/', requirePerfil(PerfilUtilizador.ADMINISTRADOR), controller.criar.bind(controller));
routes.delete('/:id', requirePerfil(PerfilUtilizador.ADMINISTRADOR), controller.apagar.bind(controller));

// RNF001: o detalhe e a atualizacao dependem do medico autenticado ou de administrador.
routes.get('/:id', requirePerfil(PerfilUtilizador.ADMINISTRADOR, PerfilUtilizador.MEDICO), controller.obter.bind(controller));
routes.put('/:id', requirePerfil(PerfilUtilizador.ADMINISTRADOR, PerfilUtilizador.MEDICO), controller.atualizar.bind(controller));

export default routes;
