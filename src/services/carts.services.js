import { productsRepository } from "../repositories/repository.js";

const createOneService = async (data) => await productsRepository.createOne(data);
const readAllService = async (filter) => await productsRepository.readAll(filter);
const readByIdService = async (id) => await productsRepository.readById(id);
const updateByIdService = async (id, data) => await productsRepository.updateById(id, data);
const destroyByIdService = async (id) => await productsRepository.destroyById(id);

export {
  createOneService,
  readAllService,
  readByIdService,
  updateByIdService,
  destroyByIdService,
};