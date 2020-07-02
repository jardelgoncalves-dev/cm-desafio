# Desafio Casa Magalhães
Objetivo do desafio é criar uma API RESTFul, que permita uma pequena empresa cadastrar suas lojas e produtos. Deve ser possível realizar o cadastro, alteração e remoção das lojas e produtos.

### Demo
[Acessar projeto](https://cm-ten.vercel.app/)
<br />
[Swagger](https://lower-goose-87792.herokuapp.com/api-docs/)

### Tecnologias utilzadas
- Swagger: Documentação da API.
- Node.js v12: Tecnologia utilizada no backend (JS Server Side).
- PostgreSQL: Banco de dados Relacional.
- Sequelize: ORM para realizar o mapeamento dos dados relacionais.
- Babel: Transpilar o código para uma versão suportada em deploy
- Jest: Para realizar testes de integrações e unitários.
- Docker e docker-compose: Para executar o projeto.

### Frontend
Foi desenvolvido também um frontend para a iteração com a API, o mesmo foi desenvolvido em `React.js`;

### Endpoints
#### Lojas
- `GET /store`: Retorna todas as lojas
- `GET /store/:id`: Retorna uma loja e seus produtos
- `POST /store`: Cria uma loja, para isso é preciso informa o `name` (nome) no corpo da requisição. ex: `{ "name": "Loja 1 QX" }`
- `PUT /store/:id`: Altera os dados de uma loja, neste caso somente o `name` (nome)
- `DELETE /store/:id`: Exclui uma loja

#### Lojas
- `GET /product`: Retorna todos os produtos
- `GET /product/:id`: Retorna um produto
- `POST /product`: Cria um produto para isso é preciso enviar:
```json
{
  "name": "Smartphone X",
  "sell": 700.00,   /* preço de venda */
  "stores": [] /* id(s) das lojas que se encontra o produto ou um array vazio */
}
```
- `PUT /product/:id`: Altera os dados de um produto
```json
{
  "name": "Smartphone XX",
  "sell": 670.00,   /* preço de venda */
  "stores": [1] /* id(s) das lojas que se encontra o produto ou um array vazio */
}
```
- `DELETE /product/:id`: Exclui um produto

### Executando projeto (com docker)
- Baixe o [docker](https://docs.docker.com/get-docker/) e o [docker-compose](https://docs.docker.com/compose/install/);

- Acesse o projeto `backend`
- Execute:`npm run dev`
- Após o docker subir todos os containers, execute: `npm run migrate`:
- Em seguida, acesse o projeto `frontend`
- Execute: `npm i &&cnpm start`

### Executando projeto (sem docker)
- Acesse o arquivo `.env.dev` dentro do projeto `backend`;
- Adicione suas configurações do banco de dados;
- Instale as dependências: `npm i`
- Execute: `npm run migrate && npm run dev:start`
- Abra outro terminal e acesse o projeto `frontend`
- Execute: `npm i && npm start`

### Executando Testes
- Execute:`npm run migrate:test`
- **Sem docker:** Caso esteja executando sem o docker, é necessário atualizar o arquivo `.env.test` com as informações do banco de dados para testes. após atualizar as informações execute: `npm run test`
- **Com docker:** Execute: `npm run test:withDocker`


### Possiveis Erros
- `Porta 5432 em uso`:
Caso esteja executando com docker e o banco de dados falhar ao executar `npm run dev`, verifique se vc já possui um container executando o postgres e usando a porta `5432` ou se você possui o postgres instalado em sua máquina. Para contornar esse erro, siga os passos abaixo:
  -  Acesse o projeto `backend`
  - Abra o arquivo `docker-compose.yml`
  - Na linha `12` do arquivo possui o seguinte conteudo: `5432:5432` que se refere ao mapeamento de portas do container para a sua maquina (expor o container ou melhor o serviço do postgres);
  - Altere para: `5678:5432` ou qualquer outro valor para o numero antes de `:` desde que seja **acima de 1024**
  Após escolher alterar o valor, acesse o arquivo `.env.dev` dentro do projeto `backend` e altere o valor de `DB_PORT` para a porta escolhida anteriormente (valor antes do `:`)
