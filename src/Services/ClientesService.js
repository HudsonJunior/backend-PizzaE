/* imports */

const string = require('./../Common/String')

const ClientesDao = require('../Daos/ClientesDao')
const { validateCpf } = require('../Common/Cpf')

/* Global variables*/

var clientesService
var clientesDao = new ClientesDao()
/* */

class ClientesService {
    constructor() {
        clientesService = this
    }

    async create(ClientesModel) {
        console.log("estou no service");
        console.log(ClientesModel);
        return new Promise(async function (resolve, reject) {
            try {
                /*
                const validarClientes = await ClientesService.validarClientes(ClientesModel.cliente)
                const validarEmail = await ClientesService.validarEmail(ClientesModel.email)
                const validarNome = await ClientesService.validarNome(ClientesModel.nome)
                const validarCpf = await ClientesService.validarCpf(ClientesModel.Cpf)
                const validarPassword = await ClientesService.validarPassword(ClientesModel.password)
                const validarTelefone = await ClientesService.validarTelefone(ClientesModel.telefone)
                const validarEndereco = await ClientesService.validarEndereco(ClientesModel.endereco)
                */
                aux1 = ClientesModel.cpf
                cpfFlag = validateCpf(aux1)

                if(!cpfFlag){
                    console.log("Cpf inserido eh invalido")
                    ClientesModel.cpf = "Cpf ta errado"
                }
                ClientesModel.password = string.validatePassword(ClientesModel.password)
                ClientesModel.nome = string.validateOnlyLetters(ClientesModel.nome)
                ClientesModel.endereco = string.validateOnlyLetters(ClientesModel.endereco)
                ClientesModel.telefone = string.getOnlyNumbers(ClientesModel.telefone)

                clientesDao.create(ClientesModel)
                    
                    .then(result => {
                        result.cash_token = AuthValue.cash_token

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

    delete(ClientesModel) {
        return new Promise(function (resolve, reject) {
            try {
                ClientesModel.ativado = false;

                ClientesDao.delete(ClientesModel)
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


    getClientesList(cpfClientes) {
        return new Promise(function (resolve, reject) {
            try {

                clientesDao.get(cpfClientes)
                    .then(result => {
                        result.cash_token = AuthValue.cash_token

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
                    })
                    .catch(error => {
                        reject(error)
                    });

                if (cliente.cpf != ClientesModel.cpf || cliente.cpf != ClientesModel.cpf) {
                    reject(Exceptions.generateException(400, "Alteração do cpf/cnpj de um cliente não é permitido", "Não é possível realizar a alteração do cpf de um cliente"))
                }
                else {
                    clientesDao.update(ClientesModel)
                        .then(result => {
                            resolve(result)
                        })
                        .catch(error => {
                            reject(error)
                        })
                }
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