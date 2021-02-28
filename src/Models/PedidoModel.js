
class Pedido {

    constructor(data) {
        this.produtos = data.produtos // lista de produtos: {codigo:"" quantidade:""}
        this.formaPagamento = data.formaPagamento
        this.formaExpedicao = data.formaExpedicao
        this.endereco = data.endereco
        this.data = data.data
        this.cpfCliente = data.cpfCliente
        this.cpfNF = data.cpfNF
        this.observacoes = data.observacoes
        this.status = data.status
        this.valor = data.valor
    }
}

module.exports = Pedido