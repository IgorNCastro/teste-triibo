# Teste Técnico Triibo

Boas vindas ao repositório!

Esse projeto foi desenvolvido como teste técnico requerido pela empresa Triibo em processo seletivo para vaga de desenvolvedor Backend. 

Aqui você encontrará detalhes de como foi o desenvolvimento do projeto e quais foram os requisitos técnicos necessários.

# Habilidades desenvolvidas

Neste projeto, fui capaz de:

- Desenvolver uma API de um CRUD de tarefas utilizando Node.js e Express;
- Desenvolver endpoints de busca e filtro de termos usados;
- Utilizar autenticação JWT para proteger determinadas rotas;
- Organizar o código seguindo o padrão MSC (Model-Service-Controller);

---

# CRUD

CRUD é um acrônimo para **C**reate, **R**ead, **U**pdate and **D**elete. Em português seria **Criar**, **Ler**, **Atualizar** e **Deletar** registros.

---

# Funcionamento da aplicação

Para iniciar o projeto é necessário, primeiramente, clonar o repositório.

Após clonar o projeto em seu computador, para iniciá-lo é necessário executar o comando
```
npm install && npm run dev
```

Após isso, você deve configurar um banco de dados MySQL e populá-lo com os dados do arquivo tasks.sql presente no diretório src/database/

Uma alternativa é utilizar o Docker para configurar o banco de dados, abaixo segue o comando que utilizei neste projeto, devendo apenas ser alterada a senha (password).

```
docker run --name mysql -e MYSQL_ROOT_PASSWORD=password -p 3306:3306 -d mysql;
```

Este arquivo já contêm alguns exemplos de tarefas definidas para já preencher o banco de dados.

É possível realizar as requisições de CRUD através de algum cliente HTTP, como o `Insomnia`, ou o `Postman`, através dos endpoints listados abaixo.

O projeto trata-se de um teste técnico necessário para avaliar o conhecimento em Node.js e Express, com o desenvolvimento de uma API utilizando os conceitos de CRUD para leitura, cadastro, atualização, remoção e busca de tarefas. A validação das requisições em alguns endpoints é realizada através de um token **gerado pela biblioteca JWT**.

Também foi utilizado o conceito de middlewares para validação das requisições; ao tentar submeter uma requisição com dados inválidos, token inválido ou qualquer informação que possa gerar um erro, essa submissão é levada até o middleware que retorna um sinal de erro para o usuário, informando-o o tipo de erro para que ele corrija e realize a requisição novamente.

---

## 📚 Documentação (endpoints)

### Tarefas
| Método | Funcionalidade                              | URL                          |
| ------ | ------------------------------------------- | ---------------------------- |
| `GET`  | Retorna uma lista das tarefas cadastradas   | http://localhost:3001/tasks  |

<details>
  <summary>Um exemplo de resposta da requisição é o seguinte, com status 200:</summary>
  <br>
  
```json
[
  {
    "id": 1,
    "title": "Tomar o café da manhã",
    "description": "Na padaria",
    "status": "Concluída"
  },
  {
    "id": 2,
    "title": "Almoçar com colegas do trabalho",
    "description": "No restaurante",
    "status": "Em andamento"
  },
  {
    "id": 3,
    "title": "Pedir janta no Ifood",
    "description": "Em casa",
    "status": "Pendente"
  },
]
```
</details>
<br>
<br>

| Método | Funcionalidade                                                  | URL                          |
| ------ | --------------------------------------------------------------- | ---------------------------- |
| `POST` | Cadastra uma nova tarefa, desde que preenchidos os requisitos   | http://localhost:3001/tasks  |


<details>
  <summary>A estrutura do <code>body</code> da requisição deverá seguir o padrão abaixo:</summary>
  <br>
  
```json
{
  "title": "Tomar o café da manhã",
  "description": "Na padaria",
  "status": "Concluída"
}
```
</details>

<details>
  <summary>Um exemplo de resposta da requisição é o seguinte, com status 201:</summary>
  <br>
  
```json
{
  "token": "eyJhbGciOiJIUzI1NiJ9.QmFpeGFyIG8gam9nbyBubyBwYw.eC4uLf7dToRql9ahI3UpNyrjBDDwZOjDHHhisBg2iYY",
  "message": "Task created."
}
```
</details>

