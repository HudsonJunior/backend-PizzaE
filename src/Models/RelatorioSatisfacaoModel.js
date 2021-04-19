// Relatorio vai depender do pedido
class RelatorioSatisfacaoModel {

    constructor(data) {

        this.id = data.id
        this.dataSatisfacao = data.dataSatisfacao
        this.produto = data.produto // Precisamos dos produtos pedidos e a data
        this.opniao = data.opniao
        this.cpfCliente = data.cpfCliente
    }
}

module.exports = RelatorioSatisfacaoModel