/*
 * ============================================================
 * auth.middleware.ts — Middleware de autenticação e autorização
 * ============================================================
 *
 * Este ficheiro contém o "porteiro" da aplicação. Antes de qualquer pedido
 * chegar ao seu destino (controller), este código verifica:
 *   1. Se o utilizador tem um token de autenticação válido (autenticar)
 *   2. Se o utilizador tem o perfil certo para aceder ao recurso (requirePerfil)
 *
 * O token JWT (JSON Web Token) funciona como um "crachá digital":
 *   - É emitido no login e contém o ID e perfil do utilizador
 *   - É enviado em cada pedido no cabeçalho "Authorization"
 *   - O servidor verifica se é autêntico antes de processar o pedido
 *
 * "Middleware" é um termo técnico para código que corre ENTRE o pedido
 * do cliente e a resposta do servidor — como uma portagem numa autoestrada.
 */

// Tipos do Express para os objetos de pedido, resposta e próxima função
import type { Request, Response, NextFunction } from 'express';
// Biblioteca para verificar tokens JWT
import jwt from 'jsonwebtoken';
// Enum com os tipos de perfil de utilizador (ADMIN, MEDICO, UTENTE)
import { PerfilUtilizador } from '../enums/PerfilUtilizador.enum.js';

// Define a estrutura dos dados do utilizador autenticado que ficam guardados no pedido
// Após a autenticação, qualquer parte do código pode aceder a req.utilizador para saber quem está a fazer o pedido
export interface UtilizadorAutenticado {
    id: number;             // ID único do utilizador na base de dados
    perfil: PerfilUtilizador; // Tipo de utilizador: ADMIN, MEDICO ou UTENTE
}

// Chave secreta para verificar a assinatura dos tokens JWT
const JWT_SECRET = process.env['JWT_SECRET'] ?? 'carat-dev-secret-change-me';

// Extensão do tipo Request do Express para incluir o campo "utilizador"
// Isto permite que qualquer controller aceda a req.utilizador após autenticação
declare global {
    namespace Express {
        interface Request {
            utilizador?: UtilizadorAutenticado; // Dados do utilizador autenticado (opcional — não existe antes do login)
        }
    }
}

/*
 * autenticar — Middleware que verifica se o utilizador tem um token válido
 *
 * Este middleware deve ser aplicado a todas as rotas que requerem login.
 * Funciona assim:
 *   1. Lê o cabeçalho "Authorization" do pedido HTTP
 *   2. Extrai o token JWT (que começa com "Bearer ")
 *   3. Verifica se o token é válido e não expirou
 *   4. Se válido, guarda os dados do utilizador em req.utilizador e passa para o próximo passo
 *   5. Se inválido, devolve erro 401 (Não autorizado)
 */
export function autenticar(req: Request, res: Response, next: NextFunction): void {
    // Lê o cabeçalho de autorização do pedido
    const authHeader = req.headers['authorization'];

    // Verifica se o cabeçalho existe e tem o formato correto ("Bearer <token>")
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        res.status(401).json({ erro: 'Token de autenticacao em falta' });
        return;
    }

    // Remove o prefixo "Bearer " para obter apenas o token
    const token = authHeader.substring(7);

    try {
        // Verifica a assinatura do token e descodifica os seus dados
        // Se o token for falso ou tiver expirado, jwt.verify lança uma exceção
        const payload = jwt.verify(token, JWT_SECRET) as UtilizadorAutenticado;

        // Validação adicional: o token deve conter ID e perfil
        if (!payload.id || !payload.perfil) {
            throw new Error('Payload invalido');
        }

        // Guarda os dados do utilizador no pedido para uso nas rotas seguintes
        req.utilizador = {
            id: payload.id,
            perfil: payload.perfil
        };
        // Passa o controlo para o próximo middleware ou controller
        next();
    } catch {
        // Token inválido, expirado, ou mal formado
        res.status(401).json({ erro: 'Token invalido' });
    }
}

/*
 * requirePerfil — Middleware que verifica se o utilizador tem o perfil correto
 *
 * Usado APÓS autenticar(), este middleware verifica se o utilizador tem
 * permissão para aceder a um determinado recurso com base no seu perfil.
 *
 * Exemplo de uso:
 *   router.get('/admin', autenticar, requirePerfil(PerfilUtilizador.ADMIN), controller)
 *   // Só administradores podem aceder
 *
 * Recebe uma lista de perfis permitidos e devolve uma função middleware.
 */
export function requirePerfil(...perfis: PerfilUtilizador[]) {
    return (req: Request, res: Response, next: NextFunction): void => {
        // Verifica se o utilizador está autenticado (autenticar() deve ter corrido antes)
        if (!req.utilizador) {
            res.status(401).json({ erro: 'Nao autenticado' });
            return;
        }
        // Verifica se o perfil do utilizador está na lista de perfis permitidos
        if (!perfis.includes(req.utilizador.perfil)) {
            // Erro 403 (Proibido): o utilizador está autenticado mas não tem permissão
            res.status(403).json({ erro: 'Acesso negado: permissoes insuficientes' });
            return;
        }
        // Utilizador tem permissão — passa para o próximo passo
        next();
    };
}
