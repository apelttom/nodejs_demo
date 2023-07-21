// Database-specific configurations like Host, Port & Name.

export function getRedisURL(): string {
    const port = process.env.DATABASE_PORT == null ? '6379' : process.env.DATABASE_PORT;
    const host = process.env.DATABASE_HOST == null ? 'localhost' : process.env.DATABASE_HOST;
    const username = process.env.DATABASE_USERNAME == null ? '' : process.env.DATABASE_USERNAME;
    const password = process.env.DATABASE_PASSWORD == null ? '' : process.env.DATABASE_PASSWORD;
    const base = process.env.DATABASE_BASE == null ? '' : process.env.DATABASE_BASE;
    const credentials = username.length > 0 ? `${username}:${encodeURI(password)}@` : '';
    const url = `${base}://${credentials}${host}:${port}`;

    return url;
}
