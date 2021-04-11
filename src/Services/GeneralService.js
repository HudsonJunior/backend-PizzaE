/* imports */

/* Global variables*/
const exceptionsClass = require('./../Models/Responses/Exceptions')
const ClientesDao = require('../Daos/ClientesDao')
const sucessClass = require('../Models/Responses/Sucess')
const FuncionariosDao = require('../Daos/FuncionariosDao')

var generalService
const Exceptions = new exceptionsClass()
const Sucess = new sucessClass()
var funcionariosDao
var clientesDao

/* */



class GeneralService {
    constructor() {
        generalService = this
        funcionariosDao = new FuncionariosDao()
        clientesDao = new ClientesDao()
    }

    login(data) {
        return new Promise(function (resolve, reject) {
            try {
                if (!data.cpf || !data.senha) {
                    reject(Exceptions.generateException(500, "Não foi possivel realizar o login", "É necessário informar uma senha e um CPF para efetuar do login"))
                }
                var isCliente = false;
                var encontrouLogin = false

                clientesDao.login(data)
                    .then(result => {
                        if (result) {
                            isCliente = true
                            resolve(Sucess.generateJsonSucess(200, {
                                type: 'C',
                                cpf: data.cpf,
                                password: data.senha,
                                nome: result.nome
                            }))

                            encontrouLogin = true
                        }

                        if (!isCliente) {
                            funcionariosDao.login(data)
                                .then(result => {
                                    if (result) {
                                        resolve(Sucess.generateJsonSucess(200, {
                                            type: result.tipo,
                                            cpf: data.cpf,
                                            password: data.senha,
                                            nome: result.nome

                                        }))
                                        encontrouLogin = true


                                    }
                                    if (!encontrouLogin) {
                                        reject(Exceptions.generateException(400, 'Login inválido', 'Não foi encontrado nenhum usuário com esse CPF ou senha'))
                                    }
                                }).catch(error => {
                                    reject(error)
                                    console.log(error)
                                })
                        }


                    }).catch(error => {
                        reject(error)
                        console.log(error)
                    })


            }
            catch (error) {
                reject(error)
            }
        })
    }
}


module.exports = GeneralService