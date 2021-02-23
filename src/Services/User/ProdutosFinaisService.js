/* imports */

const mongoose = require('./../../Connection/connectionMongo');
const exceptionsClass = require('./../../models/Responses/Exceptions')
const UserResponse = require('./../../Models/Responses/UserResponse')
const UserDal = require('./../../Daos/User/UserDal')
const string = require('./../../Common/String')
const Crypto = require('./../../common/Crypto')
const Cpf = require('./../../Common/Cpf')
const UserValue = require('./../../Values/UserValue')
const AuthValue = require('./../../Values/AuthValue')
/* Global variables*/

const Exceptions = new exceptionsClass()
const userDal = new UserDal()

var ProdutosFinaisService

/* */

class ProdutosFinaisService {
    constructor() {
        ProdutosFinaisService = this
    }

    async create(UserModel) {
        return new Promise(async function (resolve, reject) {
            try {


                UserModel.cpf = string.validateCpf(UserModel.cpf)
                UserModel.password = Crypto.toSha1(UserModel.password)

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

module.exports = ProdutosFinaisService