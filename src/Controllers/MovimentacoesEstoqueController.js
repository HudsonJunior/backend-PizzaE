/* Imports*/
const MovimentacoesEstoqueModel = require('../Models/MovimentacoesEstoqueModel.js')
const MovimentacoesEstoqueService = require('../Services/MovimentacoesEstoqueService.js')

/**/

module.exports = function (server) {
    server.post('/movimentacoes-estoque', function (req,res,next) {
        try {
            let data = req.body || {}

            let movModel = new MovimentacoesEstoqueModel(data);

            const movService = new MovimentacoesEstoqueService();

            movService.create(movModel)
                .then(
                    next()
                )
                .catch(
                    next()
                )
        }catch (error) {
            console.log(error)
        }
    })

    server.get('/movimentacoes-estoque', function (req, res, next) {

        try {
            let data = req.params.data || null;

            const movService = new MovimentacoesEstoqueService();

            movService.get(data)
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
};