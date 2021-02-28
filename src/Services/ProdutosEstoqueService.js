/* imports */

const string = require('./../Common/String')
const ProdutosEstoqueDao = require('./../Daos/ProdutosEstoqueDao')
/* Global variables*/

var produtosEstoqueService
var produtosEstoqueDao
/* */

class ProdutosEstoqueService {
    constructor() {
        produtosEstoqueService = this
        produtosEstoqueDao = new ProdutosEstoqueDao()

    }

    async create(EstoqueModel) {
        return new Promise(async function (resolve, reject) {
            try {
                let produtoCadastrado = false


                produtosEstoqueDao.findOne(EstoqueModel)
                    .then(result => {
                        produtoCadastrado = true;
                        reject(Exceptions.generateException(400, "Produto com mesmo nome ou código já cadastrado", "Não é possivel cadastrar um produto com mesmo código ou nome"))
                    })
                    .catch(error => {
                        reject(error)
                    });
                if (!produtoCadastrado) {
                    produtosEstoqueDao.create(UserModel)
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



}

module.exports = ProdutosEstoqueService