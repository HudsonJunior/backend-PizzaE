/* imports */

const string = require('./../Common/String')

/* Global variables*/

var clientesService

/* */

class ClientesService {
    constructor() {
        clientesService = this
    }

    async create(ClientesModel) {
        return new Promise(async function (resolve, reject) {
            try {


                ClientesModel.cpf = string.validateCpf(ClientesModel.cpf)
                ClientesModel.password = Crypto.toSha1(ClientesModel.password)
                

                clientesDal.create(UserModel)
                    .then(result => {
                        resolve(result)
                    })
                    .catch(error => {
                        reject(error)
                    })

            }
            catch (error) {
                reject(error)
            }
        })
    }

    

}

module.exports = ClientesService