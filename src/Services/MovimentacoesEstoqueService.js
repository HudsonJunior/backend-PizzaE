/* imports */

MovimentacoesEstoqueDao = require('../Daos/MovimentacoesEstoqueDao')
/* Global variables*/
const exceptionsClass = require('./../Models/Responses/Exceptions')

var movService
var movDao
const Exceptions = new exceptionsClass()

/* */

class MovimentacoesEstoqueService {
    constructor() {
        movService = this;
        movDao = new MovimentacoesEstoqueDao()
    }

    create(movModel) {
        return new Promise(function (resolve, reject) {
            try {

                movDao.find(movModel)
                    .then(result => {
                        if (result) 
                            reject(Exceptions.generateException(400, "Produto não se encontra no estoque", "Não é possivel realizar ações."))

                        else {
                            movDao.create(movModel)
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

    get(data) {
        return new Promise(function (resolve, reject) {
            try {
                if (data){
                    movDao.list(data)
                    .then(result => {
                        if(result)
                            resolve(result)
                        else{
                            reject(Exceptions.generateException(400, "Não foi possível encontrar uma ação no estoque nesta data"))
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

module.exports = MovimentacoesEstoqueService;