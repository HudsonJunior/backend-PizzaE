class MovimentacoesEstoqueModel {
    
    constructor(data) {
        this.idProduto = data.idProduto
        this.data = data.data
        this.acao = data.acao
        //this.usuario = data.usuario
    }
}

module.exports = MovimentacoesEstoqueModel