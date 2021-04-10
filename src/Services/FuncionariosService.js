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

                console.log('findone')
                funcionariosDao.findOne(FuncionariosModel)
                    .then(result => {
                        funcionario = result;

                        if (funcionario.cpf != FuncionariosModel.cpf || funcionario.rg != FuncionariosModel.rg || funcionario.carteira != FuncionariosModel.carteira) {
                            reject(Exceptions.generateException(400, "Alteração de cpf, rg, ou carteira não é permitido", "Não é possível realizar a alteração"))
                        }
                        else {
                            console.log('atualizar iniciado')
                            funcionariosDao.update(FuncionariosModel)
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

    get(FuncionariosModel) {
        return new Promise(function (resolve, reject) {
            try {
                if(FuncionariosModel.cpf){
                    funcionariosDao.findOne(FuncionariosModel)
                    .then(result=>{
                        if(result)
                            resolve(result)
                        else{
                            reject(Exceptions.generateException(400, "Funcionario nao encontrado", "Nao foi encontrado nenhum funcionario com esse cpf"))
                        }
                    })
                    .catch(error => {
                        reject(error)
                    })
                }else{
                    funcionariosDao.list()
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