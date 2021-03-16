class Pedido {
    constructor(data) {
        this.codigo = data.codigo;
        this.produtos = data.produtos; // lista de produtos: {codigo:"1" quantidade:"1"}
        this.formaPagamento = data.formaPagamento;
        this.formaExpedicao = data.formaExpedicao;
        this.endereco = data.endereco;
        this.data = data.data;
        this.cpfCliente = data.cpfCliente;
        this.cpfNF = data.cpfNF;
        this.observacoes = data.observacoes;
        this.statusPedido = data.statusPedido;
        this.valor = data.valor;
        this.statusPagamento = data.statusPagamento;
    }
}

module.exports = Pedido;
