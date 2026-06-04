/*
 * ============================================================
 * app.config.ts — Configurações globais da aplicação
 * ============================================================
 *
 * Este ficheiro carrega e valida as configurações sensíveis da aplicação,
 * como a chave secreta usada para assinar os tokens de autenticação.
 *
 * As configurações sensíveis (como passwords e chaves secretas) NÃO devem
 * estar escritas diretamente no código — em vez disso, são guardadas no
 * ficheiro ".env" que nunca é partilhado publicamente.
 */

// Carrega as variáveis de ambiente do ficheiro ".env" para o processo Node.js
import 'dotenv/config';

// Verificação de segurança: se a chave JWT não estiver definida, o servidor
// recusa arrancar, pois sem esta chave não é possível autenticar utilizadores.
if (!process.env.JWT_SECRET) {
    throw new Error('JWT_SECRET não está definido no ficheiro .env');
}

// Objeto de configuração exportado para ser usado noutros módulos.
// Centraliza aqui todas as configurações para facilitar manutenção.
export const appConfig = {
    auth: {
        // Chave secreta para assinar/verificar tokens JWT (lida do ficheiro .env)
        jwtSecret: process.env.JWT_SECRET,
        // Tempo de validade do token: por defeito 8 horas; pode ser alterado no .env
        jwtExpiresIn: process.env.JWT_EXPIRES_IN ?? '8h',
    },
};
