import Transfer from "../models/Transfer";
import User from "../models/User";
import Wallet from "../models/Wallet";

class TransfersRepositories {
  async createTransaction() {
    return await User.sequelize.transaction();
  }

  async getUserByPk(id){
    return await User.findByPk(id)
  }

  async getWalletByUserId(userId, options = {}) {
    return await Wallet.findOne(
      {
        where: { user_id: userId },
      },
      Object.assign({}, options)
    );
  }

  async updateWalletMoney(walletId, amount, options) {
    await Wallet.update(
      { money: amount },
      {
        where: {
          id: walletId,
        },
      },

      Object.assign({}, options)
    );

    return amount;
  }

  async transaction(userId, receiverId, amount, options) {
    const transfer = await Transfer.create(
      {
        sender_wallet_id: userId,
        receiver_wallet_id: receiverId,
        amount: amount,
      },
      Object.assign({}, options)
    );

    return transfer;
  }
}
export default new TransfersRepositories();
