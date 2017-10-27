const path = require('path'); // модуль для парсинга пути
const express = require('express');
const next = require('next');
const dev = process.env.NODE_ENV !== 'production';
const app = next({dev});
const handle = app.getRequestHandler();
const port = process.env.PORT || 9999;
var http = require('http');
const bodyParser = require('body-parser');
const appRouter = require('./routers/main');
const models = require("./models");

app.prepare().then(() => {
    const server = express();
    server.use(function (req, res, next) {
        res.header("Access-Control-Allow-Origin", "*");
        res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
        next();
    });

    // configure body parser
    server.use(bodyParser.json());
    server.use(bodyParser.urlencoded({
        extended: true
    }));

    // REGISTER OUR ROUTES
    let router = appRouter.init(express);
    server.use('/api', router);

    server.get('/users/:id', (req, res) => {
        const params = {id: req.params.id};
        return app.render(req, res, '/users/_id', params);
    });

    server.get('*', (req, res) => {
        return handle(req, res)
    });

    server.listen(port, (err) => {
        if (err) throw err
        console.log(`> Ready on http://localhost:${port}`)
    })
});

