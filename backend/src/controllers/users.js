// Importa a camada de acesso aos dados dos usuários
import UsersDataAccess from "../dataAccess/users.js";

// Importa funções auxiliares para formatar as respostas HTTP
import { ok, serverError } from '../helpers/httpResponse.js' 

// Define a classe de controle dos usuários (Users)
export default class UsersControllers {
    
    // No construtor, instanciamos a classe de acesso aos dados dos usuários
    constructor() {
        this.dataAccess = new UsersDataAccess()
    }

    // Método para buscar todos os usuários cadastrados
    async getUsers() {
        try {
            const users = await this.dataAccess.getUsers() // Chama o método da camada de dados
            return ok(users) // Retorna os usuários com status de sucesso (200)
        } catch (error) {
            return serverError(error) // Se der erro, retorna erro do servidor (500)
        }
    }

    // Método para deletar um usuário pelo seu ID
    async deleteUser(userId) {
        try {
            const result = await this.dataAccess.deleteUser(userId)
            return ok(result)
        } catch (error) {
            return serverError(error)
        }
    }

    // Método para atualizar os dados de um usuário
    async updateUser(userId, userData) {
        try {
            //console.log("chegou em controllers")
            const result = await this.dataAccess.updateUser(userId, userData)
            return ok(result)
        } catch (error) {
            return serverError(error)
        }
    }
}
