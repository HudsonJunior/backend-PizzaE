/* imports */

const string = require('./../Common/String')
const exceptionsClass = require('./../Models/Responses/Exceptions');
const Exceptions = new exceptionsClass();

const RelatorioSatisfacaoDao = require('../Daos/RelatorioSatisfacaoDao')

/* Global variables*/

var relatorioSatisfacaoService
var relatorioSatisfacaoDao = new RelatorioSatisfacaoDao()
/* */

class RelatorioSatisfacaoService {
    constructor() {
        relatorioSatisfacaoService = this
    }

    async create(RelatorioSatisfacaoModel) {
        console.log("estou no service");
        console.log(RelatorioSatisfacaoModel);
        return new Promise(async function (resolve, reject) {
            try {

                //RelatorioSatisfacaoModel.opniao = string.validateOnlyLetters(RelatorioSatisfacaoModel.opniao)

                relatorioSatisfacaoDao.create(RelatorioSatisfacaoModel)

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


    getFromData(dataRelatorio) {
        return new Promise(function (resolve, reject) {
            if (dataRelatorio != null) {
                try {
                    relatorioSatisfacaoDao.getFromData(dataRelatorio)
                        .then(result => {
                            //result.cash_token = AuthValue.cash_token

                            resolve(result)
                        })
                        .catch(error => {
                            reject(Exceptions.generateException(
                                400,
                                'Erro banco de dados'
                            ))
                        })
                }
                catch (error) {
                    reject(error)
                }
            } else {
                reject(
                    Exceptions.generateException(
                        400,
                        'Data vazia'
                    )
                );
            }
        })
    }

    getFromPedido(cpf) {
        console.log(cpf)
        return new Promise(function (resolve, reject) {
            try {
                relatorioSatisfacaoDao.getFromPedido(cpf)
                    .then(result => {
                        //result.cash_token = AuthValue.cash_token

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

    get() {
        return new Promise(function (resolve, reject) {
            try {

                relatorioSatisfacaoDao.list()
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

module.exports = RelatorioSatisfacaoService