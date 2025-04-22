// Importa o framework Express para criação de rotas
import express from 'express'

// Importa a classe de controle dos usuários, onde está a lógica da aplicação
import UsersControllers from '../controllers/users.js'

// Cria um novo roteador específico para usuários
const usersRouter = express.Router()

// Instancia a classe UsersControllers para acessar os métodos como getUsers, deleteUser, etc.
const usersControllers = new UsersControllers()

// Rota GET para listar todos os usuários
usersRouter.get('/', async (req, res) => {
    // Chama o método getUsers do controller
    const { success, statusCode, body } = await usersControllers.getUsers()
    
    // Retorna a resposta com status HTTP e corpo formatado
    res.status(statusCode).send({ success, statusCode, body })
})

// Rota DELETE para remover um usuário específico pelo ID
usersRouter.delete('/:id', async (req, res) => {
    // Pega o ID do usuário a ser deletado dos parâmetros da URL
    const { success, statusCode, body } = await usersControllers.deleteUser(req.params.id)

    // Envia a resposta com o status da operação
    res.status(statusCode).send({ success, statusCode, body })
})

// Rota PUT para atualizar um usuário específico pelo ID
usersRouter.put('/:id', async (req, res) => {
    // Chama o método de atualização passando o ID e os novos dados enviados no corpo da requisição
    const { success, statusCode, body } = await usersControllers.updateUser(req.params.id, req.body)

    // Envia a resposta com o resultado da atualização
    res.status(statusCode).send({ success, statusCode, body })
})

// Exporta o roteador para ser usado no arquivo principal da aplicação (ex: server.js ou app.js)
export default usersRouter
