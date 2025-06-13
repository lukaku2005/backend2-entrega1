const { PERSISTENCE } = process.env;

let dao = {};

switch (PERSISTENCE) {
  case "memory":
    {
      console.log("memory connected");
      const { productsManager, cartsManager, usersManager } = await import(
        "./memory/dao.memory.js"
      );
      dao = { productsManager, cartsManager, usersManager };
    }
    break;
  case "fs":
    {
      console.log("fs connected");
      const { productsManager, cartsManager, usersManager } = await import(
        "./fs/dao.fs.js"
      );
      dao = { productsManager, cartsManager, usersManager };
    }
    break;
  default: 
    {
      console.log("mongo database connected");
      const { productsManager, cartsManager, usersManager } = await import(
        "./mongo/dao.mongo.js"
      );
      dao = { productsManager, cartsManager, usersManager };
    }
    break;
}

const { productsManager, cartsManager, usersManager } = dao;
export { productsManager, cartsManager, usersManager };
export default dao;