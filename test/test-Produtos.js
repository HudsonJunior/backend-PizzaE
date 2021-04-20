const request = require('request');
const expect = require('chai').expect;

const baseUrl = 'http://localhost:8080';

const postTestSuccess = {
    nome: 'Testando 1',
    valor: '50',
    ingredientes: 'Testando',
    ativado: true,
    adicionais: '',
    tipo: 'Pizza',
    inicio_promo: '2021-04-25T15:32',
    fim_promo: '2021-04-30T15:32',
    valor_promocional: '50'
};

const postTestError1 = {
    nome: 'Testando 2',
    valor: '50',
    ingredientes: 'Testando',
    ativado: true,
    adicionais: '',
    tipo: 'Pizza',
    inicio_promo: '2021-03-10T15:32',
    fim_promo: '2021-04-15T15:32',
    valor_promocional: '50'
};

const postTestError2 = {
    nome: 'Testando 3',
    valor: '50',
    ingredientes: 'Testando',
    ativado: true,
    adicionais: '',
    tipo: 'Pizza',
    inicio_promo: '2021-04-19T15:32',
    fim_promo: '2021-04-10T15:32',
    valor_promocional: '50'
};

const postTestError11 = {
    nome: 'Testando 4',
    valor: '50',
    ingredientes: 'Testando',
    ativado: true,
    adicionais: '',
    tipo: 'Pizza',
    inicio_promo: '2021-4-20T15:32',
    fim_promo: '2021-04-19T15:32',
    valor_promocional: '50'
};

const postTestError12 = {
    nome: 'Testando 5 ',
    valor: '50',
    ingredientes: 'Testando',
    ativado: true,
    adicionais: '',
    tipo: 'Pizza',
    inicio_promo: '2021-04-19T15:32',
    fim_promo: '2021-04-02T15:32',
    valor_promocional: '50'
};

const postTestSucces13 = {
    nome: 'Testando 6',
    valor: '50',
    ingredientes: 'Testando',
    ativado: true,
    adicionais: '',
    tipo: 'Pizza',
    inicio_promo: '2021-04-21T15:32',
    fim_promo: '2021-04-30T15:32',
    valor_promocional: '50'
};

const postTestError21 = {
    nome: 'Testando 7',
    valor: -50,
    ingredientes: 'Testando',
    ativado: true,
    adicionais: '',
    tipo: 'Pizza',
    inicio_promo: '2021-04-20T15:32',
    fim_promo: '2021-04-25T15:32',
    valor_promocional: '50'
};

const postTestSuccess22 = {
    nome: 'Testando 8',
    valor: 2,
    ingredientes: 'Testando',
    ativado: true,
    adicionais: '',
    tipo: 'Pizza',
    inicio_promo: '2021-04-20T15:32',
    fim_promo: '2021-04-25T15:32',
    valor_promocional: '50'
};

const postTestError23 = {
    nome: 'Testando 9',
    valor: 1001,
    ingredientes: 'Testando',
    ativado: true,
    adicionais: '',
    tipo: 'Pizza',
    inicio_promo: '2021-04-20T15:32',
    fim_promo: '2021-04-25T15:32',
    valor_promocional: '50'
};

const postTestError31 = {
    nome: 'Testando 10',
    valor: 50,
    ativado: true,
    peso: -50,
    tipo: 'Normal',
    inicio_promo: '2021-04-20T15:32',
    fim_promo: '2021-04-25T15:32',
    valor_promocional: '50'
};

const postTestError32 = {
    nome: 'Testando 11',
    valor: 50,
    ativado: true,
    peso: 50,
    tipo: 'Normal',
    inicio_promo: '2021-04-20T15:32',
    fim_promo: '2021-04-25T15:32',
    valor_promocional: '50'
};

const postTestError33 = {
    nome: 'Testando 12',
    valor: 50,
    ativado: true,
    peso: 20000,
    tipo: 'Normal',
    inicio_promo: '2021-04-20T15:32',
    fim_promo: '2021-04-25T15:32',
    valor_promocional: '50'
};

