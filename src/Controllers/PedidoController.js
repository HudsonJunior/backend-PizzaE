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
                    const code = jsonSuccess.code;

                    delete jsonSucess.code;

                    res.json(code, jsonSuccess);
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
            const pedidoService = new PedidoService();

            let dataPedido = req.query.data;

            pedidoService
                .get(dataPedido)
                .then((jsonSuccess) => {
                    const code = jsonSuccess.code;

                    delete jsonSucess.code;

                    res.json(code, jsonSuccess);
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
