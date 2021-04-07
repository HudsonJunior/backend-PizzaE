/* Imports*/

const NFModel = require('../Models/NFModel')
const NFService = require('../Services/NFService')

/**/

module.exports = function (server) {

    server.post('/nf', function (req, res, next) {
        console.log("estou no controler");
        try {
            let data = req.body || {}

            let nfModel;

            nfModel = new NFModel(data);

            const nfService = new NFService();

            nfService.create(nfModel)
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

    server.get('/nf', function (req, res, next) {

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