<details>
  <summary>Caso seja bem sucedida a requisição irá gerar um token:</summary>
  <br>
  - Este token deve ser guardado pois ele é necessário e deve ser usado no header de requisições que desejam deletar ou editar a tarefa;
</details>

<details>
  <summary>A requisição irá falhar nos seguintes casos:</summary>
  <br>
  - A rota retorna o código <code>400</code>, com a mensagem <code>"All fields are required!"</code> caso o title, description ou status não estejam presentes no Body da requisição;
  <br>
  <br>
  - A rota retorna o código <code>400</code>, com a mensagem <code>"Fields cannot be empty!"</code> caso o title, description ou status estejam presentes no Body da requisição mas sejam vazios;
</details>
<br>
<br>

| Método   | Funcionalidade                                                      | URL                             |
| -------- | ------------------------------------------------------------------- | ------------------------------- |
| `DELETE` | Deleta uma tarefa previamente cadastrada identificada através do id | http://localhost:3001/tasks/:id |

Essa requisição deve, obrigatoriamente, ter um `token de autenticação` nos headers, no campo `authorization` (obtido ao cadastrar a tarefa).

<details>
  A resposta da requisição, cao seja bem sucedida, é apenas o status 204.
<br>
<br>

| Método | Funcionalidade                                                                                                | URL                             |
| ------ | ------------------------------------------------------------------------------------------------------------- | ------------------------------- |
| `PUT`  | Possibilita ao usuário editar todos os campos de uma tarefa previamente cadastrada identificada através do id | http://localhost:3001/tasks/:id |

Essa requisição deve, obrigatoriamente, ter um `token de autenticação` nos headers, no campo `authorization` (obtido ao cadastrar a tarefa).

<details>
  <summary>A estrutura do <code>body</code> da requisição deverá seguir o padrão abaixo:</summary>
  <br>
  
```json
{
  "title": "Tomar o café da manhã",
  "description": "Na padaria",
  "status": "Concluída"
}
```
</details>

<details>
  <summary>Um exemplo de resposta da requisição é o seguinte, com status 201:</summary>
  
```json
{
  "message": "Task updated."
}
```
</details>

<details>
  <summary>A requisição irá falhar nos seguintes casos:</summary>
  <br>
  - A rota retorna o código <code>400</code>, com a mensagem <code>"All fields are required!"</code> caso o title, description ou status não estejam presentes no Body da requisição;
  <br>
  <br>
  - A rota retorna o código <code>400</code>, com a mensagem <code>"Fields cannot be empty!"</code> caso o title, description ou status estejam presentes no Body da requisição mas sejam vazios;
</details>
<br>
<br>

| Método | Funcionalidade                                                                         | URL                                   |
| ------ | -------------------------------------------------------------------------------------- | ------------------------------------- |
| `PUT`  | Possibilita ao usuário editar o campo "title" de uma tarefa identificada através do id | http://localhost:3001/tasks/:id/title |

Essa requisição deve, obrigatoriamente, ter um `token de autenticação` nos headers, no campo `authorization` (obtido ao cadastrar a tarefa).

<details>
  <summary>A estrutura do <code>body</code> da requisição deverá seguir o padrão abaixo:</summary>
  <br>
  
```json
{
  "title": "Tomar o café da manhã"
}
```
</details>

<details>
  <summary>Um exemplo de resposta da requisição é o seguinte, com status 201:</summary>
  
```json
{
  "message": "Task title updated."
}
```
</details>

<details>
  <summary>A requisição irá falhar nos seguintes casos:</summary>
  <br>
  - A rota retorna o código <code>400</code>, com a mensagem <code>"Title is required!"</code> caso o title não esteja presente no Body da requisição;
  <br>
  <br>
  - A rota retorna o código <code>400</code>, com a mensagem <code>"Title cannot be empty!"</code> caso o title esteja presente no Body da requisição mas seja vazio;
</details>
<br>
<br>

| Método | Funcionalidade                                                                               | URL                                         |
| ------ | -------------------------------------------------------------------------------------------- | ------------------------------------------- |
| `PUT`  | Possibilita ao usuário editar o campo "description" de uma tarefa identificada através do id | http://localhost:3001/tasks/:id/description |

