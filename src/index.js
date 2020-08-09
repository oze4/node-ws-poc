const server = require('./server');

const DEFAULT_APP_PORT = 3333;
const port = process.env.PORT || DEFAULT_APP_PORT;

server.listen(port, () => {
    console.log(`Server listening on port: '${port}'`);
});
