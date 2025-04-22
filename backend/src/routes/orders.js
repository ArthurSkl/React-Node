import express from 'express'

import OrdersControllers from '../controllers/orders.js'

const ordersRouter = express.Router()

const orderControllers = new OrdersControllers()


ordersRouter.get('/', async (req, res) => {
    const {success, statusCode, body } = await orderControllers.getOrder()
    res.status(statusCode).send({success, statusCode, body})
})



ordersRouter.post('/', async (req, res) => {
    //console.log(req.params)
    const {success, statusCode, body } = await orderControllers.insertOrder(req.body)
    res.status(statusCode).send({success, statusCode, body})
})

ordersRouter.delete('/:id', async (req, res) => {
    //console.log(req.params)
    const {success, statusCode, body } = await orderControllers.deleteOrder(req.params.id)
    res.status(statusCode).send({success, statusCode, body})
})

ordersRouter.put('/:id', async (req, res) => {
    const {success, statusCode, body } = await orderControllers.updateOrder(req.params.id, req.body)
    res.status(statusCode).send({success, statusCode, body})
})







export default ordersRouter