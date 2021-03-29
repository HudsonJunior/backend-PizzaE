/* Imports */

const mongooseStringQuery = require('mongoose-string-query');
const { resolve } = require('path');
const mongoose = require('../Connection/connectionMongo');
const exceptionsClass = require('../Models/Responses/Exceptions')
const sucessClass = require('../Models/Responses/Sucess')
const R = require('ramda')
var moment = require('moment');
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
        loteId: {
            type: String,
            required: false,
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
            type: String,
            required: false,
        },
        registro: {
            type: String
            ,
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
                        const jsonSucess = Sucess.generateJsonSucess(201, "Cadastro feito com sucesso")

                        resolve(jsonSucess)
                    }
                    catch (error) {
                        console.log(error)
                    }

                })
                .catch(error => {
                    console.log(error)
                    reject(Exceptions.generateException(500, "Erro ao cadastrar item no estoque"))
                })
        })
    }

    findOne(ItemModel) {
        return new Promise(function (resolve, reject) {
            let nome = ItemModel.nome;
            let id = ItemModel.id;

            let obj = new Object()
            obj.nome = nome
            obj._id = id

            try {
                ItemEstoque.findOne(obj, function (err, data) {
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

    list(aVencer) {
        return new Promise(function (resolve, reject) {
            const obj = new Object()
            try {
                console.log(aVencer)
                if(aVencer){
                    console.log("alou")
                    const dataAtual = new Date()
                    let dataFormatada = ((dataAtual.getFullYear() )) + "-" + ((dataAtual.getMonth() + 1)) + "-" + (dataAtual.getDate() + 7);
                    const newData = new Date(moment(dataFormatada).toDate())
                    console.log( "newdata", newData)
                    obj.validade = {
                        $lte : newData
                    }
                }
                console.log(obj)
                ItemEstoque.find(obj, function(err, data){
                    console.log("erro", err)
                    console.log("data", data)
                    if(err){
                        reject()
                    }
                    if(data != null && !R.isEmpty(data)){
                        resolve(data)
                    }
                    else{
                        resolve(false)
                    }
                })
            }
            catch (error) {
                console.log(error)
                reject(error)
            }
        })
    }

    find_quantidade(nome){
        return new Promise(function(resolve, reject){
            let obj = new Object()
            obj.nome = nome

            try {
                ItemEstoque.find(obj, function (err, data) {
                    if (err) {
                        reject()
                    }

                    if (data != null && !R.isEmpty(data)) {
                        resolve({
                            nome: nome,
                            quantidade: data.length
                        })
                    }
                    else {
                        resolve({
                            nome: nome,
                            quantidade: 0
                        })
                    }
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
                obj._id = id
                ItemEstoque.updateOne(obj, ItemModel)
                .then((data) => {
                    try {
                        const jsonSucess = Sucess.generateJsonSucess(
                            200,
                            'Item do estoque alterado com sucesso'
                        );
                        resolve(jsonSucess);
                    } catch (error) {
                        console.log(error);
                    }
                })
                .catch((error) => {
                    console.log(error);
                    reject(
                        Exceptions.generateException(500, 'Erro ao atualizar item estoque', error)
                    );
                });
            }
            catch (error) {
                reject(error)
            }
        })
    }

    delete(codItem) {
        return new Promise(function (resolve, reject) {
            try {

                ItemEstoque.deleteOne({_id: codItem})
                .then((data) =>{
                    try {
                        const jsonSucess = Sucess.generateJsonSucess(
                            200,
                            'Item do estoque deletado com sucesso'
                        );
                        resolve(jsonSucess);
                    } catch (error) {
                        console.log(error);
                    }
                })
                .catch((error) => {
                    console.log(error);
                })
            }
            catch (error) {
                reject(error)
            }
        })
    }

}

module.exports = ItemEstoqueDao