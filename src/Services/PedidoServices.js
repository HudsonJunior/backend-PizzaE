/* imports */

const mongoose = require('../../Connection/connectionMongo');
const exceptionsClass = require('./../../models/Responses/Exceptions')
const UserResponse = require('./../../Models/Responses/UserResponse')
const UserDal = require('./../../Daos/User/UserDal')
const string = require('../../Common/String')
const Crypto = require('./../../common/Crypto')
const Cpf = require('../../Common/Cpf')
const UserValue = require('./../../Values/UserValue')
const AuthValue = require('./../../Values/AuthValue')
const existeProdutos = require('../Services/ProdutosFinaisService');
const ProdutosFinaisService = require('../Services/ProdutosFinaisService');
const PedidoDal = require('../Daos/PedidoDal');
/* Global variables*/

const Exceptions = new exceptionsClass()
const userDal = new UserDal()

var PedidoServices

/* */

class PedidoServices {
    constructor() {
        PedidoServices = this
    }

    async create(pedidoModel) {
        return new Promise(async function (resolve, reject) {
            try {

                pedidoModel.codigo = Math.random() * 10
                
                pedidoModel.cpfCliente = string.validateCpf(pedidoModel.cpfCliente)

                pedidoModel.cpfNF = string.validateCpf(pedidoModel.cpfNF)

                let validateExpedicao = await PedidoServices.validateExpedicao(pedidoModel.formaExpedicao, pedidoModel.cpfCliente)

                pedidoDal.create(pedidoModel)
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

    async get(dataPedido) {
        return new Promise(async function (resolve, reject) {
            try {
                pedidoDal.get(dataPedido)
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

    existeCliente (cpfCliente) {
        return new Promise (async function (resolve, reject) {
            try {
                
                var clienteEncontrado = false
                
                clienteDal.findOne(cpfCliente)
                
                .then(result => {
                    clienteEncontrado = true;
                    resolve()
                })
                .catch(error => {
                    clienteEncontrado = false;
                    reject(error)
                });
            }
            catch (error) {
                reject(error)
            }
        })
    }

    validateExpedicao (formaExpedicao, cpfCliente) {
        return new Promise (async function (resolve, reject) {
            try {
                
                if (formaExpedicao == 'entrega')
                    existeCliente(cpfCliente)
                    .then(result => {
                        resolve()
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

module.exports = PedidoServices