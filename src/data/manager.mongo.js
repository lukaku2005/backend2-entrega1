import User from "../dao/mongo/models/users.models.js"
import Product from "../dao/mongo/models/products.model.js"
import Cart from "../dao/mongo/models/carts.model.js"



class ManagerMongo {
    constructor(model) {
        this.model = model
    }
    createOne = async (data) => await this.model.create(data)
    readAll = async(filter) => await this.model.find(filter).lean()
    readBy = async(data) => await this.model.findOne(data).lean()
    readById = async(id) => await this.model.findById(id).lean()
    updateById = async(id,data) => await this.model.findByIdAndUpdate(id, data)
    destroyById = async(id) => await this.model.findByIdAndDelete(id)
}


export const userManager = new ManagerMongo(User);
export const productManager = new ManagerMongo(Product);
export const cartsManager = new ManagerMongo(Cart);
