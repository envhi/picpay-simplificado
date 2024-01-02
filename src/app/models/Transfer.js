import Sequelize, { Model } from "sequelize";

class Transfer extends Model {
  static init(sequelize) {
    super.init(
      {
        amount: Sequelize.FLOAT,
        sender_wallet_id: Sequelize.INTEGER,
        receiver_wallet_id: Sequelize.INTEGER
      },
      { sequelize }
    );
  }

  static associate(models) {
    this.belongsTo(models.Wallet, {
      foreignKey: 'id',
      as: 'senderWallet',
    });

    this.belongsTo(models.Wallet, {
      foreignKey: 'id',
      as: 'receiverWallet',
    });
  }
}

export default Transfer;
