/* imports */
const ItemEstoqueDao = require('../Daos/ItemEstoqueDao')
/* Global variables*/
const exceptionsClass = require('../Models/Responses/Exceptions')
const Exceptions = new exceptionsClass()

var itemEstoqueService
var itemEstoqueDao
/* */

class ItemEstoqueService {
    constructor() {
        itemEstoqueService = this
        itemEstoqueDao = new ItemEstoqueDao()
    }

    create(ItemModel) {
        return new Promise(function (resolve, reject) {
            try {
               
                itemEstoqueDao.findOne(ItemModel)
                    .then(result => {
                        if(result) reject(Exceptions.generateException(400, "Produto com mesmo nome ou código já cadastrado", "Não é possivel cadastrar um produto com mesmo código ou nome"))
                        else{
                            itemEstoqueDao.create(ItemModel)
                            .then(result => {
                                resolve(result)
                            })
                            .catch(erro => {
                                reject(error)
                            })
                        }
                    })
                    .catch(error => {
                        reject(error)
                    });
            }
            catch (error) {
                reject(error)
            }
        })
    }

    update(ItemModel) {
        return new Promise(function (resolve, reject) {
            try {
                let itemEstoque;

                produtosEstoqueDao.findOne(ItemModel)
                    .then(result => {
                        itemEstoque = result;
                    })
                    .catch(error => {
                        reject(error)
                    });

                if (itemEstoque.id != ItemModel.id || itemEstoque.nome != ItemModel.nome) {
                    reject(Exceptions.generateException(400, "Alteração de código ou nome do produto não é permitido", "Não é possível realizar a alteração do código ou nome de um produto"))
                }
                else {
                    itemEstoqueDao.update(ItemModel)
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

    delete(ItemModel, codItem) {
        return new Promise(function (resolve, reject) {
            try {
                itemEstoqueDao.delete(ItemModel, codItem)
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

    existemItemEstoque(itemEstoque) {
        return new Promise(function (resolve, reject) {
            try {
                var itemEstoqueEncontrado = false
                itemEstoque.map(itemEstoque => {
                    itemEstoqueDao.findOne(itemEstoque)
                        .then(result => {
                            resolve()
                        })
                        .catch(error => {
                            itemEstoqueEncontrado = false
                            reject(error)
                        });
                })
            }
            catch (error) {
                reject(error)
            }
        })
    }

    get(ItemModel, aVencer) {
        return new Promise(function (resolve, reject) {
            try {
                if(ItemModel.id){
                    itemEstoqueDao.findOne(ItemModel)
                    .then(result=>{
                        if(result)
                            resolve(result)
                        else{
                            reject(Exceptions.generateException(400, "Item nao encontrado", "Nao foi encontrado nenhum produto no estoque com esse codigo"))
                        }
                    })
                    .catch(error => {
                        reject(error)
                    })
                }
                else{
                    itemEstoqueDao.list(aVencer)
                    .then(result => {
                        if(result)
                            resolve(result)
                        else{
                            reject(Exceptions.generateException(400, "Item nao encontrado", "Nao foi encontrado nenhum produto no estoque com esse codigo"))
                        }
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

module.exports = ItemEstoqueService