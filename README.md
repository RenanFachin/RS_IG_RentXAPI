## RentX API
API para registros de uma locadora de automóveis.


### Regras de negócio
- [x] Deve ser possível criar uma categoria
- [x] Deve ser possível listar todas categorias existentes
- [x] Deve ser possível realizar a leitura de um arquivo para criação de categorias
- [x] Deve ser possível criar uma especificação

## Configuração do Projeto

Para executar este projeto localmente, siga as etapas abaixo:

```bash
# Clone o repositório
git clone https://github.com/RenanFachin/RS_IG_RentalXAPI.git

# Acesse a pasta do projeto
# Instale as dependências
npm install

# Execute a aplicação em ambiente de desenvolvimento
npm run dev
```

Subindo um container de um database com postgres
```bash
docker-compose up
```

Criando as tabelas (Rodando as migrations)
```bash
npm run typeorm migration:run
```

## Documentação do projeto

Para acessar a documentação, é necessário iniciar o servidor e após isto acessar **http://localhost:3333/api-docs**

### /categories

#### POST
##### Summary:

Create a category

##### Description:

Create a new category

##### Responses

| Code | Description |
| ---- | ----------- |
| 201 | Created |
| 500 | Category already exists |

#### GET
##### Summary:

List all registered categories

##### Responses

| Code | Description |
| ---- | ----------- |
| 200 | Success |

### /categories/import

#### POST
##### Summary:

Upload a new category

##### Description:

Upload a new category

##### Responses

| Code | Description |
| ---- | ----------- |
| 201 | Created |

### /specifications

#### POST
##### Summary:

Create a specification

##### Description:

Create a new specification

##### Responses

| Code | Description |
| ---- | ----------- |
| 201 | Created |
| 500 | Specification already exists |

### Models


#### Specification

| Name | Type | Description | Required |
| ---- | ---- | ----------- | -------- |
| name | string |  | No |
| description | string |  | No |


<!-- Libs utilizadas -->
<!-- https://www.npmjs.com/package/tsx -->
<!-- https://www.npmjs.com/package/uuid -->
<!-- https://www.npmjs.com/package/typescript -->
<!-- https://www.npmjs.com/package/multer --> 
<!-- https://www.npmjs.com/package/csv-parse -->
<!-- https://www.npmjs.com/package/swagger-ui-express -->
<!-- https://typeorm.io/ -->
<!-- https://www.npmjs.com/package/tsyringe -->