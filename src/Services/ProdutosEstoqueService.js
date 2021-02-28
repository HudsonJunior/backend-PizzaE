/* imports */
const ProdutosEstoqueDao = require('./../Daos/ProdutosEstoqueDao')
/* Global variables*/
const exceptionsClass = require('./../Models/Responses/Exceptions')
const Exceptions = new exceptionsClass()

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

    async update(EstoqueModel) {
        return new Promise(async function (resolve, reject) {
            try {
                let produtoEstoque;

                produtosEstoqueDao.findOne(EstoqueModel)
                    .then(result => {
                        produtoEstoque = result;
                    })
                    .catch(error => {
                        reject(error)
                    });

                if (produtoEstoque.id != EstoqueModel.id || produtoEstoque.nome != EstoqueModel.nome) {
                    reject(Exceptions.generateException(400, "Alteração de código ou nome do produto não é permitido", "Não é possível realizar a alteração do código ou nome de um produto"))
                }
                else {
                    produtosEstoqueDao.update(EstoqueModel)
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

    async delete(EstoqueModel) {
        return new Promise(async function (resolve, reject) {
            try {
                EstoqueModel.ativado = false;

                
                //remove item da lista
                EstoqueModel.quantidade = EstoqueModel.quantidade - 1;
                //chama update


                if(EstoqueModel.quantidade === 0){
                    produtosEstoqueDao.delete(EstoqueModel)
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