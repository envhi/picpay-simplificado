import SessionsRepositories from "../repositories/SessionsRepositories";
import jwt from "jsonwebtoken";
import authConfig from "../../config/auth";

class SessionsServices {
  async createSession(email, password) {
    const user = await SessionsRepositories.findUserByEmail(email);

    if (!user) {
      throw { status: 404, message: "Usuário inválido" };
    }

    if (!(await user.checkPassword(password))) {
      throw { status: 401, message: "Senha inválida" };
    }

    const token = jwt.sign({ id: user.id }, authConfig.secret, {
      expiresIn: authConfig.expiresIn,
    });

    return token;
  }
}
export default new SessionsServices();
