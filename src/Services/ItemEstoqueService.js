/* imports */
const ItemEstoqueDao = require('../Daos/ItemEstoqueDao')
const Helper = require('../Common/Helper');

/* Global variables*/
const exceptionsClass = require('../Models/Responses/Exceptions');
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
            
                itemEstoqueDao.create(ItemModel)
                .then(result => {
                    resolve(result)
                })
                .catch(erro => {
                    reject(error)
                })
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

                itemEstoqueDao.findOne(ItemModel)
                    .then(result => {
                        itemEstoque = result;
            
                        console.log("cu", itemEstoque)
                        console.log("bosta", ItemModel.id)
                        if (itemEstoque._id != ItemModel.id) {
                            reject(Exceptions.generateException(400, "Alteração de código não é permitido", "Não é possível realizar a alteração do código de um produto"))
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

    delete(codItem) {
        return new Promise(function (resolve, reject) {
            try {
                itemEstoqueDao.delete(codItem)
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

    get(ItemModel, aVencer, flagQuant, nome) {
        return new Promise(function (resolve, reject) {
            try {
                if(ItemModel.id){
                    itemEstoqueDao.findOne(ItemModel)
                    .then(result=>{
                        if(result)
                            resolve(result)
                        else{
                            resolve([])
                          //  reject(Exceptions.generateException(400, "Item nao encontrado", "Nao foi encontrado nenhum produto no estoque com esse codigo"))
                        }
                    })
                    .catch(error => {
                        reject(error)
                    })
                }else if(flagQuant && nome){
                    itemEstoqueDao.find_quantidade(nome)
                    .then(result=>{
                        resolve(result)
                    })
                    .catch(error => {
                        reject(error)
                    })
                }else{
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

    getRelatorio(data, flagQtde) {
        return new Promise(function (resolve, reject) {
            try {
                if (data) {
                    itemEstoqueDao.listExpiredProdutcs(data)
                    .then(result=>{
                        if(result){
                            resolve(result)
                        }
                        else{
                            reject(Exceptions.generateException(400, "Item nao encontrado", "Nao foi encontrado nenhum produto no estoque vencido nesta data"))
                        }
                    })
                    .catch(error => {
                        reject(error)
                    })
                } else if (flagQtde == "true") {
                    itemEstoqueDao.listAll()
                    .then(result=>{
                        if(result){

                            var estoqueArray = new Array();
                            
                            for (var i=0; i < result.length; i++){

                                var indexEstoque = Helper.fieldSearch('nome',result[i].nome,estoqueArray);

                                if (estoqueArray.length === 0 || indexEstoque === false) {
                                    var obj = new Object();
                                    obj.nome = result[i].nome;
                                    obj.quantidade = 1;
                                    estoqueArray.push(obj);
                                }
                                else {
                                    estoqueArray[indexEstoque].quantidade += 1; 
                                }
                                
                            }
                            resolve(estoqueArray)
                        }
                        else{
                            reject(Exceptions.generateException(400, "Item nao encontrado", "Nao foi encontrado nenhum produto no estoque"))
                        }
                    })
                    .catch(error => {
                        reject(error)
                    })
                } else {
                    reject(Exceptions.generateException(400, "houve algum erro de requisicao"))
                }
            }
            catch (error) {
                reject(error)
            }
        })
    }
}

module.exports = ItemEstoqueService