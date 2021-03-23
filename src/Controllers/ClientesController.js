/* Imports*/

const ClientesModel = require('../Models/ClientesModel')
const ClientesService = require('../Services/ClientesService')

/**/

module.exports = function (server) {

    server.post('/clientes', function (req, res, next) {
        console.log("estou no controler");
        try {
            let data = req.body || {}

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

    server.get('/clientes', function (req, res, next) {

        try {
            
            const clientesService = new ClientesService();
            const cpfClientes = req.params.cpf
            if(cpfClientes == null){
                clientesService.get()
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
            }else{
                console.log(cpfClientes)
                clientesService.getCliente(cpfClientes)
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

            
        }
        catch (error) {
            console.log(error)
        }
    })

    

    server.del('/clientes', function (req, res, next) {

        try {
            /*
            let data = req.body || {}

            let clientesModel;

            clientesModel = new ClientesModel(data);

            let cpfCliente = req.query.codigo;
            */
            const cpfCliente = req.params.cpf
            console.log(cpfCliente)
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