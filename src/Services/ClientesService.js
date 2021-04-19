/* imports */
const exceptionsClass = require('./../Models/Responses/Exceptions');
const string = require('./../Common/String')

const ClientesDao = require('../Daos/ClientesDao')
const { validateCpf } = require('../Common/Cpf')

/* Global variables*/

var clientesService
var clientesDao = new ClientesDao()
const Exceptions = new exceptionsClass();
/* */

class ClientesService {
    constructor() {
        clientesService = this
    }

    async create(ClientesModel) {
        //console.log(ClientesModel);
        return new Promise(async function (resolve, reject) {
            try {
                if (validateCpf(ClientesModel.cpf)) {
                    if (ClientesModel.endereco.length <= 40 && ClientesModel.endereco.length >= 3) {
                        clientesDao.findOne(ClientesModel)
                            .then(result => {

                                if (result) {

                                    reject(Exceptions.clientesException(500, 'Erro ao cadastrar cliente', 'cpf existente'))
                                }

                                else {

                                    ClientesModel.password = string.validatePassword(ClientesModel.password)
                                    ClientesModel.nome = string.validateOnlyLetters(ClientesModel.nome)
                                    ClientesModel.endereco = string.validateOnlyLetters(ClientesModel.endereco)
                                    ClientesModel.telefone = string.getOnlyNumbers(ClientesModel.telefone)

                                    clientesDao.create(ClientesModel)

                                        .then(result => {
                                            //result.cash_token = AuthValue.cash_token

                                            resolve(result)
                                        })
                                        .catch(error => {
                                            reject(error)
                                        })

                                }
                            })
                    } else {
                        reject(
                            Exceptions.generateException(
                                400,
                                'Endereço inválido'
                            )
                        );
                    }
                } else {
                    reject(
                        Exceptions.generateException(
                            400,
                            'CPF inválido'
                        )
                    );
                }


            }
            catch (error) {
                reject(error)
            }
        })
    }

    delete(cpfCliente) {

        return new Promise(function (resolve, reject) {
            try {
                clientesDao.delete(cpfCliente)
                    .then(result => {
                        resolve(result)
                    })
                    .catch(error => {
                        reject(error)
                    })

            }
            catch (error) {
                reject(error)
            }
        })
    }


    getCliente(cpfClientes) {
        return new Promise(function (resolve, reject) {
            try {
                console.log("to em buscar cliente cpf eh:")
                console.log(cpfClientes)
                clientesDao.getCliente(cpfClientes)
                    .then(result => {


                        resolve(result)
                    })
                    .catch(error => {
                        reject(error)
                    })
            }
            catch (error) {
                reject(error)
            }
        })
    }

    get() {
        return new Promise(function (resolve, reject) {
            try {

                clientesDao.list()
                    .then(result => {

                        resolve(result)
                    })
                    .catch(error => {
                        reject(error)
                    })
            }
            catch (error) {
                reject(error)
            }
        })
    }

    update(ClientesModel) {
        return new Promise(function (resolve, reject) {
            try {
                console.log("to na update");
                let cliente;

                clientesDao.findOne(ClientesModel)
                    .then(result => {
                        cliente = result;
                        if (cliente.cpf != ClientesModel.cpf) {
                            console.log(cliente)
                            reject(Exceptions.generateException(400, "Alteração do cpf/cnpj de um cliente não é permitido", "Não é possível realizar a alteração do cpf de um cliente"))
                        }
                        else {
                            console.log("to no else")
                            console.log(cliente)

                            // Verificar se os campos pra atualizar sao nulos
                            if (ClientesModel.endereco == null) {
                                ClientesModel.endereco = result.endereco
                            }
                            if (ClientesModel.nome == null) {
                                ClientesModel.nome = result.nome
                            }
                            if (ClientesModel.telefone == null) {
                                ClientesModel.telefone = result.telefone
                            }
                            if (ClientesModel.email == null) {
                                ClientesModel.email = result.email
                            }
                            if (ClientesModel.senha == null) {
                                ClientesModel.senha = result.senha
                            }

                            clientesDao.update(ClientesModel)
                                .then(result => {
                                    resolve(result)
                                })
                                .catch(error => {
                                    reject(error)
                                })
                        }
                    })
                    .catch(error => {
                        reject(error)
                    });


            }
            catch (error) {
                reject(error)
            }
        })

    }

