/* imports */

ProdutosFinaisDao = require('../Daos/ProdutosFinaisDao');
/* Global variables*/
const exceptionsClass = require('./../Models/Responses/Exceptions');

var produtosFinaisService;
var produtosFinaisDao;
const Exceptions = new exceptionsClass();

/* */

class ProdutosFinaisService {
    constructor() {
        produtosFinaisService = this;
        produtosFinaisDao = new ProdutosFinaisDao();
    }

    create(ProdutoModel) {
        return new Promise(function (resolve, reject) {
            try {
                produtosFinaisDao
                    .findOne(ProdutoModel)
                    .then((result) => {
                        if (result)
                            reject(
                                Exceptions.generateException(
                                    400,
                                    'Produto com mesmo nome ou código já cadastrado',
                                    'Não é possivel cadastrar um produto com mesmo código ou nome'
                                )
                            );
                        else {
                            if (ProdutoModel.fim_promo < ProdutoModel.inicio_promo) {
                                reject(
                                    Exceptions.generateException(
                                        400,
                                        'Data final menor que data inicial',
                                        'A data inicial da promoção deve ser menor que a data final'
                                    )
                                );
                            }
                            else if (ProdutoModel.inicio_promo && ProdutoModel.inicio_promo != "" && new Date(ProdutoModel.inicio_promo) < new Date()) {
                                reject(
                                    Exceptions.generateException(
                                        400,
                                        'Data inicial menor que dia atual',
                                        'A data inicial deve ser superior ou igual ao dia atual'
                                    )
                                );
                            }
                            if (ProdutoModel.valor < 0) {
                                reject(
                                    Exceptions.generateException(
                                        400,
                                        'Valor do produto com valor negativo',
                                        'Só é permitido valores positivos'
                                    )
                                );
                            }
                            else if (ProdutoModel.peso != null && ProdutoModel.peso < 0) {
                                reject(
                                    Exceptions.generateException(
                                        400,
                                        'Peso do produto com valor negativo',
                                        'Só é permitido pesos positivos'
                                    )
                                );
                            }
                            else if (ProdutoModel.valor < 1 || ProdutoModel.valor > 1000) {
                                reject(
                                    Exceptions.generateException(
                                        400,
                                        'Valor fora do intervalo definido',
                                        'O valor informado não está no intervalo definido de [1,00, 1.000]'
                                    )
                                );
                            }
                            else if (ProdutoModel.peso != null && (ProdutoModel.peso < 1 || ProdutoModel.peso > 15000)) {
                                reject(
                                    Exceptions.generateException(
                                        400,
                                        'Peso fora do intervalo definido',
                                        'O peso informado não está no intervalo definido de [1, 1000]'
                                    )
                                );
                            }
                            else {
                                produtosFinaisDao
                                    .create(ProdutoModel)
                                    .then((result) => {
                                        resolve(result);
                                    })
                                    .catch(error => {
                                        console.log(error)

                                        reject(error)
                                    })
                            }
                        }
                    })
                    .catch(error => {
                        console.log(error)
                        reject(error)
                    });
            } catch (error) {
                reject(error);
            }
        });
    }

