/* imports */

ProdutosFinaisDal = require('./../Daos/ProdutosFinaisDal')
/* Global variables*/
const exceptionsClass = require('./../Models/Responses/Exceptions')

var produtosFinaisService
var produtosFinaisDal
const Exceptions = new exceptionsClass()

/* */

class ProdutosFinaisService {
    constructor(tipoProduto) {
        produtosFinaisService = this
        produtosFinaisDal = ProdutosFinaisDal(tipoProduto)
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
                let produto;

                produtosFinaisDal.findOne(ProdutoModel)
                    .then(result => {
                        produto = result;
                    })
                    .catch(error => {
                        reject(error)
                    });

                if (produto.id != ProdutoModel.id || produto.id != ProdutoModel.id) {
                    reject(Exceptions.generateException(400, "Alteração de código ou nome do produto não é permitido", "Não é possível realizar a alteração do código ou nome de um produto"))
                }
                else {
                    produtosFinaisDal.update(ProdutoModel)
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

    async delete(ProdutoModel) {
        return new Promise(async function (resolve, reject) {
            try {
                ProdutoModel.ativado = false;

                produtosFinaisDal.delete(ProdutoModel)
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

    existemProdutos (produtos) {
        return new Promise (async function (resolve, reject) {
            try{
                var produtoEncontrado = false
                produtos.map( produto => {
                    produtosFinaisDal.findOne(produto)
                    .then(result => {
                        resolve()
                    })
                    .catch(error => {
                        produtoEncontrado = false
                        reject(error)
                    });
                })
            }
            catch (error) {
                reject(error)
            }
        })
    }

}


module.exports = ProdutosFinaisService