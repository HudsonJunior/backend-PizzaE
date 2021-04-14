/* Imports*/

const RelatorioSatisfacaoModel = require('../Models/RelatorioSatisfacaoModel')
const RelatorioSatisfacaoService = require('../Services/RelatorioSatisfacaoService')

/**/

module.exports = function (server) {

    server.post('/relatorio_satisfacao', function (req, res, next) {
        console.log("estou no controler do relatorio");
        try {
            let data = req.body || {}

            let relatorioSatisfacaoModel;

            relatorioSatisfacaoModel = new RelatorioSatisfacaoModel(data);

            const relatorioSatisfacaoService = new RelatorioSatisfacaoService();
            console.log(relatorioSatisfacaoModel)
            relatorioSatisfacaoService.create(relatorioSatisfacaoModel)
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
    //Vai passar por parametro o produto que vc quer achar 
    server.get('/relatorio_satisfacao/data', function (req, res, next) {

        try {
            const relatorioSatisfacaoService = new RelatorioSatisfacaoService();
            const dataRelatorio = req.params.data || null;

            relatorioSatisfacaoService.getFromData(dataRelatorio)
                .then(jsonSuccess => {
                    //const code = jsonSuccess.code

                    //delete jsonSucess.code

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
    // pega um pedido de acordo com o cpf
    server.get('/relatorio_satisfacao/pedido', function (req, res, next) {

        try {
            const relatorioSatisfacaoService = new RelatorioSatisfacaoService();
            const cpf = req.params.cpf || null;
            console.log(cpf)
            relatorioSatisfacaoService.getFromPedido(cpf)
                .then(jsonSuccess => {
                    //const code = jsonSuccess.code

                    //delete jsonSucess.code

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

    server.get('/relatorio_satisfacao', function (req, res, next) {

        try {
            const relatorioSatisfacaoService = new RelatorioSatisfacaoService();

            relatorioSatisfacaoService.get()
                .then(jsonSuccess => {
                    //const code = jsonSuccess.code

                    //delete jsonSucess.code

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