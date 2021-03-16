/* Imports */

const mongooseStringQuery = require("mongoose-string-query");
const mongoose = require("../Connection/connectionMongo");
const exceptionsClass = require("../Models/Responses/Exceptions");
const sucessClass = require("../Models/Responses/Sucess");
const PedidoResponse = require("../Models/Responses/PedidoResponse");
/* Global variables*/

const Exceptions = new exceptionsClass();
const Sucess = new sucessClass();

var Pedido = null;
const PedidoSchema = new mongoose.Schema({
    codigo: {
        type: Number,
    },
    produtos: {
        type: Object,
    },
    formaPagamento: {
        type: String,
    },
    formaExpedicao: {
        type: String,
    },
    endereco: {
        type: String,
    },
    data: {
        type: Date,
    },
    cpfCliente: {
        type: String,
    },
    cpfNF: {
        type: String,
    },
    observacoes: {
        type: String,
    },
    statusPedido: {
        type: String,
    },
    valor: {
        type: String,
    },
    statusPagamento: {
        type: String,
    },
});

PedidoSchema.plugin(mongooseStringQuery);

Pedido = mongoose.model("pedidos", PedidoSchema);
/* */
class PedidoDao {
    constructor() {}

    create(PedidoModel) {
        return new Promise(function (resolve, reject) {
            const pedido = new Pedido(PedidoModel);
            console.log("pedido: ", pedido);
            pedido
                .save()
                .then((data) => {
                    try {
                        console.log("alo");
                        const jsonSucess = Sucess.generateUserJsonSucess(
                            PedidoResponse.Codes.OkRegister,
                            data
                        );

                        resolve(jsonSucess);
                    } catch (error) {
                        console.log(error);
                    }
                })
                .catch((error) => {
                    console.log("carambolas");
                    console.log(error);
                    reject(
                        Exceptions.generateException(
                            PedidoResponse.Codes.InternalServerError,
                            PedidoResponse.Messages.RegisterError,
                            PedidoResponse.Details.DbError
                        )
                    );
                });
        });
    }

    findOne(codigo) {
        return new Promise(function (resolve, reject) {
            let obj = new Object();
            obj.id = codigo;

            try {
                console.log("aaa");
                Pedido.findOne(obj, function (err, data) {
                    if (err) {
                        console.log(err);
                        reject();
                    }
                    if (!data) {
                        console.log("aaaaa");
                        resolve();
                    } else {
                        console.log("bbbbb");
                        reject();
                    }
                });
            } catch (error) {
                reject(error);
            }
        });
    }

    update(PedidoModel) {
        return new Promise(function (resolve, reject) {
            try {
                let codigo = PedidoModel.Pedido;

                let obj = new Object();

                obj.id = codigo;

                Pedido.update(obj, PedidoModel)
                    .then((data) => {
                        try {
                            const jsonSucess = Sucess.generateUserJsonSucess(
                                200,
                                data
                            );

                            resolve(jsonSucess);
                        } catch (error) {
                            console.log(error);
                        }
                    })
                    .catch((error) => {
                        console.log(error);
                        reject(
                            Exceptions.generateException(
                                PedidoResponse.Codes.InternalServerError,
                                PedidoResponse.Messages.RegisterError,
                                PedidoResponse.Details.DbError
                            )
                        );
                    });
            } catch (error) {
                reject(error);
            }
        });
    }

    getList(dataPedido) {
        return new Promise(function (resolve, reject) {
            let obj = new Object();
            obj.data = dataPedido;
            try {
                Pedido.find(obj)
                    .then((data) => {
                        try {
                            const jsonSucess = Sucess.generateUserJsonSucess(
                                200,
                                data
                            );

                            resolve(jsonSucess);
                        } catch (error) {
                            console.log(error);
                        }
                    })
                    .catch((error) => {
                        console.log(error);
                        reject(
                            Exceptions.generateException(
                                PedidoResponse.Codes.InternalServerError,
                                PedidoResponse.Messages.RegisterError,
                                PedidoResponse.Details.DbError
                            )
                        );
                    });
            } catch (error) {
                reject(error);
            }
        });
    }
}

module.exports = PedidoDao;
