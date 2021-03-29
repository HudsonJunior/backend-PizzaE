/* Imports*/

const FuncionariosModel = require('../Models/FuncionariosModel')
const FuncionariosService = require('../Services/FuncionariosService')

/**/

module.exports = function (server) {

    server.post('/funcionarios', function (req, res, next) {

        try {
            let data = req.body || {}

            console.log("data ", data);

            let funcionario;

            funcionario = new FuncionariosModel(data);
            console.log(funcionario)

            const funcionarioService = new FuncionariosService();

            funcionarioService.create(funcionario)
                .then(jsonSuccess => {
                    console.log("jasao deu bom", jsonSuccess)
                    const code = jsonSuccess.code

                    delete jsonSuccess.code

                    res.json(code, jsonSuccess)
                    next()
                })
                .catch(jsonError => {
                    console.log("jasao trollo", jsonError)
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

    server.patch('/funcionarios', function (req, res, next) {
        try {
            let data = req.body || {}

            let funcionariosModel;

            funcionariosModel = new FuncionariosModel();

            const funcionariosService = new FuncionariosService();

            funcionariosService.update(funcionariosModel)
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

    server.del('/funcionarios', function (req, res, next) {

        try {
            let data = req.body || {}

            let cpfFunc = req.query.cpf;

            const funcionarioService = new FuncionariosService();

            funcionarioService.delete(cpfFunc)
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

    server.get('/funcionarios', function (req, res, next) {

        try {

            let funcionarioModel = {};

            const cpfFunc = req.params.cpf || null;

            funcionarioModel.id = cpfFunc;

            const funcionarioService = new FuncionariosService();

            funcionarioService.get(funcionarioModel)
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
}