/* Imports*/

const PedidoModel = require('../Models/PedidoModel.js');
const PedidoService = require('../Services/PedidoService.js');
/**/

module.exports = function (server) {
    server.post('/pedido', function (req, res, next) {
        try {
            let data = req.body || {};

            let pedidoModel = new PedidoModel(data);

            const pedidoService = new PedidoService();

            pedidoService
                .create(pedidoModel)
                .then((jsonSuccess) => {
                    res.json(201, jsonSuccess);
                    next();
                })
                .catch((jsonError) => {
                    const code = jsonError.code;

                    delete jsonError.code;

                    res.json(code, jsonError);
                    next();
                });
        } catch (error) {
            console.log(error);
        }
    });

    server.get('/pedido', function (req, res, next) {
        try {
            let pedidoModel = {};

            let dataPedido = req.params.data || null;

            let cpf = req.params.cpfCliente || null;

            pedidoModel.data = dataPedido;

            pedidoModel.clientCpf = cpf;

            const pedidoService = new PedidoService();

            pedidoService
                .get(pedidoModel)
                .then((jsonSuccess) => {
                    res.json(201, jsonSuccess);
                    next();
                })
                .catch((jsonError) => {
                    const code = jsonError.code;

                    delete jsonError.code;

                    res.json(code, jsonError);
                    next();
                });
        } catch (error) {
            console.log(error);
        }
    });
};
