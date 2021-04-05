// Relatorio vai depender do pedido
class RelatorioSatisfacaoModel {

    constructor(data) {
        
        this.id = data.id
        this.pedido = data.pedido // Precisamos dos produtos pedidos e a data
        this.opniao = data.opniao
    }
}

module.exports = RelatorioSatisfacaoModel