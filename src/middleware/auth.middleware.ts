import type { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { PerfilUtilizador } from '../enums/PerfilUtilizador.enum.js';

export interface UtilizadorAutenticado {
    id: number;
    perfil: PerfilUtilizador;
}

const JWT_SECRET = process.env['JWT_SECRET'] ?? 'carat-dev-secret-change-me';

declare global {
    namespace Express {
        interface Request {
            utilizador?: UtilizadorAutenticado;
        }
    }
}

export function autenticar(req: Request, res: Response, next: NextFunction): void {
    const authHeader = req.headers['authorization'];

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        res.status(401).json({ erro: 'Token de autenticacao em falta' });
        return;
    }

    const token = authHeader.substring(7);

    try {
        const payload = jwt.verify(token, JWT_SECRET) as UtilizadorAutenticado;

        if (!payload.id || !payload.perfil) {
            throw new Error('Payload invalido');
        }

        req.utilizador = {
            id: payload.id,
            perfil: payload.perfil
        };
        next();
    } catch {
        res.status(401).json({ erro: 'Token invalido' });
    }
}

export function requirePerfil(...perfis: PerfilUtilizador[]) {
    return (req: Request, res: Response, next: NextFunction): void => {
        if (!req.utilizador) {
            res.status(401).json({ erro: 'Nao autenticado' });
            return;
        }
        if (!perfis.includes(req.utilizador.perfil)) {
            res.status(403).json({ erro: 'Acesso negado: permissoes insuficientes' });
            return;
        }
        next();
    };
}
