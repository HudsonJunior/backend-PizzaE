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
            let dataPedido = req.params.data || null;

            let cpf = req.params.cpfCliente || null;

            let dataInicio = req.params.dataI || null;
            let dataFinal = req.params.dataF || null;

            let nomeProduto = req.params.nomeProduto || null;

            const pedidoService = new PedidoService();

            if (dataPedido) {
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
            } else if (cpf) {
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
            } else if (dataInicio && dataFinal) {
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
            } else if (nomeProduto) {
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
            }
        } catch (error) {
            console.log(error);
        }
    });

    server.patch('/pedido', function (req, res, next) {
        try {
            let data = req.body || {}

            let cancelar = req.params.cancelar || null

            let pedidoModel;

            pedidoModel = new PedidoModel(data);

            pedidoModel.cancelar = cancelar

            const pedidoService = new PedidoService();

            pedidoService.update(pedidoModel)
                .then(jsonSuccess => {
                    const code = jsonSuccess.code

                    delete jsonSuccess.code

                    res.json(code, jsonSuccess)
                    next()
                })
                .catch(jsonError => {
                    const code = jsonError.code

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
