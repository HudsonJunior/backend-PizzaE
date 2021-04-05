/*** Module Dependencies*/

const config = require("../config");
const restify = require("restify");
var mongoose = require("./Connection/connectionMongo");
var corsMiddleware = require('restify-cors-middleware');

var cors = corsMiddleware({
    preflightMaxAge: 5,
    origins: ['*'],
    allowHeaders: ['X-App-Version'],
    exposeHeaders: []
});
/****/

const serverOptions = {
    name: config.name,
    version: config.version,
};

const server = restify.createServer(serverOptions);

server.use(restify.plugins.acceptParser(server.acceptable));
server.use(restify.plugins.queryParser({ mapParams: true }));
server.use(restify.plugins.fullResponse());
server.use(restify.plugins.jsonp());
server.use(restify.plugins.gzipResponse());
server.use(restify.plugins.bodyParser());
server.pre(cors.preflight);
server.use(cors.actual);

server.listen(config.port, () => {
    require("./Routes")(server);
    console.log(`Server listening on port ${config.port}`);
});
