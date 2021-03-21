/* imports */
const Cpf = require('../Common/Cpf');
const string = require('../Common/String');
const Date = require('../Common/Date');
const ClientesService = require('./ClientesService');
PedidoDao = require('../Daos/PedidoDao');
const exceptionsClass = require('../Models/Responses/Exceptions');
const PedidoResponse = require('../Models/Responses/PedidoResponse');
const ProdutosFinaisService = require('./ProdutosFinaisService');
const Helper = require('../Common/Helper');
ProdutosFinaisDao = require('../Daos/ProdutosFinaisDao');
/* Global variables*/
const Exceptions = new exceptionsClass();
var pedidoService;
var pedidoDao;
var produtosFinaisDao;
/* */

class PedidoService {
    constructor() {
        pedidoService = this;
        pedidoDao = new PedidoDao();
        produtosFinaisDao = new ProdutosFinaisDao();
    }

    async create(pedidoModel) {
        return new Promise(async function (resolve, reject) {
            try {
                /* const validateCode = await pedidoService.validateCode(
                    pedidoModel.codigo
                ); */

                const validatePagamento = await pedidoService.validatePagamento(
                    pedidoModel.formaPagamento
                );
                const validateExpedicao = await pedidoService.validateExpedicao(
                    pedidoModel.formaExpedicao
                );
                /* const validateClient = await pedidoService.validateClient(
                    pedidoModel.formaExpedicao,
                    pedidoModel.cpfCliente
                ); */
                const validateData = await pedidoService.validateData(
                    pedidoModel.data
                );
                const validadeCpfClient = await pedidoService.validateCpfCliente(
                    pedidoModel.cpfCliente
                );
                const validadeCpfNF = await pedidoService.validateCpfNF(
                    pedidoModel.cpfNF
                );
                const validateStatusPedido = await pedidoService.validateStatusPedido(
                    pedidoModel.statusPedido
                );
                const validateValor = await pedidoService.validateValor(
                    pedidoModel.valor
                );
                const validateStatusPagamento = await pedidoService.validateStatusPagamento(
                    pedidoModel.statusPagamento
                );

                pedidoModel.cpfCliente = string.getOnlyNumbers(
                    pedidoModel.cpfCliente
                );
                pedidoModel.cpfNF = string.getOnlyNumbers(pedidoModel.cpfNF);

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

    validatePagamento(formaPagamento) {
        return new Promise(function (resolve, reject) {
            try {
                if (
                    string.validateOnlyLetters(formaPagamento) &&
                    (formaPagamento == 'dinheiro' || formaPagamento == 'cartao')
                ) {
                    console.log('passou do teste da forma de pagamento');
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
                    (formaExpedicao == 'balcao' || formaExpedicao == 'entrega')
                ) {
                    console.log('passou do teste da forma de expedicao');
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
                if (formaExpedicao == 'entrega') {
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

    validateData(data) {
        return new Promise(function (resolve, reject) {
            try {
                const d = new Date(data);
                if (!d.isValidDate(data)) {
                    reject(
                        Exceptions.generateException(
                            PedidoResponse.Codes.InvalidField,
                            PedidoResponse.Messages.RegisterError,
                            PedidoResponse.Details.InvalidDate
                        )
                    );
                } else {
                    console.log('passou no teste do Data');
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
                if (cpf == '') {
                    console.log('passou no teste do cpf cliente');
                    resolve();
                } else if (!Cpf.validateCpf(cpf)) {
                    reject(
                        Exceptions.generateException(
                            PedidoResponse.Codes.InvalidField,
                            PedidoResponse.Messages.RegisterError,
                            PedidoResponse.Details.InvalidCpfClient
                        )
                    );
                } else {
                    console.log('passou no teste do cpf cliente');
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
                if (cpf == '') {
                    console.log('passou no teste do cpf cliente');
                    resolve();
                } else if (!Cpf.validateCpf(cpf)) {
                    reject(
                        Exceptions.generateException(
                            PedidoResponse.Codes.InvalidField,
                            PedidoResponse.Messages.RegisterError,
                            PedidoResponse.Details.InvalidCpfNF
                        )
                    );
                } else {
                    console.log('passou no teste do cpf nf');
                    resolve();
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
                    status == 'realizado'
                ) {
                    console.log('passou no teste de status do pedido');
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
                //var regex = new Regex(/\d+\.\d{1,2}/);

                var regex = /^(\$|)([1-9]\d{0,2}(\,\d{3})*|([1-9]\d*))(\.\d{2})?$/;
                var passed = valor.match(regex);
                if (passed != null) {
                    console.log('passou no teste do valor');
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
                    (status == 'pago' || status == 'nao pago')
                ) {
                    console.log('passou no teste de status do pagamento');
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

    getListFromDate(dataPedido) {
        return new Promise(function (resolve, reject) {
            try {
                pedidoDao
                    .getListFromDate(dataPedido)
                    .then((result) => {
                        if (result) {
                            resolve(result);
                        } else {
                            reject(
                                Exceptions.generateException(
                                    400,
                                    'Não foi encontrado nenhum pedido com esta data'
                                )
                            );
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

    getListFromClient(cpf) {
        return new Promise(function (resolve, reject) {
            try {
                pedidoDao
                    .getListFromClient(cpf)
                    .then((result) => {
                        if (result) {
                            resolve(result);
                        } else {
                            reject(
                                Exceptions.generateException(
                                    400,
                                    'Não foi encontrado nenhum pedido com este cpf'
                                )
                            );
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

    getListReportFromDate(dataInicio, dataFinal) {
        return new Promise(function (resolve, reject) {
            try {
                pedidoDao
                    .getListReportFromDate(dataInicio, dataFinal)
                    .then((result) => {
                        if (result) {
                            // contar a qtde que cada produto apareceu nesse intervalo de tempo e retorna uma lista de produtos com o id e quantidade
                            let productsArray = new Array();

                            for (var i = 0; i < result.length; i++) {
                                var productsList = result[i]['produtos'];

                                for (var j = 0; j < productsList.length; j++) {
                                    var currentID = productsList[j]['_id'];
                                    var currentName = productsList[j]['nome'];
                                    var currentQtde =
                                        productsList[j]['quantidade'];
                                    var idAlreadyExists = Helper.fieldSearch(
                                        '_id',
                                        currentID,
                                        productsArray
                                    );

                                    if (
                                        productsArray.length === 0 ||
                                        idAlreadyExists === false
                                    ) {
                                        let obj = new Object();

                                        obj['_id'] = currentID;
                                        obj['nome'] = currentName;
                                        obj['quantidade'] = currentQtde;

                                        productsArray.push(obj);
                                    } else {
                                        productsArray[idAlreadyExists][
                                            'quantidade'
                                        ] =
                                            productsArray[idAlreadyExists][
                                                'quantidade'
                                            ] + currentQtde;
                                    }
                                }
                            }
                            resolve(productsArray);
                        } else {
                            reject(
                                Exceptions.generateException(
                                    400,
                                    'Não foi encontrado nenhum pedido neste intervalo de data'
                                )
                            );
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

    getListFromProduct(nomeProduto) {
        return new Promise(function (resolve, reject) {
            try {
                pedidoDao
                    .list()
                    .then((result) => {
                        if (result) {
                            let productsArray = new Array(); //fazer uma relação de quantidade vendida do produto mensalmente dos últimos 6 meses
                            var date = new Date();
                            var month = date.getCurrentMonth();
                            var year = date.getCurrentYear();
                            var pastYear = date.getCurrentPastYear();
                            var lastMonths = date.getLastMonths(
                                month,
                                year,
                                pastYear
                            );
                            var idProduto = null;
                            for (var i = 0; i < 6; i++) {
                                let obj = new Object();

                                obj['_id'] = idProduto;
                                obj['nome'] = nomeProduto;
                                obj['data'] = lastMonths[i];
                                obj['quantidade'] = 0;

                                productsArray.push(obj);
                            }

                            for (var i = 0; i < result.length; i++) {
                                var productsList = result[i]['produtos'];

                                for (var j = 0; j < productsList.length; j++) {
                                    if (productsList[j].nome == nomeProduto) {
                                        idProduto = productsList[j]._id;
                                        var dataPedido = new Array();
                                        var dataPedido = result[i].data.split(
                                            '/'
                                        );
                                        var mesAnoPedido = dataPedido[1].concat(
                                            '/'
                                        );
                                        mesAnoPedido = mesAnoPedido.concat(
                                            dataPedido[2]
                                        );
                                        var indexIntervalo = Helper.fieldSearch(
                                            'data',
                                            mesAnoPedido,
                                            productsArray
                                        );
                                        if (indexIntervalo)
                                            productsArray[
                                                indexIntervalo
                                            ].quantidade =
                                                productsArray[indexIntervalo]
                                                    .quantidade +
                                                productsList[j].quantidade;
                                    }
                                }
                            }

                            for (var i = 0; i < 6; i++) {
                                productsArray[i]._id = idProduto;
                            }

                            resolve(productsArray);
                        } else {
                            reject(
                                Exceptions.generateException(
                                    400,
                                    'Não foi encontrado nenhum pedido '
                                )
                            );
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
}

module.exports = PedidoService;
