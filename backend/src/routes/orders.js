// Importa o Express, que é usado para criar rotas e lidar com requisições HTTP
import express from 'express'

// Importa a classe responsável pelas regras de negócio relacionadas aos pedidos (orders)
import OrdersControllers from '../controllers/orders.js'

// Cria um roteador específico para as rotas de pedidos
const ordersRouter = express.Router()

// Cria uma instância do controlador de pedidos para acessar os métodos de negócio
const orderControllers = new OrdersControllers()

// Rota GET que retorna todos os pedidos (orders) do sistema
ordersRouter.get('/', async (req, res) => {
    const { success, statusCode, body } = await orderControllers.getOrder()
    res.status(statusCode).send({ success, statusCode, body })
})

// Rota GET que retorna os pedidos de um usuário específico, com base no ID passado na URL
ordersRouter.get('/:id', async (req, res) => {
    const { success, statusCode, body } = await orderControllers.getOrderByUserId(req.params.id)
    res.status(statusCode).send({ success, statusCode, body })
})

// Rota POST que insere um novo pedido no sistema, usando os dados recebidos no corpo da requisição (req.body)
ordersRouter.post('/', async (req, res) => {
    const { success, statusCode, body } = await orderControllers.insertOrder(req.body)
    res.status(statusCode).send({ success, statusCode, body })
})

// Rota DELETE que remove um pedido com base no ID informado na URL
ordersRouter.delete('/:id', async (req, res) => {
    const { success, statusCode, body } = await orderControllers.deleteOrder(req.params.id)
    res.status(statusCode).send({ success, statusCode, body })
})

// Rota PUT que atualiza os dados de um pedido com base no ID e nos dados fornecidos no corpo da requisição
ordersRouter.put('/:id', async (req, res) => {
    const { success, statusCode, body } = await orderControllers.updateOrder(req.params.id, req.body)
    res.status(statusCode).send({ success, statusCode, body })
})

// Exporta o roteador de pedidos para ser usado na aplicação principal
export default ordersRouter
