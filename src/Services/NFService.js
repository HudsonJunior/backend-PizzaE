/* imports */

const string = require('./../Common/String')

const NFDao = require('../Daos/NFDao')
const { validateCpf } = require('../Common/Cpf')

/* Global variables*/

var nfService
var nfDao = new NFDao()
/* */

class NFService {
    constructor() {
        nfService = this
    }

    async create(NFModel) {
        return new Promise(async function (resolve, reject) {
            try {

                nfDao.create(NFModel)

                    .then(result => {
                        result.cash_token = AuthValue.cash_token

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

module.exports = NFService