/* Imports */

const mongooseStringQuery = require('mongoose-string-query');
const { resolve } = require('path');
const mongoose = require('../Connection/connectionMongo');
const exceptionsClass = require('../Models/Responses/Exceptions')
const sucessClass = require('../Models/Responses/Sucess')
/* Global variables*/

const Exceptions = new exceptionsClass()
const Sucess = new sucessClass()

var ItemEstoque = null

const ItemEstoqueSchema = new mongoose.Schema(
    {
        nome: {
            type: String,
            required: true,
        },
        valor: {
            type: String,
            required: false,
        },
        peso: {
            type: String,
            required: false,
        },
        validade: {
            type: Date,
            required: false,
        },
        fabricacao: {
            type: Date,
            required: false,
        },
        registro: {
            type: Date,
            required: false,
        }
    }
);
ItemEstoqueSchema.plugin(mongooseStringQuery);

ItemEstoque = mongoose.model('produtos_estoque', ItemEstoqueSchema);

/* */   
class ItemEstoqueDao {

    constructor() {
    }

    create(ItemModel) {
        return new Promise(function (resolve, reject) {

            const itemEstoque = new ItemEstoque(ItemModel)

            itemEstoque.save()
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

    findOne(idItem) {
        return new Promise(function (resolve, reject) {
            let id = idItem;

            let obj = new Object()
            obj.nome = nome
            obj.id = id

            try {
                ItemEstoque.findOne(obj, function (err, data) {
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

    list(itemModel, aVencer) {
        return new Promise(function (resolve, reject) {
            let obj = new Object()
            
            if(aVencer){
                obj.data = itemModel;
            }else{
                obj.data = {};
            }

            try {
                ItemEstoque.find(obj)
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

    update(ItemModel) {
        return new Promise(function (resolve, reject) {
            try {
                let id = ItemModel.id
                let obj = new Object();
                obj.id = id
                ItemEstoque.update(obj, ItemModel).then().catch()
            }
            catch (error) {
                reject(error)
            }
        })
    }

    delete(ItemModel) {
        return new Promise(function (resolve, reject) {
            try {
                let obj = new Object();
                obj.id = ItemModel.id;

                ItemEstoque.deleteOne(obj, ItemModel)
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

}

module.exports = ItemEstoqueDao