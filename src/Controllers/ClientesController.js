/* Imports*/

const { validateCpf } = require('../Common/Cpf')
const ClientesModel = require('../Models/ClientesModel')
const ClientesService = require('../Services/ClientesService')

/**/

module.exports = function (server) {

    server.post('/clientes', function (req, res, next) {

        try {
            let data = req.body || {}

            let clientesModel;

            clientesModel = new ClientesModel(data);
            var clientesService = new ClientesService();

            clientesService.create(clientesModel)
                .then(jsonSuccess => {
                    const code = jsonSuccess.code

                    delete jsonSuccess.code

                    res.json(code, jsonSuccess)
                    next()
                })
                .catch(jsonError => {

                    res.json(500, jsonError)
                    next()
                })
        }
        catch (error) {
            console.log(error)
        }
    })

    server.get('/clientes', function (req, res, next) {

        try {

            const clientesService = new ClientesService();
            const cpfClientes = req.params.cpf
            if (cpfClientes == null) {
                clientesService.get()
                    .then(jsonSuccess => {
                        //const code = jsonSuccess.code

                        //delete jsonSucess.code

                        res.json(201, jsonSuccess)
                        next()
                    })
                    .catch(jsonError => {
                        //const code = jsonError.code

                        delete jsonError.code

                        res.json(201, jsonError)
                        next()
                    })
            } else {
                clientesService.getCliente(cpfClientes)
                    .then(jsonSuccess => {


                        res.json(201, jsonSuccess)
                        next()
                    })
                    .catch(jsonError => {


                        delete jsonError.code

                        res.json(201, jsonError)
                        next()
                    })
            }


        }
        catch (error) {
            console.log(error)
        }
    })



    server.del('/clientes', function (req, res, next) {

        try {

            const cpfCliente = req.params.cpf

            const clientesService = new ClientesService();

            clientesService.delete(cpfCliente)
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

    server.patch('/clientes', function (req, res, next) {
        try {
            let data = req.body || {}

            let clientesModel;

            clientesModel = new ClientesModel(data);

            const clientesService = new ClientesService();


            clientesService.update(clientesModel)
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