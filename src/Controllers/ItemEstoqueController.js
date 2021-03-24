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
            console.log(itemEstoque)

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

            let codItem = req.params.id;

            const itemService = new ItemEstoqueService();

            itemService.delete(codItem)
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

            let aVencer = req.params.aVencer;
            let flagQuant = req.params.flagQuant;
            let nome = req.params.nome;

            let itemModel = {};

            const itemCodigo = req.params.id || null;

            itemModel.id = itemCodigo;

            const itemService = new ItemEstoqueService();

            itemService.get(itemModel, aVencer, flagQuant, nome)
                .then(jsonSuccess => {
                    res.json(201, jsonSuccess)
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

    server.get('/produtos-estoque/relatorio', function (req, res, next) {

        try {
            let data = req.params.data || null;

            let flagQtde = req.params.flagQtde || null;

            const itemService = new ItemEstoqueService();

            itemService.getRelatorio(data, flagQtde)
                .then(jsonSuccess => {
                    res.json(201, jsonSuccess)
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