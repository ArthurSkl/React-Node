import express from 'express'
import UsersControllers from '../controllers/users.js'


const UsersRouter = express.Router()

const usersControllers = new UsersControllers()


UsersRouter.get('/', async (req, res) => {
    const {success, statusCode, body } = await usersControllers.getUsers()
    res.status(statusCode).send({success, statusCode, body})
})







export default UsersRouter