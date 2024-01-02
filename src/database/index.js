import Sequelize from "sequelize";
import config from "../config/database";

import User from "../app/models/User";
import Wallet from "../app/models/Wallet";
import Transfer from "../app/models/Transfer";

const models = [User, Wallet, Transfer];

class Database {
  constructor() {
    this.connection = new Sequelize(config);
    this.init();
    this.associate();
  }

  init() {
    models.forEach((model) => model.init(this.connection));
  }

  associate() {
    models.forEach((model) => {
      if (model.associate) {
        model.associate(this.connection.models);
      }
    });
  }
}

export default new Database();
