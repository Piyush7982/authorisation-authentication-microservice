
const {StatusCodes}= require("http-status-codes")
const CustomError = require("../util/errors")

class crud{
    constructor(model){
        this.model=model
    }
    async create(data){
        try {
            const response= await this.model.create(data)
           
            return response
        } catch (error) {
           throw new CustomError(error.message,StatusCodes.NOT_IMPLEMENTED)
            
        }
        
    }
    async remove(data){
        try {
            const response= await this.model.destroy({where:{data}})
            return response
        } catch (error) {
            throw new CustomError(error.message,StatusCodes.NOT_IMPLEMENTED)
        }
    }
    async update(newData,searchData){
        try {
            const response= await this.model.update(newData, {where: searchData})
            return response
        } catch (error) {
            throw new CustomError(error.message,StatusCodes.NOT_MODIFIED)
        }
    }
    async findAll(){
        try {
            const response= await this.model.findAll()
            return response
        } catch (error) {
            throw new CustomError(error.message,StatusCodes.NOT_FOUND)
        }
    }
    async find(id){
        try {
            const response= await this.model.findByPk(id)
            return response
        } catch (error) {
            throw new CustomError(error.message,StatusCodes.NOT_FOUND)
        }
    }
    

}
module.exports=crud