/* Imports */

const mongooseStringQuery = require('mongoose-string-query');
const mongoose = require('../Connection/connectionMongo');
const exceptionsClass = require('./../Models/Responses/Exceptions')
const sucessClass = require('./../Models/Responses/Sucess')
/* Global variables*/
const R = require('ramda')

const Exceptions = new exceptionsClass()
const Sucess = new sucessClass()

var NF = null

/* */
class NFDal {
    constructor() {
        const NFSchema = this.getNFSchema()

        NFSchema.plugin(mongooseStringQuery);

        NF = mongoose.model('nf', NFSchema);
    }

    create(NFModel) {
        return new Promise(function (resolve, reject) {

            const nf = new NF(NFModel)

            nf.save()
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




    getNFSchema() {
        const NFSchema = new mongoose.Schema(
            {
                pedido: {
                    type: Object,
                    required: true,
                    select: true,
                },
                cpf: {
                    type: String,
                    required: false,
                },
                data: {
                    type: Date,
                    required: false,
                }


            },
        );

        return NFSchema
    }

}

module.exports = NFDal