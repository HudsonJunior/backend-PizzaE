/* imports */
var Regex = require("regex");
const Cpf = require("../Common/Cpf");
const string = require("../Common/String");
const Date = require("../Common/Date");
const ClientesService = require("./ClientesService");
const PedidoDao = require("../Daos/PedidoDao");
const exceptionsClass = require("../Models/Responses/Exceptions");
const PedidoResponse = require("../Models/Responses/PedidoResponse");
const ProdutosFinaisService = require("./ProdutosFinaisService");
/* Global variables*/
const Exceptions = new exceptionsClass();
var pedidoDao = new PedidoDao();
var pedidoService;
/* */

class PedidoService {
    constructor() {
        pedidoService = this;
    }

    async create(pedidoModel) {
        return new Promise(async function (resolve, reject) {
            try {
                /* const validateCode = await pedidoService.validateCode(
                    pedidoModel.codigo
                ); */
                /* const validateProdutos = await pedidoService.validateProdutos(
                    pedidoModel.produtos
                );
                const validatePagamento = await pedidoService.validatePagamento(
                    pedidoModel.formaPagamento
                );
                const validateExpedicao = await pedidoService.validateExpedicao(
                    pedidoModel.formaExpedicao
                );
                const validateClient = await pedidoService.validateClient(
                    pedidoModel.formaExpedicao,
                    pedidoModel.cpfCliente
                );
                const validateEndereco = await pedidoService.validateEndereco(
                    pedidoModel.endereco
                );
                const validateData = await pedidoService.validateData(
                    pedidoModel.data
                );
                const validadeCpfClient = await pedidoService.validateCpfCliente(
                    pedidoModel.cpfCliente
                );
                const validadeCpfNF = await pedidoService.validateCpfNF(
                    pedidoModel.cpfNF
                );
                const validateObservacoes = await pedidoService.validateObservacoes(
                    pedidoModel.observacoes
                );
                const validateStatusPedido = await pedidoService.validateStatusPedido(
                    pedidoModel.statusPedido
                );
                const validateValor = await pedidoService.validateValor(
                    pedidoModel.valor
                );
                const validateStatusPagamento = await pedidoService.validateStatusPagamento(
                    pedidoModel.statusPagamento
                ); */

                pedidoModel.cpfCliente = string.getOnlyNumbers(
                    pedidoModel.cpfCliente
                );
                pedidoModel.cpfNF = string.getOnlyNumbers(pedidoModel.cpfNF);

                console.log("cheguei aqui");

                pedidoDao
                    .create(pedidoModel)
                    .then((result) => {
                        resolve(result);
                    })
                    .catch((error) => {
                        reject(error);
                    });
            } catch (error) {
                reject(error);
            }
        });
    }

    validateCode(codigo) {
        return new Promise(function (resolve, reject) {
            try {
                pedidoDao
                    .findOne(codigo)
                    .then((result) => {
                        resolve();
                    })
                    .catch((error) => {
                        reject(
                            Exceptions.generateException(
                                PedidoResponse.Codes.DuplicatedPrimaryKey,
                                PedidoResponse.Messages.AlreadyRegisted,
                                PedidoResponse.Details.DuplicatedCode
                            )
                        );
                    });
            } catch (error) {
                reject(error);
            }
        });
    }

    validateProdutos(listaProdutos) {
        return new Promise(function (resolve, reject) {
            try {
                /* if (ProdutosFinaisService.existemProdutos(listaProdutos)){
                    resolve()
                }
                else {
                    reject(Exceptions.generateException(PedidoResponse.Codes.InvalidField,PedidoResponse.Messages.RegisterError, PedidoResponse.Details.InvalidListProducts))
                } */
                resolve();
            } catch (error) {
                reject(error);
            }
        });
    }

    validatePagamento(formaPagamento) {
        return new Promise(function (resolve, reject) {
            try {
                if (
                    string.validateOnlyLetters(formaPagamento) &&
                    (formaPagamento == "dinheiro" || formaPagamento == "cartao")
                ) {
                    resolve();
                } else {
                    reject(
                        Exceptions.generateException(
                            PedidoResponse.Codes.InvalidField,
                            PedidoResponse.Messages.RegisterError,
                            PedidoResponse.Details.InvalidPaymentMethod
                        )
                    );
                }
            } catch (error) {
                reject(error);
            }
        });
    }

    validateExpedicao(formaExpedicao) {
        return new Promise(function (resolve, reject) {
            try {
                if (
                    string.validateOnlyLetters(formaExpedicao) &&
                    (formaExpedicao == "balcao" || formaExpedicao == "entrega")
                ) {
                    resolve();
                } else {
                    reject(
                        Exceptions.generateException(
                            PedidoResponse.Codes.InvalidField,
                            PedidoResponse.Messages.RegisterError,
                            PedidoResponse.Details.InvalidShippingWay
                        )
                    );
                }
            } catch (error) {
                reject(error);
            }
        });
    }

