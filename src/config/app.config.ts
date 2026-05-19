import 'dotenv/config';

if (!process.env.JWT_SECRET) {
    throw new Error('JWT_SECRET não está definido no ficheiro .env');
}

export const appConfig = {
    auth: {
        jwtSecret: process.env.JWT_SECRET,
        jwtExpiresIn: process.env.JWT_EXPIRES_IN ?? '8h',
    },
};
