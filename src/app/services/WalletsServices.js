import Wallet from "../models/Wallet";

class WalletsServices {
  async getAllWallets() {
    return await Wallet.findAll();
  }

  async getWalletByUserId(user_id) {
    console.log(user_id);
    return await Wallet.findOne({
      where: { user_id: user_id },
    });
  }

  async updateWalletMoney(wallet, amount) {
    return await wallet.update({
      money: parseFloat(amount),
    });
  }
}
export default new WalletsServices();
