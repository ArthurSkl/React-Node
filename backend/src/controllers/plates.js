// Importa a camada de acesso aos dados dos pratos
import PlatesDataAccess from '../dataAccess/plates.js'

// Importa funções auxiliares para formatar as respostas HTTP
import { ok, serverError } from '../helpers/httpResponse.js' 

// Define a classe de controle dos pratos (Plates)
export default class PlatesControllers {

    // No construtor, instanciamos a classe de acesso aos dados dos pratos
    constructor() {
        this.dataAccess = new PlatesDataAccess()
    }

    // Método para buscar todos os pratos cadastrados
    async getPlate() {
        try {
            const plate = await this.dataAccess.getPlates() // Chama o método da camada de dados
            return ok(plate) // Retorna os pratos com status de sucesso (200)
        } catch (error) {
            return serverError(error) // Se der erro, retorna erro do servidor (500)
        }
    }

    // Método para buscar apenas os pratos disponíveis
    async getAvailablePlates() {
        try {
            const plate = await this.dataAccess.getAvailablePlates()
            return ok(plate)
        } catch (error) {
            return serverError(error)
        }
    }

    // Método para inserir um novo prato no banco de dados
    async insertPlate(plateData) {
        try {
            const result = await this.dataAccess.insertPlate(plateData)
            return ok(result)
        } catch (error) {
            return serverError(error)
        }
    }

    // Método para deletar um prato pelo seu ID
    async deletePlate(plateId) {
        try {
            const result = await this.dataAccess.deletePlate(plateId)
            return ok(result)
        } catch (error) {
            return serverError(error)
        }
    }

    // Método para atualizar os dados de um prato
    async updatePlate(plateId, plateData) {
        try {
            //console.log("chegou em controllers")
            const result = await this.dataAccess.updatePlate(plateId, plateData)
            return ok(result)
        } catch (error) {
            return serverError(error)
        }
    }
}
