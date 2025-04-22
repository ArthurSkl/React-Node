import { Mongo } from "../database/mongo.js"  // Importa a instância do banco de dados MongoDB
import { ObjectId } from "mongodb"  // Importa o tipo ObjectId do MongoDB para manipulação de IDs

const collectionName = 'plates'  // Define o nome da coleção 'plates'

export default class PlatesDataAccess {
    // Método para obter todos os pratos
    async getPlates() {
        const result = await Mongo.db 
            .collection(collectionName)  // Acessa a coleção 'plates'
            .find({})  // Encontra todos os documentos na coleção
            .toArray()  // Converte o resultado em um array
        return result  // Retorna o resultado
    }

    // Método para obter apenas os pratos disponíveis
    async getAvailablePlates() {
        const result = await Mongo.db
            .collection(collectionName)
            .find({ available: true })  // Filtra para encontrar apenas pratos com o campo 'available' igual a true
            .toArray()  // Converte o resultado em um array
        return result  // Retorna o resultado
    }

    // Método para inserir um novo prato na coleção
    async insertPlate(plateData) {
        const result = await Mongo.db
            .collection(collectionName)
            .insertOne(plateData)  // Insere um prato com os dados fornecidos
        return result  // Retorna o resultado da inserção
    }

    // Método para deletar um prato da coleção pelo ID
    async deletePlate(plateId) {
        const result = await Mongo.db 
            .collection(collectionName)
            .findOneAndDelete({ _id: new ObjectId(plateId) })  // Encontra e deleta o prato com o ID fornecido
        return result  // Retorna o resultado da exclusão
    }

    // Método para atualizar um prato na coleção pelo ID
    async updatePlate(plateId, plateData) {
        const result = await Mongo.db
            .collection(collectionName)
            .findOneAndUpdate(
                { _id: new ObjectId(plateId) },  // Filtra o prato pelo ID
                { $set: plateData },  // Atualiza os dados do prato com as informações fornecidas
                { returnDocument: 'after' }  // Retorna o documento após a atualização
            )
        return result  // Retorna o resultado da atualização
    }
}
