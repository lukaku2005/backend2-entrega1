class DaoFs {
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

const productsManager = new DaoFs();
const cartsManager = new DaoFs();
const usersManager = new DaoFs();

export { productsManager, cartsManager, usersManager };