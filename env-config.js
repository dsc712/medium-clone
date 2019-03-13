require('dotenv').config();
[
    'API_HOST',
    'APP_NAME',
    'SOCKET_ENDPOINT'
].forEach(name => {
    exports[`process.env.${name}`] = process.env[name];
});
