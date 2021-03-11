/* Imports*/

const ProdutoEstoqueModel = require('../Models/ProdutoEstoqueModel')
const ProdutosEstoqueService = require('../Services/ProdutosEstoqueService')

/**/

module.exports = function (server) {

    server.post('/produtos-estoque', function (req, res, next) {

        try {
            let data = req.body || {}

            console.log("data ", data);

            let produtoEstoque;

            produtoEstoque = new ProdutoEstoqueModel(data);

            const produtoService = new ProdutosEstoqueService();

            produtoService.create(produtoEstoque)
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

    server.patch('/produtos-estoque', function (req, res, next) {
        try {
            let data = req.body || {}

            let estoqueModel;

            estoqueModel = new ProdutoEstoqueModel();

            const produtoService = new ProdutosEstoqueService();

            produtoService.update(estoqueModel)
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

    server.del('/produtos-estoque', function (req, res, next) {

        try {
            let data = req.body || {}

            let estoqueModel;

            estoqueModel = new ProdutoEstoqueModel();

            let codItem = req.query.codigo;

            const estoqueService = new ProdutosEstoqueService();

            estoqueService.delete(estoqueModel, codItem)
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

    server.get('/produtos-estoque', function (req, res, next) {

        try {
            let data = req.body || {}

            let aVencer = req.body.aVencer;

            let estoqueModel;

            estoqueModel = new ProdutoEstoqueModel();

            const estoqueService = new ProdutosEstoqueService();

            estoqueService.list(estoqueModel, aVencer)
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

    server.get('/produtos-estoque/:id', function (req, res, next) {

        try {
            estoqueModel = new ProdutosEstoqueModel(data);

            const idProduto = req.params.id

            .get(idProduto)
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