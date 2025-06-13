class DaoMemory {
  constructor() {}
  createOne = async (data) => {
  };
  readAll = async (filter) => {
  };
  readById = async (id) => {
  };
  readBy = async (filter) => {
  };
  updateById = async (id, data) => {
  };
  destroyById = async (id) => {
  };
}

const productsManager = new DaoMemory();
const cartsManager = new DaoMemory();
const usersManager = new DaoMemory();

export { productsManager, cartsManager, usersManager };