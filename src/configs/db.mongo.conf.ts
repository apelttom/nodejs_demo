// Database-specific configurations like Host, Port & Name.

export function getMongoURL(): string {
    const port = process.env.DATABASE_PORT == null ? '' : process.env.DATABASE_PORT;
    const server = process.env.DATABASE_HOST == null ? 'localhost' : process.env.DATABASE_HOST;
    const username = process.env.DATABASE_USERNAME == null ? '' : process.env.DATABASE_USERNAME;
    const password = process.env.DATABASE_PASSWORD == null ? '' : process.env.DATABASE_PASSWORD;
    const environment = process.env.DATABASE_ENVIRONMENT == null ? 'local' : process.env.DATABASE_ENVIRONMENT;
    const credentials = username.length > 0 ? `${username}:${encodeURI(password)}@` : '';
    const host = environment === 'cloud' ? `${server}` : `${server}:${port}`;
    const base = environment === 'cloud' ? 'mongodb+srv' : 'mongodb';
    const end = environment === 'cloud' ? '?retryWrites=true&w=majority' : '';
    const url = `${base}://${credentials}${host}/${end}`;

    return url;
}
