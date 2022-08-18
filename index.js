const { response, request, json } = require('express')
const express = require('express') // EXPRESS É UM FRAMEWORK, UMA BIBLIOTECA PARA NOS AJUDAR A USAR O NODE.
const uuid = require('uuid')
const port = 3001
const app = express() //aqui colocamos o express dentro dessa variável para que possamos usar app em vez de express,(também pode ser server)

app.use(express.json())

/*
    -Query params => meusite.com/users?name=Alyne&age=23 //FILTROS
    -Route params => /users/2   BUSCAR/DELETAR/ATUALIZAR ALGO ESPECÍFICO
    -Body Params => {"name": "Rodolfo","age":}

    -GET => PEGAR ALGUMA INFORAÇÃO NO BACK-END
    -POST => CRIAR ALGUMA INFORMAÇÃO NO BACK-END
    -PATCH/ PUT => ALTERAR/ ATUALIZAR ALGUMA INFORMAÇÃO NO BACK-END
    -DELETE => DELETAR ALGUMA INFORMAÇAO NO BACK END

    MIDDLEWARES => INTERCEPTADOR = TEM O PODER DE PARAR OU ALTERAR OS DADOS DA REQUISIÇÃO
*/

const users = []

const checkUserId = (request, response, next) => {
    const { id } = request.params

    const index = users.findIndex(user => user.id === id)

    if (index < 0) {
        return response.status(404).json({ error: "User Not Found" })
    }
    request.userIndex = index
    request.userId = id
    
    next()
}


app.get('/users', (request, response) => {              //aqui é uma função e a rota para usar no navegador
                                                       //Aqui estamos fazendo uma requisição para o json, então colocamos os nomes das variáveis e seguimos essa estrutura ali
                                                                 // o query é o PARAMETRO que foi utilizado, é como um filtro para as variáveis name e age.
    return response.json(users)
})

app.post('/users', (request, response) => {
    const { name, age } = request.body

    const user = { id: uuid.v4(), name, age }
    users.push(user)

    return response.status(201).json(user)
})

app.put('/users/:id', checkUserId, (request, response) => {
    const { name, age } = request.body
    const index =  request.userIndex
    const id = request.userId 

    const updatedUser = { id, name, age }
    
    users[index] = updatedUser

    return response.json(updatedUser)
})

app.delete('/users/:id', checkUserId, (request, response) => {
    
    const index =  request.userIndex

    users.splice(index, 1)

    return response.status(204).json()
})

app.listen(port, () => {
    console.log(`🚀 Server started on port ${port}`)
})    

// essa é a porta que escolhemos para ficar no servidor. NÃO PODE SER QUALQUER número, apartir de 3000.
                    // depois no terminal é só digitar "node index.js" que é o nome do arquivo js, e aí ja vai ta no ar o servidor.
    // TODA VEZ QUE FOR FAZER ALTERAÇÃO NO CÓDIGO, PRECISA PARAR O SERVIDOR DE RODAR ANTES, com o "ctrl+c" depois de salvar a alteração
    // roda o servidor de novo com o "node index.js"





