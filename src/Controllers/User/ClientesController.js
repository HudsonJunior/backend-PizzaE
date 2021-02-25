/* Imports*/

const ClientesModel = require('../../Models/ClientesModel')
const ClientesService = require('../../Services/ProdutosFinaisService')

/**/

module.exports = function (server) {

    server.post('/clientes', function (req, res, next) {

        try {
            let data = JSON.parse(req.body) || {}

            let clientesModel;

            clientesModel = new ClientesModel(data);

            const clientesService = new ClientesService();

            clientesService.create(clientesModel)
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