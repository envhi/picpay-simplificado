import Transfer from "../models/Transfer";
import User from "../models/User";
import Wallet from "../models/Wallet";
import TransfersServices from "../services/TransfersServices";
import UsersServices from "../services/UsersServices";

import WalletsServices from "../services/WalletsServices";

class Transfers {
  async transfer(req, res) {
    try {
      // mandar para o service: userId(req.userId), receiverId(payee), amount(value)

      const transfer = await TransfersServices.createTransfer(
        req.userId,
        req.body.payee,
        req.body.value
      );

      res.status(200).json(transfer);
    } catch (error) {
      return res.status(error.status || 500).json({ msg: error.message });
    }
  }
}

export default new Transfers();
