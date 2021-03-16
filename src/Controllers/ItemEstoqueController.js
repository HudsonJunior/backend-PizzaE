/* Imports*/

const ProdutoEstoqueModel = require('../Models/ProdutoEstoqueModel')
const ItemEstoqueModel = require('../Models/ItemEstoqueModel')
const ItemEstoqueService = require('../Services/ItemEstoqueService')

/**/

module.exports = function (server) {

    server.post('/produtos-estoque', function (req, res, next) {

        try {
            let data = req.body || {}

            console.log("data ", data);

            let itemEstoque;

            itemEstoque = new ItemEstoqueModel(data);

            const itemService = new ItemEstoqueService();

            itemService.create(itemEstoque)
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

            let itemModel;

            itemModel = new ItemEstoqueModel();

            const itemService = new ItemEstoqueService();

            itemService.update(itemModel)
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

            let itemModel;

            itemModel = new ItemEstoqueModel();

            let codItem = req.query.codigo;

            const itemService = new ItemEstoqueService();

            itemService.delete(itemModel, codItem)
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

            let itemModel;

            itemModel = new ItemEstoqueModel();

            const itemService = new ItemEstoqueService();

            itemService.list(itemModel, aVencer)
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
            itemModel = new ItemEstoqueModel(data);

            const idItem = req.params.id

            .get(idItem)
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