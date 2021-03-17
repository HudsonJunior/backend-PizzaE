
class ClientesModel {

    constructor(data) {
        this.nome = data.nome;
        this.endereco =data.endereco;
        this.email=data.email;
        this.cpf = data.cpf;
        this.telefone = data.telefone;
        this.senha = data.senha;
    }
}

module.exports = ClientesModel