    validarClientes(clientes) {
        return new Promise(function (resolve, reject) {
            try {

                if (!string.validarClientes(clientes)) {
                    reject()
                }

                clientesService.validarPrimaryKey(ClientesValue.clientes, clientes)
                    .then(result => {
                        resolve()
                    })
                    .catch(error => {
                        reject()

                    })
            }
            catch (error) {
                reject(error)
            }
        })
    }

    validarEmail(email) {
        return new Promise(function (resolve, reject) {

            try {
                clientesService.validarPrimaryKey(ClientesValue.email, email)
                    .then(result => {
                        resolve()
                    })
                    .catch(error => {
                        reject(Exceptions.generateException(ClientesResponse.Codes.DuplicatedPrimaryKey, ClientesResponse.Messages.AlreadyRegisted, ClientesResponse.Details.DuplicatedEmail.replace(ClientesValue.emailReplaced, email)))
                    })

            }
            catch (error) {
                reject(error)
            }
        })
    }

    validarCpf(cpf) {
        return new Promise(function (resolve, reject) {
            try {

                if (!Cpf.validarCpf(cpf)) {
                    reject(Exceptions.generateException(ClientesResponse.Codes.InvalidField, ClientesResponse.Messages.RegisterError, ClientesResponse.Details.InvalidCpf))
                }

                cpf = string.getOnlyNumbers(cpf)

                clientesService.validarPrimaryKey(ClientesValue.cpf, cpf)
                    .then(result => {
                        resolve()
                    })
                    .catch(error => {
                        reject(Exceptions.generateException(ClientesResponse.Codes.DuplicatedPrimaryKey, ClientesResponse.Messages.AlreadyRegisted, ClientesResponse.Details.DuplicatedCpf.replace(ClientesValue.cpfReplaced, cpf)))

                    })
            }
            catch (error) {
                reject(error)
            }
        })
    }

    validarPassword(password) {
        return new Promise(function (resolve, reject) {
            try {

                if (string.validarPassword(password)) {
                    resolve()
                }

                else {
                    reject(Exceptions.generateException(ClientesResponse.Codes.InvalidField, ClientesResponse.Messages.RegisterError, ClientesResponse.Details.InvalidPassword))
                }
            }
            catch (error) {
                reject(error)
            }
        })
    }


    validarNome(nome) {
        return new Promise(function (resolve, reject) {

            try {
                if (string.validarOnlyLetters(nome)) {
                    resolve()
                }

                else {
                    reject(Exceptions.generateException(ClientesResponse.Codes.InvalidField, ClientesResponse.Messages.RegisterError, ClientesResponse.Details.InvalidName))
                }
            }

            catch (error) {
                reject(error)
            }
        })
    }

    existeCliente(cpfCliente) {
        return new Promise(function (resolve, reject) {
            try {
                clientesDao.findOne(cpfCliente)
                    .then(result => {
                        resolve()
                    })
                    .catch(error => {
                        reject(error)
                    });

            }
            catch (error) {
                reject(error)
            }
        })
    }

    validarEndereco(endereco) {
        return new Promise(function (resolve, reject) {

            try {
                if (string.validarOnlyLetters(endereco)) {
                    resolve()
                }

                else {
                    reject(Exceptions.generateException(ClientesResponse.Codes.InvalidField, ClientesResponse.Messages.RegisterError, ClientesResponse.Details.InvalidEndereco))
                }
            }

            catch (error) {
                reject(error)
            }
        })
    }

    validarEndereco(telefone) {
        return new Promise(function (resolve, reject) {

            try {
                if (string.validarOnlyLetters(telefone)) {
                    resolve()
                }

                else {
                    reject(Exceptions.generateException(ClientesResponse.Codes.InvalidField, ClientesResponse.Messages.RegisterError, ClientesResponse.Details.InvalidTelefone))
                }
            }

            catch (error) {
                reject(error)
            }
        })
    }





}

module.exports = ClientesService