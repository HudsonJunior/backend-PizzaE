/* Imports */
const mongooseStringQuery = require('mongoose-string-query');
const mongoose = require('../Connection/connectionMongo');
const exceptionsClass = require('./../Models/Responses/Exceptions')
const sucessClass = require('./../Models/Responses/Sucess')
/* Global variables*/
const R = require('ramda')
const DateClass = require('../Common/Date');
const DateCommon = require('../Common/Date');

const Exceptions = new exceptionsClass()
const Sucess = new sucessClass()

var RelatorioSatisfacao = null

/* */
class RelatorioSatisfacaoDao {
    constructor() {
        const RelatorioSatisfacaoSchema = this.getRelatorioSatisfacaoSchema()

        RelatorioSatisfacaoSchema.plugin(mongooseStringQuery);

        RelatorioSatisfacao = mongoose.model('relatorioSatisfacao', RelatorioSatisfacaoSchema);
    }

    create(RelatorioSatisfacaoModel) {

        return new Promise(function (resolve, reject) {

            const dataNova = new Date(RelatorioSatisfacaoModel.dataSatisfacao)
            RelatorioSatisfacao.dataSatisfacao = dataNova

            const relatorioSatisfacao = new RelatorioSatisfacao(RelatorioSatisfacaoModel)
            relatorioSatisfacao.save()
                .then(data => {
                    try {
                        const jsonSucess = Sucess.generateJsonSucess(200, data);

                        resolve(jsonSucess);
                    } catch (error) {
                        console.log(error);
                    }

                })
                .catch(error => {
                    reject(Exceptions.generateException(500, 'erro', error));
                })

        })
    }


    getFromData(dataRelatorio) {
        return new Promise(function (resolve, reject) {

            const newData = new Date(dataRelatorio);

            let obj = new Object(); // Representa um pedido
            obj.dataSatisfacao = newData;

            try {
                RelatorioSatisfacao.find(obj)
                    .then(data => {
                        try {
                            const jsonSucess = Sucess.generateJsonSucess(201, data);
                            resolve(data)
                        }
                        catch (error) {
                            console.log(error)
                        }
                    })
                    .catch(error => {
                        console.log(error)
                        reject(Exceptions.generateException(500, 'Erro', 'Erro'))
                    })
            } catch (error) {
                reject(error);
            }

        });
    }

    getFromPedido(cpf) {
        return new Promise(function (resolve, reject) {
            let obj = new Object(); // Representa um pedido
            obj.cpfCliente = cpf;

            try {
                RelatorioSatisfacao.find(obj)
                    .then(data => {
                        try {
                            const jsonSucess = Sucess.generateJsonSucess(201, data);
                            resolve(data)
                        }
                        catch (error) {
                            console.log(error)
                        }
                    })
                    .catch(error => {
                        console.log(error)
                        reject(Exceptions.generateException(500, 'Erro', 'Erro'))
                    })
            } catch (error) {
                reject(error);
            }
        })
    }

    list() {
        return new Promise(function (resolve, reject) {

            try {
                RelatorioSatisfacao.find({})
                    .then(data => {
                        try {
                            resolve(data)
                        }
                        catch (error) {
                            console.log(error)
                        }
                    })
                    .catch(error => {
                        console.log(error)
                        reject(Exceptions.generateException(500, 'Erro', 'Erro'))
                    })
            }
            catch (error) {
                reject(error)
            }
        })
    }

    findOne(ClienteModel) {
        return new Promise(function (resolve, reject) {
            let cpf = ClienteModel.cpf;

            let obj = new Object()
            obj.cpf = cpf

            try {
                Clientes.findOne(obj, function (err, data) {
                    if (err) {
                        reject()
                    }

                    if (data != null && !R.isEmpty(data)) {
                        resolve(data)
                    }
                    else {
                        resolve(false)
                    }
                })
            }
            catch (error) {
                reject(error)
            }

        })
    }


    validatePrimaryKey(field, value) {
        return new Promise(function (resolve, reject) {

            let obj = new Object()
            obj[field] = value

            try {
                Cliente.findOne(obj, function (err, data) {
                    if (err) {
                        console.log(err)
                        reject()
                    }

                    if (!data) {
                        resolve()
                    }
                    else {
                        reject()
                    }
                })
            }
            catch (error) {
                reject
            }
        })
    }

    getRelatorioSatisfacaoSchema() {
        const RelatorioSatisfacaoSchema = new mongoose.Schema(
            {
                opniao: {
                    type: String,
                    required: true,
                    //select: true,
                },
                dataSatisfacao: {
                    type: Date,
                    //required: true,
                },
                cpfCliente: {
                    type: String,
                    required: true,
                },
                produto: {
                    type: String,
                    required: true,
                }
            },
        );

        return RelatorioSatisfacaoSchema
    }

}

module.exports = RelatorioSatisfacaoDao