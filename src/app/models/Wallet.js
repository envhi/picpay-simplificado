import Sequelize, { Model } from "sequelize";

class Wallet extends Model {
  static init(sequelize) {
    super.init(
      {
        money: Sequelize.FLOAT,
      },
      { sequelize }
    );
  }

  static associate(models) {
    this.belongsTo(models.User, { foreignKey: "user_id" });
  }
}

export default Wallet;
