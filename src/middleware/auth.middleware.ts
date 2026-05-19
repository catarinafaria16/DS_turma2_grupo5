import type { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { appConfig } from '../config/app.config.js';
import { PerfilUtilizador } from '../enums/PerfilUtilizador.enum.js';

export interface UtilizadorAutenticado {
    id: number;
    email: string;
    perfil: PerfilUtilizador;
}

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
        res.status(401).json({ erro: 'Token de autenticação em falta' });
        return;
    }

    const token = authHeader.substring(7);

    try {
        const payload = jwt.verify(token, appConfig.auth.jwtSecret) as UtilizadorAutenticado;

        if (!payload.id || !payload.perfil) {
            throw new Error('Payload inválido');
        }

        req.utilizador = payload;
        next();
    } catch (err) {
        if (err instanceof jwt.TokenExpiredError) {
            res.status(401).json({ erro: 'Token expirado' });
            return;
        }
        res.status(401).json({ erro: 'Token inválido' });
    }
}

export function requirePerfil(...perfis: PerfilUtilizador[]) {
    return (req: Request, res: Response, next: NextFunction): void => {
        if (!req.utilizador) {
            res.status(401).json({ erro: 'Não autenticado' });
            return;
        }
        if (!perfis.includes(req.utilizador.perfil)) {
            res.status(403).json({ erro: 'Acesso negado: permissões insuficientes' });
            return;
        }
        next();
    };
}
