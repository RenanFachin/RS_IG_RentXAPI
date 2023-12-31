## RentX API
A RentX API é uma aplicação destinada à gestão e controle de aluguel de veículos. Desenvolvida para proporcionar uma experiência eficiente e segura, a API oferece uma variedade de funcionalidades que abrangem desde o cadastro de usuários até a gestão completa de reservas e devoluções.

## Análise de Requisitos
A RentX API atende a uma série de requisitos funcionais e não funcionais, garantindo a integridade dos dados, a segurança das transações e a experiência do usuário. Além disso, diversas regras de negócio são implementadas para manter a consistência e o bom funcionamento da aplicação.

### Requisitos Funcionais
**Cadastro de usuário**
- [x] Deve ser possível realizar o cadastro de um novo usuário.
**Cadastro de categoria**
- [x] Deve ser possível cadastrar uma categoria para um veículo.
**Cadastro de carro**
- [X] Deve ser possível cadastrar um novo carro.
**Listagem de carros**
- [x] Deve ser possível listar todos os carros disponíveis.
- [x] Deve ser possível listar todos os carros disponíveis pelo nome da categoria.
- [x] Deve ser possível listar todos os carros disponíveis pelo nome da marca.
- [x] Deve ser possível listar todos os carros disponíveis pelo nome do carro.
**Cadastro de Especificação no carro**
- [x] Deve ser possível cadastrar uma especificação para um carro.
**Cadastro de imagens do carro**
- [x] Deve ser possível cadastrar a imagem do carro.
**Aluguel de carro**
- [x] Deve ser possível cadastrar um aluguel.
**Devolução de carro**
- [x] Deve ser possível realizar a devolução de um carro alugado
**Listagem de alugueis para usuário**
- [x] Deve ser possível realizar a busca de todos os alugueis para o usuário
**Recuperação de senha**
- [x] Deve ser possível que o usuário consiga recuperar a senha informando o e-mail de registro.
- [x] O Usuário deve receber um e-mail com o passo a passo para a recuperação da senha.
- [x] O Usuário deve conseguir cadastrar uma nova senha.

### Requisitos Não Funcionais
- [x] O usuário com permissão de admin deve ser criado via seed.
- [x] O banco de dados deve ser PostgreSQL.
**Cadastro de imagens do carro**
- [x] Utilizar o multer para upload dos arquivos de imagem.

### Regra de negócio
**Cadastro de usuário**
- [x] Não deve ser possível realizar o registro de um usuário que já tenha o email utilizado cadastrado.
- [x] A senha do usuário deve estar criptografada
**Cadastro de categoria**
- [x] Um veículo só pode ter uma categoria vinculada a ele.
**Cadastro de carro**
- [x] Não deve ser possível cadastrar um carro com uma placa já cadastrada.
- [X] O carro deve ser cadastrado, por padrão, com a propriedade available como true.
- [x] O usuário responsável pelo cadastro deve ser um usuário adminstrador.*
**Listagem de carros**
- [x] O usuário não precisa estar autenticado no sistema para listar os carros.
**Cadastro de Especificação no carro**
- [x] Não deve ser possível cadastrar uma especificação para um carro não cadastrado.
- [x] Não deve ser possível cadastrar uma especificação que já esteja cadastrada em um veículo.
- [x] O usuário responsável pelo cadastro de especificação deve ser um usuário adminstrador.
**Cadastro de imagens do carro**
- [x] O usuário deve poder cadastrar mais de uma imagem para o mesmo carro.
- [x] O usuário responsável pelo cadastro das imagens deve ser um usuário adminstrador.
**Alugel de carro**
- [x] O usuário deve ser autenticado na aplicação para fazer uma reserva.
- [x] O aluguel deve ter duração mínima de 24 hora.
- [x] Não deve ser possível cadastrar um novo aluguel caso já exista um aberto para o mesmo usuário.
- [x] Não deve ser possível cadastrar um novo aluguel caso já exista um aberto para o mesmo carro.
- [x] Ao realizar o aluguel, o status do carro deverá ser alterado para indisponível.
**Devolução de carro**
- [x] Se o carro for devolvido com menos de 24 horas, deverá ser cobrado a diária completa.
- [x] Ao realizar a devolução, o carro deverá ser liberado para outro aluguel.
- [x] Ao realizar a devolução, o usuário deverá ser liberado para outro aluguel.
- [x] Ao realizar a devolução, deverá ser calculado o total do aluguel.
- [x] Caso o horário de devolução seja superior ao horário previsto de entrega, deverá ser cobrado multa proporcional aos dias em atraso.
- [x] Caso haja multa, deverá ser somado ao total do aluguel.
- [x] O usuário deve estar logado e autenticado para realizar a devolução.
**Listagem de alugueis para usuário**
- [x] O usuário deve estar logado na aplicação
**Recuperação de senha**
- [x] O usuário precisa informar a uma nova senha
- [x] O link enviado para recuperação deve expirar em 3 horas

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

Rodando o seed para criar um usuário com permissão de admin
```bash
npm run seed:admin
```

## Documentação do projeto

Para acessar a documentação, é necessário iniciar o servidor e após isto acessar **http://localhost:3333/api-docs**

<!-- ### /categories

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
| description | string |  | No | -->


<!-- Libs utilizadas -->
<!-- https://www.npmjs.com/package/tsx -->
<!-- https://www.npmjs.com/package/uuid -->
<!-- https://www.npmjs.com/package/typescript -->
<!-- https://www.npmjs.com/package/multer --> 
<!-- https://www.npmjs.com/package/csv-parse -->
<!-- https://www.npmjs.com/package/swagger-ui-express -->
<!-- https://typeorm.io/ -->
<!-- https://www.npmjs.com/package/tsyringe -->
<!-- https://www.npmjs.com/package/bcrypt -->
<!-- https://www.npmjs.com/package/jsonwebtoken -->
<!-- https://www.npmjs.com/package/express-async-errors -->
<!-- https://jestjs.io/pt-BR/ -->
<!-- https://www.npmjs.com/package/supertest -->
<!-- https://ethereal.email/ -->
<!-- https://handlebarsjs.com/ -->