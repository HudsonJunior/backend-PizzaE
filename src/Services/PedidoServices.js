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
                
                pedidoModel.cpf = string.validateCpf(pedidoModel.cpf)

                ProdutosFinaisService.existeProdutos(pedidoModel.produtos)
                .then(result => {
                    resolve(result)
                })
                .catch(error => {
                    reject(error)
                })
                

                userDal.create(UserModel)
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

module.exports = PedidoServices