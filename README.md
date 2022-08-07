# ETC ACADEMY GRAPHQL MONOREPO

Monorepo para o protótipo da nossa web app chamada ETC Academy.

## Instalação

```bash
~ yarn install
~ cd apps/users yarn install
~ cd ../courses yarn install
~ cd ../gateway yarn install
~ cd ../auth yarn install
```

## Configuração

Ir a todos os serviços e ver na pasta /src/config/validation.ts ver que variáveis de ambiente são obrigatórias.
Depois de saber quais são, criar um ficheiro .env com as mesmas em cada serviço.

## Preparação para Correr

Em terminais diferentes

```bash
~ docker-compose up
~ cd apps/users migrate:create
~ cd ../courses migrate:create
```

## Correr

```bash
~ cd apps/users yarn start:dev
~ cd ../courses yarn start:dev
~ cd ../gateway yarn start:dev
~ cd ../auth yarn start:dev
```

URL de teste: http://localhost:5000/graphql

## Arquitetura

### 2 Micro-serviços:

* **Users:** Tem uma implementação básica dos utilizadores e instituições, relacionados pela tabela dos perfis.
* **Courses:** Tem uma implementação básica dos cursos, só com um nível de profundidade sobre as aulas.

### 2 Gateways:

* **Gateway:** Federated Gateway da Apollo para GraphQL onde junta os dois micro-serviços num super-esquema que onde se
  pode fazer queries em cima.
* **Auth:** Micro-serviço que implementa o serviço de autenticação OAuth Local com JWT em REST.


