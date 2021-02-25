/* imports */

const string = require('./../Common/String')

/* Global variables*/

var produtosEstoqueService

/* */

class ProdutosEstoqueService {
    constructor() {
        produtosEstoqueService = this
    }

    async create(UserModel) {
        return new Promise(async function (resolve, reject) {
            try {

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

module.exports = ProdutosEstoqueService