/* Imports */

const mongooseStringQuery = require('mongoose-string-query');
const { resolve } = require('path');
const mongoose = require('../Connection/connectionMongo');
const exceptionsClass = require('../Models/Responses/Exceptions')
const sucessClass = require('../Models/Responses/Sucess')
const R = require('ramda')
var moment = require('moment');
const MovimentacoesEstoqueService = require('../Services/MovimentacoesEstoqueService')
const Date = require('../Common/Date');
const ItemEstoqueModel = require('../Models/ItemEstoqueModel');
/* Global variables*/

const Exceptions = new exceptionsClass()
const Sucess = new sucessClass()
const movService = new MovimentacoesEstoqueService()
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
                        
                        // registro de movimentacao do estoque
                        var today = new Date().getCurrentDate();
                    
                        let movData = {
                            idProduto: data._id,
                            data: today,
                            acao: "criacao"
                        }

                        movService.create(movData);

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
            obj._id = id
            obj.nome = nome

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

    listAll() {
        return new Promise(function (resolve, reject) {
            try {                
                ItemEstoque.find(
                    function (err, data) {
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

    listExpiredProdutcs(dataValidade){
        return new Promise(function (resolve, reject) {
            const newData = new Date(moment(dataValidade).toDate());
            try {                
                ItemEstoque.find(
                    {
                        validade: {
                            $lte : newData
                        } 
                    }, 
                    function (err, data) {
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
                            'Produto alterado com sucesso'
                        );

                        // registro de movimentacao do estoque
                        var today = new Date().getCurrentDate();

                        let movData = {
                            idProduto: id,
                            data: today,
                            acao: "alteracao"
                        }

                        movService.create(movData);

                        resolve(jsonSucess);
                    } catch (error) {
                        console.log(error);
                    }
                })
                .catch((error) => {
                    console.log(error);
                    reject(
                        Exceptions.generateException(500, 'erro', error)
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
                /* let obj = new Object();
                obj._id = codItem; */

                /* ItemEstoque.deleteOne(obj, ItemModel)
                    .then((data) => {
                        try {
                            const jsonSucess = Sucess.generateJsonSucess(
                                201,
                                "Item apagado com sucesso!"
                            );

                            resolve(jsonSucess);

                        } catch (error) {
                            console.log(error);
                        }
                    })
                    .catch((error) => {
                        console.log(error);
                        reject(
                            Exceptions.generateException(500, 'Erro', "Erro ao deletar item do estoque!")
                        );
                    }); */
                ItemEstoque.deleteOne({_id: codItem})
                .then((data) => {
                    if (data.deletedCount != 0) {
                        // registro de movimentacao do estoque
                        var today = new Date().getCurrentDate();
                    
                        let movData = {
                            idProduto: codItem,
                            data: today,
                            acao: "remocao"
                        }

                        movService.create(movData);
                        
                        resolve(Sucess.generateJsonSucess(201,'Produto deletado com sucesso'))
                    }
                    else{
                        reject(Exceptions.generateException(500, "Erro ao deletar um produto Estoque")) 
                    } 
                })
                .catch((error) => {
                    console.log(error);
                    
                });
            }
            catch (error) {
                reject(error)
            }
        })
    }
}


module.exports = ItemEstoqueDao