Essa requisição deve, obrigatoriamente, ter um `token de autenticação` nos headers, no campo `authorization` (obtido ao cadastrar a tarefa).

<details>
  <summary>A estrutura do <code>body</code> da requisição deverá seguir o padrão abaixo:</summary>
  <br>
  
```json
{
  "description": "Na padaria"
}
```
</details>

<details>
  <summary>Um exemplo de resposta da requisição é o seguinte, com status 201:</summary>
  
```json
{
  "message": "Task description updated."
}
```
</details>

<details>
  <summary>A requisição irá falhar nos seguintes casos:</summary>
  <br>
  - A rota retorna o código <code>400</code>, com a mensagem <code>"Description is required!"</code> caso o description não esteja presente no Body da requisição;
  <br>
  <br>
  - A rota retorna o código <code>400</code>, com a mensagem <code>"Description cannot be empty!"</code> caso o description esteja presente no Body da requisição mas seja vazio;
</details>
<br>
<br>

| Método | Funcionalidade                                                                          | URL                                    |
| ------ | --------------------------------------------------------------------------------------- | -------------------------------------- |
| `PUT`  | Possibilita ao usuário editar o campo "status" de uma tarefa identificada através do id | http://localhost:3001/tasks/:id/status |

Essa requisição deve, obrigatoriamente, ter um `token de autenticação` nos headers, no campo `authorization` (obtido ao cadastrar a tarefa).

<details>
  <summary>A estrutura do <code>body</code> da requisição deverá seguir o padrão abaixo:</summary>
  <br>
  
```json
{
  "status": "Concluída"
}
```
</details>

<details>
  <summary>Um exemplo de resposta da requisição é o seguinte, com status 201:</summary>
  
```json
{
  "message": "Task status updated."
}
```
</details>

<details>
  <summary>A requisição irá falhar nos seguintes casos:</summary>
  <br>
  - A rota retorna o código <code>400</code>, com a mensagem <code>"Status is required!"</code> caso o status não esteja presente no Body da requisição;
  <br>
  <br>
  - A rota retorna o código <code>400</code>, com a mensagem <code>"Status cannot be empty!"</code> caso o status esteja presente no Body da requisição mas seja vazio;
</details>
<br>
<br>

| Método | Funcionalidade                                                              | URL                                                     |
| ----- | ---------------------------------------------------------------------------- | ------------------------------------------------------- |
| `GET` |  Possibilita ao usuário buscar tarefas já cadastradas com base em seu título | http://localhost:3001/title/?q=(TERMO-A-SER-PESQUISADO) |

<details>
  <summary>Um exemplo de resposta da requisição é o seguinte, com status 200:</summary>
  
```json
[
  {
    "id": 2,
    "title": "Almoçar com colegas do trabalho",
    "description": "No restaurante",
    "status": "Em andamento"
  }
]
```
</details>
<br>
<br>

| Método | Funcionalidade                                                                 | URL                                                           |
| ----- | ------------------------------------------------------------------------------- | ------------------------------------------------------------- |
| `GET` |  Possibilita ao usuário buscar tarefas já cadastradas com base em sua descrição | http://localhost:3001/description/?q=(TERMO-A-SER-PESQUISADO) |

<details>
  <summary>Um exemplo de resposta da requisição é o seguinte, com status 200:</summary>
  
```json
[
  {
    "id": 2,
    "title": "Almoçar com colegas do trabalho",
    "description": "No restaurante",
    "status": "Em andamento"
  }
]
```
</details>
<br>
<br>

| Método | Funcionalidade                                                              | URL                                                      |
| ----- | ---------------------------------------------------------------------------- | -------------------------------------------------------- |
| `GET` |  Possibilita ao usuário buscar tarefas já cadastradas com base em seu status | http://localhost:3001/status/?q=(TERMO-A-SER-PESQUISADO) |

<details>
  <summary>Um exemplo de resposta da requisição é o seguinte, com status 200:</summary>
  
```json
[
  {
    "id": 2,
    "title": "Almoçar com colegas do trabalho",
    "description": "No restaurante",
    "status": "Em andamento"
  }
]
```
</details>
<br>

---

