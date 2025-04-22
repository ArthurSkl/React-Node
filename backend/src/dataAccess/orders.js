import { Mongo } from "../database/mongo.js"  // Importa a instância do banco de dados MongoDB
import { ObjectId } from "mongodb"  // Importa o tipo ObjectId do MongoDB para manipulação de IDs

const collectionName = 'orders'  // Define o nome da coleção 'orders'

export default class OrdersDataAccess {
    // Método para obter todos os pedidos
    async getOrders() {
        const result = await Mongo.db
            .collection(collectionName)  // Acessa a coleção 'orders'
            .aggregate([  // Usa o pipeline de agregação para reunir e processar os dados
                {
                    $lookup: {  // Realiza um JOIN com a coleção 'orderItems' para associar itens ao pedido
                        from: 'orderItems',
                        localField: '_id',
                        foreignField: 'orderId',
                        as: 'orderItems'  // A variável 'orderItems' será preenchida com os dados dos itens do pedido
                    }
                },
                {
                    $lookup: {  // Realiza um JOIN com a coleção 'users' para obter os detalhes do usuário
                        from: 'users',
                        localField: 'userId',
                        foreignField: '_id',
                        as: 'userDetails'  // A variável 'userDetails' será preenchida com os detalhes do usuário
                    }
                },
                {
                    $project: {  // Exclui as propriedades 'password' e 'salt' dos dados do usuário por questões de segurança
                        'userDetails.password': 0,
                        'userDetails.salt': 0,
                    }
                },
                {
                    $unwind: {  // "Desfaz" o array de 'orderItems' para que cada item de pedido seja tratado individualmente
                        path: '$orderItems',
                        preserveNullAndEmptyArrays: true  // Garante que não haverá erro caso o pedido não tenha itens
                    }
                },
                {
                    $lookup: {  // Realiza outro JOIN com a coleção 'plates' para obter detalhes dos pratos
                        from: 'plates',
                        localField: 'orderItems.plateId',  // Relaciona o campo 'plateId' com o campo '_id' na coleção 'plates'
                        foreignField: '_id',
                        as: 'orderItems.itemDetails'  // Preenche 'orderItems.itemDetails' com os detalhes do prato
                    }
                },
                {
                    $group: {  // Agrupa os dados de volta em um único documento para cada pedido
                        _id: '$_id',
                        userDetails: { $first: '$userDetails' },  // Pega o primeiro valor de 'userDetails' (já que foi 'unwound' e há uma correspondência única por pedido)
                        orderItems: { $push: '$orderItems' },  // Agrupa todos os itens do pedido em um array
                        pickupStatus: { $first: '$pickupStatus' },  // Pega o status de retirada do pedido
                        pickupTime: { $first: '$pickupTime' }  // Pega o horário de retirada do pedido
                    }
                }
            ])
            .toArray()  // Converte o resultado da agregação para um array
        return result  // Retorna o resultado
    }

    // Método para obter pedidos de um usuário específico pelo ID
    async getOrdersByUserId(userId) {
        const result = await Mongo.db
            .collection(collectionName)
            .aggregate([
                {
                    $match: { userId: new ObjectId(userId) }  // Filtra os pedidos apenas para o 'userId' informado
                },
                // As etapas seguintes são praticamente as mesmas que no método 'getOrders'
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
                        preserveNullAndEmptyArrays: true
                    }
                },
                {
                    $lookup: {
                        from: 'plates',
                        localField: 'orderItems.plateId',
                        foreignField: '_id',
                        as: 'orderItems.itemDetails'
                    }
                },
                {
                    $group: {
                        _id: '$_id',
                        userDetails: { $first: '$userDetails' },
                        orderItems: { $push: '$orderItems' },
                        pickupStatus: { $first: '$pickupStatus' },
                        pickupTime: { $first: '$pickupTime' }
                    }
                }
            ])
            .toArray()
        return result  // Retorna o resultado
    }

    // Método para inserir um novo pedido
    async insertOrder(orderData) {
        const { items, ...orderDataRest } = orderData  // Desestrutura os dados do pedido, separando os itens do resto dos dados

        // Ajusta os campos do pedido
        orderDataRest.createdAt = new Date()  // Define a data de criação do pedido
        orderDataRest.pickupStatus = 'Pending'  // Define o status do pedido como 'Pending'
        orderDataRest.userId = new ObjectId(orderDataRest.userId)  // Converte o 'userId' para um ObjectId

        // Insere o pedido na coleção 'orders'
        const newOrder = await Mongo.db.collection('orders').insertOne(orderDataRest)

        // Verifica se o pedido foi inserido corretamente
        if (!newOrder.insertedId) {
            throw new Error('Order cannot be inserted')  // Lança um erro se a inserção falhar
        }

        // Prepara os itens para inserção na coleção 'orderItems'
        const orderItems = items.map(item => ({
            plateId: new ObjectId(item.plateId),  // Converte o 'plateId' para ObjectId
            quantity: parseInt(item.quantity),  // Garante que a quantidade é um número inteiro
            orderId: newOrder.insertedId  // Relaciona os itens ao ID do pedido recém inserido
        }))

        // Insere os itens na coleção 'orderItems'
        const result = await Mongo.db.collection('orderItems').insertMany(orderItems)

        // Retorna os IDs do pedido e dos itens inseridos
        return {
            orderId: newOrder.insertedId,
            insertedItems: result.insertedCount  // Conta quantos itens foram inseridos
        }
    }

    // Método para deletar um pedido pelo ID
    async deleteOrder(orderId) {
        // Deleta os itens do pedido na coleção 'orderItems'
        const itemsToDelete = await Mongo.db.collection('orderItems')
            .deleteMany({ orderId: new ObjectId(orderId) })

        // Deleta o pedido na coleção 'orders'
        const orderToDelete = await Mongo.db
            .collection(collectionName)
            .findOneAndDelete({ _id: new ObjectId(orderId) })

        // Retorna um objeto com o resultado da exclusão dos itens e do pedido
        const result = { itemsToDelete, orderToDelete }
        return result
    }

    // Método para atualizar um pedido pelo ID
    async updateOrder(orderId, orderData) {
        const result = await Mongo.db
            .collection(collectionName)
            .findOneAndUpdate(
                { _id: new ObjectId(orderId) },  // Filtra o pedido pelo ID
                { $set: orderData },  // Atualiza os dados do pedido
                { returnDocument: 'after' }  // Retorna o documento atualizado
            )
        return result  // Retorna o resultado da atualização
    }
}
