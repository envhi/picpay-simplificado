import UsersServices from "../services/UsersServices";
import axios from "axios";
import nodemailer from "nodemailer";
import smtp from "../../config/smtp";

class Transactions {
  async payment(req, res) {


    const user = await UsersServices.getUserById(req.userId);
    const userPayee = await UsersServices.getUserById(req.body.payee);
    if(user.Wallet.money <= req.body.value) {
      return res.status(500).json({error: "Saldo insuficiente para realizar a transação"})
    }

    try {
      const newBalance = parseFloat(user.Wallet.money) - parseFloat(req.body.value)

      user.Wallet.money = newBalance

      await user.Wallet.save();

      const newPayeeBalance = parseFloat(userPayee.Wallet.money) + parseFloat(req.body.value)

      userPayee.Wallet.money = newPayeeBalance

      await userPayee.Wallet.save();

      const response = await axios.get(
        "https://run.mocky.io/v3/5794d450-d2e2-4412-8131-73d0293ac1cc"
      );

      if(response.data.message === "Autorizado") {
        const transporter = nodemailer.createTransport({
          host: "smtp-mail.outlook.com",
          port: 587,
          secure: false,
          auth: {
            user: "ffonsecama1@outlook.com",
            pass: "Felipemailer12#",
          },
          tls: {
            rejectUnauthorized: false
          }
        })

        await transporter.sendMail({
          from: "ffonsecama1@outlook.com",
          to: `${userPayee.email}`,
          subject: "Venda realizada",
          text: ` Nova venda realizada no valor de R$${req.body.value}, efetuada pelo usuário: ${user.name}. Saldo atual: R$${userPayee.Wallet.money}`,
        })
        .then(() => console.log("email enviado"))
        .catch((error) => console.log("Erro ao enviar email: ", error))

        return res.status(200).json({msg: `Transferencia autorizada, novo saldo: R$${user.Wallet.money},00 reais`})
      }
    } catch (error) {
      return res.status(500).json(error.message)
    }
  }
}

export default new Transactions();
