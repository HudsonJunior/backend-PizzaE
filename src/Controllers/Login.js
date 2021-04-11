/* Imports*/

const GeneralService = require("../Services/GeneralService");

/**/

module.exports = function (server) {
    server.post('/login', function (req, res, next) {
        try {
            let data = req.body || {}
            const generalService = new GeneralService();

            generalService.login(data)
                .then(jsonSuccess => {
                    console.log('cucu', jsonSuccess)
                    const code = jsonSuccess.code

                    delete jsonSuccess.code

                    res.json(code, jsonSuccess)
                    next()
                })
                .catch(jsonError => {
                    console.log('kaak', jsonError)

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