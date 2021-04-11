/* imports */

MovimentacoesEstoqueDao = require('../Daos/MovimentacoesEstoqueDao');
/* Global variables*/
const exceptionsClass = require('./../Models/Responses/Exceptions');

var movService;
var movDao;
const Exceptions = new exceptionsClass();

/* */

class MovimentacoesEstoqueService {
    constructor() {
        movService = this;
        movDao = new MovimentacoesEstoqueDao();
    }

    create(movModel) {
        return new Promise(function (resolve, reject) {
            try {
                movDao
                    .find(movModel)
                    .then((result) => {
                        if (result) reject();
                        else {
                            movDao
                                .create(movModel)
                                .then(resolve())
                                .catch((error) => {
                                    reject(error);
                                });
                        }
                    })
                    .catch((error) => {
                        reject(error);
                    });
            } catch (error) {
                reject(error);
            }
        });
    }

    get(data) {
        return new Promise(function (resolve, reject) {
            try {
                if (data) {
                    movDao
                        .list(data)
                        .then((result) => {
                            if (result) {
                                resolve(result);
                            } else {
                                reject(
                                    Exceptions.generateException(
                                        400,
                                        'Não foi possível encontrar uma ação no estoque nesta data'
                                    )
                                );
                            }
                        })
                        .catch((error) => {
                            reject(error);
                        });
                }
            } catch (error) {
                reject(error);
            }
        });
    }
}

module.exports = MovimentacoesEstoqueService;
