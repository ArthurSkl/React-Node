// Importa o framework Express, usado para criar rotas e servidores HTTP
import express from 'express'

// Importa a classe de controle dos pratos (plates), onde estão os métodos com a lógica de negócio
import PlatesControllers from '../controllers/plates.js'

// Cria um roteador dedicado às rotas de pratos
const platesRouter = express.Router()

// Cria uma instância do controlador de pratos para acessar seus métodos
const plateControllers = new PlatesControllers()

// Rota GET para listar todos os pratos cadastrados
platesRouter.get('/', async (req, res) => {
    const { success, statusCode, body } = await plateControllers.getPlate()
    res.status(statusCode).send({ success, statusCode, body })
})

// Rota POST para inserir um novo prato no banco de dados
platesRouter.post('/', async (req, res) => {
    // Recebe os dados do novo prato através do corpo da requisição (req.body)
    const { success, statusCode, body } = await plateControllers.insertPlate(req.body)
    res.status(statusCode).send({ success, statusCode, body })
})

// Rota DELETE para remover um prato com base no ID informado na URL
platesRouter.delete('/:id', async (req, res) => {
    const { success, statusCode, body } = await plateControllers.deletePlate(req.params.id)
    res.status(statusCode).send({ success, statusCode, body })
})

// Rota PUT para atualizar os dados de um prato específico
platesRouter.put('/:id', async (req, res) => {
    const { success, statusCode, body } = await plateControllers.updatePlate(req.params.id, req.body)
    res.status(statusCode).send({ success, statusCode, body })
})

// Rota GET adicional para listar apenas os pratos disponíveis
platesRouter.get('/availables', async (req, res) => {
    const { success, statusCode, body } = await plateControllers.getAvailablePlates()
    res.status(statusCode).send({ success, statusCode, body })
})

// Exporta o roteador de pratos para ser usado no arquivo principal da aplicação
export default platesRouter
