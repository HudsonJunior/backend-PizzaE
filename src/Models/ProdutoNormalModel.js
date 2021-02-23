
class ProdutoNormalModel {

    constructor(data) {
        this.codigo = data.codigo
        this.valor = data.valor
        this.peso = data.peso
        this.status = data.status
        this.valor_promocional = data.valor_promocional
        this.inicio_promo = data.inicio_promo
        this.fim_promo = data.fim_promo
    }
}

module.exports = ProdutoNormalModel