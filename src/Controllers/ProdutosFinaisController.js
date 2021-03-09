/* Imports*/

const ProdutoNormalModel = require('../Models/ProdutoNormalModel')
const PizzaModel = require('../Models/PizzaModel')
const ProdutosFinaisService = require('../Services/ProdutosFinaisService')

/**/

module.exports = function (server) {
    server.post('/produtos-finais', function (req, res, next) {

        try {
            let data = JSON.parse(req.body) || {}

            let produtoModel;

            if (data.tipo === "Normal") {
                produtoModel = new ProdutoNormalModel(data);
            }
            else {
                produtoModel = new PizzaModel(data);
            }

            const produtoService = new ProdutosFinaisService(data.tipo);

            produtoService.create(produtoModel)
                .then(jsonSuccess => {
                    const code = jsonSuccess.code

                    delete jsonSucess.code

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

    server.put('/produtos-finais', function (req, res, next) {
        try {
            let data = JSON.parse(req.body) || {}

            let produtoModel;

            if (data.tipo === "Normal") {
                produtoModel = new ProdutoNormalModel(data);
            }
            else {
                produtoModel = new PizzaModel(data);
            }

            const produtoService = new ProdutosFinaisService(data.tipo);

            produtoService.update(produtoModel)
                .then(jsonSuccess => {
                    const code = jsonSuccess.code

                    delete jsonSucess.code

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

    server.del('/produtos-finais', function (req, res, next) {

        try {
            let data = JSON.parse(req.body) || {}

            let produtoModel;

            if (data.tipo === "Normal") {
                produtoModel = new ProdutoNormalModel(data);
            }
            else {
                produtoModel = new PizzaModel(data);
            }

            const produtoService = new ProdutosFinaisService(data.tipo);

            produtoService.delete(produtoModel)
                .then(jsonSuccess => {
                    const code = jsonSuccess.code

                    delete jsonSucess.code

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
}