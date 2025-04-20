
import PlatesDataAccess from '../dataAccess/plates.js'
import { ok, serverError } from'../helpers/httpResponse.js' 

export default class PlatesControllers {
    constructor() {
        this.dataAccess = new PlatesDataAccess()
    }

    async getPlate() {
        try{
            const plate = await this.dataAccess.getPlates()
            return ok(plate)
        }catch(error){
            return serverError(error)
        }
    }

    async getAvailablePlates() {
        try{
            const plate = await this.dataAccess.getAvailablePlates()
            return ok(plate)
        }catch(error){
            return serverError(error)
        }
    }


    async insertPlate(plateData) {
        try{
            const result = await this.dataAccess.insertPlate(plateData)
            return ok(result)
        }catch(error){
            return serverError(error)
        }
    }

    async deletePlate(plateId) {
        try{
            const result = await this.dataAccess.deletePlate(plateId)
            return ok(result)
        }catch(error){
            return serverError(error)
        }
    }

    async updatePlate(plateId, plateData) {
        try{
            //console.log("chegou em controllers")
            const result = await this.dataAccess.updatePlate(plateId, plateData)
            return ok(result)
        }catch(error){
            return serverError(error)
        }
    }
}