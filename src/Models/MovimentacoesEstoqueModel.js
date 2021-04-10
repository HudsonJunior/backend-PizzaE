class MovimentacoesEstoqueModel {
    constructor(data) {
        this.idProduto = data.idProduto;
        this.nomeProduto = data.nomeProduto;
        this.data = data.data;
        this.acao = data.acao;
        //this.usuario = data.usuario
    }
}

module.exports = MovimentacoesEstoqueModel;
