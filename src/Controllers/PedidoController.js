/* Imports*/

const PedidoModel = require('../Models/PedidoModel.js')
const PedidoServices = require('../../Services/User/PedidoServices.js')
/**/

module.exports = function (server) {

    server.post('/pedido', function (req, res, next) {

        try {
            let data = JSON.parse(req.body) || {}

            let pedidoModel = new PedidoModel(data);

            const pedidoServices = new PedidoServices(data);

            pedidoServices.create(pedidoModel)
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