describe('Criação de produtos (Particionamento de equivalência)', () => {
    describe('Data inicial de promoção (Classe 1)', () => {
        it('Deverá criar o produto corretamente, pois a data está correta.', done => {
            request.post(
                {
                    headers: { 'content-type': 'application/json' },
                    url: `${baseUrl}/produtos-finais`,
                    body: JSON.stringify(postTestSuccess)
                },
                (error, response, body) => {
                    const obj = JSON.parse(response.body)
                    expect(response.statusCode).to.equal(200);
                    expect(obj.message).to.equal("Produto registrado com sucesso");
                    done();
                }
            );
        });
    });

    describe('Data inicial de promoção (Classe 2)', () => {
        it('Não deverá criar o produto, pois a data está inválida (Data inicial menor que dia atual).', done => {
            request.post(
                {
                    headers: { 'content-type': 'application/json' },
                    url: `${baseUrl}/produtos-finais`,
                    body: JSON.stringify(postTestError1)
                },
                (error, response, body) => {
                    const obj = JSON.parse(response.body)
                    expect(response.statusCode).to.equal(400);
                    expect(obj.message).to.equal("Data inicial menor que dia atual");
                    done();
                }
            );
        });
    });

    describe('Data inicial de promoção (Classe 3)', () => {
        it('Não deverá criar o produto, pois a data está inválida (Data final inferior a data inicial).', done => {
            request.post(
                {
                    headers: { 'content-type': 'application/json' },
                    url: `${baseUrl}/produtos-finais`,
                    body: JSON.stringify(postTestError2)
                },
                (error, response, body) => {
                    const obj = JSON.parse(response.body)
                    expect(response.statusCode).to.equal(400);
                    expect(obj.message).to.equal("Data final menor que data inicial");
                    done();
                }
            );
        });
    });

    describe('Data final de promoção (Classe 1)', () => {
        it('Não deverá criar o produto, pois a data está inválida (Data final inferior o dia atual).', done => {
            request.post(
                {
                    headers: { 'content-type': 'application/json' },
                    url: `${baseUrl}/produtos-finais`,
                    body: JSON.stringify(postTestError11)
                },
                (error, response, body) => {
                    const obj = JSON.parse(response.body)
                    expect(response.statusCode).to.equal(400);
                    expect(obj.message).to.equal("Data final menor que data inicial");
                    done();
                }
            );
        });
    });

    describe('Data final de promoção (Classe 2)', () => {
        it('Não deverá criar o produto, pois a data está inválida (Data final inferior a data inicial).', done => {
            request.post(
                {
                    headers: { 'content-type': 'application/json' },
                    url: `${baseUrl}/produtos-finais`,
                    body: JSON.stringify(postTestError12)
                },
                (error, response, body) => {
                    const obj = JSON.parse(response.body)
                    expect(response.statusCode).to.equal(400);
                    expect(obj.message).to.equal("Data final menor que data inicial");
                    done();
                }
            );
        });
    });

    describe('Data final de promoção (Classe 3)', () => {
        it('Deverá criar o produto, pois a data está válida.', done => {
            request.post(
                {
                    headers: { 'content-type': 'application/json' },
                    url: `${baseUrl}/produtos-finais`,
                    body: JSON.stringify(postTestSucces13)
                },
                (error, response, body) => {
                    const obj = JSON.parse(response.body)
                    expect(response.statusCode).to.equal(200);
                    expect(obj.message).to.equal("Produto registrado com sucesso");
                    done();
                }
            );
        });
    });
});

describe('Criação de produtos (Analise de valor limite)', () => {
    describe('Valor do produto (Caso de teste 1)', () => {
        it('Não deverá criar o produto corretamente, pois só é permitido valores positivos.', done => {
            request.post(
                {
                    headers: { 'content-type': 'application/json' },
                    url: `${baseUrl}/produtos-finais`,
                    body: JSON.stringify(postTestError21)
                },
                (error, response, body) => {
                    const obj = JSON.parse(response.body)
                    expect(response.statusCode).to.equal(400);
                    expect(obj.message).to.equal("Valor do produto com valor negativo");
                    done();
                }
            );
        });
    });

    describe('Valor do produto (Caso de teste 2 e 3)', () => {
        it('Deverá criar o produto corretamente, pois valor está dentro do intervalo definido.', done => {
            request.post(
                {
                    headers: { 'content-type': 'application/json' },
                    url: `${baseUrl}/produtos-finais`,
                    body: JSON.stringify(postTestSuccess22)
                },
                (error, response, body) => {
                    const obj = JSON.parse(response.body)
                    expect(response.statusCode).to.equal(200);
                    expect(obj.message).to.equal("Produto registrado com sucesso");
                    done();
                }
            );
        });
    });

    describe('Valor do produto (Caso de teste 4 e 5)', () => {
        it('Não deverá criar o produto corretamente, pois o valor está com valor negativo', done => {
            request.post(
                {
                    headers: { 'content-type': 'application/json' },
                    url: `${baseUrl}/produtos-finais`,
                    body: JSON.stringify(postTestError23)
                },
                (error, response, body) => {
                    const obj = JSON.parse(response.body)
                    expect(response.statusCode).to.equal(400);
                    expect(obj.message).to.equal("Valor fora do intervalo definido");
                    done();
                }
            );
        });
    });

    describe('Peso do produto (Caso de teste 1)', () => {
        it('Não deverá criar o produto corretamente, pois só é permitido pesos positivos.', done => {
            request.post(
                {
                    headers: { 'content-type': 'application/json' },
                    url: `${baseUrl}/produtos-finais`,
                    body: JSON.stringify(postTestError31)
                },
                (error, response, body) => {
                    const obj = JSON.parse(response.body)
                    expect(response.statusCode).to.equal(400);
                    expect(obj.message).to.equal("Peso do produto com valor negativo");
                    done();
                }
            );
        });
    });

    describe('Peso do produto (Caso de teste 2 e 3)', () => {
        it('Deverá criar o produto corretamente, pois o peso está correto', done => {
            request.post(
                {
                    headers: { 'content-type': 'application/json' },
                    url: `${baseUrl}/produtos-finais`,
                    body: JSON.stringify(postTestError32)
                },
                (error, response, body) => {
                    const obj = JSON.parse(response.body)
                    expect(response.statusCode).to.equal(200);
                    expect(obj.message).to.equal("Produto registrado com sucesso");
                    done();
                }
            );
        });
    });

    describe('Peso do produto (Caso de teste 4 e 5)', () => {
        it('Não deverá criar o produto corretamente, pois o peso não está dentro do intervalo definido', done => {
            request.post(
                {
                    headers: { 'content-type': 'application/json' },
                    url: `${baseUrl}/produtos-finais`,
                    body: JSON.stringify(postTestError33)
                },
                (error, response, body) => {
                    const obj = JSON.parse(response.body)
                    expect(response.statusCode).to.equal(400);
                    expect(obj.message).to.equal("Peso fora do intervalo definido");
                    done();
                }
            );
        });
    });
});