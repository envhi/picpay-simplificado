import WalletsServices from "../services/WalletsServices";

class Wallets {
  async getAllWallets(req, res) {
    try {
      const allWallets = await WalletsServices.getAllWallets();
      res.status(200).json({ allWallets });
    } catch (error) {
      res.json(error.message);
    }
  }
}

export default new Wallets();
