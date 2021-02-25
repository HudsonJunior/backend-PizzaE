/* imports */

const string = require('./../Common/String')

/* Global variables*/

var produtosFinaisService

/* */

class ProdutosFinaisService {
    constructor() {
        produtosFinaisService = this
    }

    async create(UserModel) {
        return new Promise(async function (resolve, reject) {
            try {


                UserModel.cpf = string.validateCpf(UserModel.cpf)
                UserModel.password = Crypto.toSha1(UserModel.password)

                userDal.create(UserModel)
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

module.exports = ProdutosFinaisService