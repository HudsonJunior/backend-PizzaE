/* Imports */

const mongooseStringQuery = require('mongoose-string-query');
const { resolve } = require('path');
const mongoose = require('../Connection/connectionMongo');
const exceptionsClass = require('./../Models/Responses/Exceptions')
const sucessClass = require('./../Models/Responses/Sucess')
/* Global variables*/

const Exceptions = new exceptionsClass()
const Sucess = new sucessClass()

var ProdutosEstoque = null

/* */   
class ProdutosEstoqueDao {

    constructor() {
        const ProdutosEstoqueSchema = this.getProdutosEstoqueSchema()

        ProdutosEstoqueSchema.plugin(mongooseStringQuery);

        ProdutosEstoque = mongoose.model('produtos_estoque', ProdutosEstoqueSchema);
    }

    create(EstoqueModel) {
        return new Promise(function (resolve, reject) {

            const produtosEstoque = new ProdutosEstoque(EstoqueModel)

            produtosEstoque.save()
                .then(data => {
                    try {
                        const jsonSucess = Sucess.generateUserJsonSucess(UserResponse.Codes.OkRegister, data)

                        resolve(jsonSucess)
                    }
                    catch (error) {
                        console.log(error)
                    }

                })
                .catch(error => {
                    console.log(error)
                    reject(Exceptions.generateException(UserResponse.Codes.InternalServerError, UserResponse.Messages.RegisterError, UserResponse.Details.DbError))
                })
        })
    }

    findOne(idProduto) {
        return new Promise(function (resolve, reject) {
            let id = idProduto;

            let obj = new Object()
            obj.nome = nome
            obj.id = id

            try {
                ProdutosEstoque.findOne(obj, function (err, data) {
                    if (err) {
                        reject()
                    }

                    if (data) {
                        resolve()
                    }
                    else {
                        reject()
                    }
                })
            }
            catch (error) {
                reject(error)
            }

        })
    }

    list(estoqueModel, aVencer) {
        return new Promise(function (resolve, reject) {
            let obj = new Object()
            
            if(aVencer){
                obj.data = estoqueModel;
            }else{
                obj.data = {};
            }

            try {
                ProdutosEstoque.find(obj)
                    .then(data => {
                        try {
                            const jsonSucess = Sucess.generateUserJsonSucess(200, data)

                            resolve(jsonSucess)
                        }
                        catch (error) {
                            console.log(error)
                        }
                    })
                    .catch(error => {
                        console.log(error)
                        reject(Exceptions.generateException(UserResponse.Codes.InternalServerError, UserResponse.Messages.RegisterError, UserResponse.Details.DbError))
                    })
            }
            catch (error) {
                reject(error)
            }
        })
    }

    update(EstoqueModel) {
        return new Promise(function (resolve, reject) {
            try {
                let id = EstoqueModel.id
                let obj = new Object();
                obj.id = id
                ProdutosEstoque.update(obj, EstoqueModel).then().catch()
            }
            catch (error) {
                reject(error)
            }
        })
    }

    delete(EstoqueModel) {
        return new Promise(function (resolve, reject) {
            try {
                let obj = new Object();
                obj.id = EstoqueModel.id;

                ProdutosEstoque.deleteOne(obj, EstoqueModel)
                    .then(data => {
                        try {
                            const jsonSucess = Sucess.generateJsonSucess(200, data);

                            resolve(jsonSucess)
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

    getProdutosEstoqueSchema() {
        const ProdutosEstoqueSchema = new mongoose.Schema(
            {
                nome: {
                    type: String,
                    required: true,
                },
                marca: {
                    type: String,
                    required: false,
                },
                quantidade: {
                    type: String,
                    required: true,
                },
                itens: {
                    type: Object,
                    required: true,
                },
                quantidade_minima: {
                    type: String,
                    required: true,
                }
            }
        );
        return ProdutosEstoqueSchema;
    }
}

module.exports = ProdutosEstoqueDao