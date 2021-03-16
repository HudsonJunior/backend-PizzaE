/* Imports*/

const PedidoModel = require('../Models/PedidoModel.js')
const PedidoServices = require('./../Services/PedidoServices.js')
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

    server.get('/pedido', function (req, res, next) {
        try {
            const pedidoServices = new PedidoServices();

            let dataPedido = req.query.data

            pedidoServices.get(dataPedido)
                .then(jsonSuccess => {


                    res.json(200, jsonSuccess)
                    next()
                })
                .catch(jsonError => {


                    res.json(400, jsonError)
                    next()
                })
        }
        catch (error) {
            console.log(error)
        }
    })
}