// ######## WHOLE APPLICATION STARTS HERE ############
import app from './app';

const environment = process.env.NODE_ENV == null ? 'development' : process.env.NODE_ENV;
const port = process.env.PORT == null ? '3333' : process.env.PORT;
const host = process.env.HOST == null ? 'localhost' : process.env.HOST;

app.listen(port, () => {
    if (environment === 'development') {
        console.log(`⚡️[Node.JS]: Server is running at http://${host}:${port}`);
    }
});
