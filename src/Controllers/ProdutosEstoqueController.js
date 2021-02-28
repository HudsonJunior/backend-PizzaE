/* Imports*/

const ProdutoEstoqueModel = require('../Models/ProdutoEstoqueModel')
const ProdutosEstoqueService = require('../Services/ProdutosEstoqueService')

/**/

module.exports = function (server) {

    server.post('/produtos-estoque', function (req, res, next) {

        try {
            let data = JSON.parse(req.body) || {}

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
}