// Importa a classe de acesso aos dados dos pedidos
import OrdersDataAccess from '../dataAccess/orders.js'

// Importa funções auxiliares para formatar respostas HTTP
import { ok, serverError } from '../helpers/httpResponse.js'

// Define a classe responsável por controlar as ações relacionadas aos pedidos
export default class OrdersControllers {

    // O construtor instancia a classe de acesso a dados
    constructor() {
        this.dataAccess = new OrdersDataAccess
    }

    // Método para buscar todos os pedidos
    async getOrder() {
        try {
            const orders = await this.dataAccess.getOrders()
            return ok(orders) // Retorna os pedidos com status 200
        } catch (error) {
            return serverError(error) // Se der erro, retorna 500 com a mensagem
        }
    }

    // Método para buscar pedidos de um usuário específico, pelo ID
    async getOrderByUserId(userId) {
        try {
            const orders = await this.dataAccess.getOrdersByUserId(userId)
            return ok(orders)
        } catch (error) {
            return serverError(error)
        }
    }

    // Método para buscar somente pedidos com status disponíveis (ex: pendentes)
    async getAvailableOrders() {
        try {
            const orders = await this.dataAccess.getAvailableOrders()
            return ok(orders)
        } catch (error) {
            return serverError(error)
        }
    }

    // Método para inserir um novo pedido
    async insertOrder(ordersData) {
        try {
            const result = await this.dataAccess.insertOrder(ordersData)
            return ok(result)
        } catch (error) {
            return serverError(error)
        }
    }

    // Método para deletar um pedido pelo ID
    async deleteOrder(ordersId) {
        try {
            const result = await this.dataAccess.deleteOrder(ordersId)
            return ok(result)
        } catch (error) {
            return serverError(error)
        }
    }

    // Método para atualizar um pedido existente com novos dados
    async updateOrder(ordersId, ordersData) {
        try {
            const result = await this.dataAccess.updateOrder(ordersId, ordersData)
            return ok(result)
        } catch (error) {
            return serverError(error)
        }
    }
}
