const request = require('request');
const expect = require('chai').expect;

const baseUrl = 'http://localhost:8080/produtos-estoque'

const postTest = { //cadastro padrao
    id: "0",
    loteId: "0",
    nome: "teste_cadastro_estoque",
    valor: "10,89",
    validade: "2021-12-01",
    fabricacao: "1888-10-10",
    registro: "1888-10-10"
}

const mesMaiorTest = { //data com mes maior que 12
    id: "3",
    loteId: "3",
    nome: "teste_mes",
    valor: "09,99",
    validade: "2021-14-01",
    fabricacao: "1888-10-10",
    registro: "1888-10-10"
}


const diaMaiorTest = { //data com dia maior que o limite do mes
    id: "4",
    loteId: "4",
    nome: "teste_dia",
    valor: "19,99",
    validade: "2021-03-40",
    fabricacao: "1888-10-10",
    registro: "1888-10-10"
}

const marcadorTest = { //data com barra no lugar do hifen
  id: "9",
  loteId: "4",
  nome: "teste_marcador",
  valor: "39,99",
  validade: "13/03/2021",
  fabricacao: "1888-10-10",
  registro: "1888-10-10"
}

const formatoTest = { //data com formato errado
  id: "10",
  loteId: "4",
  nome: "teste_formato",
  valor: "10,00",
  validade: "14-02-2021",
  fabricacao: "1888-10-10",
  registro: "1888-10-10"
}

const valorNegativoTest = { //valor do item negativo
    id: "5", 
    loteId: "5",
    nome: "teste_negativo_estoque",
    valor: "-50,00",
    validade: "2021-12-01",
    fabricacao: "1888-10-10",
    registro: "1888-10-10"
}


const valorLimiteTest = { //valor do item extrapola limite de 10.000
    id: "6", 
    loteId: "6",
    nome: "teste_limite_estoque",
    valor: "10001,00",
    validade: "2021-12-01",
    fabricacao: "1888-10-10",
    registro: "1888-10-10"
}

const intervalo1Test = { //valor do item esta no intervalo permitido
    id: "7", 
    loteId: "7",
    nome: "teste_intervalo1_estoque",
    valor: "0,00",
    validade: "2021-12-01",
    fabricacao: "1888-10-10",
    registro: "1888-10-10"
}

const intervalo2Test = { //valor do item esta no intervalo permitido
    id: "8", 
    loteId: "8",
    nome: "teste_intervalo2_estoque",
    valor: "10000,00",
    validade: "2021-12-01",
    fabricacao: "1888-10-10",
    registro: "1888-10-10"
}

describe('Estoque', () => {
    describe('Testes CRUD', () => {
      it('Deveria criar um novo item no estoque e retornar status 201', done => {
        request.post(
          {
            headers: {'content-type': 'application/json'},
            url: `${baseUrl}`,
            body: JSON.stringify(postTest)
          },
          (error, response, body) => {
            const obj = JSON.parse(response.body);
            expect(response.statusCode).to.equal(201);
            expect(obj.data).to.equal('Cadastro feito com sucesso');
            done();
          }
        );
      });

      it('Deveria retornar erro ao cadastrar um item com mes maior que 12, e status 400', done => {
        request.post(
          {
            headers: {'content-type': 'application/json'},
            url: `${baseUrl}`,
            body: JSON.stringify(mesMaiorTest)
          },
          (error, response, body) => {
           
            const obj = JSON.parse(response.body);
  
            expect(response.statusCode).to.equal(400);
            expect(obj.message).to.equal('Cadastro falhou! Campo com erro.');
            done();
          }
        );
      });

      it('Deveria retornar erro ao cadastrar um item com dia maior que o do mes, e status 400', done => {
        request.post(
          {
            headers: {'content-type': 'application/json'},
            url: `${baseUrl}`,
            body: JSON.stringify(diaMaiorTest)
          },
          (error, response, body) => {
           
            const obj = JSON.parse(response.body);
  
            expect(response.statusCode).to.equal(400);
            expect(obj.message).to.equal('Cadastro falhou! Campo com erro.');
            done();
          }
        );
      });

      it('Deveria retornar erro ao cadastrar um item com data no formato errado, e status 400', done => {
        request.post(
          {
            headers: {'content-type': 'application/json'},
            url: `${baseUrl}`,
            body: JSON.stringify(formatoTest)
          },
          (error, response, body) => {
           
            const obj = JSON.parse(response.body);
  
            expect(response.statusCode).to.equal(400);
            expect(obj.message).to.equal('Cadastro falhou! Campo com erro.');
            done();
          }
        );
      });

      it('Deveria retornar erro ao cadastrar um item com data usando marcador errado, e status 400', done => {
        request.post(
          {
            headers: {'content-type': 'application/json'},
            url: `${baseUrl}`,
            body: JSON.stringify(marcadorTest)
          },
          (error, response, body) => {
           
            const obj = JSON.parse(response.body);
  
            expect(response.statusCode).to.equal(400);
            expect(obj.message).to.equal('Cadastro falhou! Campo com erro.');
            done();
          }
        );
      });

      it('Deveria retornar erro ao cadastrar um item com valor negativo, e status 400', done => {
        request.post(
          {
            headers: {'content-type': 'application/json'},
            url: `${baseUrl}`,
            body: JSON.stringify(valorNegativoTest)
          },
          (error, response, body) => {
           
            const obj = JSON.parse(response.body);
  
            expect(response.statusCode).to.equal(400);
            expect(obj.message).to.equal('Cadastro falhou!');
            done();
          }
        );
      });

      it('Deveria retornar erro ao cadastrar um item com valor maior que o limite, e status 400', done => {
        request.post(
          {
            headers: {'content-type': 'application/json'},
            url: `${baseUrl}`,
            body: JSON.stringify(valorLimiteTest)
          },
          (error, response, body) => {
           
            const obj = JSON.parse(response.body);
  
            expect(response.statusCode).to.equal(400);
            expect(obj.message).to.equal('Cadastro falhou!');
            done();
          }
        );
      });

      it('Deveria criar um novo item no estoque com o valor 0 e retornar status 201', done => {
        request.post(
          {
            headers: {'content-type': 'application/json'},
            url: `${baseUrl}`,
            body: JSON.stringify(intervalo1Test)
          },
          (error, response, body) => {
           
            const obj = JSON.parse(response.body);
  
            expect(response.statusCode).to.equal(201);
            expect(obj.data).to.equal('Cadastro feito com sucesso');
            done();
          }
        );
      });

      it('Deveria criar um novo item no estoque com valor 10,000 e retornar status 201', done => {
        request.post(
          {
            headers: {'content-type': 'application/json'},
            url: `${baseUrl}`,
            body: JSON.stringify(intervalo2Test)
          },
          (error, response, body) => {
           
            const obj = JSON.parse(response.body);
  
            expect(response.statusCode).to.equal(201);
            expect(obj.data).to.equal('Cadastro feito com sucesso');
            done();
          }
        );
      });

    });
});

