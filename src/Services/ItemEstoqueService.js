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
                let itemCadastrado = false


                itemEstoqueDao.findOne(ItemModel)
                    .then(result => {
                        itemCadastrado = true;
                        reject(Exceptions.generateException(400, "Produto com mesmo nome ou código já cadastrado", "Não é possivel cadastrar um produto com mesmo código ou nome"))
                    })
                    .catch(error => {
                        reject(error)
                    });

                if (!itemCadastrado) {
                    itemEstoqueDao.create(ItemModel)
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
                ItemModel.ativado = false;


                deleteElement(ItemModel.itens, codItem)
                    .then(result => {
                       // ItemModel.itens = result
                       // ItemModel.quantidade = ItemModel.quantidade - 1;

                        resolve(result)
                    })
                    .catch(error => {
                        reject(error)
                    })

                if (ItemModel.quantidade <= 0) {
                    itemEstoqueDao.delete(ItemModel)
                        .then(result => {
                            resolve(result)
                        })
                        .catch(error => {
                            reject(error)
                        })
                } else {
                    itemEstoqueService.update(ItemModel)
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

    deleteElement(list, codigo) {
        return new Promise(function (resolve, reject) {

            list.map((item, index) => {
                if (item.codigo == codigo) {
                    delete item[index]
                }
            })
            resolve(list)
        }
        )
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

    list(itemModel, aVencer) {
        return new Promise(function (resolve, reject) {
            try {
                itemEstoqueDao.list(itemModel, aVencer)
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

    get(idItem) {
        return new Promise(function (resolve, reject) {
            try {
                itemEstoqueDao.findOne(idItem)
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

module.exports = ItemEstoqueService