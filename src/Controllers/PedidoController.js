/* Imports*/

const PedidoModel = require('../Models/PedidoModel.js');
const PedidoService = require('../Services/PedidoService.js');
/**/

module.exports = function (server) {

    server.post('/pedido', function (req, res, next) {
        try {
            let data = req.body || {};

            let pedidoModel = new PedidoModel(data);

            console.log('pedido model', pedidoModel)

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

    server.get('/pedido/data', function (req, res, next) {
        try {
            let dataPedido = req.params.data || null;

            const pedidoService = new PedidoService();

            pedidoService
                .getListFromDate(dataPedido)
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

    server.get('/pedido/cpf', function (req, res, next) {
        try {
            let cpf = req.params.cpfCliente || null;

            const pedidoService = new PedidoService();

            pedidoService
                .getListFromClient(cpf)
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

    server.get('/pedido/datas', function (req, res, next) {
        try {
            let dataInicio = req.params.dataI || null;
            let dataFinal = req.params.dataF || null;

            const pedidoService = new PedidoService();

            pedidoService
                .getListReportFromDate(dataInicio, dataFinal)
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

    server.get('/pedido/produto', function (req, res, next) {
        try {
            let nomeProduto = req.params.nomeProduto || null;

            const pedidoService = new PedidoService();

            pedidoService
                .getListFromProduct(nomeProduto)
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

    server.patch('/pedido', function (req, res, next) {
        try {
            console.log('entrou')
            let data = req.body || {}

            let pedidoModel;

            pedidoModel = new PedidoModel(data);

            const pedidoService = new PedidoService();

            pedidoService.update(pedidoModel)
                .then(jsonSuccess => {
                    const code = jsonSuccess.code
                    console.log('diasjdsadsa')
                    delete jsonSuccess.code

                    res.json(code, jsonSuccess)
                    next()
                })
                .catch(jsonError => {
                    const code = jsonError.code
                    console.log('cuuuuuu')

                    delete jsonError.code

                    res.json(code, jsonError)
                    next()
                })
        }
        catch (error) {
            console.log(error)
        }
    })
};
