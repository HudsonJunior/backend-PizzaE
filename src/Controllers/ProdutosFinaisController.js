/* Imports*/

const { objOf } = require('ramda');
const ProdutoFinalModel = require('../Models/ProdutoFinalModel');
const ProdutosFinaisService = require('../Services/ProdutosFinaisService');

/**/

module.exports = function (server) {
    server.post('/produtos-finais', function (req, res, next) {
        try {
            let data = req.body || {};

            let produtoModel;

            produtoModel = new ProdutoFinalModel(data);

            const produtoService = new ProdutosFinaisService();

            produtoService
                .create(produtoModel)
                .then((jsonSuccess) => {
                    const code = jsonSuccess.code;

                    delete jsonSuccess.code;

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

    server.patch('/produtos-finais', function (req, res, next) {
        try {
            let data = req.body || {};

            let produtoModel;

            produtoModel = new ProdutoFinalModel(data);

            const produtoService = new ProdutosFinaisService();

            produtoService
                .update(produtoModel)
                .then((jsonSuccess) => {
                    const code = jsonSuccess.code;

                    delete jsonSuccess.code;

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

    server.get('/produtos-finais', function (req, res, next) {
        try {
            let produtoModel = {};

            const produtoNome = req.params.nome || null;

            produtoModel.nome = produtoNome;

            const produtoService = new ProdutosFinaisService();

            produtoService
                .get(produtoModel)
                .then((jsonSuccess) => {
                    res.json(200, jsonSuccess);
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

    server.del('/produtos-finais', function (req, res, next) {
        try {
            let data = JSON.parse(req.body) || {};

            let produtoModel;

            if (data.tipo === 'Normal') {
                produtoModel = new ProdutoNormalModel(data);
            } else {
                produtoModel = new PizzaModel(data);
            }

            const produtoService = new ProdutosFinaisService(data.tipo);

            produtoService
                .delete(produtoModel)
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
