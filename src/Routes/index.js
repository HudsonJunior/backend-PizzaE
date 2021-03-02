
module.exports = function (server) {
    require('../Controllers/ProdutosFinaisController')(server)
    require('../Controllers/PedidoController')(server)
}