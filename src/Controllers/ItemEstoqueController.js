/* Imports*/

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
                    console.log("jasao deu bom", jsonSuccess)
                    const code = jsonSuccess.code

                    delete jsonSuccess.code

                    res.json(code, jsonSuccess)
                    next()
                })
                .catch(jsonError => {
                    console.log("jasao trollo", jsonError)
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
           // let data = req.body || {}

            let aVencer = req.body.aVencer;

            let itemModel = {};

            const itemCodigo = req.params.id || null;

            itemModel.id = itemCodigo;

            itemModel = new ItemEstoqueModel();

            const itemService = new ItemEstoqueService();

            itemService.list(itemModel, aVencer)
                .then(jsonSuccess => {
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