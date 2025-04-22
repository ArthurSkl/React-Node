import { Mongo } from "../database/mongo.js"  // Importa a instância do banco de dados MongoDB
import { ObjectId } from "mongodb"  // Importa o tipo ObjectId do MongoDB para manipulação de IDs
import crypto from 'crypto'  // Importa a biblioteca 'crypto' para criptografia
import passport from "passport"  // Importa o 'passport' para autenticação (não está sendo usado diretamente aqui)

const collectionName = 'users'  // Define o nome da coleção 'users'

export default class UsersDataAccess {
    // Método para obter todos os usuários
    async getUsers() {
        const result = await Mongo.db 
            .collection(collectionName)  // Acessa a coleção 'users'
            .find({})  // Encontra todos os documentos na coleção
            .toArray()  // Converte o resultado em um array
        return result  // Retorna o resultado
    }

    // Método para deletar um usuário da coleção pelo ID
    async deleteUser(userId) {
        const result = await Mongo.db 
            .collection(collectionName)
            .findOneAndDelete({ _id: new ObjectId(userId) })  // Encontra e deleta o usuário com o ID fornecido
        return result  // Retorna o resultado da exclusão
    }

    // Método para atualizar um usuário na coleção pelo ID
    async updateUser(userId, userData) {
        // Verifica se a senha está sendo atualizada
        if (userData.password) {
            // Gera um salt aleatório de 16 bytes para a senha
            const salt = crypto.randomBytes(16)
            // Usa PBKDF2 para gerar o hash da senha com o salt
            crypto.pbkdf2(userData.password, salt, 310000, 16, 'sha256', async (error, hashedPassword) => {
                if (error) {
                    throw new Error('Error during hashing password')  // Trata erros durante o processo de hash
                }
                // Atualiza os dados do usuário com a senha criptografada e o salt
                userData = { ...userData, password: hashedPassword, salt }

                // Realiza a atualização do usuário na coleção
                const result = await Mongo.db 
                    .collection(collectionName)
                    .findOneAndUpdate(
                        { _id: new ObjectId(userId) },  // Filtra o usuário pelo ID
                        { $set: userData }  // Atualiza os dados do usuário com as informações fornecidas
                    )
                return result  // Retorna o resultado da atualização
            })
        } else {
            // Caso a senha não tenha sido fornecida, realiza a atualização normalmente
            const result = await Mongo.db 
                .collection(collectionName)
                .findOneAndUpdate(
                    { _id: new ObjectId(userId) },
                    { $set: userData }  // Atualiza os dados do usuário sem alterar a senha
                )
            return result  // Retorna o resultado da atualização
        }
    }
}
