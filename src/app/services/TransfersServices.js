import axios from "axios";
import Transfer from "../models/Transfer";
import User from "../models/User";
import TransfersRepositories from "../repositories/TransfersRepositories";

class TransferServices {
  async createTransfer(userId, receiverId, amount) {
    try {
      const result = await User.sequelize.transaction(async (t) => {
        // resgatar wallet sender (userId param)
        const senderWallet = await TransfersRepositories.getWalletByUserId(
          userId,
          { transaction: t }
        );

        // verificar se o sender existe e tem saldo
        if (!senderWallet || senderWallet.money < amount) {
          console.log("nao tem saldo");
          throw { status: 500, message: "Saldo insuficiente." };
        }

        const userSender = await TransfersRepositories.getUserByPk(userId)
        console.log(userSender.account_type)

        if (userSender.account_type == "VENDOR") {
          throw {
            status: 401,
            message: "Usuário lojista não pode realizar essa transação.",
          };
        }

        // atualizar saldo do sender

        await TransfersRepositories.updateWalletMoney(
          senderWallet.id,
          parseFloat(senderWallet.money) - parseFloat(amount),
          { transaction: t }
        );

        // resgatar a carteira do destinarario (receiverId param)

        const receiverWallet =
          await TransfersRepositories.getWalletByUserId(receiverId);

        // verifica se o destinatario existe by id
        if (!receiverWallet) {
          console.log("nao tem destitanario");
          throw { status: 500, message: "Destinatário inválido" };
        }

        // atualiza saldo do destinatario

        await TransfersRepositories.updateWalletMoney(
          receiverWallet.id,
          parseFloat(receiverWallet.money) + parseFloat(amount),
          { transaction: t }
        );

        // criar registro de transferencia

        await TransfersRepositories.transaction(
          userId,
          receiverId,
          parseFloat(amount),
          { transaction: t }
        );
      });

      const response = await axios.get(
        "https://run.mocky.io/v3/5794d450-d2e2-4412-8131-73d0293ac1cc"
      );

      if (response.data.message != "Autorizado") {
        throw { status: 500, message: "Transferência não autorizada" };
      }

      const sendMailMock = await axios.get(
        "https://run.mocky.io/v3/54dc2cf1-3add-45b5-b5a9-6bf7e7f1f4a6"
      );

      if (!sendMailMock) {
        throw { status: 401, message: "mock mail faio" };
      }

      return response.data;
    } catch (error) {
      throw { status: 401, message: "Transação inválida, rollback realizado." };
    }
  }
}

export default new TransferServices();
