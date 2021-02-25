
class Pedido {

    constructor(data) {
        this.produtos = data.produtos // lista de produtos: {codigo:"" quantidade:""}
        this.codigo = data.codigo
        this.formaPagamento = data.formaPagamento
        this.formaExpedicao = data.formaExpedicao
        this.data = data.data
        this.cpf = data.cpf
        this.observacoes = data.observacoes
        this.status = data.status
    }
}

module.exports = Pedido