    validateClient(formaExpedicao, cpfCliente) {
        return new Promise(function (resolve, reject) {
            try {
                if (formaExpedicao == "entrega") {
                    ClientesService.getCliente(cpfCliente)
                        .then((result) => {
                            resolve(result);
                        })
                        .catch((error) => {
                            console.log(error);
                            reject(
                                Exceptions.generateException(
                                    PedidoResponse.Codes.InvalidField,
                                    PedidoResponse.Messages.RegisterError,
                                    PedidoResponse.Details.InvalidClient
                                )
                            );
                        });
                }
            } catch (error) {
                reject(error);
            }
        });
    }

    validateEndereco(endereco) {
        return new Promise(function (resolve, reject) {
            try {
                if (string.validateOnlyLetters(endereco)) {
                    resolve();
                } else {
                    reject(
                        Exceptions.generateException(
                            PedidoResponse.Codes.InvalidField,
                            PedidoResponse.Messages.RegisterError,
                            PedidoResponse.Details.InvalidAdress
                        )
                    );
                }
            } catch (error) {
                reject(error);
            }
        });
    }

    validateData(data) {
        return Promise(function (resolve, reject) {
            try {
                if (!Date.isValidDate(data)) {
                    reject(
                        Exceptions.generateException(
                            PedidoResponse.Codes.InvalidField,
                            PedidoResponse.Messages.RegisterError,
                            PedidoResponse.Details.InvalidDate
                        )
                    );
                } else {
                    resolve();
                }
            } catch (error) {
                reject(error);
            }
        });
    }

    validateCpfCliente(cpf) {
        return new Promise(function (resolve, reject) {
            try {
                if (!Cpf.validateCpf(cpf)) {
                    reject(
                        Exceptions.generateException(
                            PedidoResponse.Codes.InvalidField,
                            PedidoResponse.Messages.RegisterError,
                            PedidoResponse.Details.InvalidCpfClient
                        )
                    );
                } else {
                    resolve();
                }
            } catch (error) {
                reject(error);
            }
        });
    }

    validateCpfNF(cpf) {
        return new Promise(function (resolve, reject) {
            try {
                if (!Cpf.validateCpf(cpf)) {
                    reject(
                        Exceptions.generateException(
                            PedidoResponse.Codes.InvalidField,
                            PedidoResponse.Messages.RegisterError,
                            PedidoResponse.Details.InvalidCpfNF
                        )
                    );
                } else {
                    resolve();
                }
            } catch (error) {
                reject(error);
            }
        });
    }

    validateObservacoes(observacoes) {
        return new Promise(function (resolve, reject) {
            try {
                if (string.validateOnlyLetters(observacoes)) {
                    resolve();
                } else {
                    reject(
                        Exceptions.generateException(
                            PedidoResponse.Codes.InvalidField,
                            PedidoResponse.Messages.RegisterError,
                            PedidoResponse.Details.InvalidObservations
                        )
                    );
                }
            } catch (error) {
                reject(error);
            }
        });
    }

    validateStatusPedido(status) {
        return new Promise(function (resolve, reject) {
            try {
                if (
                    string.validateOnlyLetters(status) &&
                    status == "realizado"
                ) {
                    resolve();
                } else {
                    reject(
                        Exceptions.generateException(
                            PedidoResponse.Codes.InvalidField,
                            PedidoResponse.Messages.RegisterError,
                            PedidoResponse.Details.InvalidOrderStatus
                        )
                    );
                }
            } catch (error) {
                reject(error);
            }
        });
    }

    validateValor(valor) {
        return new Promise(function (resolve, reject) {
            try {
                var regex = new Regex(/^\d+(\.\d{2})?$/);
                if (regex.test(valor)) {
                    resolve();
                } else {
                    reject(
                        Exceptions.generateException(
                            PedidoResponse.Codes.InvalidField,
                            PedidoResponse.Messages.RegisterError,
                            PedidoResponse.Details.InvalidOrderValue
                        )
                    );
                }
            } catch (error) {
                reject(error);
            }
        });
    }

    validateStatusPagamento(status) {
        return new Promise(function (resolve, reject) {
            try {
                if (
                    string.validateOnlyLetters(status) &&
                    (status == "pago" || status == "nao pago")
                ) {
                    resolve();
                } else {
                    reject(
                        Exceptions.generateException(
                            PedidoResponse.Codes.InvalidField,
                            PedidoResponse.Messages.RegisterError,
                            PedidoResponse.Details.InvalidPaymentStatus
                        )
                    );
                }
            } catch (error) {
                reject(error);
            }
        });
    }

    get(dataPedido) {
        return new Promise(function (resolve, reject) {
            try {
                pedidoDao
                    .get(dataPedido)
                    .then((result) => {
                        resolve(result);
                    })
                    .catch((error) => {
                        reject(error);
                    });
            } catch (error) {
                reject(error);
            }
        });
    }
}

module.exports = PedidoService;
