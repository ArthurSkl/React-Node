import express from 'express'
import 

PlatesControllers from '../controllers/plates.js'

const platesRouter = express.Router()

const plateControllers = new PlatesControllers()


platesRouter.get('/', async (req, res) => {
    const {success, statusCode, body } = await plateControllers.getPlate()
    res.status(statusCode).send({success, statusCode, body})
})



platesRouter.post('/', async (req, res) => {
    //console.log(req.params)
    const {success, statusCode, body } = await plateControllers.insertPlate(req.body)
    res.status(statusCode).send({success, statusCode, body})
})

platesRouter.delete('/:id', async (req, res) => {
    //console.log(req.params)
    const {success, statusCode, body } = await plateControllers.deletePlate(req.params.id)
    res.status(statusCode).send({success, statusCode, body})
})

platesRouter.put('/:id', async (req, res) => {
    const {success, statusCode, body } = await plateControllers.updatePlate(req.params.id, req.body)
    res.status(statusCode).send({success, statusCode, body})
})


platesRouter.get('/availables', async (req, res) => {
    const {success, statusCode, body } = await plateControllers.getAvailablePlates()
    res.status(statusCode).send({success, statusCode, body})
})




export default platesRouter