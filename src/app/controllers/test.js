import Transfer from "../models/Transfer";
import User from "../models/User";
import Wallet from "../models/Wallet";
import UsersServices from "../services/UsersServices";

import WalletsServices from "../services/WalletsServices";

class Transfers {
  async transfer(req, res) {

    try {

      const t = await Wallet.sequelize.transaction();

      try {
        // resgatar wallet do user payer
        const userPayerWallet = await WalletsServices.getWalletByUserId(req.userId, {
          transaction: t,
        });

        // verificar se o payer existe e tem saldo
        if (!userPayerWallet || userPayerWallet.money < req.body.value) {
          console.log("nao tem saldo");
          return res.status(500).json({ msg: "Saldo Insuficiante" });
        }

        // atualizar saldo do pagador
        await userPayerWallet.update(
          {
            money: parseFloat(userPayerWallet.money) - parseFloat(req.body.value),
          },
          { transaction: t }
        );

        // resgatar o destinatario
        const userPayeeWallet = await WalletsServices.getWalletByUserId(req.body.payee, {
          transaction: t,
        });

        // verifica se o destinatario existe by id
        if (!userPayeeWallet) {
          return res.status(500).json({ msg: "Destinatario nao encontrado" });
        }

        // atualiza saldo do destinatario

        await userPayeeWallet.update(
          {
            money: parseFloat(userPayeeWallet.money) + parseFloat(req.body.value),
          },
          { transaction: t }
        )

        // criar registro de transferencia

        const sender_wallet_id = req.userId;
        const receiver_wallet_id = req.body.payee;
        const amount = req.body.value;

        const transfer = await Transfer.create(
          {
            sender_wallet_id,
            receiver_wallet_id,
            amount,
          },
          { transaction: t }
        );

        await t.commit();

        return res.status(200).json({msg: 'oi', transfer});
      } catch (error) {
        await t.rollback();
        return res.status(500).json(error.message);
      }
    } catch (error) {
      console.log(error);
      throw new Error("erro interno");
    }
  }
}

export default new Transfers();
