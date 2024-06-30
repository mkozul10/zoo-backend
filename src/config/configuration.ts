export default () => ({
    database: {
        host: process.env.DATABASE_HOST,
        port: parseInt(process.env.DATABASE_PORT, 10) || 3000,
        username: process.env.DATABASE_USERNAME,
        password: process.env.DATABASE_PASSWORD,
        name: process.env.DATABASE_NAME,
        exec_migrations: process.env.DATABASE_EXEC_MIGRATIONS
    },
    common: {
        access_token_secret: process.env.ACCESS_TOKEN_SECRET,
        refresh_token_secret: process.env.REFRESH_TOKEN_SECRET,
        allowed_origins: process.env.ALLOWED_ORIGINS,
        disable_refresh_token: process.env.DISABLE_REFRESH_TOKEN === 'true'
    }
});