

import OrdersDataAccess from '../dataAccess/orders.js'
import { ok, serverError } from'../helpers/httpResponse.js' 

export default class OrdersControllers {
    constructor() {
        this.dataAccess = new OrdersDataAccess
    }

    async getOrder() {
        try{
            const orders = await this.dataAccess.getOrders()
            return ok(orders)
        }catch(error){
            return serverError(error)
        }
    }

    async getAvailableOrders() {
        try{
            const orders = await this.dataAccess.getAvailableOrders()
            return ok(orders)
        }catch(error){
            return serverError(error)
        }
    }


    async insertOrder(ordersData) {
        try{
            const result = await this.dataAccess.insertOrder(ordersData)
            return ok(result)
        }catch(error){
            return serverError(error)
        }
    }

    async deleteOrder(ordersId) {
        try{
            const result = await this.dataAccess.deleteOrder(ordersId)
            return ok(result)
        }catch(error){
            return serverError(error)
        }
    }

    async updateOrder(ordersId, ordersData) {
        try{
            //console.log("chegou em controllers")
            const result = await this.dataAccess.updateOrder(ordersId, ordersData)
            return ok(result)
        }catch(error){
            return serverError(error)
        }
    }
}