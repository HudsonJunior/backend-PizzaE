/* Imports*/

const RelatorioSatisfacaoModel = require('../Models/RelatorioSatisfacaoModel')
const RelatorioSatisfacaoService = require('../Services/RelatorioSatisfacaoService')

/**/

module.exports = function (server) {

    server.post('/relatorio_satisfacao', function (req, res, next) {
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

    server.get('/relatorio_satisfacao', function (req, res, next) {

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

}