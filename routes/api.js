const cors     = require('cors'),
    bodyParser = require('body-parser'),
    config     = require('../configs');

require('../app/models');
const app = require('express').Router();
app.use(cors({
    exposedHeaders: ['x-warning']
}));
app.use( bodyParser.json() );
bodyParser.urlencoded({ extended: true });
const controller = path => require('../app/controllers/' + path);

// requiring controller
const test = controller('testController');
const registration = controller('auth/registerController');
const login = controller('auth/loginController');

// routes without authentication
// auth routes
app.post('/register', registration.register );
app.post('/login', login.login );

app.use(require('../app/middlewares/authentication')(config.app.key));

// routes requiring authentication token
app.get('/test', test.index );
app.post('/test', test.create );

app.all('*', (req, res) => {
    res.status(404).send({ message: 'The route you are looking is not found.' });
});

module.exports = app;