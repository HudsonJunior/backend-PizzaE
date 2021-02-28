/* Imports */

const mongooseStringQuery = require('mongoose-string-query');
const { resolve } = require('path');
const mongoose = require('../Connection/connectionMongo');
const exceptionsClass = require('./../../models/Responses/Exceptions')
const sucessClass = require('./../../models/Responses/Sucess')
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

    findOne(EstoqueModel) {
        return new Promise(function (resolve, reject) {
            let nome = EstoqueModel.nome;
            let id = EstoqueModel.id;

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

    delete(EstoqueModel){
        return new Promise(function (resolve, reject) {
            try {
                let obj = new Object();
                obj.id = EstoqueModel.id;

                ProdutosEstoque.deleteOne(obj, EstoqueModel)
                    .then(data => {
                        try{
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
        const UserSchema = new mongoose.Schema(
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
                    type: int,
                    required: true,
                },
                quantidade_minima: {
                    type: int,
                    required: true,
                },
                itens: {
                    type: Object,
                    required: true,
                }
            },
        );
    }
}

module.exports = ProdutosEstoqueDao