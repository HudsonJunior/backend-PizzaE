/* imports */

produtosFinaisDal = require('./../Daos/ProdutosFinaisDal')
/* Global variables*/
const exceptionsClass = require('./../Models/Responses/Exceptions')

var produtosFinaisService
const Exceptions = new exceptionsClass()

/* */

class ProdutosFinaisService {
    constructor() {
        produtosFinaisService = this
    }

    async create(ProdutoModel) {

        return new Promise(async function (resolve, reject) {
            try {
                let produtoCadastrado = false;

                produtosFinaisDal.findOne(ProdutoModel)
                    .then(result => {
                        produtoCadastrado = true;
                        reject(Exceptions.generateException(400, "Produto com mesmo nome ou código já cadastrado", "Não é possivel cadastrar um produto com mesmo código ou nome"))
                    })
                    .catch(error => {
                        reject(error)
                    });

                if (!produtoCadastrado) {
                    produtosFinaisDal.create(ProdutoModel)
                        .then(result => {
                            resolve(result)
                        })
                        .catch(error => {
                            reject(error)
                        })
                }
            }
            catch (error) {
                reject(error)
            }
        })
    }

    async update(ProdutoModel) {
        return new Promise(async function (resolve, reject) {
            try {

                produtosFinaisDal.update(ProdutoModel)
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