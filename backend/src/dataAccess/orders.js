import { Mongo } from "../database/mongo.js" 
import { ObjectId } from "mongodb"

const collectionName = 'orders'

export default class OrdersDataAccess{
    async getOrders() {
        const result = await Mongo.db
            .collection(collectionName)
            .aggregate([
                {
                    $lookup: {
                        from: 'orderItems',
                        localField: '_id',
                        foreignField: 'orderId',
                        as: 'orderItems'
                    }
                },
                {
                    $lookup: {
                        from: 'users',
                        localField: 'userId',
                        foreignField: '_id',
                        as: 'userDetails'
                    }
                },
                {
                    $project: {
                        'userDetails.password': 0,
                        'userDetails.salt': 0,
                    }
                },
                {
                    $unwind: {
                        path: '$orderItems',
                        preserveNullAndEmptyArrays: true // Evita erro caso 'orderItems' esteja vazio ou ausente
                    }
                },
                {
                    $lookup: {
                        from: 'plates',
                        localField: 'orderItems.plateId', // Corrigido para plateId
                        foreignField: '_id',
                        as: 'orderItems.itemDetails'
                    }
                }
            ])
            .toArray()
    
        return result
    }
    

    async insertOrder(orderData) {
        const { items, ...orderDataRest } = orderData
    
        // Ajustes nos campos do pedido
        orderDataRest.createdAt = new Date()
        orderDataRest.pickupStatus = 'Pending'
        orderDataRest.userId = new ObjectId(orderDataRest.userId)
    
        // Insere o pedido na coleção "orders"
        const newOrder = await Mongo.db.collection('orders').insertOne(orderDataRest)
    
        // Verifica se inseriu corretamente
        if (!newOrder.insertedId) {
            throw new Error('Order cannot be inserted')
        }
    
        // Prepara os itens para a coleção "orderItems"
        const orderItems = items.map(item => ({
            plateId: new ObjectId(item.plateId),
            quantity: parseInt(item.quantity), // garante que a quantidade é número
            orderId: newOrder.insertedId
        }))
    
        // Insere os itens na coleção "orderItems"
        const result = await Mongo.db.collection('orderItems').insertMany(orderItems)
    
        return {
            orderId: newOrder.insertedId,
            insertedItems: result.insertedCount
        }
    }
    


    async deleteOrder(orderId){
        const result = await Mongo.db 
        .collection(collectionName)
        .findOneAndDelete({_id: new ObjectId(orderId)})
        return result
    }

    async updateOrder(orderId, orderData) {
        const result = await Mongo.db
            .collection(collectionName)
            .findOneAndUpdate(
                { _id: new ObjectId(orderId) },
                { $set: orderData },
                { returnDocument: 'after' } // opcional: retorna o documento atualizado
            )
        return result
    }
    
}