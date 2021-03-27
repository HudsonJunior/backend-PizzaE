/* imports */
const { F } = require('ramda')
const FuncionariosDao = require('../Daos/FuncionariosDao')
/* Global variables*/
const exceptionsClass = require('../Models/Responses/Exceptions')
const Exceptions = new exceptionsClass()

var funcionariosService
var funcionariosDao
/* */

class FuncionariosService {
    constructor() {
        funcionariosService = this
        funcionariosDao = new FuncionariosDao()
    }

    create(FuncionariosModel) {
        return new Promise(function (resolve, reject) {
            try {
               
                funcionariosDao.findOne(FuncionariosModel)
                    .then(result => {
                        if(result) reject(Exceptions.generateException(400, "Funcionário já cadastrado", "Não é possivel cadastrar um funcionário com mesmo cpf"))
                        else{
                            funcionariosDao.create(FuncionariosModel)
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

    update(FuncionariosModel) {
        return new Promise(function (resolve, reject) {
            try {
                let funcionario;

                funcionariosDao.findOne(FuncionariosModel)
                    .then(result => {
                        funcionario = result;
                    })
                    .catch(error => {
                        reject(error)
                    });

                if (funcionario.id != FuncionariosModel.id || funcionario.nome != FuncionariosModel.nome) {
                    reject(Exceptions.generateException(400, "Alteração de código ou nome do produto não é permitido", "Não é possível realizar a alteração do código ou nome de um produto"))
                }
                else {
                    funcionariosDao.update(FuncionariosModel)
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

    delete(cpf) {
        return new Promise(function (resolve, reject) {
            try {
                funcionariosDao.delete(cpf)
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
                            reject(Exceptions.generateException(400, "Item nao encontrado", "Nao foi encontrado nenhum produto no estoque com esse codigo"))
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
}

module.exports = FuncionariosService