    update(ProdutoModel) {
        return new Promise(function (resolve, reject) {
            try {
                let produto;

                produtosFinaisDao
                    .findOne(ProdutoModel)
                    .then((result) => {
                        produto = result;

                        if (produto) {
                            if (produto.nome != ProdutoModel.nome) {
                                reject(Exceptions.generateException(400, "Alteração de nome do produto não é permitido", "Não é possível realizar a alteração do código ou nome de um produto"))
                            }
                            else {

                                if (ProdutoModel.fim_promo < ProdutoModel.inicio_promo) {
                                    reject(
                                        Exceptions.generateException(
                                            400,
                                            'Data final menor que data inicial',
                                            'A data inicial da promoção deve ser menor que a data final'
                                        )
                                    );
                                }
                                else if (ProdutoModel.inicio_promo && ProdutoModel.inicio_promo != "" && new Date(ProdutoModel.inicio_promo) < new Date()) {
                                    reject(
                                        Exceptions.generateException(
                                            400,
                                            'Data inicial menor que dia atual',
                                            'A data inicial deve ser superior ou igual ao dia atual'
                                        )
                                    );
                                }
                                if (ProdutoModel.valor < 0) {
                                    reject(
                                        Exceptions.generateException(
                                            400,
                                            'Valor do produto com valor negativo',
                                            'Só é permitido valores positivos'
                                        )
                                    );
                                }
                                else if (ProdutoModel.peso != null && ProdutoModel.peso < 0) {
                                    reject(
                                        Exceptions.generateException(
                                            400,
                                            'Peso do produto com valor negativo',
                                            'Só é permitido pesos positivos'
                                        )
                                    );
                                }
                                else if (ProdutoModel.valor < 1 || ProdutoModel.valor > 1000) {
                                    reject(
                                        Exceptions.generateException(
                                            400,
                                            'Valor fora do intervalo definido',
                                            'O valor informado não está no intervalo definido de [1,00, 1.000]'
                                        )
                                    );
                                }
                                else if (ProdutoModel.peso != null && (ProdutoModel.peso < 1 || ProdutoModel.peso > 15000)) {
                                    reject(
                                        Exceptions.generateException(
                                            400,
                                            'Peso fora do intervalo definido',
                                            'O peso informado não está no intervalo definido de [1, 1000]'
                                        )
                                    );
                                }
                                else {
                                    produtosFinaisDao.update(ProdutoModel)
                                        .then(result => {
                                            resolve(result)
                                        })
                                        .catch(error => {
                                            reject(error)
                                        })
                                        .catch((error) => {
                                            reject(error);
                                        });
                                }
                            }
                        } else {
                            reject(
                                Exceptions.generateException(
                                    400,
                                    'Produto não encontrado',
                                    'Não foi encontrado nenhum produto com esse nome ou código para alteração'
                                )
                            );
                        }
                    })
                    .catch((error) => {
                        reject(error);
                    });
            } catch (error) {
                reject(error);
            }
        });
    }

    get(ProdutoModel) {
        return new Promise(function (resolve, reject) {
            try {
                if (ProdutoModel.nome) {
                    produtosFinaisDao
                        .findFromName(ProdutoModel)
                        .then((result) => {
                            if (result) resolve(result);
                            else {
                                reject(
                                    Exceptions.generateException(
                                        400,
                                        'Produto não encontrado',
                                        'Não foi encontrado nenhum produto com esse nome ou código'
                                    )
                                );
                            }
                        })
                        .catch((error) => {
                            reject(error);
                        });
                } else {
                    produtosFinaisDao
                        .list(ProdutoModel.ativado)
                        .then((result) => {
                            if (result) resolve(result);
                            else {
                                reject(
                                    Exceptions.generateException(
                                        400,
                                        'Produto não encontrado',
                                        'Não foi encontrado nenhum produto com esse nome ou código'
                                    )
                                );
                            }
                        })
                        .catch((error) => {
                            reject(error);
                        });
                }
            } catch (error) {
                reject(error);
            }
        });
    }

    delete(ProdutoModel) {
        return new Promise(function (resolve, reject) {
            try {
                ProdutoModel.ativado = false;

                produtosFinaisDao
                    .delete(ProdutoModel)
                    .then((result) => {
                        resolve(result);
                    })
                    .catch((error) => {
                        reject(error);
                    });
            } catch (error) {
                reject(error);
            }
        });
    }

    existemProdutos(produtos) {
        return new Promise(function (resolve, reject) {
            try {
                var produtoEncontrado = false;
                produtos.map((produto) => {
                    produtosFinaisDao
                        .findOne(produto)
                        .then((result) => {
                            resolve();
                        })
                        .catch((error) => {
                            produtoEncontrado = false;
                            reject(error);
                        });
                });
            } catch (error) {
                reject(error);
            }
        });
    }
}

module.exports = ProdutosFinaisService;
